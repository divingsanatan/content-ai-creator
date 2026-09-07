import { LifeProblemCategory, TopicIdea } from '../types';

export interface EngagementMetrics {
  hookCuriosity: number; // 0 - 100
  categorySynergy: number; // 0 - 100
  emotionalTension: number; // 0 - 100
  sharePotential: number; // 0 - 100
}

export interface EngagementAnalysis {
  score: number; // 0 - 100
  rating: number; // 1.0 - 5.0
  iconCount: number; // 1 - 5 filled icons
  tier: 'Viral Velocity' | 'High Surge' | 'Strong Evergreen' | 'Targeted Reach';
  tierColor: {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    iconColor: string;
    glowColor: string;
  };
  metrics: EngagementMetrics;
  keyDrivers: string[];
  rationale: string;
}

/**
 * Keywords and patterns that signal high visceral tension, curiosity gap, or emotional stakes in hooks
 */
const TENSION_KEYWORDS = [
  'freeze', 'panic', 'sabotage', 'terror', 'tight', 'silent', 'lump', 'numb',
  'exhausted', 'trauma', 'unresolved', 'debt', 'curse', 'meltdown', 'anxiety',
  'guilt', 'hyperventilate', 'knot', 'breakup', 'toxic', 'dread', 'starve', 'danger',
  'predator', 'swallowed', 'wound', 'paralysis', 'chest', 'stomach', 'heart', 'throat'
];

const TIME_OR_BODY_ANCHORS = [
  'afternoon', 'morning', 'evening', 'traffic', 'meeting', 'dinner', 'commute',
  'desk', 'airport', 'boardroom', 'chai', 'coffee', 'mirror', 'phone', 'hallway',
  'throat', 'heart', 'stomach', 'chest', 'feet', 'vocal cords', 'pelvis',
  'nervous system', 'spine', 'ribcage', 'clavicle', 'soles of my feet', 'jaw', 'breath'
];

const PROVOCATION_PATTERNS = [
  "isn't", "is not", "you inherited", "belonged to", "bad with money",
  "convinced you", "your partner", "not your", "stop trying", "myth",
  "proved", "years ago", "real reason", "truth about", "why you",
  "why does", "instead of", "pretend", "secret"
];

const NUMBER_OR_CURRENCY_PATTERNS = [
  /\b\d+\s*(am|pm|lakh|lakhs|k|hours|years|min|minutes|seconds)\b/i,
  /[$₹€]\s*\d+/i,
  /\b\d+,\d+\b/
];

/**
 * Analyzes a topic based on its hook and category to calculate its Engagement Potential
 */
export function analyzeEngagementPotential(
  hook: string,
  category: LifeProblemCategory,
  context?: {
    workingTitle?: string;
    whyNow?: string;
    festivalTie?: any;
    bestFormat?: string;
  }
): EngagementAnalysis {
  const cleanHook = (hook || '').toLowerCase();
  const cleanTitle = (context?.workingTitle || '').toLowerCase();
  const combinedText = `${cleanHook} ${cleanTitle}`;

  // 1. Hook Curiosity & Subversion Score (0 - 100)
  let curiosityPoints = 40; // baseline
  let tensionPoints = 35;
  const keyDrivers: string[] = [];

  // Check Provocation / Subversion
  let matchedProvocations = 0;
  PROVOCATION_PATTERNS.forEach(pat => {
    if (cleanHook.includes(pat)) matchedProvocations++;
  });
  if (matchedProvocations > 0) {
    const boost = Math.min(25, matchedProvocations * 12);
    curiosityPoints += boost;
    keyDrivers.push('Subversive Hook: Challenges conventional thinking or societal clichés');
  }

  // Check Visceral Tension
  let matchedTension = 0;
  TENSION_KEYWORDS.forEach(word => {
    if (cleanHook.includes(word)) matchedTension++;
  });
  if (matchedTension > 0) {
    const boost = Math.min(30, matchedTension * 10);
    tensionPoints += boost;
    keyDrivers.push('High Visceral Tension: Triggers somatic self-recognition');
  }

  // Check Real-World / Bodily Anchors
  const hasTimeOrBodyAnchor = TIME_OR_BODY_ANCHORS.some(anchor => cleanHook.includes(anchor));
  if (hasTimeOrBodyAnchor) {
    curiosityPoints += 15;
    tensionPoints += 15;
    keyDrivers.push('Sensory Real-World Anchor: Concrete physical, somatic, or everyday environmental framing');
  }

  // Check Numbers / Specificity
  const hasNumbers = NUMBER_OR_CURRENCY_PATTERNS.some(regex => regex.test(cleanHook));
  if (hasNumbers) {
    curiosityPoints += 12;
    keyDrivers.push('High-Specificity Proof: Numbers/timecodes ground the narrative');
  }

  // Length optimality: 50-140 chars is the golden zone for viral hooks
  const hookLen = hook ? hook.length : 0;
  if (hookLen >= 45 && hookLen <= 150) {
    curiosityPoints += 10;
  } else if (hookLen < 30) {
    curiosityPoints -= 10;
  }

  // 2. Category Base Engagement Dynamics & Share Potential (0 - 100)
  let categoryScore = 70;
  let sharePotential = 70;

  switch (category) {
    case 'relationships':
      categoryScore = 94;
      sharePotential = 96; // Highest viral share rate (tagging partners, interpersonal trauma)
      keyDrivers.push('Viral Category: Extreme peer shareability & relationship debate');
      break;
    case 'money_business':
      categoryScore = 93;
      sharePotential = 88; // Extreme CTR & survival urgency
      keyDrivers.push('High-CTR Category: Primal survival panic & wealth barrier confrontation');
      break;
    case 'mental_health':
      categoryScore = 91;
      sharePotential = 92; // High nocturnal retention & saved bookmarks
      keyDrivers.push('High-Save Category: Midnight search intent & deep watch-time retention');
      break;
    case 'emotional_health':
      categoryScore = 88;
      sharePotential = 90; // High emotional resonance & comments
      keyDrivers.push('Community Resonance: Deep vulnerability & somatic release');
      break;
    case 'physical_health':
      categoryScore = 85;
      sharePotential = 84; // Evergreen search longevity
      keyDrivers.push('Evergreen Velocity: Steady organic search intent across algorithms');
      break;
  }

  // 3. Category + Hook Synergy Multiplier
  let synergyBonus = 0;
  if (category === 'money_business' && (cleanHook.includes('panic') || cleanHook.includes('nervous system') || cleanHook.includes('freeze') || cleanHook.includes('safe') || cleanHook.includes('sabotage'))) {
    synergyBonus += 15;
    keyDrivers.push('Category Synergy: Paradox of financial abundance with nervous system terror');
  }
  if (category === 'relationships' && (cleanHook.includes('ancestor') || cleanHook.includes('inherited') || cleanHook.includes('mother') || cleanHook.includes('debt') || cleanHook.includes('partner'))) {
    synergyBonus += 15;
    keyDrivers.push('Category Synergy: Reframes dating frustration into deep ancestral karma');
  }
  if (category === 'mental_health' && (cleanHook.includes('heart') || cleanHook.includes('bedtime') || cleanHook.includes('racing') || cleanHook.includes('overthinking') || cleanHook.includes('freeze') || cleanHook.includes('traffic') || cleanHook.includes('panic'))) {
    synergyBonus += 15;
    keyDrivers.push('Category Synergy: Real-world nervous system & somatic vulnerability');
  }
  if (category === 'emotional_health' && (cleanHook.includes('ancestor') || cleanHook.includes('tides') || cleanHook.includes('lunar') || cleanHook.includes('karma') || cleanHook.includes('breakup'))) {
    synergyBonus += 12;
    keyDrivers.push('Category Synergy: Cosmic and somatic alignment with inner psychological release');
  }
  if (category === 'physical_health' && (cleanHook.includes('throat') || cleanHook.includes('lump') || cleanHook.includes('arguments') || cleanHook.includes('cords'))) {
    synergyBonus += 14;
    keyDrivers.push('Category Synergy: Bridges physical symptoms to repressed emotional expression');
  }

  // Festival / timely tie bonus
  if (context?.festivalTie?.eventName || context?.whyNow) {
    synergyBonus += 8;
  }

  // Clamp raw metrics to 0-100
  const hookCuriosityClamped = Math.min(100, Math.max(30, curiosityPoints));
  const emotionalTensionClamped = Math.min(100, Math.max(25, tensionPoints));
  const categorySynergyClamped = Math.min(100, Math.max(40, categoryScore + synergyBonus));
  const sharePotentialClamped = Math.min(100, Math.max(30, sharePotential + Math.floor(synergyBonus * 0.5)));

  // Weighted Total Score:
  // Hook Curiosity: 35%, Emotional Tension: 25%, Category Synergy: 25%, Share Potential: 15%
  const compositeScore = Math.round(
    hookCuriosityClamped * 0.35 +
    emotionalTensionClamped * 0.25 +
    categorySynergyClamped * 0.25 +
    sharePotentialClamped * 0.15
  );

  const finalScore = Math.min(99, Math.max(55, compositeScore));

  // Rating out of 5 (e.g. 4.9, 4.6, etc.)
  const rating = Number((finalScore / 20).toFixed(1));
  const iconCount = Math.min(5, Math.max(1, Math.round(rating)));

  // Determine Tier & Visual Aesthetics
  let tier: EngagementAnalysis['tier'] = 'Strong Evergreen';
  let tierColor = {
    badgeBg: 'bg-emerald-950/40',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-800/60',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/10'
  };

  if (finalScore >= 92) {
    tier = 'Viral Velocity';
    tierColor = {
      badgeBg: 'bg-rose-950/40',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-800/60',
      iconColor: 'text-rose-400',
      glowColor: 'shadow-rose-500/20'
    };
  } else if (finalScore >= 84) {
    tier = 'High Surge';
    tierColor = {
      badgeBg: 'bg-amber-950/40',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-800/60',
      iconColor: 'text-amber-400',
      glowColor: 'shadow-amber-500/20'
    };
  } else if (finalScore >= 75) {
    tier = 'Strong Evergreen';
    tierColor = {
      badgeBg: 'bg-cyan-950/40',
      badgeText: 'text-cyan-300',
      badgeBorder: 'border-cyan-800/60',
      iconColor: 'text-cyan-400',
      glowColor: 'shadow-cyan-500/15'
    };
  } else {
    tier = 'Targeted Reach';
    tierColor = {
      badgeBg: 'bg-slate-900',
      badgeText: 'text-slate-300',
      badgeBorder: 'border-slate-800',
      iconColor: 'text-slate-400',
      glowColor: 'shadow-transparent'
    };
  }

  // Formulate concise rationale
  let rationale = '';
  if (tier === 'Viral Velocity') {
    rationale = `Exceptional engagement potential (${finalScore}%). The hook pairs an acute visceral contradiction with the high-retention dynamics of ${category.replace('_', ' ')}. Strong viewer retention and peer-sharing velocity expected.`;
  } else if (tier === 'High Surge') {
    rationale = `High engagement potential (${finalScore}%). Strong emotional resonance and curiosity gap. The hook directly targets a specific somatic pain point, driving strong CTR and comment discussions.`;
  } else if (tier === 'Strong Evergreen') {
    rationale = `Solid evergreen potential (${finalScore}%). Consistent long-tail search intent with steady algorithmic discoverability over months.`;
  } else {
    rationale = `Targeted engagement potential (${finalScore}%). Clear audience focus with strong alignment for niche problem-seekers.`;
  }

  return {
    score: finalScore,
    rating,
    iconCount,
    tier,
    tierColor,
    metrics: {
      hookCuriosity: hookCuriosityClamped,
      categorySynergy: categorySynergyClamped,
      emotionalTension: emotionalTensionClamped,
      sharePotential: sharePotentialClamped
    },
    keyDrivers: keyDrivers.slice(0, 3),
    rationale
  };
}
