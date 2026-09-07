import fs from 'fs';
import path from 'path';
import { getSupabaseClient } from './supabase.js';
import { 
  TopicIdea, 
  CalendarItem, 
  PerformanceFeedbackLog, 
  LearningSystemState, 
  ScriptPackage,
  CreatorMindsetProfile,
  CreatorMindsetRule,
  CategoryDefinition
} from '../src/types.js';

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(STORE_DIR, 'content_store.json');

// Base categories persisted across app
const BASE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'relationships',
    label: 'Relationships',
    color: 'text-pink-400',
    bg: 'bg-pink-950/60',
    border: 'border-pink-800/60',
    description: 'Ancestral debt, Runanubandha, marriage karma, family bonds, and codependency.',
    isDefault: true,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'money_business',
    label: 'Money & Career',
    color: 'text-amber-400',
    bg: 'bg-amber-950/60',
    border: 'border-amber-800/60',
    description: 'Financial freeze, Muladhara survival anxiety, entrepreneurship, and ethical wealth.',
    isDefault: true,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'mental_health',
    label: 'Mental Health',
    color: 'text-blue-400',
    bg: 'bg-blue-950/60',
    border: 'border-blue-800/60',
    description: 'Corporate burnout, panic loops, Vata dosha deregulation, and overthinking.',
    isDefault: true,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'physical_health',
    label: 'Physical Health',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-800/60',
    description: 'Somatic throat knots, chronic fatigue, Prana depletion, and Ayurvedic rejuvenation.',
    isDefault: true,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'emotional_health',
    label: 'Emotional Health',
    color: 'text-purple-400',
    bg: 'bg-purple-950/60',
    border: 'border-purple-800/60',
    description: 'Guilt cords, grief, repressed anger, and Anahata heart chakra blockages.',
    isDefault: true,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
];

// Base initial data loaded in memory as persistence foundation
const BASE_TOPICS: TopicIdea[] = [
  {
    id: 'topic-1',
    workingTitle: 'Why You Freeze When You Get Money: Healing Root Panic',
    category: 'money_business',
    concept: 'Muladhara Chakra & dissolving survival anxiety',
    whyNow: 'Aligns with Ganesh Chaturthi season & surging queries on post-payday anxiety',
    bestFormat: 'long-form YouTube',
    hook: 'Your bank account isn\'t empty because you\'re bad with money — it\'s empty because having cash makes your nervous system feel unsafe.',
    festivalTie: {
      eventName: 'Ganesh Chaturthi (Vinayaka Chavithi)',
      tithiOrDate: '2026-09-15',
      isVerified: true,
      reasoning: 'Ganesha presides over the Muladhara (root) chakra. Anchoring financial security before expansion.'
    },
    status: 'scripted'
  },
  {
    id: 'topic-2',
    workingTitle: 'The Relationship Anxiety You Inherited From Ancestors',
    category: 'relationships',
    concept: 'Pitru Karma & Intergenerational Runanubandha',
    whyNow: 'Tied to upcoming Bhadrapada Amavasya & Pitru Paksha cycle',
    bestFormat: 'long-form YouTube',
    hook: 'The terror you feel whenever your partner pulls away isn\'t yours — it belonged to your grandmother.',
    festivalTie: {
      eventName: 'Bhadrapada Amavasya (Pithori Amavasya)',
      tithiOrDate: '2026-09-11',
      isVerified: true,
      reasoning: 'Ancestral remembrance fortnight begins; resolving inherited family marriage trauma.'
    },
    status: 'in_progress'
  },
  {
    id: 'topic-3',
    workingTitle: 'Why You Freeze in Social Situations: The Vata-Heart Reset',
    category: 'mental_health',
    concept: 'Ayurvedic Vata Kala & Anahata Prana grounding (Padabhyanga)',
    whyNow: 'Trending search term across Google & Reddit health anxiety forums (+85%)',
    bestFormat: 'long-form YouTube',
    hook: 'That sudden wave of chest tightness and breath-holding in crowded rooms isn\'t social awkwardness — it\'s your nervous system begging for this ancient grounding ritual.',
    festivalTie: {
      eventName: 'Aja Ekadashi',
      tithiOrDate: '2026-09-07',
      isVerified: true,
      reasoning: 'Ekadashi fasting and mental detox naturally pairs with nocturnal nervous system recovery.'
    },
    status: 'scripted'
  },
  {
    id: 'topic-4',
    workingTitle: 'Why You Keep Attracting Partners You Have to Mother',
    category: 'relationships',
    concept: 'Runanubandha cords & inverting the Shakti-Shiva dynamic',
    whyNow: 'High-volume recurring Reddit & IG discussion on hyper-independence in dating',
    bestFormat: 'long-form YouTube',
    hook: 'If you have to manage your partner like an employee, you didn\'t fall in love — your unresolved childhood debt recruited a project.',
    status: 'backlog'
  },
  {
    id: 'topic-5',
    workingTitle: 'The Silent Throat Lump: Releasing Unspoken Boundaries',
    category: 'physical_health',
    concept: 'Vishuddha Chakra unblocking & Shankha Mudra somatic release',
    whyNow: 'Somatic health anxiety search surge (+38%) with clear medical test results',
    bestFormat: 'long-form YouTube',
    hook: 'That tight lump in your throat isn\'t an illness — it is five years of swallowed arguments living in your vocal cords.',
    status: 'backlog'
  },
  {
    id: 'topic-6',
    workingTitle: 'The Gita Rule for Corporate Layoff Dread & Career Panic',
    category: 'money_business',
    concept: 'Gita Ch. 2 Verse 47 (Nishkama Karma) translated for corporate dread',
    whyNow: 'Widespread corporate anxiety and trending Quora discussions on career burnout',
    bestFormat: 'long-form YouTube',
    hook: 'The corporate world convinced you that anxiety equals ambition — the Bhagavad Gita proved 5,000 years ago it\'s actually self-sabotage.',
    status: 'backlog'
  },
  {
    id: 'topic-7',
    workingTitle: 'Why You Feel Emotional Fog on Ekadashi: Fasting Your Mind',
    category: 'emotional_health',
    concept: 'Pratyahara & Sattvic psychological detox during lunar tides',
    whyNow: 'Direct seasonal relevance for upcoming Aja & Parsva Ekadashi',
    bestFormat: 'carousel-only',
    hook: 'During lunar shifts, your subconscious emotions surface like ocean tides. Here is how to digest them without a meltdown.',
    status: 'backlog'
  },
  {
    id: 'topic-8',
    workingTitle: 'Stop Blaming Your Zodiac Sign: The Real Law of Prarabdha',
    category: 'emotional_health',
    concept: 'Differentiating Prarabdha (fate) from Kriyamana (present free will)',
    whyNow: 'Viral reaction format on Reels challenging fatalistic pop astrology',
    bestFormat: 'Short-only',
    hook: 'Your birth chart isn\'t a prison sentence; it\'s just the weather report for your soul\'s road trip.',
    status: 'backlog'
  },
  {
    id: 'topic-9',
    workingTitle: 'Emotional Numbness & Heartbreak: Releasing Pelvic Grief',
    category: 'emotional_health',
    concept: 'Svadhishthana Chakra & Jala Tattva (Water Element) flow restoration',
    whyNow: 'High searches on emotional detachment, post-breakup numbness, and pelvic tension',
    bestFormat: 'long-form YouTube',
    hook: 'Why trying to be strong after a breakup is causing chronic pelvic and gut numbness.',
    status: 'in_progress'
  },
  {
    id: 'topic-10',
    workingTitle: 'Why You Freeze When You Sit Down to Work (Solar Plexus Burnout)',
    category: 'mental_health',
    concept: 'Manipura Chakra depletion & Jatharagni restoration',
    whyNow: 'Procrastination guilt and executive dysfunction search trends up 72%',
    bestFormat: 'long-form YouTube',
    hook: 'You are not lazy or undisciplined — your fire center exhausted its fuel trying to please everyone.',
    status: 'backlog'
  }
];

const BASE_CALENDAR: CalendarItem[] = [
  // --- WEEK 1 (Sep 07 - Sep 13): Friday YouTube Anchor Drop (Sept 11th) ---
  {
    id: 'cal-w1-reel1',
    date: '2026-09-07',
    dayOfWeek: 'Monday',
    festivalOrTithi: 'Aja Ekadashi',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 1: The $45k Afternoon Payday Freeze (Hook Cut)',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Cut from Sept 11 main video: Nakul pacing in parking lot after contract signing. Soft CTA: Full video drops Friday on YouTube.'
  },
  {
    id: 'cal-w1-reel2',
    date: '2026-09-08',
    dayOfWeek: 'Tuesday',
    festivalOrTithi: 'Post-Ekadashi Parana',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 2: Nakul vs Nikhil - Why Budgeting Won\'t Fix Root Fear (Dialogue Cut)',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Cut from Sept 11 main video: Clash between surface advice and deep Muladhara survival fear. Drops Friday on YouTube.'
  },
  {
    id: 'cal-w1-reel3',
    date: '2026-09-09',
    dayOfWeek: 'Wednesday',
    festivalOrTithi: 'Pradosh Vrat',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 3: 3 Somatic Shifts to Unfreeze Your Nervous System (Body Cut)',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Cut from Sept 11 main video: Annamaya Kosha pelvic grounding and diaphragmatic reset. Coming Friday to YouTube.'
  },
  {
    id: 'cal-w1-reel4',
    date: '2026-09-10',
    dayOfWeek: 'Thursday',
    festivalOrTithi: 'Pre-Bhadrapada Amavasya',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 4: Ancient Shlok Resolution - Gita 2.47 in 50 Seconds (Pre-Release Cut)',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Cut from Sept 11 main video: Sanskrit chanting by Nikhil with modern corporate reframing. Tomorrow: Full 14-min Masterclass!'
  },
  {
    id: 'cal-w1-pillar',
    date: '2026-09-11',
    dayOfWeek: 'Friday',
    festivalOrTithi: 'Bhadrapada Amavasya (Pithori Amavasya)',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Why You Freeze When You Get Money: Healing Root Panic',
    category: 'money_business',
    status: 'Scheduled',
    notes: '🏆 WEEK 1 YOUTUBE PILLAR ANCHOR (14 min). Masterclass featuring Nakul & Nikhil dynamic dialogue, Gita 2.47 grounding, and full consultation CTA ladder.'
  },
  {
    id: 'cal-w1-quora1',
    date: '2026-09-12',
    dayOfWeek: 'Saturday',
    festivalOrTithi: 'Shani Amavasya Eve',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Answering "Why do I feel intense panic and anxiety right after getting paid?"',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Weekend Quora distribution: High-intent answer explaining somatic survival freeze, providing actionable takeaways, and embedding link to the Friday YouTube video.'
  },
  {
    id: 'cal-w1-quora2',
    date: '2026-09-13',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Shani Amavasya (Sanatan Grounding)',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Deep-Dive Case Study on Muladhara Survival Freeze & Reconditioning the Nervous System',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Weekend Quora distribution: Long-tail authority post on "Can nervous system regulation heal financial self-sabotage?", routing readers to Friday\'s YouTube anchor.'
  },

  // --- WEEK 2 (Sep 14 - Sep 20): Friday YouTube Anchor Drop (Sept 18th) ---
  {
    id: 'cal-w2-reel1',
    date: '2026-09-14',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 1: Sudden Workday Panic in High-Stakes Meetings (Hook Cut)',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Cut from Sep 18 main video: Nakul describing sudden chest tightness during afternoon presentation. Full video Friday on YouTube.'
  },
  {
    id: 'cal-w2-reel2',
    date: '2026-09-15',
    dayOfWeek: 'Tuesday',
    festivalOrTithi: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 2: Nakul vs Nikhil - The Vata Spike Explained (Dialogue Cut)',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Cut from Sep 18 main video: Why talk therapy fails when the nervous system enters Vata fight-or-flight. Friday on YouTube.'
  },
  {
    id: 'cal-w2-reel3',
    date: '2026-09-16',
    dayOfWeek: 'Wednesday',
    festivalOrTithi: 'Rishi Panchami',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 3: The 3-Minute Vata-Heart Somatic Reset (Body Cut)',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Cut from Sep 18 main video: Padabhyanga and Anahata grounding technique for immediate boardroom relief. Friday on YouTube.'
  },
  {
    id: 'cal-w2-reel4',
    date: '2026-09-17',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 4: Ancient Wisdom for Corporate Survival (Pre-Release Cut)',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Cut from Sep 18 main video: Nikhil chanting the Prana Sukta grounding shlok. Full video drops tomorrow!'
  },
  {
    id: 'cal-w2-pillar',
    date: '2026-09-18',
    dayOfWeek: 'Friday',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Sudden Workday Panic and Freeze: The Vata-Heart Reset',
    category: 'mental_health',
    status: 'Scheduled',
    notes: '🏆 WEEK 2 YOUTUBE PILLAR ANCHOR (13 min). Full dual-character breakdown on corporate anxiety and somatic regulation with consultation CTA.'
  },
  {
    id: 'cal-w2-quora1',
    date: '2026-09-19',
    dayOfWeek: 'Saturday',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Answering "Why do I get chest tightness and breath-holding in office meetings?"',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Weekend Quora marketing: High-intent answers routing corporate professionals to the Friday YouTube video.'
  },
  {
    id: 'cal-w2-quora2',
    date: '2026-09-20',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Parsva Ekadashi',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Deep-Dive on Vata Dosha Circadian Rhythms & Executive Burnout',
    category: 'mental_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Weekend Quora marketing: Evergreen authority article driving organic search traffic to the Friday YouTube video.'
  },

  // --- WEEK 3 (Sep 21 - Sep 27): Friday YouTube Anchor Drop (Sept 25th) ---
  {
    id: 'cal-w3-reel1',
    date: '2026-09-21',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 1: Managing Your Partner Like an Employee Isn\'t Love (Hook Cut)',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Cut from Sep 25 main video: Nakul confessing chronic caretaking fatigue in dating. Full video drops Friday on YouTube.'
  },
  {
    id: 'cal-w3-reel2',
    date: '2026-09-22',
    dayOfWeek: 'Tuesday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 2: Nakul vs Nikhil - The Karmic Recruiter Trap (Dialogue Cut)',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Cut from Sep 25 main video: Unpacking how childhood emotional debt attracts adult projects. Friday on YouTube.'
  },
  {
    id: 'cal-w3-reel3',
    date: '2026-09-23',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 3: Releasing Pelvic & Sacral Guilt Cords (Body Cut)',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Cut from Sep 25 main video: Somatic boundary practice to disengage from hyper-responsibility. Friday on YouTube.'
  },
  {
    id: 'cal-w3-reel4',
    date: '2026-09-24',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 4: Runanubandha & Restoring Receptive Shakti (Pre-Release Cut)',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Cut from Sep 25 main video: Scriptural grounding on karmic debt. Tomorrow: Full 15-min Masterclass!'
  },
  {
    id: 'cal-w3-pillar',
    date: '2026-09-25',
    dayOfWeek: 'Friday',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Why You Attract Partners You Have to Mother: Runanubandha Debt',
    category: 'relationships',
    status: 'Scheduled',
    notes: '🏆 WEEK 3 YOUTUBE PILLAR ANCHOR (15 min). Comprehensive guide to breaking codependent maternal loops in relationships.'
  },
  {
    id: 'cal-w3-quora1',
    date: '2026-09-26',
    dayOfWeek: 'Saturday',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Answering "Why do I feel obligated to fix and manage every person I date?"',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Weekend Quora marketing: High-intent relationship advice answer linking to Friday\'s YouTube video.'
  },
  {
    id: 'cal-w3-quora2',
    date: '2026-09-27',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Anant Chaturdashi',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: The Vedic Concept of Runanubandha: How Unresolved Past Debts Create Relationship Traps',
    category: 'relationships',
    status: 'Scheduled',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Weekend Quora marketing: Deep-dive philosophical breakdown channeling readers to the Friday YouTube video.'
  },

  // --- WEEK 4 (Sep 28 - Oct 04): Friday YouTube Anchor Drop (Oct 02nd) ---
  {
    id: 'cal-w4-reel1',
    date: '2026-09-28',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 1: That Lump in Your Throat Is 5 Years of Swallowed Arguments (Hook Cut)',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Cut from Oct 02 main video: Visceral sensation of throat tightness before high-stakes confrontations. Full video Friday on YouTube.'
  },
  {
    id: 'cal-w4-reel2',
    date: '2026-09-29',
    dayOfWeek: 'Tuesday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 2: Nakul vs Nikhil - Why People-Pleasing Freezes Your Vocal Cords (Dialogue Cut)',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Cut from Oct 02 main video: Nakul\'s fear of abandonment vs Nikhil\'s teaching on Satya (truth). Friday on YouTube.'
  },
  {
    id: 'cal-w4-reel3',
    date: '2026-09-30',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 3: Shankha Mudra & 2-Minute Vishuddha Vocal Release (Body Cut)',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Cut from Oct 02 main video: Somatic hand mudra and vocal humming to release chronic neck tension. Friday on YouTube.'
  },
  {
    id: 'cal-w4-reel4',
    date: '2026-10-01',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Reel 4: Taittiriya Upanishad on Truth & Speech Power (Pre-Release Cut)',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Cut from Oct 02 main video: Satyam Vada Dharmam Chara distillation. Tomorrow: Full 12-min Masterclass!'
  },
  {
    id: 'cal-w4-pillar',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'The Silent Throat Lump: Releasing Unspoken Boundaries',
    category: 'physical_health',
    status: 'Scheduled',
    notes: '🏆 WEEK 4 YOUTUBE PILLAR ANCHOR (12 min). Somatic Vishuddha Chakra and boundary vocalization guide with consultation CTA.'
  },
  {
    id: 'cal-w4-quora1',
    date: '2026-10-03',
    dayOfWeek: 'Saturday',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Answering "Why does my throat feel like it\'s closing up when I try to speak up for myself?"',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Weekend Quora marketing: High-intent answers explaining the somatic anatomy of suppressed boundaries, routing readers to Friday\'s YouTube video.'
  },
  {
    id: 'cal-w4-quora2',
    date: '2026-10-04',
    dayOfWeek: 'Sunday',
    platform: 'Quora',
    contentType: 'Quora Marketing',
    title: 'Quora Marketing: Deep-Dive on Vishuddha Chakra Somatics & Overcoming Lifelong Conflict Avoidance',
    category: 'physical_health',
    status: 'Scheduled',
    parentLongformId: 'cal-w4-pillar',
    notes: 'Weekend Quora marketing: Comprehensive long-tail post channeling authority search traffic into the Friday YouTube video.'
  }
];

const BASE_FEEDBACK_LOGS: PerformanceFeedbackLog[] = [
  {
    id: 'log-1',
    contentTitle: 'Why You Freeze When You Get Money (Long-form)',
    category: 'money_business',
    platform: 'YouTube',
    format: 'Long-form',
    publishDate: '2026-08-20',
    loggedAt: '2026-08-22',
    views: 48500,
    ctrPercent: 9.2,
    avgWatchTimePercent: 54.8,
    saves: 3120,
    consultationClicks: 42,
    userObservations: 'Spectacular retention during the real-world physical description of the panic attack after signing the big contract in the afternoon café. Viewers loved the collision hook ("I walked out of a $20k deal signing with nausea"). Led to 42 consultation link clicks!',
    whatWorked: 'Visceral physical description of somatic stomach burn in broad daylight, Nakul pacing frantically on Camera Left before Nikhil delivered Bhagavad Gita 2.47 grounding.',
    whatFailed: 'First 20 seconds needed slightly tighter pacing; cut out long intro preamble.',
    aiLearnedInsights: 'Hook Formula: Collision of high-status achievement with somatic terror outperformed spiritual theory by +41% CTR. Consult CTA framing around financial-emotional survival converted highest.'
  },
  {
    id: 'log-2',
    contentTitle: '5 Signs Your Sacral Chakra Is Blocked After Breakup',
    category: 'relationships',
    platform: 'Pinterest',
    format: 'Pin',
    publishDate: '2026-08-15',
    loggedAt: '2026-08-17',
    views: 89000,
    ctrPercent: 6.4,
    avgWatchTimePercent: 0,
    saves: 8400,
    consultationClicks: 18,
    userObservations: 'Pins with symptom-first title ("Why You Feel Numb in Your Pelvis After Breakup") saved 3x more than pins titled "Sacral Chakra Balance Guide".',
    whatWorked: 'Warm terracotta image aesthetic and symptom-first copy ("numb after breakup").',
    whatFailed: 'Generic abstract mandala images got 80% fewer clicks.',
    aiLearnedInsights: 'Pinterest SEO Lesson: Symptom search phrasing ("feel numb after breakup") drives viral saves; spiritual keywords act best as secondary qualifiers in description.'
  },
  {
    id: 'log-3',
    contentTitle: 'The Ancient Rule of Svadharma for Tech Layoff Burnout',
    category: 'money_business',
    platform: 'YouTube',
    format: 'Long-form',
    publishDate: '2026-08-08',
    loggedAt: '2026-08-10',
    views: 22100,
    ctrPercent: 4.8,
    avgWatchTimePercent: 61.2,
    saves: 1450,
    consultationClicks: 29,
    userObservations: 'Watch time was phenomenal (61%), but initial CTR was slightly lower (4.8%) because the word "Svadharma" in the title scared off secular viewers.',
    whatWorked: 'Tech layoff narrative resonated deeply; audience shared in LinkedIn and Reddit.',
    whatFailed: 'Using Sanskrit term "Svadharma" in primary title hurt CTR; should have kept it to "Tech Layoff Identity Loss".',
    aiLearnedInsights: 'Title Adaptation Rule: Front-load the modern crisis ("Tech Layoff Dread") before introducing Sanskrit terms in title. Reserve deep Vedic terminology for the Turn and Shatter.'
  },
  {
    id: 'log-4',
    contentTitle: 'Why You Attract Partners You Mother (Short)',
    category: 'relationships',
    platform: 'Instagram',
    format: 'Short/Reel',
    publishDate: '2026-08-27',
    loggedAt: '2026-08-29',
    views: 114000,
    ctrPercent: 11.2,
    avgWatchTimePercent: 92.5,
    saves: 12800,
    consultationClicks: 55,
    userObservations: 'Comments blew up with women sharing their exact relationship patterns. Traffic driven to YouTube full video was 4x higher than usual.',
    whatWorked: 'Opening line ("If you are teaching a grown man how to wash a plate...") stopped scroll instantly.',
    whatFailed: 'Do not put link in caption; keep repeating "Link in Bio" as on-screen text.',
    aiLearnedInsights: 'Conversion Funnel Success: Keeping Instagram strictly focused on driving to YouTube bio without direct consult booking worked as planned — viewers watched the long-form video, where the consultation ask landed naturally.'
  }
];

const BASE_LEARNING_STATE: LearningSystemState = {
  totalAnalyzed: 4,
  topPerformingCategories: [
    { category: 'relationships', avgCtr: 8.8, avgRetention: 92.5 },
    { category: 'money_business', avgCtr: 7.0, avgRetention: 58.0 },
    { category: 'mental_health', avgCtr: 7.5, avgRetention: 52.0 },
    { category: 'emotional_health', avgCtr: 6.8, avgRetention: 55.0 },
    { category: 'physical_health', avgCtr: 6.2, avgRetention: 48.0 }
  ],
  hookFormulaEffectiveness: [
    { formula: 'Idea Collision (High achievement vs visceral terror)', winRate: 91, recommendation: 'Keep pairing modern success markers with hidden somatic suffering.' },
    { formula: 'First-Person Lived Vulnerability ("What my biggest breakdown taught me")', winRate: 92, recommendation: 'Lead with authentic personal mistakes, trials, and hard-earned learnings in everyday settings.' },
    { formula: 'Ancestral lineage mirror ("What you inherited")', winRate: 80, recommendation: 'Deploy during Amavasya / Pitru Paksha season for peak resonance.' }
  ],
  seoLessons: [
    'Always lead titles with the problem or symptom search query rather than the Sanskrit concept alone.',
    'Include at least 2 problem-specific search tags alongside spiritual terms in every tag set.',
    'Pins with warm terracotta and earthy tones scored 34% higher saves than bright neon purple.',
    'Maintain strict funnel discipline: Instagram/Pinterest soft-CTA to YouTube yields higher quality consult bookings than premature direct booking links.'
  ],
  strategicAdjustments: [
    'Prioritize 12-15 min YouTube long-form anchored in personal client stories over theoretical overviews.',
    'Ensure every script embeds the exact 3-step CTA ladder: 1. Share, 2. Problem-specific consultation offer, 3. Next video hook-loop.',
    'Ensure all calendar dates cross-check with Hindu tithis so topics harmonize with cosmic lunar cycles.'
  ],
  lastUpdated: new Date().toISOString().split('T')[0]
};

const BASE_CREATOR_MINDSET: CreatorMindsetProfile = {
  creatorArchetype: 'Somatic Vedic Realist & Relatable Sufferer Mirror (Nakul & Nikhil Dual Persona)',
  learnedRules: [
    {
      id: 'rule-1',
      category: 'hook_psychology',
      rule: 'Anchor stories in authentic personal experience and diverse real-world settings (afternoon meetings, commute in traffic, dining with family, morning chai, quiet desk moment). Strictly avoid repeating the clichéd "2 AM / 3 AM panic" or "bathroom floor" tropes. Prioritize novelty, first-person vulnerability, and sharing what you personally learned from your own trials.',
      sourceIdeaOrBrief: 'Authentic creator lived experience mandate',
      learnedAt: '2026-09-01'
    },
    {
      id: 'rule-2',
      category: 'voice_and_tone',
      rule: 'Nakul must speak in breathless, relatable, cynical Hinglish that questions spiritual clichés directly ("So I should just manifest my rent away?!").',
      sourceIdeaOrBrief: 'Dual-character dynamic mandate',
      learnedAt: '2026-09-01'
    },
    {
      id: 'rule-3',
      category: 'spiritual_grounding',
      rule: 'Nikhil never patronizes or preaches; he meets Nakul with unshakeable calm (Sthira), quotes authentic Sanskrit shloks, and explains them in grounded everyday Hinglish.',
      sourceIdeaOrBrief: 'Nikhil character formulation',
      learnedAt: '2026-09-02'
    },
    {
      id: 'rule-4',
      category: 'creator_obsession',
      rule: 'Deconstruct money dysregulation through Muladhara (Root Chakra) safety alarms rather than generic prosperity consciousness.',
      sourceIdeaOrBrief: 'Why You Freeze When You Get Money brief',
      learnedAt: '2026-09-03'
    },
    {
      id: 'rule-5',
      category: 'creator_obsession',
      rule: 'Diagnose relationship codependency and "mothering partners" as Runanubandha karmic debt mirrors with Katha Upanishad boundaries.',
      sourceIdeaOrBrief: 'Why You Attract Partners You Mother brief',
      learnedAt: '2026-09-04'
    },
    {
      id: 'rule-6',
      category: 'format_and_pacing',
      rule: 'Every long-form script must embed 3 high-voltage Reel cuts with timestamps and on-screen hook captions for frictionless multi-platform atomization.',
      sourceIdeaOrBrief: 'Production workflow optimization',
      learnedAt: '2026-09-04'
    }
  ],
  recurringThemes: [
    'The Paradox of Success: Signing dream clients or financial windfalls only to feel sudden unworthiness and somatic freeze (Muladhara safety dysregulation)',
    'The High-Functioning Workplace Freeze: Outwardly nodding through afternoon business meetings while the diaphragm quietly locks (Solar Plexus constriction)',
    'The Spiritual Bypassing Trap: Confessions of using meditation and chanting to avoid real grounded boundaries and difficult conversations',
    'Millennial relationship burnout, hyper-independence & emotional caretaking (Runanubandha debt)',
    'Corporate layoff identity collapse vs Gita 3.35 Svadharma',
    'Living in chronic fight-or-flight while driving in commute or standing in grocery lines (Annamaya Kosha nervous system overload)'
  ],
  nakulDirectingNotes: [
    'Speed: Fast, anxious, rapid pacing, breathless Hinglish',
    'Body language: Pacing on Camera Left, running hands through hair, checking phone nervously',
    'Psychology: Expresses the exact thoughts the audience is ashamed to admit out loud'
  ],
  nikhilDirectingNotes: [
    'Tone: Deep chest-resonant voice, calm pauses, steady eye contact, slight knowing smile',
    'Body language: Upright spine on Camera Right, grounded stillness, zero defensive reaction',
    'Psychology: Pierces Nakul\'s intellectual defense with a single precise Vedic principle'
  ],
  customMindsetGuidance: 'I want my content to bridge raw, unfiltered human suffering with ancient Vedic psychology. Never be toxic positive or preachy. Keep it funny, painfully honest, and somatic.',
  totalIdeasLearnedFrom: 5,
  lastUpdated: new Date().toISOString().split('T')[0]
};

// Runtime in-memory cache synchronized with Supabase & local disk store
class PersistenceStore {
  private categories: CategoryDefinition[] = [...BASE_CATEGORIES];
  private topics: TopicIdea[] = [...BASE_TOPICS];
  private scripts: Map<string, ScriptPackage> = new Map();
  private calendar: CalendarItem[] = [...BASE_CALENDAR];
  private feedbackLogs: PerformanceFeedbackLog[] = [...BASE_FEEDBACK_LOGS];
  private learningState: LearningSystemState = { ...BASE_LEARNING_STATE };
  private creatorMindset: CreatorMindsetProfile = { ...BASE_CREATOR_MINDSET };
  private activeScriptId: string = 'topic-1';

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          const existingIds = new Set(data.categories.map((c: CategoryDefinition) => c.id));
          const missingBase = BASE_CATEGORIES.filter(bc => !existingIds.has(bc.id));
          this.categories = [...data.categories, ...missingBase];
        } else {
          this.categories = [...BASE_CATEGORIES];
        }
        if (Array.isArray(data.topics) && data.topics.length > 0) {
          // Merge with BASE_TOPICS to guarantee no base topic is ever missing
          const existingIds = new Set(data.topics.map((t: TopicIdea) => t.id));
          const missingBase = BASE_TOPICS.filter(bt => !existingIds.has(bt.id));
          this.topics = [...data.topics, ...missingBase];
        }
        if (Array.isArray(data.calendar) && data.calendar.length >= 20) {
          this.calendar = data.calendar;
        } else {
          this.calendar = BASE_CALENDAR;
          this.saveToDisk();
        }
        if (Array.isArray(data.feedbackLogs) && data.feedbackLogs.length > 0) {
          this.feedbackLogs = data.feedbackLogs;
        }
        if (data.learningState && data.learningState.seoLessons) {
          this.learningState = data.learningState;
        }
        if (data.creatorMindset && data.creatorMindset.creatorArchetype) {
          this.creatorMindset = data.creatorMindset;
        }
        if (Array.isArray(data.scripts)) {
          this.scripts = new Map(data.scripts);
        }
        if (data.activeScriptId) {
          this.activeScriptId = data.activeScriptId;
        }
        console.log(`[PersistenceStore] Loaded ${this.categories.length} categories, ${this.topics.length} topics and ${this.calendar.length} calendar items from disk`);
      } else {
        this.saveToDisk();
      }
    } catch (err) {
      console.warn('[PersistenceStore] Failed to load store from disk:', err);
    }
  }

  private saveToDisk() {
    try {
      if (!fs.existsSync(STORE_DIR)) {
        fs.mkdirSync(STORE_DIR, { recursive: true });
      }
      const payload = {
        categories: this.categories,
        topics: this.topics,
        calendar: this.calendar,
        feedbackLogs: this.feedbackLogs,
        learningState: this.learningState,
        creatorMindset: this.creatorMindset,
        scripts: Array.from(this.scripts.entries()),
        activeScriptId: this.activeScriptId,
        lastSaved: new Date().toISOString()
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[PersistenceStore] Failed to save store to disk:', err);
    }
  }

  // --- TOPICS ---
  async getTopics(): Promise<TopicIdea[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('content_topics')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: TopicIdea[] = data.map((row: any) => ({
            id: row.id,
            workingTitle: row.working_title,
            category: row.category,
            concept: row.sanatan_concept || '',
            whyNow: row.why_now || '',
            bestFormat: row.best_format || 'long-form YouTube',
            hook: row.hook || '',
            status: row.status || 'idea'
          }));
          this.topics = mapped;
          this.saveToDisk();
          return mapped;
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase topics read fallback:', err);
      }
    }
    return this.topics;
  }

  async saveTopics(topics: TopicIdea[]): Promise<boolean> {
    this.topics = topics;
    this.saveToDisk();
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const rows = topics.map(t => ({
          id: t.id,
          working_title: t.workingTitle,
          category: t.category,
          hook: t.hook || '',
          why_now: t.whyNow || '',
          sanatan_concept: t.concept || '',
          scripture_anchor: t.concept || '',
          best_format: t.bestFormat || 'long-form YouTube',
          status: t.status || 'idea',
          updated_at: new Date().toISOString()
        }));

        const { error } = await supabase
          .from('content_topics')
          .upsert(rows, { onConflict: 'id' });

        if (error) {
          console.warn('[PersistenceStore] Supabase topics upsert warning:', error.message);
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase topics write error:', err);
      }
    }
    return true;
  }

  // --- SCRIPTS ---
  async getScript(scriptId?: string): Promise<ScriptPackage | null> {
    const targetId = scriptId || this.activeScriptId;
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('content_scripts')
          .select('*')
          .eq('id', targetId)
          .maybeSingle();

        if (!error && data) {
          const pkg: ScriptPackage = {
            id: data.id,
            topic: data.topic_title || '',
            topicTitle: data.topic_title,
            category: data.category,
            concept: data.sanatan_concept || '',
            dialogueScript: data.full_dialogue || [],
            reelCuts: data.reel_cuts || [],
            directingGuide: data.five_beat_framework?.directingGuide,
            shlokCard: data.five_beat_framework?.shlokCard,
            hook: data.five_beat_framework?.hook,
            stakes: data.five_beat_framework?.stakes,
            turn: data.five_beat_framework?.turn,
            scene: data.five_beat_framework?.scene,
            shatter: data.five_beat_framework?.shatter,
            ctaLadder: data.cta_ladder,
            shortScript: data.short_script
          };
          this.scripts.set(data.id, pkg);
          return pkg;
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase script read fallback:', err);
      }
    }
    return this.scripts.get(targetId) || null;
  }

  async saveScript(pkg: ScriptPackage): Promise<boolean> {
    const id = pkg.id || 'topic-1';
    this.scripts.set(id, pkg);
    this.activeScriptId = id;
    this.saveToDisk();

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const row = {
          id,
          topic_title: pkg.topicTitle || pkg.topic || 'Untitled Script',
          category: pkg.category,
          full_dialogue: pkg.dialogueScript || [],
          five_beat_framework: {
            directingGuide: pkg.directingGuide,
            shlokCard: pkg.shlokCard,
            hook: pkg.hook,
            stakes: pkg.stakes,
            turn: pkg.turn,
            scene: pkg.scene,
            shatter: pkg.shatter,
            concept: pkg.concept
          },
          reel_cuts: pkg.reelCuts || [],
          cta_ladder: pkg.ctaLadder || null,
          short_script: pkg.shortScript || null,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('content_scripts')
          .upsert(row, { onConflict: 'id' });

        if (error) {
          console.warn('[PersistenceStore] Supabase script upsert warning:', error.message);
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase script write error:', err);
      }
    }
    return true;
  }

  // --- CALENDAR ---
  async getCalendar(): Promise<CalendarItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('content_calendar')
          .select('*')
          .order('publish_date', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped: CalendarItem[] = data.map((row: any) => ({
            id: row.id,
            title: row.title,
            date: row.publish_date,
            dayOfWeek: new Date(row.publish_date).toLocaleDateString('en-US', { weekday: 'long' }),
            platform: 'YouTube',
            contentType: row.format || 'Long-form Video',
            category: 'money_business',
            status: row.status || 'planned',
            notes: row.notes || ''
          }));
          this.calendar = mapped;
          return mapped;
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase calendar read fallback:', err);
      }
    }
    return this.calendar;
  }

  async saveCalendar(items: CalendarItem[]): Promise<boolean> {
    this.calendar = items;
    this.saveToDisk();
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const rows = items.map(c => ({
          id: c.id,
          title: c.title,
          publish_date: c.date,
          format: c.contentType,
          status: c.status,
          notes: c.notes || ''
        }));

        const { error } = await supabase
          .from('content_calendar')
          .upsert(rows, { onConflict: 'id' });

        if (error) {
          console.warn('[PersistenceStore] Supabase calendar upsert warning:', error.message);
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase calendar write error:', err);
      }
    }
    return true;
  }

  // --- PERFORMANCE FEEDBACK LOGS ---
  async getFeedbackLogs(): Promise<PerformanceFeedbackLog[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('performance_feedback')
          .select('*')
          .order('logged_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: PerformanceFeedbackLog[] = data.map((r: any) => ({
            id: r.id,
            contentTitle: r.content_title,
            category: r.category,
            platform: r.platform || 'YouTube',
            format: r.format || 'Long-form',
            publishDate: r.publish_date,
            loggedAt: r.logged_at,
            views: Number(r.views) || 0,
            ctrPercent: Number(r.ctr_percent) || 0,
            avgWatchTimePercent: Number(r.avg_watch_time_percent) || 0,
            saves: Number(r.saves) || 0,
            consultationClicks: Number(r.consultation_clicks) || 0,
            userObservations: r.user_observations || '',
            userNotes: r.user_notes || '',
            whatWorked: r.what_worked || '',
            whatFailed: r.what_failed || '',
            aiLearnedInsights: r.ai_learned_insights || ''
          }));
          this.feedbackLogs = mapped;
          return mapped;
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase feedback read fallback:', err);
      }
    }
    return this.feedbackLogs;
  }

  async addFeedbackLog(log: PerformanceFeedbackLog): Promise<boolean> {
    this.feedbackLogs.unshift(log);
    this.saveToDisk();

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const row = {
          id: log.id,
          content_title: log.contentTitle,
          category: log.category,
          platform: log.platform,
          format: log.format || 'Long-form',
          publish_date: log.publishDate || new Date().toISOString().split('T')[0],
          logged_at: log.loggedAt || new Date().toISOString().split('T')[0],
          views: log.views || 0,
          ctr_percent: log.ctrPercent || 0,
          avg_watch_time_percent: log.avgWatchTimePercent || 0,
          saves: log.saves || 0,
          consultation_clicks: log.consultationClicks || 0,
          user_observations: log.userObservations || '',
          user_notes: log.userNotes || '',
          what_worked: log.whatWorked || '',
          what_failed: log.whatFailed || '',
          ai_learned_insights: log.aiLearnedInsights || ''
        };

        const { error } = await supabase
          .from('performance_feedback')
          .upsert(row, { onConflict: 'id' });

        if (error) {
          console.warn('[PersistenceStore] Supabase feedback upsert warning:', error.message);
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase feedback write error:', err);
      }
    }
    return true;
  }

  // --- LEARNING MEMORY STATE ---
  async getLearningState(): Promise<LearningSystemState> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('learning_memory')
          .select('*')
          .eq('id', 'current')
          .maybeSingle();

        if (!error && data) {
          const state: LearningSystemState = {
            totalAnalyzed: data.total_analyzed || this.feedbackLogs.length,
            topPerformingCategories: data.top_performing_categories || this.learningState.topPerformingCategories,
            hookFormulaEffectiveness: data.hook_formula_effectiveness || this.learningState.hookFormulaEffectiveness,
            seoLessons: data.seo_lessons || this.learningState.seoLessons,
            strategicAdjustments: data.strategic_adjustments || this.learningState.strategicAdjustments,
            lastUpdated: data.last_updated || new Date().toISOString().split('T')[0]
          };
          this.learningState = state;
          return state;
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase learning memory read fallback:', err);
      }
    }
    return this.learningState;
  }

  async saveLearningState(state: LearningSystemState): Promise<boolean> {
    this.learningState = state;
    this.saveToDisk();

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const row = {
          id: 'current',
          total_analyzed: state.totalAnalyzed,
          top_performing_categories: state.topPerformingCategories,
          hook_formula_effectiveness: state.hookFormulaEffectiveness,
          seo_lessons: state.seoLessons,
          strategic_adjustments: state.strategicAdjustments,
          last_updated: state.lastUpdated || new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('learning_memory')
          .upsert(row, { onConflict: 'id' });

        if (error) {
          console.warn('[PersistenceStore] Supabase learning memory upsert warning:', error.message);
        }
      } catch (err) {
        console.warn('[PersistenceStore] Supabase learning memory write error:', err);
      }
    }
    return true;
  }

  // --- CREATOR MINDSET & ADAPTIVE CONTENT DNA ---
  async getMindsetProfile(): Promise<CreatorMindsetProfile> {
    return this.creatorMindset;
  }

  async saveMindsetProfile(profile: CreatorMindsetProfile): Promise<boolean> {
    this.creatorMindset = {
      ...profile,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.saveToDisk();
    return true;
  }

  async addMindsetRule(ruleData: Omit<CreatorMindsetRule, 'id' | 'learnedAt'>): Promise<CreatorMindsetProfile> {
    const newRule: CreatorMindsetRule = {
      id: `rule-${Date.now()}`,
      category: ruleData.category || 'voice_and_tone',
      rule: ruleData.rule,
      sourceIdeaOrBrief: ruleData.sourceIdeaOrBrief || 'Manual creator guidance',
      learnedAt: new Date().toISOString().split('T')[0]
    };
    this.creatorMindset.learnedRules = [newRule, ...this.creatorMindset.learnedRules];
    this.creatorMindset.lastUpdated = new Date().toISOString().split('T')[0];
    this.saveToDisk();
    return this.creatorMindset;
  }

  async removeMindsetRule(ruleId: string): Promise<CreatorMindsetProfile> {
    this.creatorMindset.learnedRules = this.creatorMindset.learnedRules.filter(r => r.id !== ruleId);
    this.creatorMindset.lastUpdated = new Date().toISOString().split('T')[0];
    this.saveToDisk();
    return this.creatorMindset;
  }

  async updateCustomMindsetGuidance(guidance: string): Promise<CreatorMindsetProfile> {
    this.creatorMindset.customMindsetGuidance = guidance;
    this.creatorMindset.lastUpdated = new Date().toISOString().split('T')[0];
    this.saveToDisk();
    return this.creatorMindset;
  }

  // Learns from new user-submitted ideas or briefs and evolves the creator mindset
  async learnFromIdeaOrBrief(brief: string, topicTitle?: string, userNotes?: string): Promise<CreatorMindsetProfile> {
    if (!brief || brief.trim().length < 5) return this.creatorMindset;

    const cleanBrief = brief.trim();
    this.creatorMindset.totalIdeasLearnedFrom += 1;

    // Add to recurring themes if unique
    const briefSnippet = cleanBrief.length > 80 ? cleanBrief.slice(0, 77) + '...' : cleanBrief;
    if (!this.creatorMindset.recurringThemes.some(t => t.toLowerCase().includes(briefSnippet.toLowerCase().slice(0, 30)))) {
      this.creatorMindset.recurringThemes = [
        topicTitle ? `"${topicTitle}": ${briefSnippet}` : briefSnippet,
        ...this.creatorMindset.recurringThemes.slice(0, 9)
      ];
    }

    // Heuristically extract and deduce mindset rules from the brief
    const lower = cleanBrief.toLowerCase();
    const newRules: CreatorMindsetRule[] = [];
    const dateStr = new Date().toISOString().split('T')[0];

    if (lower.includes('freeze') || lower.includes('panic') || lower.includes('fear') || lower.includes('anxiety')) {
      if (!this.creatorMindset.learnedRules.some(r => r.rule.toLowerCase().includes('somatic symptom'))) {
        newRules.push({
          id: `rule-auto-${Date.now()}-1`,
          category: 'hook_psychology',
          rule: 'Emphasize somatic biological reactions before psychological analysis (e.g. nervous system lock-up, adrenaline rush).',
          sourceIdeaOrBrief: topicTitle || briefSnippet,
          learnedAt: dateStr
        });
      }
    }

    if (lower.includes('partner') || lower.includes('relationship') || lower.includes('mother') || lower.includes('dating')) {
      if (!this.creatorMindset.learnedRules.some(r => r.rule.toLowerCase().includes('karmic mirror'))) {
        newRules.push({
          id: `rule-auto-${Date.now()}-2`,
          category: 'creator_obsession',
          rule: 'Frame recurring relationship frustration as a mirror of inner ancestral boundaries and unresolved debts (Runanubandha).',
          sourceIdeaOrBrief: topicTitle || briefSnippet,
          learnedAt: dateStr
        });
      }
    }

    if (lower.includes('money') || lower.includes('wealth') || lower.includes('business') || lower.includes('client') || lower.includes('job')) {
      if (!this.creatorMindset.learnedRules.some(r => r.rule.toLowerCase().includes('root chakra') || r.rule.toLowerCase().includes('muladhara'))) {
        newRules.push({
          id: `rule-auto-${Date.now()}-3`,
          category: 'creator_obsession',
          rule: 'Root financial stress in survival instincts (Muladhara dysregulation) rather than moral judgment.',
          sourceIdeaOrBrief: topicTitle || briefSnippet,
          learnedAt: dateStr
        });
      }
    }

    if (userNotes && userNotes.trim().length > 3) {
      newRules.push({
        id: `rule-auto-${Date.now()}-note`,
        category: 'voice_and_tone',
        rule: `Creator direction: "${userNotes.trim()}"`,
        sourceIdeaOrBrief: topicTitle || briefSnippet,
        learnedAt: dateStr
      });
    }

    if (newRules.length > 0) {
      this.creatorMindset.learnedRules = [...newRules, ...this.creatorMindset.learnedRules];
    }

    this.creatorMindset.lastUpdated = dateStr;
    this.saveToDisk();
    return this.creatorMindset;
  }

  // --- CLOSED-LOOP CONTINUOUS AI IMPROVEMENT CONTEXT ---
  // Injects real empirical history, user feedback, what worked, and what failed directly into Gemini prompts
  async getContinuousLearningContext(): Promise<string> {
    const logs = await this.getFeedbackLogs();
    const state = await this.getLearningState();
    const mindset = await this.getMindsetProfile();

    // Identify top-performing content
    const sortedByRetention = [...logs].sort((a, b) => (b.avgWatchTimePercent || 0) - (a.avgWatchTimePercent || 0));
    const topWins = sortedByRetention.slice(0, 3);

    const whatWorkedList = logs
      .filter(l => Boolean(l.whatWorked || l.userObservations))
      .slice(0, 4)
      .map(l => `• "${l.contentTitle}": ${l.whatWorked || l.userObservations}`);

    const whatFailedList = logs
      .filter(l => Boolean(l.whatFailed))
      .slice(0, 4)
      .map(l => `• "${l.contentTitle}": ${l.whatFailed}`);

    const winningFormulas = (state.hookFormulaEffectiveness || [])
      .slice(0, 3)
      .map(f => `• ${f.formula} (Win rate ${f.winRate}%): ${f.recommendation}`);

    const lessons = (state.seoLessons || []).slice(0, 4).map(l => `• ${l}`);
    const adjustments = (state.strategicAdjustments || []).slice(0, 3).map(a => `• ${a}`);

    const learnedRulesList = mindset.learnedRules
      .slice(0, 8)
      .map(r => `• [${r.category.toUpperCase()}]: ${r.rule} (Learned from: ${r.sourceIdeaOrBrief || 'creator brief'})`);

    const recurringThemesList = mindset.recurringThemes
      .slice(0, 6)
      .map(t => `• ${t}`);

    return `
=================================================================================
🧠 CREATOR MINDSET & PERSONAL CONTENT DNA (LEARNED FROM NIKHIL'S IDEAS & PHILOSOPHY) 🧠
You are writing in the exact creative headspace of the creator. Adapt to this personalized mindset:
- CREATOR ARCHETYPE: ${mindset.creatorArchetype}
- CREATOR'S DIRECT PHILOSOPHY: "${mindset.customMindsetGuidance}"
- CREATOR MINDSET RULES (Derived from ${mindset.totalIdeasLearnedFrom} ideas and briefs):
${learnedRulesList.join('\n')}

- RECURRING THEMES & OBSESSIONS NIKHIL CARES ABOUT:
${recurringThemesList.join('\n')}

- NAKUL DIRECTING NOTES:
${mindset.nakulDirectingNotes.map(n => `• ${n}`).join('\n')}

- NIKHIL DIRECTING NOTES:
${mindset.nikhilDirectingNotes.map(n => `• ${n}`).join('\n')}

🔥 MANDATORY CLOSED-LOOP HISTORICAL PERFORMANCE & CREATOR FEEDBACK MEMORY 🔥
The user has recorded ${logs.length} performance feedback entries. You MUST calibrate this generation to build directly on past channel wins and strictly avoid past failures:

1. PROVEN HIGH RETENTION CONTENT (STUDY THESE WINS):
${topWins.map(w => `- "${w.contentTitle}" [${w.category}]: Watch Time ${w.avgWatchTimePercent}%, CTR ${w.ctrPercent}%, Consult Clicks: ${w.consultationClicks || w.consultationClicksOrInquiries || 0}`).join('\n')}

2. WHAT DEFINITELY WORKED WITH AUDIENCE (REPEAT THESE PATTERNS):
${whatWorkedList.length > 0 ? whatWorkedList.join('\n') : '• Authentic first-person lived stories where the creator shares their own real-life experience, trials, and hard-earned learnings across varied settings (afternoon meetings, commute, social dinners, work).\n• Nakul as the raw skeptical sufferer on Camera Left grounding Nikhil on Camera Right.'}

3. WHAT FAILED / AUDIENCE FATIGUE TO AVOID (CRITICAL NEGATIVE CONSTRAINTS):
${whatFailedList.length > 0 ? whatFailedList.join('\n') : '• STRICT NEGATIVE CONSTRAINT: DO NOT default to the repetitive "2 AM / 3 AM insomnia" or "bathroom floor panic" trope. Audiences find it repetitive and boring. Always find novel real-world settings (afternoons, commutes, social dinners, work).\n• Do NOT use Sanskrit terms in the primary YouTube title without a problem-first hook.\n• Do NOT allow intro pacing to lag beyond 11 seconds without a concrete story anchor.'}

4. PROVEN HOOK FORMULAS:
${winningFormulas.join('\n')}

5. MANDATORY STRATEGIC LESSONS LEARNED OVER TIME:
${lessons.join('\n')}
${adjustments.join('\n')}

GENERATION DIRECTIVE:
Every line, hook, title, dialogue exchange, and structure you output must reflect this creator mindset and empirical channel memory.
=================================================================================
`;
  }

  // --- CATEGORIES CRUD ---
  async getCategories(): Promise<CategoryDefinition[]> {
    return [...this.categories];
  }

  async createCategory(payload: Partial<CategoryDefinition>): Promise<CategoryDefinition> {
    const label = (payload.label || '').trim();
    if (!label) {
      throw new Error('Category name/label is required');
    }

    // Auto-generate slug ID if not provided
    let id = (payload.id || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    if (!id) {
      id = label.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    }

    // Check duplicate ID
    if (this.categories.some(c => c.id === id)) {
      id = `${id}_${Date.now().toString(36).slice(-4)}`;
    }

    const newCat: CategoryDefinition = {
      id,
      label,
      color: payload.color || 'text-cyan-400',
      bg: payload.bg || 'bg-cyan-950/60',
      border: payload.border || 'border-cyan-800/60',
      description: (payload.description || '').trim(),
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.categories.push(newCat);
    this.saveToDisk();
    return newCat;
  }

  async updateCategory(id: string, updates: Partial<CategoryDefinition>): Promise<CategoryDefinition> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Category not found: ${id}`);
    }

    const existing = this.categories[index];
    const updated: CategoryDefinition = {
      ...existing,
      label: updates.label ? updates.label.trim() : existing.label,
      color: updates.color || existing.color,
      bg: updates.bg || existing.bg,
      border: updates.border || existing.border,
      description: updates.description !== undefined ? updates.description.trim() : existing.description,
      updatedAt: new Date().toISOString()
    };

    this.categories[index] = updated;
    this.saveToDisk();
    return updated;
  }

  async deleteCategory(id: string, reassignToId?: string): Promise<{ success: boolean; reassignedCount: number }> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Category not found: ${id}`);
    }

    const cat = this.categories[index];
    if (cat.isDefault) {
      throw new Error('Core default categories cannot be deleted');
    }

    const targetId = reassignToId || 'mental_health';
    let reassignedCount = 0;

    // Reassign topics
    this.topics.forEach(t => {
      if (t.category === id) {
        t.category = targetId as any;
        reassignedCount++;
      }
    });

    // Reassign calendar items
    this.calendar.forEach(item => {
      if (item.category === id) {
        item.category = targetId as any;
        reassignedCount++;
      }
    });

    // Remove category
    this.categories.splice(index, 1);
    this.saveToDisk();

    return { success: true, reassignedCount };
  }
}

export const persistenceStore = new PersistenceStore();
