/**
 * TruthLens AI - Recently Checked Claims Section
 * 
 * Displays a chronological list of user-submitted claims and verified news stories
 * with real-time multi-dimensional filtering by search query, category, and verdict.
 */

import React, { useState } from 'react';
import { FactCheckItem, ContentCategory, VerdictType } from '../types';
import { Sparkles, Filter, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

interface RecentlyCheckedProps {
  /** All available fact-check items in the feed */
  items: FactCheckItem[];

  /** Callback when user clicks a claim row to open detailed audit modal */
  onSelectItem: (item: FactCheckItem) => void;

  /** Active global search query passed down from App state */
  searchQuery: string;
}

export const RecentlyCheckedSection: React.FC<RecentlyCheckedProps> = ({
  items,
  onSelectItem,
  searchQuery,
}) => {
  // Category dropdown filter ('ALL' | 'Politics' | 'Health & Science' | etc.)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Verdict filter ('ALL' | 'VERIFIED_TRUE' | 'DEBUNKED_FAKE' | 'MISLEADING')
  const [selectedVerdict, setSelectedVerdict] = useState<string>('ALL');

  /**
   * Filtered dataset based on search keywords, selected category, and verdict
   */
  const filteredItems = items.filter((item) => {
    // 1. Search query filter (matches title, claim, or summary)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchClaim = item.claim.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchClaim && !matchSummary) return false;
    }

    // 2. Category filter
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }

    // 3. Verdict filter
    if (selectedVerdict !== 'ALL' && item.verdict !== selectedVerdict) {
      return false;
    }

    return true;
  });


  const getVerdictBadge = (verdict: VerdictType, score: number) => {
    switch (verdict) {
      case 'VERIFIED_TRUE':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> VERIFIED TRUE ({score}%)
          </span>
        );
      case 'DEBUNKED_FAKE':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 shrink-0">
            <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> DEBUNKED FAKE ({score}%)
          </span>
        );
      case 'MISLEADING':
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> MISLEADING ({score}%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold bg-slate-700 text-slate-300 shrink-0">
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> UNVERIFIED
          </span>
        );
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-950/70 backdrop-blur-sm text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-cyan-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Real-Time Feed</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Recently Checked Claims
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Latest news claims, social media mentions, and user submissions verified by TruthLens AI.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <div className="flex items-center gap-1 text-xs text-slate-400 mr-1">
              <Filter className="w-3.5 h-3.5 shrink-0" />
              <span>Filters:</span>
            </div>
            
            {/* Verdict Filter Pill */}
            <select
              value={selectedVerdict}
              onChange={(e) => setSelectedVerdict(e.target.value)}
              className="flex-1 sm:flex-initial bg-slate-900 border border-slate-700 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Verdicts</option>
              <option value="VERIFIED_TRUE">Verified True</option>
              <option value="DEBUNKED_FAKE">Debunked Fake</option>
              <option value="MISLEADING">Misleading</option>
            </select>

            {/* Category Filter Pill */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:flex-initial bg-slate-900 border border-slate-700 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Categories</option>
              <option value="Politics">Politics</option>
              <option value="Health & Science">Health & Science</option>
              <option value="Technology">Technology</option>
              <option value="World News">World News</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        {/* List of Claims */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-400">
            <p className="text-xs sm:text-sm">No claims match your filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-3.5 sm:p-4 md:p-5 transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.verdict === 'DEBUNKED_FAKE'
                          ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'
                          : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-xl object-cover border border-slate-800 shrink-0 hidden xs:block group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                      {getVerdictBadge(item.verdict, item.truthScore)}
                      <span className="text-[10px] sm:text-xs text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-800 shrink-0">
                        {item.category}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400">• {item.timestamp}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right text-xs text-slate-400 min-w-0">
                    <p className="font-medium text-slate-300 text-[11px] sm:text-xs">{item.sources.length} Sources Verified</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[150px] sm:max-w-[180px]">{item.verifiedBy}</p>
                  </div>

                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
