/**
 * TruthLens AI - Main React Application Component
 * 
 * Architecture Overview:
 * - State Hub: Centralizes live state for fact checks, platform statistics,
 *   active navigation tabs, search queries, API Key configuration, and selected modal items.
 * - Tab Routing: Switches between main feature views:
 *     1. 'top-news'       -> Verified news feed, busted fake news, and recent checks
 *     2. 'news-media'     -> Multimodal OCR News Photo & Video Fact-Checker
 *     3. 'busted'         -> Dedicated Debunked Fake News & Hoaxes section
 *     4. 'recent'         -> Filterable real-time chronological claim feed
 *     5. 'deepfake'       -> 4-Pillar Deepfake & Computer Vision Forensic Suite
 *     6. 'ai-analyzer'    -> NLP Text Forensic Analyzer (Perplexity & Burstiness)
 *     7. 'stats'          -> Platform analytics, category charts, and academic credits
 * - Backend Integration: Communicates with Express server endpoints with custom Gemini API Key support.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FactCheckItem, VerificationStats, DeepfakeAnalysisResult } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TopNewsSection } from './components/TopNewsSection';
import { BustedNewsSection } from './components/BustedNewsSection';
import { RecentlyCheckedSection } from './components/RecentlyCheckedSection';
import { DeepfakeDetector } from './components/DeepfakeDetector';
import { AITextAnalyzer } from './components/AITextAnalyzer';
import { DashboardStats } from './components/DashboardStats';
import { NewsMediaFactChecker } from './components/NewsMediaFactChecker';
import { FactCheckModal } from './components/FactCheckModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation: currently active view tab
  const [activeTab, setActiveTab] = useState<string>('top-news');

  // Search query state bound to top navbar and hero search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User-configured Google Gemini API Key
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('truthlens_gemini_api_key') || '';
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Primary list of fact-check articles (populated from backend API)
  const [factCheckItems, setFactCheckItems] = useState<FactCheckItem[]>([]);

  // Platform performance and accuracy stats
  const [stats, setStats] = useState<VerificationStats>({
    totalClaimsChecked: 14285,
    fakeNewsBusted: 8940,
    deepfakesIntercepted: 3210,
    mediaAuditsCompleted: 4620,
    accuracyRate: 98.6,
    categoriesBreakdown: [
      { category: 'Politics', count: 4200 },
      { category: 'Health & Science', count: 3500 },
      { category: 'World News', count: 2800 },
      { category: 'Technology', count: 2100 },
      { category: 'Finance', count: 1685 }
    ]
  });

  // Modal inspection dialog states
  const [selectedFactCheck, setSelectedFactCheck] = useState<FactCheckItem | null>(null);
  const [selectedDeepfakeResult, setSelectedDeepfakeResult] = useState<DeepfakeAnalysisResult | null>(null);

  // Loading state indicator during AI verification calls
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  /**
   * Initial Data Load:
   * Fetches pre-seeded fact-check feed and platform stats from the Express backend.
   */
  useEffect(() => {
    fetch('/api/feed')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setFactCheckItems(data.items);
        if (data.stats) setStats(data.stats);
      })
      .catch((err) => console.error('Failed to load feed:', err));
  }, []);

  /**
   * Updates stored API key
   */
  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('truthlens_gemini_api_key', newKey);
    } else {
      localStorage.removeItem('truthlens_gemini_api_key');
    }
  };

  /**
   * Handle Direct Claim Verification:
   * Dispatches a user-submitted claim or URL to the backend `/api/fact-check` endpoint.
   */
  const handleVerifyClaim = async (claim: string, url?: string, category?: string) => {
    const query = (claim || url || '').trim();
    if (!query) return;
    setIsAnalyzing(true);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) {
        headers['x-gemini-api-key'] = apiKey;
      }

      const response = await fetch('/api/fact-check', {
        method: 'POST',
        headers,
        body: JSON.stringify({ claim, url, category, apiKey }),
      });

      const data = await response.json();
      if (data.success && data.item) {
        // Prepend new fact-check item to state feed
        setFactCheckItems((prev) => [data.item, ...prev]);
        // Open detailed inspection modal for immediate review
        setSelectedFactCheck(data.item);
        // Increment live platform statistics
        setStats((prev) => ({
          ...prev,
          totalClaimsChecked: prev.totalClaimsChecked + 1,
          fakeNewsBusted: data.item.verdict === 'DEBUNKED_FAKE' ? prev.fakeNewsBusted + 1 : prev.fakeNewsBusted,
        }));
      }
    } catch (err) {
      console.error('Error verifying claim:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Handle quick benchmark sample selection from Hero test tags.
   */
  const handleSelectSample = (sample: string) => {
    setSearchQuery(sample);
    handleVerifyClaim(sample);
  };

  /**
   * Smoothly switches navigation tabs and scrolls viewport to main content section.
   */
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const mainSection = document.getElementById('main-content-section');
      if (mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Sticky Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        apiKey={apiKey}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onVerifyClaim={(query: string) => handleVerifyClaim(query)}
        onOpenVerifyModal={() => {
          handleTabChange('top-news');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Hero Search & Mode Selection Section */}
      <div className="relative z-10">
        <HeroBanner
          onVerify={handleVerifyClaim}
          onSelectSample={handleSelectSample}
          isAnalyzing={isAnalyzing}
          setActiveTab={handleTabChange}
        />
      </div>

      {/* Main Tabbed Views with Smooth Animated Transitions */}
      <main id="main-content-section" className="flex-1 scroll-mt-20 relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
            transition={{
              duration: 0.26,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            {/* Tab 1: Top Verified News & Overview Feed */}
            {activeTab === 'top-news' && (
              <>
                <TopNewsSection items={factCheckItems} onSelectItem={setSelectedFactCheck} />
                <BustedNewsSection items={factCheckItems} onSelectItem={setSelectedFactCheck} />
                <RecentlyCheckedSection items={factCheckItems} onSelectItem={setSelectedFactCheck} searchQuery={searchQuery} />
              </>
            )}

            {/* Tab 2: Multimodal OCR News Photo & Video Verifier */}
            {activeTab === 'news-media' && (
              <NewsMediaFactChecker
                apiKey={apiKey}
                onGenerateReport={setSelectedFactCheck}
              />
            )}

            {/* Tab 3: Debunked Fake News & Viral Hoaxes */}
            {activeTab === 'busted' && (
              <BustedNewsSection items={factCheckItems} onSelectItem={setSelectedFactCheck} />
            )}

            {/* Tab 4: Filterable Chronological Feed */}
            {activeTab === 'recent' && (
              <RecentlyCheckedSection items={factCheckItems} onSelectItem={setSelectedFactCheck} searchQuery={searchQuery} />
            )}

            {/* Tab 5: 4-Pillar Deepfake & Synthetic Media Suite */}
            {activeTab === 'deepfake' && (
              <DeepfakeDetector
                apiKey={apiKey}
                onGenerateReport={(dfResult: DeepfakeAnalysisResult) => {
                  setSelectedDeepfakeResult(dfResult);
                }}
              />
            )}

            {/* Tab 6: AI Text & NLP Forensics */}
            {activeTab === 'ai-analyzer' && (
              <AITextAnalyzer apiKey={apiKey} />
            )}

            {/* Tab 7: Dashboard, Accuracy Stats & Academic Credits */}
            {activeTab === 'stats' && (
              <DashboardStats stats={stats} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modal Dialog for Detailed Audit Certificates & Print/PDF Export */}
      {(selectedFactCheck || selectedDeepfakeResult) && (
        <FactCheckModal
          item={selectedFactCheck}
          deepfakeResult={selectedDeepfakeResult}
          onClose={() => {
            setSelectedFactCheck(null);
            setSelectedDeepfakeResult(null);
          }}
        />
      )}

      {/* Google Gemini API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Application Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}
