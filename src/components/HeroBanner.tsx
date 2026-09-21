/**
 * TruthLens AI - Hero Banner Component
 * 
 * Features:
 * - Scoped radial-gradient cursor spotlight tracking bounded strictly to the hero container.
 * - Multi-mode switcher (News Claim, Article URL, News Photo/Video, Deepfake Media, AI Text).
 * - Verification submission form with category dropdown filter.
 * - Interactive benchmark test sample chips (Verified, Debunked, Science, Deepfake).
 */

import React, { useState, useRef } from 'react';
import { Search, Sparkles, Link as LinkIcon, FileText, Image as ImageIcon, Bot, ArrowRight, CheckCircle2, ShieldAlert, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroBannerProps {
  /** Callback to trigger claim or URL verification */
  onVerify: (claim: string, url?: string, category?: string) => void;

  /** Callback when user selects one of the pre-configured sample queries */
  onSelectSample: (sample: string) => void;

  /** Boolean indicating whether an active AI verification is processing */
  isAnalyzing: boolean;

  /** Callback to switch navigation tabs */
  setActiveTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onVerify,
  onSelectSample,
  isAnalyzing,
  setActiveTab,
}) => {
  // Input fields state
  const [claimInput, setClaimInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [mode, setMode] = useState<'claim' | 'url' | 'deepfake' | 'aitext' | 'newsmedia'>('claim');

  // Local cursor spotlight tracking strictly bounded within the Hero section
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 400, y: 150 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  /**
   * Tracks cursor position relative to the hero section bounding box
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  /**
   * Handles submission of the fact-check form based on active mode
   */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'claim' && claimInput.trim()) {
      onVerify(claimInput.trim(), undefined, selectedCategory);
    } else if (mode === 'url' && urlInput.trim()) {
      onVerify(claimInput.trim() || 'Link content verification', urlInput.trim(), selectedCategory);
    }
  };

  // Quick benchmark sample claims for fast user testing
  const sampleClaims = [
    { label: 'WHO announces global mandatory digital health passports in 2026', type: 'Debunked' },
    { label: 'NASA Webb telescope discovers alien megastructure around Tabby Star', type: 'Science' },
    { label: 'Viral video shows President declaring national cryptocurrency reserve', type: 'Deepfake' },
    { label: 'Global renewable energy output hit record 30% milestone', type: 'Verified' },
  ];

  // Mode configuration options with target tabs
  const modeButtons = [
    { id: 'claim' as const, label: 'Check News Claim', icon: FileText, tab: 'top-news' },
    { id: 'url' as const, label: 'Article / Link Fact Check', icon: LinkIcon, tab: 'top-news' },
    { id: 'newsmedia' as const, label: 'News Photo/Video Fact-Check', icon: Camera, tab: 'news-media' },
    { id: 'deepfake' as const, label: 'Deepfake Image/Video Check', icon: ImageIcon, tab: 'deepfake' },
    { id: 'aitext' as const, label: 'AI Text Detection', icon: Bot, tab: 'ai-analyzer' },
  ];


  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-slate-950 text-slate-100 py-10 sm:py-16 md:py-20 border-b border-slate-800"
    >
      {/* 1. Scoped Blue Light Hover Spotlight - Limited strictly to top Hero area */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          background: isHovering
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.20), rgba(59, 130, 246, 0.09) 35%, rgba(99, 102, 241, 0.02) 65%, transparent 75%)`
            : `radial-gradient(650px circle at 50% 40%, rgba(6, 182, 212, 0.12), rgba(59, 130, 246, 0.05) 40%, transparent 70%)`,
        }}
      />

      {/* 2. Geometric Dot Matrix - Illuminated within Hero section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.25) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          maskImage: isHovering
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 80%)`
            : 'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: isHovering
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 80%)`
            : 'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* 3. Soft Ambient Static Orbs */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-cyan-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow shrink-0" />
          <span>Next-Gen Truth Verification & Deepfake Intelligence</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15] sm:leading-tight">
          Verify Any News, Claim, or Deepfake with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Precision
          </span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed font-normal">
          Instant fact-checking powered by live search grounding, AI text forensics, video/audio deepfake detection, and automated social bot replies.
        </p>

        {/* Mode Switcher with Smooth Gliding Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 mb-4">
          {modeButtons.map((btn) => {
            const Icon = btn.icon;
            const isSelected = mode === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  setMode(btn.id);
                  if (btn.tab !== 'top-news' || btn.id === 'claim') {
                    setActiveTab(btn.tab);
                  }
                }}
                className={`relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors active:scale-95 ${
                  isSelected
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="heroModeIndicator"
                    className="absolute inset-0 bg-cyan-500 rounded-xl shadow-lg shadow-cyan-500/25"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 relative z-10 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
                <span className="relative z-10">{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto bg-slate-900/90 p-2.5 sm:p-4 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            
            {mode === 'url' ? (
              <div className="relative flex-1 min-w-0">
                <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="Paste news article URL (e.g. https://news.example.com/article)..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            ) : (
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type news headline or claim to verify (e.g. 'NASA found water on Mars')..."
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 text-slate-200 border border-slate-700 rounded-xl px-3 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 shrink-0"
            >
              <option value="General">All Categories</option>
              <option value="Politics">Politics</option>
              <option value="Health & Science">Health & Science</option>
              <option value="Technology">Technology</option>
              <option value="World News">World News</option>
              <option value="Finance">Finance</option>
            </select>

            {/* Analyze CTA */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shrink-0 whitespace-nowrap"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>Analyzing Ground Truth...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Verify Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Sample Prompts */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Quick Test Samples:</span>
          {sampleClaims.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setClaimInput(sample.label);
                onSelectSample(sample.label);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5 active:scale-95"
            >
              {sample.type === 'Verified' && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
              {sample.type === 'Debunked' && <ShieldAlert className="w-3 h-3 text-red-400 shrink-0" />}
              {sample.type === 'Deepfake' && <ImageIcon className="w-3 h-3 text-amber-400 shrink-0" />}
              <span className="truncate max-w-[160px] sm:max-w-none">{sample.label}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
