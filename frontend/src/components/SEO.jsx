import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO Component
 * Manages dynamic meta tags, Open Graph, Twitter Cards, and structured data
 */
export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website'
}) => {
  const { language } = useLanguage();
  const siteName = "Ara's Llanta's";
  const defaultTitle = language === 'es' 
    ? "Ara's Llanta's - Llantas de Calidad Desde 2010"
    : "Ara's Llanta's - Quality Tires Since 2010";
  const defaultDescription = language === 'es'
    ? "Llantas de calidad para cortadoras de césped y motocicletas en Kansas City, KS. Servicio profesional de montaje, balanceo y reparación desde 2010. Encuentra las llantas perfectas con precios competitivos y atención experta."
    : "Quality lawn mower and motorcycle tires in Kansas City, KS. Professional tire mounting, balancing, and repair services since 2010. Find the perfect tires with competitive prices and expert service.";
  const defaultImage = typeof window !== 'undefined' 
    ? `${window.location.origin}/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png`
    : '/images/b7b1ad6a-37e5-493e-af46-136af60250c0.png';
  const defaultUrl = typeof window !== 'undefined' ? window.location.href : 'https://arasllantas.com/';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalKeywords = keywords || (language === 'es'
    ? "llantas Kansas City, llantas de motocicleta Kansas City KS, llantas para cortadora de césped, servicio de llantas cerca de mí, montaje de llantas, balanceo de llantas, reparación de llantas, tienda de llantas, llantas baratas Kansas City, llantas de calidad"
    : "tires Kansas City, motorcycle tires Kansas City KS, lawn mower tires, tire service near me, tire mounting, tire balancing, tire repair, tire shop, cheap tires Kansas City, quality tires, tire installation Kansas City");

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', siteName);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', language === 'es' ? 'Spanish' : 'English');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:image', finalImage, 'property');
    updateMetaTag('og:url', finalUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', language === 'es' ? 'es_US' : 'en_US', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', language === 'es' ? 'es' : 'en');
  }, [finalTitle, finalDescription, finalImage, finalUrl, finalKeywords, language, type]);

  // Structured Data (JSON-LD)
  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://arasllantas.com';

    // 1. Local Business structured data (enhanced)
    const businessData = {
      "@context": "https://schema.org",
      "@type": "AutoPartsStore",
      "name": siteName,
      "description": finalDescription,
      "url": baseUrl,
      "logo": defaultImage,
      "image": [defaultImage],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "618 Kansas Ave",
        "addressLocality": "Kansas City",
        "addressRegion": "KS",
        "postalCode": "66105",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "39.1142",
        "longitude": "-94.6275"
      },
      "telephone": "(913) 535-8888",
      "email": "info@arasllantas.com",
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Kansas City",
          "sameAs": "https://en.wikipedia.org/wiki/Kansas_City,_Kansas"
        },
        {
          "@type": "State",
          "name": "Kansas"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tire Catalog",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Lawn Mower Tires",
              "description": "Quality lawn mower tires for all makes and models"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Motorcycle Tires",
              "description": "Premium motorcycle tires for all bike types"
            }
          }
        ]
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tire Mounting",
            "description": "Professional tire mounting service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tire Balancing",
            "description": "Tire balancing service for optimal performance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tire Repair",
            "description": "Expert tire repair and patch services"
          }
        }
      ]
    };

    // 2. Service schemas
    const servicesData = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Tire Mounting Service",
        "provider": {
          "@type": "AutoPartsStore",
          "name": siteName
        },
        "areaServed": {
          "@type": "City",
          "name": "Kansas City",
          "addressRegion": "KS"
        },
        "description": "Professional tire mounting service for lawn mowers and motorcycles"
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Tire Balancing Service",
        "provider": {
          "@type": "AutoPartsStore",
          "name": siteName
        },
        "areaServed": {
          "@type": "City",
          "name": "Kansas City",
          "addressRegion": "KS"
        },
        "description": "Expert tire balancing to ensure smooth rides and extended tire life"
      }
    ];

    // 3. Review/Rating schema
    const reviewsData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": siteName,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Maria Rodriguez"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": language === 'es' 
            ? "Excelente servicio y precios justos. Encontré las llantas perfectas para mi motocicleta."
            : "Excellent service and fair prices. Found the perfect tires for my motorcycle."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "John Smith"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": language === 'es'
            ? "Servicio rápido y profesional. Muy recomendado para llantas de cortadora de césped."
            : "Fast and professional service. Highly recommended for lawn mower tires."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Carlos Mendez"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": language === 'es'
            ? "El mejor lugar para llantas en Kansas City. Atención personalizada y calidad garantizada."
            : "The best place for tires in Kansas City. Personalized attention and guaranteed quality."
        }
      ]
    };

    // 4. FAQ schema
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": language === 'es' ? "¿Qué tipos de llantas venden?" : "What types of tires do you sell?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'es'
              ? "Vendemos llantas para cortadoras de césped y motocicletas. Tenemos una amplia selección de marcas y tamaños para satisfacer todas sus necesidades."
              : "We sell tires for lawn mowers and motorcycles. We have a wide selection of brands and sizes to meet all your needs."
          }
        },
        {
          "@type": "Question",
          "name": language === 'es' ? "¿Ofrecen servicio de montaje de llantas?" : "Do you offer tire mounting service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'es'
              ? "Sí, ofrecemos servicio profesional de montaje, balanceo y reparación de llantas para cortadoras de césped y motocicletas."
              : "Yes, we offer professional tire mounting, balancing, and repair services for lawn mowers and motorcycles."
          }
        },
        {
          "@type": "Question",
          "name": language === 'es' ? "¿Cuáles son sus horarios?" : "What are your hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'es'
              ? "Estamos abiertos de lunes a domingo de 9:00 AM a 7:00 PM."
              : "We are open Monday through Sunday from 9:00 AM to 7:00 PM."
          }
        },
        {
          "@type": "Question",
          "name": language === 'es' ? "¿Dónde están ubicados?" : "Where are you located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": language === 'es'
              ? "Estamos ubicados en 618 Kansas Ave, Kansas City, KS 66105."
              : "We are located at 618 Kansas Ave, Kansas City, KS 66105."
          }
        }
      ]
    };

    // 5. Breadcrumb schema
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": language === 'es' ? "Inicio" : "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": language === 'es' ? "Llantas" : "Tires",
          "item": `${baseUrl}/#tires`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": language === 'es' ? "Sobre Nosotros" : "About",
          "item": `${baseUrl}/#about`
        }
      ]
    };

    // Add all structured data scripts
    const allData = [businessData, ...servicesData, reviewsData, faqData, breadcrumbData];
    allData.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      const scriptsToRemove = document.querySelectorAll('script[type="application/ld+json"]');
      scriptsToRemove.forEach(script => script.remove());
    };
  }, [finalDescription, language, defaultImage]);

  return null; // This component doesn't render anything
};

