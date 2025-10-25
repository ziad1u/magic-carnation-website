import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Magic Carnation - وكالة محتوى تيكتوك المتخصصة",
  description = "وكالة Magic Carnation المتخصصة في إنتاج محتوى تيكتوك إبداعي وجذاب يحقق ملايين المشاهدات. انضم لوكالتنا واحصل على دعم كامل لتطوير محتواك.",
  keywords = "تيكتوك, محتوى, وكالة, إنتاج فيديو, تسويق رقمي, منشئ محتوى, فيروسي, مشاهدات, إبداع, Magic Carnation",
  image = "/hero-image.jpg",
  url = "https://magiccarnation.com",
  type = "website",
  author = "Magic Carnation",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  locale = "ar_SA",
  alternateLocales = ["en_US"],
  canonical,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes("Magic Carnation") ? title : `${title} | Magic Carnation`;
  const fullImageUrl = image.startsWith('http') ? image : `https://magiccarnation.com${image}`;
  const fullUrl = url.startsWith('http') ? url : `https://magiccarnation.com${url}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Locale */}
      <html lang={locale.split('_')[0]} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map(loc => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Magic Carnation" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@magic.carnation1" />
      <meta name="twitter:creator" content="@magic.carnation1" />
      
      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ec4899" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Logo and Brand Meta Tags */}
      <meta property="og:image:alt" content="Magic Carnation Logo - وكالة إنتاج محتوى تيكتوك" />
      <meta name="twitter:image:alt" content="Magic Carnation Logo - وكالة إنتاج محتوى تيكتوك" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/logo-magic.svg" />
      <link rel="apple-touch-icon" href="/logo-magic.svg" />
      <link rel="shortcut icon" href="/logo-magic.svg" />
      <link rel="mask-icon" href="/logo-magic.svg" color="#ec4899" />
      
      {/* Additional Brand Meta Tags for Search Engines */}
      <meta name="application-name" content="Magic Carnation" />
      <meta name="apple-mobile-web-app-title" content="Magic Carnation" />
      <meta name="msapplication-TileImage" content="/logo-magic.svg" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Magic Carnation",
          "alternateName": "وكالة ماجيك كارنيشن",
          "description": description,
          "url": "https://magiccarnation.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://magiccarnation.com/logo-magic.svg",
            "width": 200,
            "height": 200,
            "caption": "Magic Carnation Logo"
          },
          "image": {
            "@type": "ImageObject",
            "url": fullImageUrl,
            "width": 1200,
            "height": 630,
            "caption": "Magic Carnation - وكالة إنتاج محتوى تيكتوك"
          },
          "sameAs": [
            "https://www.tiktok.com/@magic.carnation1",
            "https://instagram.com/magic.carnation1",
            "https://youtube.com/@magic.carnation1"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+212-539-123-456",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English", "French"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "شارع محمد الخامس، وسط المدينة",
            "addressLocality": "Tangier",
            "addressRegion": "Tanger-Tétouan-Al Hoceïma",
            "postalCode": "90000",
            "addressCountry": "MA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.7595,
            "longitude": -5.8340
          },
          "foundingDate": "2020",
          "founder": {
            "@type": "Person",
            "name": "Magic Carnation Team"
          },
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 10:00-16:00"
          ],
          "priceRange": "$$",
          "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
          "currenciesAccepted": "MAD",
          "areaServed": {
            "@type": "Country",
            "name": "Morocco"
          },
          "hasMap": "https://maps.google.com/?q=35.7595,-5.8340",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "أحمد محمد"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "وكالة ممتازة لإنتاج محتوى تيكتوك، فريق محترف ونتائج مذهلة!"
            }
          ],
          "brand": {
            "@type": "Brand",
            "name": "Magic Carnation",
            "logo": "https://magiccarnation.com/logo-magic.svg"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://magiccarnation.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 35.7595,
              "longitude": -5.8340
            },
            "geoRadius": "1000000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "خدمات إنتاج المحتوى",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "إنتاج محتوى تيكتوك",
                  "description": "إنتاج فيديوهات تيكتوك إبداعية وجذابة تحقق ملايين المشاهدات"
                },
                "price": "500",
                "priceCurrency": "MAD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "استراتيجية التسويق الرقمي",
                  "description": "تطوير استراتيجيات تسويقية فعالة للمحتوى والعلامات التجارية"
                },
                "price": "800",
                "priceCurrency": "MAD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "إدارة الحسابات",
                  "description": "إدارة حسابات تيكتوك وإدارة المحتوى اليومية"
                },
                "price": "1200",
                "priceCurrency": "MAD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "تصميم الجرافيك",
                  "description": "تصميم صور ومحتوى بصري احترافي للمنصات الاجتماعية"
                },
                "price": "300",
                "priceCurrency": "MAD",
                "availability": "https://schema.org/InStock"
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
