import { useEffect, useState } from 'react';
import { BarChart3, Home, User, Layers, Bell, Search, Users, CheckCircle, Sun, ChevronDown, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}
interface Notification {
  text: string;
  time: string;
}
interface Activity {
  text: string;
  time: string;
  avatar: string;
}
interface Contact {
  name: string;
  avatar: string;
}

const fetchDashboardData = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        stats: [
          { label: 'مشاهدات تيك توك', value: '١٢٬٥٠٠٬٠٠٠', change: '+٢.٣٪', positive: true },
          { label: 'الحملات الإعلانية', value: '٣٢', change: '+١ حملة', positive: true },
          { label: 'المؤثرون المتعاقدون', value: '١٢', change: '+٢ مؤثر', positive: true },
          { label: 'العملاء النشطون', value: '٨', change: 'بدون تغيير', positive: true },
        ],
        notifications: [
          { text: 'تم إطلاق حملة جديدة: "تحدي الصيف"', time: 'الآن' },
          { text: 'انضم المؤثر "سارة تيك توك" للوكالة.', time: 'منذ ٣٠ دقيقة' },
          { text: 'تمت إضافة عميل جديد: "شركة XYZ".', time: 'منذ ساعة' },
          { text: 'تم استلام تقييم إيجابي من عميل.', time: 'اليوم، ١١:٥٩ ص' },
        ],
        activities: [
          { text: 'نتائج حملة "تحدي الصيف": ٢ مليون مشاهدة', time: 'الآن', avatar: '/avatars/person1.jpg' },
          { text: 'انضم المؤثر "سارة تيك توك" للوكالة', time: 'منذ ٣٠ دقيقة', avatar: '/avatars/person2.jpg' },
          { text: 'تم توقيع عقد مع عميل جديد: "شركة XYZ"', time: 'منذ ساعة', avatar: '/avatars/person3.jpg' },
          { text: 'فيديو فيروسي جديد حقق ٥٠٠ ألف مشاهدة', time: 'اليوم، ١١:٥٩ ص', avatar: '/avatars/person4.jpg' },
          { text: 'تم تحديث بيانات المؤثرين', time: '٢ فبراير ٢٠٢٥', avatar: '/avatars/person5.jpg' },
        ],
        contacts: [
          { name: 'سارة تيك توك', avatar: '/avatars/person2.jpg' },
          { name: 'محمد المؤثر', avatar: '/avatars/person1.jpg' },
          { name: 'ريم الحربي', avatar: '/avatars/person3.jpg' },
          { name: 'شركة XYZ', avatar: '/avatars/person4.jpg' },
          { name: 'فريق الدعم', avatar: '/avatars/person5.jpg' },
          { name: 'عميل مميز', avatar: '/avatars/person6.jpg' },
        ]
      });
    }, 800);
  });

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((data: any) => {
      setStats(data.stats);
      setNotifications(data.notifications);
      setActivities(data.activities);
      setContacts(data.contacts);
      setLoading(false);
    });
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white flex" style={{fontFamily: 'Tajawal, Arial, sans-serif'}}>
      {/* Sidebar */}
      <aside className="w-64 bg-black border-l border-gray-800 flex flex-col py-6 px-4 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700">
            <img src="/profile-image.svg" alt="logo" className="w-8 h-8 rounded-full" />
          </div>
          <span className="font-bold text-lg text-pink-400">ماجيك كارنيشن</span>
        </div>
        <nav className="flex-1">
          <div className="mb-6">
            <div className="text-xs text-pink-400 mb-2">المفضلة</div>
            <ul className="space-y-2">
              <motion.li className="flex items-center gap-2 text-pink-400 font-semibold bg-gray-900 rounded-lg px-3 py-2" initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>
                <Home className="w-4 h-4 text-pink-400" /> نظرة عامة
              </motion.li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-pink-400 cursor-pointer px-3 py-2 transition-colors">
                <Layers className="w-4 h-4 text-purple-400" /> المشاريع
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-gray-800 bg-black relative overflow-visible">
          <motion.img
            src="/logo-magic.svg"
            alt="Logo"
            className="absolute left-8 top-[-32px] w-16 h-16 z-10 animate-float"
            initial={{ y: -20, opacity: 0.7 }}
            animate={{ y: [ -20, 0, -20 ], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
          />
          <div className="flex items-center gap-2 text-pink-400">
            <span className="font-bold text-lg text-white">لوحات التحكم</span>
            <ChevronDown className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300">/ الرئيسية</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="بحث" className="pl-8 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-pink-300" />
              <Search className="absolute left-2 top-2 w-4 h-4 text-pink-400" />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-900">
              <Sun className="w-5 h-5 text-pink-400" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-900">
              <Bell className="w-5 h-5 text-pink-400" />
            </button>
            <img src="/profile-image.svg" alt="profile" className="w-8 h-8 rounded-full border-2 border-gray-800" />
          </div>
        </header>
        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-6 px-8 py-6">
          {loading ? Array(4).fill(0).map((_,i) => (
            <motion.div key={i} className="rounded-2xl p-6 animate-pulse bg-gray-900 h-28" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: i*0.1}} />
          )) : stats.map((stat, i) => (
            <motion.div key={stat.label} className={`rounded-2xl p-6 flex flex-col gap-1 bg-gray-900 shadow border border-gray-800 hover:shadow-lg transition-shadow duration-200` }
              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{delay: i*0.12, type:'spring', stiffness:60}}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-pink-200 font-semibold flex items-center gap-2">
                  {stat.label === 'مشاهدات تيك توك' && <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Eye className="w-5 h-5 text-pink-400" /></motion.span>}
                  {stat.label === 'الحملات الإعلانية' && <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><BarChart3 className="w-5 h-5 text-purple-400" /></motion.span>}
                  {stat.label === 'المؤثرون المتعاقدون' && <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity }}><User className="w-5 h-5 text-blue-400" /></motion.span>}
                  {stat.label === 'العملاء النشطون' && <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}><Users className="w-5 h-5 text-green-400" /></motion.span>}
                  {stat.label}
                </span>
                <span className={`text-xs ${stat.positive ? 'text-pink-300' : 'text-purple-300'}`}>↗</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className={`text-xs ${stat.positive ? 'text-pink-200' : 'text-purple-200'}`}>{stat.change}</div>
            </motion.div>
          ))}
        </div>
        {/* Charts and Details */}
        <div className="flex gap-6 px-8 pb-6">
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="bg-black rounded-2xl p-6 shadow border border-gray-800 col-span-2">
              <div className="flex gap-4 text-xs text-pink-400 mb-2">
                <span className="text-white font-bold">إجمالي المستخدمين</span>
                <span>إجمالي المشاريع</span>
                <span>حالة التشغيل</span>
                <span>هذا العام</span>
                <span>العام الماضي</span>
              </div>
              <div className="h-40 w-full flex items-end gap-2">
                {/* Mocked line chart */}
                <div className="w-full h-full bg-gray-900 rounded-xl flex items-end">
                  <div className="w-1.5 h-24 bg-pink-400 rounded-full mx-1"></div>
                  <div className="w-1.5 h-32 bg-purple-400 rounded-full mx-1"></div>
                  <div className="w-1.5 h-20 bg-pink-700 rounded-full mx-1"></div>
                  <div className="w-1.5 h-36 bg-purple-600 rounded-full mx-1"></div>
                  <div className="w-1.5 h-28 bg-pink-500 rounded-full mx-1"></div>
                  <div className="w-1.5 h-40 bg-purple-700 rounded-full mx-1"></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow border border-gray-800">
              <div className="text-xs text-purple-300 mb-2">توزيع الأجهزة</div>
              <div className="flex items-end gap-2 h-32">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-24 bg-pink-400 rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-pink-200">لينكس</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-28 bg-purple-400 rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-purple-200">ماك</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-20 bg-white rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-white">iOS</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-32 bg-pink-600 rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-pink-300">ويندوز</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-28 bg-purple-600 rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-purple-300">أندرويد</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-6 h-24 bg-gray-400 rounded-t-lg"></div>
                  <span className="text-[10px] mt-1 text-gray-200">أخرى</span>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-2xl p-6 shadow border border-gray-800">
              <div className="text-xs text-pink-300 mb-2">توزيع حسب الدولة</div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-900 flex items-center justify-center">
                  {/* Mocked pie chart */}
                  <div className="w-20 h-20 rounded-full bg-black border-8 border-pink-600"></div>
                </div>
                <ul className="text-xs text-pink-200">
                  <li><span className="inline-block w-2 h-2 bg-pink-400 rounded-full ml-2"></span>السعودية <span className="mr-2 text-white font-bold">٥٢.١٪</span></li>
                  <li><span className="inline-block w-2 h-2 bg-purple-400 rounded-full ml-2"></span>مصر <span className="mr-2 text-white font-bold">٢٢.٨٪</span></li>
                  <li><span className="inline-block w-2 h-2 bg-pink-700 rounded-full ml-2"></span>المغرب <span className="mr-2 text-white font-bold">١٣.٩٪</span></li>
                  <li><span className="inline-block w-2 h-2 bg-gray-400 rounded-full ml-2"></span>أخرى <span className="mr-2 text-white font-bold">١١.٢٪</span></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right Sidebar: Notifications, Activities, Contacts */}
          <div className="w-80 flex flex-col gap-6">
            <div className="bg-gray-900 rounded-2xl p-6 shadow border border-gray-800 mb-2">
              <motion.div className="font-bold text-pink-200 mb-4" initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>الإشعارات</motion.div>
              <ul className="space-y-3">
                {loading ? Array(4).fill(0).map((_,i) => (
                  <li key={i} className="h-6 bg-gray-800 rounded animate-pulse" />
                )) : notifications.map((n, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-pink-100">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span>{n.text}</span>
                    <span className="mr-auto text-xs text-pink-300">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow border border-gray-800 mb-2">
              <motion.div className="font-bold text-purple-200 mb-4" initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.3}}>الأنشطة</motion.div>
              <ul className="space-y-3">
                {loading ? Array(5).fill(0).map((_,i) => (
                  <li key={i} className="h-6 bg-gray-800 rounded animate-pulse" />
                )) : activities.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-purple-100">
                    <img
                      src={a.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover bg-gray-800 border-2 border-pink-400 shadow"
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/profile-image.svg'; }}
                    />
                    <span>{a.text}</span>
                    <span className="mr-auto text-xs text-purple-300">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow border border-gray-800">
              <motion.div className="font-bold text-pink-200 mb-4" initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{delay:0.4}}>جهات الاتصال</motion.div>
              <ul className="space-y-3">
                {loading ? Array(6).fill(0).map((_,i) => (
                  <li key={i} className="h-6 bg-gray-800 rounded animate-pulse" />
                )) : contacts.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-pink-100">
                    <img
                      src={c.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover bg-gray-800 border-2 border-purple-400 shadow"
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/profile-image.svg'; }}
                    />
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
