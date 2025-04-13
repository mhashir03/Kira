import React, { useState } from 'react';
import { Stethoscope, Info } from 'lucide-react';
import AboutDialog from './AboutDialog';

const Header: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 relative z-20">
      <div className="absolute inset-0 bg-gradient-main opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">
          <Stethoscope className="h-7 w-7 text-white drop-shadow-md" />
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">Kira</h1>
        </div>

        <button
          onClick={() => setIsAboutOpen(true)}
          className="flex items-center space-x-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur-md shadow-md border border-white/20 transition-all hover:bg-white/25 hover:scale-105"
          aria-label="About Kira"
        >
          <Info className="h-5 w-5 text-white" />
          <span className="text-white text-sm font-medium">About</span>
        </button>
      </div>

      {/* About Dialog */}
      <AboutDialog isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </header>
  );
};

export default Header;
