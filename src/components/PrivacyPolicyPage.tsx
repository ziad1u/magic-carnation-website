import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  const { t } = useTranslation();

  return (
    <div dir={t('direction')} className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('back')}</span>
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent">
                  سياسة الخصوصية
                </span>
              </h1>
              <p className="text-lg text-gray-400 mt-2">آخر تحديث: ديسمبر 2024</p>
            </div>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              1. مقدمة
            </h2>
            <p className="text-gray-300 leading-relaxed">
              نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. تحدد سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية لك عندما تستخدم موقعنا الإلكتروني وخدماتنا.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400" />
              2. المعلومات التي نجمعها
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">المعلومات الشخصية:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>الاسم الكامل</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>تاريخ الميلاد والعمر</li>
                  <li>الجنس</li>
                  <li>السيرة الذاتية (عند التقدم للوظائف)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">معلومات الاستخدام:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>بيانات الاستخدام والتفاعل مع الموقع</li>
                  <li>عنوان IP ومعلومات الجهاز</li>
                  <li>ملفات تعريف الارتباط (Cookies)</li>
                  <li>سجل الزيارات</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-400" />
              3. كيفية استخدام المعلومات
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">نستخدم المعلومات المجمعة للأسباب التالية:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>تقديم وتحسين خدماتنا</li>
                <li>معالجة طلبات العمل والانضمام للوكالة</li>
                <li>تواصل فعال مع العملاء والمرشحين</li>
                <li>إرسال التحديثات والإعلانات الجديدة</li>
                <li>تحليل الأداء وتطوير الموقع</li>
                <li>الامتثال للقوانين والتشريعات</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-400" />
              4. حماية المعلومات
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">نؤمن حماية معلوماتك الشخصية من خلال:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>استخدام تشفير SSL لجميع البيانات المنقولة</li>
                <li>حماية خوادمنا بجدران الحماية</li>
                <li>تحديث البرامج والأمان بانتظام</li>
                <li>الوصول المحدود للموظفين المصرح لهم</li>
                <li>نسخ احتياطية منتظمة وآمنة</li>
                <li>مراقبة دائمة لضمان الأمان</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-yellow-400" />
              5. مشاركة المعلومات
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">نحن لا نبيع أو نؤجر معلوماتك الشخصية. قد نشارك معلوماتك في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>بموافقتك الصريحة</li>
                <li>للمعاونين والشركاء الموثوقين فقط</li>
                <li>للتمشي مع القوانين والمحاكم</li>
                <li>لحماية حقوقنا أو سلامة المستخدمين</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-pink-400" />
              6. ملفات تعريف الارتباط (Cookies)
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">نستخدم ملفات تعريف الارتباط لـ:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>تحسين تجربة التصفح</li>
                <li>تحليل استخدام الموقع</li>
                <li>تذكر تفضيلاتك</li>
                <li>تقديم إعلانات مستهدفة</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                يمكنك إدارة ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              7. حقوقك
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح الأخطاء في بياناتك</li>
                <li>حذف حسابك ومعلوماتك</li>
                <li>الاعتراض على معالجة بياناتك</li>
                <li>نقل بياناتك إلى خدمة أخرى</li>
                <li>سحب الموافقة في أي وقت</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-gray being-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">8. تواصل معنا</h2>
            <div className="space-y-4 text-gray-300">
              <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا على:</p>
              <div className="mt-4 space-y-2">
                <p><strong>البريد الإلكتروني:</strong> privacy@magiccarnations.com</p>
                <p><strong>الهاتف:</strong> +212 655 723 182</p>
                <p><strong>الموقع:</strong> Rabat, Morocco</p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">9. تحديثات سياسة الخصوصية</h2>
            <div className="text-gray-300">
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. وسنقوم بإعلان أي تغييرات مهمة عبر الموقع أو عبر البريد الإلكتروني.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
