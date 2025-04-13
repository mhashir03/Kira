import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ResultCardProps {
  title: string;
  content: string;
  icon: LucideIcon;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, icon: Icon, className }) => {
  return (
    <div className={`bg-gradient-glassmorphism backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/40 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-modern-2 opacity-50"></div>
      <div className="absolute w-[120px] h-[120px] -right-10 -bottom-10 bg-kira-lilac/10 rounded-full filter blur-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-start mb-4">
          <div className="bg-gradient-main rounded-full p-2 mr-3 flex-shrink-0 shadow-md">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-kira-gradient1 to-kira-purple">
            {title}
          </h3>
        </div>
        <p className="text-gray-700 pl-3 border-l-2 border-kira-pink/30 ml-2">{content}</p>
      </div>
    </div>
  );
};

export default ResultCard;
