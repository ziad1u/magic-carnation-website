import React, { useState } from 'react';
import { Briefcase, UserPlus, Headphones, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: '/step-growth.png',
    title: 'ابدأ عاداتك الناجحة',
    desc: 'مع Magic Carnation، ساعدك في بناء عادات إيجابية وتطوير نفسك على تيك توك.',
  },
  {
    image: '/chart-presenter.png',
    title: 'انضم لمجتمع المبدعين',
    desc: 'تواصل مع صناع محتوى آخرين، وشارك التحديات والنجاحات مع فريقنا الاحترافي.',
  },
  {
    image: '/onboarding3.png',
    title: 'تابع تقدمك وحقق أهدافك',
    desc: 'نمنحك الأدوات والمتابعة لتطوير حسابك وتحقيق الانتشار على تيك توك.',
  },
];

type OnboardingAction = 'job-application' | 'join-agency' | 'live-moderator';

export default function MobileOnboarding({ onClose, onAction }: { onClose?: () => void, onAction?: (action: OnboardingAction) => void }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const handleAction = (action: OnboardingAction) => {
    if (onAction) onAction(action);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white px-4 py-8 sm:hidden overflow-hidden">
      {/* صورة الشريحة */}
      <div className="w-full flex justify-center mb-6">
        <img src={slides[current].image} alt="onboarding" className="rounded-3xl shadow-xl max-w-xs w-full object-cover" style={{height: 340}} />
      </div>
      {/* العنوان والنص */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 drop-shadow-lg">{slides[current].title}</h1>
        <p className="text-base text-white/80 max-w-xs mx-auto">{slides[current].desc}</p>
      </div>
      {/* أزرار رئيسية للوكالة */}
      <div className="w-full max-w-xs mx-auto flex flex-col gap-3 mb-6">
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-base hover:from-blue-600 hover:to-purple-700 transition"
          onClick={() => handleAction('job-application')}
        >
          <Briefcase className="w-5 h-5" /> طلب عمل
        </button>
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-base hover:from-pink-600 hover:to-purple-700 transition"
          onClick={() => handleAction('join-agency')}
        >
          <UserPlus className="w-5 h-5" /> انضم للوكالة
        </button>
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-base hover:from-purple-600 hover:to-pink-700 transition"
          onClick={() => handleAction('live-moderator')}
        >
          <Headphones className="w-5 h-5" /> مشرف لايف
        </button>
      </div>
      {/* زر دخول للموقع */}
      <button
        className="w-full max-w-xs mx-auto mb-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-base hover:from-purple-700 hover:to-pink-600 transition"
        onClick={onClose}
      >
        <ArrowRight className="w-5 h-5" /> دخول للموقع
      </button>
      {/* مؤشر الشرائح */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setCurrent(i)}
            aria-label={`انتقل إلى الشريحة ${i+1}`}
          />
        ))}
      </div>
      {/* أزرار تنقل */}
      <div className="flex justify-between w-full max-w-xs mx-auto">
        <button onClick={prev} className="text-white/70 text-2xl px-4">‹</button>
        <button onClick={next} className="text-white/70 text-2xl px-4">›</button>
      </div>
      {/* الشروط */}
      <p className="text-xs text-white/70 mt-6">بدخولك أنت توافق على <a href="#" className="underline">الشروط وسياسة الخصوصية</a></p>
    </div>
  );
} 