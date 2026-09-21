/**
 * TruthLens AI - Busted News & Viral Hoaxes Section
 * 
 * Displays intercepted disinformation, medical scams, fabricated quotes,
 * and manipulated media flagged as DEBUNKED_FAKE or MISLEADING (Truth Score < 40%).
 */

import React from 'react';
import { FactCheckItem } from '../types';
import { AlertTriangle, ShieldAlert, XCircle, ExternalLink, Flame, Info } from 'lucide-react';

interface BustedNewsProps {
  /** Array of all fact check items in feed */
  items: FactCheckItem[];

  /** Callback when user clicks a busted rumor card to inspect audit logs */
  onSelectItem: (item: FactCheckItem) => void;
}

export const BustedNewsSection: React.FC<BustedNewsProps> = ({ items, onSelectItem }) => {
  // Filter for debunked fake news, hoaxes, and misleading viral stories
  const bustedNews = items.filter(
    item => item.verdict === 'DEBUNKED_FAKE' || item.verdict === 'MISLEADING' || item.truthScore < 40
  );

  return (
    <section className="py-8 sm:py-12 bg-slate-900/65 backdrop-blur-sm border-t border-slate-800 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Fake News & Viral Rumors Busted</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Busted News & Debunked Claims
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Popular misinformation, fake rumors, and manipulated stories intercepted by TruthLens AI.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl text-red-400 self-start sm:self-auto shrink-0">
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span>{bustedNews.length} Rumors Intercepted</span>
          </div>
        </div>

        {/* Busted Items Grid */}
        {bustedNews.length === 0 ? (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-400">
            <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-xs sm:text-sm">No busted rumors currently logged.</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {bustedNews.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-slate-950/90 border border-red-900/30 hover:border-red-500/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1.5 active:scale-[0.99] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Header */}
                  {item.imageUrl && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-extrabold text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                        <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>Truth Score: {item.truthScore}%</span>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-red-400 border border-red-500/30 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-lg">
                        {item.verdict === 'DEBUNKED_FAKE' ? 'DEBUNKED FAKE' : 'MISLEADING'}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 mb-2">
                      <span>{item.timestamp}</span>
                      <span className="text-slate-400">{item.sharesCount.toLocaleString()} Viral Shares</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200">
                      <div className="font-semibold text-red-400 flex items-center gap-1 mb-1 text-[11px] sm:text-xs">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>The Truth:</span>
                      </div>
                      <p className="line-clamp-3 leading-relaxed text-xs">{item.summary}</p>
                    </div>

                    {/* Key Debunk Points */}
                    <div className="mt-3.5">
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mb-1.5">Why it's Fake / Misleading:</p>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {item.keyFindings.slice(0, 2).map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-red-400 font-bold shrink-0">✕</span>
                            <span className="line-clamp-1">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Footer details */}
                <div className="px-4 sm:px-5 py-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-slate-400 truncate max-w-[140px] sm:max-w-[200px]">
                    Category: <strong className="text-slate-200">{item.category}</strong>
                  </span>
                  <span className="text-red-400 group-hover:underline font-semibold flex items-center gap-1 shrink-0 text-[11px] sm:text-xs">
                    Expose Report <ExternalLink className="w-3 h-3" />
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
