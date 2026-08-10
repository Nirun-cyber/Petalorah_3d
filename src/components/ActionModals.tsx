import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { PetalorahLogoIcon } from './PetalorahLogo';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'get-started' | 'demo' | 'raised' | 'login' | 'nav-section';
  activeSectionName?: string;
}

export const ActionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
  activeSectionName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-neutral-900/80 border border-white/20 backdrop-blur-2xl text-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {type === 'get-started' && (
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center mb-2">
                  <PetalorahLogoIcon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Start designing with Petalorah
                </h2>
                <p className="text-white/70 text-sm md:text-base">
                  Join creators using Petalorah to craft intuitive, modern user experiences in record time.
                </p>

                <div className="flex flex-col gap-3 my-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    onClick={() => {
                      alert('Welcome to Petalorah! Check your email to get started.');
                      onClose();
                    }}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-white" /> No credit card required
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-white" /> 14-day free trial
                  </span>
                </div>
              </div>
            )}

            {type === 'demo' && (
              <div className="flex flex-col gap-4 text-center items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                  <Play size={28} className="text-white ml-1 fill-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Petalorah Interactive Platform Demo
                </h2>
                <p className="text-white/70 text-sm">
                  Watch how Petalorah's design model converts ideas into elegant, handcrafted digital products.
                </p>

                <div className="w-full aspect-video rounded-2xl bg-neutral-950 border border-white/15 flex flex-col items-center justify-center p-6 relative group overflow-hidden my-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Play size={20} className="fill-black ml-1" />
                  </div>
                  <span className="text-xs text-white/60 mt-3 font-mono">
                    02:45 • HD Interactive Workflow
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            )}

            {type === 'raised' && (
              <div className="flex flex-col gap-4">
                <span className="text-3xl">🚀</span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Petalorah Raises $20M Series A
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  We are thrilled to announce our $20M Series A funding. This capital enables us to expand our handmade design models and real-time generative layouts.
                </p>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs text-white/70 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Round</span>
                    <span>Series A ($20M USD)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Focus</span>
                    <span>Generative Web & Product Experience</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all cursor-pointer mt-2"
                >
                  Read Press Release
                </button>
              </div>
            )}

            {type === 'login' && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Log in to Petalorah
                </h2>
                <p className="text-white/70 text-sm">
                  Welcome back! Please enter your details.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Logged in successfully!');
                    onClose();
                  }}
                  className="flex flex-col gap-3 my-2"
                >
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all cursor-pointer mt-2 text-sm"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            )}

            {type === 'nav-section' && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  {activeSectionName || title}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  You navigated to the <strong className="text-white">{activeSectionName}</strong> section of Petalorah.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer mt-2"
                >
                  Continue Viewing Banner
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
