/**
 * TruthLens AI - AI Content & NLP Text Forensic Analyzer
 * 
 * Inspects written articles, essays, and press releases to detect LLM synthetic generation.
 * 
 * Forensics Evaluated:
 * 1. Perplexity Score: Measures unpredictability of token sequence selections.
 * 2. Burstiness Score: Measures variability in sentence length, structure, and rhythmic cadence.
 * 3. Predicted LLM Model: Identifies stylistic fingerprints (e.g. GPT-4, Claude, Gemini).
 * 4. Sentence Breakdown: Highlights individual sentences with color-coded AI probability tags and reasons.
 */

import React, { useState } from 'react';
import { AITextAnalysisResult } from '../types';
import { Cpu, Bot, Sparkles, CheckCircle2, AlertCircle, FileText, Zap, RefreshCw, Layers } from 'lucide-react';

interface AITextAnalyzerProps {
  /** Optional user-configured Gemini API Key */
  apiKey?: string;
}

export const AITextAnalyzer: React.FC<AITextAnalyzerProps> = ({ apiKey }) => {
  // User input text passage to analyze
  const [inputText, setInputText] = useState<string>(
    `In recent years, the rapid advancement of artificial intelligence has fundamentally revolutionized numerous industries across the globe. Consequently, it is imperative to evaluate the systemic implications of automated decision-making processes. Furthermore, key stakeholders must collaborate proactively to ensure ethical governance and robust operational frameworks.`
  );
  
  // Loading state during API invocation
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Active NLP analysis results object
  const [analysisResult, setAnalysisResult] = useState<AITextAnalysisResult | null>({
    id: 'text-sample-1',
    inputText: `In recent years, the rapid advancement of artificial intelligence has fundamentally revolutionized numerous industries across the globe...`,
    aiScore: 92,
    humanScore: 8,
    perplexityScore: 35,
    burstinessScore: 28,
    predictedModel: 'ChatGPT / GPT-4 Synthetic Writing Pattern',
    highlightedSentences: [
      {
        text: 'In recent years, the rapid advancement of artificial intelligence has fundamentally revolutionized numerous industries across the globe.',
        aiLikelihood: 'High',
        reason: 'Classic generative AI intro cliché ("In recent years", "fundamentally revolutionized").'
      },
      {
        text: 'Consequently, it is imperative to evaluate the systemic implications of automated decision-making processes.',
        aiLikelihood: 'High',
        reason: 'Formulaic transition ("Consequently", "imperative to evaluate") with low perplexity.'
      },
      {
        text: 'Furthermore, key stakeholders must collaborate proactively to ensure ethical governance and robust operational frameworks.',
        aiLikelihood: 'High',
        reason: 'Standard LLM closing phrase ("Furthermore, key stakeholders", "ethical governance").'
      }
    ],
    summaryExplanation: 'High AI authorship probability. Text exhibits low sentence length variation (low burstiness), predictable word choices (low perplexity), and heavy reliance on characteristic LLM transition phrases.',
    timestamp: 'Just now'
  });

  // Pre-configured benchmark test samples
  const sampleTexts = [
    {
      title: 'AI Essay (ChatGPT)',
      content: `In conclusion, renewable energy sources represent a paramount milestone in combating climate change. Harnessing solar and wind power enables societies to foster sustainable development while significantly mitigating greenhouse gas emissions. Furthermore, policy makers must prioritize green infrastructure investments to facilitate seamless integration.`
    },
    {
      title: 'AI Tech Analysis (Claude/Gemini)',
      content: `To delve into the multifaceted implications of quantum cryptography, one must examine the delicate interplay between entanglement fidelity and decoherence mitigation. Crucially, this paradigm fosters robust security architectures across distributed ledger networks.`
    },
    {
      title: 'Organic Human Story',
      content: `I caught the 5 AM red-eye out of Mumbai yesterday. The rain was pounding against the tarmac, delay after delay. Honestly, nobody had any clue what was going on until the captain finally hopped on the mic at 3 AM and told us we were good to go.`
    },
    {
      title: 'Academic Abstract',
      content: `We measured dielectric breakdown voltages across twelve synthetic graphene polymer samples under cryogenic thermal cycles. Experimental data revealed an exponential deviation from classical Arrhenius rate law predictions at temperatures below 40 Kelvin.`
    }
  ];

  /**
   * Dispatches text to /api/analyze-text for NLP linguistic evaluation
   */
  const handleAnalyze = async () => {
    if (!inputText.trim() || inputText.length < 15) return;

    setIsAnalyzing(true);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) {
        headers['x-gemini-api-key'] = apiKey;
      }

      const response = await fetch('/api/analyze-text', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: inputText, apiKey }),
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        console.error('Non-JSON response in AITextAnalyzer:', responseText.slice(0, 150));
        return;
      }

      if (data.success && data.result) {
        setAnalysisResult(data.result);
      }
    } catch (err) {
      console.error('Text analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-semibold uppercase mb-2">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>NLP Forensic Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            AI Text Content Analyzer
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
            Detect whether an article, speech, or news report was written by ChatGPT, Claude, Gemini, or a human author using token perplexity, sentence burstiness, and linguistic fingerprinting.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Input Box */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Paste Text ({inputText.length} chars, ~{inputText.split(/\s+/).filter(Boolean).length} words)</span>
                </label>
                
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {sampleTexts.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputText(st.content)}
                      className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium transition-colors active:scale-95"
                      title={st.title}
                    >
                      {st.title.split(' ')[0]} {st.title.includes('Human') ? '👤' : '🤖'}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={7}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste news article, essay, or social media post text here..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed font-mono resize-y min-h-[140px]"
              />

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <span className="text-[11px] sm:text-xs text-slate-400">Min 15 characters required</span>
                
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || inputText.length < 15}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Computing Forensics...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 shrink-0" />
                      <span>Analyze AI Score</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Metric Descriptions Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 text-xs text-slate-400 space-y-2.5 shadow-xl">
              <h4 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>How TruthLens AI Detects AI Text</span>
              </h4>
              <p className="leading-relaxed">
                <strong className="text-slate-300">Perplexity:</strong> Measures vocabulary unpredictability. Human writing naturally has high perplexity, while AI models select statistically probable word tokens.
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-300">Burstiness:</strong> Measures sentence length variation. Humans write with inconsistent rhythm (short bursts mixed with long complex sentences); AI outputs uniform sentence lengths.
              </p>
            </div>

          </div>

          {/* Right Column: Forensic Output */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            
            {/* Score Card */}
            <div className={`p-4 sm:p-6 rounded-2xl border shadow-xl ${
              (analysisResult?.aiScore || 0) > 60
                ? 'bg-purple-950/40 border-purple-800 text-purple-100'
                : 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
            }`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">Text Authorship Verdict</span>
                <span className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-extrabold shrink-0 ${
                  (analysisResult?.aiScore || 0) > 60 ? 'bg-purple-600 text-white' : 'bg-emerald-500 text-slate-950'
                }`}>
                  {(analysisResult?.aiScore || 0) > 60 ? 'AI GENERATED' : 'ORGANIC HUMAN'}
                </span>
              </div>

              <div className="mt-3 sm:mt-4 flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black">{analysisResult?.aiScore}%</span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold opacity-90">
                  AI Probability ({analysisResult?.humanScore}% Human Likelihood)
                </span>
              </div>

              {/* Dual Bar */}
              <div className="w-full h-2.5 sm:h-3 bg-slate-900 rounded-full overflow-hidden mt-3 flex">
                <div className="bg-purple-500 h-full" style={{ width: `${analysisResult?.aiScore}%` }} />
                <div className="bg-emerald-500 h-full" style={{ width: `${analysisResult?.humanScore}%` }} />
              </div>

              <p className="text-xs font-bold text-cyan-300 mt-3 flex items-center gap-1.5">
                <Bot className="w-4 h-4 shrink-0" />
                <span className="truncate">{analysisResult?.predictedModel}</span>
              </p>

              <p className="text-xs mt-2 opacity-90 leading-relaxed">
                {analysisResult?.summaryExplanation}
              </p>
            </div>

            {/* Metrics Gauge */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-900 border border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-xl">
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold block truncate">Perplexity Index</span>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">{analysisResult?.perplexityScore} / 100</p>
                <span className="text-[10px] text-slate-500 block truncate">Lower = More AI predictable</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3.5 sm:p-4 rounded-xl shadow-xl">
                <span className="text-[11px] sm:text-xs text-slate-400 font-semibold block truncate">Burstiness Index</span>
                <p className="text-xl sm:text-2xl font-bold text-indigo-400 mt-1">{analysisResult?.burstinessScore} / 100</p>
                <span className="text-[10px] text-slate-500 block truncate">Lower = Monotonous AI cadence</span>
              </div>
            </div>

            {/* Sentence Level Highlighting */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sentence-Level AI Risk Analysis</span>
              </h3>

              <div className="space-y-2.5 sm:space-y-3 text-xs">
                {analysisResult?.highlightedSentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 sm:p-3 rounded-xl border leading-relaxed ${
                      sent.aiLikelihood === 'High'
                        ? 'bg-purple-950/30 border-purple-800/80 text-purple-200'
                        : sent.aiLikelihood === 'Medium'
                        ? 'bg-amber-950/30 border-amber-800/80 text-amber-200'
                        : 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0">
                        Risk: {sent.aiLikelihood}
                      </span>
                      <span className="text-[10px] opacity-75 truncate">{sent.reason}</span>
                    </div>
                    <p className="font-mono text-[11px] sm:text-xs text-white break-words">"{sent.text}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
