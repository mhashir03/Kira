import React from 'react';
import { FileText } from 'lucide-react';

interface SymptomCardProps {
  transcript: string;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ transcript }) => {
  if (!transcript) return null;

  return (
    <div className="w-full bg-gradient-glassmorphism backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-white/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-modern-2 opacity-50"></div>
      <div className="absolute w-[200px] h-[200px] -right-20 -bottom-20 bg-kira-pink/10 rounded-full filter blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-start mb-4">
          <div className="bg-gradient-main rounded-full p-2 mr-3 shadow-md">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-kira-gradient1 to-kira-purple">
            Your Described Symptoms
          </h2>
        </div>
        <p className="text-gray-700 pl-3 border-l-2 border-kira-pink/30 ml-2">{transcript}</p>
      </div>
    </div>
  );
};

export default SymptomCard;
