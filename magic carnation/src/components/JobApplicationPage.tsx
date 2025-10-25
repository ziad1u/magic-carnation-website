import React, { useState } from 'react';
import { ArrowRight, Upload, User, Phone, MapPin, Calendar, CheckCircle, Play, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface JobApplicationPageProps {
  onBack: () => void;
}

export default function JobApplicationPage({ onBack }: JobApplicationPageProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    location: '',
    experience: '',
    portfolio: '',
    skills: [],
    availability: '',
    expectedSalary: '',
    motivation: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const skills = [
    'إنتاج الفيديو', 'المونتاج', 'التصوير', 'الإخراج', 'كتابة السيناريو',
    'التسويق الرقمي', 'إدارة وسائل التواصل', 'التحليل والإحصائيات',
    'التصميم الجرافيكي', 'الرسوم المتحركة', 'التعليق الصوتي'
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

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
    const message = `\n<b>🚀 طلب عمل جديد</b>\n━━━━━━━━━━━━━━━━━━\n👤 <b>الاسم:</b> <code>${formData.fullName}</code>\n🚻 <b>الجنس:</b> <code>${formData.gender === 'male' ? 'ذكر' : formData.gender === 'female' ? 'أنثى' : ''}</code>\n📱 <b>الهاتف:</b> <code>${formData.phone.replace(/\D/g, '')}</code>\n📍 <b>المدينة:</b> <code>${formData.location || ''}</code>\n🧠 <b>الخبرة:</b> <code>${formData.experience || ''}</code>\n🛠️ <b>المهارات:</b> <code>${(selectedSkills || []).join(", ")}</code>\n💼 <b>الأعمال:</b> <code>${formData.portfolio || ''}</code>\n⏱️ <b>التوفر:</b> <code>${formData.availability || ''}</code>\n💵 <b>الراتب المتوقع:</b> <code>${formData.expectedSalary || ''}</code>\n💡 <b>الدافع:</b> <code>${formData.motivation || ''}</code>\n━━━━━━━━━━━━━━━━━━\n🕒 <b>تاريخ الإرسال:</b> <code>${new Date().toLocaleString('ar-SA')}</code>`;
    sendToTelegram(message);
    if (cvFile) {
      sendCVToTelegram(cvFile, `سيرة ذاتية من ${formData.fullName}`);
    }
    // إنشاء رابط واتساب للتواصل بعد الإرسال
    const targetPhone = '212655723182';
    const waMessage = `\nمرحبا، أود المتابعة بخصوص طلب العمل الخاص بي.\n━━━━━━━━━━━━━━━━━━\n👤 الاسم: ${formData.fullName}\n🚻 الجنس: ${formData.gender === 'male' ? 'ذكر' : formData.gender === 'female' ? 'أنثى' : ''}\n📱 الهاتف: ${formData.phone.replace(/\D/g, '')}\n📍 المدينة: ${formData.location || ''}\n🧠 الخبرة/التعليم: ${formData.experience || ''}\n🛠️ المهارات: ${(selectedSkills || []).join(', ')}\n💼 الأعمال: ${formData.portfolio || ''}\n⏱️ التوفر: ${formData.availability || ''}\n💵 الراتب المتوقع: ${formData.expectedSalary || ''}\n💡 الدافع: ${formData.motivation || ''}\n━━━━━━━━━━━━━━━━━━\nشكرًا لكم.`;
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
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Magic Carnation</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/#services" className="text-gray-300 hover:text-white transition-colors">الخدمات</a>
                <a href="/#portfolio" className="text-gray-300 hover:text-white transition-colors">أعمالنا</a>
                <a href="/#team" className="text-gray-300 hover:text-white transition-colors">الفريق</a>
                <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">تواصل معنا</a>
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
              <a href="/#services" className="block px-3 py-2 text-gray-300 hover:text-white">الخدمات</a>
              <a href="/#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white">أعمالنا</a>
              <a href="/#team" className="block px-3 py-2 text-gray-300 hover:text-white">الفريق</a>
              <a href="/#contact" className="block px-3 py-2 text-gray-300 hover:text-white">تواصل معنا</a>
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
          العودة للصفحة الرئيسية
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              انضم لفريقنا
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            كن جزءاً من أفضل وكالة تيك توك في المنطقة وساهم في إنتاج محتوى يحقق ملايين المشاهدات
          </p>
        </div>
      </div>

      {/* Job Positions */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">الوظائف المتاحة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "محرر فيديو",
              description: "مونتاج وتحرير الفيديوهات بشكل احترافي",
              requirements: ["إتقان برامج المونتاج", "حس فني عالي", "سرعة في التنفيذ"],
              salary: "الراتب الأساسي: 3000 درهم مغربي - يصل إلى (5000+ 4000+) مكافآت بدون حدود"
            },
            {
              title: "مدير تسويق",
              description: "إدارة الحملات التسويقية وتحليل الأداء",
              requirements: ["خبرة في التسويق الرقمي", "تحليل البيانات", "إدارة الفرق"],
              salary: "الراتب الأساسي: 3000 درهم مغربي - يصل إلى (5000+ 4000+) مكافآت بدون حدود"
            },
            {
              title: "مدير تسويق متقدم",
              description: "إدارة الحملات التسويقية المتقدمة وتحليل الأداء",
              requirements: ["خبرة متقدمة في التسويق الرقمي", "تحليل البيانات المتقدم", "إدارة الفرق الكبيرة"],
              salary: "الراتب الأساسي: 3000 درهم مغربي - يصل إلى (5000+ 4000+) مكافآت بدون حدود"
            }
          ].map((job, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-blue-400">{job.title}</h3>
              <p className="text-gray-400 mb-4">{job.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">المتطلبات:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-green-400 font-semibold">الراتب: {job.salary}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 mb-16">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MAGIC CARNATION
            </h3>
            <p className="text-gray-400 mt-2">{t('job_application_subtitle')}</p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">{t('job_application_title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <User className="w-4 h-4 ml-2" />
                  {t('full_name')}
                </label>
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
                <div className="text-red-400 text-xs font-bold mb-1">ضروري</div>
                <label className="block text-sm font-medium mb-2">الجنس</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">{t('select_gender')}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">{t('required')}</div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Phone className="w-4 h-4 ml-2" />
                  {t('phone_number')}
                </label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder={t('enter_phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <div className="text-red-400 text-xs font-bold mb-1">ضروري</div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 ml-2" />
                  المدينة
                </label>
                <select 
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="">اختر المدينة</option>
                  <option value="casablanca">الدار البيضاء</option>
                  <option value="rabat">الرباط</option>
                  <option value="fes">فاس</option>
                  <option value="marrakech">مراكش</option>
                  <option value="tangier">طنجة</option>
                  <option value="agadir">أكادير</option>
                  <option value="meknes">مكناس</option>
                  <option value="oujda">وجدة</option>
                  <option value="kenitra">القنيطرة</option>
                  <option value="tetouan">تطوان</option>
                  <option value="safi">آسفي</option>
                  <option value="mohammedia">المحمدية</option>
                  <option value="el-jadida">الجديدة</option>
                  <option value="nador">الناظور</option>
                  <option value="settat">سطات</option>
                  <option value="khouribga">خريبكة</option>
                  <option value="beni-mellal">بني ملال</option>
                  <option value="taza">تازة</option>
                  <option value="laayoune">العيون</option>
                  <option value="dakhla">الداخلة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Calendar className="w-4 h-4 ml-2" />
                مستوى التعليم
              </label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">اختر مستوى التعليم</option>
                <option value="elementary">ابتدائي</option>
                <option value="middle">إعدادي</option>
                <option value="high">ثانوي</option>
                <option value="bachelor">بكالوريوس</option>
                <option value="master">ماجستير</option>
                <option value="phd">دكتوراه</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-4">المهارات</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedSkills(prev =>
                      prev.includes('agency-positions') ? [] : ['agency-positions']
                    )
                  }
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm ${
                    selectedSkills.includes('agency-positions')
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  مناصب الوكالات
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedSkills(prev =>
                      prev.includes('personal-live') ? [] : ['personal-live']
                    )
                  }
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm ${
                    selectedSkills.includes('personal-live')
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  لايف شخصي
                </button>
              </div>
            </div>


            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-2">متى يمكنك البدء؟</label>
              <select 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
              >
                <option value="">اختر الوقت المناسب</option>
                <option value="immediately">فوراً</option>
                <option value="1week">خلال أسبوع</option>
                <option value="2weeks">خلال أسبوعين</option>
                <option value="1month">خلال شهر</option>
              </select>
            </div>

            {/* Expected Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">الراتب المتوقع (درهم مغربي)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="مثال: 5000"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
              />
            </div>


            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Upload className="w-4 h-4 ml-2" />
                رفع السيرة الذاتية
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">اسحب وأفلت ملف السيرة الذاتية أو انقر للاختيار</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (حد أقصى 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 mx-auto block"
                  onChange={e => setCvFile(e.target.files?.[0] || null)}
                />
                {cvFile && (
                  <div className="mt-2 text-green-400 text-xs">تم اختيار الملف: {cvFile.name}</div>
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
                تواصل عبر واتساب
              </a>
            ) : (
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                إرسال طلب العمل
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}