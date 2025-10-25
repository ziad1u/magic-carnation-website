import React, { useState } from 'react';
import { ArrowRight, Upload, User, Phone, MapPin, Calendar, CheckCircle, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface JobApplicationPageProps {
  onBack: () => void;
}

export default function JobApplicationPage({ onBack }: JobApplicationPageProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    location: '',
    tiktokHandle: '',
    hasTiktok: '',
    contentType: '',
    experience: '',
    portfolio: '',
    skills: [],
    availability: '',
    expectedSalary: '',
    goals: '',
    motivation: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
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


  // إرسال تلقائي إلى تلغرام
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

  // إرسال السيرة الذاتية عبر backend proxy لتجاوز CORS
  const sendCVToTelegram = (file: File, caption: string) => {
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('caption', caption);
    fetch('http://localhost:3001/api/send-cv', {
      method: 'POST',
      body: formData,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    applications.push({ ...formData, skills: selectedSkills, date: new Date().toISOString() });
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    console.log('Form submitted:', { ...formData, skills: selectedSkills });
    // إرسال تلقائي إلى تلغرام باللغة العربية فقط
    const jobTitle = selectedSkills[0] === 'personal-live' ? t('personal_live_creator') : '';
    const message = `
🎯 <b>طلب عمل جديد - Magic Carnation</b>
━━━━━━━━━━━━━━━━━━
👤 <b>الاسم الكامل:</b> <code>${formData.fullName}</code>
🎂 <b>العمر:</b> <code>${formData.age}</code>
🚻 <b>الجنس:</b> <code>${formData.gender === 'male' ? 'ذكر' : formData.gender === 'female' ? 'أنثى' : ''}</code>
📱 <b>رقم الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>
📍 <b>المدينة:</b> <code>${formData.location || 'غير محدد'}</code>
🎵 <b>لديه حساب تيك توك:</b> <code>${formData.hasTiktok === 'yes' ? 'نعم' : formData.hasTiktok === 'no' ? 'لا' : 'غير محدد'}</code>${formData.tiktokHandle ? `\n📱 <b>اسم حساب تيك توك:</b> <code>${formData.tiktokHandle}</code>` : ''}
🎬 <b>نوع المحتوى المفضل:</b> <code>${formData.contentType || 'غير محدد'}</code>
🧠 <b>المستوى التعليمي:</b> <code>${formData.experience || 'غير محدد'}</code>
💼 <b>الوظيفة المطلوبة:</b> <code>${jobTitle || 'غير محدد'}</code>
⏱️ <b>التوفر:</b> <code>${formData.availability || 'غير محدد'}</code>
━━━━━━━━━━━━━━━━━━
🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>
🌟 <b>منصة:</b> <code>Magic Carnation Website</code>`;
    sendToTelegram(message);
    if (cvFile) {
      sendCVToTelegram(cvFile, `${t('cv_from')} ${formData.fullName}`);
    }
    // إنشاء رابط واتساب للتواصل بعد الإرسال
    const targetPhone = '212655723182';
    const waMessage = `\n${t('whatsapp_greeting')}\n━━━━━━━━━━━━━━━━━━\n👤 ${t('name')}: ${formData.fullName}\n🎂 ${t('age')}: ${formData.age}\n🚻 ${t('gender')}: ${formData.gender === 'male' ? t('male') : formData.gender === 'female' ? t('female') : ''}\n📱 ${t('phone')}: ${formData.phone.replace(/\D/g, '')}\n📍 ${t('city')}: ${formData.location || ''}\n🎵 ${t('has_tiktok')}: ${formData.hasTiktok === 'yes' ? t('yes') : formData.hasTiktok === 'no' ? t('no') : ''}${formData.tiktokHandle ? `\n📱 ${t('tiktok_account')}: ${formData.tiktokHandle}` : ''}\n🎬 ${t('content_type_interest')}: ${formData.contentType || ''}\n🧠 ${t('education_level')}: ${formData.experience || ''}\n💼 ${t('job_applying_for')}: ${jobTitle}\n⏱️ ${t('availability')}: ${formData.availability || ''}\n━━━━━━━━━━━━━━━━━━\n${t('thank_you')}.`;
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-14 sm:pt-16">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800 transition-all duration-500" style={{ willChange: 'transform', top: '0' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                  className="w-full h-full object-contain"
                  onError={(e: any) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackDiv = e.currentTarget.parentElement;
                    if (fallbackDiv) {
                      fallbackDiv.className = 'w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center';
                      fallbackDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play w-4 h-4 text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
                    }
                  }}
                />
              </div>
              <span className="text-sm sm:text-xl font-bold">Magic Carnation</span>
            </div>
            <div className="hidden md:flex items-center">
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition-colors cursor-pointer mx-8">{t('portfolio')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors mx-8">{t('contact')}</a>
              
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
                    <div className="text-xs text-gray-400 px-3 py-2 font-semibold border-b border-gray-700/50 mb-1">{t('choose_language')}</div>
                    
                    <button onClick={() => changeLanguage('ar')} className="w-full px-4 py-3 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between rounded-xl group/item">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🇸🇦</span>
                        <span className="font-medium">{t('arabic')}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'ar' ? 'bg-pink-500' : 'bg-transparent group-hover/item:bg-pink-500/50'}`}></div>
                    </button>
                    
                    <button onClick={() => changeLanguage('en')} className="w-full px-4 py-3 text-right text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10 transition-all duration-300 flex items-center justify-between rounded-xl group/item">
                      <div className="flex items-center space-x-3">
 
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i18n.language === 'en' ? 'bg-pink-500' : 'bg-transparent group-hover/item:bg-pink-500/50'}`}></div>
                    </button>
                    
                  </div>
                </div>
              </div>
              
              <button onClick={() => window.location.href = '/#join-agency'} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl border border-pink-400/40 ml-2">{t('join_agency')}</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 sm:p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 transition-colors">
                {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
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
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 md:mb-8"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 rotate-180" />
          <span className="text-sm md:text-base">{t('back')}</span>
        </button>
        
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('join_our_team')}
            </span>
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            {t('choose_suitable_job')}
          </p>
        </div>
      </div>

      {/* Job Positions */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 px-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t('required_jobs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
          {[
            {
              title: t('personal_live_creator'),
              description: t('personal_live_creator_desc'),
              requirements: [t('personal_content_creation'), t('charisma_and_personality'), t('entertainment_skills'), t('live_streaming_skills')],
              salary: t('base_salary')
            }
          ].map((job, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-xl p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border-2 border-blue-500/30 hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:scale-[1.02]">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{job.title}</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed">{job.description}</p>
              <div className="mb-4 md:mb-6">
                <h4 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4 text-white">{t('requirements')}:</h4>
                <ul className="text-sm md:text-base text-gray-300 space-y-2 md:space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 ml-2 md:ml-3 flex-shrink-0" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-sm md:text-base lg:text-lg text-green-400 font-bold bg-green-500/10 border border-green-500/30 rounded-lg p-3 md:p-4">{t('salary')}: {job.salary}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12 md:mb-20">
        <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-800/90 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border-2 border-blue-500/30 hover:border-blue-500/40 transition-all duration-500 shadow-2xl shadow-blue-500/20 mb-8">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              MAGIC CARNATION
            </h3>
            <p className="text-gray-300 mt-3 md:mt-4 text-sm md:text-base lg:text-lg">{t('footer_description')}</p>
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t('job_application_title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base lg:text-lg font-medium mb-3 flex items-center text-white">
                  <User className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  {t('full_name')}
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base lg:text-lg text-white placeholder-gray-400"
                  placeholder={t('enter_full_name')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base lg:text-lg font-medium mb-3 text-white">{t('age')}</label>
                <input 
                  type="number" 
                  required
                  min="16"
                  className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base lg:text-lg text-white"
                  placeholder={t('enter_age')}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base lg:text-lg font-medium mb-3 text-white">{t('gender')}</label>
                <select
                  required
                  className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base lg:text-lg text-white"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">{t('choose_gender')}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base lg:text-lg font-medium mb-3 flex items-center text-white">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  {t('phone')}
                </label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base lg:text-lg text-white"
                  placeholder={t('enter_phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <div className="text-red-400 text-xs md:text-sm font-bold mb-2">{t('required')}</div>
                <label className="block text-sm md:text-base lg:text-lg font-medium mb-3 flex items-center text-white">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  {t('city')}
                </label>
                <select 
                  required
                  className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-4 lg:py-5 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base lg:text-lg text-white"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="">{t('choose_city')}</option>
                  <option value="casablanca">{t('casablanca')}</option>
                  <option value="rabat">{t('rabat')}</option>
                  <option value="fes">{t('fes')}</option>
                  <option value="marrakech">{t('marrakech')}</option>
                  <option value="tangier">{t('tangier')}</option>
                  <option value="agadir">{t('agadir')}</option>
                  <option value="meknes">{t('meknes')}</option>
                  <option value="oujda">{t('oujda')}</option>
                  <option value="kenitra">{t('kenitra')}</option>
                  <option value="tetouan">{t('tetouan')}</option>
                  <option value="safi">{t('safi')}</option>
                  <option value="mohammedia">{t('mohammedia')}</option>
                  <option value="el-jadida">{t('el_jadida')}</option>
                  <option value="nador">{t('nador')}</option>
                  <option value="settat">{t('settat')}</option>
                  <option value="khouribga">{t('khouribga')}</option>
                  <option value="beni-mellal">{t('beni_mellal')}</option>
                  <option value="taza">{t('taza')}</option>
                  <option value="laayoune">{t('laayoune')}</option>
                  <option value="dakhla">{t('dakhla')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>
            </div>

            {/* TikTok Information */}
            <div>
              <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
              <label className="block text-sm font-medium mb-2">{t('has_tiktok')}</label>
              <select 
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.hasTiktok}
                onChange={(e) => setFormData({...formData, hasTiktok: e.target.value})}
              >
                <option value="">{t('choose_option')}</option>
                <option value="yes">{t('yes')}</option>
                <option value="no">{t('no')}</option>
              </select>
            </div>

            {formData.hasTiktok === 'yes' && (
              <div>
                <label className="block text-sm font-medium mb-2">{t('tiktok_account')}</label>
                <input 
                  type="text" 
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:bg-gray-700 focus:outline-none transition-all text-sm md:text-base text-white"
                  placeholder={t('enter_tiktok_account')}
                  value={formData.tiktokHandle}
                  onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                />
              </div>
            )}

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('content_type_interest')}</label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.contentType}
                onChange={(e) => setFormData({...formData, contentType: e.target.value})}
              >
                <option value="">{t('choose_content_type')}</option>
                <option value="comedy">{t('comedy')}</option>
                <option value="beauty">{t('beauty')}</option>
                <option value="lifestyle">{t('lifestyle')}</option>
                <option value="gaming">{t('gaming')}</option>
                <option value="education">{t('education')}</option>
                <option value="dance">{t('dance')}</option>
                <option value="music">{t('music')}</option>
                <option value="cooking">{t('cooking')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Calendar className="w-4 h-4 ml-2" />
                {t('education_level')}
              </label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">{t('select_education_level')}</option>
                <option value="elementary">{t('elementary')}</option>
                <option value="middle">{t('middle')}</option>
                <option value="high">{t('high')}</option>
                <option value="bachelor">{t('bachelor')}</option>
                <option value="master">{t('master')}</option>
                <option value="phd">{t('phd')}</option>
              </select>
            </div>

            {/* Job Position */}
            <div>
              <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
              <label className="block text-sm font-medium mb-3">{t('job_applying_for')}</label>
              <div 
                onClick={() => setSelectedSkills(['personal-live'])}
                className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedSkills.includes('personal-live')
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      selectedSkills.includes('personal-live')
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                        : 'bg-gray-700'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                        <path d="M16 10c0-1-1-2-2-2s-2 1-2 2c0 .6.4 1.2 1 1.5V14h2v-2.5c.6-.3 1-.9 1-1.5Z"/>
                        <path d="M18 6v4"/>
                        <path d="M22 10v1a2 2 0 0 1-2 2h-2v3.5c0 1.4 0 2 .4 2.5.3.3.7.5 1.6.5 1 0 1.5-.2 1.8-.5.4-.5.4-1.1.4-2.5V16"/>
                        <path d="M6 6v4"/>
                        <path d="M2 10v1a2 2 0 0 0 2 2h2v3.5c0 1.4 0 2-.4 2.5-.3.3-.7.5-1.6.5-1 0-1.5-.2-1.8-.5-.4-.5-.4-1.1-.4-2.5V16"/>
                        <circle cx="12" cy="8" r="2"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-bold text-base transition-colors duration-300 ${
                        selectedSkills.includes('personal-live') ? 'text-blue-400' : 'text-white'
                      }`}>
                        {t('personal_live_creator')}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{t('personal_live_creator_desc')}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedSkills.includes('personal-live')
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-600'
                  }`}>
                    {selectedSkills.includes('personal-live') && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('availability')}</label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              >
                <option value="">{t('select_availability')}</option>
                <option value="immediately">{t('immediately')}</option>
                <option value="1week">{t('within_week')}</option>
                <option value="2weeks">{t('within_2weeks')}</option>
                <option value="1month">{t('within_month')}</option>
              </select>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Upload className="w-4 h-4 ml-2" />
                {t('cv_upload')}
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">{t('cv_drag_drop')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('pdf_doc_docx')} ({t('max_5mb')})</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 mx-auto block"
                  onChange={e => setCvFile(e.target.files?.[0] || null)}
                />
                {cvFile && (
                  <div className="mt-2 text-green-400 text-xs">{t('file_selected')}: {cvFile.name}</div>
                )}
              </div>
            </div>
            
            {submitted ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                {t('whatsapp_contact')}
              </a>
            ) : (
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {t('send_job_application')}
              </button>
            )}
          </form>
        </div>
      </div>

    </div>
  );
}