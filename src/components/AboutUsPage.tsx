import { useTranslation } from 'react-i18next';
import { ArrowLeft, Users, Target, Award, TrendingUp, Globe, Star, Heart, Play, Video } from 'lucide-react';

interface AboutUsPageProps {
  onBack: () => void;
}

export default function AboutUsPage({ onBack }: AboutUsPageProps) {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: t('fahd'),
      role: t('creative_director'),
      specialty: t('creative_strategy'),
      avatar: '/avatars/fahd.jpg',
      description: 'خبير في استراتيجيات المحتوى والإبداع'
    },
    {
      name: t('amine'),
      role: t('video_editor'),
      specialty: t('video_production'),
      avatar: '/avatars/amine.jpg',
      description: 'متخصص في إنتاج وتحرير الفيديو'
    },
    {
      name: t('ziad'),
      role: t('photographer_programmer'),
      specialty: t('photography_web_development'),
      avatar: '/avatars/ziad.jpg',
      description: 'خبير في التصوير وتطوير المواقع'
    },
    {
      name: t('karim'),
      role: t('marketing_manager'),
      specialty: t('advertising_campaigns'),
      avatar: '/avatars/karim.jpg',
      description: 'متخصص في الحملات الإعلانية'
    }
  ];

  const achievements = [
    {
      icon: TrendingUp,
      number: '1000+',
      label: t('produced_video'),
      color: 'text-purple-400'
    },
    {
      icon: Users,
      number: '500+',
      label: t('happy_follower'),
      color: 'text-green-400'
    },
    {
      icon: Target,
      number: '40+',
      label: t('join_campaign'),
      color: 'text-blue-400'
    },
    {
      icon: Award,
      number: '15+',
      label: t('trusted_partnership'),
      color: 'text-yellow-400'
    }
  ];

  return (
    <div dir={t('direction')} className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-8 justify-start"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('back')}</span>
          </button>
          
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                🪄 Magic Carnation
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              وكالة تيك توك الرائدة في صناعة النجوم
            </p>
          </div>
        </div>

        {/* Who we are - Simplified */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">1. من نحن (Who we are)</h2>
            <p className="text-gray-300 text-lg">قسم تعريفي عن الوكالة</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">Magic Carnation</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                نحن شركاء TikTok الرسميون، تأسست شركتنا عام 2023 في طنجة – المغرب، بهدف تمكين صُنّاع المحتوى من إطلاق كامل إمكاناتهم الإبداعية.
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                نعمل على اكتشاف، تطوير، وصناعة نجوم الغد من خلال دعم المواهب الشابة وتحويلها إلى محترفين في إنتاج المحتوى الإبداعي والجذاب.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                بفريقنا المتخصص وشراكاتنا الاستراتيجية، نسعى إلى أن نكون الوكالة الرائدة في مجال الترفيه وصناعة المحتوى في منطقة الشرق الأوسط وشمال إفريقيا، واضعين الابتكار والجودة في صميم كل ما نقوم به.
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                نحن شركاء TikTok الرسميون، تأسست شركتنا عام 2023 في طنجة – المغرب، بهدف تمكين صُنّاع المحتوى من إطلاق كامل إمكاناتهم الإبداعية.
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                نعمل على اكتشاف، تطوير، وصناعة نجوم الغد من خلال دعم المواهب الشابة وتحويلها إلى محترفين في إنتاج المحتوى الإبداعي والجذاب.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                بفريقنا المتخصص وشراكاتنا الاستراتيجية، نسعى إلى أن نكون الوكالة الرائدة في مجال الترفيه وصناعة المحتوى في منطقة الشرق الأوسط وشمال إفريقيا، واضعين الابتكار والجودة في صميم كل ما نقوم به.
              </p>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm text-center">
                EN: We are Magic Carnation - specialized agency in creating TikTok stars and building impactful digital identities. 
                Our team of creative professionals provides comprehensive solutions for content production, management, analytics, and promotion.
              </p>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">عن Magic Carnation</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  في Magic Carnation، نُقدم خدمات محترفة عالية الجودة للشركات والأفراد في المغرب والشرق الأوسط، 
                  متخصصين بشكل كامل في إنتاج المحتوى التسويقي على TikTok الذي يحقق أعلى معدلات التفاعل والمشاهدات.
                </p>
                <p>
                  فريقنا خبير في صياغة استراتيجيات المحتوى والإبداع الفني ومنتوجٍ مرئيٍّ يجذب جمهورك المستهدف ويحفز على التفاعل والتحول للمبيعات، 
                  مع التركيز على الابتكار والجودة والتعلق بالبيئة الرقمية العربية.
                </p>
                <p>
                  نُقدم حلولاً شاملة لإنتاج وإدارة ورشة عمل TikTok، وتطوير حملات التسويق الرقمي وإدارة الحقبة الاجتماعية، 
                  بالإضافة للاستشارات المجانية التي تعكس خبراتنا العميقة في السوق المحلي والإقليمي.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/hero-image.jpg" 
                alt="Magic Carnation Team" 
                className="rounded-2xl w-full h-auto shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-sm rounded-lg p-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">مهمتنا</h3>
              <p className="text-gray-300">
                نخطيط لإنتاج المحتوى التسويقي الأكثر كفاءة لفعالية TikTok في المنطقة، وتقديم خدمة متميزة لعملائنا لإنجاز أفضل النتائج والإنجازات المطلوبة.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">قيمنا</h3>
              <p className="text-gray-300">
                الجودة والإبداع والشفافية والتطوير المتواصل، نحن ملتزمون بتحقيق أفضل النتائج لعملائنا والنجاح المستدام في عالم المحتوى الرقمي المتنامي.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">رؤيتنا</h3>
              <p className="text-gray-300">
                أن نُصبح الوكالة الرائدة في الشرق الأوسط لإنتاج المحتوى التسويقي المبدع والخارج لـ TikTok، والإبداع والتنوع مع التركيز على السوق العربي والناطق بالعربية.
              </p>
            </div>
          </div>
        </section>

        {/* Presentation - Simplified */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">→ Presentation</h2>
            <p className="text-gray-300 text-lg">يشمل:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* صور من أعمالنا */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-white mb-4">صور من أعمالنا</h3>
              <p className="text-gray-400 text-sm mb-4">لقطات من الحملات والمشاريع البارزة</p>
              <div className="grid grid-cols-2 gap-3">
                {['/video-thumbnail-1.jpg','/video-thumbnail-2.jpg','/video-thumbnail-3.jpg','/video-thumbnail-4.jpg'].map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-800">
                    <img src={src} alt={`work ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* فيديوهات تعريفية */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-white mb-4">فيديوهات تعريفية</h3>
              <p className="text-gray-400 text-sm mb-4">نبذة عن خدماتنا وقصص نجاح مختصرة</p>
              <div className="space-y-3">
                {[
                  { title: 'عن وكالتنا', desc: 'تعرف على Magic Carnation' },
                  { title: 'قصص نجاح', desc: 'منشئون حققوا أحلامهم' }
                ].map((video, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl border border-gray-800">
                    <img src={`/video-thumbnail-${i+1}.jpg`} alt={video.title} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs">
                        <Play className="w-3 h-3 inline ml-1" />
                        مشاهدة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* حسابات الممثلين والبثوث */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-white mb-4">حسابات الممثلين والبثوث</h3>
              <p className="text-gray-400 text-sm mb-4">نماذج لحسابات منشئينا وشركائنا</p>
              <div className="space-y-3">
                {[
                  { name: 'Mariam Al-Zahra', handle: '@mariam_live', followers: '2.5M' },
                  { name: 'Yassin Creative', handle: '@yassin_creator', followers: '1.8M' },
                  { name: 'Noura Streams', handle: '@noura_streams', followers: '3.2M' }
                ].map((acc, i) => (
                  <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-3">
                    <div className="font-semibold text-white text-sm">{acc.name}</div>
                    <div className="text-xs text-gray-400">{acc.handle}</div>
                    <div className="text-xs text-pink-400">{acc.followers} متابع</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What we do - Simplified */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">2. ماذا نفعل (What we do)</h2>
            <div className="text-gray-300 text-lg space-y-2">
              <p className="text-2xl font-bold text-pink-400">نصنع نجوم الغد ✨</p>
              <p>نقدم أفضل فريق لمساعدتك في:</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'إدارة الحسابات', 
                desc: 'استراتيجية شاملة، نشر محتوى، جدولة ذكية، ومتابعة أداء مستمرة',
                icon: Target,
                color: 'from-blue-500/20 to-cyan-500/20',
                iconColor: 'text-blue-400'
              },
              { 
                title: 'إدارة الفيديوهات', 
                desc: 'كتابة سكريبت احترافي، تصوير عالي الجودة، مونتاج متقن، وتحسين للجمهور',
                icon: Video,
                color: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400'
              },
              { 
                title: 'الترويج والمواد', 
                desc: 'مواد دعائية احترافية، دعم غير محدود، أفضل المعدات، وبيئة عمل مريحة',
                icon: TrendingUp,
                color: 'from-green-500/20 to-emerald-500/20',
                iconColor: 'text-green-400'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${item.color}`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join us - Simplified */}
        <section className="mb-20" id="join-us">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">3. انضم إلينا (Join us)</h2>
            <div className="text-gray-300 text-lg space-y-2">
              <p className="text-xl font-bold text-pink-400">انضم إلينا الآن وابدأ رحلتك نحو النجومية!</p>
              <p>يمكنك الانضمام أونلاين أو أوفلاين</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-white mb-4">انضم أونلاين</h3>
              <p className="text-gray-300 mb-6">املأ النموذج وسنتواصل معك خلال 24 ساعة</p>
              <a
                href="/#join-agency"
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <Users className="w-5 h-5 ml-2" />
                انضم أونلاين الآن
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-white mb-4">انضم أوفلاين</h3>
              <p className="text-gray-300 mb-6">تواصل معنا مباشرة للحصول على استشارة شخصية</p>
              <a
                href="https://wa.me/212655723182"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                <Heart className="w-5 h-5 ml-2" />
                تواصل عبر WhatsApp
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">📱 للتواصل والمزيد من المعلومات</h3>
              <p className="text-gray-300 mb-4">عبر WhatsApp</p>
              <p className="text-gray-400 text-sm mb-6">EN: For inquiries and more information via WhatsApp</p>
              
              <a 
                href="https://wa.me/212655723182"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                <Heart className="w-6 h-6 ml-2" />
                تواصل عبر WhatsApp
              </a>
              
              <div className="mt-4">
                <p className="text-gray-400 text-sm">رقم التواصل: +212 655 723 182</p>
                <p className="text-gray-500 text-xs">wa.me/212655723182</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">إنجازاتنا</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900/90 to-black/70 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-800">
                  <achievement.icon className={`w-10 h-10 ${achievement.color}`} />
                </div>
                <div className={`text-3xl font-bold ${achievement.color} mb-2`}>
                  {achievement.number}
                </div>
                <div className="text-gray-300 text-sm">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">فريقنا المبدع</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نخبة من المبدعين والموهوبين في عالم الإعلام الرقمي، يتواجدون في المغرب والشرق الأوسط 
              لتقديم خدمات محترفة ومتطورة لعملائنا الأعزاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-600/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-12 h-12 text-pink-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-3">
                    <span className="text-pink-400 font-medium">{member.role}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{member.specialty}</p>
                  <p className="text-gray-500 text-xs">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">لماذا تختارنا؟</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نقدم قيمة حقيقية وإبداع لا محدود لضمان نجاح مشروعك في عالم TikTok والتسويق الرقمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'خبرة محلية وإقليمية',
                description: 'فريقنا ولّد سنوات خبرة عميقة في السوق العربي والمغربي، ومعرفة وثيقة بثقافة وميول الجمهور المستهدف.',
                color: 'border-red-500/20 hover:border-red-500/50',
                iconColor: 'text-red-400'
              },
              {
                title: 'استراتيجيات مدروسة',
                description: 'نطوّر تحليلاً مدققاً لبحث الجمهور وجهاز الأداء لتحقيق أفضل النتائج والمخرجات المربحة والمبينة.',
                color: 'border-blue-500/20 hover:border-blue-500/50',
                iconColor: 'text-blue-400'
              },
              {
                title: 'نصًى محترفاً وعالي الجودة',
                description: 'نعامل الاهتم بأحدث التقنيات والمناهج المستخدمة لضمان تقديم محتوىً مبدعٍ ومبتكرٍ يُميّزك عن المُنافسين.',
                color: 'border-blue-500/20 hover:border-blue-500/50',
                iconColor: 'text-blue-400'
              },
              {
                title: 'خدمة عملاء متفوقة',
                description: 'نُوفر فريقًا متكاملًا للدعم مُتاحًا طوال وقت العمل لتلبية استفساراتك وحل أي تحدٍ بسرعة ودقة.',
                color: 'border-green-500/20 hover:border-green-500/50',
                iconColor: 'text-green-400'
              },
              {
                title: 'تقارير وإحصائيات مفصلة',
                description: 'نقدم تحليلاً مفصلاً عن أداء الحملات والمحتوى وإحصائيات دقيقة لقياس العائد وإصدار قرارات البيانات المدروسة.',
                color: 'border-yellow-500/20 hover:border-yellow-500/50',
                iconColor: 'text-yellow-400'
              },
              {
                title: 'أسعار منافسة وقيمة عالية',
                description: 'نُقدم خدمات بمقاييس متوسطة القيمة وبسعر منافس مع تحقيق أقصى قيمة مُضافة استثمارك والعائد المرتجي منه.',
                color: 'border-purple-500/20 hover:border-purple-500/50',
                iconColor: 'text-purple-400'
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-6 rounded-2xl border ${feature.color} transition-all duration-300`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 from-${feature.iconColor.split('-')[1]}-500/20`}>
                  <Star className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-gray-900/90 to-black/70 backdrop-blur-sm p-12 rounded-2xl border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-4">هل أنت مستعد للبدء؟</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              تواصل معنا اليوم وأخبرنا عن مشروعك، وسنساعدك في إنتاح محتوى مؤثر يجذب انتباه جمهورك ويحقق أهدافك الرائدة.
            </p>
            <a 
              href="https://wa.me/212655723182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <Star className="w-6 h-6" />
              بدء مشروعك الآن
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
