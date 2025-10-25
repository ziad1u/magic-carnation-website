import React, { useState } from 'react';
import { ArrowRight, Star, Award, CheckCircle, Play, Phone, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OnlineJoinPageProps {
  onBack: () => void;
}

export default function OnlineJoinPage({ onBack }: OnlineJoinPageProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    country: '',
    city: '',
    tiktokHandle: '',
    hasTiktok: '',
    contentType: '',
    goals: '',
    experience: '',
    portfolio: '',
    socialMedia: '',
    availability: '',
    expectedSalary: '',
    languages: '',
    skills: '',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  // Track TikTok Creator Network clicks
  const handleTikTokClick = () => {
    // Save click to localStorage
    const clicks = JSON.parse(localStorage.getItem('tiktokCreatorNetworkClicks') || '[]');
    clicks.push({ 
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      formData: formData
    });
    localStorage.setItem('tiktokCreatorNetworkClicks', JSON.stringify(clicks));

    // Send notification to Telegram
    const clickMessage = `
<b>🔗 تم الضغط على رابط TikTok Creator Network</b>
━━━━━━━━━━━━━━━━━━
👤 <b>المستخدم:</b> <code>${formData.fullName}</code>
📱 <b>الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>
🌍 <b>البلد:</b> <code>${formData.country}</code>
🕒 <b>وقت الضغط:</b> <code>${new Date().toLocaleString('ar-SA')}</code>
━━━━━━━━━━━━━━━━━━
<b>📊 إجمالي الضغطات:</b> <code>${clicks.length + 1}</code>`;
    
    sendToTelegram(clickMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const applications = JSON.parse(localStorage.getItem('onlineJoinApplications') || '[]');
    applications.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('onlineJoinApplications', JSON.stringify(applications));
    
    // إرسال تلقائي إلى تلغرام باللغة العربية فقط
    const message = `
🌐 <b>طلب انضمام أونلاين - Magic Carnation</b>
━━━━━━━━━━━━━━━━━━
👤 <b>الاسم الكامل:</b> <code>${formData.fullName}</code>
📱 <b>رقم الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>
🎂 <b>العمر:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>
🧑 <b>الجنس:</b> <code>${formData.gender}</code>
🌍 <b>البلد:</b> <code>${formData.country}</code>
🏙️ <b>المدينة:</b> <code>${formData.city}</code>
🎵 <b>لديه حساب تيك توك:</b> <code>${formData.hasTiktok || 'غير محدد'}</code>
📹 <b>اسم حساب تيك توك:</b> <code>${formData.tiktokHandle || 'غير محدد'}</code>
🎭 <b>نوع المحتوى:</b> <code>${formData.contentType || 'غير محدد'}</code>
🎯 <b>الأهداف:</b> <code>${formData.goals || 'غير محدد'}</code>
💼 <b>الخبرة:</b> <code>${formData.experience || 'غير محدد'}</code>
📁 <b>الأعمال السابقة:</b> <code>${formData.portfolio || 'غير محدد'}</code>
📱 <b>وسائل التواصل:</b> <code>${formData.socialMedia || 'غير محدد'}</code>
⏰ <b>التوفر:</b> <code>دوام كامل</code>
💡 <b>الدافع:</b> <code>${formData.motivation || 'غير محدد'}</code>
━━━━━━━━━━━━━━━━━━
🔗 <b>رابط TikTok Creator Network:</b> <code>https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014</code>
━━━━━━━━━━━━━━━━━━
🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>
🌟 <b>منصة:</b> <code>Magic Carnation Website</code>`;
    
    sendToTelegram(message);
    
    // Create WhatsApp link
    const targetPhone = '212655723182';
    const waMessage = `
طلب انضمام أونلاين للوكالة
━━━━━━━━━━━━━━━━━━
🌐 نوع الانضمام: أونلاين
👤 الاسم: ${formData.fullName}
📱 الهاتف: ${formData.phone.replace(/\D/g, '')}
🎂 العمر: ${String(formData.age).replace(/\D/g, '')}
🧑 الجنس: ${formData.gender}
🌍 البلد: ${formData.country}
🏙️ المدينة: ${formData.city}
🎵 لديه حساب تيك توك: ${formData.hasTiktok || ''}
📹 حساب تيك توك: ${formData.tiktokHandle || ''}
🎭 نوع المحتوى: ${formData.contentType || ''}
🎯 الأهداف: ${formData.goals || ''}
💼 الخبرة: ${formData.experience || ''}
📁 اعمالك السابقة: ${formData.portfolio || ''}
📱 وسائل التواصل: ${formData.socialMedia || ''}
⏰ التوفر: دوام كامل
💡 الدافع: ${formData.motivation || ''}
━━━━━━━━━━━━━━━━━━
🔗 رابط TikTok Creator Network:
https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014
━━━━━━━━━━━━━━━━━━
شكراً لك.`;
    
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {t('request_sent_successfully')}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t('thank_you_interest_magic_carnation')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTikTokClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('join_tiktok_creator_network')}
              </a>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-green-500/25"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('contact_via_whatsapp')}
              </a>
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold text-lg hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                {t('back_to_home')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pt-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mb-8">
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
        
        <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-black/80 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center border border-pink-500/30">
                <img 
                  src="/logo-magic.svg" 
                  alt="Magic Carnation Logo" 
                  className="w-12 h-12"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('join_agency_online')}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{t('start_journey_with_us')}</p>
            <p className="text-gray-400 mb-6">{t('thank_you_interest_magic_carnation')}</p>
            
            {/* TikTok Creator Network Link */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-sm p-6 rounded-2xl border border-pink-500/20 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t('join_tiktok_creator_network')}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t('tiktok_join_description')}
                </p>
                <a
                  href="https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleTikTokClick}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-pink-500/25"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {t('join_now_via_tiktok')}
                </a>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">{t('step_of')} {currentStep} {t('of')} 4</span>
              <span className="text-sm text-gray-400">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-pink-400 flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  {t('personal_information')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('full_name')} *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      placeholder={t('enter_full_name')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('phone_number')} *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      placeholder="+212 6XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('age')} *</label>
                    <input
                      type="number"
                      required
                      min="16"
                      max="65"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('gender')} *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === 'male' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="gender"
                          className="accent-blue-500"
                          checked={formData.gender === 'male'}
                          onChange={() => setFormData({...formData, gender: 'male'})}
                          required
                        />
                        <span className='text-sm'>{t('male')}</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === 'female' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="gender"
                          className="accent-pink-500"
                          checked={formData.gender === 'female'}
                          onChange={() => setFormData({...formData, gender: 'female'})}
                          required
                        />
                        <span className='text-sm'>{t('female')}</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('country')} *</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      required
                    >
                      <option value="">{t('choose_country')}</option>
                      <optgroup label={t('arab_countries')}>
                        <option value="المغرب">{t('morocco')}</option>
                        <option value="الجزائر">{t('algeria')}</option>
                        <option value="تونس">{t('tunisia')}</option>
                        <option value="ليبيا">{t('libya')}</option>
                        <option value="مصر">{t('egypt')}</option>
                        <option value="السودان">{t('sudan')}</option>
                        <option value="سوريا">{t('syria')}</option>
                        <option value="لبنان">{t('lebanon')}</option>
                        <option value="الأردن">{t('jordan')}</option>
                        <option value="فلسطين">{t('palestine')}</option>
                        <option value="العراق">{t('iraq')}</option>
                        <option value="الكويت">{t('kuwait')}</option>
                        <option value="السعودية">{t('saudi_arabia')}</option>
                        <option value="الإمارات">{t('uae')}</option>
                        <option value="قطر">{t('qatar')}</option>
                        <option value="البحرين">{t('bahrain')}</option>
                        <option value="عمان">{t('oman')}</option>
                        <option value="اليمن">{t('yemen')}</option>
                        <option value="موريتانيا">{t('mauritania')}</option>
                        <option value="جيبوتي">{t('djibouti')}</option>
                        <option value="الصومال">{t('somalia')}</option>
                        <option value="جزر القمر">{t('comoros')}</option>
                      </optgroup>
                      <optgroup label={t('spanish_countries')}>
                        <option value="إسبانيا">{t('spain')}</option>
                        <option value="المكسيك">{t('mexico')}</option>
                        <option value="الأرجنتين">{t('argentina')}</option>
                        <option value="كولومبيا">{t('colombia')}</option>
                        <option value="بيرو">{t('peru')}</option>
                        <option value="فنزويلا">{t('venezuela')}</option>
                        <option value="تشيلي">{t('chile')}</option>
                        <option value="الإكوادور">{t('ecuador')}</option>
                        <option value="غواتيمالا">{t('guatemala')}</option>
                        <option value="كوبا">{t('cuba')}</option>
                        <option value="بوليفيا">{t('bolivia')}</option>
                        <option value="جمهورية الدومينيكان">{t('dominican_republic')}</option>
                        <option value="هندوراس">{t('honduras')}</option>
                        <option value="باراغواي">{t('paraguay')}</option>
                        <option value="السلفادور">{t('el_salvador')}</option>
                        <option value="نيكاراغوا">{t('nicaragua')}</option>
                        <option value="كوستاريكا">{t('costa_rica')}</option>
                        <option value="بنما">{t('panama')}</option>
                        <option value="أوروغواي">{t('uruguay')}</option>
                      </optgroup>
                      <optgroup label={t('italian_countries')}>
                        <option value="إيطاليا">{t('italy')}</option>
                        <option value="سان مارينو">{t('san_marino')}</option>
                        <option value="الفاتيكان">{t('vatican')}</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('city')} *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      placeholder="الدار البيضاء"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: TikTok & Content */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-pink-400 flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  {t('tiktok_content_info')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('do_you_have_tiktok')} *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.hasTiktok === 'yes' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="hasTiktok"
                          className="accent-pink-500"
                          checked={formData.hasTiktok === 'yes'}
                          onChange={() => setFormData({...formData, hasTiktok: 'yes'})}
                          required
                        />
                        <span className='text-sm'>{t('yes')}</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.hasTiktok === 'no' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="hasTiktok"
                          className="accent-pink-500"
                          checked={formData.hasTiktok === 'no'}
                          onChange={() => setFormData({...formData, hasTiktok: 'no'})}
                          required
                        />
                        <span className='text-sm'>{t('no')}</span>
                      </label>
                    </div>
                  </div>
                  
                  {formData.hasTiktok === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">{t('tiktok_account')}</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                        placeholder="@username"
                        value={formData.tiktokHandle}
                        onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('content_type_produce')} *</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      value={formData.contentType}
                      onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                      required
                    >
                      <option value="">{t('choose_content_type')}</option>
                      <option value="comedy">{t('comedy')}</option>
                      <option value="lifestyle">{t('lifestyle')}</option>
                      <option value="beauty">{t('beauty_fashion')}</option>
                      <option value="food">{t('food')}</option>
                      <option value="educational">{t('educational')}</option>
                      <option value="sports">{t('sports')}</option>
                      <option value="music">{t('music_dance')}</option>
                      <option value="technology">{t('technology')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('goals_joining_agency')} *</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white resize-none"
                      placeholder={t('tell_us_goals')}
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('content_creation_experience')} *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.experience === 'beginner' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="experience"
                          className="accent-pink-500"
                          checked={formData.experience === 'beginner'}
                          onChange={() => setFormData({...formData, experience: 'beginner'})}
                          required
                        />
                        <span className='text-sm'>{t('beginner')}</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.experience === 'intermediate' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="experience"
                          className="accent-pink-500"
                          checked={formData.experience === 'intermediate'}
                          onChange={() => setFormData({...formData, experience: 'intermediate'})}
                          required
                        />
                        <span className='text-sm'>{t('intermediate')}</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.experience === 'expert' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                        <input
                          type="radio"
                          name="experience"
                          className="accent-pink-500"
                          checked={formData.experience === 'expert'}
                          onChange={() => setFormData({...formData, experience: 'expert'})}
                          required
                        />
                        <span className='text-sm'>{t('expert')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Portfolio & Skills */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-pink-400 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  {t('showcase_previous_work')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('previous_work')}</label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white"
                      placeholder="https://portfolio.example.com"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('social_media_accounts')}</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white resize-none"
                      placeholder={t('social_media_placeholder')}
                      value={formData.socialMedia}
                      onChange={(e) => setFormData({...formData, socialMedia: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('work_availability')} *</label>
                    <div className="p-3 rounded-xl border border-pink-500 bg-pink-500/10">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          className="accent-pink-500"
                          checked={true}
                          onChange={() => setFormData({...formData, availability: 'full-time'})}
                          required
                        />
                        <span className='text-sm'>{t('full_time')}</span>
                      </label>
                    </div>
                  </div>
                  
                  
                  
                  
                  
                </div>
              </div>
            )}

            {/* Step 4: Motivation & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-pink-400 flex items-center">
                  <Star className="w-6 h-6 mr-2" />
                  {t('motivation_final_review')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">{t('why_join_magic_carnation')} *</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-white resize-none"
                      placeholder={t('tell_us_motivation')}
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    ></textarea>
                  </div>
                  
                  {/* Summary */}
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 text-pink-400">{t('request_summary')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-400">{t('name')}:</span> <span className="text-white">{formData.fullName || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('phone')}:</span> <span className="text-white">{formData.phone || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('age_label')}:</span> <span className="text-white">{formData.age || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('country_label')}:</span> <span className="text-white">{formData.country || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('content_type')}:</span> <span className="text-white">{formData.contentType || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('experience')}:</span> <span className="text-white">{formData.experience || t('not_specified')}</span></div>
                      <div><span className="text-gray-400">{t('availability')}:</span> <span className="text-white">{formData.availability || t('not_specified')}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                {t('previous')}
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  {t('next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-green-500/25"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('submit_request')}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
