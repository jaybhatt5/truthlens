export type VerdictType = 'VERIFIED_TRUE' | 'DEBUNKED_FAKE' | 'MISLEADING' | 'UNVERIFIED';

export type ContentCategory = 'Politics' | 'Health & Science' | 'Technology' | 'World News' | 'Entertainment' | 'Finance';

export interface FactCheckItem {
  id: string;
  title: string;
  claim: string;
  verdict: VerdictType;
  truthScore: number;
  category: ContentCategory;
  summary: string;
  explanation: string;
  keyFindings: string[];
  sources: {
    name: string;
    url?: string;
    credibilityScore: number;
    type: 'Official Standard' | 'Fact Checking Org' | 'Peer Reviewed' | 'Primary Source' | 'Unverified Social';
  }[];
  timestamp: string;
  verifiedBy: string;
  imageUrl?: string;
  isDeepfakeChecked?: boolean;
  isAiTextChecked?: boolean;
  sharesCount: number;
  tags: string[];
}

export interface VideoKeyframeAnalysis {
  frameIndex: number;
  timestamp: string;
  frameUrl: string;
  authenticityScore: number;
  aiProbability: number;
  isManipulated: boolean;
  anomalyNote?: string;
}

export interface DeepfakeAnalysisResult {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isManipulated: boolean;
  aiProbability: number;
  authenticityScore: number;
  verdictLabel: string;
  summary: string;
  anomalies: {
    feature: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    region?: { x: number; y: number; width: number; height: number };
  }[];
  technicalDetails: {
    facialBoundaryScore: number;
    lightingConsistencyScore: number;
    spectralNoiseScore: number;
    ganArtifactsScore: number;
    elaScore?: number;
    noiseVarianceScore?: number;
    subsurfaceScatteringScore?: number;
  };
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
  synthIdResult?: {
    detected: boolean;
    watermarkType: string;
    confidence: number;
    details: string;
  };
  metadataInspection?: {
    hasExif: boolean;
    cameraModel: string;
    softwareSignatures: string;
    c2paManifest: 'Verified Untampered' | 'Synthetic AI Origin Flagged' | 'Missing Manifest / Stripped';
    gpsCoordinates?: string;
    creationDate?: string;
    credibilityIndex: number;
  };
  elaScore?: number;
  elaHeatmapUrl?: string;
  edgeNoiseMapUrl?: string;
  videoFrames?: VideoKeyframeAnalysis[];
  heatmapUrl?: string;
  timestamp: string;
}

export interface AITextAnalysisResult {
  id: string;
  inputText: string;
  aiScore: number;
  humanScore: number;
  perplexityScore: number;
  burstinessScore: number;
  predictedModel?: string;
  highlightedSentences: {
    text: string;
    aiLikelihood: 'High' | 'Medium' | 'Low';
    reason: string;
  }[];
  summaryExplanation: string;
  timestamp: string;
}

export interface NewsMediaFactCheckResult {
  id: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video';
  headlineExtracted: string;
  ocrText: string;
  verdict: VerdictType;
  truthScore: number;
  visualIntegrityScore: number;
  summary: string;
  detailedReasoning: string;
  keyEvidence: string[];
  visualAnomalies: {
    element: string;
    anomalyType: string;
    note: string;
  }[];
  sources: {
    name: string;
    credibilityScore: number;
    type: string;
  }[];
  timestamp: string;
}

export interface VerificationStats {
  totalClaimsChecked: number;
  fakeNewsBusted: number;
  deepfakesIntercepted: number;
  mediaAuditsCompleted: number;
  accuracyRate: number;
  categoriesBreakdown: { category: string; count: number }[];
}

