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
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const bitmapsRef = useRef<Array<ImageBitmap | null>>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const padNum = (n: number) => n.toString().padStart(3, '0');

    imagesRef.current = new Array(totalFrames).fill(null);
    bitmapsRef.current = new Array(totalFrames).fill(null);

    const loadFrame = async (index: number) => {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padNum(index + 1)}.jpg`;

      try {
        if ('decode' in img) {
          await img.decode();
        } else {
          await new Promise((res) => {
            img.onload = res;
          });
        }

        if (!isMounted) return;
        imagesRef.current[index] = img;

        // Pre-decode into ImageBitmap for zero-latency GPU rendering
        if (typeof createImageBitmap === 'function') {
          try {
            const bitmap = await createImageBitmap(img);
            if (isMounted) {
              bitmapsRef.current[index] = bitmap;
            }
          } catch {
            // Fallback to Image element if bitmap creation fails
          }
        }

        if (index === 0 && isMounted) {
          setIsReady(true);
        }
      } catch {
        // Fallback for image load errors
      }
    };

    const loadAll = async () => {
      // First priority: Load initial frame instantly
      await loadFrame(0);

      // Parallel batch loading to avoid main-thread saturation
      const batchSize = 16;
      for (let i = 0; i < totalFrames; i += batchSize) {
        if (!isMounted) break;
        const promises = [];
        for (let j = i; j < i + batchSize && j < totalFrames; j++) {
          if (j !== 0) promises.push(loadFrame(j));
        }
        await Promise.all(promises);
      }
    };

    loadAll();

    return () => {
      isMounted = false;
      // Free GPU memory bitmaps on unmount
      bitmapsRef.current.forEach((bm) => bm?.close());
    };
  }, [totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false for faster GPU blitting
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const updateTargetFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? scrollTop / scrollHeight : 0));
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    const drawFrame = (frameIdx: number) => {
      // Fall back to nearest loaded frame if exact target frame is still decoding
      let validIdx = frameIdx;
      if (!bitmapsRef.current[validIdx] && !imagesRef.current[validIdx]) {
        for (let offset = 1; offset < totalFrames; offset++) {
          if (validIdx - offset >= 0 && (bitmapsRef.current[validIdx - offset] || imagesRef.current[validIdx - offset])) {
            validIdx = validIdx - offset;
            break;
          }
          if (validIdx + offset < totalFrames && (bitmapsRef.current[validIdx + offset] || imagesRef.current[validIdx + offset])) {
            validIdx = validIdx + offset;
            break;
          }
        }
      }

      const bitmap = bitmapsRef.current[validIdx];
      const img = imagesRef.current[validIdx];

      const drawSource = bitmap || (img && img.complete ? img : null);
      if (!drawSource) return;

      const width = canvas.width;
      const height = canvas.height;
      const naturalWidth = bitmap ? bitmap.width : (img ? img.naturalWidth : width);
      const naturalHeight = bitmap ? bitmap.height : (img ? img.naturalHeight : height);

      if (naturalWidth === 0 || naturalHeight === 0) return;

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

      ctx.drawImage(drawSource, offsetX, offsetY, renderWidth, renderHeight);
      lastDrawnFrameRef.current = validIdx;
    };

    const loop = (now: number) => {
      const deltaTime = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      updateTargetFrame();

      // Smooth exponential easing for fluid responsiveness
      const diff = targetFrameRef.current - currentFrameRef.current;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.001) {
        const lerpFactor = Math.min(1, 1 - Math.exp(-24 * deltaTime));
        currentFrameRef.current += diff * lerpFactor;

        const currentIntFrame = Math.round(currentFrameRef.current);
        if (currentIntFrame !== lastDrawnFrameRef.current) {
          drawFrame(currentIntFrame);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        lastDrawnFrameRef.current = -1;
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateTargetFrame, { passive: true });

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateTargetFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames, isReady]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* High-Performance GPU Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      {/* Contrast Gradient Overlays */}
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
