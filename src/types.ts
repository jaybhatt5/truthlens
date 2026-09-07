/**
 * TruthLens AI - Core TypeScript Type Definitions
 * 
 * This file contains all the foundational data models and type contracts
 * shared across the frontend React components and the backend Express/Gemini API.
 * 
 * Key Data Structures:
 * - VerdictType & ContentCategory: Core taxonomies for news classification.
 * - FactCheckItem: Structured news report with sources, key findings, and truth score.
 * - DeepfakeAnalysisResult: Multimodal computer vision & deepfake forensic inspection data.
 * - AITextAnalysisResult: NLP forensic metrics (perplexity, burstiness, model signatures).
 * - NewsMediaFactCheckResult: OCR text extraction and image/video headline verification.
 * - VerificationStats: High-level analytics and dashboard metrics.
 */

/**
 * Standardized fact-check verdict classifications.
 * - VERIFIED_TRUE: Claim is supported by official records, primary sources, or peer-reviewed data (Score ~70-100%).
 * - DEBUNKED_FAKE: Claim is demonstrably false, fabricated, or a known hoax/scam (Score ~0-39%).
 * - MISLEADING: Claim contains a grain of truth but is taken out of context or exaggerated (Score ~40-69%).
 * - UNVERIFIED: Inconclusive evidence or ongoing investigation.
 */
export type VerdictType = 'VERIFIED_TRUE' | 'DEBUNKED_FAKE' | 'MISLEADING' | 'UNVERIFIED';

/**
 * Categorical domains for organizing news stories and claims.
 */
export type ContentCategory = 'Politics' | 'Health & Science' | 'Technology' | 'World News' | 'Entertainment' | 'Finance';

/**
 * Represents an individual fact-checked news item or user-submitted claim.
 */
export interface FactCheckItem {
  /** Unique identifier (e.g., 'fc-101' or 'fc-1725123456789') */
  id: string;

  /** Concise editorial headline summarizing the verification report */
  title: string;

  /** The raw or extracted claim statement submitted for fact-checking */
  claim: string;

  /** Verification verdict outcome */
  verdict: VerdictType;

  /** Confidence score representing factual accuracy on a scale of 0 (Fake) to 100 (True) */
  truthScore: number;

  /** Domain category */
  category: ContentCategory;

  /** 2-3 sentence executive takeaway explaining the verdict */
  summary: string;

  /** Detailed investigative reasoning detailing why the claim is true, fake, or misleading */
  explanation: string;

  /** Bullet points outlining specific evidentiary highlights */
  keyFindings: string[];

  /** List of primary sources, official registers, and fact-checking references used */
  sources: {
    name: string;
    url?: string;
    credibilityScore: number; // 0 - 100
    type: 'Official Standard' | 'Fact Checking Org' | 'Peer Reviewed' | 'Primary Source' | 'Unverified Social';
  }[];

  /** Relative human-readable timestamp (e.g., '25 mins ago', 'Just now') */
  timestamp: string;

  /** The AI verification engine or grounding pipeline responsible (e.g. 'TruthLens Gemini Grounding Engine') */
  verifiedBy: string;

  /** Editorial or context image representing the story */
  imageUrl?: string;

  /** Flag indicating whether deepfake media analysis was performed on this item */
  isDeepfakeChecked?: boolean;

  /** Flag indicating whether AI text authorship detection was performed on this item */
  isAiTextChecked?: boolean;

  /** Simulated viral reach or shares count */
  sharesCount: number;

  /** Search tags and topical keywords */
  tags: string[];
}

/**
 * Represents temporal frame analysis for a single video keyframe.
 */
export interface VideoKeyframeAnalysis {
  /** Sequential index of the keyframe (1-based) */
  frameIndex: number;

  /** Timestamp string in the video (e.g., '1.2s', '3.5s') */
  timestamp: string;

  /** Base64 or Blob Data URL of the extracted frame */
  frameUrl: string;

  /** Authenticity score from 0 (manipulated) to 100 (authentic) */
  authenticityScore: number;

  /** Likelihood of AI manipulation (0-100%) */
  aiProbability: number;

  /** Whether anomalies were flagged in this specific frame */
  isManipulated: boolean;

  /** Optional note explaining any observed anomaly (e.g., 'Facial blend seam detected') */
  anomalyNote?: string;
}

/**
 * Complete forensic inspection result for deepfake image and video media.
 */
export interface DeepfakeAnalysisResult {
  /** Unique ID of the analysis session */
  id: string;

  /** Source URL or filename of the audited media */
  mediaUrl: string;

  /** Media format type: 'image' or 'video' */
  mediaType: 'image' | 'video';

  /** Primary verdict flag: true if deepfake/synthetic generation is detected */
  isManipulated: boolean;

  /** Probability that the media is AI-generated (0 to 100%) */
  aiProbability: number;

  /** Overall authenticity score (100 - aiProbability) */
  authenticityScore: number;

  /** Human-readable verdict title (e.g. 'AI Deepfake / Synthetic Diffusion Detected') */
  verdictLabel: string;

  /** High-level forensic summary explaining the visual findings */
  summary: string;

  /** Specific detected visual, acoustic, or frequency anomalies */
  anomalies: {
    feature: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    region?: { x: number; y: number; width: number; height: number };
  }[];

  /** Low-level numerical scores across multiple forensic layers */
  technicalDetails: {
    facialBoundaryScore: number;
    lightingConsistencyScore: number;
    spectralNoiseScore: number;
    ganArtifactsScore: number;
    elaScore?: number;
    noiseVarianceScore?: number;
    subsurfaceScatteringScore?: number;
  };

  /** 4-Pillar Comprehensive Forensic Breakdown */
  forensicPillars?: {
    biometric: {
      score: number;
      irisSymmetry: number;
      facialBoundary: number;
      skinMicroTexture: number;
      lipSyncCoherence: number;
    };
    digitalSignal: {
      score: number;
      elaDiscrepancy: number;
      highFreqNoise: number;
      ganSpectralArtifacts: number;
    };
    provenance: {
      score: number;
      exifVerified: boolean;
      c2paStatus: string;
      cameraHardware: string;
      softwareTag: string;
    };
    temporal?: {
      score: number;
      interFrameJitter: number;
      lightingCoherence: number;
      expressionContinuity: number;
    };
  };

  /** Google SynthID & C2PA Content Credentials Watermark Scan */
  synthIdResult?: {
    detected: boolean;
    watermarkType: string; // e.g. "Google SynthID Imperceptible Latent Watermark"
    confidence: number; // 0 - 100
    details: string;
  };

  /** EXIF metadata and hardware provenance inspection */
  metadataInspection?: {
    hasExif: boolean;
    cameraModel: string;
    softwareSignatures: string;
    c2paManifest: 'Verified Untampered' | 'Synthetic AI Origin Flagged' | 'Missing Manifest / Stripped';
    gpsCoordinates?: string;
    creationDate?: string;
    credibilityIndex: number; // 0 - 100
  };

  /** Error Level Analysis discrepancy index */
  elaScore?: number;

  /** Data URL of the generated Error Level Analysis difference heatmap */
  elaHeatmapUrl?: string;

  /** Data URL of the Laplacian edge/noise frequency map */
  edgeNoiseMapUrl?: string;

  /** Multi-frame timeline analysis if input media was a video */
  videoFrames?: VideoKeyframeAnalysis[];

  /** Legacy heatmap URL support */
  heatmapUrl?: string;

  /** Timestamp of analysis execution */
  timestamp: string;
}

/**
 * Output data model for AI Text Detection & Linguistic Forensics.
 */
export interface AITextAnalysisResult {
  /** Unique ID of the text analysis session */
  id: string;

  /** The original text passage analyzed */
  inputText: string;

  /** Score from 0 to 100 representing probability of AI generation */
  aiScore: number;

  /** Score from 0 to 100 representing probability of human authorship */
  humanScore: number;

  /** Perplexity score: measures vocabulary unpredictability (low = AI predictable tokens) */
  perplexityScore: number;

  /** Burstiness score: measures sentence length & structure variation (low = monotonous AI pacing) */
  burstinessScore: number;

  /** Estimated model archetype (e.g. 'ChatGPT / GPT-4 Synthetic Pattern') */
  predictedModel?: string;

  /** Sentence-by-sentence risk breakdown with rationale */
  highlightedSentences: {
    text: string;
    aiLikelihood: 'High' | 'Medium' | 'Low';
    reason: string;
  }[];

  /** Narrative explanation of linguistic metrics */
  summaryExplanation: string;

  /** Execution timestamp */
  timestamp: string;
}

/**
 * Result model for Multimodal OCR News Photo & Video Verification.
 */
export interface NewsMediaFactCheckResult {
  /** Unique ID of the media fact check */
  id: string;

  /** Image or video URL analyzed */
  mediaUrl?: string;

  /** Media format type */
  mediaType: 'image' | 'video';

  /** Headline or breaking news ticker extracted from the image/frame */
  headlineExtracted: string;

  /** Full OCR text transcribed from the visual media */
  ocrText: string;

  /** Overall fact-check verdict */
  verdict: VerdictType;

  /** Factual accuracy score (0-100) */
  truthScore: number;

  /** Visual integrity score measuring whether fonts/logos were digitally altered (0-100) */
  visualIntegrityScore: number;

  /** Executive summary of the findings */
  summary: string;

  /** Multi-paragraph investigative rationale */
  detailedReasoning: string;

  /** Bulleted evidence points */
  keyEvidence: string[];

  /** Identified visual anomalies (e.g. mismatched font kerning or station logo artifacts) */
  visualAnomalies: {
    element: string;
    anomalyType: string;
    note: string;
  }[];

  /** Ground truth news registries and official wire sources */
  sources: {
    name: string;
    credibilityScore: number;
    type: string;
  }[];

  /** Audit timestamp */
  timestamp: string;
}

/**
 * Aggregated statistics and dashboard analytics.
 */
export interface VerificationStats {
  /** Total number of claims, URLs, and queries checked */
  totalClaimsChecked: number;

  /** Total number of fake news stories, rumors, and hoaxes exposed */
  fakeNewsBusted: number;

  /** Total number of deepfakes, synthetic faces, and voice clones detected */
  deepfakesIntercepted: number;

  /** Total number of multimodal news photos, clippings, and video frames audited */
  mediaAuditsCompleted: number;

  /** Overall verification accuracy rate percentage */
  accuracyRate: number;

  /** Distribution of checked claims across topical categories */
  categoriesBreakdown: { category: string; count: number }[];
}
