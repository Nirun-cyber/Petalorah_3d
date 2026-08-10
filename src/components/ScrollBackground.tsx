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
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];

    const padNum = (n: number) => n.toString().padStart(3, '0');

    // Preload first frame for instant display
    const img1 = new Image();
    img1.src = `/frames/ezgif-frame-${padNum(1)}.jpg`;
    img1.onload = () => {
      if (isMounted) {
        imagesRef.current[0] = img1;
        setIsLoaded(true);
      }
    };

    // Preload all 240 frames for smooth scroll scrubbing
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padNum(i)}.jpg`;
      loadedImages[i - 1] = img;
    }
    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const calculateScrollFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollHeight > 0 ? scrollTop / scrollHeight : 0));
      
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );
      targetFrameRef.current = frameIndex;
    };

    const render = () => {
      // Smooth lerp (linear interpolation) towards target scroll frame
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.25;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameIdx = Math.round(currentFrameRef.current);
      const img = imagesRef.current[frameIdx];

      if (img && img.complete && img.naturalWidth !== 0) {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        // Aspect-ratio cover
        const imgRatio = img.naturalWidth / img.naturalHeight;
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

        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleScroll = () => {
      calculateScrollFrame();
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      calculateScrollFrame();
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalFrames, isLoaded]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Scroll-Driven Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
      />
      {/* Ambient Gradient Overlays for optimal text contrast & readability */}
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
