import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  onShopNow: () => void;
  onContactUs: () => void;
  onBadgeClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onShopNow,
  onContactUs,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-auto pt-24 pb-16 z-10">
      {/* Main Display Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-6 select-none max-w-3xl leading-tight sm:leading-tight"
        style={{ letterSpacing: '-0.02em' }}
      >
        Handmade Gifts, Crafted with Love.
      </motion.h1>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mb-10 text-center"
      >
        Every creation at Petalorah is handcrafted with care to make your special moments even more memorable. From beautiful pipe cleaner flowers to personalized gifts, I turn simple ideas into keepsakes you'll cherish forever.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
      >
        {/* Shop Now Button */}
        <button
          onClick={onShopNow}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 group"
        >
          <span>Shop Now</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        {/* Contact Us Button */}
        <button
          onClick={onContactUs}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-medium text-base transition-all duration-200 cursor-pointer flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] border border-white/25 hover:border-white/40 backdrop-blur-2xl shadow-xl hover:scale-105 active:scale-95"
        >
          Contact Us
        </button>
      </motion.div>
    </div>
  );
};

