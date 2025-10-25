import React, { useState } from 'react';
import { ArrowRight, Star, CheckCircle, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LiveModeratorPageProps {
  onBack: () => void;
}

export default function LiveModeratorPage({ onBack }: LiveModeratorPageProps) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    gender: '',
    tiktokHandle: '',
    experience: '',
    availability: '',
    languages: '',
    goals: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

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
    const applications = JSON.parse(localStorage.getItem('livemoderatorApplications') || '[]');
    applications.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('livemoderatorApplications', JSON.stringify(applications));
    console.log('Agent Application:', formData);
    
    // إرسال تلقائي إلى تلغرام باللغة العربية فقط
    const message = `
🎥 <b>طلب عمل مذيع بث مباشر - Magic Carnation</b>
━━━━━━━━━━━━━━━━━━
👤 <b>الاسم الكامل:</b> <code>${formData.fullName}</code>
🧑 <b>الجنس:</b> <code>${formData.gender}</code>
📱 <b>رقم الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>
🎂 <b>العمر:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>
📹 <b>اسم حساب تيك توك:</b> <code>${formData.tiktokHandle || 'غير محدد'}</code>
💼 <b>الخبرة:</b> <code>${formData.experience || 'غير محدد'}</code>
🕐 <b>التوفر:</b> <code>${formData.availability || 'غير محدد'}</code>
🌐 <b>اللغات:</b> <code>${formData.languages || 'غير محدد'}</code>
🎯 <b>الأهداف:</b> <code>${formData.goals || 'غير محدد'}</code>
━━━━━━━━━━━━━━━━━━
🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>
🌟 <b>منصة:</b> <code>Magic Carnation Website</code>`;
    sendToTelegram(message);
    
    // Create WhatsApp link for communication after submission
    const targetPhone = '212655723182';
    const waMessage = `\n✨ طلب عمل وكيل ✨\n━━━━━━━━━━━━━━━━━━\n👤 الاسم: ${formData.fullName}\n🧑 الجنس: ${formData.gender}\n📱 الهاتف: ${formData.phone.replace(/\D/g, '')}\n🎂 العمر: ${String(formData.age).replace(/\D/g, '')}\n📹 تيك توك: ${formData.tiktokHandle || ''}\n💼 الخبرة: ${formData.experience || ''}\n🕐 التوفر: ${formData.availability || ''}\n🌐 اللغات: ${formData.languages || ''}\n🎯 الأهداف: ${formData.goals || ''}\n━━━━━━━━━━━━━━━━━━\nشكراً لك.`;
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white pt-14 sm:pt-16 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
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
            
            {/* Desktop Menu */}
            <div className="flex items-center">{/* روابط مخفية للحاسوب */}
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors cursor-pointer mx-8 hidden">{t('portfolio')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors mx-8 hidden">{t('contact')}</a>
              
              {/* Language Switcher */}
              <div className="relative group">
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
                
                {/* Language Dropdown */}
                <div className="absolute top-full right-0 mt-3 w-52 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  <div className="p-2">
                    <div className="text-xs text-gray-400 px-3 py-2 font-semibold border-b border-gray-700/50 mb-1">{t('choose_language', 'اختر اللغة')}</div>
                    
                    <button onClick={() => changeLanguage('ar')} className="w-full px-4 py-3 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between rounded-xl group/item">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇸🇦</span>
                        <span className="font-medium">{t('arabic')}</span>
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
              
              <button onClick={() => window.location.href = '/#join-agency'} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl border border-pink-400/40 ml-2">{t('join_agency')}</button>
            </div>
            
            {/* Mobile Menu Button - Hidden */}
            <div className="hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white">{t('portfolio')}</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">{t('contact')}</a>
              <button onClick={() => window.location.href = '/#join-agency'} className="w-full text-left px-3 py-2 text-gray-300 hover:text-white bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-lg">{t('join_agency')}</button>
              <div className="border-t border-gray-700/50 mt-2 pt-2">
                <div className="text-xs text-gray-400 px-3 py-2 font-semibold">{t('choose_language')}</div>
                <button onClick={() => changeLanguage('ar')} className="w-full px-3 py-2 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between">
                  <span className="text-lg">🇸🇦</span>
                  <span>{t('arabic')}</span>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'ar' ? 'bg-pink-500' : 'bg-transparent'}`}></div>
                </button>
                <button onClick={() => changeLanguage('en')} className="w-full px-3 py-2 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between">
                  <span className="text-lg">🇺🇸</span>
                  <span>{t('english')}</span>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'en' ? 'bg-pink-500' : 'bg-transparent'}`}></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-black opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="group mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-900/40 hover:from-blue-500/20 hover:to-cyan-600/20 border border-gray-700/50 hover:border-blue-500/40 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              {t('back_to_home')}
            </span>
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('live_moderator_job_application')}
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto px-4">
              {t('live_moderator_details')}
            </p>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold mb-4 px-4">
            {t('job_requirements')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Basic Requirements */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-blue-400">{t('basic_requirements')}</h3>
            </div>
            <ul className="space-y-2">
              {[
                t('live_broadcast_supervision'),
                t('excellent_communication'),
                t('work_under_pressure'),
                t('broadcasting_platforms'),
                t('commitment_to_schedules')
              ].map((req, index) => (
                <li key={index} className="flex items-start text-sm text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-cyan-400">{t('required_skills')}</h3>
            </div>
            <ul className="space-y-2">
              {[
                t('english_proficiency'),
                t('content_management'),
                t('problem_solving'),
                t('teamwork_ability'),
                t('technology_experience')
              ].map((skill, index) => (
                <li key={index} className="flex items-start text-sm text-gray-300">
                  <Star className="w-5 h-5 text-yellow-500 ml-3 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="w-full max-w-5xl mx-auto px-4 mb-8">
        <div className="w-full bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MAGIC CARNATION
            </h3>
            <p className="text-gray-400 mt-2 text-xs">{t('professional_tiktok_agency')}</p>
          </div>
          <h2 className="text-base font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('live_moderator_job_application')}</h2>
          
          <form id="moderator-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-red-400 text-xs font-bold mb-2">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('full_name')}</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                  placeholder={t('enter_full_name')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
               <div className="text-red-400 text-xs font-bold mb-2">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('age')}</label>
                <input 
                  type="number" 
                  required
                  min="18"
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                  placeholder={t('enter_age')}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div>
                <div className="text-red-400 text-xs font-bold mb-2">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('gender')}</label>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'male' ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-cyan-500 w-4 h-4"
                      checked={formData.gender === 'male'}
                      onChange={() => setFormData({...formData, gender: 'male'})}
                      required
                    />
                    <span className="text-sm font-medium">{t('male')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'female' ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-cyan-500 w-4 h-4"
                      checked={formData.gender === 'female'}
                      onChange={() => setFormData({...formData, gender: 'female'})}
                      required
                    />
                    <span className="text-sm font-medium">{t('female')}</span>
                  </label>
                </div>
              </div>
              <div>
                <div className="text-red-400 text-xs font-bold mb-2">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('phone_number')}</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                  placeholder={t('enter_phone_number')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* TikTok & Experience */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2">{t('tiktok_account_moderator')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                  placeholder={t('username_placeholder')}
                  value={formData.tiktokHandle}
                  onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('experience_live_broadcast')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.experience === 'beginner' ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="experience"
                      className="accent-cyan-500 w-4 h-4"
                      checked={formData.experience === 'beginner'}
                      onChange={() => setFormData({...formData, experience: 'beginner'})}
                    />
                    <span className="text-sm font-medium">{t('beginner')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.experience === 'intermediate' ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="experience"
                      className="accent-cyan-500 w-4 h-4"
                      checked={formData.experience === 'intermediate'}
                      onChange={() => setFormData({...formData, experience: 'intermediate'})}
                    />
                    <span className="text-sm font-medium">{t('intermediate')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.experience === 'expert' ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-600 bg-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-700/50'}`}>
                    <input
                      type="radio"
                      name="experience"
                      className="accent-cyan-500 w-4 h-4"
                      checked={formData.experience === 'expert'}
                      onChange={() => setFormData({...formData, experience: 'expert'})}
                    />
                    <span className="text-sm font-medium">{t('expert')}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Availability & Languages */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('work_availability')}</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                >
                  <option value="">{t('choose_availability')}</option>
                  <option value="full-time">{t('full_time')}</option>
                  <option value="part-time">{t('part_time')}</option>
                  <option value="flexible">{t('flexible')}</option>
                  <option value="weekends">{t('weekends_only')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('languages_you_speak')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                  placeholder={t('languages_example')}
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                />
              </div>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('goals_live_moderator')}</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-cyan-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder-gray-400"
                placeholder={t('goals_placeholder')}
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
              ></textarea>
            </div>

            {submitted ? (
              <div className="space-y-4">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
                >
                  {t('contact_via_whatsapp')}
                </a>
                <button
                  onClick={onBack}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  العودة للصفحة الرئيسية
                </button>
              </div>
            ) : (
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
              >
                {t('submit_live_moderator')}
              </button>
            )}
          </form>
        </div>
      </div>

    </div>
  );
}