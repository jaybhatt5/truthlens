/**
 * TruthLens AI - Benchmark Seed Data & Mock Grounding Database
 * 
 * This module provides the initial baseline dataset loaded into the Express server's
 * in-memory state on startup. It contains pre-verified factual news stories,
 * debunked viral hoaxes/scams, and aggregated platform stats.
 * 
 * Purpose:
 * 1. Seeds the live feeds on initial application boot.
 * 2. Provides benchmark evaluation samples for testing the UI and client forensic viewers.
 * 3. Acts as an offline fallback when network connectivity or external search engines are unavailable.
 */

import { FactCheckItem, VerificationStats } from '../types';

/**
 * Initial curated fact-check items categorized into:
 * 1. Verified True News: Authenticated via peer review, government registries, and wire archives.
 * 2. Debunked Fake News / Viral Hoaxes: Medical scams, AI voice clones, and doctored broadcasts.
 */
export const INITIAL_FACT_CHECKS: FactCheckItem[] = [
  // --- REAL-TIME TRENDING VERIFIED NEWS ---
  {
    id: 'fc-101',
    title: 'NASA & ESA Confirm Historic Exoplanet Atmosphere Water Vapor Signature via JWST',
    claim: 'NASA and European Space Agency spectrographic readings confirm atmospheric water vapor signatures on temperate exoplanet LHS 1140 b.',
    verdict: 'VERIFIED_TRUE',
    truthScore: 99,
    category: 'Health & Science',
    summary: 'VERIFIED TRUE. Peer-reviewed spectroscopic analysis from the James Webb Space Telescope confirms molecular water vapor absorption bands in the atmosphere of habitable-zone super-Earth LHS 1140 b.',
    explanation: 'Independent astrophysicist teams at NASA Goddard and the European Southern Observatory analyzed transmission spectroscopy data gathered over 4 planetary transits. The findings, published in The Astrophysical Journal Letters, confirm atmospheric nitrogen and water signatures without stellar flare interference.',
    keyFindings: [
      'James Webb NIRISS and NIRSpec instruments detected clear molecular absorption lines.',
      'Target exoplanet lies 48 light-years away in the constellation Cetus within circumstellar habitable zone.',
      'Confirmed by dual-blind peer review at Harvard-Smithsonian Center for Astrophysics.'
    ],
    sources: [
      { name: 'NASA Exoplanet Science Institute', credibilityScore: 99, type: 'Primary Source' },
      { name: 'European Space Agency (ESA) Research Bulletin', credibilityScore: 99, type: 'Primary Source' },
      { name: 'The Astrophysical Journal Letters', credibilityScore: 98, type: 'Peer Reviewed' }
    ],
    timestamp: '25 mins ago',
    verifiedBy: 'TruthLens Search Grounding & NASA Astrophysics Wire',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 28400,
    tags: ['NASA', 'James Webb', 'Exoplanet', 'Astronomy', 'Verified True']
  },
  {
    id: 'fc-102',
    title: 'Global Renewable Energy Reaches Historic 30% Milestone of Worldwide Electricity',
    claim: 'New International Energy Agency (IEA) annual global review confirms solar and wind power generation officially crossed 30% of total world electric supply.',
    verdict: 'VERIFIED_TRUE',
    truthScore: 98,
    category: 'Technology',
    summary: 'VERIFIED TRUE. Official IEA global power statistics confirm solar and wind expansion brought total renewable electric generation above 30% for the first time in modern history.',
    explanation: 'Data compiled across 85 nations representing 92% of global electricity demand shows rapid utility-scale solar installations across Asia, Europe, and North America pushed renewable generation from 27.8% to 30.4%, surpassing coal growth.',
    keyFindings: [
      'Solar energy capacity grew by 34% year-over-year worldwide.',
      'Wind power generation reached a record 2,480 terawatt-hours in 2025.',
      'Verified by independent Ember Climate & Bloomberg Green audits.'
    ],
    sources: [
      { name: 'IEA Global Electricity Review 2025', credibilityScore: 99, type: 'Primary Source' },
      { name: 'Ember Climate Energy Transition Index', credibilityScore: 96, type: 'Peer Reviewed' },
      { name: 'Bloomberg Green Global Energy Monitor', credibilityScore: 94, type: 'Official Standard' }
    ],
    timestamp: '1 hour ago',
    verifiedBy: 'TruthLens IEA Dataset & Energy Transition Grounding',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 34100,
    tags: ['Renewables', 'Solar', 'Wind', 'IEA', 'Verified True']
  },
  {
    id: 'fc-103',
    title: 'WHO & Health Partners Announce Global Wild Poliovirus Eradication Near 99.9% Mark',
    claim: 'World Health Organization official epidemiological bulletin reports global wild poliovirus transmission restricted to record historic minimum.',
    verdict: 'VERIFIED_TRUE',
    truthScore: 97,
    category: 'Health & Science',
    summary: 'VERIFIED TRUE. Global Polio Eradication Initiative epidemiological surveillance logs record-low global cases, with 5 of 6 WHO regions officially certified free of wild poliovirus.',
    explanation: 'Epidemiological surveillance data verified by the CDC and WHO confirms wild poliovirus type 1 transmission remained confined to small isolated border pockets, with zero cases reported across Africa, Europe, and the Americas for over 36 consecutive months.',
    keyFindings: [
      'Over 400 million children immunized across 30 countries in the past 12 months.',
      'Wastewater genomic sequencing verifies no undetected viral reservoirs.',
      'WHO Independent Monitoring Board published full verification documentation.'
    ],
    sources: [
      { name: 'World Health Organization Surveillance Report', credibilityScore: 99, type: 'Official Standard' },
      { name: 'CDC Global Immunization Division', credibilityScore: 98, type: 'Primary Source' },
      { name: 'The Lancet Infectious Diseases', credibilityScore: 97, type: 'Peer Reviewed' }
    ],
    timestamp: '2 hours ago',
    verifiedBy: 'TruthLens WHO Primary Document Archive & CDC Index',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 19800,
    tags: ['WHO', 'Public Health', 'Vaccines', 'Eradication', 'Verified']
  },
  {
    id: 'fc-104',
    title: 'European Union Officially Enacts World’s First Comprehensive Artificial Intelligence Act',
    claim: 'The European Union has formally implemented the EU AI Act establishing legal safety and transparency obligations for frontier AI models.',
    verdict: 'VERIFIED_TRUE',
    truthScore: 99,
    category: 'Technology',
    summary: 'VERIFIED TRUE. The EU Artificial Intelligence Act entered into full legal force across all 27 member states, setting mandatory risk tiers and watermarking requirements for generative AI.',
    explanation: 'The European Parliament and Council published Regulation (EU) 2024/1689 in the Official Journal. The landmark framework enforces transparency requirements, synthetic content watermarking (C2PA/SynthID standards), and prohibits biometric categorisation systems violating fundamental rights.',
    keyFindings: [
      'Mandates cryptographic watermarks on all synthetic AI images, audio, and video.',
      'Enforces strict red-teaming protocols for models exceeding 10^25 FLOPs compute.',
      'Published in the Official Journal of the European Union.'
    ],
    sources: [
      { name: 'Official Journal of the European Union', credibilityScore: 100, type: 'Official Standard' },
      { name: 'European AI Office Registry', credibilityScore: 98, type: 'Primary Source' },
      { name: 'Reuters Legal Wire', credibilityScore: 95, type: 'Fact Checking Org' }
    ],
    timestamp: '3 hours ago',
    verifiedBy: 'TruthLens EU Legal Gazette Index & Government Archive',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 42300,
    tags: ['AI Act', 'EU Policy', 'Technology', 'Governance', 'Verified']
  },

  // --- REAL-TIME BUSTED FAKE NEWS & VIRAL HOAXES ---
  {
    id: 'fc-105',
    title: 'Viral Claim: Drinking Lemon-Salt Water Completely Dissolves Kidney Stones in 24 Hours',
    claim: 'Viral TikTok and Facebook video with 6 million views claims drinking concentrated warm lemon juice with Himalayan salt dissolves kidney stones overnight without surgery.',
    verdict: 'DEBUNKED_FAKE',
    truthScore: 0,
    category: 'Health & Science',
    summary: 'DEBUNKED FAKE & DANGEROUS. Nephrologists, urology medical boards, and WHO confirm lemon-salt solutions cannot dissolve calcium oxalate kidney stones in 24 hours. High sodium intake worsens kidney strain.',
    explanation: 'Urolithiasis (kidney stones) primarily consists of insoluble calcium oxalate or uric acid crystals. While dietary citric acid in lemon juice can help prevent new stone formation over months, it cannot chemically dissolve existing solid stones in 24 hours. Consuming high-sodium salt water induces acute dehydration and hypertension.',
    keyFindings: [
      'American Urological Association confirms no clinical evidence supporting 24-hour stone dissolution.',
      'Excess sodium chloride intake increases urinary calcium excretion, accelerating stone formation.',
      'Video originates from an unverified influencer account selling fake detox supplements.'
    ],
    sources: [
      { name: 'American Urological Association (AUA) Clinical Guidelines', credibilityScore: 99, type: 'Official Standard' },
      { name: 'National Kidney Foundation Medical Board', credibilityScore: 98, type: 'Primary Source' },
      { name: 'Snopes Health Fact Check', credibilityScore: 94, type: 'Fact Checking Org' }
    ],
    timestamp: '40 mins ago',
    verifiedBy: 'TruthLens Medical Grounding & Urology Guideline Registry',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 78500,
    tags: ['Health Hoax', 'Kidney Stones', 'Debunked Fake', 'Medical Scam']
  },
  {
    id: 'fc-106',
    title: 'Deepfake Audio of Reserve Bank Governor Announcing Emergency Midnight Cash Recall',
    claim: 'A viral voice recording circulating across WhatsApp groups claims the Central Bank Governor ordered immediate withdrawal of all 500-rupee currency notes by midnight.',
    verdict: 'DEBUNKED_FAKE',
    truthScore: 1,
    category: 'Finance',
    summary: 'FABRICATED AI VOICE CLONE. Acoustic spectral analysis confirmed an ElevenLabs synthetic voice clone trained on public press interviews. Central Bank & PIB issued scam warnings.',
    explanation: 'The audio file exhibits characteristic synthetic acoustic flattening, uncalibrated pitch transitions, and missing background room resonance. Government Press Information Bureau (PIB) and the Reserve Bank released formal notifications debunking the fraudulent audio clip designed to cause market panic.',
    keyFindings: [
      'Acoustic spectrum matches generative AI text-to-speech voice clone architectures.',
      'Central Bank released official press statement confirming all currency notes remain 100% legal tender.',
      'Source Telegram accounts were traced to pump-and-dump financial market manipulation rings.'
    ],
    sources: [
      { name: 'Press Information Bureau (PIB) Fact Check', credibilityScore: 98, type: 'Official Standard' },
      { name: 'Reserve Bank Official Press Release', credibilityScore: 100, type: 'Primary Source' },
      { name: 'TruthLens Audio Deepfake Forensic Suite', credibilityScore: 97, type: 'Fact Checking Org' }
    ],
    timestamp: '1 hour ago',
    verifiedBy: 'TruthLens Audio Forensic Suite & Central Bank Registry',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80',
    isDeepfakeChecked: true,
    sharesCount: 92400,
    tags: ['Deepfake Audio', 'Finance Scam', 'Voice Clone', 'Debunked Fake']
  },
  {
    id: 'fc-107',
    title: 'Midjourney AI Generated Imagery of Paris Eiffel Tower Engulfed in Flames',
    claim: 'Dramatic high-resolution photos showing the Eiffel Tower in Paris engulfed in massive smoke and fire went viral with over 12 million impressions.',
    verdict: 'DEBUNKED_FAKE',
    truthScore: 0,
    category: 'World News',
    summary: 'SYNTHETIC AI GENERATION. Paris Fire Brigade and French National Police confirmed no fire incident occurred. Structural lattice reflections show distinct Midjourney v6 diffusion artifacts.',
    explanation: 'Visual forensic analysis detected synthetic lighting halos, inconsistent iron lattice geometry, and non-physical smoke diffusion. Live panoramic 4K webcams overlooking the Champ de Mars and Trocadéro confirmed the Eiffel Tower operating normally with zero emergency responses logged.',
    keyFindings: [
      'Zero emergency responses or incident reports logged by Sapeurs-Pompiers de Paris.',
      'SynthID and C2PA forensic analysis identified digital diffusion noise fingerprints.',
      'Live HD webcams in Paris confirmed the monument was completely intact and illuminated as usual.'
    ],
    sources: [
      { name: 'Sapeurs-Pompiers de Paris (Fire & Rescue)', credibilityScore: 100, type: 'Primary Source' },
      { name: 'Agence France-Presse (AFP) Fact Check', credibilityScore: 97, type: 'Fact Checking Org' },
      { name: 'TruthLens Multimodal Vision Sentinel', credibilityScore: 98, type: 'Fact Checking Org' }
    ],
    timestamp: '2 hours ago',
    verifiedBy: 'TruthLens Vision Deepfake Model & Live Webcam Verification',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    isDeepfakeChecked: true,
    sharesCount: 115000,
    tags: ['Deepfake Image', 'Eiffel Tower', 'Midjourney', 'Debunked Fake']
  },
  {
    id: 'fc-108',
    title: 'Doctored News Broadcast Screenshot Falsely Claims WHO Mandated 30-Day Emergency Quarantine',
    claim: 'A viral news screenshot claiming the World Health Organization ordered immediate 30-day mandatory global quarantine in Official Gazette #9021.',
    verdict: 'DEBUNKED_FAKE',
    truthScore: 0,
    category: 'World News',
    summary: 'DOCTORED BROADCAST GRAPHIC. TruthLens OCR and visual forensics identified altered lower-third font typography over a recycled 2020 weather graphic. No health ministry released such an order.',
    explanation: 'Multimodal OCR text analysis revealed mismatched font kerning and artificial pixel blur surrounding channel watermarks. Official press wire archives from WHO, Reuters, and the Associated Press confirm zero quarantine mandates exist.',
    keyFindings: [
      'Font kerning on the lower-third news ticker reveals digital copy-paste manipulation.',
      'No official health ministry or Associated Press wire confirms the reported quarantine order.',
      'Background frame matches an archived 2020 weather broadcast from a different network.'
    ],
    sources: [
      { name: 'World Health Organization Official Press Index', credibilityScore: 99, type: 'Official Standard' },
      { name: 'Associated Press Global Wire Registry', credibilityScore: 96, type: 'Primary Source' },
      { name: 'International Fact-Checking Network (IFCN)', credibilityScore: 97, type: 'Fact Checking Org' }
    ],
    timestamp: '3 hours ago',
    verifiedBy: 'TruthLens Multimodal Vision & OCR Forensic Engine',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80',
    sharesCount: 67200,
    tags: ['Doctored Photo', 'OCR Verification', 'Debunked Fake', 'Fake News']
  }
];

/**
 * Aggregated platform metrics and category distribution numbers
 * displayed on the Dashboard & Stats page.
 */
export const INITIAL_STATS: VerificationStats = {
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
};

