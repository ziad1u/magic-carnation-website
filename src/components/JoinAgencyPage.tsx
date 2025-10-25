import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface JoinAgencyPageProps {
  onBack: () => void;
}

export default function JoinAgencyPage({ onBack }: JoinAgencyPageProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    gender: '',
    jobType: '',
    otherJobType: '',
    tiktokHandle: '',
    hasTiktok: '',
    contentType: '',
    experience: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // Send automatically to Telegram
  const sendToTelegram = (message: string) => {
    // إرسال إلى المعرف الأول
    fetch(`https://api.telegram.org/bot8147488523:AAGDZPgJYFUhdS0HMJseKBZe68idGR-7MqI/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 5171095071,
        text: message,
        parse_mode: "HTML"
      })
    });
    
    // إرسال إلى المعرف الثاني (معرفك الشخصي)
    fetch(`https://api.telegram.org/bot8147488523:AAGDZPgJYFUhdS0HMJseKBZe68idGR-7MqI/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 8342552221,
        text: message,
        parse_mode: "HTML"
      })
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const applications = JSON.parse(localStorage.getItem('agencyApplications') || '[]');
    applications.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('agencyApplications', JSON.stringify(applications));
    console.log('Agency Application:', formData);
    // إرسال تلقائي إلى تلغرام باللغة العربية فقط
    const jobTypeText = formData.jobType === 'other' && formData.otherJobType ? formData.otherJobType : formData.jobType;
    const message = `
🌟 <b>طلب انضمام للوكالة - Magic Carnation</b>
━━━━━━━━━━━━━━━━━━
👤 <b>الاسم الكامل:</b> <code>${formData.fullName}</code>
🧑 <b>الجنس:</b> <code>${formData.gender}</code>
📱 <b>رقم الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>
🎂 <b>العمر:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>
💼 <b>نوع الوظيفة المطلوبة:</b> <code>${jobTypeText || 'غير محدد'}</code>
🎵 <b>لديه حساب تيك توك:</b> <code>${formData.hasTiktok || 'غير محدد'}</code>
📹 <b>اسم حساب تيك توك:</b> <code>${formData.tiktokHandle || 'غير محدد'}</code>
🎭 <b>نوع المحتوى:</b> <code>${formData.contentType || 'غير محدد'}</code>
🎯 <b>الأهداف:</b> <code>${formData.goals || 'غير محدد'}</code>
💼 <b>الخبرة:</b> <code>${formData.experience || 'غير محدد'}</code>
━━━━━━━━━━━━━━━━━━
🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>
🌟 <b>منصة:</b> <code>Magic Carnation Website</code>`;
    sendToTelegram(message);
    // Create WhatsApp link for communication after submission
    const targetPhone = '212655723182';
    const waMessage = `\nRegular Agency Join Request\n━━━━━━━━━━━━━━━━━━\n🌐 Join Type: Regular\n👤 Name: ${formData.fullName}\n🧑 Gender: ${formData.gender}\n📱 Phone: ${formData.phone.replace(/\D/g, '')}\n🎂 Age: ${String(formData.age).replace(/\D/g, '')}\n💼 Job Type: ${jobTypeText || ''}\n🎵 Has TikTok Account: ${formData.hasTiktok || ''}\n📹 TikTok Account: ${formData.tiktokHandle || ''}\n💼 Experience: ${formData.experience || ''}\n━━━━━━━━━━━━━━━━━━\nThank you.`;
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const getCurrentLanguage = () => {
    const lang = i18n.language;
    switch(lang) {
      case 'en': return { name: 'English', flag: '🇺🇸' };
      default: return { name: 'العربية', flag: '🇸🇦' };
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-14 sm:pt-16 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800" style={{ top: '0' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm sm:text-xl font-bold">Magic Carnation</span>
            </div>
            <div className="flex items-center">
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition-colors cursor-pointer mx-8 hidden">{t('portfolio', 'عملنا')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors mx-8 hidden">{t('contact', 'اتصل بنا')}</a>
              
              {/* Enhanced Language Switcher */}
              <div className="relative group mx-2 sm:mx-4">
                <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/40 border border-gray-700/50 hover:border-pink-500/40 transition-all duration-300 shadow-lg">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300">{getCurrentLanguage().name}</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-pink-400 transition-all duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Enhanced Language Dropdown */}
                <div className="absolute top-full right-0 mt-3 w-52 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  <div className="p-2">
                    <div className="text-xs text-gray-400 px-3 py-2 font-semibold border-b border-gray-700/50 mb-1">{t('choose_language', 'اختر اللغة')}</div>
                    
                    <button onClick={() => changeLanguage('ar')} className="w-full px-4 py-3 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between rounded-xl group/item">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇸🇦</span>
                        <span className="font-medium">العربية</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'ar' ? 'bg-pink-500' : 'bg-transparent group-hover/item:bg-pink-500/50'}`}></div>
                    </button>
                    
                    <button onClick={() => changeLanguage('en')} className="w-full px-4 py-3 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between rounded-xl group/item">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇺🇸</span>
                        <span className="font-medium">English</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'en' ? 'bg-pink-500' : 'bg-transparent group-hover/item:bg-pink-500/50'}`}></div>
                    </button>
                    
                  </div>
                </div>
              </div>
              
              <button onClick={() => window.location.href = '/#join-agency'} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl border border-pink-400/40 ml-2">{t('join_agency', 'انضم للوكالة')}</button>
            </div>
            <div className="hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white">{t('portfolio', 'عملنا')}</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">{t('contact', 'اتصل بنا')}</a>
              <button onClick={() => window.location.href = '/#join-agency'} className="w-full text-left px-3 py-2 text-gray-300 hover:text-white bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-lg">{t('join_agency', 'انضم للوكالة')}</button>
              <div className="border-t border-gray-700/50 mt-2 pt-2">
                <div className="text-xs text-gray-400 px-3 py-2 font-semibold">{t('choose_language', 'اختر اللغة')}</div>
                <button onClick={() => changeLanguage('ar')} className="w-full px-3 py-2 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between">
                  <span className="text-lg">🇸🇦</span>
                  <span>العربية</span>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'ar' ? 'bg-pink-500' : 'bg-transparent'}`}></div>
                </button>
                <button onClick={() => changeLanguage('en')} className="w-full px-3 py-2 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between">
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'en' ? 'bg-pink-500' : 'bg-transparent'}`}></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-black opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="group mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-900/40 hover:from-pink-500/20 hover:to-purple-600/20 border border-gray-700/50 hover:border-pink-500/40 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/20"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              {t('back_to_home')}
            </span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t('join_our_agency_title')}
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto px-4">
              {t('be_part_successful_creators')}
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-4xl mx-auto px-4 mb-8 md:mb-16">
        <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-xl p-4 md:p-8 lg:p-10 rounded-xl md:rounded-2xl border-2 border-pink-500/30 shadow-2xl shadow-pink-500/10">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              MAGIC CARNATION
            </h3>
            <p className="text-gray-400 mt-2 text-sm md:text-base">{t('professional_tiktok_agency')}</p>
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-center">{t('agency_join_application_form')}</h2>
          
          <form id="join-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('full_name')}</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-pink-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white placeholder-gray-400"
                  placeholder={t('enter_full_name')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required', 'ضروري')}</div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('age', 'العمر')}</label>
                <input 
                  type="number" 
                  required
                  min="16"
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-pink-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white placeholder-gray-400"
                  placeholder={t('enter_age', 'أدخل عمرك')}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required', 'ضروري')}</div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('choose_gender')}</label>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'male' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.gender === 'male'}
                      onChange={() => setFormData({...formData, gender: 'male'})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">{t('male')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'female' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.gender === 'female'}
                      onChange={() => setFormData({...formData, gender: 'female'})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">{t('female')}</span>
                  </label>
                </div>
              </div>
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('phone_number')}</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-pink-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white placeholder-gray-400"
                  placeholder={t('enter_phone_number')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Job Type Selection */}
            <div className="space-y-4 md:space-y-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 md:p-6 rounded-xl border border-purple-500/30">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required', 'ضروري')}</div>
                <label className="block text-sm md:text-base font-medium mb-3">{t('choose_job_type', 'اختر نوع الوظيفة المطلوبة')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.jobType === 'photographer' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.jobType === 'photographer'}
                      onChange={() => setFormData({...formData, jobType: 'photographer', otherJobType: ''})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">📸 {t('photographer', 'مصور')}</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.jobType === 'programmer' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.jobType === 'programmer'}
                      onChange={() => setFormData({...formData, jobType: 'programmer', otherJobType: ''})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">💻 {t('programmer', 'مبرمج')}</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.jobType === 'live_moderator' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.jobType === 'live_moderator'}
                      onChange={() => setFormData({...formData, jobType: 'live_moderator', otherJobType: ''})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">🎧 {t('live_moderator_job', 'مشرف لايف')}</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.jobType === 'other' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="jobType"
                      className="accent-pink-500 w-4 h-4"
                      checked={formData.jobType === 'other'}
                      onChange={() => setFormData({...formData, jobType: 'other'})}
                      required
                    />
                    <span className="text-sm md:text-base font-medium">✨ {t('other_job', 'وظيفة أخرى')}</span>
                  </label>
                </div>
              </div>
              
              {/* Other Job Type Input */}
              {formData.jobType === 'other' && (
                <div className="animate-fadeIn">
                  <div className="text-red-400 text-xs md:text-sm font-bold mb-1 md:mb-2">{t('required', 'ضروري')}</div>
                  <label className="block text-sm md:text-base font-medium mb-2">{t('specify_other_job', 'حدد الوظيفة الأخرى')}</label>
                  <input 
                    type="text" 
                    required={formData.jobType === 'other'}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-pink-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white placeholder-gray-400"
                    placeholder={t('enter_job_name', 'أدخل اسم الوظيفة')}
                    value={formData.otherJobType}
                    onChange={(e) => setFormData({...formData, otherJobType: e.target.value})}
                  />
                </div>
              )}
            </div>

            {/* TikTok Information */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('do_you_have_tiktok')}</label>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.hasTiktok === 'yes' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="hasTiktok"
                      className="accent-pink-500"
                      checked={formData.hasTiktok === 'yes'}
                      onChange={() => setFormData({...formData, hasTiktok: 'yes'})}
                    />
                    <span className="text-sm md:text-base font-medium">{t('yes')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.hasTiktok === 'no' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="hasTiktok"
                      className="accent-pink-500"
                      checked={formData.hasTiktok === 'no'}
                      onChange={() => setFormData({...formData, hasTiktok: 'no'})}
                    />
                    <span className="text-sm md:text-base font-medium">{t('no')}</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-2">{t('share_account_name')}</label>
                <input 
                  type="text" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-pink-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white placeholder-gray-400"
                  placeholder={t('username_placeholder')}
                  value={formData.tiktokHandle}
                  onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm md:text-base font-medium mb-2">{t('experience_content_creation')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'beginner' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'beginner'}
                    onChange={() => setFormData({...formData, experience: 'beginner'})}
                  />
                  <span className="text-sm md:text-base font-medium">{t('beginner')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'intermediate' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'intermediate'}
                    onChange={() => setFormData({...formData, experience: 'intermediate'})}
                  />
                  <span className="text-sm md:text-base font-medium">{t('intermediate')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'very-good' ? 'border-pink-500 bg-pink-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-pink-400/50 hover:bg-gray-700/50'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'very-good'}
                    onChange={() => setFormData({...formData, experience: 'very-good'})}
                  />
                  <span className="text-sm md:text-base font-medium">{t('very_good')}</span>
                </label>
              </div>
            </div>

            {submitted ? (
              <div className="space-y-4 md:space-y-6">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
                >
                  {t('contact_via_whatsapp')}
                </a>
                <button
                  onClick={onBack}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                  العودة للصفحة الرئيسية
                </button>
              </div>
            ) : (
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/30"
              >
                {t('submit_agency_application')}
              </button>
            )}
          </form>
        </div>
      </div>

    </div>
  );
}