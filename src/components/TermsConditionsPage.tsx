import { useTranslation } from 'react-i18next';
import { ArrowLeft, Scale, Scale as ScaleIcon, AlertCircle, FileText } from 'lucide-react';

interface TermsConditionsPageProps {
  onBack: () => void;
}

export default function TermsConditionsPage({ onBack }: TermsConditionsPageProps) {
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
              <ScaleIcon className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                  الشروط والأحكام
                </span>
              </h1>
              <p className="text-lg text-gray-400 mt-2">آخر تحديث: ديسمبر 2024</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-200 text-sm">
                <strong>تنبيه مهم:</strong> باستخدام موقعنا الإلكتروني وخدماتنا، فإنك توافق على هذه الشروط والأحكام. يرجى قراءتها بعناية.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* Acknowledgment */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              1. الموافقة على الشروط
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                هذه الشروط والأحكام ("الشروط") تحكم استخدامك لموقع Magic Carnation الإلكتروني وخدماتنا. 
                بالوصول إلى واستخدام موقعنا، فإنك توافق على الالتزام بهذه الشروط.
              </p>
              <p className="leading-relaxed">
                إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك عدم استخدام خدماتنا.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-green-400" />
              2. وصف الخدمات
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="mb-3">تقدم Magic Carnation الخدمات التالية:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>إنتاج ونشر محتوى TikTok والتسويق الرقمي</li>
                <li>إدارة حسابات TikTok ومحفظة منشئي المحتوى</li>
                <li>حلول تسويق رقمي متخصصة باللغة العربية</li>
                <li>استشارات عبر الإنترنت وآليات مشاركة الإيرادات</li>
                <li>فرص انضمام للوكالة والمشاركة في البرامج الشريكة</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              3. مسؤوليات المستخدم
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">يجب عليك:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>التقدم بعمر لا يقل عن 18 عاماً</li>
                  <li>الحصول على موافقة الوالدين لمن هم أقل من 18 عام</li>
                  <li>الحصول على موافقة الأوصياء وصكوك التفويض اللازمة</li>
                  <li>إكمال جميع المتطلبات الورقية والاتأمين القانونية</li>
                  <li>قبول جميع الشروط والموافقة على الاتفاقيات القانونية</li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white mb-2">لا يجوز لك:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>انتهاك حقوق الملكية الفكرية</li>
                  <li>نشر محتوى مخالف أو مسيء</li>
                  <li>استخدام المعلومات الشخصية للآخرين دون إذن</li>
                  <li>التحايل على أنظمتنا أو انتهاك الأمان</li>
                  <li>المشاركة في أنشطة غير قانونية أو ضارة</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Property Rights */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-purple-400" />
              4. حقوق الملكية الفكرية
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                جميع المحتويات، بما في ذلك النصوص والرسومات والشعارات والمحتوى المُحرر والمُنسق والصور والتصاميم إضافة إلى تسجيل البيانات والنسخيات، محمية بحقوق النشر والأسرار التجارية وغيرها من قوانين الملكية الفكرية.
              </p>
              <p className="leading-relaxed">
                أي انتهاك لحقوق الملكية الفكرية قد يؤدي إلى اتخاذ إجراءات قانونية من قبلك أو انتهاك القوانين الجاري العمل بها، والتي تشمل القوانين الدولية ذات الصلة بحماية حقوق التأليف والنشر والملكية الفكرية.
              </p>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              5. سياسة الإلغاء والاسترداد
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">حقوق الإلغاء:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>يمكن إلغاء الطلبات خلال 15 يوم من التقديم</li>
                  <li>يجب الاتصال بفريق الدعم لبدء عملية الإلغاء</li>
                  <li>يتم مراجعة كل طلب إلغاء على حدة</li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white mb-2">الاسترداد المالي:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>الخدمات المدفوعة مسبقاً قابلة للاستردادي خلال 30 يوم</li>
                  <li>يتم خصم رسوم إدارية بنسبة 10% من المبلغ المسترد</li>
                  <li>لا يتم استرداد الرسوم المحققة للخدمات المكتملة</li>
                  <li>الدفع مقدماً للعملاء غير مسترد خلال فترة التجربة</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Liability */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              6. حد المسؤولية والتأمين من الخسائر
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed font-semibold text-white mb-3">
                Magic Carnation لا تُعتبر مسؤولة عن أي خسائر تضرر أو أذى أو أي أضرار أخرى قد تنتج عن وجود سوء في الخدمة أو الصيانة أو كسر أو انقطاع أو قصور في الخدمة أو انقطاعاً في الاتصال أو سوء في شبكة الإنترنت أو خطأ أو تأخر أو عثرات أو سوء التشغيل أو أي مسؤوليات أو ضرر يقع على الموقع أو أي متعامل أو مورد أو مسؤول أو شريك.
              </p>
              <p className="leading-relaxed">
                في جميع الأحوال، أي خسارة أو ديون أو وجيبة مستحقة عن أي أساس قانوني، تكون مسؤوليتنا محدودة بمبلغ لا يتجاوز المبلغ المؤدى للخدمة موضوع النزاع، ولن نكون مسؤولين عن أي أضرار غير متوقعة أو خسارة أو ضرر من أي نوع.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-indigos-400" />
              7. القانون الحاكم وتسويتها المنازعات
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                تخضع هذه الشروط والأحكام وتفسر حسب قانون المملكة المغربية، وتُحل أي منازعات أو نزاعات تنشأ بخصوص هذه الشروط أو الخدمات التي نقدمها بالتشاور الودي؛ وفي حال عدم نجاح الحل، يُعرض النزاع على مؤسسات التوفيق والتحكيم الموثوقة في المغرب، بما يتلافى اللجوء للمحاكم كحلّ مبدأي.
              </p>
            </div>
          </section>

          {/* Amendments */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">8. تعديلات الشروط</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                نحتفظ بالحق في تعديل أو تحديث هذه الشروط والأحكام في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر الموقع أو عبر البريد الإلكتروني. واستمرار استخدامك لخدماتنا بعد أي تعديلات يشكل موافقتك على الشروط المحدثة.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">9. تواصل معنا</h2>
            <div className="space-y-4 text-gray-300">
              <p>إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يمكنك التواصل معنا على:</p>
              <div className="mt-4 space-y-2">
                <p><strong>البريد الإلكتروني:</strong> legal@magiccarnations.com</p>
                <p><strong>الهاتف:</strong> +212 655 723 182</p>
                <p><strong>العنوان:</strong> Rabat, Morocco</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
