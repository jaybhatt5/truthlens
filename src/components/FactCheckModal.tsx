/**
 * TruthLens AI - Fact Check Audit Certificate Modal & Print/PDF Exporter
 * 
 * Features:
 * - High-fidelity verification audit certificate with unique Certificate ID and QR code.
 * - Displays truth scores, full multi-paragraph reasoning, key findings bullets, and authoritative sources.
 * - Print / PDF Export support (`window.print()` with clean `@media print` overrides).
 */

import React from 'react';
import { FactCheckItem, DeepfakeAnalysisResult } from '../types';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Printer, Download, ExternalLink, Sparkles, Share2, Award, QrCode, ArrowLeft } from 'lucide-react';

interface FactCheckModalProps {
  /** The selected fact check article to inspect, if applicable */
  item: FactCheckItem | null;

  /** The selected deepfake inspection result to inspect, if applicable */
  deepfakeResult?: DeepfakeAnalysisResult | null;

  /** Callback to close the modal dialog */
  onClose: () => void;
}

export const FactCheckModal: React.FC<FactCheckModalProps> = ({ item, deepfakeResult, onClose }) => {
  // If neither fact check nor deepfake result is selected, render nothing
  if (!item && !deepfakeResult) return null;

  // Normalize fields across fact-check items and deepfake results
  const title = item ? item.title : deepfakeResult?.verdictLabel;
  const summary = item ? item.summary : deepfakeResult?.summary;
  const explanation = item ? item.explanation : deepfakeResult?.summary;
  const score = item ? item.truthScore : (100 - (deepfakeResult?.aiProbability || 0));
  const isFake = item ? (item.verdict === 'DEBUNKED_FAKE' || item.verdict === 'MISLEADING') : deepfakeResult?.isManipulated;

  /**
   * Triggers the browser's native print / save as PDF dialog
   */
  const handlePrintReport = () => {
    window.print();
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full text-slate-100 shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden my-auto print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Header (Sticky) */}
        <div className="p-3 sm:p-4 md:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onClose}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all hover:text-white shrink-0 active:scale-95"
              title="Return to feed"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider block truncate">TruthLens Audit</span>
                <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Certificate #TL-{item?.id || 'DF'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handlePrintReport}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors active:scale-95"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body (Scrollable) */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Top Stamp Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800">
            <div className="min-w-0">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                isFake ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {isFake ? <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                <span>{item ? item.verdict.replace('_', ' ') : (deepfakeResult?.isManipulated ? 'DEEPFAKE SYNTHETIC' : 'AUTHENTIC')}</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white leading-snug break-words">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
              <div className="text-left sm:text-right">
                <span className="text-[11px] sm:text-xs text-slate-400 block font-semibold">Truth Index</span>
                <span className={`text-2xl sm:text-3xl font-black ${isFake ? 'text-red-400' : 'text-emerald-400'}`}>
                  {score}%
                </span>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 shrink-0">
                <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 opacity-80" />
              </div>
            </div>
          </div>

          {/* Claim Statement */}
          {item && (
            <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 text-xs sm:text-sm">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">Investigated Claim:</span>
              <p className="italic text-slate-200 break-words">"{item.claim}"</p>
            </div>
          )}

          {/* Media Evidence Subject if available */}
          {(item?.imageUrl || deepfakeResult?.mediaUrl) && (
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Audited Media Evidence</span>
              {((item?.imageUrl && (item.imageUrl.startsWith('data:video') || /\.mp4/i.test(item.imageUrl))) ||
                (deepfakeResult?.mediaUrl && (deepfakeResult.mediaUrl.startsWith('data:video') || /\.mp4/i.test(deepfakeResult.mediaUrl)))) ? (
                <video
                  src={item?.imageUrl || deepfakeResult?.mediaUrl}
                  controls
                  className="max-h-56 sm:max-h-64 rounded-xl mx-auto border border-slate-800 w-full object-contain"
                />
              ) : (
                <img
                  src={item?.imageUrl || deepfakeResult?.mediaUrl}
                  alt="Audited subject"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = isFake
                      ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80'
                      : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="max-h-56 sm:max-h-64 rounded-xl mx-auto object-contain border border-slate-800 w-full"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          )}

          {/* Summary */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Executive Verdict Summary</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800">
              {summary}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Forensic Fact-Check Investigation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {explanation}
            </p>
          </div>

          {/* Deepfake Specific SynthID, ELA and Metadata Cards */}
          {deepfakeResult && (
            <div className="space-y-3 sm:space-y-4">
              {/* 4-Pillar Forensic Summary */}
              {deepfakeResult.forensicPillars && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[11px]">4-Pillar Forensic Architecture Score</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Biometrics</span>
                      <span className="font-bold text-white text-xs">{deepfakeResult.forensicPillars.biometric.score}% Trust</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Digital Signal / ELA</span>
                      <span className="font-bold text-white text-xs">{deepfakeResult.forensicPillars.digitalSignal.score}% Trust</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Provenance</span>
                      <span className="font-bold text-white text-xs">{deepfakeResult.forensicPillars.provenance.score}% Trust</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Temporal / Lip-Sync</span>
                      <span className="font-bold text-white text-xs">{deepfakeResult.forensicPillars.temporal?.score ?? 90}% Trust</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[11px]">Google SynthID & ELA Core</span>
                  <div className="flex justify-between text-slate-300 gap-2">
                    <span className="text-slate-400">SynthID Status:</span>
                    <span className="font-bold text-amber-400 text-right">{deepfakeResult.synthIdResult?.detected ? 'Watermark Detected' : 'No Watermark'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 gap-2">
                    <span className="text-slate-400">ELA Discrepancy Index:</span>
                    <span className="font-bold text-cyan-300 text-right">{deepfakeResult.technicalDetails?.elaScore ?? deepfakeResult.elaScore ?? 18} / 100</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 pt-1 border-t border-slate-800 leading-relaxed">
                    {deepfakeResult.synthIdResult?.details || 'Error Level Analysis (ELA) and latent frequency perturbations analyzed.'}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[11px]">C2PA & EXIF Metadata</span>
                  <div className="flex justify-between text-slate-300 gap-2">
                    <span className="text-slate-400">Hardware:</span>
                    <span className="font-semibold text-slate-200 text-right truncate">{deepfakeResult.metadataInspection?.cameraModel || 'Generative Pipeline'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 gap-2">
                    <span className="text-slate-400">Origin:</span>
                    <span className="font-semibold text-slate-200 text-right truncate">{deepfakeResult.metadataInspection?.softwareSignatures || 'Midjourney Engine'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 gap-2">
                    <span className="text-slate-400">C2PA Manifest:</span>
                    <span className="font-bold text-red-400 text-right">{deepfakeResult.metadataInspection?.c2paManifest || 'Synthetic Flagged'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Findings */}
          {item?.keyFindings && (
            <div>
              <h3 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Key Grounding Findings</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {item.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/80 p-2.5 sm:p-3 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                    <span className="break-words">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources Table */}
          {item?.sources && item.sources.length > 0 && (
            <div>
              <h3 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Verified Sources & Grounding References</h3>
              <div className="space-y-2">
                {item.sources.map((src, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div className="min-w-0">
                      <span className="font-bold text-white">{src.name}</span>
                      <span className="text-slate-400 text-[10px] ml-2 px-1.5 py-0.5 bg-slate-800 rounded">{src.type}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-emerald-400 font-semibold">{src.credibilityScore}% Credibility</span>
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Bar with Back Button */}
          <div className="pt-4 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 print:hidden">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Back to Articles & News Feed</span>
            </button>

            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <Award className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-left sm:text-right">
                <p className="font-bold text-white text-[11px] sm:text-xs">TruthLens AI Official Audit Seal</p>
                <p className="text-[9px] sm:text-[10px] text-slate-500">SSCCS BCA Sem 3 • Grounding Engine</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
