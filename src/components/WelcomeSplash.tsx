import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type WelcomeSplashProps = {
  onFinish: () => void;
  durationMs?: number;
};

export default function WelcomeSplash({ onFinish, durationMs = 2000 }: WelcomeSplashProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    const visibilityTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, durationMs / 50);

    // Main timer
    const timerId = window.setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Allow exit animation to complete
    }, durationMs);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(timerId);
      clearInterval(progressInterval);
    };
  }, [onFinish, durationMs]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-label="Welcome"
      aria-modal="true"
    >
      {/* Enhanced Background with animated overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: 'url(/pichome.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            transform: isVisible ? 'scale(1)' : 'scale(1.1)'
          }}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30 animate-pulse" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content with enhanced animations */}
      <div className={`flex flex-col items-center relative z-10 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Logo with enhanced glow effect */}
        <div className="relative mb-6">
          {/* Glowing background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-pink-400/30 blur-2xl animate-pulse" />
          
          <img
            src="/logo-magic.svg"
            alt="Magic Carnation Logo"
            className={`relative w-32 h-32 sm:w-36 sm:h-36 transition-all duration-1000 ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            onLoad={() => setLogoLoaded(true)}
          />
          
          {/* Rotating ring */}
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Enhanced brand text */}
        <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          Magic Carnations
        </div>
        
        {/* Enhanced Arabic tagline */}
        <div className={`mt-3 text-lg sm:text-xl text-white/90 font-medium transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          {t('magic_carnations_slogan')}
        </div>
        
        {/* Subtitle */}
        <div className={`mt-2 text-sm sm:text-base text-white/70 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          {t('leading_tiktok_agency_region')}
        </div>

        {/* Loading progress bar */}
        <div className={`mt-8 w-48 h-1 bg-white/20 rounded-full overflow-hidden transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <div className={`mt-3 text-xs text-white/60 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          جاري التحميل...
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-purple-400/30 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-pink-400/30 animate-pulse" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-purple-400/30 animate-pulse" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-pink-400/30 animate-pulse" />
    </div>
  );
}


