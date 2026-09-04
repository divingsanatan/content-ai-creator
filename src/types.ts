export type LifeProblemCategory = 
  | 'relationships'
  | 'money_business'
  | 'mental_health'
  | 'physical_health'
  | 'emotional_health';

export interface TrendItem {
  id: string;
  platform: 'YouTube' | 'Google Search' | 'Pinterest' | 'Instagram/Reels' | 'Reddit & Quora' | 'Hindu Calendar/Astrology';
  trendTerm: string;
  category: LifeProblemCategory;
  intent: string;
  contentAngle: string;
  gap: string;
  urgency: 'high' | 'medium' | 'evergreen';
  searchVolumeEstimate?: string;
}

export interface TopicIdea {
  id: string;
  workingTitle: string; // under 60 chars
  category: LifeProblemCategory;
  concept: string; // named Sanatan Dharma concept (specific chakra, planet, Gita idea, ritual)
  whyNow: string; // tie to trend, festival, or search spike
  bestFormat: 'long-form YouTube' | 'Short-only' | 'carousel-only';
  hook: string; // One-line hook for thumbnail/opening
  festivalTie?: {
    eventName: string;
    tithiOrDate: string;
    isVerified: boolean;
    reasoning: string;
  };
  status?: 'backlog' | 'in_progress' | 'scripted' | 'published';
}

export interface DeepResearchBrief {
  userBrief: string;
  searchIntent: {
    realPhrasing: string[];
    symptomSearches: string[];
  };
  relatedTrendingAngles: {
    connectedEvent: string;
    isSeasonalOrAstrological: boolean;
    viralFormatOrAudioNote: string;
    honestCaveat?: string;
  };
  sanatanDharmaGrounding: {
    primaryConcept: string;
    chakraOrPlanetOrScripture: string;
    practicalTakeaway: string;
    scriptureReferenceSafe: string;
  };
  competitiveGap: {
    whatOthersCover: string;
    underServedAngleToOwn: string;
  };
  categories: LifeProblemCategory[];
  straddlesMultipleCategories: boolean;
  uncertaintyFlags: string[];
  suggestedWorkingTitle: string;
  suggestedFormat: 'long-form YouTube' | 'Short-only' | 'carousel-only';
}

export interface DialogueLine {
  id: string;
  speaker: 'Nakul' | 'Nikhil';
  actorNote: string; // e.g. "[Anxious, pacing rapidly, staring at phone with bloodshot eyes]" or "[Calm, measured, deep grounded tone, taking a slow breath]"
  dialogue: string;
  timestamp?: string; // e.g. "01:15"
  isReelCutStart?: boolean;
  reelCutId?: string;
  isShlokMoment?: boolean;
}

export interface ShlokReference {
  included: boolean;
  sanskrit: string;
  transliteration: string;
  source: string; // e.g. "Bhagavad Gita 2.47" or "Katha Upanishad 1.3.3"
  nikhilExplanation: string; // Nikhil's direct, practical breakdown that pierces Nakul's defense
  contextInDialogue: string; // Why this shlok entered right now
}

export interface ReelCutGuide {
  id: string;
  cutNumber: number; // 1, 2, 3
  title: string;
  timecodeInLongVideo: string; // e.g. "00:00 - 00:48"
  targetDuration: string; // e.g. "45s"
  hookLine: string; // First 3-second hook for Reel/Short
  dialogueExchanges: {
    speaker: 'Nakul' | 'Nikhil';
    note: string;
    line: string;
  }[];
  editingDirection: string; // Camera cut, sound effect, zoom on Nakul's expression
  audioTrackVibe: string; // e.g. "Tense low drone cuts out completely on Nikhil's answer"
  onScreenCaptionText: string; // Large text hook on screen
  softCtaText: string; // e.g. "Full 14-min breakdown on YouTube (Link in bio)"
}

export interface DualActorDirectingGuide {
  nakulRole: {
    characterName: 'Nakul (You)';
    archetype: string; // "The Relatable Suffering Human: Anxious, Frustrated, Sarcastic, Overwhelmed"
    vocalPacing: string; // "Fast-talking, breathless, sudden exasperated spikes, skeptical tone"
    physicalCues: string; // "Pacing, running hand through hair, checking phone, clutching chest or coffee mug"
    wardrobe: string; // "Casual hoodie, messy hair, slightly rumpled tee"
    framing: string; // "Camera Left, tighter lens (50mm), dynamic angle"
  };
  nikhilRole: {
    characterName: 'Nikhil';
    archetype: string; // "The Grounded Sage & Mirror: Unshakable, Calm, Deep Voice, Direct Truth"
    vocalPacing: string; // "Deep chest resonance, deliberate cadence, quiet pauses, unwavering clarity"
    physicalCues: string; // "Still upright spine, relaxed hands, steady unblinking eye contact, slight knowing smile"
    wardrobe: string; // "Clean minimal linen kurta or fitted dark tee, grounded posture"
    framing: string; // "Camera Right, wider tripod lock (35mm), serene eye level"
  };
  filmingWorkflowTip: string;
}

export interface ScriptHSTSS {
  topic: string;
  category: LifeProblemCategory;
  concept: string;
  
  // Dual-Character Nakul & Nikhil Dynamic Script
  dialogueScript?: DialogueLine[];
  shlokCard?: ShlokReference;
  reelCuts?: ReelCutGuide[];
  directingGuide?: DualActorDirectingGuide;

  // H - Hook
  hook: {
    ideaCollision: string;
    alternateCollisionOptions: [string, string, string];
    buildToElevenSeconds: string;
  };
  
  // S - Stakes
  stakes: {
    lowestPointStory: string;
    visceralBodyFeeling: string;
    twoAmInternalDialogue: string;
  };
  
  // T - Turn
  turn: {
    livedRealization: string;
    sanatanTeachingIntegrated: string;
    momentOfLevityOrJoy: string;
  };
  
  // S - Scene
  scene: {
    sensoryDetails: string;
    roomAndLight: string;
    tangibleAnchors: string; // e.g. chai cup, sound of bell, traffic
    dialogueOrPresence: string;
  };
  
  // S - Shatter
  shatter: {
    micDropQuote: string;
    quotableLines: string[];
  };
  
  // CTA Ladder (strictly in sequence for YouTube)
  ctaLadder: {
    step1_share: string;
    step2_consult: string; // General spiritual healing / life coaching consultation framed around this problem
    step3_nextVideo: string;
  };
  
  // Repurposed 60-90s Short
  shortScript: {
    duration: string;
    hook: string;
    stakes: string;
    turn: string;
    scene: string;
    shatter: string;
    softCta: string;
  };
  
  // 5 on-screen text / caption lines for video editors
  editorCaptions: [string, string, string, string, string];
}

export interface SEOMetadata {
  topic: string;
  titles: {
    title: string;
    charCount: number;
    isProblemLed: boolean;
  }[];
  youtubeDescription: {
    firstTwoLinesFold: string;
    summary: string;
    timestampsPlaceholder: string;
    consultationCta: string;
    wordCount: number;
  };
  youtubeTags: {
    tag: string;
    type: 'symptom_problem' | 'spiritual_astrological' | 'broad_longtail';
  }[];
  hashtags: string[]; // at least 2 problem-aware
  thumbnailTexts: {
    text: string;
    isProblemStated: boolean;
  }[];
  instagramFacebookCaption: {
    hookLine: string;
    captionBody: string;
    mixedHashtags: string[];
    softCtaYouTubeLinkInBio: string; // Never consult
  };
}

export interface PinterestPin {
  id: string;
  style: 'soft watercolor' | 'minimalist flat illustration' | 'warm photo-realistic';
  imagePrompt: string;
  overlayText: string; // 6-10 words
  pinTitle: string; // <100 chars, symptom or concept led
  isProblemLedTitle: boolean;
  pinDescription: string; // 200-500 chars with mixed keywords + soft CTA to YT
  suggestedBoard: string;
  destinationLinkNote: string; // YouTube video
}

export interface PinterestPackage {
  topic: string;
  pins: [PinterestPin, PinterestPin, PinterestPin];
  keywordVariations: [string, string];
}

export interface CalendarItem {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  festivalOrTithi?: string;
  platform: 'YouTube' | 'Instagram/Facebook' | 'Pinterest' | 'Meta/Stories' | 'Quora/Reddit';
  contentType: 'Long-form Video' | 'Short/Reel' | 'Carousel' | 'Pinterest Pin' | 'Pre-Launch Hype' | 'Community Q&A';
  title: string;
  category: LifeProblemCategory;
  status: 'Idea' | 'Scripted' | 'Shot' | 'Scheduled' | 'Live';
  parentLongformId?: string;
  notes?: string;
}

export interface GrowthStrategy {
  topic: string;
  preLaunchHype: {
    dayMinus5: { type: string; prompt: string; purpose: string };
    dayMinus3: { type: string; prompt: string; purpose: string };
    dayMinus1: { type: string; prompt: string; purpose: string };
    dayZero: { type: string; prompt: string; purpose: string };
  };
  redditQuoraPlaybook: {
    quoraTargetQuestions: string[];
    quoraAnswerFramework: string;
    redditSubreddits: string[];
    redditAuthenticValueContribution: string;
  };
  atomizationMap: {
    totalPieces: number;
    breakdown: { platform: string; format: string; purpose: string }[];
  };
  abThumbnailTestVariants: {
    variantA: { headline: string; visualFocalPoint: string; hypothesis: string };
    variantB: { headline: string; visualFocalPoint: string; hypothesis: string };
  };
  communityQuestionToPin: string;
}

export interface PerformanceFeedbackLog {
  id: string;
  contentTitle: string;
  category: LifeProblemCategory;
  platform: 'YouTube' | 'Instagram' | 'Pinterest' | 'Facebook';
  format?: 'Long-form' | 'Short/Reel' | 'Carousel' | 'Pin';
  publishDate?: string;
  loggedAt?: string;
  views: number;
  ctrPercent: number;
  avgWatchTimePercent: number;
  sharesOrSaves?: number;
  saves?: number;
  consultationClicksOrInquiries?: number;
  consultationClicks?: number;
  userObservations?: string; // e.g., "The hook about 2am insomnia resonated strongly; comments flooded with questions on heart chakra"
  userNotes?: string;
  aiLearnedInsights?: string;
}

// Aliases for intuitive domain naming
export type ScriptPackage = ScriptHSTSS;
export type SEOPackage = SEOMetadata;
export type GrowthPlaybook = GrowthStrategy;
export type FeedbackAnalysis = LearningSystemState;

export interface LearningSystemState {
  totalAnalyzed: number;
  topPerformingCategories: { category: LifeProblemCategory; avgCtr: number; avgRetention: number }[];
  hookFormulaEffectiveness: { formula: string; winRate: number; recommendation: string }[];
  seoLessons: string[];
  strategicAdjustments: string[];
  lastUpdated: string;
}
