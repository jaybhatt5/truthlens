/**
 * TruthLens AI - Navigation Bar Component
 * 
 * Features:
 * - Sticky top header with backdrop blur and responsive mobile padding.
 * - Brand logo with live status sentinel indicator.
 * - Quick Search Bar (desktop/tablet) with mobile collapsible dropdown.
 * - API Key Settings button with live status badge.
 * - Horizontal smooth gliding tab navigator with Framer Motion layoutId animations.
 * - Full mobile drawer menu for smaller screens.
 */

import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle, AlertTriangle, Cpu, BarChart3, Search, Camera, Menu, X, ArrowRight, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  /** The currently selected tab ID */
  activeTab: string;

  /** Callback to change the active tab */
  setActiveTab: (tab: string) => void;

  /** Current value of the search query */
  searchQuery: string;

  /** State updater for the search query */
  setSearchQuery: (q: string) => void;

  /** Callback to open the verification modal */
  onOpenVerifyModal: () => void;

  /** Optional callback to verify a claim query directly on form submit */
  onVerifyClaim?: (query: string) => void;

  /** Current configured Gemini API Key */
  apiKey?: string;

  /** Callback to open the API Key settings modal */
  onOpenApiKeyModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenVerifyModal,
  onVerifyClaim,
  apiKey,
  onOpenApiKeyModal,
}) => {
  // Mobile drawer menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile search input toggle state
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Primary navigation tabs list
  const navItems = [
    { id: 'top-news', label: 'Top News', icon: CheckCircle },
    { id: 'news-media', label: 'News Photo & Video AI', icon: Camera },
    { id: 'busted', label: 'Busted News', icon: AlertTriangle },
    { id: 'recent', label: 'Recently Checked', icon: Sparkles },
    { id: 'deepfake', label: 'Deepfake Check', icon: Shield },
    { id: 'ai-analyzer', label: 'AI Content Analyzer', icon: Cpu },
    { id: 'stats', label: 'Dashboard & Stats', icon: BarChart3 },
  ];

  /**
   * Dispatches claim verification query when user presses Enter or clicks 'Verify'
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onVerifyClaim) {
      onVerifyClaim(searchQuery.trim());
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Switches the active tab and automatically closes mobile menu drawer
   */
  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl pt-safe">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabSelect('top-news')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  TruthLens<span className="text-cyan-400">.AI</span>
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                  <span className="hidden xs:inline">Sentinel Active</span>
                  <span className="xs:hidden">Live</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block truncate">AI News Fact-Checker & Deepfake Sentinel</p>
            </div>
          </div>

          {/* Quick Search Bar (Desktop & Tablet) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md relative mx-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Type news or headline to verify (press Enter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-16 py-1.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery.trim() && (
              <button
                type="submit"
                className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
              >
                Verify
              </button>
            )}
          </form>

          {/* Right Action Area */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* API Key Settings Button */}
            {onOpenApiKeyModal && (
              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                  apiKey
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
                title="Configure Google Gemini API Key"
              >
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{apiKey ? 'Gemini 3.7 Active' : 'API Key Setup'}</span>
              </button>
            )}

            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white md:hidden transition-colors"
              aria-label="Toggle mobile search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Verify CTA Button */}
            <button
              onClick={onOpenVerifyModal}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200" />
              <span className="hidden xs:inline">Verify New Claim</span>
              <span className="xs:hidden">Verify</span>
            </button>

            {/* Mobile Drawer Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white lg:hidden transition-colors"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>

        </div>

        {/* Collapsible Mobile Search Bar */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSearchSubmit}
              className="md:hidden pb-3 pt-1 overflow-hidden"
            >
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type claim to verify (press Enter)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-cyan-500/50 rounded-xl pl-9 pr-16 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="absolute right-1.5 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold disabled:opacity-40"
                >
                  Verify
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Navigation Tabs (Desktop & Scrollable Mobile Row with Smooth Gliding Indicator) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60 text-xs sm:text-sm -mx-3 px-3 sm:mx-0 sm:px-0 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabCapsule"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/35 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-[calc(4rem+1px)] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl p-4 space-y-2 max-h-[80vh] overflow-y-auto z-50"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Navigation Menu</span>
              <span className="text-[11px] text-slate-400">Select any verification tool</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabSelect(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{item.label}</p>
                      </div>
                    </div>
                    {isActive && <ArrowRight className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
