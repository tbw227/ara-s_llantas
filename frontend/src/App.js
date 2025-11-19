import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './context/LanguageContext';
import { SEO } from './components/SEO';

// Lazy load heavy components for code splitting
const TireShowcase = lazy(() => import('./components/TireShowcase').then(module => ({ default: module.TireShowcase })));
const EmailSignup = lazy(() => import('./components/EmailSignup').then(module => ({ default: module.EmailSignup })));
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const ExitModal = lazy(() => import('./components/ExitModal').then(module => ({ default: module.ExitModal })));

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setIsExitModalOpen(true);
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitIntent]);

  return (
    <div className="App min-h-screen bg-black">
      <SEO />
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onContactClick={() => setIsExitModalOpen(true)}
      />
      <Hero />
      <Suspense fallback={<div className="py-20 bg-gray-900 text-center text-white">Loading tire information...</div>}>
        <TireShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={null}>
        <EmailSignup />
      </Suspense>
      <Suspense fallback={null}>
        <Footer onContactClick={() => setIsExitModalOpen(true)} />
      </Suspense>
      <Suspense fallback={null}>
        <ExitModal
          isOpen={isExitModalOpen}
          onClose={() => setIsExitModalOpen(false)}
        />
      </Suspense>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;