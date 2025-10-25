import { useState, useEffect, useRef } from 'react';
import WelcomeSplash from './components/WelcomeSplash';
import MobileWelcome from './components/MobileWelcome';
import { Menu, X, Play, ArrowRight, Instagram, Briefcase, UserPlus, Headphones, ChevronDown, MessageCircle, Target, Rocket, Award, TrendingUp, Film } from 'lucide-react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'react-i18next';
import JobApplicationPage from './components/JobApplicationPage';
import LiveModeratorPage from './components/LiveModeratorPage';
import JoinAgencyPage from './components/JoinAgencyPage';
import OnlineJoinPage from './components/OnlineJoinPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import AboutUsPage from './components/AboutUsPage';
import CommunicationCenter from './components/CommunicationCenter';
import AdminLogin from './components/AdminLogin';

function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'job-application' | 'live-moderator' | 'join-agency' | 'online-join' | 'contact' | 'privacy-policy' | 'terms-conditions' | 'about-us' | 'communication-center'>('home');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [pendingAdminPage, setPendingAdminPage] = useState<string | null>(null);
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const lastScrollY = useRef(window.scrollY);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setShowNavbar(false); // Hide navbar on scroll down
          } else {
            setShowNavbar(true); // Show navbar on scroll up
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Show welcome splash on every visit
  useEffect(() => {
    setShowSplash(true);
  }, []);

  // Show mobile welcome only on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowOnboarding(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  // Check admin status on component mount
  useEffect(() => {
    checkAdminStatus();
  }, []);

  // Temporary: Force show welcome screen for testing (remove this later)
  // useEffect(() => {
  //   // Force show the welcome screen for testing
  //   setShowOnboarding(true);
  // }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };


  // Function to check admin status
  const checkAdminStatus = () => {
    const adminKey = localStorage.getItem('adminKey');
    const isAdminUser = adminKey === 'magic_carnation_admin_2024';
    setIsAdmin(isAdminUser);
    return isAdminUser;
  };

  // Function to handle admin login
  const handleAdminLogin = () => {
    setShowAdminLogin(true);
  };

  // Function to handle text click for admin password
  const handleTextClick = () => {
    setShowAdminPasswordModal(true);
  };

  // Function to verify admin password
  const handleAdminPasswordSubmit = () => {
    if (adminPasswordInput === '2003') {
      localStorage.setItem('adminKey', 'magic_carnation_admin_2024');
      localStorage.setItem('adminUser', 'admin');
      setIsAdmin(true);
      setShowAdminPasswordModal(false);
      setAdminPasswordInput('');
      setCurrentPage('home');
      
      
      // Show success toast
      const toast = document.createElement('div');
      toast.innerHTML = `
        <div class="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-green-300/30 backdrop-blur-sm transform transition-all duration-300 ease-out" style="animation: slideInRight 0.4s ease-out;">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="font-medium">تم تسجيل الدخول كإدمن بنجاح!</span>
          </div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    } else {
      // Show error toast
      const toast = document.createElement('div');
      toast.innerHTML = `
        <div class="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-xl shadow-lg border border-red-300/30 backdrop-blur-sm transform transition-all duration-300 ease-out" style="animation: slideInRight 0.4s ease-out;">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            <span class="font-medium">كلمة المرور غير صحيحة!</span>
          </div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  };

  // Function to handle admin authentication
  const handleAdminAuth = (username: string, password: string): boolean => {
    // بيانات الإدمن الصحيحة
    const validCredentials = [
      { username: 'admin', password: '9901' },
      { username: 'ziad', password: '2003' },
      { username: 'magic', password: 'carnation2024' }
    ];

    const isValid = validCredentials.some(cred => 
      cred.username === username && cred.password === password
    );

    if (isValid) {
      localStorage.setItem('adminKey', 'magic_carnation_admin_2024');
      localStorage.setItem('adminUser', username);
      setIsAdmin(true);
      setShowAdminLogin(false);
      
      // Handle redirect to pending page
      handleSuccessfulLogin();
      
      // إنشاء toast notification صغير وجميل
      const toast = document.createElement('div');
      toast.innerHTML = `
        <div class="fixed top-4 right-4 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg border border-pink-300/30 backdrop-blur-sm transform transition-all duration-300 ease-out" style="animation: slideInRight 0.4s ease-out;">
          <div class="flex items-center space-x-2 space-x-reverse">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-sm">✨</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">مرحباً ${username} في لوحة الإدارة!</p>
              <p class="text-xs opacity-90">تم تسجيل الدخول بنجاح</p>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.remove();
      }, 4000);

      return true;
    }

    return false;
  };


  // Handle successful admin login and redirect to pending page
  const handleSuccessfulLogin = () => {
    if (pendingAdminPage) {
      setCurrentPage(pendingAdminPage as any);
      setPendingAdminPage(null);
    }
  };

  // Function to submit admin login
  const submitAdminLogin = () => {
    if (adminPassword === '2003') {
      localStorage.setItem('adminKey', 'magic_carnation_admin_2024');
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      
      // إنشاء toast notification صغير وجميل
      const toast = document.createElement('div');
      toast.innerHTML = `
        <div class="fixed top-4 right-4 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg border border-pink-300/30 backdrop-blur-sm transform transition-all duration-300 ease-out" style="animation: slideInRight 0.4s ease-out;">
          <div class="flex items-center space-x-2 space-x-reverse">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-sm">✨</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm">مرحباً زياد! 🎉</p>
            </div>
            <div class="flex-shrink-0">
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white/70 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <style>
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        </style>
      `;
      
      document.body.appendChild(toast);
      
      // إزالة التوجيه تلقائياً بعد 3 ثوان
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.animation = 'slideInRight 0.4s ease-out reverse';
          setTimeout(() => {
            if (toast.parentElement) {
              toast.remove();
            }
          }, 400);
        }
      }, 3000);
      
    } else {
      // رسالة خطأ صغيرة وأنيقة
      const errorToast = document.createElement('div');
      errorToast.innerHTML = `
        <div class="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl shadow-lg border border-red-300/30 backdrop-blur-sm transform transition-all duration-300 ease-out" style="animation: slideInRight 0.4s ease-out;">
          <div class="flex items-center space-x-2 space-x-reverse">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-sm">⚠️</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm">كلمة المرور غير صحيحة</p>
            </div>
            <div class="flex-shrink-0">
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white/70 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(errorToast);
      
      setTimeout(() => {
        if (errorToast.parentElement) {
          errorToast.style.animation = 'slideInRight 0.4s ease-out reverse';
          setTimeout(() => {
            if (errorToast.parentElement) {
              errorToast.remove();
            }
          }, 400);
        }
      }, 3000);
    }
  };

  // Function to close admin login
  const closeAdminLogin = () => {
    setShowAdminLogin(false);
    setAdminPassword('');
  };

  // Check admin status on component mount
  useEffect(() => {
    checkAdminStatus();
  }, []);


  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  if (currentPage === 'job-application') {
    return <JobApplicationPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'live-moderator') {
    return <LiveModeratorPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'join-agency') {
    return <JoinAgencyPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'online-join') {
    return <OnlineJoinPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'communication-center') {
    return <CommunicationCenter onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'privacy-policy') {
    return <PrivacyPolicyPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'terms-conditions') {
    return <TermsConditionsPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'about-us') {
    return <AboutUsPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <>
      <NextSeo
        title="Magic Carnation - وكالة تيك توك الرائدة في المغرب | إنتاج محتوى احترافي"
        description="وكالة Magic Carnation الرائدة في إنتاج المحتوى التسويقي على تيك توك. نقدم خدمات إنتاج الفيديو، التسويق الرقمي، وإدارة حسابات تيك توك للشركات والأفراد في المغرب. احصل على ملايين المشاهدات معنا!"
        canonical="https://www.magiccarnations.com"
        openGraph={{
          type: 'website',
          url: 'https://www.magiccarnations.com',
          title: 'Magic Carnation - وكالة تيك توك الرائدة في المغرب',
          description: 'وكالة Magic Carnation الرائدة في إنتاج المحتوى التسويقي على تيك توك. نقدم خدمات إنتاج الفيديو، التسويق الرقمي، وإدارة حسابات تيك توك للشركات والأفراد في المغرب.',
          images: [
            {
              url: 'https://www.magiccarnations.com/hero-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Magic Carnation - وكالة تيك توك الرائدة في المغرب',
            },
          ],
          site_name: 'Magic Carnation',
          locale: 'ar_MA',
        }}
        twitter={{
          handle: '@magic.carnation1',
          site: '@magic.carnation1',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'تيك توك, TikTok, وكالة تيك توك, إنتاج محتوى, تسويق رقمي, المغرب, Magic Carnation, فيديو تسويقي, إدارة حسابات, منشئ محتوى, وكالة تسويق, TikTok agency, content creation, digital marketing, Morocco, مشاهدات, viral, viral videos, إعلانات تيك توك, TikTok ads, تسويق تيك توك, TikTok marketing, وكالة إعلانات, وكالة تسويق رقمي, digital agency, social media marketing, influencer marketing, وكالة إنفلونسر, وكالة محتوى, content agency, video production, إنتاج فيديو, مونتاج, editing, تصوير, photography, إخراج, directing, سيناريو, script writing, تحليل أداء, performance analysis, إحصائيات, analytics, إدارة حسابات, account management, رعايات, sponsorships, شراكات, partnerships, وكالة المغرب, Morocco agency, وكالة الدار البيضاء, Casablanca agency, وكالة الرباط, Rabat agency',
          },
          {
            name: 'author',
            content: 'Magic Carnation - وكالة تيك توك',
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
          },
          {
            name: 'theme-color',
            content: '#ec4899',
          },
          {
            name: 'msapplication-TileColor',
            content: '#ec4899',
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
          {
            name: 'format-detection',
            content: 'telephone=no',
          },
          {
            property: 'og:locale',
            content: 'ar_MA',
          },
          {
            property: 'og:locale:alternate',
            content: 'en_US',
          },
          {
            property: 'og:locale:alternate',
            content: 'zh_CN',
          },
          {
            name: 'twitter:image:alt',
            content: 'Magic Carnation - وكالة تيك توك الرائدة في المغرب',
          },
          {
            name: 'language',
            content: 'Arabic',
          },
          {
            name: 'geo.region',
            content: 'MA',
          },
          {
            name: 'geo.country',
            content: 'Morocco',
          },
          {
            name: 'geo.placename',
            content: 'Morocco',
          },
          {
            name: 'ICBM',
            content: '31.6295, -7.9811',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/logo-magic.svg',
            type: 'image/svg+xml',
          },
          {
            rel: 'apple-touch-icon',
            href: '/logo-magic.svg',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'anonymous',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://www.tiktok.com',
          },
          {
            rel: 'dns-prefetch',
            href: 'https://wa.me',
          },
        ]}
      />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Magic Carnation",
            "alternateName": "وكالة تيك توك",
            "url": "https://www.magiccarnations.com",
            "logo": "https://www.magiccarnations.com/logo-magic.svg",
            "description": "وكالة Magic Carnation الرائدة في إنتاج المحتوى التسويقي على تيك توك في المغرب",
            "foundingDate": "2023",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "MA",
              "addressLocality": "Morocco"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+212655723182",
              "contactType": "customer service",
              "availableLanguage": ["Arabic", "English", "Chinese"]
            },
            "sameAs": [
              "https://www.tiktok.com/@magic.carnation1",
              "https://wa.me/212655723182"
            ],
            "service": [
              {
                "@type": "Service",
                "name": "إنتاج محتوى تيك توك",
                "description": "إنتاج فيديوهات احترافية لتيك توك"
              },
              {
                "@type": "Service", 
                "name": "التسويق الرقمي",
                "description": "خدمات التسويق الرقمي وإدارة الحسابات"
              },
              {
                "@type": "Service",
                "name": "إدارة حسابات تيك توك",
                "description": "إدارة وتطوير حسابات تيك توك"
              }
            ],
            "areaServed": {
              "@type": "Country",
              "name": "Morocco"
            }
          })
        }}
      />
      
      {showSplash && (
        <WelcomeSplash onFinish={handleSplashFinish} />
      )}

      {showOnboarding && (
        <MobileWelcome 
          onClose={handleCloseOnboarding} 
          onJoinAgency={() => {
            setShowOnboarding(false);
            setCurrentPage('join-agency');
          }}
        />
      )}


        <div 
          className="min-h-screen bg-black text-white overflow-x-hidden"
        >
        {/* Mobile-First Floating Action Buttons */}
        <div className="hidden md:flex fixed bottom-4 right-4 z-50 flex-col gap-3">
          {/* مركز التواصل - للإدمن فقط */}
          {isAdmin && (
            <div className="group relative">
              <button 
                onClick={() => setCurrentPage('communication-center')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-blue-400/30"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
                مركز التواصل
              </div>
            </div>
          )}

          {/* طلب عمل */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('job-application')}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-blue-400/30"
            >
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              {t('job_application')}
            </div>
          </div>

          {/* طلب عمل مشرف لايف */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('live-moderator')}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-purple-400/30"
            >
              <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              {t('live_moderator')}
            </div>
          </div>

          {/* الانضمام للوكالة */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('join-agency')}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-pink-400/30"
            >
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              {t('join_agency')}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800 transition-transform duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ willChange: 'transform', top: '0' }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="relative group">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer transition-all duration-300 hover:scale-110"
                      onClick={() => setCurrentPage('home')}
                    />
                    
                    {/* Hidden Admin Login Tooltip */}
                    {!isAdmin && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                        <div className="bg-black/90 backdrop-blur-sm border border-orange-400/50 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-lg">
                          <div className="text-orange-300 font-bold mb-1">🔐 تسجيل دخول الإدارة</div>
                          <div className="text-gray-300">اضغط هنا لتسجيل الدخول ك إدمن</div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-orange-400/50 rotate-45"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Hidden Admin Login Click Handler */}
                    {!isAdmin && (
                      <div 
                        className="absolute inset-0 cursor-pointer z-10"
                        onClick={handleAdminLogin}
                        title="اضغط هنا لتسجيل الدخول ك إدمن"
                      ></div>
                    )}
                  </div>
                  
                  <span 
                    className="text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"
                    onClick={handleTextClick}
                  >
                  <span className="hidden sm:inline">Magic Carnation</span>
                  <span className="sm:hidden text-xs">MAGIC</span>
                </span>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  <a 
                    href="#portfolio" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer mr-8"
                  >
                    {t('portfolio')}
                  </a>
                  
                  
                  <button 
                    onClick={() => setCurrentPage('live-moderator')}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:text-cyan-400 mx-12"
                  >
                    {t('live_moderator')}
                  </button>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors ml-8">{t('contact')}</a>
                  
                  {/* Language Switcher - Enhanced */}
                  <div className="relative group">
                    <button 
                      onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                      className="relative overflow-hidden flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-purple-500/10 hover:from-purple-500/25 hover:via-pink-500/30 hover:to-purple-500/25 border border-purple-400/40 hover:border-pink-400/60 rounded-xl text-gray-300 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 backdrop-blur-sm"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/20 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/30 group-hover:to-purple-500/20 transition-all duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative flex items-center space-x-4">
                        <div className="relative">
                          <svg 
                            className="w-4 h-4 text-purple-400 group-hover:text-pink-300 transition-all duration-300 group-hover:scale-110" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        
                        <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                          {languages.find(lang => lang.code === currentLanguage)?.flag}
                        </span>
                        
                        <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wide px-2 py-1 rounded-md bg-purple-500/10 group-hover:bg-pink-500/10 transition-all duration-300">
                          {currentLanguage === 'ar' ? 'عرب' : 'ENG'}
                        </span>
                        
                        <ChevronDown className={`w-4 h-4 transition-all duration-500 ${
                          isLanguageMenuOpen 
                            ? 'rotate-180 text-pink-400' 
                            : 'text-purple-400 group-hover:text-pink-300 group-hover:translate-y-0.5'
                        }`} />
                      </div>
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                    
                    {isLanguageMenuOpen && (
                      <div className="absolute top-full right-0 mt-3 w-56 bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                          <div className="bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 p-4 border-b border-purple-400/20 rounded-t-xl">
                            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent text-center flex items-center justify-center space-x-2">
                              <svg 
                                className="w-5 h-5 text-pink-400" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                              </svg>
                              <span>اختر اللغة / Choose Language</span>
                            </h3>
                          </div>
                          <div className="py-2">
                            {[
                              { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                              { code: 'en', name: 'English', flag: '🇺🇸' }
                            ].map((language) => (
                              <button
                                key={language.code}
                                onClick={() => changeLanguage(language.code)}
                                className={`w-full relative overflow-hidden flex items-center space-x-4 px-4 py-4 text-sm transition-all duration-500 group rounded-xl mb-2 transform hover:scale-[1.02] ${
                                  currentLanguage === language.code 
                                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white border border-pink-400/50 shadow-lg shadow-pink-500/25' 
                                    : 'text-gray-300 hover:text-white hover:border-purple-400/30 hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-pink-500/15'
                                }`}
                              >
                                {/* Animated Background */}
                                <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 ${
                                  currentLanguage === language.code 
                                    ? 'from-pink-500/20 via-purple-500/20 to-pink-500/20 opacity-100' 
                                    : 'from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 opacity-0 group-hover:opacity-100'
                                }`}></div>
                                
                                {/* Content */}
                                <span className="relative text-2xl font-bold group-hover:scale-110 transition-transform duration-300">{language.flag}</span>
                                <span className="relative text-lg font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent group-hover:from-pink-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">{language.name}</span>
                                
                                {currentLanguage === language.code && (
                                  <div className="relative ml-auto flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                                    <div className="w-6 h-6 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-lg flex items-center justify-center">
                                      <span className="text-pink-400 text-xs font-bold">✓</span>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <button 
                  onClick={() => setCurrentPage('join-agency')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25 border border-pink-400/40"
                >
                  {t('join_agency')}
                </button>
              </div>

              <div className="md:hidden flex items-center space-x-1.5 sm:space-x-2">
                {isAdmin && (
                  <div className="flex items-center space-x-1">
                  </div>
                )}

                {/* Mobile Language Switcher Button - Compact */}
                <button 
                  onClick={() => {
                    const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
                    changeLanguage(newLang);
                  }}
                  className="relative overflow-hidden p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-purple-500/10 border border-purple-400/30 transition-all group"
                  title="تبديل اللغة"
                >
                  {/* Content */}
                  <div className="relative flex items-center space-x-1">
                    <span className="text-sm">
                      {currentLanguage === 'ar' ? '🇸🇦' : '🇺🇸'}
                    </span>
                    <span className="text-[8px] font-bold text-gray-400">
                      {currentLanguage === 'ar' ? 'ع' : 'EN'}
                    </span>
                  </div>
                </button>
                
                {/* Hamburger Menu Button - Compact */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 transition-colors"
                >
                  {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900/98 backdrop-blur-sm border-t border-gray-800">
              <div className="px-4 py-6 space-y-4">
                <a 
                  href="#portfolio" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 cursor-pointer"
                >
                  {t('portfolio')}
                </a>
                
                
                <button 
                  onClick={() => {
                    setCurrentPage('live-moderator');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-right block text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-600/10 cursor-pointer"
                >
                  {t('live_moderator')}
                </button>
                <a 
                  href="#contact" 
                  className="block text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('contact_us')}
                </a>
                
                {/* Mobile Job Application Buttons */}
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <button 
                    onClick={() => {
                      setCurrentPage('job-application');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30 border border-blue-400/40 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">📝</span>
                      </div>
                      <span>{t('job_application')}</span>
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setCurrentPage('live-moderator');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-bold hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/30 border border-green-400/40 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">🎥</span>
                      </div>
                      <span>{t('live_moderator')}</span>
                    </span>
                  </button>
                  
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        setCurrentPage('communication-center');
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30 border border-blue-400/40 backdrop-blur-sm"
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">📞</span>
                        </div>
                        <span>مركز التواصل</span>
                      </span>
                    </button>
                  )}
                </div>
                
                {/* Language Settings Button - Enhanced */}
                <div className="border-t border-gray-700/50 mt-6 pt-6">
                  <button 
                    onClick={() => {
                      const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
                      changeLanguage(newLang);
                      setIsMenuOpen(false);
                    }}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-purple-500/10 hover:from-purple-500/25 hover:via-pink-500/30 hover:to-purple-500/25 border border-purple-400/40 hover:border-pink-400/60 px-6 py-4 text-white transition-all duration-500 rounded-xl transform hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/25 group backdrop-blur-sm"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-5">
                        <div className="relative">
                          <svg 
                            className="w-7 h-7 text-purple-400 group-hover:text-pink-300 transition-all duration-300 group-hover:scale-110" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent group-hover:from-pink-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
                          {currentLanguage === 'ar' ? 'تبديل إلى الإنجليزية' : 'Switch to Arabic'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold">
                          {currentLanguage === 'ar' ? '🇸🇦' : '🇺🇸'}
                        </span>
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase">
                            {currentLanguage === 'ar' ? 'EN' : 'ع'}
                          </span>
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
                
                <div className="w-full mt-4 space-y-3">
                <button 
                  onClick={() => setCurrentPage('join-agency')}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full"
                >
                  {t('join_agency')}
                </button>
                  
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile-First Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 bg-black">
          {/* Enhanced Mobile Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-3xl transform rotate-12 animate-pulse"></div>
            <div className="absolute top-32 right-3 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-l from-purple-500/20 to-pink-600/20 rounded-full transform -rotate-12 animate-pulse delay-1000"></div>
            <div className="absolute bottom-24 left-1/4 w-20 h-10 sm:w-32 sm:h-16 md:w-40 md:h-20 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl transform rotate-45 animate-pulse delay-2000"></div>
            <div className="absolute bottom-16 right-1/3 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-l from-purple-500/20 to-pink-600/20 rounded-3xl transform -rotate-6 animate-pulse delay-3000"></div>
            <div className="absolute top-1/2 left-1/6 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500/15 to-cyan-600/15 rounded-full animate-pulse delay-4000"></div>
            <div className="absolute top-1/3 right-1/6 w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-l from-green-500/15 to-emerald-600/15 rounded-full animate-pulse delay-5000"></div>
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            {/* Mobile Logo */}
            <div className="mb-8 sm:hidden">
              <div className="relative group mx-auto w-20 h-20">
              <img 
                src="/logo-magic.svg" 
                alt="Magic Carnation Logo" 
                  className="w-20 h-20 mx-auto mb-4 cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => setCurrentPage('home')}
                />
                
                {/* Hidden Admin Login Tooltip for Mobile */}
                {!isAdmin && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-black/90 backdrop-blur-sm border border-orange-400/50 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-lg">
                      <div className="text-orange-300 font-bold mb-1">🔐 تسجيل دخول الإدارة</div>
                      <div className="text-gray-300">اضغط هنا لتسجيل الدخول ك إدمن</div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-orange-400/50 rotate-45"></div>
                    </div>
                  </div>
                )}
                
                {/* Hidden Admin Login Click Handler for Mobile */}
                {!isAdmin && (
                  <div 
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={handleAdminLogin}
                    title="اضغط هنا لتسجيل الدخول ك إدمن"
                  ></div>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">
                {t('hero_title1') || 'أنشئ محتوى تيك توك'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t('hero_title2') || 'يحقق ملايين المشاهدات'}
              </span>
            </h1>
            
            <div className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              <div className="text-center">
        <p className="mb-4">{t('official_tiktok_partners') || 'شركاء تيك توك الرسميون'}</p>
        <p className="mb-4">{t('founded_2023_tangier') || 'تأسست عام 2023 في طنجة'}</p>
        <p className="mb-4">{t('discover_talents_make_stars') || 'نكتشف المواهب ونحولها إلى نجوم'}</p>
        <p className="mb-4">{t('full_support_creators') || 'دعم كامل لصناع المحتوى'}</p>
        <p className="mb-4">{t('professional_team_strong_partnerships') || 'فريق محترف وشراكات قوية'}</p>
        <p className="mb-4">{t('goal_leadership_mena') || 'هدفنا: الريادة في صناعة المحتوى'}</p>
        
        {showFullDescription && (
          <>
            <p className="mb-4">{t('additional_info_1') || 'نؤمن بأن كل موهبة تستحق فرصة لتتألق، لذلك نعمل على اكتشاف المواهب وتحويلها إلى نجوم من خلال دعم كامل ومرافقة مهنية'}</p>
            <p className="mb-4">{t('additional_info_2') || 'رؤيتنا أن نكون الوكالة الرائدة في مجال الترفيه وصناعة المحتوى في الشرق الأوسط وشمال إفريقيا، لنواصل تحويل الشغف إلى إنجازات تلامس الملايين'}</p>
          </>
        )}
                
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-pink-400 hover:text-pink-300 underline text-lg font-medium transition-colors duration-300 mt-6"
                >
                  {showFullDescription ? t('show_less') : t('show_more')}
                </button>
              </div>
            </div>

            {/* Images Section */}
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Image 1 */}
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 transform hover:scale-105">
                  <img 
                    src="msgic.svg" 
                    alt="Magic Carnation" 
                    className="w-full h-64 sm:h-80 object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
                
                {/* Image 2 */}
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105">
                  <img 
                    src="1.svg" 
                    alt="Magic Carnation" 
                    className="w-full h-64 sm:h-80 object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
              </div>
            </div>
            
            {/* Live Broadcasters Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {t('our_live_broadcasters')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Karim */}
                <a 
                  href="https://www.tiktok.com/@karimladron" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-pink-500/20 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 hover:border-pink-500/40 block"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-pink-500/30">
                      <img 
                        src="/karim.svg" 
                        alt={t('karim')} 
                        className="w-full h-full rounded-full object-cover"
                        style={{userSelect: 'none'}}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm md:text-base truncate">@karimladron</p>
                      <p className="text-gray-300 text-xs md:text-sm mt-1 truncate">{t('karim')}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">{t('live')}</span>
                    </div>
                  </div>
                </a>

                {/* Alaa */}
                <a 
                  href="https://www.tiktok.com/@alaaenuur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-purple-500/20 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/40 block"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-purple-500/30">
                      <img 
                        src="/alaenure.svg" 
                        alt={t('alaa')} 
                        className="w-full h-full rounded-full object-cover"
                        style={{userSelect: 'none'}}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm md:text-base truncate">@alaaenuur</p>
                      <p className="text-gray-300 text-xs md:text-sm mt-1 truncate">{t('alaa')}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-400 text-xs font-medium">{t('offline')}</span>
                    </div>
                  </div>
                </a>

                {/* Maysaa */}
                <a 
                  href="https://www.tiktok.com/@maissaeka1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-blue-500/20 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/40 block"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-blue-500/30">
                      <img 
                        src="/maysae.svg" 
                        alt={t('maysaa')} 
                        className="w-full h-full rounded-full object-cover"
                        style={{userSelect: 'none'}}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm md:text-base truncate">@maissaeka1</p>
                      <p className="text-gray-300 text-xs md:text-sm mt-1 truncate">{t('maysaa')}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">{t('live')}</span>
                    </div>
                  </div>
                </a>

                {/* Smix */}
                <a 
                  href="https://www.tiktok.com/@smix_xx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-green-500/20 transition-all duration-300 group cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-500/40 block"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden border-2 border-green-500/30">
                      <img 
                        src="/smix_xx.svg" 
                        alt="سميكس" 
                        className="w-full h-full rounded-full object-cover"
                        style={{userSelect: 'none'}}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm md:text-base truncate">@smix_xx</p>
                      <p className="text-gray-300 text-xs md:text-sm mt-1 truncate">سميكس</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">{t('live')}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
                    </div>
        </section>

        {/* Mobile-First Portfolio Section */}
        <section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900/40 via-black to-gray-900/20 relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center space-x-2 mb-3 sm:mb-4 md:mb-6">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
                <span className="text-pink-500 font-semibold text-xs sm:text-sm md:text-base hidden">{t('our_featured_work')}</span>
                </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  {t('our_featured_work')}
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('discover_best_videos')}
              </p>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { 
                  id: 1, 
                  title: t('how_to_create_viral_content'), 
                  views: "2.8M", 
                  likes: "520K", 
                  comments: "18K",
                  shares: "45K",
                  videoUrl: "https://www.tiktok.com/@magic.carnation1",
                  thumbnail: "/video-thumbnail-1.jpg",
                  category: "educational",
                  description: t('comprehensive_guide_viral_content'),
                  hashtags: ["#viral_content", "#tiktok", "#content_tips"],
                  duration: "00:15",
                  uploadDate: "2024-01-15",
                  color: "from-blue-500 to-cyan-500"
                },
                { 
                  id: 2, 
                  title: t('top_10_digital_marketing_tips'), 
                  views: "1.9M", 
                  likes: "380K", 
                  comments: "12K",
                  shares: "28K",
                  videoUrl: "https://www.tiktok.com/@magic.carnation1",
                  thumbnail: "/video-thumbnail-2.jpg",
                  category: "educational",
                  description: t('golden_tips_digital_marketing'),
                  hashtags: ["#digital_marketing_hashtag", "#marketing_tips", "#marketing"],
                  duration: "01:25",
                  uploadDate: "2024-01-20",
                  color: "from-purple-500 to-indigo-500"
                },
                { 
                  id: 3, 
                  title: t('successful_marketing_campaign'), 
                  views: "3.5M", 
                  likes: "720K", 
                  comments: "25K",
                  shares: "89K",
                  videoUrl: "https://www.tiktok.com/@magic.carnation1",
                  thumbnail: "/video-thumbnail-3.jpg",
                  category: "commercial",
                  description: t('how_we_achieved_great_success'),
                  hashtags: ["#marketing_campaign", "#marketing_success", "#global_company"],
                  duration: "00:58",
                  uploadDate: "2024-01-25",
                  color: "from-green-500 to-emerald-500"
                },
                { 
                  id: 4, 
                  title: t('professional_content_secrets'), 
                  views: "1.2M", 
                  likes: "240K", 
                  comments: "8.5K",
                  shares: "15K",
                  videoUrl: "https://www.tiktok.com/@magic.carnation1",
                  thumbnail: "/video-thumbnail-4.jpg",
                  category: "educational",
                  description: t('secrets_5_years_experience'),
                  hashtags: ["#professional_content", "#content_secrets", "#content_creation_hashtag"],
                  duration: "00:45",
                  uploadDate: "2024-02-01",
                  color: "from-pink-500 to-rose-500"
                }
              ].map((video) => (
                <div 
                  key={video.id} 
                  className="group relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 border border-gray-700/50 hover:border-pink-500/30 shadow-xl hover:shadow-pink-500/10"
                >
                  <div className="aspect-[9/16] relative overflow-hidden rounded-lg bg-gray-900">
                    {/* Video Element */}
                    <video 
                      className="w-full h-full object-cover"
                      preload="auto"
                      muted
                      playsInline
                      controls
                      autoPlay
                      loop
                      onLoadedMetadata={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.play().catch(() => {});
                      }}
                    >
                      <source src={video.id === 1 ? "/videos/magicv5.mp4" : 
                                video.id === 2 ? "/videos/video2.mp4" : 
                                video.id === 3 ? "/videos/video1.mp4" : 
                                "/videos/magicv6.mp4"} type="video/mp4" />
                      متصفحك لا يدعم الفيديو
                    </video>
                    
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full text-white text-xs sm:text-sm font-semibold">
                      {video.duration}
                  </div>
                  </div>
                  
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Mobile-First TikTok Channel Info & Stats */}
            <div className="md:hidden bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-pink-600/20 backdrop-blur-sm p-5 rounded-3xl border border-pink-500/40 mb-6 mt-6 shadow-2xl relative overflow-hidden">
              {/* Mobile Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-l from-purple-500 to-pink-600 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gradient-to-l from-green-500 to-emerald-600 rounded-full animate-pulse delay-3000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-pink-500/40 bg-transparent">
                      <img 
                        src="/logo-magic.svg" 
                        alt={t('magic_carnation_profile_arabic')} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Play className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-white">@magic.carnation1</h3>
                      <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{t('official_tiktok_agency')}</p>
                  </div>
                  
                  <button 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>{t('follow_us')}</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* What We Do Section */}
        <section id="what-we-do" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900/40 via-black to-gray-900/20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Film className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {t('what_we_do', 'ماذا نفعل')}
                  </span>
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                {t('what_we_do_intro', 'في Magic Carnation، نعمل على تمكين صُنّاع المحتوى من تحقيق أقصى إمكاناتهم من خلال:')}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Service 1 */}
              <div className="group bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-pink-500/20">
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{t('talent_management', 'إدارة المواهب')}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {t('talent_management_desc', 'اكتشاف المبدعين وتطوير مهاراتهم في البث، المحتوى، والتفاعل.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group bg-gradient-to-br from-purple-500/10 to-blue-600/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-purple-500/20">
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-lg">
                    <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{t('support_guidance', 'الدعم والتوجيه')}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {t('support_guidance_desc', 'تقديم استشارات وتدريبات احترافية حول خوارزميات تيك توك، وأفضل طرق النمو.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-blue-500/20">
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{t('brand_collaboration', 'التعاون مع العلامات التجارية')}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {t('brand_collaboration_desc', 'ربط المؤثرين بفرص الشراكات والرعايات الإعلانية.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="group bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-green-500/30 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-green-500/20">
                <div className="flex items-start space-x-4 sm:space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-lg">
                    <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{t('performance_development', 'تحليل الأداء والتطوير المستمر')}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {t('performance_development_desc', 'متابعة أداء الحسابات لضمان تطور دائم ومستدام.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="mt-10 sm:mt-12 md:mt-16 text-center">
              <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-700/50">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  {t('our_goal', 'نهدف إلى بناء مجتمع من المبدعين الذين يجمعون بين الإبداع، الشغف، والاحترافية، ليكونوا جزءًا من مستقبل صناعة المحتوى الرقمي في العالم العربي.')}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-10 md:py-20 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-l from-blue-500 to-cyan-600 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl transform rotate-45 animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-l from-pink-500 to-purple-600 rounded-3xl transform -rotate-6 animate-pulse delay-3000"></div>
          </div>
          
          <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
            <div className="text-center mb-16 lg:mb-24">
              <div className="inline-flex items-center space-x-2 mb-6 lg:mb-8">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                  className="w-12 h-12 lg:w-16 lg:h-16"
                />
                <span className="text-pink-500 font-semibold text-lg hidden">{t('join_with_us')}</span>
              </div>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 lg:mb-12 leading-tight">
                <span className="bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  {t('join_agency')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  {t('today')}
                </span>
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed">
                {t('contact_us_now')}
              </p>
            </div>

            {/* Quick Action Cards - Enhanced Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Card 1: Live Broadcaster - Extra Large Mobile */}
              <div 
                onClick={() => setCurrentPage('job-application')}
                className="bg-gradient-to-br from-blue-500/35 to-blue-600/30 backdrop-blur-xl p-8 sm:p-10 md:p-10 lg:p-12 rounded-3xl hover:from-blue-500/45 hover:to-blue-600/40 transition-all duration-500 group cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 border border-blue-400/60 hover:border-blue-400/80 relative overflow-hidden"
              >
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-15 sm:opacity-20">
                  <div className="absolute top-3 right-3 w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-2000"></div>
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-3000"></div>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/15 to-transparent opacity-70"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-6 lg:mb-7 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                    <Briefcase className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-5 lg:mb-6 text-white group-hover:text-blue-300 transition-colors drop-shadow-sm">{t('live_broadcaster')}</h3>
                  <p className="text-gray-300 text-lg sm:text-xl md:text-xl lg:text-xl leading-relaxed mb-5 sm:mb-6 md:mb-6 lg:mb-7 group-hover:text-gray-200 transition-colors">{t('join_team')}</p>
                  <div className="flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors bg-blue-500/20 group-hover:bg-blue-500/30 rounded-full px-8 py-4 group-hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="font-semibold text-lg sm:text-xl md:text-xl lg:text-xl">{t('start_now')}</span>
                    <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 ${i18n.language === 'ar' ? 'mr-3' : 'ml-3'} transform group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>

              {/* Card 2: Agent - Extra Large Mobile */}
              <div 
                onClick={() => setCurrentPage('live-moderator')}
                className="bg-gradient-to-br from-purple-500/35 to-purple-600/30 backdrop-blur-xl p-8 sm:p-10 md:p-10 lg:p-12 rounded-3xl hover:from-purple-500/45 hover:to-purple-600/40 transition-all duration-500 group cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 border border-purple-400/60 hover:border-purple-400/80 relative overflow-hidden"
              >
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-15 sm:opacity-20">
                  <div className="absolute top-3 right-3 w-5 h-5 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-2000"></div>
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-3000"></div>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/15 to-transparent opacity-70"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-6 lg:mb-7 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                    <Headphones className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-5 lg:mb-6 text-white group-hover:text-purple-300 transition-colors drop-shadow-sm">{t('live_moderator')}</h3>
                  <p className="text-gray-300 text-lg sm:text-xl md:text-xl lg:text-xl leading-relaxed mb-5 sm:mb-6 md:mb-6 lg:mb-7 group-hover:text-gray-200 transition-colors">{t('live_moderator_desc')}</p>
                  <div className="flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors bg-purple-500/20 group-hover:bg-purple-500/30 rounded-full px-8 py-4 group-hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="font-semibold text-lg sm:text-xl md:text-xl lg:text-xl">{t('start_now')}</span>
                    <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 ${i18n.language === 'ar' ? 'mr-3' : 'ml-3'} transform group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Cards - Compact Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              {/* Card 3: Other Jobs - Compact */}
              <div 
                onClick={() => setCurrentPage('join-agency')}
                className="bg-gradient-to-br from-emerald-500/20 via-green-500/15 to-teal-600/10 backdrop-blur-xl p-4 md:p-5 rounded-2xl hover:from-emerald-500/30 hover:via-green-500/25 hover:to-teal-600/20 transition-all duration-500 group cursor-pointer transform hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/30 hover:border-emerald-300/50 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-8">
                  <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-500"></div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-2 text-white group-hover:text-emerald-200 transition-colors drop-shadow-sm">{t('join_our_agency_title')}</h3>
                  <p className="text-gray-300 text-sm md:text-sm leading-relaxed mb-3 md:mb-3 line-clamp-2 group-hover:text-gray-200 transition-colors">{t('join_agency_desc')}</p>
                  <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors bg-emerald-500/10 group-hover:bg-emerald-500/20 rounded-full px-3 py-2 group-hover:scale-105 transition-all duration-300">
                    <span className="font-semibold text-sm md:text-sm">{t('start_now')}</span>
                    <ArrowRight className={`w-3 h-3 md:w-3 md:h-3 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'} transform group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>

              {/* Card 4: Online Join - Compact */}
              <div 
                onClick={() => setCurrentPage('online-join')}
                className="bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-fuchsia-600/10 backdrop-blur-xl p-4 md:p-5 rounded-2xl hover:from-rose-500/30 hover:via-pink-500/25 hover:to-fuchsia-600/20 transition-all duration-500 group cursor-pointer transform hover:scale-[1.03] hover:shadow-xl hover:shadow-rose-500/25 border border-rose-400/30 hover:border-rose-300/50 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-8">
                  <div className="absolute top-2 right-2 w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse delay-500"></div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-2 text-white group-hover:text-rose-200 transition-colors drop-shadow-sm">{t('online_join')}</h3>
                  <p className="text-gray-300 text-sm md:text-sm leading-relaxed mb-3 md:mb-3 line-clamp-2 group-hover:text-gray-200 transition-colors">{t('online_join_desc')}</p>
                  <div className="flex items-center justify-center text-rose-400 group-hover:text-rose-300 transition-colors bg-rose-500/10 group-hover:bg-rose-500/20 rounded-full px-3 py-2 group-hover:scale-105 transition-all duration-300">
                    <span className="font-semibold text-sm md:text-sm">{t('start_now')}</span>
                    <ArrowRight className={`w-3 h-3 md:w-3 md:h-3 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'} transform group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </section>


        {/* Footer */}
        <footer className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="/logo-magic.svg" 
                    alt="Magic Carnation Logo" 
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold">Magic Carnation</span>
                </div>
                <p className="text-gray-400 mb-4">
                  {t('footer_description')}
                </p>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">{t('follow')}</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://tiktok.com/@magic.carnation1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-black/10 to-gray-800/10 rounded-lg border border-gray-600/20 hover:border-gray-500/40 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{t('tiktok')}</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/magic.carnation1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105"
                    >
                      <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{t('instagram')}</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">{t('services')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">{t('content_production')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('marketing_strategy')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('account_management')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('ad_campaigns')}</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">{t('footer_about')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a onClick={() => setCurrentPage('about-us')} className="hover:text-white transition-colors cursor-pointer">{t('about_us')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footer_our_work')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footer_our_team')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footer_jobs')}</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">{t('footer_contact')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors cursor-pointer">{t('contact_us')}</a></li>
                  <li>info@magiccarnations.com</li>
                  <li>+212 655 723 182</li>
                  <li>{t('rabat_morocco')}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">{t('legal')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a onClick={() => setCurrentPage('privacy-policy')} className="hover:text-white transition-colors cursor-pointer">{t('privacy_policy')}</a></li>
                  <li><a onClick={() => setCurrentPage('terms-conditions')} className="hover:text-white transition-colors cursor-pointer">{t('terms_and_conditions')}</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center text-gray-400">
              <p>{t('footer_rights')}</p>
            </div>
          </div>
        </footer>


        </div>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-gray-700 shadow-2xl max-w-md w-full p-8">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-l from-purple-500/30 to-pink-500/30 rounded-full blur-sm"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    تسجيل دخول الإدمن
                  </h2>
                  <p className="text-gray-400 text-sm">
                    مرحباً زياد، أدخل كلمة المرور للوصول إلى لوحة التحكم
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      كلمة المرور
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitAdminLogin()}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                      placeholder="أدخل كلمة المرور"
                      autoFocus
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={submitAdminLogin}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
                    >
                      تسجيل الدخول
                    </button>
                    <button
                      onClick={closeAdminLogin}
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Magic Carnation Admin Panel - زياد
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Login Component */}
        <AdminLogin
          onLogin={handleAdminAuth}
          onClose={() => {
            setShowAdminLogin(false);
            setPendingAdminPage(null);
          }}
          isVisible={showAdminLogin}
        />

        {/* Admin Password Modal */}
        {showAdminPasswordModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  تسجيل الدخول كإدمن
                </h2>
                <p className="text-gray-400 text-sm">
                  أدخل كلمة المرور للوصول إلى لوحة التحكم
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="كلمة المرور"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAdminPasswordSubmit();
                      }
                    }}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowAdminPasswordModal(false);
                      setAdminPasswordInput('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-medium"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleAdminPasswordSubmit}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium"
                  >
                    دخول
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default App;