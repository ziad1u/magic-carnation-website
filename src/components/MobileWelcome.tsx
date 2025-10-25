import { useTranslation } from 'react-i18next';

interface MobileWelcomeProps {
  onClose: () => void;
  onJoinAgency?: () => void;
}

export default function MobileWelcome({ onClose, onJoinAgency }: MobileWelcomeProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Simple Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/pichome.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Centered brand logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{transform: 'translateY(-60px)'}}>
        <div className="flex flex-col items-center">
          <img
            src="/logo-magic.svg"
            alt="Magic Carnations"
            className="h-48 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          
          {/* Brand text */}
          <div className="mt-4 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Magic Carnations
          </div>
          
          {/* Arabic tagline */}
          <div className="mt-3 text-xl text-white/90 font-medium">
            {t('magic_carnations_details')}
          </div>
          
          {/* Subtitle */}
          <div className="mt-2 text-base text-white/70">
            {t('leading_agency_creative_content')}
          </div>
        </div>
      </div>

      {/* Simple Get Started Button */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-12">
        <button
          onClick={() => {
            if (onJoinAgency) {
              onJoinAgency();
            } else {
              onClose();
            }
          }}
          className="w-[85%] max-w-sm py-5 rounded-2xl text-white text-lg font-semibold"
          style={{
            background: 'linear-gradient(135deg, #2B0057 0%, #4A148C 50%, #2B0057 100%)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          ابدأ رحلتك معنا
        </button>
      </div>

    </div>
  );
}
