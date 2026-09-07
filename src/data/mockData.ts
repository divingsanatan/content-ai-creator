import { TrendItem, TopicIdea, CalendarItem, PerformanceFeedbackLog, LearningSystemState } from '../types';

export const INITIAL_TRENDS: TrendItem[] = [
  {
    id: 'trend-yt-1',
    platform: 'YouTube',
    trendTerm: 'feeling disconnected from spouse even when in same room',
    category: 'relationships',
    intent: 'User feels emotional abandonment and numbness in marriage; seeking why distance happens without shouting matches.',
    contentAngle: 'Vedic concept of Anahata (Heart Chakra) contraction & Prana withdrawal; how unresolved small micro-resentments form energetic barriers.',
    gap: 'Most creators give generic "communication tips" or divorce ultimatums; nobody teaches the energetic somatic reset to rekindle silent intimacy without pressure.',
    urgency: 'high',
    searchVolumeEstimate: '+42% this week'
  },
  {
    id: 'trend-yt-2',
    platform: 'YouTube',
    trendTerm: 'why do I lose money right after making it',
    category: 'money_business',
    intent: 'User experiences financial panic or self-sabotage: whenever cash arrives, an unexpected expense drains it.',
    contentAngle: 'Muladhara (Root Chakra) safety dysregulation & Rahu influence: money creates unconscious nervous system panic, triggering subconscious spending to return to familiar survival baseline.',
    gap: 'Existing finance advice only teaches budgeting apps; spiritual creators offer toxic "manifest 10k overnight" bypass without addressing survival fear.',
    urgency: 'high',
    searchVolumeEstimate: '+67% this week'
  },
  {
    id: 'trend-google-1',
    platform: 'Google Search',
    trendTerm: 'sudden afternoon chest tightness freeze spiritual meaning vs anxiety',
    category: 'mental_health',
    intent: 'Sufferer experiencing sudden panic attacks / palpitations under pressure and wondering if it is spiritual awakening, kundalini, or clinical panic.',
    contentAngle: 'Ayurvedic Vata dosha imbalance + Pitta liver heat; combined with Ajna/Sahasrara prana overstimulation from ungrounded work stress. Grounding with Padabhyanga (warm sesame oil on feet) and Pranayama.',
    gap: 'Creators either completely spiritualize medical anxiety (dangerous) or dismiss the spiritual connection; need grounded psychosomatic distinction and grounding rituals that complement therapy.',
    urgency: 'high',
    searchVolumeEstimate: '+85% monthly spike'
  },
  {
    id: 'trend-google-2',
    platform: 'Google Search',
    trendTerm: 'constant lump in throat feeling stress medical test normal',
    category: 'physical_health',
    intent: 'Globus sensation / somatic anxiety where throat feels tight despite clear ENT results.',
    contentAngle: 'Vishuddha (Throat Chakra) constriction from unspoken boundary violations, suppressed tears, and chronic people-pleasing. Vedic practice of Shankha mudra and Ujjayi breath.',
    gap: 'Western wellness calls it "globus hystericus" with no somatic solution; holistic creators give vague "speak your truth" without physical throat unclenching steps.',
    urgency: 'medium',
    searchVolumeEstimate: '+38% this month'
  },
  {
    id: 'trend-pinterest-1',
    platform: 'Pinterest',
    trendTerm: 'sacral chakra emotional numbness breakup healing',
    category: 'emotional_health',
    intent: 'Women & men struggling to feel joy, sensuality, or emotional connection months after a painful romantic breakup.',
    contentAngle: 'Svadhishthana Chakra restoration; releasing stored water element (Jala Tattva) grief. Gentle daily rituals with Chandra (Moon) mindfulness and warm herbal baths.',
    gap: 'Pins focus on aesthetic crystals and orange graphics; zero actionable emotional unblocking practices with real psychological depth.',
    urgency: 'evergreen',
    searchVolumeEstimate: '120k monthly saves'
  },
  {
    id: 'trend-pinterest-2',
    platform: 'Pinterest',
    trendTerm: 'career burnout somatic symptoms astrology transit',
    category: 'money_business',
    intent: 'Professionals seeking astrological and energetic explanations for sudden loss of drive and physical exhaustion.',
    contentAngle: 'Shani (Saturn) lessons on slowing down vs forcing hustle; Svadharma alignment when your soul refuses to build someone elses dream.',
    gap: 'Astrology pins predict "doom and gloom" during Shani transits; what people need is a reassuring roadmap of practical rest as sacred duty.',
    urgency: 'medium',
    searchVolumeEstimate: '85k monthly saves'
  },
  {
    id: 'trend-ig-1',
    platform: 'Instagram/Reels',
    trendTerm: 'The unspoken rule of karma you only realize at 35',
    category: 'emotional_health',
    intent: 'Millennials confronting repeated patterns in relationships, family dynamics, and self-worth.',
    contentAngle: 'Prarabdha Karma vs Kriyamana Karma: why being "a good person" does not exempt you from life lessons, and how conscious response breaks the karmic loop.',
    gap: 'Shorts reduce karma to "instant revenge on your enemies"; our angle reframes karma as a loving mirror of unresolved inner wounds.',
    urgency: 'high',
    searchVolumeEstimate: 'Trending Audio Format'
  },
  {
    id: 'trend-ig-2',
    platform: 'Instagram/Reels',
    trendTerm: 'You are not unmotivated, your solar plexus is exhausted',
    category: 'mental_health',
    intent: 'People feeling chronic guilt over lack of willpower and chronic procrastination.',
    contentAngle: 'Manipura Chakra (Solar Plexus) depleted by chronic over-giving and lack of personal boundaries, causing digestive sluggishness (weak Jatharagni).',
    gap: 'Most reels preach "discipline over motivation" or aggressive cold plunges; we provide the gentle restoration of fire element through boundary setting.',
    urgency: 'high',
    searchVolumeEstimate: 'Viral Hook Archetype'
  },
  {
    id: 'trend-rq-1',
    platform: 'Reddit & Quora',
    trendTerm: 'r/relationship_advice: Why do I attract partners I have to mother?',
    category: 'relationships',
    intent: 'Exhausted individuals realizing they take on the parental/caregiver role in every partnership, killing romance.',
    contentAngle: 'Karmic Runanubandha debt and inverted Shakti/Shiva dynamic; over-functioning to earn love, and reclaiming the receptive feminine/masculine balance.',
    gap: 'Reddit comments say "dump them immediately"; we offer the deeper inquiry: what childhood wound made you believe your only value is in rescuing others?',
    urgency: 'high',
    searchVolumeEstimate: 'Daily recurring top thread'
  },
  {
    id: 'trend-rq-2',
    platform: 'Reddit & Quora',
    trendTerm: 'Quora: How does Bhagavad Gita address anxiety about future job loss?',
    category: 'money_business',
    intent: 'Tech and corporate workers paralyzed by layoffs, inflation, and existential career dread.',
    contentAngle: 'Bhagavad Gita Chapter 2, Verse 47 (Karmanye Vadhikaraste): disentangling self-worth from outcome anxiety, anchoring in present action.',
    gap: 'Quora answers quote the Sanskrit verse with dry literal translations; our approach translates it into practical corporate salaryman mental freedom.',
    urgency: 'evergreen',
    searchVolumeEstimate: 'High SEO ranking thread'
  },
  {
    id: 'trend-astro-1',
    platform: 'Hindu Calendar/Astrology',
    trendTerm: 'Pitru Paksha: Healing intergenerational family emotional wounds',
    category: 'emotional_health',
    intent: 'People seeking closure with deceased or estranged parents and breaking ancestral family curses/trauma.',
    contentAngle: 'Tarpana psychology: releasing ancestral expectations, forgiving lineage shortcomings, and cutting psychic cords of shame.',
    gap: 'Traditional priests focus purely on ritual mechanics; contemporary wellness ignores the sacred timing entirely. Perfect marriage of ritual + psychological liberation.',
    urgency: 'high',
    searchVolumeEstimate: 'Seasonal Annual Peak'
  },
  {
    id: 'trend-astro-2',
    platform: 'Hindu Calendar/Astrology',
    trendTerm: 'Ganesh Chaturthi: Dissolving Root Chakra financial fears',
    category: 'money_business',
    intent: 'Searching for genuine prosperity mantras and mindset shifts for new business ventures.',
    contentAngle: 'Ganesha as archetype of foundational stillness (Muladhara Adhipati) — cultivating unshakeable inner stability before launching business risk.',
    gap: 'Commercial influencers sell lucky charms; we teach the somatic discipline of grounding before asking the universe for greater load-bearing capacity.',
    urgency: 'high',
    searchVolumeEstimate: 'High Seasonal Spike'
  }
];

export const INITIAL_TOPICS: TopicIdea[] = [
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
    workingTitle: 'The Silent Relationship Freeze You Inherited From Ancestors',
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
    workingTitle: 'Sudden Workday Panic and Freeze: The Vata-Heart Reset',
    category: 'mental_health',
    concept: 'Ayurvedic Vata Kala & Anahata Prana grounding (Padabhyanga)',
    whyNow: 'Trending search term across Google & Reddit health anxiety forums (+85%)',
    bestFormat: 'long-form YouTube',
    hook: 'Freezing up with a racing heart during your biggest moments isn\'t a mindset failure — it\'s your nervous system begging for this ancient grounding ritual.',
    festivalTie: {
      eventName: 'Aja Ekadashi',
      tithiOrDate: '2026-09-07',
      isVerified: true,
      reasoning: 'Ekadashi fasting and mental detox naturally pairs with nervous system recovery.'
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
  }
];

export const INITIAL_CALENDAR: CalendarItem[] = [
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

export const INITIAL_FEEDBACK_LOGS: PerformanceFeedbackLog[] = [
  {
    id: 'log-1',
    contentTitle: 'Why You Freeze When You Get Money (Long-form)',
    category: 'money_business',
    platform: 'YouTube',
    format: 'Long-form',
    publishDate: '2026-08-20',
    views: 48500,
    ctrPercent: 9.2,
    avgWatchTimePercent: 54.8,
    sharesOrSaves: 3120,
    consultationClicksOrInquiries: 42,
    userObservations: 'Spectacular retention during the visceral daytime car freeze description of panic. Viewers loved the collision hook ("I gave back a $20k bonus because my stomach burned"). Led to 42 consultation link clicks!',
    aiLearnedInsights: 'Hook Formula: Collision of high-status achievement with somatic terror outperformed spiritual theory by +41% CTR. Consult CTA framing around financial-emotional survival converted highest.'
  },
  {
    id: 'log-2',
    contentTitle: '5 Signs Your Sacral Chakra Is Blocked After Breakup',
    category: 'relationships',
    platform: 'Pinterest',
    format: 'Pin',
    publishDate: '2026-08-15',
    views: 89000,
    ctrPercent: 6.4,
    avgWatchTimePercent: 0,
    sharesOrSaves: 8400,
    consultationClicksOrInquiries: 18,
    userObservations: 'Pins with symptom-first title ("Why You Feel Numb in Your Pelvis After Breakup") saved 3x more than pins titled "Sacral Chakra Balance Guide".',
    aiLearnedInsights: 'Pinterest SEO Lesson: Symptom search phrasing ("feel numb after breakup") drives viral saves; spiritual keywords act best as secondary qualifiers in description.'
  },
  {
    id: 'log-3',
    contentTitle: 'The Ancient Rule of Svadharma for Tech Layoff Burnout',
    category: 'money_business',
    platform: 'YouTube',
    format: 'Long-form',
    publishDate: '2026-08-08',
    views: 22100,
    ctrPercent: 4.8,
    avgWatchTimePercent: 61.2,
    sharesOrSaves: 1450,
    consultationClicksOrInquiries: 29,
    userObservations: 'Watch time was phenomenal (61%), but initial CTR was slightly lower (4.8%) because the word "Svadharma" in the title scared off secular viewers.',
    aiLearnedInsights: 'Title Adaptation Rule: Front-load the modern crisis ("Tech Layoff Dread") before introducing Sanskrit terms in title. Reserve deep Vedic terminology for the Turn and Shatter.'
  },
  {
    id: 'log-4',
    contentTitle: 'Why You Attract Partners You Mother (Short)',
    category: 'relationships',
    platform: 'Instagram',
    format: 'Short/Reel',
    publishDate: '2026-08-27',
    views: 114000,
    ctrPercent: 11.2,
    avgWatchTimePercent: 92.5,
    sharesOrSaves: 12800,
    consultationClicksOrInquiries: 55,
    userObservations: 'Comments blew up with women sharing their exact relationship patterns. Traffic driven to YouTube full video was 4x higher than usual.',
    aiLearnedInsights: 'Conversion Funnel Success: Keeping Instagram strictly focused on driving to YouTube bio without direct consult booking worked as planned — viewers watched the long-form video, where the consultation ask landed naturally.'
  }
];

export const INITIAL_LEARNING_STATE: LearningSystemState = {
  totalAnalyzed: 4,
  topPerformingCategories: [
    { category: 'money_business', avgCtr: 7.0, avgRetention: 58.0 },
    { category: 'relationships', avgCtr: 8.8, avgRetention: 92.5 },
    { category: 'mental_health', avgCtr: 7.5, avgRetention: 52.0 },
    { category: 'physical_health', avgCtr: 6.2, avgRetention: 48.0 },
    { category: 'emotional_health', avgCtr: 6.8, avgRetention: 55.0 }
  ],
  hookFormulaEffectiveness: [
    { formula: 'Idea Collision (High achievement vs visceral terror)', winRate: 88, recommendation: 'Keep pairing modern success markers with hidden somatic suffering.' },
    { formula: 'Symptom-first curiosity ("Why you freeze under pressure")', winRate: 82, recommendation: 'Always name the physical feeling before naming the chakra.' },
    { formula: 'Ancestral lineage mirror ("What you inherited")', winRate: 79, recommendation: 'Deploy during Amavasya / Pitru Paksha season for peak resonance.' }
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
  lastUpdated: '2026-09-03'
};
