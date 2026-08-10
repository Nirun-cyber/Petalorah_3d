import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, ArrowUpRight, HelpCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-transparent text-white pt-24 pb-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Greenish Teal Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Glow Lines on Corners */}
      <div className="absolute top-12 left-0 w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="absolute top-12 right-0 w-48 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Giant Watermark Text "CONTACT" behind content */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-15 font-bold text-[14vw] tracking-wider text-neutral-400 uppercase leading-none text-center w-full">
        CONTACT
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-8 text-center">
        {/* Header Content */}
        <div className="space-y-4 flex flex-col items-center">
          {/* Small Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white/80 font-medium backdrop-blur-md shadow-md">
              <HelpCircle size={14} className="text-white/70" />
              <span>Contact</span>
            </div>
          </motion.div>

          {/* Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 max-w-xl"
          >
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white">
              Get in touch
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Ready to buy our handcrafted creations or discuss custom orders? Reach out directly via Email, WhatsApp, or Instagram!
            </p>
          </motion.div>
        </div>

        {/* 3 Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-12 text-left"
        >
          {/* Card 1: Email */}
          <a
            href="mailto:petalorah.business@gmail.com"
            className="group flex flex-col justify-between p-6 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/35 transition-all duration-300 cursor-pointer backdrop-blur-xl hover:bg-white/[0.08] shadow-lg"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/15 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div>
              <span className="text-xs text-white/50 font-medium block mb-1">
                Email me
              </span>
              <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors break-all">
                petalorah.business@gmail.com
              </span>
            </div>
          </a>

          {/* Card 2: WhatsApp me */}
          <a
            href="https://wa.me/916382735751"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-6 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/35 transition-all duration-300 cursor-pointer backdrop-blur-xl hover:bg-white/[0.08] shadow-lg"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/15 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div>
              <span className="text-xs text-white/50 font-medium block mb-1">
                WhatsApp me
              </span>
              <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                6382735751
              </span>
            </div>
          </a>

          {/* Card 3: Instagram */}
          <a
            href="https://www.instagram.com/petalorah/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-6 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/35 transition-all duration-300 cursor-pointer backdrop-blur-xl hover:bg-white/[0.08] shadow-lg"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Instagram size={20} className="text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/15 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <div>
              <span className="text-xs text-white/50 font-medium block mb-1">
                Instagram
              </span>
              <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                @petalorah
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
