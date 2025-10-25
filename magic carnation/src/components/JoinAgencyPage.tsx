import React, { useState } from 'react';
import { ArrowRight, UserPlus, Star, Crown, TrendingUp, Users, Award, CheckCircle, Play, Heart, MessageCircle, Menu, X } from 'lucide-react';
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
    tiktokHandle: '',
    hasTiktok: '',
    contentType: '',
    goals: '',
    experience: ''
  });
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
    const applications = JSON.parse(localStorage.getItem('agencyApplications') || '[]');
    applications.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('agencyApplications', JSON.stringify(applications));
    console.log('Agency Application:', formData);
    // إرسال تلقائي إلى تلغرام
    const message = `\n<b>${t('telegram_agency_join_title')}</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>${t('telegram_name')}:</b> <code>${formData.fullName}</code>\n🧑 <b>${t('telegram_gender')}:</b> <code>${formData.gender}</code>\n📱 <b>${t('telegram_phone')}:</b> <code>${formData.phone.replace(/\D/g, '')}</code>\n🎂 <b>${t('telegram_age')}:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>\n🎯 <b>${t('telegram_goals')}:</b> <code>${formData.goals || ''}</code>\n🎵 <b>${t('telegram_has_tiktok')}:</b> <code>${formData.hasTiktok || ''}</code>\n📹 <b>تيك توك:</b> <code>${formData.tiktokHandle || ''}</code>\n🎭 <b>${t('telegram_content_type')}:</b> <code>${formData.contentType || ''}</code>\n━━━━━━━━━━━━━━━━━━\n🕒 <b>${t('telegram_sent_at')}:</b> <code>${new Date().toLocaleString('en-US')}</code>`;
    const englishMessage = `\n<b>🌟 Agency Join Request</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>Name:</b> <code>${formData.fullName}</code>\n🧑 <b>Gender:</b> <code>${formData.gender}</code>\n📱 <b>Phone:</b> <code>${formData.phone.replace(/\D/g, '')}</code>\n🎂 <b>Age:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>\n🎯 <b>Goals:</b> <code>${formData.goals || ''}</code>\n🎵 <b>Has TikTok Account:</b> <code>${formData.hasTiktok || ''}</code>\n📹 <b>TikTok:</b> <code>${formData.tiktokHandle || ''}</code>\n🎭 <b>Content Type:</b> <code>${formData.contentType || ''}</code>\n━━━━━━━━━━━━━━━━━━\n🕒 <b>Sent At:</b> <code>${new Date().toLocaleString('en-US')}</code>`;
    const chineseMessage = `\n<b>🌟 加入代理申请</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>姓名:</b> <code>${formData.fullName}</code>\n🧑 <b>性别:</b> <code>${formData.gender}</code>\n📱 <b>电话:</b> <code>${formData.phone.replace(/\D/g, '')}</code>\n🎂 <b>年龄:</b> <code>${String(formData.age).replace(/\D/g, '')}</code>\n🎯 <b>目标:</b> <code>${formData.goals || ''}</code>\n🎵 <b>是否有抖音账号:</b> <code>${formData.hasTiktok || ''}</code>\n📹 <b>TikTok 账号:</b> <code>${formData.tiktokHandle || ''}</code>\n🎭 <b>内容类型:</b> <code>${formData.contentType || ''}</code>\n━━━━━━━━━━━━━━━━━━\n🕒 <b>发送时间:</b> <code>${new Date().toLocaleString('en-US')}</code>`;
    sendToTelegram(message);
    sendToTelegram(englishMessage);
    sendToTelegram(chineseMessage);
    // إنشاء رابط واتساب للتواصل بعد الإرسال
    const targetPhone = '212655723182';
    const waMessage = `\nطلب انضمام للوكالة\n━━━━━━━━━━━━━━━━━━\n👤 الاسم: ${formData.fullName}\n🧑 الجنس: ${formData.gender}\n📱 الهاتف: ${formData.phone.replace(/\D/g, '')}\n🎂 العمر: ${String(formData.age).replace(/\D/g, '')}\n🎵 هل لديك تيك توك: ${formData.hasTiktok || ''}\n📹 حساب تيك توك: ${formData.tiktokHandle || ''}\n🎭 نوع المحتوى: ${formData.contentType || ''}\n🎯 الأهداف: ${formData.goals || ''}\n💼 الخبرة: ${formData.experience || ''}\n━━━━━━━━━━━━━━━━━━\nشكرًا لكم.`;
    const link = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
    setWhatsAppUrl(link);
    setSubmitted(true);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-20" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800" style={{ top: '0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
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
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              MAGIC CARNATION
            </h3>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t('join_agency_title')}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('join_agency_subtitle')}
          </p>
        </div>
      </div>

      {/* Agency Benefits */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">{t('agency_benefits_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: t('rapid_growth'),
              description: t('rapid_growth_desc'),
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: t('professional_support'),
              description: t('professional_support_desc'),
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: t('business_opportunities'),
              description: t('business_opportunities_desc'),
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: t('exclusive_content'),
              description: t('exclusive_content_desc'),
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: <Play className="w-8 h-8" />,
              title: t('professional_production'),
              description: t('professional_production_desc'),
              color: "from-red-500 to-pink-500"
            },
            {
              icon: <Crown className="w-8 h-8" />,
              title: t('elite_position'),
              description: t('elite_position_desc'),
              color: "from-indigo-500 to-purple-500"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group">
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

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">{t('success_stories_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: t('success_story_1_name'),
              handle: t('success_story_1_handle'),
              before: t('success_story_1_before'),
              after: t('success_story_1_after'),
              growth: t('success_story_1_growth'),
              story: t('success_story_1_story')
            },
            {
              name: t('success_story_2_name'),
              handle: t('success_story_2_handle'),
              before: t('success_story_2_before'),
              after: t('success_story_2_after'),
              growth: t('success_story_2_growth'),
              story: t('success_story_2_story')
            },
            {
              name: t('success_story_3_name'),
              handle: t('success_story_3_handle'),
              before: t('success_story_3_before'),
              after: t('success_story_3_after'),
              growth: t('success_story_3_growth'),
              story: t('success_story_3_story')
            }
          ].map((story, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-bold">{story.name}</h3>
                <p className="text-gray-400 text-sm">{story.handle}</p>
              </div>
              <div className="text-center mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{t('before')}</span>
                  <span className="text-gray-400">{t('after')}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold">{story.before}</span>
                  <ArrowRight className="w-5 h-5 text-pink-500" />
                  <span className="text-xl font-bold text-pink-500">{story.after}</span>
                </div>
                <div className="text-green-400 font-semibold">{story.growth}</div>
              </div>
              <p className="text-gray-400 text-sm text-center">{story.story}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-16">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">{t('join_requirements_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">{t('minimum_requirements')}</h3>
              <ul className="space-y-3">
                {[
                  t('minimum_1000_followers'),
                  t('original_creative_content'),
                  t('regular_activity'),
                  t('community_standards'),
                  t('high_video_quality')
                ].map((req, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 ml-3" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">{t('what_we_look_for')}</h3>
              <ul className="space-y-3">
                {[
                  t('distinctive_personality'),
                  t('positive_audience_interaction'),
                  t('desire_to_develop'),
                  t('openness_to_cooperation'),
                  t('commitment_to_deadlines')
                ].map((quality, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Star className="w-5 h-5 text-yellow-500 ml-3" />
                    {quality}
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">{t('agency_application_title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('full_name')}</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
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
                  min="16"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder={t('enter_age')}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2">{t('choose_gender')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.gender === 'male' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-pink-500"
                      checked={formData.gender === 'male'}
                      onChange={() => setFormData({...formData, gender: 'male'})}
                      required
                    />
                    <span className="text-sm">{t('male')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.gender === 'female' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="gender"
                      className="accent-pink-500"
                      checked={formData.gender === 'female'}
                      onChange={() => setFormData({...formData, gender: 'female'})}
                      required
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
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder={t('enter_phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* TikTok Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('do_you_have_tiktok')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.hasTiktok === 'yes' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="hasTiktok"
                      className="accent-pink-500"
                      checked={formData.hasTiktok === 'yes'}
                      onChange={() => setFormData({...formData, hasTiktok: 'yes'})}
                    />
                    <span className="text-sm">{t('yes')}</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.hasTiktok === 'no' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                    <input
                      type="radio"
                      name="hasTiktok"
                      className="accent-pink-500"
                      checked={formData.hasTiktok === 'no'}
                      onChange={() => setFormData({...formData, hasTiktok: 'no'})}
                    />
                    <span className="text-sm">{t('no')}</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('share_tiktok_username')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  placeholder={t('username_placeholder')}
                  value={formData.tiktokHandle}
                  onChange={(e) => setFormData({...formData, tiktokHandle: e.target.value})}
                />
              </div>
            </div>

            {/* Content Information */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('content_type_you_produce')}</label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                value={formData.contentType}
                onChange={(e) => setFormData({...formData, contentType: e.target.value})}
              >
                <option value="">{t('choose_content_type')}</option>
                <option value="comedy">{t('comedy')}</option>
                <option value="lifestyle">{t('lifestyle')}</option>
                <option value="beauty">{t('beauty_fashion')}</option>
                <option value="food">{t('food')}</option>
                <option value="education">{t('educational')}</option>
                <option value="sports">{t('sports')}</option>
                <option value="music">{t('music_dance')}</option>
                <option value="tech">{t('technology')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            {/* Goals and Experience */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('goals_from_joining_agency')}</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                placeholder={t('goals_agency_placeholder')}
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('content_creation_experience')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'beginner' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'beginner'}
                    onChange={() => setFormData({...formData, experience: 'beginner'})}
                  />
                  <span className="text-sm">{t('beginner')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'intermediate' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'intermediate'}
                    onChange={() => setFormData({...formData, experience: 'intermediate'})}
                  />
                  <span className="text-sm">{t('intermediate')}</span>
                </label>
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData.experience === 'very-good' ? 'border-pink-500 bg-pink-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="experience"
                    className="accent-pink-500"
                    checked={formData.experience === 'very-good'}
                    onChange={() => setFormData({...formData, experience: 'very-good'})}
                  />
                  <span className="text-sm">{t('very_good')}</span>
                </label>
              </div>
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
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
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