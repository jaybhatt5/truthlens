/**
 * TruthLens AI - Top Verified News Section
 * 
 * Displays fact-checked news claims that have been authenticated by primary records,
 * official press releases, and peer-reviewed journals with Truth Scores >= 70%.
 */

import React from 'react';
import { FactCheckItem } from '../types';
import { CheckCircle2, ShieldCheck, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';

interface TopNewsProps {
  /** Array of all fact check items in feed */
  items: FactCheckItem[];

  /** Callback when user clicks on a news card to open detailed verification certificate */
  onSelectItem: (item: FactCheckItem) => void;
}

export const TopNewsSection: React.FC<TopNewsProps> = ({ items, onSelectItem }) => {
  // Filter for authenticated stories with high truth scores
  const verifiedNews = items.filter(item => item.verdict === 'VERIFIED_TRUE' || item.truthScore >= 70);

  return (
    <section className="py-8 sm:py-12 bg-slate-950/70 backdrop-blur-sm text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Fact-Checked & Authenticated</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Top Verified News
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              News claims that have undergone cross-referencing and received high Truth Scores.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 self-start sm:self-auto shrink-0">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>{verifiedNews.length} Verified Stories Live</span>
          </div>
        </div>

        {/* Grid of Verified Items */}
        {verifiedNews.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-xs sm:text-sm">No verified news currently listed. Use the top search bar to check a new claim!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {verifiedNews.map((item) => (

              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Header */}
                  {item.imageUrl && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-slate-950 font-bold text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>Truth Score: {item.truthScore}%</span>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-1 rounded-lg border border-slate-700">
                        {item.category}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 mb-2">
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">VERIFIED TRUE</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Key Findings snippet */}
                    <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-1.5">Verified Highlights:</p>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {item.keyFindings.slice(0, 2).map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0">•</span>
                            <span className="line-clamp-1">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer details */}
                <div className="px-4 sm:px-5 py-3 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 min-w-0 pr-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate max-w-[140px] sm:max-w-[180px]">{item.verifiedBy}</span>
                  </div>
                  <span className="text-emerald-400 group-hover:underline font-semibold flex items-center gap-1 shrink-0 text-[11px] sm:text-xs">
                    Full Analysis <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
