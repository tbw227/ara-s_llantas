import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const translations = {
  en: {
    // Header
    quality: 'Quality Tires Since 2010',
    home: 'Home',
    catalog: 'Catalog',
    about: 'About',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Premium Tires for',
    heroSubtitle: 'Every Ride',
    heroDescription: "From lawn mowers to motorcycles, we've got you covered with top brands and unbeatable service in Kansas City, KS.",
    shopNow: 'Shop Now',
    contactUs: 'Contact Us',
    topBrand: 'Top Brand Selection',
    expertInstall: 'Expert Installation',
    competitivePrices: 'Competitive Prices',
    
    // Catalog
    browseTires: 'Browse Our',
    tireSelection: 'Tire Selection',
    findPerfect: 'Find the perfect tires for your lawn mower or motorcycle',
    filterTires: 'Filter Tires',
    category: 'Category',
    allCategories: 'All Categories',
    lawnTires: 'Lawn Mower Tires',
    lawnMowerTires: 'Lawn Mower Tires',
    motorcycleTires: 'Motorcycle Tires',
    tireTypes: 'Tire Types',
    touring: 'Touring',
    sport: 'Sport',
    cruiser: 'Cruiser',
    sportTouring: 'Sport Touring',
    offRoad: 'Off Road',
    brand: 'Brand',
    allBrands: 'All Brands',
    size: 'Size',
    allSizes: 'All Sizes',
    showing: 'Showing',
    tires: 'tires',
    tire: 'tire',
    lawn: 'Lawn',
    motorcycle: 'Motorcycle',
    inStock: 'in stock',
    viewDetails: 'View Details',
    hideDetails: 'Hide Details',
    specifications: 'Specifications',
    description: 'Description',
    price: 'Price',
    availability: 'Availability',
    
    // About
    aboutTitle: 'About',
    servingKC: 'Serving Kansas City with pride since 2010',
    aboutText1: "At Ara's Llanta's, we're more than just a tire shop. Located at 618 Kansas Ave in Kansas City, Kansas, we've been providing our community with top-quality lawn and motorcycle tires for over a decade. Our commitment to excellence and customer satisfaction has made us the go-to destination for tire needs in the area.",
    aboutText2: "From lawn mowers to motorcycles, we carry all the major brands and sizes you need. Our expert team is here to help you find the perfect tire for your needs, backed by competitive pricing and professional service you can trust.",
    customerSay: 'What Our Customers Say',
    // Testimonials
    testimonial1Text: 'Excellent service and fair prices. They mounted my motorcycle tires perfectly and were very professional.',
    testimonial2Text: 'Great selection of lawn mower tires. Quick installation and the staff was very helpful.',
    testimonial3Text: 'Been coming here for years. Always reliable service and quality tires at good prices.',
    
    // Email
    exclusiveDeals: 'Get Exclusive Monthly Deals',
    subscribeText: 'Subscribe to our newsletter and never miss out on special promotions, new arrivals, and tire maintenance tips.',
    enterEmail: 'Enter your email address',
    subscribeNow: 'Subscribe Now',
    subscribed: 'Successfully subscribed!',
    privacyText: 'We respect your privacy. Unsubscribe anytime.',
    subscribeSuccess: 'Success!',
    subscribeSuccessText: "You've been subscribed to our monthly deals.",
    stayUpdated: 'Stay Updated',
    newsletterDescription: 'Subscribe to our newsletter for the latest tire deals and updates.',
    subscribe: 'Sign Me Up!',
    subscribing: 'Signing Up...',
    submitting: 'Submitting...',
    newsletterSubscribed: 'You have been subscribed to our newsletter.',
    subscribeErrorTitle: 'Error',
    subscribeError: 'Failed to subscribe. Please try again.',
    
    // Exit Modal
    beforeYouGo: 'Before You Go...',
    exitModalText: "Have questions or need help finding the right tire? Leave your details and we'll reach out!",
    yourName: 'Your Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    howCanHelp: 'How can we help you?',
    submit: 'Submit',
    justLeave: 'See You Soon',
    thankYou: 'Thank you!',
    getBackSoon: "We'll get back to you soon.",
    
    // Tire Showcase
    ourTires: 'Our Tire Selection',
    tireShowcaseDesc: 'We carry a wide selection of quality tires for lawn equipment and motorcycles. Contact us to find the perfect tire for your needs.',
    brandsWeCarry: 'Brands We Carry',
    needHelpFindingTires: 'Need Help Finding the Right Tires?',
    contactForTires: 'Contact us today! Our experts can help you find the perfect tires for your lawn equipment or motorcycle. We have sizes and brands to fit your needs.',
    // Lawn Mower Service
    lawnServiceTitle: 'Professional Lawn Mower Tire Service',
    lawnServiceDesc1: 'Our comprehensive lawn mower tire service includes expert consultation to find the perfect tire for your equipment.',
    lawnServiceDesc2: 'We provide professional mounting and balancing to ensure optimal performance and safety.',
    lawnServiceDesc3: 'We carry all major brands and sizes, from residential to commercial applications.',
    lawnServiceDesc4: 'Our experienced team guarantees quality installation and will help you select the right tire for your specific mowing needs.',
    features: 'Features',
    allLawnMowerTireSizes: 'All lawn mower tire sizes',
    turfFriendlyTreadPatterns: 'Turf-friendly tread patterns',
    longLastingDurability: 'Long-lasting durability',
    // Motorcycle Service
    motorcycleServiceTitle: 'Professional Motorcycle Tire Service',
    motorcycleServiceDesc1: 'Our professional motorcycle tire service includes expert tire selection based on your riding style and bike specifications.',
    motorcycleServiceDesc2: 'We provide precision mounting and balancing for optimal performance and safety.',
    motorcycleServiceDesc3: 'We work with all major tire manufacturers and can help you choose the perfect tire whether you\'re touring, sport riding, or cruising.',
    motorcycleServiceDesc4: 'Our team ensures proper installation and alignment for maximum safety and performance on the road.',
    
    // Footer
    trustedShop: 'Your trusted tire shop in Kansas City for over a decade. Quality tires, expert service.',
    contactInfo: 'Contact Info',
    location: '618 Kansas Ave, Kansas City, KS 66105',
    phone: '(913) 535-8888',
    email: 'info@arasllantas.com',
    hours: 'Mon-Sun: 9:00 AM - 7:00 PM',
    followUs: 'Follow Us',
    copyright: '© 2025 Ara\'s Llanta\'s. All rights reserved. | Quality Tires Since 2010'
  },
  es: {
    // Header
    quality: 'Llantas de Calidad Desde 2010',
    home: 'Inicio',
    catalog: 'Catálogo',
    about: 'Nosotros',
    contact: 'Contacto',
    
    // Hero
    heroTitle: 'Llantas Premium para',
    heroSubtitle: 'Cada Viaje',
    heroDescription: 'Desde cortadoras de césped hasta motocicletas, te tenemos cubierto con las mejores marcas y servicio inmejorable en Kansas City, KS.',
    shopNow: 'Comprar Ahora',
    contactUs: 'Contáctanos',
    topBrand: 'Selección de Mejores Marcas',
    expertInstall: 'Instalación Experta',
    competitivePrices: 'Precios Competitivos',
    
    // Catalog
    browseTires: 'Explora Nuestra',
    tireSelection: 'Selección de Llantas',
    findPerfect: 'Encuentra las llantas perfectas para tu cortadora de césped o motocicleta',
    filterTires: 'Filtrar Llantas',
    category: 'Categoría',
    allCategories: 'Todas las Categorías',
    lawnTires: 'Llantas para Cortadora de Césped',
    lawnMowerTires: 'Llantas para Cortadora de Césped',
    motorcycleTires: 'Llantas de Motocicleta',
    tireTypes: 'Tipos de Llantas',
    touring: 'Touring',
    sport: 'Deportivas',
    cruiser: 'Crucero',
    sportTouring: 'Sport Touring',
    offRoad: 'Todo Terreno',
    brand: 'Marca',
    allBrands: 'Todas las Marcas',
    size: 'Tamaño',
    allSizes: 'Todos los Tamaños',
    showing: 'Mostrando',
    tires: 'llantas',
    tire: 'llanta',
    lawn: 'Césped',
    motorcycle: 'Motocicleta',
    inStock: 'en stock',
    viewDetails: 'Ver Detalles',
    hideDetails: 'Ocultar Detalles',
    specifications: 'Especificaciones',
    description: 'Descripción',
    price: 'Precio',
    availability: 'Disponibilidad',
    
    // About
    aboutTitle: 'Sobre',
    servingKC: 'Sirviendo a Kansas City con orgullo desde 2010',
    aboutText1: 'En Ara\'s Llanta\'s, somos más que una tienda de llantas. Ubicados en 618 Kansas Ave en Kansas City, Kansas, hemos estado proporcionando a nuestra comunidad llantas de césped y motocicleta de primera calidad durante más de una década. Nuestro compromiso con la excelencia y la satisfacción del cliente nos ha convertido en el destino preferido para necesidades de llantas en el área.',
    aboutText2: 'Desde cortadoras de césped hasta motocicletas, tenemos todas las marcas y tamaños principales que necesitas. Nuestro equipo experto está aquí para ayudarte a encontrar la llanta perfecta para tus necesidades, respaldado por precios competitivos y servicio profesional en el que puedes confiar.',
    customerSay: 'Lo Que Dicen Nuestros Clientes',
    // Testimonials
    testimonial1Text: 'Excelente servicio y precios justos. Montaron mis llantas de motocicleta perfectamente y fueron muy profesionales.',
    testimonial2Text: 'Excelente selección de llantas para cortadora de césped. Instalación rápida y el personal fue muy servicial.',
    testimonial3Text: 'Vengo aquí desde hace años. Siempre servicio confiable y llantas de calidad a buenos precios.',
    
    // Email
    exclusiveDeals: 'Obtén Ofertas Mensuales Exclusivas',
    subscribeText: 'Suscríbete a nuestro boletín y nunca te pierdas promociones especiales, nuevos productos y consejos de mantenimiento de llantas.',
    enterEmail: 'Ingresa tu dirección de correo electrónico',
    subscribeNow: 'Suscribirse Ahora',
    subscribed: '¡Suscripción exitosa!',
    privacyText: 'Respetamos tu privacidad. Cancela en cualquier momento.',
    subscribeSuccess: '¡Éxito!',
    subscribeSuccessText: 'Te has suscrito a nuestras ofertas mensuales.',
    stayUpdated: 'Mantente Actualizado',
    newsletterDescription: 'Suscríbete a nuestro boletín para las últimas ofertas de llantas y actualizaciones.',
    subscribe: '¡Inscríbeme!',
    subscribing: 'Inscribiendo...',
    submitting: 'Enviando...',
    newsletterSubscribed: 'Te has suscrito a nuestro boletín.',
    subscribeErrorTitle: 'Error',
    subscribeError: 'Error al suscribirse. Por favor, inténtalo de nuevo.',
    
    // Exit Modal
    beforeYouGo: 'Antes de Irte...',
    exitModalText: '¿Tienes preguntas o necesitas ayuda para encontrar la llanta correcta? ¡Deja tus datos y te contactaremos!',
    yourName: 'Tu Nombre',
    emailAddress: 'Correo Electrónico',
    phoneNumber: 'Número de Teléfono',
    howCanHelp: '¿Cómo podemos ayudarte?',
    submit: 'Enviar',
    justLeave: 'Hasta Pronto',
    thankYou: '¡Gracias!',
    getBackSoon: 'Te contactaremos pronto.',
    
    // Tire Showcase
    ourTires: 'Nuestra Selección de Llantas',
    tireShowcaseDesc: 'Tenemos una amplia selección de llantas de calidad para equipo de jardín y motocicletas. Contáctanos para encontrar la llanta perfecta para tus necesidades.',
    brandsWeCarry: 'Marcas que Ofrecemos',
    needHelpFindingTires: '¿Necesitas Ayuda para Encontrar las Llantas Correctas?',
    contactForTires: '¡Contáctanos hoy! Nuestros expertos pueden ayudarte a encontrar las llantas perfectas para tu equipo de jardín o motocicleta. Tenemos tamaños y marcas que se adaptan a tus necesidades.',
    // Lawn Mower Service
    lawnServiceTitle: 'Servicio Profesional de Llantas para Cortadora de Césped',
    lawnServiceDesc1: 'Nuestro servicio integral de llantas para cortadora de césped incluye consultoría experta para encontrar la llanta perfecta para tu equipo.',
    lawnServiceDesc2: 'Proporcionamos montaje y balanceo profesional para garantizar un rendimiento y seguridad óptimos.',
    lawnServiceDesc3: 'Tenemos todas las marcas y tamaños principales, desde aplicaciones residenciales hasta comerciales.',
    lawnServiceDesc4: 'Nuestro equipo experimentado garantiza una instalación de calidad y te ayudará a seleccionar la llanta correcta para tus necesidades específicas de corte.',
    features: 'Características',
    allLawnMowerTireSizes: 'Todos los tamaños de llantas para cortadora de césped',
    turfFriendlyTreadPatterns: 'Patrones de banda de rodadura amigables con el césped',
    longLastingDurability: 'Durabilidad duradera',
    // Motorcycle Service
    motorcycleServiceTitle: 'Servicio Profesional de Llantas para Motocicleta',
    motorcycleServiceDesc1: 'Nuestro servicio profesional de llantas para motocicleta incluye selección experta de llantas basada en tu estilo de conducción y especificaciones de tu motocicleta.',
    motorcycleServiceDesc2: 'Proporcionamos montaje y balanceo de precisión para un rendimiento y seguridad óptimos.',
    motorcycleServiceDesc3: 'Trabajamos con todos los principales fabricantes de llantas y podemos ayudarte a elegir la llanta perfecta, ya sea que estés haciendo turismo, conduciendo deportivo o paseando.',
    motorcycleServiceDesc4: 'Nuestro equipo asegura una instalación y alineación adecuadas para la máxima seguridad y rendimiento en la carretera.',
    
    // Footer
    trustedShop: 'Tu tienda de llantas de confianza en Kansas City por más de una década. Llantas de calidad, servicio experto.',
    contactInfo: 'Información de Contacto',
    location: '618 Kansas Ave, Kansas City, KS 66105',
    phone: '(913) 535-8888',
    email: 'info@arasllantas.com',
    hours: 'Lun-Dom: 9:00 AM - 7:00 PM',
    followUs: 'Síguenos',
    copyright: '© 2025 Ara\'s Llanta\'s. Todos los derechos reservados. | Llantas de Calidad Desde 2010'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  }, []);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    toggleLanguage
  }), [language, t, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};