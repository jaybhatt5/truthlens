/**
 * TruthLens AI - Multimodal News Photo & Video Fact-Checker
 * 
 * Verifies news photos, newspaper clippings, broadcast screenshots, and video banners.
 * 
 * Process:
 * 1. Multimodal OCR: Extracts embedded headlines, lower-third tickers, and photo captions.
 * 2. Visual Layout Integrity: Checks font kerning, graphic overlay artifacts, and channel logos.
 * 3. Ground Truth Matching: Cross-checks extracted claim against international wire services.
 */

import React, { useState } from 'react';
import { NewsMediaFactCheckResult, FactCheckItem } from '../types';
import { Camera, Video, Upload, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, FileSearch, Eye, RefreshCw, FileText, ExternalLink, Award, Layers } from 'lucide-react';

interface NewsMediaFactCheckerProps {
  /** Optional user-configured Gemini API Key */
  apiKey?: string;
  /** Optional callback to create and open a formal FactCheckItem report */
  onGenerateReport?: (item: FactCheckItem) => void;
}

export const NewsMediaFactChecker: React.FC<NewsMediaFactCheckerProps> = ({ apiKey, onGenerateReport }) => {
  // Uploaded media file and preview states
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80'
  );
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [userNotes, setUserNotes] = useState<string>('Viral Breaking News screenshot claiming government emergency health mandate');
  
  // Analysis execution states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active OCR and visual integrity analysis result
  const [result, setResult] = useState<NewsMediaFactCheckResult | null>({
    id: 'media-fc-sample',
    mediaUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80',
    mediaType: 'image',
    headlineExtracted: 'BREAKING: Global Emergency Quarantine Mandated for 30 Days',
    ocrText: '[OCR TEXT DETECTED IN MEDIA]: "BREAKING NEWS - GLOBAL EMERGENCY QUARANTINE ORDER EFFECTIVE IMMEDIATELY. OFFICIAL GAZETTE #9021. DO NOT LEAVE RESIDENCE."',
    verdict: 'DEBUNKED_FAKE',
    truthScore: 4,
    visualIntegrityScore: 22,
    summary: 'TruthLens Multimodal AI inspection identified doctored font typography over a recycled news broadcast graphic template. No official health ministry or press wire released this statement.',
    detailedReasoning: `Multimodal computer vision and OCR text extraction performed an automated audit of the uploaded news image.\n\n1. Font Kerning & Compression: The text overlay "GLOBAL EMERGENCY QUARANTINE ORDER" exhibits distinct pixel compression discrepancies compared to the station's official broadcast lower-third graphics.\n2. Archive Search Cross-Check: Querying global news wires and government press release archives yielded ZERO matching entries for this headline.\n3. Image Reverse Index: The background video frame was originally captured during an archived broadcast and re-edited with fake breaking news banners.`,
    keyEvidence: [
      'Font kerning on the lower-third news ticker reveals digital copy-paste manipulation.',
      'No official health ministry or Associated Press wire confirms the reported quarantine order.',
      'Background frame matches an archived weather broadcast re-edited with fake tickers.'
    ],
    visualAnomalies: [
      { element: 'Lower-Third Ticker Font', anomalyType: 'Unmatched Font Typeface', note: 'Font kerning does not align with news station graphic standards.' },
      { element: 'Station Watermark Logo', anomalyType: 'Edge Distortion', note: 'Artificial blur surrounding channel logo indicates digital paste overlay.' }
    ],
    sources: [
      { name: 'World Health Organization Official Press Index', credibilityScore: 98, type: 'Official Standard' },
      { name: 'Associated Press Global Wire Registry', credibilityScore: 95, type: 'Primary Source' },
      { name: 'International Fact-Checking Network (IFCN)', credibilityScore: 96, type: 'Fact Checking Org' }
    ],
    timestamp: 'Just now'
  });

  const sampleMediaItems = [
    {
      title: 'Doctored Quarantine Banner',
      type: 'image' as const,
      preview: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80',
      notes: 'Viral breaking news ticker image claiming immediate 30-day quarantine order.'
    },
    {
      title: 'Verified NASA Press Photo',
      type: 'image' as const,
      preview: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80',
      notes: 'NASA James Webb Space Telescope official astronomical discovery photo.'
    },
    {
      title: 'Altered Newspaper Clipping',
      type: 'image' as const,
      preview: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
      notes: 'Social media post sharing a scanned newspaper clipping with modified headline.'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMessage(null);
      if (file.size > 80 * 1024 * 1024) {
        setErrorMessage('File size is too large (max 80MB). Please select a shorter video or smaller photo.');
        return;
      }

      setMediaFile(file);
      const isVid = file.type.startsWith('video');
      setMediaType(isVid ? 'video' : 'image');

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeMedia = async (customPreview?: string, customNotes?: string, customType?: 'image' | 'video') => {
    const targetPreview = customPreview || mediaPreview;
    const targetNotes = customNotes !== undefined ? customNotes : userNotes;
    const targetType = customType || mediaType;

    if (!targetPreview && !targetNotes.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisStep('Performing OCR Text Extraction...');

    try {
      setTimeout(() => setAnalysisStep('Cross-Referencing Ground Truth News Archives...'), 700);
      setTimeout(() => setAnalysisStep('Inspecting Font Kerning & Visual Integrity...'), 1400);

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) {
        headers['x-gemini-api-key'] = apiKey;
      }

      const response = await fetch('/api/fact-check-media', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          mediaBase64: targetPreview?.startsWith('data:') ? targetPreview : undefined,
          mediaUrl: !targetPreview?.startsWith('data:') ? targetPreview : undefined,
          mediaType: targetType,
          userNotes: targetNotes.trim(),
          apiKey,
        })
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        console.error('Non-JSON response received:', responseText.slice(0, 200));
        throw new Error(response.status === 413 ? 'The uploaded video/photo file is too large for the server payload. Please select a smaller file.' : 'Server error occurred during news verification.');
      }

      if (data.success && data.result) {
        setResult(data.result);
      } else if (data.error) {
        setErrorMessage(data.details || data.error);
      }
    } catch (err: any) {
      console.error('Error analyzing news media:', err);
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const convertToFactCheckItem = (res: NewsMediaFactCheckResult): FactCheckItem => ({
    id: res.id,
    title: res.headlineExtracted,
    claim: res.ocrText || res.headlineExtracted,
    verdict: res.verdict,
    truthScore: res.truthScore,
    category: 'World News',
    summary: res.summary,
    explanation: res.detailedReasoning,
    keyFindings: res.keyEvidence,
    sources: res.sources.map(s => ({
      name: s.name,
      credibilityScore: s.credibilityScore,
      type: (s.type as any) || 'Fact Checking Org'
    })),
    timestamp: res.timestamp,
    verifiedBy: apiKey ? 'TruthLens Gemini 3.7 Multimodal Vision' : 'TruthLens AI Multimodal Vision Engine',
    imageUrl: res.mediaUrl,
    sharesCount: 1420,
    tags: ['News Photo Check', 'OCR Verification', 'Visual Forensics']
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-2.5 sm:space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span>Multimodal Vision & OCR News Analyzer</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            News Photo & Video <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Truth Verifier</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Upload any news photo, newspaper clipping, social media screenshot, or video broadcast frame.
            TruthLens AI extracts embedded news text via OCR, verifies claims against ground truth wire archives, and identifies doctored headlines in seconds.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Analysis Controls + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Upload & Sample Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          
          {errorMessage && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-red-200">Verification Notice</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
          
          {/* Sample Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5 sm:space-y-3 shadow-xl">
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>Try Sample News Media</span>
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {sampleMediaItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setMediaPreview(item.preview);
                    setMediaType(item.type);
                    setUserNotes(item.notes);
                    handleAnalyzeMedia(item.preview, item.notes, item.type);
                  }}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-3 text-left transition-all hover:bg-slate-800/60 group active:scale-[0.99]"
                >
                  <img src={item.preview} alt={item.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-slate-800 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">{item.title}</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{item.notes}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5 sm:space-y-4 shadow-xl">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Upload News Photo or Video</span>
            </h3>

            <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-2xl p-4 sm:p-6 text-center transition-all bg-slate-950/60 group cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {mediaPreview ? (
                <div className="space-y-2.5 sm:space-y-3">
                  {mediaType === 'video' ? (
                    <video src={mediaPreview} controls className="max-h-48 sm:max-h-56 mx-auto rounded-xl border border-slate-800" />
                  ) : (
                    <img src={mediaPreview} alt="Uploaded news preview" className="max-h-48 sm:max-h-56 mx-auto rounded-xl object-contain border border-slate-800 shadow-md" />
                  )}
                  <p className="text-[11px] sm:text-xs text-cyan-400 font-bold">Click or drag to replace news media file</p>
                </div>
              ) : (
                <div className="space-y-2 py-3 sm:py-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white">Drag & Drop news photo or video here</p>
                  <p className="text-[11px] sm:text-xs text-slate-400">Supports JPG, PNG, WEBP, MP4 news clippings</p>
                </div>
              )}
            </div>

            {/* User Notes / Context */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Context / Claim Mentioned in News Media (Optional):</label>
              <textarea
                rows={3}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="e.g. This news clipping claims WHO announced a global mandate..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 sm:p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => handleAnalyzeMedia()}
              disabled={isAnalyzing || (!mediaPreview && !userNotes.trim())}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-slate-950 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                  <span>{analysisStep || 'Analyzing News Media...'}</span>
                </>
              ) : (
                <>
                  <FileSearch className="w-4 h-4 shrink-0" />
                  <span>Verify News Photo / Video Now</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column: Fact-Check Result Output (7 Cols) */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl relative overflow-hidden">
              
              {/* Verdict Header Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-800 pb-4 sm:pb-5">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider block">TruthLens Multimodal Verification</span>
                  <h3 className="text-base sm:text-xl md:text-2xl font-extrabold text-white mt-1 leading-snug">{result.headlineExtracted}</h3>
                </div>

                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  result.verdict === 'VERIFIED_TRUE'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10'
                    : result.verdict === 'DEBUNKED_FAKE'
                    ? 'bg-red-500/20 border-red-500/40 text-red-400 shadow-lg shadow-red-500/10'
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10'
                }`}>
                  {result.verdict === 'VERIFIED_TRUE' && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                  {result.verdict === 'DEBUNKED_FAKE' && <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                  {result.verdict === 'MISLEADING' && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                  <span>{result.verdict.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Truth & Integrity Score Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">News Truth Score</span>
                    <span className={`font-black text-xs sm:text-sm ${result.truthScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {result.truthScore} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 sm:h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${result.truthScore > 70 ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{ width: `${result.truthScore}%` }}
                    />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">Visual & Font Integrity</span>
                    <span className={`font-black text-xs sm:text-sm ${result.visualIntegrityScore > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {result.visualIntegrityScore} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 sm:h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${result.visualIntegrityScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${result.visualIntegrityScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Extracted OCR Text Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 sm:p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Extracted OCR Text from Photo/Video</span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-slate-900/90 p-2.5 sm:p-3 rounded-xl border border-slate-800 leading-relaxed break-words">
                  {result.ocrText}
                </p>
              </div>

              {/* Summary Takeaway */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">AI Fact-Check Executive Verdict</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {result.summary}
                </p>
              </div>

              {/* Detailed Reasoning & Key Evidence */}
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Multimodal Audit & Key Evidence</h4>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
                  <p className="leading-relaxed whitespace-pre-line">{result.detailedReasoning}</p>
                  
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="font-bold text-white block text-[11px] sm:text-xs">Key Forensic Evidence Points:</span>
                    <ul className="space-y-1.5">
                      {result.keyEvidence.map((ev, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs">{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ground Truth Sources */}
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Cross-Referenced News Sources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.sources.map((src, i) => (
                    <div key={i} className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs gap-2">
                      <div className="min-w-0 pr-1">
                        <p className="font-semibold text-white truncate text-[11px] sm:text-xs">{src.name}</p>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 block">{src.type}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] sm:text-[11px] font-bold shrink-0">
                        {src.credibilityScore}% Trust
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal View Trigger */}
              {onGenerateReport && (
                <div className="pt-3 sm:pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onGenerateReport(convertToFactCheckItem(result))}
                    className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                  >
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>View Official Verification Certificate</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center text-slate-400 space-y-3 sm:space-y-4 shadow-xl">
              <Camera className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold max-w-md mx-auto">Upload a news photo or video above to analyze news claims, OCR text, and doctored graphics.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
