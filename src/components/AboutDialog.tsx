import React, { useEffect } from 'react';
import { X, Heart, Stethoscope, Sparkles } from 'lucide-react';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  // Add escape key listener to close dialog
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 animate-fade-in">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Dialog content */}
      <div className="relative bg-gradient-glassmorphism backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-md w-full overflow-hidden border border-white/40 animate-zoom-in-95">
        <div className="absolute inset-0 bg-gradient-modern-2 opacity-40"></div>
        <div className="absolute w-[300px] h-[300px] -right-20 -bottom-40 bg-kira-lilac/10 rounded-full filter blur-3xl"></div>
        <div className="absolute w-[200px] h-[200px] -left-20 -top-20 bg-kira-pink/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          {/* Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-main rounded-full p-3 mr-3 shadow-md">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kira-gradient1 to-kira-purple">
              About Kira
            </h2>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            <p className="text-gray-600">
              Kira is an AI-powered symptom analyzer that helps you understand potential health conditions based on your described symptoms.
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-start mb-2">
                <Sparkles className="h-5 w-5 text-kira-gradient3 mr-2 flex-shrink-0" />
                <h3 className="font-medium text-gray-700">How It Works</h3>
              </div>
              <p className="text-sm text-gray-600 pl-7">
                Simply speak into your microphone, describing your symptoms. Our AI will analyze your input and provide potential conditions, recommended specialists, and important health information.
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="flex items-start mb-2">
                <Heart className="h-5 w-5 text-kira-gradient3 mr-2 flex-shrink-0" />
                <h3 className="font-medium text-gray-700">Medical Disclaimer</h3>
              </div>
              <p className="text-sm text-gray-600 pl-7">
                Kira is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
              </p>
            </div>
          </div>
          
          {/* Version */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Kira | Version 1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDialog; 