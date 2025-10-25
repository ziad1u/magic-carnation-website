import { useState, useEffect } from 'react';
import { ArrowRight, Users, Phone, MessageCircle, ExternalLink, Calendar, MapPin, Search } from 'lucide-react';

interface Application {
  fullName: string;
  phone: string;
  age: string;
  gender: string;
  country: string;
  city: string;
  hasTiktok: string;
  tiktokHandle: string;
  contentType: string;
  goals: string;
  experience: string;
  portfolio: string;
  socialMedia: string;
  availability: string;
  motivation: string;
  date: string;
}

interface TikTokClick {
  timestamp: string;
  userAgent: string;
  formData: Application;
}

interface TikTokCreatorNetworkClick {
  timestamp: string;
  userAgent: string;
  url: string;
}

interface UnifiedData {
  fullName: string;
  phone: string;
  age: string;
  gender: string;
  country: string;
  city: string;
  hasTiktok: string;
  tiktokHandle: string;
  contentType: string;
  goals: string;
  experience: string;
  portfolio: string;
  socialMedia: string;
  availability: string;
  motivation: string;
  date: string;
  type: 'application' | 'click' | 'tiktok-network';
  clickTime?: string;
}

interface CommunicationCenterProps {
  onBack?: () => void;
}

export default function CommunicationCenter({ onBack }: CommunicationCenterProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [tiktokClicks, setTiktokClicks] = useState<TikTokClick[]>([]);
  const [tiktokNetworkClicks, setTiktokNetworkClicks] = useState<TikTokCreatorNetworkClick[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'applications' | 'clicks' | 'tiktok-network'>('all');
  const [selectedApplication, setSelectedApplication] = useState<UnifiedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    // إضافة تحديث دوري للبيانات
    const interval = setInterval(loadData, 5000); // تحديث كل 5 ثوان
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    try {
      // Load applications
      const apps = JSON.parse(localStorage.getItem('onlineJoinApplications') || '[]');
      setApplications(apps);

      // Load TikTok clicks
      const clicks = JSON.parse(localStorage.getItem('tiktokCreatorNetworkClicks') || '[]');
      setTiktokClicks(clicks);

      // Load TikTok Creator Network clicks
      const networkClicks = JSON.parse(localStorage.getItem('tiktokCreatorNetworkLinkClicks') || '[]');
      setTiktokNetworkClicks(networkClicks);
      
      // إضافة بيانات تجريبية إذا لم توجد بيانات
      if (apps.length === 0 && clicks.length === 0) {
        console.log('لا توجد بيانات، سيتم عرض رسالة فارغة');
        // إضافة بيانات تجريبية للاختبار
        const sampleApps = [
          {
            fullName: 'أحمد محمد',
            phone: '+966501234567',
            age: '25',
            gender: 'ذكر',
            country: 'السعودية',
            city: 'الرياض',
            hasTiktok: 'نعم',
            tiktokHandle: '@ahmed_mohamed',
            contentType: 'كوميديا',
            goals: 'زيادة المتابعين',
            experience: 'سنتان',
            portfolio: 'https://example.com',
            socialMedia: 'Instagram: @ahmed',
            availability: 'مساءً',
            motivation: 'أحب صناعة المحتوى',
            date: new Date().toISOString()
          },
          {
            fullName: 'سارة أحمد',
            phone: '+966507654321',
            age: '22',
            gender: 'أنثى',
            country: 'الإمارات',
            city: 'دبي',
            hasTiktok: 'نعم',
            tiktokHandle: '@sara_ahmed',
            contentType: 'جمال',
            goals: 'بناء علامة تجارية',
            experience: 'سنة واحدة',
            portfolio: 'https://sara-portfolio.com',
            socialMedia: 'Instagram: @sara_beauty',
            availability: 'صباحاً',
            motivation: 'أريد مشاركة شغفي بالجمال',
            date: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setApplications(sampleApps);
        
        // إضافة بيانات تجريبية لضغطات TikTok Network
        const sampleNetworkClicks = [
          {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: 'https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014'
          },
          {
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            userAgent: navigator.userAgent,
            url: 'https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014'
          }
        ];
        setTiktokNetworkClicks(sampleNetworkClicks);
        localStorage.setItem('tiktokCreatorNetworkLinkClicks', JSON.stringify(sampleNetworkClicks));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  };

  const filteredData = (): UnifiedData[] => {
    let data: UnifiedData[] = [];
    
    if (filterType === 'all' || filterType === 'applications') {
      data = [...data, ...applications.map(app => ({ ...app, type: 'application' as const }))];
    }
    
    if (filterType === 'all' || filterType === 'clicks') {
      data = [...data, ...tiktokClicks.map(click => ({ ...click.formData, type: 'click' as const, clickTime: click.timestamp }))];
    }
    
    if (filterType === 'all' || filterType === 'tiktok-network') {
      data = [...data, ...tiktokNetworkClicks.map(click => ({ 
        fullName: 'مستخدم مجهول',
        phone: 'غير متوفر',
        age: 'غير محدد',
        gender: 'غير محدد',
        country: 'غير محدد',
        city: 'غير محدد',
        hasTiktok: 'غير محدد',
        tiktokHandle: 'غير متوفر',
        contentType: 'غير محدد',
        goals: 'غير محدد',
        experience: 'غير محدد',
        portfolio: 'غير متوفر',
        socialMedia: 'غير متوفر',
        availability: 'غير محدد',
        motivation: 'ضغط على رابط TikTok Creator Network',
        date: click.timestamp,
        type: 'tiktok-network' as const,
        clickTime: click.timestamp
      }))];
    }

    if (searchTerm) {
      data = data.filter(item => 
        item.fullName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        item.phone?.indexOf(searchTerm) !== -1 ||
        item.country?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        item.city?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }

    return data.sort((a, b) => new Date(b.date || b.clickTime || '').getTime() - new Date(a.date || a.clickTime || '').getTime());
  };

  const createWhatsAppLink = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const createTelegramLink = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://t.me/+${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const trackTikTokNetworkClick = () => {
    const clickData: TikTokCreatorNetworkClick = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: 'https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014'
    };
    
    const existingClicks = JSON.parse(localStorage.getItem('tiktokCreatorNetworkLinkClicks') || '[]');
    existingClicks.push(clickData);
    localStorage.setItem('tiktokCreatorNetworkLinkClicks', JSON.stringify(existingClicks));
    
    // تحديث البيانات المحملة
    setTiktokNetworkClicks(existingClicks);
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'application': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'click': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'tiktok-network': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (type: string) => {
    switch (type) {
      case 'application': return 'طلب انضمام';
      case 'click': return 'ضغط على TikTok';
      case 'tiktok-network': return 'ضغط على TikTok Network';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`
        }}></div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-lg shadow-cyan-500/30"></div>
            <p className="text-2xl text-gray-300 font-semibold mb-2">جاري تحميل البيانات...</p>
            <p className="text-sm text-gray-500">مركز التواصل - Magic Carnation</p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-xl transition-all backdrop-blur-sm border border-gray-700/50"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            العودة للصفحة الرئيسية
          </button>
        )}
        
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-black/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl mb-8">
          {/* Header Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 flex items-center justify-center border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              مركز التواصل
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              إدارة شاملة ومتقدمة لطلبات الانضمام والتواصل مع المبدعين
            </p>
            
            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-300">{applications.length}</div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">طلبات الانضمام</div>
                  <div className="text-xs text-cyan-400/70 mt-1">طلبات جديدة</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 to-purple-500/10 border border-blue-400/30 rounded-2xl p-5 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-blue-300">{tiktokClicks.length}</div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">ضغطات TikTok</div>
                  <div className="text-xs text-blue-400/70 mt-1">تفاعلات</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500/15 to-emerald-500/10 border border-green-400/30 rounded-2xl p-5 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-green-500/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-green-300">{applications.filter(app => app.hasTiktok === 'نعم').length}</div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">لديهم TikTok</div>
                  <div className="text-xs text-green-400/70 mt-1">مبدعين</div>
                </div>
              </div>
              
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/15 to-red-500/10 border border-orange-400/30 rounded-2xl p-5 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105">
                <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/20 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="text-2xl font-bold text-orange-300">{tiktokNetworkClicks.length}</div>
                  </div>
                  <div className="text-sm text-gray-300 font-medium">ضغطات TikTok Network</div>
                  <div className="text-xs text-orange-400/70 mt-1">رابط التسجيل</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <button
                onClick={loadData}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
              >
                🔄 تحديث البيانات
              </button>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                العودة للصفحة الرئيسية
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-600/30 shadow-2xl mb-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              الوظائف السريعة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => {
                  const message = `مرحباً! أريد التواصل معكم بخصوص الانضمام إلى Magic Carnation.`;
                  window.open(`https://wa.me/212655723182?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="group relative overflow-hidden flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 text-white rounded-2xl font-semibold hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">WhatsApp</div>
                    <div className="text-sm text-green-300/80">تواصل مباشر</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  const message = `مرحباً! أريد التواصل معكم بخصوص الانضمام إلى Magic Carnation.`;
                  window.open(`https://t.me/+212655723182?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="group relative overflow-hidden flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 text-white rounded-2xl font-semibold hover:from-blue-500/30 hover:to-cyan-600/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">Telegram</div>
                    <div className="text-sm text-blue-300/80">رسائل فورية</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText('212655723182');
                  alert('تم نسخ رقم الهاتف!');
                }}
                className="group relative overflow-hidden flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 text-white rounded-2xl font-semibold hover:from-purple-500/30 hover:to-pink-600/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">نسخ الرقم</div>
                    <div className="text-sm text-purple-300/80">212655723182</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  trackTikTokNetworkClick();
                  window.open('https://www.tiktok.com/tcn/scout_creators?use_spark=1&agency_scout_source=qr_code_leads&ShareLinkID=7393964841020427014', '_blank');
                }}
                className="group relative overflow-hidden flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 text-white rounded-2xl font-semibold hover:from-orange-500/30 hover:to-red-600/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">TikTok Network</div>
                    <div className="text-sm text-orange-300/80">رابط التسجيل</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-600/30 shadow-2xl mb-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              فلترة وبحث متقدم
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    الكل
                  </span>
                </button>
                <button
                  onClick={() => setFilterType('applications')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    filterType === 'applications' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    طلبات الانضمام
                  </span>
                </button>
                <button
                  onClick={() => setFilterType('clicks')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    filterType === 'clicks' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/30' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    ضغطات TikTok
                  </span>
                </button>
                <button
                  onClick={() => setFilterType('tiktok-network')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    filterType === 'tiktok-network' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/30' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    TikTok Network
                  </span>
                </button>
              </div>
              
              <div className="relative w-full lg:w-96">
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="البحث بالاسم، الهاتف، البلد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredData().length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-500/30">
                <MessageCircle className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">لا توجد بيانات للعرض</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                لم يتم العثور على أي طلبات انضمام أو ضغطات على TikTok حتى الآن.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setFilterType('all')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  عرض الكل
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition-all"
                >
                  العودة للصفحة الرئيسية
                </button>
              </div>
            </div>
          ) : (
            filteredData().map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-xl p-6 rounded-3xl border border-gray-700/50 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.type)}`}>
                      {getStatusText(item.type)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(item.date || item.clickTime).toLocaleString('ar-SA')}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{item.fullName}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{item.age} سنة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{item.country}, {item.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{item.gender}</span>
                    </div>
                  </div>

                  {item.tiktokHandle && (
                    <div className="mt-4 p-3 bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <ExternalLink className="w-4 h-4 text-pink-400" />
                        <span className="text-sm font-medium text-pink-400">TikTok</span>
                      </div>
                      <span className="text-gray-300">@{item.tiktokHandle}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 lg:w-64">
                  <a
                    href={createWhatsAppLink(item.phone, `مرحباً ${item.fullName}، شكراً لك على اهتمامك بالانضمام إلى Magic Carnation. سنتواصل معك قريباً!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  
                  <a
                    href={createTelegramLink(item.phone, `مرحباً ${item.fullName}، شكراً لك على اهتمامك بالانضمام إلى Magic Carnation. سنتواصل معك قريباً!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Telegram
                  </a>
                  
                  <button
                    onClick={() => setSelectedApplication(item)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
                  >
                    <Users className="w-4 h-4" />
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {filteredData().length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center border border-gray-500/30">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">لا توجد بيانات</h3>
            <p className="text-gray-500">لم يتم العثور على أي طلبات أو ضغطات تطابق البحث</p>
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-400">تفاصيل الطلب</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">المعلومات الشخصية</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-400">الاسم:</span> <span className="text-white">{selectedApplication.fullName}</span></div>
                    <div><span className="text-gray-400">الهاتف:</span> <span className="text-white">{selectedApplication.phone}</span></div>
                    <div><span className="text-gray-400">العمر:</span> <span className="text-white">{selectedApplication.age}</span></div>
                    <div><span className="text-gray-400">الجنس:</span> <span className="text-white">{selectedApplication.gender}</span></div>
                    <div><span className="text-gray-400">البلد:</span> <span className="text-white">{selectedApplication.country}</span></div>
                    <div><span className="text-gray-400">المدينة:</span> <span className="text-white">{selectedApplication.city}</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">معلومات المحتوى</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-400">حساب TikTok:</span> <span className="text-white">{selectedApplication.hasTiktok}</span></div>
                    <div><span className="text-gray-400">اسم المستخدم:</span> <span className="text-white">{selectedApplication.tiktokHandle || 'غير محدد'}</span></div>
                    <div><span className="text-gray-400">نوع المحتوى:</span> <span className="text-white">{selectedApplication.contentType}</span></div>
                    <div><span className="text-gray-400">الخبرة:</span> <span className="text-white">{selectedApplication.experience}</span></div>
                    <div><span className="text-gray-400">التوفر:</span> <span className="text-white">{selectedApplication.availability}</span></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">الأهداف والدافع</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm">الأهداف:</span>
                    <p className="text-white mt-1">{selectedApplication.goals}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">الدافع:</span>
                    <p className="text-white mt-1">{selectedApplication.motivation}</p>
                  </div>
                </div>
              </div>
              
              {(selectedApplication.portfolio || selectedApplication.socialMedia) && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white mb-4">روابط إضافية</h3>
                  <div className="space-y-3">
                    {selectedApplication.portfolio && (
                      <div>
                        <span className="text-gray-400 text-sm">اعمالك السابقة:</span>
                        <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 block mt-1 break-all">
                          {selectedApplication.portfolio}
                        </a>
                      </div>
                    )}
                    {selectedApplication.socialMedia && (
                      <div>
                        <span className="text-gray-400 text-sm">وسائل التواصل:</span>
                        <p className="text-white mt-1 whitespace-pre-line">{selectedApplication.socialMedia}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-8">
                <a
                  href={createWhatsAppLink(selectedApplication.phone, `مرحباً ${selectedApplication.fullName}، شكراً لك على اهتمامك بالانضمام إلى Magic Carnation. سنتواصل معك قريباً!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  التواصل عبر WhatsApp
                </a>
                
                <a
                  href={createTelegramLink(selectedApplication.phone, `مرحباً ${selectedApplication.fullName}، شكراً لك على اهتمامك بالانضمام إلى Magic Carnation. سنتواصل معك قريباً!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  التواصل عبر Telegram
                </a>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      )}
    </div>
  );
}
