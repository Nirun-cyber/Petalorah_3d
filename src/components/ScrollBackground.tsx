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
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload all 240 frame images
  useEffect(() => {
    let isMounted = true;
    const padNum = (n: number) => n.toString().padStart(3, '0');
    const images: Array<HTMLImageElement | null> = new Array(totalFrames).fill(null);

    let count = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padNum(i)}.jpg`;
      img.onload = () => {
        if (isMounted) {
          count++;
          setLoadedCount(count);
        }
      };
      images[i - 1] = img;
    }
    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Continuous smooth render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const updateTargetFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? scrollTop / scrollHeight : 0));
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    const render = () => {
      updateTargetFrame();

      // Smooth responsive lerp to target scroll frame
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.35;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const targetIdx = Math.round(currentFrameRef.current);

      // Find closest loaded image
      let validImg: HTMLImageElement | null = null;
      if (imagesRef.current[targetIdx] && imagesRef.current[targetIdx]?.complete) {
        validImg = imagesRef.current[targetIdx];
      } else {
        // Fallback search to nearest loaded image
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = targetIdx - offset;
          const next = targetIdx + offset;
          if (prev >= 0 && imagesRef.current[prev] && imagesRef.current[prev]?.complete) {
            validImg = imagesRef.current[prev];
            break;
          }
          if (next < totalFrames && imagesRef.current[next] && imagesRef.current[next]?.complete) {
            validImg = imagesRef.current[next];
            break;
          }
        }
      }

      if (validImg && validImg.naturalWidth > 0 && validImg.naturalHeight > 0) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const imgRatio = validImg.naturalWidth / validImg.naturalHeight;
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

        ctx.drawImage(validImg, offsetX, offsetY, renderWidth, renderHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateTargetFrame, { passive: true });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateTargetFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames, loadedCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Ambient Gradient Overlays */}
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
