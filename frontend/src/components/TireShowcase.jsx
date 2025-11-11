import React, { useState, useEffect, useMemo } from 'react';
import { Leaf, Bike, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import apiService from '../services/api';

export const TireShowcase = React.memo(() => {
  const { t } = useLanguage();
  const [tires, setTires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const tiresResponse = await apiService.getTires();
        setTires(tiresResponse.data || []);
      } catch (error) {
        console.error('Failed to load tire data:', error);
        // Set empty arrays on error
        setTires([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const lawnTires = useMemo(() => {
    return tires.filter(tire => tire.category === 'lawn').slice(0, 3);
  }, [tires]);

  const motorcycleTires = useMemo(() => {
    return tires.filter(tire => tire.category === 'motorcycle').slice(0, 3);
  }, [tires]);

  const lawnBrands = useMemo(() => {
    const uniqueBrands = [...new Set(tires.filter(t => t.category === 'lawn').map(t => t.brand))];
    return uniqueBrands.slice(0, 5);
  }, [tires]);

  const motorcycleBrands = useMemo(() => {
    const uniqueBrands = [...new Set(tires.filter(t => t.category === 'motorcycle').map(t => t.brand))];
    return uniqueBrands.slice(0, 5);
  }, [tires]);

  if (loading) {
    return (
      <section id="tires" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <p>Loading tire information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tires" className="py-12 sm:py-16 md:py-20 bg-gray-900 tire-showcase-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tire-showcase-title">
            {t('ourTires')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto tire-showcase-subtitle">
            {t('tireShowcaseDesc')}
          </p>
        </div>

        {/* Lawn Tires Section - Split Screen (Image Left, Details Right) */}
        <div className="mb-12 sm:mb-16 md:mb-20 tire-section-spacing">
          <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center tire-icon-container">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white tire-icon" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tire-section-title">
                {t('lawnTires')}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-8">
            {/* Image Side - Left */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-black lg:col-span-1 overflow-hidden tire-image-container pb-0 m-0">
              <img
                src="/images/lm_tire_3.jpg"
                alt="Lawn mower tires"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/tires/lawn-tire-generic.jpg';
                }}
              />
            </div>

            {/* Details Side - Two Columns */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 lg:p-12 tire-details-container bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              {/* Left Column - Service Description */}
              <div className="flex flex-col justify-center space-y-6 sm:space-y-7">
                {lawnTires.length > 0 && lawnTires[0] ? (
                  <>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
                      <div className="pl-4">
                        <div className="bg-gray-900/50 rounded-lg p-6 sm:p-7 md:p-8 border border-gray-700/50 space-y-5 sm:space-y-6">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                            {t('lawnServiceTitle')}
                          </h3>
                          <div className="space-y-4 sm:space-y-5">
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc1')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc2')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc3')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 font-medium">
                              {t('lawnServiceDesc4')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
                      <div className="pl-4">
                        <div className="bg-gray-900/50 rounded-lg p-6 sm:p-7 md:p-8 border border-gray-700/50 space-y-5 sm:space-y-6">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                            {t('lawnServiceTitle')}
                          </h3>
                          <div className="space-y-4 sm:space-y-5">
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc1')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc2')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('lawnServiceDesc3')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 font-medium">
                              {t('lawnServiceDesc4')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - ul list (next to image) */}
              <div className="flex flex-col justify-center">
                <div className="bg-gray-900/30 rounded-lg p-5 border border-gray-700/50">
                  <h5 className="text-white font-semibold mb-4 text-base sm:text-lg flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {t('features')}
                  </h5>
                  <ul className="text-gray-300 text-sm sm:text-base space-y-3">
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('allLawnMowerTireSizes')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('turfFriendlyTreadPatterns')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('longLastingDurability')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

              {lawnBrands.length > 0 && (
                <div className="lg:col-span-3 pt-4 sm:pt-5 md:pt-6 border-t border-gray-700 px-4 sm:px-6 md:px-8 lg:px-12">
                  <h5 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                    {t('brandsWeCarry')}
                  </h5>
                  <div className="flex flex-wrap gap-2 sm:gap-3 pb-4 sm:pb-5 md:pb-6">
                    {lawnBrands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm hover:bg-orange-500 hover:text-white transition-all"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Motorcycle Tires Section - Split Screen (Details Left, Image Right) */}
        <div>
          <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center tire-icon-container">
                <Bike className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white tire-icon" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tire-section-title">
                {t('motorcycleTires')}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-8">
            {/* Details Side - Two Columns */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 lg:p-12 order-2 lg:order-1 tire-details-container bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              {/* Left Column - Service Description */}
              <div className="flex flex-col justify-center space-y-6 sm:space-y-7">
                {motorcycleTires.length > 0 && motorcycleTires[0] ? (
                  <>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                      <div className="pl-4">
                        <div className="bg-gray-900/50 rounded-lg p-6 sm:p-7 md:p-8 border border-gray-700/50 space-y-5 sm:space-y-6">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                            {t('motorcycleServiceTitle')}
                          </h3>
                          <div className="space-y-4 sm:space-y-5">
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc1')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc2')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc3')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 font-medium">
                              {t('motorcycleServiceDesc4')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                      <div className="pl-4">
                        <div className="bg-gray-900/50 rounded-lg p-6 sm:p-7 md:p-8 border border-gray-700/50 space-y-5 sm:space-y-6">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                            {t('motorcycleServiceTitle')}
                          </h3>
                          <div className="space-y-4 sm:space-y-5">
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc1')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc2')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8">
                              {t('motorcycleServiceDesc3')}
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 font-medium">
                              {t('motorcycleServiceDesc4')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - ul list (next to image) */}
              <div className="flex flex-col justify-center">
                <div className="bg-gray-900/30 rounded-lg p-5 border border-gray-700/50">
                  <h5 className="text-white font-semibold mb-4 text-base sm:text-lg flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    {t('tireTypes')}
                  </h5>
                  <ul className="text-gray-300 text-sm sm:text-base space-y-3">
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('touring')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('sport')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('cruiser')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('sportTouring')}</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-orange-500 mr-3 mt-1.5 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors">{t('offRoad')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Side - Right */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[400px] bg-black order-1 lg:order-2 lg:col-span-1 overflow-hidden tire-image-container pb-0 m-0">
              <img
                src="/images/m_tire_3.jpg"
                alt="Motorcycle tires"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/images/tires/motorcycle-tire-generic.jpg';
                }}
              />
            </div>

            {motorcycleBrands.length > 0 && (
              <div className="lg:col-span-3 pt-4 sm:pt-5 md:pt-6 border-t border-gray-700 px-4 sm:px-6 md:px-8 lg:px-12 order-3">
                <h5 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                  {t('brandsWeCarry')}
                </h5>
                <div className="flex flex-wrap gap-2 sm:gap-3 pb-4 sm:pb-5 md:pb-6">
                  {motorcycleBrands.map((brand) => (
                    <span
                      key={brand}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm hover:bg-orange-500 hover:text-white transition-all"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-lg p-4 sm:p-6 md:p-8 border border-orange-500/30">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            {t('needHelpFindingTires')}
          </h3>
          <p className="text-gray-300 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            {t('contactForTires')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            <span>{t('contactUs')}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </section>
  );
});

