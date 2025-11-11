import React from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

export const Header = React.memo(({ onMenuToggle, isMenuOpen, onContactClick }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png" 
                alt="Ara's Llantas Logo" 
                className="w-full h-full object-contain"
                width="48"
                height="48"
                fetchpriority="high"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ara's Llanta's</h1>
              <p className="text-xs text-gray-400">{t('quality')}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors">{t('home')}</a>
            <a href="#tires" className="text-gray-300 hover:text-orange-500 transition-colors">{t('ourTires')}</a>
            <a href="#about" className="text-gray-300 hover:text-orange-500 transition-colors">{t('about')}</a>
            <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">{t('contact')}</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              onClick={onContactClick}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">{t('contact')}</span>
            </Button>
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              className="text-gray-300 hover:text-orange-500 transition-colors flex items-center space-x-2"
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'en' ? 'ES' : 'EN'}</span>
            </Button>
            <Button
              onClick={onMenuToggle}
              variant="ghost"
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-2">
            <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors py-2">{t('home')}</a>
            <a href="#tires" className="text-gray-300 hover:text-orange-500 transition-colors py-2">{t('ourTires')}</a>
            <a href="#about" className="text-gray-300 hover:text-orange-500 transition-colors py-2">{t('about')}</a>
            <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors py-2">{t('contact')}</a>
            <button 
              onClick={onContactClick}
              className="text-gray-300 hover:text-orange-500 transition-colors py-2 text-left bg-gray-800 rounded-lg px-4 border border-orange-500"
            >
              {t('contact')} {t('contact') === 'Contact' ? 'Us' : 'Nosotros'}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
});