import React from 'react';
import { MapPin, Clock, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = React.memo(({ onContactClick }) => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-16 w-16 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png" 
                  alt="Ara's Llantas Logo" 
                  className="w-full h-full object-contain"
                  width="64"
                  height="64"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-gray-400">
              {t('trustedShop')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t('contactInfo')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span>{t('location')}</span>
              </div>
              <a 
                href={`tel:${t('phone').replace(/[^\d]/g, '')}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>{t('phone')}</span>
              </a>
              <a 
                href={`mailto:${t('email')}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>{t('email')}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>{t('hours')}</span>
              </div>
              {onContactClick && (
                <button
                  onClick={onContactClick}
                  className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-6 rounded-lg transition-all font-semibold"
                >
                  {t('contact')} {t('contact') === 'Contact' ? 'Us' : 'Nosotros'}
                </button>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t('followUs')}</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
});