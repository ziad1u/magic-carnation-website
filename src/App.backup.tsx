import React, { useState, createContext, useContext, useEffect } from 'react';
import { Menu, X, Play, Languages, Users, Target, TrendingUp, Star, ArrowRight, Instagram, Twitter, Youtube, Sparkles, Video, BarChart3, Megaphone, Briefcase, UserPlus, Headphones, ChevronDown, Eye } from 'lucide-react';

// Import components
import AdminDashboard from './components/AdminDashboard';
import JobApplicationPage from './components/JobApplicationPage';
import LiveModeratorPage from './components/LiveModeratorPage';
import JoinAgencyPage from './components/JoinAgencyPage';

// Types
interface Language {
  code: 'ar' | 'en';
  name: string;
  flag: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  description: string;
  hashtags: string[];
  duration: string;
  uploadDate: string;
}

// Context
export const EditModeContext = createContext<{
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}>({
  editMode: false,
  setEditMode: () => {}
});

export const useEditMode = () => useContext(EditModeContext);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'job-application' | 'live-moderator' | 'join-agency' | 'admin-dashboard'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { 
      id: 1, 
      title: "كيف تصنع محتوى فيروسي على TikTok", 
      views: "2.8M", 
      likes: "520K", 
      comments: "18K",
      shares: "45K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "educational",
      description: "دليل شامل لصناعة محتوى فيروسي يحقق انتشاراً واسعاً على TikTok",
      hashtags: ["#محتوى_فيروسي", "#تيك_توك", "#نصائح_محتوى"],
      duration: "00:58",
      uploadDate: "2024-01-15"
    }
      isEditing: false,
      tempData: {}
    },
    { 
      id: 2, 
      title: "أفضل 10 نصائح للتسويق الرقمي", 
      views: "1.9M", 
      likes: "380K", 
      comments: "12K",
      shares: "28K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "educational",
      description: "نصائح ذهبية للتسويق الرقمي من خبراء Magic Carnation",
      hashtags: ["#تسويق_رقمي", "#نصائح_تسويقية", "#تسويق"],
      duration: "01:12",
      uploadDate: "2024-01-20",
      isEditing: false,
      tempData: {}
    },
    { 
      id: 3, 
      title: "حملة تسويقية ناجحة لشركة عالمية", 
      views: "3.5M", 
      likes: "720K", 
      comments: "25K",
      shares: "89K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "commercial",
      description: "كيف حققنا نجاحاً كبيراً لحملة تسويقية لشركة عالمية",
      hashtags: ["#حملة_تسويقية", "#نجاح_تسويقي", "#شركة_عالمية"],
      duration: "01:25",
      uploadDate: "2024-01-25",
      isEditing: false,
      tempData: {}
    },
    { 
      id: 4, 
      title: "أسرار صناعة المحتوى الاحترافي", 
      views: "1.2M", 
      likes: "240K", 
      comments: "8.5K",
      shares: "15K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "educational",
      description: "أسرار وخبرات 5 سنوات في صناعة المحتوى الاحترافي",
      hashtags: ["#محتوى_احترافي", "#أسرار_المحتوى", "#صناعة_المحتوى"],
      duration: "01:08",
      uploadDate: "2024-02-01",
      isEditing: false,
      tempData: {}
    },
    { 
      id: 5, 
      title: "محتوى ترفيهي يحقق 4 مليون مشاهدة", 
      views: "4.1M", 
      likes: "890K", 
      comments: "32K",
      shares: "156K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "entertainment",
      description: "محتوى ترفيهي جذاب حقق انتشاراً واسعاً وتفاعلاً كبيراً",
      hashtags: ["#محتوى_ترفيهي", "#4مليون_مشاهدة", "#محتوى_جذاب"],
      duration: "00:45",
      uploadDate: "2024-02-05",
      isEditing: false,
      tempData: {}
    },
    { 
      id: 6, 
      title: "فيديو تجاري يحقق أهداف التسويق", 
      views: "2.3M", 
      likes: "480K", 
      comments: "16K",
      shares: "42K",
      videoUrl: "https://www.tiktok.com/@magic.carnation1",
      thumbnail: "/2 (1) copy.png",
      category: "commercial",
      description: "فيديو تجاري احترافي حقق جميع أهداف التسويق المطلوبة",
      hashtags: ["#فيديو_تجاري", "#تسويق_ناجح", "#أهداف_تسويقية"],
      duration: "00:52",
      uploadDate: "2024-02-10",
      isEditing: false,
      tempData: {}
    }
  ]);

  const lastScrollY = useRef(window.scrollY);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  // Admin state management
  const [pendingAdminPage, setPendingAdminPage] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  
  const handleCloseOnboarding = () => setShowOnboarding(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setIsMenuOpen(false); // Hide navbar on scroll down
          } else {
            setIsMenuOpen(true); // Show navbar on scroll up
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

  useEffect(() => {
    // تحقق إذا كان المستخدم على الجوال فقط
    const isMobile = window.innerWidth < 640;
    if (isMobile) setShowOnboarding(true);
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  // Language selection with proper typing
  type Language = {
    code: 'ar' | 'en';
    name: string;
    flag: string;
  };

  const languages: Language[] = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];
  
  // Handle language change
  const handleLanguageChange = (code: 'ar' | 'en') => {
    setLanguage(code);
    setIsMenuOpen(false);
  };
  
  // Handle admin login
  const handleAdminLogin = () => {
    if (adminPassword === '9901') { // In a real app, use secure authentication
      setIsAdminAuthenticated(true);
      setShowAdminModal(false);
      setAdminPassword('');
      setAdminError('');
      if (pendingAdminPage) {
        setCurrentPage(pendingAdminPage as any);
        setPendingAdminPage(null);
      }
    } else {
      setAdminError('كلمة المرور غير صحيحة');
    }
  };

  if (currentPage === 'job-application') {
    return <JobApplicationPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'live-moderator') {
    return <LiveModeratorPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'join-agency') {
    return <JoinAgencyPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'admin-dashboard') {
    return <div className="relative"><button onClick={() => setCurrentPage('home')} className="absolute top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-xl shadow-lg">عودة</button><AdminDashboard /></div>;
  }

  if (showOnboarding) {
    return null; // Replace with your onboarding component if needed
  }

  // Function to handle admin access
  const handleAdminAccess = (page: string) => {
    if (isAdminAuthenticated) {
      setCurrentPage(page as any);
    } else {
      setPendingAdminPage(page);
      setShowAdminModal(true);
    }
  };

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      <div className={`min-h-screen bg-gray-900 text-white ${language === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* شاشة Onboarding للجوال فقط */}
        {showOnboarding && (
          <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center md:hidden">
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">مرحباً بك في Magic Carnation</h2>
              <p className="mb-6">التجربة المثالية على شاشة الهاتف</p>
              <button 
                onClick={() => setShowOnboarding(false)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold"
              >
                ابدأ التصفح
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* لوحة تحكم الادمن */}
          <div className="group relative">
            <button 
              onClick={() => { setShowAdminModal(true); setPendingAdminPage(true); }}
              className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-blue-400/30"
            >
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </button>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              لوحة تحكم الادمن
            </div>
          </div>
          {/* طلب عمل */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('job-application')}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-blue-400/30"
            >
              <Briefcase className="w-6 h-6 text-white" />
            </button>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              طلب عمل
            </div>
          </div>

          {/* طلب عمل مشرف لايف */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('live-moderator')}
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-purple-400/30"
            >
              <Headphones className="w-6 h-6 text-white" />
            </button>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              مشرف لايف
            </div>
          </div>

          {/* الانضمام للوكالة */}
          <div className="group relative">
            <button 
              onClick={() => setCurrentPage('join-agency')}
              className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-pink-400/30"
            >
              <UserPlus className="w-6 h-6 text-white" />
            </button>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700">
              انضم للوكالة
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800 transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ willChange: 'transform', top: '0' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-600">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xl font-bold hidden md:block">Magic Carnation</span>
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#services" className="text-gray-300 hover:text-white transition-colors">الخدمات</a>
                  <button onClick={() => { setShowAdminModal(true); setPendingAdminPage(true); }} className="text-gray-300 hover:text-blue-400 transition-colors font-bold">لوحة التحكم</button>
                  <a 
                    href="#portfolio" 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    أعمالنا
                  </a>
                  <a href="#team" className="text-gray-300 hover:text-white transition-colors">الفريق</a>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors">تواصل معنا</a>
                  
                  {/* Language Switcher - Moved to navigation links */}
                  <div className="relative group">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group-hover:scale-105"
                    >
                      <Languages className="w-4 h-4 group-hover:text-pink-400 transition-colors" />
                      <span className="text-sm font-medium">
                        {languages.find(lang => lang.code === language)?.flag}
                      </span>
                      <ChevronDown className={`w-3 h-3 transition-all duration-300 ${isMenuOpen ? 'rotate-180 text-pink-400' : 'group-hover:text-pink-400'}`} />
                    </button>
                    
                    {isMenuOpen && (
                      <div className="absolute top-full right-0 mt-3 w-56 bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-3 border-b border-gray-600 rounded-t-xl">
                            <h3 className="text-sm font-bold text-gray-200 text-center flex items-center justify-center space-x-2">
                              <Languages className="w-4 h-4 text-pink-400" />
                              <span>اختر اللغة</span>
                            </h3>
                          </div>
                          <div className="py-2">
                            {languages.map((language) => (
                              <button
                                key={language.code}
                                onClick={() => {
                                  setLanguage(language.code as LanguageCode);
                                  setIsMenuOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-pink-500/15 hover:to-purple-500/15 transition-all duration-300 group rounded-lg ${
                                  language === lang.code 
                                    ? 'bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-pink-300 border-r-2 border-pink-500' 
                                    : 'text-gray-300 hover:text-white hover:bg-black/50'
                                }`}
                              >
                                <span className="text-xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                                <span className="font-medium">{lang.name}</span>
                                {language === lang.code && (
                                  <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                                )}
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
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
                >
                  انضم لوكالتنا
                </button>
              </div>

              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-white">الخدمات</a>
                <button onClick={() => { setShowAdminModal(true); setPendingAdminPage(true); setIsMenuOpen(false); }} className="block w-full text-right px-3 py-2 text-blue-400 font-bold">لوحة التحكم</button>
                <a 
                  href="#portfolio" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  أعمالنا
                </a>
                <a href="#team" className="block px-3 py-2 text-gray-300 hover:text-white">الفريق</a>
                <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">تواصل معنا</a>
                
                {/* Mobile Language Switcher */}
                <div className="border-t border-gray-700/50 mt-6 pt-6">
                  <div className="px-4 py-4 text-sm font-bold text-gray-200 mb-4 bg-gradient-to-r from-pink-500/25 to-purple-500/25 rounded-2xl text-center flex items-center justify-center space-x-2">
                    <Languages className="w-4 h-4 text-pink-400" />
                    <span>اختر اللغة المفضلة</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setLanguage(language.code);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center justify-center space-x-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 transform hover:scale-110 group ${
                          language === language.code 
                            ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 border-2 border-pink-500/70 shadow-xl' 
                            : 'text-gray-300 hover:bg-black/60 hover:text-white border border-gray-600/50 hover:border-pink-500/50'
                        }`}
                      >
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{language.flag}</span>
                        <span>{language.name}</span>
                        {language === language.code && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setCurrentPage('join-agency')}
                  className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full"
                >
                  انضم لوكالتنا
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16">
          {/* 3D Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-3xl transform rotate-12 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-l from-white/10 to-gray-400/10 rounded-full transform -rotate-12 animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-20 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl transform rotate-45 animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-l from-white/10 to-gray-400/10 rounded-3xl transform -rotate-6 animate-pulse delay-3000"></div>
          </div>

          {/* Hero Image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <img 
              src="/step-growth.png" 
              alt="Magic Carnation Team Member" 
              className="max-w-5xl w-full h-auto object-contain"
              onError={(e) => {
                // Fallback إلى الصورة الأصلية إذا فشل تحميل الصورة الجديدة
                e.currentTarget.src = "/Character-working-desk-with-laptop 1.png";
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                أنشئ محتوى تيك توك
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                يحقق ملايين المشاهدات
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              نحن وكالة متخصصة في إنتاج محتوى تيك توك إبداعي وجذاب. 
              نحول أفكارك إلى فيديوهات فيروسية تحقق النجاح والانتشار.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setCurrentPage('join-agency')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                انضم لوكالتنا
              </button>
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:border-white transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                شاهد أعمالنا
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye className="w-10 h-10 text-pink-400 group-hover:text-pink-300 transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">500M+</div>
                <div className="text-gray-400">مشاهدة حققناها</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">1000+</div>
                <div className="text-gray-400">فيديو منتج</div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">200+</div>
                <div className="text-gray-400">عميل راضي</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-10 md:py-20 relative">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  خدماتنا
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                نقدم مجموعة شاملة من الخدمات لضمان نجاح محتواك على تيك توك
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">إنتاج المحتوى</h3>
                <p className="text-gray-400 mb-6">
                  ننتج فيديوهات تيك توك احترافية وإبداعية تجذب الجمهور وتحقق الانتشار الفيروسي
                </p>
                <div className="flex items-center text-pink-500 group-hover:text-pink-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">استراتيجية المحتوى</h3>
                <p className="text-gray-400 mb-6">
                  نضع استراتيجيات محكمة للمحتوى تضمن وصولك للجمهور المناسب في الوقت المناسب
                </p>
                <div className="flex items-center text-purple-500 group-hover:text-purple-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">تحليل الأداء</h3>
                <p className="text-gray-400 mb-6">
                  نحلل أداء المحتوى ونقدم تقارير مفصلة لتحسين النتائج وزيادة التفاعل
                </p>
                <div className="flex items-center text-blue-500 group-hover:text-blue-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">إدارة الحسابات</h3>
                <p className="text-gray-400 mb-6">
                  ندير حساباتك على تيك توك بشكل احترافي ونتفاعل مع جمهورك لبناء مجتمع قوي
                </p>
                <div className="flex items-center text-green-500 group-hover:text-green-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">حملات إعلانية</h3>
                <p className="text-gray-400 mb-6">
                  ننشئ ونداير حملات إعلانية مدفوعة على تيك توك لتحقيق أهدافك التسويقية
                </p>
                <div className="flex items-center text-yellow-500 group-hover:text-yellow-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">التسويق المؤثر</h3>
                <p className="text-gray-400 mb-6">
                  نربطك بأفضل المؤثرين في مجالك لتعزيز انتشار محتواك وزيادة متابعيك
                </p>
                <div className="flex items-center text-pink-500 group-hover:text-pink-400">
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-10 md:py-20 bg-gray-900/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-l from-blue-500 to-cyan-600 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-pink-500 font-semibold">أعمالنا المميزة</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  أعمالنا المميزة
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                اكتشف مجموعة من أفضل الفيديوهات التي أنتجناها لعملائنا وحققت نجاحاً كبيراً
              </p>
            </div>

            {/* Portfolio Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'all', name: 'جميع الأعمال', count: 6 },
                { id: 'educational', name: 'محتوى تعليمي', count: 3 },
                { id: 'commercial', name: 'إعلانات تجارية', count: 2 },
                { id: 'entertainment', name: 'محتوى ترفيهي', count: 1 }
              ].map((category) => (
                <button
                  key={category.id}
                  className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-600/20 transition-all duration-300 border border-gray-700 hover:border-pink-500/50 group"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full group-hover:bg-pink-500/30 transition-colors">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {portfolioItems.map((video, index) => {
                const [isHovered, setIsHovered] = useState(false);
                const { editMode } = useContext(EditModeContext);
                
                const handleEditClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const updatedItems = [...portfolioItems];
                  updatedItems[index] = {
                    ...updatedItems[index],
                    isEditing: true,
                    tempData: { ...updatedItems[index] }
                  };
                  setPortfolioItems(updatedItems);
                };

                const handleSave = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const updatedItems = [...portfolioItems];
                  updatedItems[index] = {
                    ...updatedItems[index],
                    isEditing: false,
                    tempData: {}
                  };
                  setPortfolioItems(updatedItems);
                  // Here you would typically save to an API
                };

                const handleCancel = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  const updatedItems = [...portfolioItems];
                  updatedItems[index] = {
                    ...(updatedItems[index].tempData as any),
                    isEditing: false,
                    tempData: {}
                  };
                  setPortfolioItems(updatedItems);
                };

                const handleChange = (field: string, value: string) => {
                  const updatedItems = [...portfolioItems];
                  updatedItems[index] = {
                    ...updatedItems[index],
                    [field]: value
                  };
                  setPortfolioItems(updatedItems);
                };

                return (
                  <div 
                    key={video.id} 
                    className={`group relative bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer ${isHovered ? 'ring-2 ring-pink-500' : ''}`}
                    onClick={() => !video.isEditing && setSelectedVideo(video)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Edit Mode Overlay */}
                    {editMode && (
                      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-white font-bold text-lg">تعديل البطاقة</h3>
                          <div className="flex gap-2">
                            {video.isEditing ? (
                              <>
                                <button 
                                  onClick={handleSave}
                                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                                >
                                  حفظ
                                </button>
                                <button 
                                  onClick={handleCancel}
                                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                >
                                  إلغاء
                                </button>
                              </>
                            ) : (
                              <button 
                                onClick={handleEditClick}
                                className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                              >
                                تعديل
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {video.isEditing ? (
                          <div className="space-y-3 flex-1 overflow-auto">
                            <div>
                              <label className="text-white text-sm mb-1 block">العنوان</label>
                              <input
                                type="text"
                                value={video.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm mb-1 block">الوصف</label>
                              <textarea
                                value={video.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded p-2 text-sm h-20"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm mb-1 block">رابط الفيديو</label>
                              <input
                                type="text"
                                value={video.videoUrl}
                                onChange={(e) => handleChange('videoUrl', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-white text-sm mb-1 block">الصورة المصغرة</label>
                              <input
                                type="text"
                                value={video.thumbnail}
                                onChange={(e) => handleChange('thumbnail', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-white text-sm mb-1 block">المشاهدات</label>
                                <input
                                  type="text"
                                  value={video.views}
                                  onChange={(e) => handleChange('views', e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-white text-sm mb-1 block">الإعجابات</label>
                                <input
                                  type="text"
                                  value={video.likes}
                                  onChange={(e) => handleChange('likes', e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-white text-sm mb-1 block">التعليقات</label>
                                <input
                                  type="text"
                                  value={video.comments}
                                  onChange={(e) => handleChange('comments', e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-white text-sm mb-1 block">المشاركات</label>
                                <input
                                  type="text"
                                  value={video.shares}
                                  onChange={(e) => handleChange('shares', e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-2 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-white text-sm space-y-2">
                            <p><span className="font-bold">العنوان:</span> {video.title}</p>
                            <p className="line-clamp-2"><span className="font-bold">الوصف:</span> {video.description}</p>
                            <p><span className="font-bold">المشاهدات:</span> {video.views}</p>
                            <p><span className="font-bold">الإعجابات:</span> {video.likes}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Video Thumbnail */}
                    <div className="aspect-[9/16] bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {video.title}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-gray-300 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            👁️ {video.views} مشاهدة • ❤️ {video.likes} إعجاب
                          </p>
                          <p className="text-gray-400 text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            💬 {video.comments} تعليق • 🔄 {video.shares} مشاركة
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TikTok Channel Info & Stats */}
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-sm p-8 rounded-3xl border border-pink-500/20 mb-16 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center space-x-5 mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-600">
                    <img 
                      src="/profile-image.svg" 
                      alt="Magic Carnation Profile" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const playIcon = e.currentTarget.nextElementSibling;
                        if (playIcon) {
                          playIcon.classList.remove('hidden');
                        }
                      }}
                    />
                    <Play className="w-8 h-8 text-white hidden" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">@magic.carnation1</h3>
                    <p className="text-gray-300 text-base mb-3">وكالة Magic Carnation الرسمية على TikTok</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                      <span className="flex items-center space-x-1">
                        <span>📱</span>
                        <span className="font-medium">250+ فيديو</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>👥</span>
                        <span className="font-medium">116.5K متابع</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span className="font-medium">306K إعجاب</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🏆</span>
                        <span className="font-medium">5 سنوات خبرة</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.open('https://www.tiktok.com/@magic.carnation1', '_blank')}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
                  >
                    <span className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>زيارة الصفحة</span>
                    </span>
                  </button>
                  <button 
                    onClick={() => window.open('https://www.tiktok.com/@magic.carnation1?is_from_webapp=1&sender_device=pc', '_blank')}
                    className="border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:border-white hover:text-white transition-all duration-300 hover:bg-white/5"
                  >
                    <span className="flex items-center space-x-2">
                      <span>متابعة</span>
                      <UserPlus className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Channel Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 group">
                  <div className="text-xl font-bold text-pink-400 mb-2 group-hover:text-pink-300 transition-colors">15.8M+</div>
                  <div className="text-gray-300 text-sm font-medium">إجمالي المشاهدات</div>
                </div>
                <div className="text-center bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="text-xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">3.2M+</div>
                  <div className="text-gray-300 text-sm font-medium">إجمالي الإعجابات</div>
                </div>
                <div className="text-center bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="text-xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">111K+</div>
                  <div className="text-gray-300 text-sm font-medium">إجمالي التعليقات</div>
                </div>
                <div className="text-center bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 group">
                  <div className="text-xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors">375K+</div>
                  <div className="text-gray-300 text-sm font-medium">إجمالي المشاركات</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                <span className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>عرض جميع الأعمال</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  فريق الخبراء
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                تعرف على فريقنا المتخصص في إنتاج محتوى تيك توك
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { 
                  name: "أحمد محمد", 
                  role: "مدير إبداعي", 
                  specialty: "استراتيجية المحتوى",
                  icon: Sparkles
                },
                { 
                  name: "فاطمة أحمد", 
                  role: "مخرجة", 
                  specialty: "إنتاج الفيديو",
                  icon: Video
                },
                { 
                  name: "محمود علي", 
                  role: "محرر فيديو", 
                  specialty: "المونتاج والإخراج",
                  icon: Play
                },
                { 
                  name: "نور حسن", 
                  role: "مدير تسويق", 
                  specialty: "الحملات الإعلانية",
                  icon: Megaphone
                }
              ].map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <member.icon className="w-16 h-16 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-pink-500 mb-1">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 md:py-20 bg-gray-900/30">
          <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  انضم لوكالتنا اليوم
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                تواصل معنا الآن ودع خبراؤنا يحولون أفكارك إلى محتوى فيروسي يحقق النجاح
              </p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div 
                onClick={() => setCurrentPage('job-application')}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mr-4">طلب عمل</h3>
                </div>
                <p className="text-gray-400 text-sm">انضم لفريقنا المتميز وكن جزءاً من نجاحات تيك توك</p>
              </div>

              <div 
                onClick={() => setCurrentPage('live-moderator')}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mr-4">مشرف لايف</h3>
                </div>
                <p className="text-gray-400 text-sm">اطلب منصب مشرف البث المباشر وأدر التفاعل مع الجمهور</p>
              </div>

              <div 
                onClick={() => setCurrentPage('join-agency')}
                className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm p-6 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mr-4">انضم للوكالة</h3>
                </div>
                <p className="text-gray-400 text-sm">كن شريكاً معنا وابدأ رحلتك في عالم صناعة المحتوى</p>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">نوع المشروع</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors">
                    <option>إنتاج محتوى</option>
                    <option>استراتيجية تسويق</option>
                    <option>إدارة حسابات</option>
                    <option>حملة إعلانية</option>
                    <option>أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">تفاصيل المشروع</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="أخبرنا عن مشروعك وأهدافك..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  إرسال طلب المشروع
                </button>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a 
                    href="#home" 
                    className="block py-2 hover:text-white transition-colors"
                  >
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a 
                    href="#portfolio" 
                    className="block py-2 hover:text-white transition-colors"
                  >
                    الأعمال
                  </a>
                </li>
                <li>
                  <a 
                    href="#team" 
                    className="block py-2 hover:text-white transition-colors"
                  >
                    الفريق
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="block py-2 hover:text-white transition-colors"
                  >
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold">Magic Carnation</span>
                </div>
                <p className="text-gray-400 mb-4">
                  وكالة Magic Carnation المتخصصة في إنتاج محتوى تيك توك إبداعي وجذاب
                </p>
                <div className="flex space-x-4">
                  <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                  <Youtube className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">الخدمات</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">إنتاج المحتوى</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">استراتيجية المحتوى</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">إدارة الحسابات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">الحملات الإعلانية</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">الشركة</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">أعمالنا</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">فريق العمل</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">تواصل معنا</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>info@magiccarnation.com</li>
                  <li>+966 50 123 4567</li>
                  <li>الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 MAGIC CARNATION. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>

        {/* Video Modal */}
        {isVideoModalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                      <p className="text-sm text-gray-400">@magic.carnation1</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>👁️ {selectedVideo.views}</span>
                    <span>❤️ {selectedVideo.likes}</span>
                    <span>💬 {selectedVideo.comments}</span>
                    <span>🔄 {selectedVideo.shares}</span>
                    <span>⏱️ {selectedVideo.duration}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Video Player */}
              <div className="aspect-video bg-gradient-to-br from-pink-500/10 to-purple-600/10 relative overflow-hidden">
                {/* Thumbnail Image */}
                <img 
                  src={selectedVideo.thumbnail} 
                  alt={selectedVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      onClick={() => window.open(selectedVideo.videoUrl, '_blank')}
                      className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform cursor-pointer hover:bg-white/30"
                    >
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                    <p className="text-gray-200 mb-4">محتوى من @magic.carnation1</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                      <span>👁️ {selectedVideo.views}</span>
                      <span>❤️ {selectedVideo.likes}</span>
                      <span>💬 {selectedVideo.comments}</span>
                      <span>🔄 {selectedVideo.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Details */}
              <div className="p-6 bg-gray-800/30 border-b border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">تفاصيل الفيديو</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>التصنيف:</span>
                        <span className="text-pink-400 font-medium">
                          {selectedVideo.category === 'commercial' && 'إعلانات تجارية'}
                          {selectedVideo.category === 'viral' && 'محتوى فيروسي'}
                          {selectedVideo.category === 'educational' && 'محتوى تعليمي'}
                          {selectedVideo.category === 'entertainment' && 'محتوى ترفيهي'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>المدة:</span>
                        <span className="text-gray-400">{selectedVideo.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تاريخ النشر:</span>
                        <span className="text-gray-400">{selectedVideo.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">الوصف</h4>
                    <p className="text-sm text-gray-300 mb-3">{selectedVideo.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.hashtags.map((tag: string, index: number) => (
                        <span key={index} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => window.open(selectedVideo.videoUrl, '_blank')}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>زيارة الحساب</span>
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedVideo.videoUrl);
                        alert('تم نسخ الرابط!');
                      }}
                      className="border border-gray-600 text-gray-300 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>نسخ الرابط</span>
                    </button>
                    <button 
                      onClick={() => window.open('https://www.tiktok.com/@magic.carnation1', '_blank')}
                      className="border border-gray-600 text-gray-300 px-6 py-2 rounded-lg hover:border-white hover:text-white transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>زيارة الصفحة</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Magic Carnation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Admin Password Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4 text-blue-800">دخول لوحة تحكم الأدمن</h2>
              <input
                type="password"
                placeholder="كلمة سر الأدمن"
                value={adminPassword}
                onChange={e => { setAdminPassword(e.target.value); setAdminError(''); }}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 text-blue-900 bg-blue-50 placeholder-blue-300"
              />
              {adminError && <div className="text-red-600 text-sm mb-2 font-bold bg-red-100 px-2 py-1 rounded-lg w-full text-center">{adminError}</div>}
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => {
                    if (adminPassword === '9901') {
                      setShowAdminModal(false);
                      setAdminPassword('');
                      setAdminError('');
                      setIsAdminAuthenticated(true);
                      setCurrentPage('admin-dashboard');
                    } else {
                      setAdminError('كلمة السر غير صحيحة');
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-bold hover:from-blue-600 hover:to-blue-800 transition shadow"
                >دخول</button>
                <button
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminPassword('');
                    setAdminError('');
                    setPendingAdminPage(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:from-gray-300 hover:to-gray-400 transition"
                >إلغاء</button>
              </div>
            </div>
          </div>
        )}
        {/* زر تفعيل وضع التعديل يظهر فقط بعد تسجيل الدخول كمسؤول */}
        {isAdminAuthenticated && (
          <EditModeContext.Consumer>
            {({ editMode, setEditMode }) => (
              <button
                onClick={() => setEditMode(!editMode)}
                style={{ 
                  position: "fixed", 
                  top: 16, 
                  left: 16, 
                  zIndex: 1000, 
                  background: editMode ? "#ec4899" : "#222", 
                  color: "white", 
                  border: "none", 
                  borderRadius: 8, 
                  padding: "8px 20px", 
                  fontWeight: "bold", 
                  boxShadow: "0 2px 8px #0003" 
                }}
              >
                {editMode ? "إيقاف وضع التعديل" : "تفعيل وضع التعديل"}
              </button>
            )}
          </EditModeContext.Consumer>
        )}
      </div>
    </EditModeContext.Provider>
  );
};

export default App;