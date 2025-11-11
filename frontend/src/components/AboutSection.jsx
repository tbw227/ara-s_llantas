import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Static testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    textKey: 'testimonial1Text',
    rating: 5
  },
  {
    id: 2,
    name: 'John Smith',
    textKey: 'testimonial2Text',
    rating: 5
  },
  {
    id: 3,
    name: 'Carlos Mendez',
    textKey: 'testimonial3Text',
    rating: 5
  }
];

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('aboutTitle')} <span className="text-orange-500">Ara's Llanta's</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {t('servingKC')}
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('aboutText1')}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t('aboutText2')}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('customerSay')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{t(testimonial.textKey)}"</p>
                  <p className="text-orange-500 font-semibold">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};