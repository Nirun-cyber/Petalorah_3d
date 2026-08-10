import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PetalorahLogoIcon } from './PetalorahLogo';

interface NavbarProps {
  onLoginClick?: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  navStyle?: 'white-solid' | 'glass';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  setActiveNav,
  navStyle = 'glass',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About us', 'Products', 'Contact'];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-5 md:pt-7 px-4 flex justify-center items-center pointer-events-none">
      {/* Floating Capsule Navbar */}
      <div
        className={`pointer-events-auto transition-all duration-300 rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-2xl ${
          navStyle === 'white-solid'
            ? 'bg-white text-black'
            : 'bg-white/[0.08] backdrop-blur-2xl border border-white/25 text-white'
        } max-w-4xl w-full mx-auto`}
      >
        {/* Petalorah Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveNav('Home');
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className={`w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-110 ${
            navStyle === 'white-solid' ? 'text-blue-600' : 'text-white'
          }`}>
            <PetalorahLogoIcon className="w-7 h-7" />
          </div>
          <span
            className={`font-bold text-lg tracking-tight ${
              navStyle === 'white-solid' ? 'text-black' : 'text-white'
            }`}
          >
            Petalorah
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                navStyle === 'white-solid'
                  ? activeNav === item
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                  : activeNav === item
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item}
              {activeNav === item && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    navStyle === 'white-solid' ? 'bg-black' : 'bg-white'
                  }`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-full transition-colors ${
              navStyle === 'white-solid'
                ? 'text-black hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto absolute top-20 left-4 right-4 md:hidden rounded-2xl p-5 shadow-2xl border ${
              navStyle === 'white-solid'
                ? 'bg-white text-black border-gray-200'
                : 'bg-neutral-950/70 text-white border-white/20 backdrop-blur-2xl shadow-2xl'
            }`}
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveNav(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    activeNav === item
                      ? navStyle === 'white-solid'
                        ? 'bg-gray-100 text-black font-semibold'
                        : 'bg-white/10 text-white font-semibold'
                      : navStyle === 'white-solid'
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
