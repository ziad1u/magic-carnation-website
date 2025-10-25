import React, { useState } from 'react';
import { ArrowRight, Star, Crown, TrendingUp, Users, Award, CheckCircle, Play, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LiveModeratorPageProps {
  onBack: () => void;
}

export default function LiveModeratorPage({ onBack }: LiveModeratorPageProps) {
  const { t, i18n } = useTranslation();
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // إرسال تلقائي إلى تلغرام
  const sendToTelegram = (message: string) => {
    fetch(`https://api.telegram.org/bot8147488523:AAGDZPgJYFUhdS0HMJseKBZe68idGR-7MqI/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 5171095071,
        text: message,
        parse_mode: "HTML"
      })
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const applications = JSON.parse(localStorage.getItem('liveModeratorApplications') || '[]');
    applications.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('liveModeratorApplications', JSON.stringify(applications));
    console.log('Live Moderator Application:', formData);
    // إرسال تلقائي إلى تلغرام
    // إرسال تلقائي إلى تلغرام باللغة العربية فقط
    const message = `\n<b>🌟 طلب مقدم بث مباشر</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>الاسم:</b> <code>${formData.fullName}</code>\n🧑 <b>الجنس:</b> <code>${formData.gender}</code>\n📱 <b>الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>\n🎂 <b>العمر:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>\n📹 <b>حساب تيك توك:</b> <code>${formData.tiktokHandle || ''}</code>\n🎯 <b>الأهداف:</b> <code>${formData.goals || ''}</code>\n💼 <b>الخبرة:</b> <code>${formData.experience || ''}</code>\n⏰ <b>التوفر:</b> <code>${formData.availability || ''}</code>\n🗣️ <b>اللغات:</b> <code>${formData.languages || ''}</code>\n━━━━━━━━━━━━━━━━━━\n🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>`;
    sendToTelegram(message);
    // إنشاء رابط واتساب للتواصل بعد الإرسال
    const targetPhone = '212655723182';
    const waMessage = `\nطلب العمل كمشرف لايف\n━━━━━━━━━━━━━━━━━━\n👤 الاسم: ${formData.fullName}\n🧑 الجنس: ${formData.gender}\n📱 الهاتف: ${formData.phone.replace(/\\D/g, '')}\n🎂 العمر: ${String(formData.age).replace(/\\D/g, '')}\n📹 حساب تيك توك: ${formData.tiktokHandle || ''}\n💼 الخبرة: ${formData.experience || ''}\n⏰ التوفر: ${formData.availability || ''}\n🗣️ اللغات: ${formData.languages || ''}\n🎯 الأهداف: ${formData.goals || ''}\n━━━━━━━━━━━━━━━━━━\nشكرًا لكم.`;
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800" style={{ top: '0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Magic Carnation</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/#services" className="text-gray-300 hover:text-white transition-colors">{t('services')}</a>
                <a href="/#portfolio" className="text-gray-300 hover:text-white transition-colors">{t('portfolio')}</a>
                <a href="/#team" className="text-gray-300 hover:text-white transition-colors">{t('team')}</a>
                <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">{t('contact')}</a>
              </div>
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
              <a href="/#services" className="block px-3 py-2 text-gray-300 hover:text-white">{t('services')}</a>
              <a href="/#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white">{t('portfolio')}</a>
              <a href="/#team" className="block px-3 py-2 text-gray-300 hover:text-white">{t('team')}</a>
              <a href="/#contact" className="block px-3 py-2 text-gray-300 hover:text-white">{t('contact')}</a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowRight className="w-5 h-5 ml-2 rotate-180" />
          {t('back_to_homepage')}
        </button>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MAGIC CARNATION
            </h3>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('live_moderator_title')}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('live_moderator_subtitle')}
          </p>
        </div>
      </div>

      {/* Job Benefits */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">{t('live_moderator_benefits_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: t('competitive_salary'),
              description: t('competitive_salary_desc'),
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: t('flexible_work_environment'),
              description: t('flexible_work_environment_desc'),
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: t('professional_development'),
              description: t('professional_development_desc'),
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: t('supportive_team'),
              description: t('supportive_team_desc'),
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: <Play className="w-8 h-8" />,
              title: t('modern_equipment'),
              description: t('modern_equipment_desc'),
              color: "from-red-500 to-pink-500"
            },
            {
              icon: <Crown className="w-8 h-8" />,
              title: t('prestigious_position'),
              description: t('prestigious_position_desc'),
              color: "from-indigo-500 to-purple-500"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-16">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">{t('job_requirements_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">{t('basic_requirements')}</h3>
              <ul className="space-y-3">
                {[
                  t('live_streaming_experience'),
                  t('excellent_communication'),
                  t('work_under_pressure'),
                  t('streaming_platform_experience'),
                  t('punctuality')
                ].map((req, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-3" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">{t('required_skills')}</h3>
              <ul className="space-y-3">
                {[
                  t('arabic_proficiency'),
                  t('content_management_experience'),
                  t('problem_solving_skills'),
                  t('teamwork_ability'),
                  t('technology_experience')
                ].map((skill, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 text-yellow-500 ml-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-16">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">{t('live_moderator_application_title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('full_name')}</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder={t('enter_full_name')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('age')}</label>
                <input 
                  type="number" 
                  required
                  min="18"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder={t('enter_age')}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('choose_gender')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.gender === 'male' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-blue-500"
                      checked={formData.gender === 'male'}
                      onChange={() => setFormData({...formData, gender: 'male'})}
                    />
                    <span className="text-sm">{t('male')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.gender === 'female' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-blue-500"
                      checked={formData.gender === 'female'}
                      onChange={() => setFormData({...formData, gender: 'female'})}
                    />
                    <span className="text-sm">{t('female')}</span>
                  </label>
                </div>
              </div>
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('phone_number')}</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder={t('enter_phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* TikTok Information */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('tiktok_account_as_moderator')}</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="@username"
                value={formData.tiktokHandle}
                onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
              />
            </div>

            {/* Experience and Skills */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('live_streaming_experience_level')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'beginner' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-blue-500"
                    checked={formData.experience === 'beginner'}
                    onChange={() => setFormData({...formData, experience: 'beginner'})}
                  />
                  <span className="text-sm">{t('beginner')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'intermediate' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-blue-500"
                    checked={formData.experience === 'intermediate'}
                    onChange={() => setFormData({...formData, experience: 'intermediate'})}
                  />
                  <span className="text-sm">{t('intermediate')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'expert' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-blue-500"
                    checked={formData.experience === 'expert'}
                    onChange={() => setFormData({...formData, experience: 'expert'})}
                  />
                  <span className="text-sm">{t('expert')}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('work_availability')}</label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              >
                <option value="">{t('choose_availability')}</option>
                <option value="full-time">{t('full_time')}</option>
                <option value="part-time">{t('part_time')}</option>
                <option value="flexible">{t('flexible')}</option>
                <option value="weekends">{t('weekends')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('languages_you_speak')}</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder={t('languages_example')}
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('goals_from_live_moderator_work')}</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder={t('goals_placeholder')}
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
              ></textarea>
            </div>
            
            {submitted ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                {t('contact_via_whatsapp')}
              </a>
            ) : (
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
              >
                {t('submit_live_moderator_application')}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}