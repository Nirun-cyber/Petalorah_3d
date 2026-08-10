import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onScrollClick: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  onScrollClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="pb-8 pt-4 z-10 flex justify-center"
    >
      <button
        onClick={onScrollClick}
        className="group px-4 py-1.5 rounded-full border border-white/25 bg-white/[0.08] hover:bg-white/[0.18] text-white text-xs tracking-widest uppercase font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-2xl shadow-xl hover:scale-105 active:scale-95"
      >
        <span>SCROLL</span>
        <ArrowDown
          size={14}
          className="group-hover:translate-y-0.5 transition-transform"
        />
      </button>
    </motion.div>
  );
};
