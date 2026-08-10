import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { ScrollIndicator } from './components/ScrollIndicator';
import { AboutUsSection } from './components/AboutUsSection';
import { ProductsSection } from './components/ProductsSection';
import { ContactSection } from './components/ContactSection';
import { ActionModal } from './components/ActionModals';
import { CollectionPage } from './components/CollectionPage';
import { ScrollBackground } from './components/ScrollBackground';

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'get-started' | 'demo' | 'raised' | 'login' | 'nav-section';
    sectionName?: string;
  }>({
    isOpen: false,
    title: '',
    type: 'get-started',
  });

  const aboutUsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);

    // If currently viewing a collection detail page, reset to home view first
    if (selectedCollectionId) {
      setSelectedCollectionId(null);
      // Short delay to allow DOM render before scrolling
      setTimeout(() => {
        scrollToNav(nav);
      }, 50);
      return;
    }

    scrollToNav(nav);
  };

  const scrollToNav = (nav: string) => {
    if (nav === 'About us') {
      if (aboutUsRef.current) {
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (nav === 'Products') {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (nav === 'Contact') {
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (nav !== 'Home') {
      setModalState({
        isOpen: true,
        title: nav,
        type: 'nav-section',
        sectionName: nav,
      });
    }
  };

  const handleScrollClick = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If a collection page is selected, render the dedicated collection detail page
  if (selectedCollectionId) {
    return (
      <CollectionPage
        collectionId={selectedCollectionId}
        onBack={() => setSelectedCollectionId(null)}
        onSelectOtherCollection={(id) => setSelectedCollectionId(id)}
        onContactClick={() => {
          setSelectedCollectionId(null);
          setTimeout(() => {
            if (contactRef.current) {
              contactRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-white selection:text-black relative">
      {/* Scroll-Driven Canvas Frame Animation */}
      <ScrollBackground totalFrames={240} overlayOpacity={0.45} />

      {/* Header Capsule Navbar */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={handleNavClick}
        navStyle="glass"
      />

      {/* Main Hero Section Container */}
      <main className="min-h-screen flex flex-col justify-between items-center relative z-10 w-full pt-12 pb-6 px-4">
        {/* Placeholder for top balance space */}
        <div className="h-12 w-full" />

        {/* Central Hero Content */}
        <HeroContent
          onShopNow={() => {
            if (productsRef.current) {
              productsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onContactUs={() => {
            if (contactRef.current) {
              contactRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Bottom Scroll Capsule */}
        <ScrollIndicator onScrollClick={handleScrollClick} />
      </main>

      {/* Next Section: About Us (Based on reference layout & Petalorah translucent dark style) */}
      <div ref={aboutUsRef}>
        <AboutUsSection
          onGetStarted={() =>
            setModalState({
              isOpen: true,
              title: 'Get Started',
              type: 'get-started',
            })
          }
        />
      </div>

      {/* Product Section (Based on reference layout & podium cards) */}
      <div ref={productsRef}>
        <ProductsSection
          onSelectCollection={(collectionId) => setSelectedCollectionId(collectionId)}
        />
      </div>

      {/* Contact Section (Exact match to reference image with translucent dark style) */}
      <div ref={contactRef}>
        <ContactSection />
      </div>

      {/* Action Modals */}
      <ActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        type={modalState.type}
        activeSectionName={modalState.sectionName}
      />
    </div>
  );
}

