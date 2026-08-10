import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Heart, Sparkles, Feather, ShieldCheck, ArrowRight } from 'lucide-react';
import { PetalorahLogoIcon, PetalorahFullLogo } from './PetalorahLogo';

interface AboutUsSectionProps {
  onGetStarted: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onGetStarted }) => {
  return (
    <section id="about-us" className="w-full bg-transparent text-white pt-20 pb-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Translucent Radial Glows */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* ================= 1. TOP HEADER ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 pb-4">
          {/* Left Text Header Block */}
          <div className="md:col-span-7 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-7xl font-light tracking-tight text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              About Us
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Handcrafted floral arrangements, miniatures, keychains, and bespoke gifts crafted with care and elegance.
            </motion.p>

            {/* Breadcrumb path */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 text-xs sm:text-sm text-white/50 pt-2 font-mono"
            >
              <span className="hover:text-white transition-colors cursor-pointer">Home</span>
              <ChevronRight size={14} className="text-white/40" />
              <span className="text-white font-medium">About Us</span>
            </motion.div>
          </div>

          {/* Right Circular Logo Emblem */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center p-2"
            >
              {/* Outer rotating subtle orbital ring */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-white/25 animate-[spin_60s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border border-white/10" />

              {/* Badges */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-white/90 shadow-lg">
                Handmade
              </div>

              {/* Main Circular White/Off-White Glass Container for the Logo */}
              <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-slate-50/[0.97] text-[#122A54] border border-white/40 flex flex-col items-center justify-center p-4 shadow-2xl relative overflow-hidden group hover:scale-105 transition-all duration-500">
                <PetalorahFullLogo className="w-full scale-90" theme="light" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= 2. MIDDLE SPLIT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Vertical Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/20 min-h-[380px] lg:min-h-[480px] flex items-end p-6 group shadow-2xl"
          >
            {/* Unsplash Aesthetic Floral Artisan Image */}
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop"
              alt="Petalorah floral artisan creating handmade arrangements"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-1 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                Craftsmanship
              </span>
              <h3 className="text-xl font-semibold text-white">
                Preserving nature’s gentle beauty
              </h3>
            </div>
          </motion.div>

          {/* Right Translucent Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-2xl hover:border-white/25 transition-all duration-300"
          >
            <div className="space-y-4">
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                At Petalorah, every petal tells a story. I combine meticulous handcrafting with modern design aesthetics to create timeless floral keepsakes, miniatures, keychains, and tailored gifts that bring warmth to your life.
              </p>
            </div>

            {/* 4 Feature Bullet Points in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/90 bg-white/[0.04] border border-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Heart size={16} className="text-white" />
                </div>
                <span>Handcrafted with love</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 bg-white/[0.04] border border-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span>Custom floral designs</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 bg-white/[0.04] border border-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Feather size={16} className="text-white" />
                </div>
                <span>Delicate miniatures</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 bg-white/[0.04] border border-white/10 backdrop-blur-md p-3.5 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <span>Premium keepsakes</span>
              </div>
            </div>


          </motion.div>
        </div>

        {/* ================= 3. BOTTOM STATS & HIGHLIGHTS ROW (Translucent Cards) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          {/* Left Summary Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="text-xs sm:text-sm text-white/60 font-mono tracking-wider uppercase">
              My Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
              Handmade Creations For Everyone
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              I take pride in turning natural florals into lasting memories. Whether it's a personal gift or a custom keepsake, every piece is individually handcrafted by me to inspire joy and connection.
            </p>
          </motion.div>

          {/* Right 2x2 Translucent Glass Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 space-y-1 shadow-xl">
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                60+
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">
                Happy Customers
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 space-y-1 shadow-xl">
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">
                Handmade by Me
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 space-y-1 shadow-xl">
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                4.9 ★
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">
                Customer Rating
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/15 backdrop-blur-2xl rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 space-y-1 shadow-xl">
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                50+
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium">
                Collections
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
