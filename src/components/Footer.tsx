/**
 * TruthLens AI - Application Footer Component
 * 
 * Contains brand metadata, platform mission statement, and academic developer credits
 * (Thakar Dhaval & Bhatt Jay, BCA Semester 3, Shree Swaminarayan College of Computer Science).
 */

import React from 'react';
import { Shield, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-6 sm:py-8 px-3 sm:px-6 lg:px-8 pb-safe">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        
        {/* Brand & Platform Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-left">
            <p className="font-bold text-white text-xs sm:text-sm">TruthLens AI</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500">AI-Powered News Fact Checker & Deepfake Detection Platform</p>
          </div>
        </div>

        {/* Academic Project Credits */}
        <div className="text-center md:text-right space-y-0.5 sm:space-y-1">
          <p className="text-slate-300 font-semibold text-xs">
            Developed by <span className="text-cyan-400">Thakar Dhaval</span> & <span className="text-cyan-400">Bhatt Jay</span>
          </p>
          <p className="text-slate-500 text-[10px] sm:text-[11px]">
            BCA Semester 3 • Shree Swaminarayan College of Computer Science
          </p>
        </div>

      </div>
    </footer>
  );
};

