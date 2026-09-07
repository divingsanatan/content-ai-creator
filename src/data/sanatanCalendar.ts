import { CategoryDefinition } from '../types';

export interface HinduCalendarEvent {
  date: string; // YYYY-MM-DD
  name: string;
  significance: string;
  categoryRelevance: ('relationships' | 'money_business' | 'mental_health' | 'physical_health' | 'emotional_health')[];
  spiritualConcept: string;
  suggestedAngle: string;
  tithi?: string;
}

export const HINDU_CALENDAR_EVENTS: HinduCalendarEvent[] = [
  {
    date: '2026-09-07',
    name: 'Aja Ekadashi',
    significance: 'Vrata dedicated to Lord Vishnu for cleansing deep karmic debt and clearing psychological fog.',
    categoryRelevance: ['mental_health', 'emotional_health'],
    spiritualConcept: 'Karmic unburdening & Sattvic fasting (Pratyahara)',
    suggestedAngle: 'Why you feel mysteriously stuck: clearing unresolved karmic fatigue through stillness rather than force.'
  },
  {
    date: '2026-09-11',
    name: 'Bhadrapada Amavasya (Pithori Amavasya)',
    significance: 'New Moon day for ancestor remembrance (Pitru Tarpana) and resolving ancestral lineage stress.',
    categoryRelevance: ['relationships', 'emotional_health'],
    spiritualConcept: 'Pitru Karma & intergenerational family trauma healing',
    suggestedAngle: 'The unspoken relationship anxiety you inherited: how ancestral patterns repeat in your dating/marriage.'
  },
  {
    date: '2026-09-15',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    significance: 'Celebration of Lord Ganesha, remover of obstacles (Vighnaharta), awakening of Muladhara (Root Chakra).',
    categoryRelevance: ['money_business', 'physical_health'],
    spiritualConcept: 'Muladhara Chakra & dissolving subconscious fear of financial scarcity',
    suggestedAngle: 'The real reason money slips through your fingers: grounding root chakra security before expanding wealth.'
  },
  {
    date: '2026-09-22',
    name: 'Parsva Ekadashi (Padma Ekadashi)',
    significance: 'Vishnu turns on His side in Yoganidra. Ideal for deep pivot in career and emotional boundaries.',
    categoryRelevance: ['money_business', 'mental_health'],
    spiritualConcept: 'Dharmic pivot (Svadharma vs. social expectation)',
    suggestedAngle: 'Exhausted by your career? The ancient rule of Svadharma: doing your own imperfect work vs someone elses imitation.'
  },
  {
    date: '2026-09-26',
    name: 'Bhadrapada Purnima & Start of Pitru Paksha',
    significance: 'Full moon transitioning into sacred fortnight of releasing emotional grief and debt.',
    categoryRelevance: ['emotional_health', 'relationships'],
    spiritualConcept: 'Runanubandha (deep psychological & energetic soul bonds)',
    suggestedAngle: 'Why letting go of an ex feels physically painful: breaking energetic soul cords (Runanubandha) with compassion.'
  },
  {
    date: '2026-10-06',
    name: 'Indira Ekadashi (Pitru Paksha Ekadashi)',
    significance: 'One of the most potent ekadashis for clearing lingering guilt, shame, and unworthiness.',
    categoryRelevance: ['mental_health', 'emotional_health'],
    spiritualConcept: 'Praschitta (conscious release of guilt without self-flagellation)',
    suggestedAngle: 'Stop punishing yourself for mistakes from 5 years ago: the Vedic psychology of true forgiveness.'
  },
  {
    date: '2026-10-10',
    name: 'Sarva Pitru Amavasya (Mahalaya Amavasya)',
    significance: 'Culmination of Pitru Paksha. Sacred release of lineage heaviness and closing past chapters.',
    categoryRelevance: ['relationships', 'emotional_health'],
    spiritualConcept: 'Surrender to time (Kala) and lineage blessings',
    suggestedAngle: 'Ending generation-long family feuds and guilt: how honoring your roots heals your present nervous system.'
  },
  {
    date: '2026-10-11',
    name: 'Sharad Navratri Begins (Pratipada / Shailaputri Puja)',
    significance: 'Nine nights of divine feminine Shakti energy awakening, starting with grounded resilience.',
    categoryRelevance: ['mental_health', 'physical_health'],
    spiritualConcept: 'Shakti Prana & resetting chronic burnout',
    suggestedAngle: 'For when you are running on empty: activating your internal Shakti to heal chronic fight-or-flight.'
  },
  {
    date: '2026-10-20',
    name: 'Vijayadashami (Dussehra)',
    significance: 'Victory of Dharma over Adharma, light over inner darkness (tamas/asuric tendencies like ego, anger).',
    categoryRelevance: ['relationships', 'money_business', 'mental_health'],
    spiritualConcept: 'Conquering the 10 internal heads of ego/delusion (Ahamkara)',
    suggestedAngle: 'Defeating the 10 inner voices telling you youre not enough: conquering self-sabotage with purposeful action.'
  },
  {
    date: '2026-10-25',
    name: 'Sharad Purnima',
    significance: 'Full moon of divine nectar (Amrit) and Heart Chakra expansion. Calming Pitta and emotional heat.',
    categoryRelevance: ['physical_health', 'emotional_health'],
    spiritualConcept: 'Anahata Chakra & cooling emotional inflammation (Soma)',
    suggestedAngle: 'Why chronic stress shows up as acid reflux and inflammation: cooling the internal fire with Vedic practices.'
  },
  {
    date: '2026-11-08',
    name: 'Diwali (Deepavali & Lakshmi-Ganesh Puja)',
    significance: 'Welcoming true prosperity (Mahalakshmi) not just as cash, but as peace, health, and ethical abundance.',
    categoryRelevance: ['money_business', 'emotional_health'],
    spiritualConcept: 'Ashta Lakshmi & shifting from desperate scarcity to receptive abundance',
    suggestedAngle: 'Why your money manifestation rituals fail: the difference between desperate greed and true Lakshmi consciousness.'
  }
];

export const DEFAULT_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'relationships',
    label: 'Relationships',
    color: 'text-pink-400',
    bg: 'bg-pink-950/60',
    border: 'border-pink-800/60',
    description: 'Ancestral debt, Runanubandha, marriage karma, family bonds, and codependency.',
    isDefault: true,
  },
  {
    id: 'money_business',
    label: 'Money & Career',
    color: 'text-amber-400',
    bg: 'bg-amber-950/60',
    border: 'border-amber-800/60',
    description: 'Financial freeze, Muladhara survival anxiety, entrepreneurship, and ethical wealth.',
    isDefault: true,
  },
  {
    id: 'mental_health',
    label: 'Mental Health',
    color: 'text-blue-400',
    bg: 'bg-blue-950/60',
    border: 'border-blue-800/60',
    description: 'Corporate burnout, panic loops, Vata dosha deregulation, and overthinking.',
    isDefault: true,
  },
  {
    id: 'physical_health',
    label: 'Physical Health',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-800/60',
    description: 'Somatic throat knots, chronic fatigue, Prana depletion, and Ayurvedic rejuvenation.',
    isDefault: true,
  },
  {
    id: 'emotional_health',
    label: 'Emotional Health',
    color: 'text-purple-400',
    bg: 'bg-purple-950/60',
    border: 'border-purple-800/60',
    description: 'Guilt cords, grief, repressed anger, and Anahata heart chakra blockages.',
    isDefault: true,
  },
];

export const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  relationships: { label: 'Relationships', color: 'text-[#BE185D]', bg: 'bg-[#FDF2F8]', border: 'border-[#FBCFE8]' },
  money_business: { label: 'Money & Career', color: 'text-[#B45309]', bg: 'bg-[#FEF3C7]', border: 'border-[#FDE68A]' },
  mental_health: { label: 'Mental Health', color: 'text-[#1D4ED8]', bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]' },
  physical_health: { label: 'Physical Health', color: 'text-[#047857]', bg: 'bg-[#ECFDF5]', border: 'border-[#A7F3D0]' },
  emotional_health: { label: 'Emotional Health', color: 'text-[#7E22CE]', bg: 'bg-[#FAF5FF]', border: 'border-[#E9D5FF]' },
};
