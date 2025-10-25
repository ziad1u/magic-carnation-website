import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Users, Video, Eye, MessageCircle, UserPlus, Headphones, Briefcase, Heart, Share2, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StatsCounter from './StatsCounter';

interface MobileLandingPageProps {
  onBack: () => void;
}

const MobileLandingPage: React.FC<MobileLandingPageProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState('home');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const getCurrentLanguage = () => {
    const lang = i18n.language;
    switch(lang) {
      case 'en': return { name: t('english'), flag: '🇺🇸' };
      default: return { name: t('arabic'), flag: '🇸🇦' };
    }
  };

  // تتبع القسم الحالي أثناء التمرير
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // صفحة طلب عمل للجوال
  if (currentPage === 'job-application') {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{backgroundColor: '#000000'}}>
        {/* Header */}
        <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-gray-800" style={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2" style={{color: '#ffffff'}}>
              <X className="w-6 h-6" />
              <span className="text-lg font-bold">{t('back')}</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo-magic.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-bold" style={{color: '#ffffff'}}>Magic Carnation</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6" style={{color: '#ffffff'}}>
              {t('job_application_title')}
            </h1>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('full_name')}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  placeholder={t('enter_full_name')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('email')}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  placeholder={t('enter_email')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('phone')}
                </label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  placeholder={t('enter_phone')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('position')}
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-pink-500 focus:outline-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                >
                  <option value="">{t('select_position')}</option>
                  <option value="video_editor">{t('video_editor')}</option>
                  <option value="marketing_manager">{t('marketing_manager')}</option>
                  <option value="content_creator">{t('content_creator')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('experience')}
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none h-24 resize-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  placeholder={t('describe_experience')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                  {t('portfolio')}
                </label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  placeholder={t('portfolio_link')}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                style={{backgroundColor: '#ec4899', color: '#ffffff'}}
              >
                {t('submit_application')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // صفحة مشرف لايف للجوال
  if (currentPage === 'live-moderator') {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{backgroundColor: '#000000'}}>
        {/* Header */}
        <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-gray-800" style={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2" style={{color: '#ffffff'}}>
              <X className="w-6 h-6" />
              <span className="text-lg font-bold">{t('back')}</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo-magic.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-bold" style={{color: '#ffffff'}}>Magic Carnation</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6" style={{color: '#ffffff'}}>
              {t('live_moderator_title')}
            </h1>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold mb-4" style={{color: '#ffffff'}}>
                  {t('live_moderator_desc')}
                </h2>
                <p className="text-gray-400 mb-4" style={{color: '#9ca3af'}}>
                  {t('live_moderator_details')}
                </p>
                <ul className="space-y-2 text-sm text-gray-300" style={{color: '#d1d5db'}}>
                  <li>• {t('manage_live_streams')}</li>
                  <li>• {t('interact_with_audience')}</li>
                  <li>• {t('moderate_comments')}</li>
                  <li>• {t('ensure_quality')}</li>
                </ul>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('full_name')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                    placeholder={t('enter_full_name')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('email')}
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                    placeholder={t('enter_email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('experience_level')}
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  >
                    <option value="">{t('select_experience')}</option>
                    <option value="beginner">{t('beginner')}</option>
                    <option value="intermediate">{t('intermediate')}</option>
                    <option value="expert">{t('expert')}</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  style={{backgroundColor: '#ec4899', color: '#ffffff'}}
                >
                  {t('apply_now')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // صفحة انضم للوكالة للجوال
  if (currentPage === 'join-agency') {
    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{backgroundColor: '#000000'}}>
        {/* Header */}
        <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-gray-800" style={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2" style={{color: '#ffffff'}}>
              <X className="w-6 h-6" />
              <span className="text-lg font-bold">{t('back')}</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="/logo-magic.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-bold" style={{color: '#ffffff'}}>Magic Carnation</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6" style={{color: '#ffffff'}}>
              {t('join_agency_title')}
            </h1>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold mb-4" style={{color: '#ffffff'}}>
                  {t('why_join_us')}
                </h2>
                <ul className="space-y-3 text-sm text-gray-300" style={{color: '#d1d5db'}}>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>{t('creative_environment')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{t('professional_growth')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t('competitive_salary')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t('flexible_work')}</span>
                  </li>
                </ul>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('full_name')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                    placeholder={t('enter_full_name')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('email')}
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                    placeholder={t('enter_email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('role_interest')}
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-pink-500 focus:outline-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  >
                    <option value="">{t('select_role')}</option>
                    <option value="content_creator">{t('content_creator')}</option>
                    <option value="video_editor">{t('video_editor')}</option>
                    <option value="marketing_manager">{t('marketing_manager')}</option>
                    <option value="live_moderator">{t('live_moderator')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#ffffff'}}>
                    {t('motivation')}
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none h-24 resize-none"
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                    placeholder={t('why_join_motivation')}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  style={{backgroundColor: '#ec4899', color: '#ffffff'}}
                >
                  {t('join_now')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{backgroundColor: '#000000'}}>
      {/* رسالة تشخيص */}
      {console.log('MobileLandingPage rendered successfully')}
      
      {/* Mobile Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-gray-800" style={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/logo-magic.svg" 
                alt="Magic Carnation Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold mobile-title" style={{color: '#ffffff'}}>Magic Carnation</span>
          </div>

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" style={{color: '#ffffff'}} /> : <Menu className="h-6 w-6 text-white" style={{color: '#ffffff'}} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#portfolio" className="mobile-menu-item block px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors" style={{color: '#d1d5db'}}>
                {t('portfolio')}
              </a>
              <a href="#contact" className="mobile-menu-item block px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors" style={{color: '#d1d5db'}}>
                {t('contact')}
              </a>
              
              {/* Additional Pages */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="text-xs text-gray-400 px-3 py-2 font-semibold" style={{color: '#9ca3af'}}>{t('pages')}</div>
                <button 
                  onClick={() => { setCurrentPage('job-application'); setIsMenuOpen(false); }}
                  className="mobile-menu-item w-full px-3 py-3 text-right text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors flex items-center justify-between"
                  style={{color: '#d1d5db'}}
                >
                  <Briefcase className="w-4 h-4" style={{color: '#ffffff'}} />
                  <span>{t('job_application')}</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('live-moderator'); setIsMenuOpen(false); }}
                  className="mobile-menu-item w-full px-3 py-3 text-right text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors flex items-center justify-between"
                  style={{color: '#d1d5db'}}
                >
                  <Headphones className="w-4 h-4" style={{color: '#ffffff'}} />
                  <span>{t('live_moderator')}</span>
                </button>
                <button 
                  onClick={() => { setCurrentPage('join-agency'); setIsMenuOpen(false); }}
                  className="mobile-menu-item w-full px-3 py-3 text-right text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors flex items-center justify-between"
                  style={{color: '#d1d5db'}}
                >
                  <UserPlus className="w-4 h-4" style={{color: '#ffffff'}} />
                  <span>{t('join_agency')}</span>
                </button>
              </div>
              
              {/* Language Switcher - Enhanced Design */}
              <div className="border-t border-gray-700/50 pt-4 mt-4">
                <div className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase tracking-wide" style={{color: '#9ca3af'}}>{t('choose_language')}</div>
                
                {/* Arabic Language Button */}
                <button 
                  onClick={() => changeLanguage('ar')} 
                  className={`mobile-lang-button w-full px-4 py-3 text-right rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    i18n.language === 'ar' 
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 border border-transparent hover:border-pink-500/20'
                  }`}
                  style={{color: i18n.language === 'ar' ? '#ffffff' : '#d1d5db'}}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i18n.language === 'ar' 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg' 
                        : 'bg-gray-700/50 group-hover:bg-pink-500/20'
                    }`}>
                      <span className="text-lg">🇸🇦</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{t('arabic')}</div>
                      <div className="text-xs opacity-70">العربية</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i18n.language === 'ar' 
                      ? 'bg-pink-500 shadow-lg shadow-pink-500/50' 
                      : 'bg-transparent group-hover:bg-pink-500/50'
                  }`}></div>
                </button>

                {/* English Language Button */}
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={`mobile-lang-button w-full px-4 py-3 text-right rounded-xl transition-all duration-300 flex items-center justify-between group mt-2 ${
                    i18n.language === 'en' 
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 border border-transparent hover:border-pink-500/20'
                  }`}
                  style={{color: i18n.language === 'en' ? '#ffffff' : '#d1d5db'}}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i18n.language === 'en' 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg' 
                        : 'bg-gray-700/50 group-hover:bg-pink-500/20'
                    }`}>
                      <span className="text-lg">🇺🇸</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{t('english')}</div>
                      <div className="text-xs opacity-70">English</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i18n.language === 'en' 
                      ? 'bg-pink-500 shadow-lg shadow-pink-500/50' 
                      : 'bg-transparent group-hover:bg-pink-500/50'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="mobile-section relative flex flex-col items-center justify-center px-4" style={{backgroundColor: '#000000', minHeight: '100vh'}}>
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="mobile-bg-element absolute top-20 left-4 w-24 h-24 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-3xl transform rotate-12 animate-pulse"></div>
            <div className="mobile-bg-element absolute top-40 right-8 w-20 h-20 bg-gradient-to-l from-white/10 to-gray-400/10 rounded-full transform -rotate-12 animate-pulse delay-1000"></div>
            <div className="mobile-bg-element absolute bottom-32 left-1/4 w-32 h-16 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl transform rotate-45 animate-pulse delay-2000"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-sm mx-auto">
            {/* Main Title */}
            <h1 className="mobile-hero-title mobile-title text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{color: '#ffffff'}}>
              <span className="mobile-gradient-text bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent block mb-2" style={{color: '#ffffff'}}>
                {t('hero_title1')}
              </span>
              <span className="mobile-gradient-text bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block" style={{color: '#ec4899'}}>
                {t('hero_title2')}
              </span>
            </h1>

            {/* Description */}
            <p className="mobile-subtitle text-base text-gray-400 mb-8 leading-relaxed" style={{color: '#9ca3af'}}>
              {t('hero_desc')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-12">
              <button 
                onClick={() => setCurrentPage('join-agency')}
                className="mobile-button mobile-button-primary bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
                style={{backgroundColor: '#ec4899', color: '#ffffff'}}
              >
                {t('join_agency')}
              </button>
              
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="mobile-button border-2 border-gray-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:border-white transition-all duration-300 flex items-center justify-center gap-3"
                style={{borderColor: '#4b5563', color: '#ffffff'}}
              >
                <Play className="w-6 h-6" style={{color: '#ffffff'}} />
                {t('see_works')}
              </button>

              {/* Additional Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => setCurrentPage('job-application')}
                  className="mobile-button bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{backgroundColor: '#3b82f6', color: '#ffffff'}}
                >
                  <Radio className="w-4 h-4" style={{color: '#ffffff'}} />
                  {t('live_broadcaster')}
                </button>
                
                <button 
                  onClick={() => setCurrentPage('live-moderator')}
                  className="mobile-button bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{backgroundColor: '#10b981', color: '#ffffff'}}
                >
                  <Headphones className="w-4 h-4" style={{color: '#ffffff'}} />
                  {t('live_moderator')}
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6">
              {/* Happy Clients */}
              <div className="mobile-card mobile-stats-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-400" style={{color: '#60a5fa'}} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="mobile-stats-number text-3xl font-bold text-blue-500 mb-2" style={{color: '#3b82f6'}}>
                    <StatsCounter end={500} suffix="+" className="text-blue-500" />
                  </div>
                  <div className="mobile-subtitle text-gray-300 font-medium" style={{color: '#d1d5db'}}>{t('happy_clients')}</div>
                </div>
              </div>

              {/* Produced Videos */}
              <div className="mobile-card mobile-stats-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center">
                    <Video className="w-8 h-8 text-purple-400" style={{color: '#a78bfa'}} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="mobile-stats-number text-3xl font-bold text-purple-500 mb-2" style={{color: '#8b5cf6'}}>
                    <StatsCounter end={2500} suffix="+" className="text-purple-500" />
                  </div>
                  <div className="mobile-subtitle text-gray-300 font-medium" style={{color: '#d1d5db'}}>{t('produced_videos')}</div>
                </div>
              </div>

              {/* Total Views */}
              <div className="mobile-card mobile-stats-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-pink-400" style={{color: '#f472b6'}} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="mobile-stats-number text-3xl font-bold text-pink-500 mb-2" style={{color: '#ec4899'}}>
                    <StatsCounter end={50000000} suffix="+" className="text-pink-500" />
                  </div>
                  <div className="mobile-subtitle text-gray-300 font-medium" style={{color: '#d1d5db'}}>{t('total_video_views')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mobile-section py-16 px-4" style={{backgroundColor: '#111111'}}>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-12">
              <h2 className="mobile-title text-3xl font-bold mb-4" style={{color: '#ffffff'}}>
                <span className="mobile-gradient-text bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" style={{color: '#ffffff'}}>
                  {t('our_services')}
                </span>
              </h2>
              <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                {t('services_desc')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Service 1 */}
              <div className="mobile-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <Play className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
                  </div>
                  <h3 className="mobile-title text-xl font-bold" style={{color: '#ffffff'}}>{t('content_production')}</h3>
                </div>
                <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                  {t('content_production_desc')}
                </p>
              </div>

              {/* Service 2 */}
              <div className="mobile-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
                  </div>
                  <h3 className="mobile-title text-xl font-bold" style={{color: '#ffffff'}}>{t('marketing_strategy')}</h3>
                </div>
                <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                  {t('marketing_strategy_desc')}
                </p>
              </div>

              {/* Service 3 */}
              <div className="mobile-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <Share2 className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
                  </div>
                  <h3 className="mobile-title text-xl font-bold" style={{color: '#ffffff'}}>{t('performance_analysis')}</h3>
                </div>
                <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                  {t('performance_analysis_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="mobile-section py-16 px-4 bg-gray-900/30" style={{backgroundColor: '#1a1a1a'}}>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-12">
              <h2 className="mobile-title text-3xl font-bold mb-4" style={{color: '#ffffff'}}>
                <span className="mobile-gradient-text bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" style={{color: '#ffffff'}}>
                  {t('our_featured_work')}
                </span>
              </h2>
              <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                {t('discover_best_videos')}
              </p>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="mobile-portfolio-item aspect-[9/16] bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TikTok Channel Info */}
            <div className="mobile-card mt-8 bg-gradient-to-br from-gray-900/70 to-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/40" style={{backgroundColor: 'rgba(31, 41, 55, 0.7)', borderColor: 'rgba(75, 85, 99, 0.4)'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/5 via-purple-600/5 to-blue-500/5">
                  <img 
                    src="/logo-magic.svg" 
                    alt="Magic Carnation Profile" 
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="mr-3">
                  <h3 className="mobile-title text-lg font-bold" style={{color: '#ffffff'}}>@magic.carnation1</h3>
                  <p className="mobile-subtitle text-gray-400 text-sm" style={{color: '#9ca3af'}}>{t('official_tiktok_page')}</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.open('https://www.tiktok.com/@magic.carnation1', '_blank')}
                className="mobile-button mobile-button-primary w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                style={{backgroundColor: '#ec4899', color: '#ffffff'}}
              >
                <Play className="w-4 h-4" style={{color: '#ffffff'}} />
                <span>{t('visit_page')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mobile-section py-16 px-4" style={{backgroundColor: '#000000'}}>
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-12">
              <h2 className="mobile-title text-3xl font-bold mb-4" style={{color: '#ffffff'}}>
                <span className="mobile-gradient-text bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" style={{color: '#ffffff'}}>
                  {t('contact')}
                </span>
              </h2>
              <p className="mobile-subtitle text-gray-400" style={{color: '#9ca3af'}}>
                {t('contact_desc')}
              </p>
            </div>

            <div className="mobile-card mobile-service-card bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50" style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)'}}>
              <form className="space-y-4">
                <div>
                  <label className="mobile-subtitle block text-sm font-medium mb-2" style={{color: '#ffffff'}}>{t('name')}</label>
                  <input 
                    type="text" 
                    className="mobile-input w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors" 
                    placeholder={t('enter_name')} 
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  />
                </div>
                <div>
                  <label className="mobile-subtitle block text-sm font-medium mb-2" style={{color: '#ffffff'}}>{t('project_type')}</label>
                  <select className="mobile-input w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors" style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}>
                    <option>{t('content_production')}</option>
                    <option>{t('marketing_strategy')}</option>
                    <option>{t('account_management')}</option>
                    <option>{t('ad_campaigns')}</option>
                    <option>{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="mobile-subtitle block text-sm font-medium mb-2" style={{color: '#ffffff'}}>{t('project_details')}</label>
                  <textarea 
                    rows={4} 
                    className="mobile-input w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors" 
                    placeholder={t('project_description_placeholder')}
                    style={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#ffffff'}}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="mobile-button mobile-button-primary w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  style={{backgroundColor: '#ec4899', color: '#ffffff'}}
                >
                  {t('send_message')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="mobile-floating-buttons fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Job Application */}
        <div className="group relative">
          <button 
            onClick={() => window.location.href = '/#job-application'}
            className="mobile-fab w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-blue-400/30"
          >
            <Briefcase className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700" style={{backgroundColor: 'rgba(17, 24, 39, 0.95)', color: '#ffffff', borderColor: '#374151'}}>
{t('job_application')}
          </div>
        </div>

        {/* Live Moderator */}
        <div className="group relative">
          <button 
            onClick={() => window.location.href = '/#live-moderator'}
            className="mobile-fab w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-purple-400/30"
          >
            <Headphones className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700" style={{backgroundColor: 'rgba(17, 24, 39, 0.95)', color: '#ffffff', borderColor: '#374151'}}>
{t('live_moderator')}
          </div>
        </div>

        {/* Join Agency */}
        <div className="group relative">
          <button 
            onClick={() => window.location.href = '/#join-agency'}
            className="mobile-fab w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-pink-400/30"
          >
            <UserPlus className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700" style={{backgroundColor: 'rgba(17, 24, 39, 0.95)', color: '#ffffff', borderColor: '#374151'}}>
{t('join_agency')}
          </div>
        </div>

        {/* WhatsApp Contact - Hidden */}
        <div className="group relative hidden">
          <button
            onClick={() => window.open('https://wa.me/212655723182', '_blank')}
            className="mobile-fab w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-green-400/30"
          >
            <MessageCircle className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-700" style={{backgroundColor: 'rgba(17, 24, 39, 0.95)', color: '#ffffff', borderColor: '#374151'}}>
{t('whatsapp_contact')}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mobile-fab fixed top-20 left-4 z-50 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-all duration-300 border border-gray-700"
        style={{backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#374151'}}
      >
        <X className="w-6 h-6 text-white" style={{color: '#ffffff'}} />
      </button>
    </div>
  );
};

export default MobileLandingPage;
