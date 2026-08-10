import React, { useEffect, useRef, useState } from 'react';

interface ScrollBackgroundProps {
  totalFrames?: number;
  overlayOpacity?: number;
}

export const ScrollBackground: React.FC<ScrollBackgroundProps> = ({
  totalFrames = 240,
  overlayOpacity = 0.45,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bitmapsRef = useRef<Array<ImageBitmap | HTMLImageElement | null>>([]);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const padNum = (n: number) => n.toString().padStart(3, '0');

    bitmapsRef.current = new Array(totalFrames).fill(null);

    // Downsample bitmap width for maximum GPU memory efficiency & 0 lag
    const targetWidth = Math.min(window.innerWidth > 0 ? window.innerWidth : 1280, 1280);

    const loadFrame = async (index: number) => {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padNum(index + 1)}.jpg`;

      try {
        if (typeof img.decode === 'function') {
          await img.decode().catch(() => {});
        } else {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }

        if (!isMounted) return;

        // Convert to lightweight ImageBitmap with downsampled width
        if (typeof createImageBitmap === 'function') {
          try {
            const bitmap = await createImageBitmap(img, {
              resizeWidth: targetWidth,
              resizeQuality: 'low',
            });
            if (isMounted) {
              bitmapsRef.current[index] = bitmap;
            }
          } catch {
            bitmapsRef.current[index] = img;
          }
        } else {
          bitmapsRef.current[index] = img;
        }

        if (index === 0 && isMounted) {
          setIsReady(true);
        }
      } catch {
        // Fallback for image load error
      }
    };

    const loadAll = async () => {
      // Priority 1: Load initial frame instantly
      await loadFrame(0);

      // Priority 2: Load keyframes spaced evenly across timeline for instant response
      const step = 6;
      const keyframePromises = [];
      for (let i = step; i < totalFrames; i += step) {
        keyframePromises.push(loadFrame(i));
      }
      await Promise.all(keyframePromises);

      // Priority 3: Load remaining intermediate frames in batches
      const batchSize = 16;
      for (let i = 0; i < totalFrames; i += batchSize) {
        if (!isMounted) break;
        const promises = [];
        for (let j = i; j < i + batchSize && j < totalFrames; j++) {
          if (!bitmapsRef.current[j]) {
            promises.push(loadFrame(j));
          }
        }
        await Promise.all(promises);
      }
    };

    loadAll();

    return () => {
      isMounted = false;
      bitmapsRef.current.forEach((bm) => {
        if (bm && 'close' in bm && typeof bm.close === 'function') {
          bm.close();
        }
      });
    };
  }, [totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false for direct GPU blitting without compositing overhead
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? scrollTop / scrollHeight : 0));
      
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );

      // Skip redrawing if frame index hasn't changed
      if (targetFrame === lastDrawnFrameRef.current) {
        rafIdRef.current = null;
        return;
      }

      // Fast fallback to nearest loaded frame
      let validIdx = targetFrame;
      if (!bitmapsRef.current[validIdx]) {
        for (let offset = 1; offset < totalFrames; offset++) {
          if (validIdx - offset >= 0 && bitmapsRef.current[validIdx - offset]) {
            validIdx = validIdx - offset;
            break;
          }
          if (validIdx + offset < totalFrames && bitmapsRef.current[validIdx + offset]) {
            validIdx = validIdx + offset;
            break;
          }
        }
      }

      const source = bitmapsRef.current[validIdx];
      if (!source) {
        rafIdRef.current = null;
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const naturalWidth = 'width' in source ? source.width : (source as HTMLImageElement).naturalWidth;
      const naturalHeight = 'height' in source ? source.height : (source as HTMLImageElement).naturalHeight;

      if (!naturalWidth || !naturalHeight) {
        rafIdRef.current = null;
        return;
      }

      // Aspect-ratio cover
      const imgRatio = naturalWidth / naturalHeight;
      const canvasRatio = width / height;

      let renderWidth = width;
      let renderHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = width / imgRatio;
        offsetY = (height - renderHeight) / 2;
      } else {
        renderWidth = height * imgRatio;
        offsetX = (width - renderWidth) / 2;
      }

      ctx.drawImage(source, offsetX, offsetY, renderWidth, renderHeight);
      lastDrawnFrameRef.current = validIdx;
      rafIdRef.current = null;
    };

    const requestRender = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        lastDrawnFrameRef.current = -1;
        requestRender();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', requestRender, { passive: true });

    requestRender();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', requestRender);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, isReady]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Zero-Lag GPU Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      {/* Contrast Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 pointer-events-none"
        style={{ opacity: overlayOpacity + 0.2 }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50"
      />
    </div>
  );
};
