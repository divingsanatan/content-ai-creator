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
    trendTerm: 'waking up at 3am heart pounding spiritual meaning vs anxiety',
    category: 'mental_health',
    intent: 'Sufferer experiencing nocturnal panic attacks / palpitations and wondering if it is spiritual awakening, kundalini, or clinical panic.',
    contentAngle: 'Ayurvedic Vata dosha hour (2am-6am) + Pitta liver heat; combined with Ajna/Sahasrara prana overstimulation from ungrounded bedtime doomscrolling. Grounding with Padabhyanga (warm sesame oil on feet) and Pranayama.',
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
    workingTitle: 'The 2am Relationship Anxiety You Inherited From Ancestors',
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
    workingTitle: 'Waking Up at 3am with Heart Racing: The Vata-Heart Reset',
    category: 'mental_health',
    concept: 'Ayurvedic Vata Kala & Anahata Prana grounding (Padabhyanga)',
    whyNow: 'Trending search term across Google & Reddit health anxiety forums (+85%)',
    bestFormat: 'long-form YouTube',
    hook: 'Waking up between 2am and 4am with a racing heart isn\'t a spiritual awakening — it\'s your nervous system begging for this ancient bedtime ritual.',
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
  }
];

export const INITIAL_CALENDAR: CalendarItem[] = [
  // --- WEEK 1 (Sep 06 - Sep 12): Root Chakra & Money Panic ---
  {
    id: 'cal-w1-hype',
    date: '2026-09-04',
    dayOfWeek: 'Friday',
    platform: 'Meta/Stories',
    contentType: 'Pre-Launch Hype',
    title: 'Teaser Reel: "This Sunday, why having money makes your body panic"',
    category: 'money_business',
    status: 'Scheduled',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Day -2 hype before Sunday main drop. Curiosity hook without giving answer.'
  },
  {
    id: 'cal-w1-pillar',
    date: '2026-09-06',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Leading into Aja Ekadashi',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Why You Freeze When You Get Money: Healing Root Panic',
    category: 'money_business',
    status: 'Scripted',
    notes: '🏆 WEEK 1 PILLAR VIDEO (12-15 min). Full HSTSS script with CTA ladder to consulting.'
  },
  {
    id: 'cal-w1-reel1',
    date: '2026-09-07',
    dayOfWeek: 'Monday',
    festivalOrTithi: 'Aja Ekadashi',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #1: The $45,000 Bathroom Floor Panic (Hook Slice)',
    category: 'money_business',
    status: 'Scripted',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Funnel CTA: Full breakdown on YouTube — link in bio (never consult direct).'
  },
  {
    id: 'cal-w1-pin1',
    date: '2026-09-08',
    dayOfWeek: 'Tuesday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 1: 4 Somatic Signs Your Root Chakra is Burning Money',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Soft watercolor style with warm terracotta palette. Link to YouTube.'
  },
  {
    id: 'cal-w1-carousel',
    date: '2026-09-09',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Carousel',
    title: 'Carousel (7 Slides): Why Budgeting & Willpower Fail in Survival Mode',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w1-pillar',
    notes: '7 slides breaking down Annamaya Kosha nervous system freeze. Saves & shares driver.'
  },
  {
    id: 'cal-w1-reel2',
    date: '2026-09-10',
    dayOfWeek: 'Thursday',
    festivalOrTithi: 'Pre-Bhadrapada Amavasya',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #2: You Sabotage Money Because Your Body Feels Unsafe (Shatter)',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Mindset reframing: You cannot accumulate what your body perceives as lethal.'
  },
  {
    id: 'cal-w1-pin2',
    date: '2026-09-11',
    dayOfWeek: 'Friday',
    festivalOrTithi: 'Bhadrapada Amavasya',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 2: 5-Minute Morning Reset for Financial Panic & Root Chakra',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Step-by-step checklist pin linking directly to YouTube long-form masterclass.'
  },
  {
    id: 'cal-w1-community',
    date: '2026-09-12',
    dayOfWeek: 'Saturday',
    platform: 'YouTube',
    contentType: 'Community Q&A',
    title: 'Community Poll: What physical sensation hits when you check your bank balance?',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w1-pillar',
    notes: 'Audience language mining in YouTube comments + teaser for next week.'
  },

  // --- WEEK 2 (Sep 13 - Sep 19): Vata Dosha & 3 AM Panic ---
  {
    id: 'cal-w2-pillar',
    date: '2026-09-13',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Pre-Ganesh Chaturthi Window',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Waking Up at 3am with Heart Racing: The Vata-Heart Reset',
    category: 'mental_health',
    status: 'Idea',
    notes: '🏆 WEEK 2 PILLAR VIDEO (12-15 min). Addresses surging nocturnal anxiety search queries.'
  },
  {
    id: 'cal-w2-reel1',
    date: '2026-09-14',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #1: Why 3am Waking Up Isn\'t Just Anxiety (It\'s Vata Peak)',
    category: 'mental_health',
    status: 'Idea',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Ayurvedic circadian clock hook: 2am-6am is Vata time. Link in bio to YouTube.'
  },
  {
    id: 'cal-w2-pin1',
    date: '2026-09-15',
    dayOfWeek: 'Tuesday',
    festivalOrTithi: 'Ganesh Chaturthi',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 1: The 3am Adrenaline Clock & Nervous System Guide',
    category: 'mental_health',
    status: 'Idea',
    parentLongformId: 'cal-w2-pillar',
    notes: '2:3 Infographic diagram with somatic nervous system reset steps.'
  },
  {
    id: 'cal-w2-carousel',
    date: '2026-09-16',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Carousel',
    title: 'Carousel (6 Slides): 3 Ayurvedic Evening Habits Preventing 3am Panic',
    category: 'physical_health',
    status: 'Idea',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Warm sesame oil foot massage, nutmeg warm milk, and digital detox.'
  },
  {
    id: 'cal-w2-reel2',
    date: '2026-09-17',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #2: Why Talk Therapy Can\'t Stop a 3am Somatic Spike',
    category: 'mental_health',
    status: 'Idea',
    parentLongformId: 'cal-w2-pillar',
    notes: 'Contrast cognitive approaches with somatic Vata balancing.'
  },
  {
    id: 'cal-w2-pin2',
    date: '2026-09-18',
    dayOfWeek: 'Friday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 2: Nighttime Grounding Ritual for Sensitive Empaths',
    category: 'emotional_health',
    status: 'Idea',
    parentLongformId: 'cal-w2-pillar'
  },
  {
    id: 'cal-w2-hype',
    date: '2026-09-19',
    dayOfWeek: 'Saturday',
    platform: 'Meta/Stories',
    contentType: 'Pre-Launch Hype',
    title: 'Story Poll: "Do you attract partners you have to mother and fix?"',
    category: 'relationships',
    status: 'Idea',
    notes: 'Teaser sticker poll building hype for Week 3 Sunday Relationship Pillar.'
  },

  // --- WEEK 3 (Sep 20 - Sep 26): Relationships & The Caregiver Trap ---
  {
    id: 'cal-w3-pillar',
    date: '2026-09-20',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Parsva Ekadashi',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'Why You Attract Partners You Have to Mother: Runanubandha Debt',
    category: 'relationships',
    status: 'Idea',
    notes: '🏆 WEEK 3 PILLAR VIDEO (12-15 min). Karmic caregiver trap & restoring receptive Shakti.'
  },
  {
    id: 'cal-w3-reel1',
    date: '2026-09-21',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #1: Managing Your Partner Like an Employee Isn\'t Love',
    category: 'relationships',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Visceral hook confronting hyper-independence in dating.'
  },
  {
    id: 'cal-w3-pin1',
    date: '2026-09-22',
    dayOfWeek: 'Tuesday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 1: 5 Signs You Recruited a Project Instead of a Romantic Partner',
    category: 'relationships',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar'
  },
  {
    id: 'cal-w3-carousel',
    date: '2026-09-23',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Carousel',
    title: 'Carousel (7 Slides): Breaking the Karmic Caregiver Dynamic in Love',
    category: 'relationships',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar'
  },
  {
    id: 'cal-w3-reel2',
    date: '2026-09-24',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #2: Why Being "The Strong One" Destroys Romance',
    category: 'relationships',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar'
  },
  {
    id: 'cal-w3-pin2',
    date: '2026-09-25',
    dayOfWeek: 'Friday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 2: Heart Chakra & Anahata Cord Releasing Ritual',
    category: 'emotional_health',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar'
  },
  {
    id: 'cal-w3-quora',
    date: '2026-09-26',
    dayOfWeek: 'Saturday',
    platform: 'Quora/Reddit',
    contentType: 'Community Q&A',
    title: 'Reddit Deep Dive: "Why hyper-independent women attract man-child partners"',
    category: 'relationships',
    status: 'Idea',
    parentLongformId: 'cal-w3-pillar',
    notes: 'Value-first discussion thread driving long-tail traffic back to YouTube.'
  },

  // --- WEEK 4 (Sep 27 - Oct 03): Career Burnout & Bhagavad Gita Reset ---
  {
    id: 'cal-w4-pillar',
    date: '2026-09-27',
    dayOfWeek: 'Sunday',
    festivalOrTithi: 'Anant Chaturdashi Window',
    platform: 'YouTube',
    contentType: 'Long-form Video',
    title: 'The Gita Rule for Corporate Layoff Dread & Career Panic',
    category: 'money_business',
    status: 'Idea',
    notes: '🏆 WEEK 4 PILLAR VIDEO (12-15 min). Gita Ch. 2 Verse 47 applied to modern corporate burnout.'
  },
  {
    id: 'cal-w4-reel1',
    date: '2026-09-28',
    dayOfWeek: 'Monday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #1: Corporate Culture Convinced You Anxiety Equals Ambition',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
  },
  {
    id: 'cal-w4-pin1',
    date: '2026-09-29',
    dayOfWeek: 'Tuesday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 1: Bhagavad Gita Ch 2: The Executive Peace Protocol',
    category: 'mental_health',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
  },
  {
    id: 'cal-w4-carousel',
    date: '2026-09-30',
    dayOfWeek: 'Wednesday',
    platform: 'Instagram/Facebook',
    contentType: 'Carousel',
    title: 'Carousel (6 Slides): 5 Signs Your Burnout Is Actually Svadharma Misalignment',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
  },
  {
    id: 'cal-w4-reel2',
    date: '2026-10-01',
    dayOfWeek: 'Thursday',
    platform: 'Instagram/Facebook',
    contentType: 'Short/Reel',
    title: 'Short #2: How to Work 40 Hours Without Your Nervous System Collapsing',
    category: 'physical_health',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
  },
  {
    id: 'cal-w4-pin2',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    platform: 'Pinterest',
    contentType: 'Pinterest Pin',
    title: 'Pin 2: Solar Plexus & Manipura Fire Alignment for Focus',
    category: 'physical_health',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
  },
  {
    id: 'cal-w4-newsletter',
    date: '2026-10-03',
    dayOfWeek: 'Saturday',
    platform: 'YouTube',
    contentType: 'Community Q&A',
    title: 'Substack & Community: Taittiriya Upanishad and the Modern Investment Portfolio',
    category: 'money_business',
    status: 'Idea',
    parentLongformId: 'cal-w4-pillar'
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
    userObservations: 'Spectacular retention during the 2am physical description of panic. Viewers loved the collision hook ("I gave back a $20k bonus because my stomach burned"). Led to 42 consultation link clicks!',
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
    { formula: 'Symptom-first curiosity ("Why you freeze at 2am")', winRate: 82, recommendation: 'Always name the physical feeling before naming the chakra.' },
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
