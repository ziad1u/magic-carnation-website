import React from 'react';

interface MobileWelcomeProps {
  onClose: () => void;
}

export default function MobileWelcome({ onClose }: MobileWelcomeProps) {
  console.log('🎉 MobileWelcome component is rendering!');
  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Background with pichome.svg only */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/pichome.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Vertical gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" 
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 80%, rgb(0, 0, 0) 100%)'
        }}
      />

      {/* Centered brand logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{transform: 'translateY(-80px)'}}>
        <div className="flex flex-col items-center relative">
          {/* Background pichome.svg behind logo */}
          <div 
            className="absolute opacity-30"
            style={{
              backgroundImage: 'url(/pichome.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
              zIndex: 1
            }}
          />
          <img
            src="/logo-magic.svg"
            alt="Magic Carnations"
            className="h-48 w-auto drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)] opacity-95 animate-pulse relative z-10"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="mt-6 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Magic Carnations
          </div>
          <div className="mt-3 text-lg text-white/80">
            ماجيك كارنيشنز — سحر التفاصيل
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-20">
        <button
          onClick={onClose}
          className="w-[80%] max-w-xs py-4 rounded-[20px] text-white text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #2B0057 0%, #4A148C 50%, #2B0057 100%)',
            boxShadow: '0 8px 32px rgba(43, 0, 87, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          اكتشف Magic Carnations الآن
        </button>
      </div>
    </div>
  );
}