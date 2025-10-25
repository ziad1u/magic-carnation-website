import { useState } from 'react';
import { Briefcase, Headphones, UserPlus, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InteractiveCTAButtonProps {
  onJobApplication: () => void;
  onLiveModerator: () => void;
  onJoinAgency: () => void;
  onOnlineJoin: () => void;
}

export default function InteractiveCTAButton({ 
  onJobApplication, 
  onLiveModerator, 
  onJoinAgency, 
  onOnlineJoin 
}: InteractiveCTAButtonProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainButtonClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl max-w-md w-full">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{t('choose_your_path')}</h2>
            <p className="text-gray-300">{t('start_journey_magic_carnation')}</p>
          </div>

          {/* Buttons Grid */}
          <div className="space-y-4">
            {/* Job Application */}
            <button
              onClick={() => {
                onJobApplication();
                handleClose();
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 border border-blue-400/30"
            >
              <div className="flex items-center justify-center gap-3">
                <Briefcase className="w-6 h-6" />
                <span className="text-lg">{t('job_application')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            {/* Live Moderator */}
            <button
              onClick={() => {
                onLiveModerator();
                handleClose();
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-purple-400/30"
            >
              <div className="flex items-center justify-center gap-3">
                <Headphones className="w-6 h-6" />
                <span className="text-lg">{t('live_moderator')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            {/* Join Agency - Regular */}
            <button
              onClick={() => {
                onJoinAgency();
                handleClose();
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30"
            >
              <div className="flex items-center justify-center gap-3">
                <UserPlus className="w-6 h-6" />
                <span className="text-lg">{t('join_agency_regular')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            {/* Join Agency - Online */}
            <button
              onClick={() => {
                onOnlineJoin();
                handleClose();
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/30"
            >
              <div className="flex items-center justify-center gap-3">
                <UserPlus className="w-6 h-6" />
                <span className="text-lg">{t('join_agency_online')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">{t('choose_path_suits_you')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleMainButtonClick}
      className="w-[85%] max-w-sm py-5 rounded-2xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
      style={{
        background: 'linear-gradient(135deg, rgb(43, 0, 87) 0%, rgb(74, 20, 140) 50%, rgb(43, 0, 87) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      {t('start_journey_with_us')}
    </button>
  );
}
