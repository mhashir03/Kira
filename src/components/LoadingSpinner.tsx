import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Analyzing symptoms with AI..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center my-10 space-y-5">
      <div className="relative">
        <div className="absolute -inset-8 rounded-full animate-pulse bg-gradient-mesh opacity-40"></div>
        <div className="absolute -inset-4 bg-kira-gradient3/20 rounded-full blur-md"></div>
        <div className="relative animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-kira-gradient3 border-b-kira-gradient4 shadow-xl"></div>
        <div className="absolute inset-0 rounded-full border border-white/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-glassmorphism backdrop-blur-md"></div>
      </div>
      <p className="text-gray-600 text-center font-medium bg-clip-text text-transparent bg-gradient-to-r from-kira-gradient1 to-kira-purple drop-shadow-sm text-lg">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner; 