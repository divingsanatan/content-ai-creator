import {
  ScriptPackage,
  SEOPackage,
  PinterestPackage,
  GrowthPlaybook,
  TopicIdea,
  TrendItem,
  DeepResearchBrief,
  LifeProblemCategory,
  CalendarItem,
  FeedbackAnalysis
} from '../src/types';
import { INITIAL_SCRIPT_PACKAGE, INITIAL_SEO_PACKAGE, INITIAL_PINTEREST_PACKAGE, INITIAL_GROWTH_PLAYBOOK } from '../src/data/initialPackages';

export function getFallbackScriptPackage(
  topic?: string,
  category?: LifeProblemCategory,
  concept?: string,
  userNotes?: string
): ScriptPackage {
  const chosenTopic = topic || 'Healing 2 AM Overthinking & Nervous System Freeze';
  const chosenCategory: LifeProblemCategory = category || 'mental_health';
  const chosenConcept = concept || 'Muladhara Grounding & Gita Chapter 2 Nishkama Karma';

  // Customize dialogue with user's topic in natural conversational Hinglish
  const dialogueScript = [
    {
      id: 'd-1',
      speaker: 'Nakul' as const,
      actorNote: '[Pacing rapidly with phone in hand, voice strained, sarcastic frustration]',
      dialogue: `Nikhil, mujhe bas ek seedha jawab de before I lose my mind. Raat ke do baje jab sab chain se so rahe hote hain, mera chest ekdum lead anvil ki tarah heavy kyu feel hota hai about "${chosenTopic}"? Maine deep breathing try kiya, affirmations bole, par wo icy knot gayab nahi hota. Why does my brain act like meri survival threatened hai right now?!`,
      timestamp: '00:00',
      isReelCutStart: true,
      reelCutId: 'reel-1'
    },
    {
      id: 'd-2',
      speaker: 'Nikhil' as const,
      actorNote: '[Calm, deep chest resonance, steady eye contact, taking a slow breath]',
      dialogue: `Kyunki tum ek biological panic state ko intellectual puzzle ki tarah solve karne ki koshish kar rahe ho, Nakul. Jab root contract hoti hai, to mind fake worst-case scenarios create karta hai taaki veins me cortisol surge ko justify kar sake. Tumhe thinking problem nahi hai; tumhara nervous system gravity me safe feel karna bhool gaya hai.`,
      timestamp: '00:28'
    },
    {
      id: 'd-3',
      speaker: 'Nakul' as const,
      actorNote: '[Scoffs with cynical humor, throwing hands in the air]',
      dialogue: `Wah bhai, fantastic! To main apne bills aur deadlines ko bol du ki main gravity me grounded hu?! What about the actual problem? Aise baith ke lotus pose me sab theek hone ka manifest karu?!`,
      timestamp: '00:54'
    },
    {
      id: 'd-4',
      speaker: 'Nikhil' as const,
      actorNote: '[Measured, unbothered by Nakul’s sarcasm, slight compassionate smile]',
      dialogue: `Somatic regulation ke bina manifestation sirf ek spiritual bypass hai, Nakul. Sanatan Dharma ne kabhi nahi kaha ki dard ko ignore karo. ${chosenConcept} me rishis ne dekha ki mind (Manas) ko mind se shaant nahi kiya ja sakta. Prana ko pehle physical body me anchor karna padta hai, tabhi clarity wapas aati hai.`,
      timestamp: '01:25'
    },
    {
      id: 'd-5',
      speaker: 'Nakul' as const,
      actorNote: '[Slumps into chair, rubbing temples, tone softening from rage to vulnerability]',
      dialogue: `Theek hai. Par ye hamesha raat ke 2 baje hi kyu trigger hota hai? Din bhar to main completely normal hota hu, par jaise hi lights band hoti hain, ye feeling of doom mujhe swallow kar leti hai.`,
      timestamp: '02:10'
    },
    {
      id: 'd-6',
      speaker: 'Nikhil' as const,
      actorNote: '[Leans forward, voice quiet, grounded authority]',
      dialogue: `Kyunki din ki bhaag-daud tumhare liye ek anesthesia ka kaam karti hai. Jab bahar ka shor band hota hai, tumhare unprocessed Samskaras surface pe aa jaate hain. Tum silence se bhaag rahe the, ye soch ke ki silence khali hai. Par silence to ek aaina hai jo tumhe wo dikhata hai jo tum dopahar me dekhna nahi chahte the.`,
      timestamp: '02:45'
    },
    {
      id: 'd-7',
      speaker: 'Nakul' as const,
      actorNote: '[Paces again, irritated at being seen so accurately]',
      dialogue: `To practical verse batao. Kisi aise insaan ke liye jiske paas 3 deadlines hain, pocket me tension hai, aur poetic metaphors ke liye zero patience hai. Mujhe real shlok chahiye.`,
      timestamp: '03:40',
      isReelCutStart: true,
      reelCutId: 'reel-2'
    },
    {
      id: 'd-8',
      speaker: 'Nikhil' as const,
      actorNote: '[Deep resonant recitation, flawless meter, anchoring the room]',
      dialogue: `कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\n"Karmany-evādhikāras te mā phaleṣhu kadāchana."\nBhagavad Gita, Chapter 2, Verse 47. Tumhara adhikar sirf dedicated action pe hai, outcome ko pakad ke anxious hone pe bilkul nahi.`,
      timestamp: '04:12',
      isShlokMoment: true
    },
    {
      id: 'd-9',
      speaker: 'Nakul' as const,
      actorNote: '[Blinks, defensiveness visibly cracking]',
      dialogue: `Har koi social media pe ye quote paste karta hai. Par outcome se darr chhodne se meri heart rate normal kaise hogi?`,
      timestamp: '04:45'
    },
    {
      id: 'd-10',
      speaker: 'Nikhil' as const,
      actorNote: '[Direct, piercing clarity, hands resting flat on table]',
      dialogue: `Kyunki future ko control karne ki koshish ek physiological contraction hai. Jaise hi tum demand karte ho ki kal tumhari security guarantee kare, tumhara Muladhara clench ho jata hai. Krishna ne Arjun ko surrender karne nahi kaha tha—unhone kaha tha ki universe ke steering wheel se kaanpte hue haath hatao aur apne dono pair zameen pe tikaao.`,
      timestamp: '05:15'
    },
    {
      id: 'd-11',
      speaker: 'Nakul' as const,
      actorNote: '[Exhales deeply, shoulders dropping two inches, faint laugh]',
      dialogue: `Sach me... this hit uncomfortably close to home. To batao abhi shuru kahan se karein?`,
      timestamp: '06:00',
      isReelCutStart: true,
      reelCutId: 'reel-3'
    },
    {
      id: 'd-12',
      speaker: 'Nikhil' as const,
      actorNote: '[Warm, encouraging, straight instructions]',
      dialogue: `Pehle kacche mitti ke bartan me paani daalna band karo. Pehle clay ko bake karo—deep breath, physical grounding, aur apne Svadharma ko honor karke. Uske baad jo bhi abundance ya peace aayegi, wo tik sakegi.`,
      timestamp: '06:30'
    },
    {
      id: 'd-13',
      speaker: 'Nakul' as const,
      actorNote: '[Looks directly at camera, speaking as the viewer’s ally]',
      dialogue: `Agar aap bhi raat ko 2 baje tight chest ke sath phone scroll kar rahe ho, to akele spiral mat karo. Apne us dost ko ye video send karo jo har waqt overthink karta rehta hai.`,
      timestamp: '07:15'
    },
    {
      id: 'd-14',
      speaker: 'Nikhil' as const,
      actorNote: '[Looking directly into camera, warm invitation]',
      dialogue: `Aur agar aap apne journey ke root blocks ko untangle karna chahte hain—chahe finances me ho, relationships me, ya mental peace me—to niche description me jakar 1-on-1 spiritual healing consultation book kar sakte hain. Hum milkar aapke energetic container ko rebuild karenge.`,
      timestamp: '07:45'
    }
  ];

  return {
    ...INITIAL_SCRIPT_PACKAGE,
    topic: chosenTopic,
    category: chosenCategory,
    concept: chosenConcept,
    dialogueScript,
    hook: {
      ideaCollision: `Raat ke 2 baje "${chosenTopic}" ke baare me sochte hi panic kyu ho jata hai, aur positive thinking se ye aur bura kyu lagta hai?`,
      alternateCollisionOptions: [
        `Jaise hi "${chosenTopic}" ki baat aati hai, tumhara dimaag freeze kyu ho jata hai.`,
        `Kyu tumhara nervous system "${chosenTopic}" ko ek existential threat samajhta hai.`,
        `Rishis ko "${chosenTopic}" ke baare me kya pata tha jo modern therapy miss kar deti hai.`
      ],
      buildToElevenSeconds: `Agar aapne saare affirmations try kar liye hain, fir bhi akele bistar me let-te hi pet me ek barf jaisa knot feel hota hai, to ye mindset failure nahi hai—ye ek ungrounded root reflex hai.`
    },
    stakes: {
      lowestPointStory: `Ghanghor andhere me ceiling ko ghoorte hue mental spreadsheet pe worst-case scenarios calculate karna, jabki body phantom adrenaline se kaanp rahi ho.`,
      visceralBodyFeeling: `Hatheliyon pe thanda paseena, chest pe tight band, aur pelvic floor tak saans na le paana.`,
      twoAmInternalDialogue: `"Agar maine isko abhi theek nahi kiya, to subah tak mera sab kuch barbaad ho jayega."`
    },
    turn: {
      livedRealization: `Ye realize karna ki somatic freeze ko overthink karne se aag aur bhadakti hai. Tum soch ke safety tak nahi pahunch sakte; tumhe gravity me anchor hona padega.`,
      sanatanTeachingIntegrated: chosenConcept,
      momentOfLevityOrJoy: `Nakul realizing that his frantic mental calculations were just ego drama, laughing at how absurd it is to try to control the entire cosmos at 2 AM.`
    },
    shatter: {
      micDropQuote: `Kacche mitti ke bartan me amrit nahi tikta. Pehle root ko regulate karo, tabhi abundance rukk payegi.`,
      quotableLines: [
        `Anxiety koi character flaw nahi hai; ye prana hai bina kisi anchor ke.`,
        `Action tumhare haath me hai; outcome pe obsess karna Prakriti ke aage God khelna hai.`
      ]
    },
    ctaLadder: {
      step1_share: `Ye video apne us dost ko zaroor share karo jo raat ko poori duniya ka bojh apne kandho pe leke jaagta rehta hai.`,
      step2_consult: `Agar aap ${chosenTopic.toLowerCase()} ya mental burnout me phase hue hain, to description me 1-on-1 spiritual healing aur life coaching consultation book karein. Hum milkar aapka energetic blueprint restore karenge.`,
      step3_nextVideo: `Iske baad, hamara next episode dekhein: Kaise subah sirf 7 minute me apne Prana ko reset karein taaki din bhar overwhelm na ho.`
    },
    reelCuts: [
      {
        id: 'reel-1',
        cutNumber: 1,
        title: `The 2 AM Panic Over ${chosenTopic.slice(0, 30)}`,
        timecodeInLongVideo: '00:00 - 00:48',
        targetDuration: '48s',
        hookLine: `${chosenTopic} ke baare me sochte hi raat ke 2 baje heart rate 140 BPM kyu chala jata hai?`,
        onScreenCaptionText: `POV: Sone ki koshish kar rahe ho par nervous system spiral kar raha hai 💀`,
        audioTrackVibe: 'Ticking clock Foley under Nakul, abrupt quiet when Nikhil delivers the truth',
        editingDirection: 'Tight dynamic zoom on Nakul staring at his glowing screen, hard cut to Nikhil upright and serene.',
        dialogueExchanges: [
          {
            speaker: 'Nakul',
            note: '[Agitated, pacing rapidly]',
            line: `Nikhil, ${chosenTopic} ke baare me sochte hi aisa kyu lagta hai ki kisi ne mere haath me live grenade pakda diya ho?!`
          },
          {
            speaker: 'Nikhil',
            note: '[Calm, deep chest resonance]',
            line: `Kyunki tum ek somatic panic response ko mental puzzle ki tarah solve karne ki koshish kar rahe ho. Tumhare nervous system ne danger register kiya hai.`
          }
        ],
        softCtaText: 'Full 12-minute deep dive on YouTube. Link in bio.'
      },
      {
        id: 'reel-2',
        cutNumber: 2,
        title: 'The Scripture Pivot: Gita 2.47 Demystified',
        timecodeInLongVideo: '03:40 - 04:35',
        targetDuration: '55s',
        hookLine: 'Problems ko manifest karke theek karne ka dhong band karo—suno Krishna ne actually kya sikhaya tha.',
        onScreenCaptionText: '5,000 saal purana shlok jo mental paralysis ko 60 seconds me tod deta hai 🧘‍♂️',
        audioTrackVibe: 'Warm tanpura drone under Sanskrit recitation',
        editingDirection: 'Devanagari text appears cleanly on screen, matching Nikhil’s vocal cadence.',
        dialogueExchanges: [
          {
            speaker: 'Nakul',
            note: '[Skeptical, exasperated]',
            line: 'To main apne bank account ke samne mantras chant karu aur pretend karu ki sab changa si?'
          },
          {
            speaker: 'Nikhil',
            note: '[Grounded recitation]',
            line: 'Karmany-evādhikāras te mā phaleṣhu kadāchana. Action tumhara hai; outcome Prakriti ka. Jo tumhara nahi hai, use control karna band karo.'
          }
        ],
        softCtaText: 'Watch the full video on YouTube to break the overthinking loop. Link in bio.'
      },
      {
        id: 'reel-3',
        cutNumber: 3,
        title: 'The Unbaked Clay Pot Truth',
        timecodeInLongVideo: '06:00 - 06:45',
        targetDuration: '45s',
        hookLine: 'Jaise hi sab theek hone lagta hai, tum khud ko sabotage kyu karte ho?',
        onScreenCaptionText: 'Kacche mitti ke bartan me paani daalna band karo 🛑',
        audioTrackVibe: 'Warm acoustic vinyl crackle with deep sub bass',
        editingDirection: 'Split screen contrast between Nakul’s fidgeting and Nikhil’s rooted posture.',
        dialogueExchanges: [
          {
            speaker: 'Nakul',
            note: '[Vulnerable realization]',
            line: 'To har baar jab main sab theek karne ki jaldi karta hu, main bas container ko tod raha hota hu?'
          },
          {
            speaker: 'Nikhil',
            note: '[Direct and firm]',
            line: 'Exactly. Pehle clay ko saans aur presence se bake karo. Tabhi abundance tik payegi.'
          }
        ],
        softCtaText: 'Full breakdown available on YouTube. Link in bio.'
      }
    ],
    shlokCard: {
      included: true,
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'Karmany-evādhikāras te mā phaleṣhu kadāchana |\nMā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||',
      source: 'Bhagavad Gita — Chapter 2, Verse 47',
      nikhilExplanation: `Krishna is diagnosing biological freeze: the moment your mind attaches your survival to an uncertain future outcome, your prana clenches. Action is yours; the fruits belong to the cosmic order (Prakriti).`,
      contextInDialogue: `Delivered when Nakul sarcastically asks if he should just burn his to-do list and live in a cave.`
    }
  };
}

export function getFallbackSEOPackage(
  topic?: string,
  category?: LifeProblemCategory,
  scriptSummary?: string
): SEOPackage {
  const chosenTopic = topic || 'Healing 2 AM Overthinking & Nervous System Freeze';
  const cleanTitle = chosenTopic.replace(/["\n\r]/g, '').slice(0, 50);

  return {
    ...INITIAL_SEO_PACKAGE,
    topic: chosenTopic,
    titles: [
      {
        title: `Why You Panic at 2 AM (And How to Stop It)`,
        charCount: 43,
        isProblemLed: true
      },
      {
        title: `Can't Sleep Because of Stress? Ancient Vedic Fix`,
        charCount: 48,
        isProblemLed: true
      },
      {
        title: `${cleanTitle}: Ancient Somatic Reset`,
        charCount: cleanTitle.length + 24,
        isProblemLed: false
      },
      {
        title: `The Gita Secret to Ending Nervous System Freeze`,
        charCount: 49,
        isProblemLed: false
      },
      {
        title: `Stop Overthinking: Root Chakra Healing That Works`,
        charCount: 50,
        isProblemLed: false
      }
    ],
    youtubeDescription: {
      firstTwoLinesFold: `If you wake up at 2 AM with a pounding heart and spiraling thoughts about ${cleanTitle.toLowerCase()}, this video reveals why mindset tricks fail and what ancient Sanatan Dharma offers instead.`,
      summary: `In this episode, we break down why modern overthinking is not a failure of will, but an ungrounded nervous system reflex. Using Vedic psychology, Bhagavad Gita Chapter 2, and somatic root regulation, we explore the step-by-step pathway from panic to unshakable peace.`,
      timestampsPlaceholder: `0:00 - The 2 AM Cortisol Trap\n0:55 - Why Affirmations Make Panic Worse\n3:20 - Bhagavad Gita 2.47 Explained Simply\n6:15 - The Unbaked Clay Pot Metaphor\n8:40 - 3-Minute Somatic Grounding Exercise\n11:20 - Next Steps & 1-on-1 Consultation`,
      consultationCta: `Ready to dissolve the root blocks in your life? Book a personalized 1-on-1 Spiritual Healing & Life Coaching Consultation here: https://example.com/consultation`,
      wordCount: 220
    },
    youtubeTags: [
      { tag: 'why do i wake up anxious at 2am', type: 'symptom_problem' },
      { tag: 'how to stop spiraling thoughts', type: 'symptom_problem' },
      { tag: 'nervous system freeze response', type: 'symptom_problem' },
      { tag: 'overthinking at night anxiety', type: 'symptom_problem' },
      { tag: 'root chakra healing for anxiety', type: 'spiritual_astrological' },
      { tag: 'bhagavad gita on mental health', type: 'spiritual_astrological' },
      { tag: 'sanatan dharma emotional healing', type: 'spiritual_astrological' },
      { tag: 'vedic psychology overthinking', type: 'spiritual_astrological' },
      { tag: 'muladhara chakra meditation', type: 'spiritual_astrological' },
      { tag: 'spiritual coaching for burnout', type: 'broad_longtail' },
      { tag: 'somatic healing rituals', type: 'broad_longtail' },
      { tag: 'nishkama karma real meaning', type: 'spiritual_astrological' },
      { tag: 'anxiety relief tips nighttime', type: 'symptom_problem' },
      { tag: 'spiritual healer consultation', type: 'broad_longtail' },
      { tag: 'spiritual solutions to real problems', type: 'broad_longtail' }
    ],
    hashtags: [
      '#AnxietyRelief',
      '#RootChakra',
      '#OverthinkingFix',
      '#BhagavadGita',
      '#SpiritualHealing'
    ],
    thumbnailTexts: [
      { text: 'WHY 2AM PANIC HAPPENS', isProblemStated: true },
      { text: 'STOP THE MENTAL SPIRAL', isProblemStated: true },
      { text: 'ANCIENT NERVOUS RESET', isProblemStated: false }
    ],
    instagramFacebookCaption: {
      hookLine: `Ever lie awake in bed at 2 AM feeling like your entire world is falling apart?`,
      captionBody: `You are not broken. You don't have an intellectual deficit; you have an ungrounded nervous system that forgot how to feel safe in gravity.\n\nWhen we grip the future tightly, our root contracts. Ancient Vedic wisdom diagnosed this 5,000 years ago in Bhagavad Gita 2.47.\n\nWatch our complete 12-minute breakdown on YouTube where we walk through the exact somatic reset to break this loop.`,
      mixedHashtags: ['#Overthinking', '#RootChakra', '#VedicWisdom', '#AnxietyHealing', '#SomaticReset'],
      softCtaYouTubeLinkInBio: `Watch the full video breakdown on our YouTube channel — link in bio.`
    }
  };
}

export function getFallbackPinterestPackage(
  topic?: string,
  category?: LifeProblemCategory,
  concept?: string
): PinterestPackage {
  const chosenTopic = topic || 'Healing 2 AM Overthinking';
  return {
    ...INITIAL_PINTEREST_PACKAGE,
    topic: chosenTopic,
    pins: [
      {
        id: 'pin-1',
        style: 'soft watercolor',
        imagePrompt: `A soft watercolor image of a serene person meditating at twilight with glowing warm earth roots descending into deep terra cotta ground, in a color palette of deep ochre, warm terracotta, and calming indigo, with space at the top and bottom for text overlay, vertical 2:3 ratio, no readable text in the image itself.`,
        overlayText: '5 Signs Your Nervous System Is in Root Freeze',
        pinTitle: 'Why You Feel Stuck & Overwhelmed: The Root Chakra Fix',
        isProblemLedTitle: true,
        pinDescription: `Struggling with unexplained panic, insomnia, or constant dread? Discover how ancient Sanatan Dharma and root regulation stop overthinking at the source. Full masterclass on our YouTube channel — link in bio.`,
        suggestedBoard: 'Spiritual Healing & Mental Wellness',
        destinationLinkNote: 'https://youtube.com/@dharmacraft/video-placeholder'
      },
      {
        id: 'pin-2',
        style: 'minimalist flat illustration',
        imagePrompt: `A minimalist flat illustration of the human energy spine with Muladhara and Anahata softly illuminated in warm copper and jade green tones, elegant clean vector lines, plenty of negative space at header and footer, vertical 2:3 ratio, no readable text in the image itself.`,
        overlayText: 'The Vedic Secret to Releasing Future Anxiety',
        pinTitle: 'Bhagavad Gita Wisdom for Modern Overthinking',
        isProblemLedTitle: false,
        pinDescription: `Krishna’s teaching on Nishkama Karma isn't about giving up your dreams—it's the ultimate biological antidote to mental paralysis. Learn the step-by-step somatic reset on YouTube (link in bio).`,
        suggestedBoard: 'Vedic Wisdom & Gita Lessons',
        destinationLinkNote: 'https://youtube.com/@dharmacraft/video-placeholder'
      },
      {
        id: 'pin-3',
        style: 'warm photo-realistic',
        imagePrompt: `A warm photo-realistic image of a wooden altar with a warm brass oil lamp glowing softly next to a smooth earthen bowl of water and river pebbles, gentle dawn sunlight filtering through linen curtains, vertical 2:3 ratio, no readable text in the image itself.`,
        overlayText: 'How to Ground Your Energy in 3 Minutes',
        pinTitle: 'Can’t Sleep? Try This Ancient Earth Ritual Tonight',
        isProblemLedTitle: true,
        pinDescription: `A gentle 3-minute evening ritual rooted in Sanatan Dharma to discharge excess mental prana and return your body to deep restorative calm. Watch the full demonstration on YouTube!`,
        suggestedBoard: 'Mindfulness & Evening Rituals',
        destinationLinkNote: 'https://youtube.com/@dharmacraft/video-placeholder'
      }
    ]
  };
}

export function getFallbackGrowthPlaybook(
  topic?: string,
  category?: LifeProblemCategory
): GrowthPlaybook {
  const chosenTopic = topic || 'Why You Freeze When Money Comes In';
  return {
    ...INITIAL_GROWTH_PLAYBOOK,
    topic: chosenTopic
  };
}

export function getFallbackDeepResearchBrief(userBrief?: string): DeepResearchBrief {
  const brief = userBrief || 'Overcoming 2 AM Anxiety and Imposter Syndrome';
  return {
    userBrief: brief,
    searchIntent: {
      realPhrasing: [
        `why do I get so anxious about ${brief.toLowerCase().slice(0, 25)}`,
        'how to calm down when spiraling at night',
        'somatic symptoms of fear and worry'
      ],
      symptomSearches: [
        'tight throat and chest pressure with no medical cause',
        'waking up panicked with heart racing at 3am'
      ]
    },
    relatedTrendingAngles: {
      connectedEvent: 'Amavasya New Moon Energetic Shift',
      isSeasonalOrAstrological: true,
      viralFormatOrAudioNote: 'Relatable dynamic dialogue with Nakul hyperventilating vs Nikhil grounding.',
      honestCaveat: 'Present as complementary spiritual and somatic practices, not clinical medical advice.'
    },
    sanatanDharmaGrounding: {
      primaryConcept: 'Muladhara Chakra & Vata Dosha Grounding',
      chakraOrPlanetOrScripture: 'Bhagavad Gita Chapter 2, Verse 47 (Paraphrased)',
      practicalTakeaway: 'Disengage from demanding guaranteed future outcomes; bring prana back into bodily gravity.',
      scriptureReferenceSafe: 'Bhagavad Gita Ch. 2 (Nishkama Karma)'
    },
    competitiveGap: {
      whatOthersCover: 'Superficial affirmations and manifestation bypass.',
      underServedAngleToOwn: 'Grounding real-life agony through authentic Vedic psychology and dual-character relatability.'
    },
    categories: ['mental_health', 'emotional_health'],
    straddlesMultipleCategories: true,
    uncertaintyFlags: ['Verify local tithi timings for current lunar cycle.'],
    suggestedWorkingTitle: `${brief.slice(0, 42)}: The Ancient Reset`,
    suggestedFormat: 'long-form YouTube'
  };
}

export function getFallbackTopicsModeA(categoryFilter?: string): TopicIdea[] {
  return [
    {
      id: 'topic-fb-1',
      workingTitle: 'Why You Freeze When You Get Money: Root Panic Fix',
      category: 'money_business',
      concept: 'Muladhara Chakra & Rahu Nervous System Dysregulation',
      whyNow: 'High search volume on financial anxiety and money self-sabotage',
      bestFormat: 'long-form YouTube',
      hook: 'Why did making more money yesterday make me hyperventilate at 2 AM?',
      festivalTie: {
        eventName: 'Budhaditya Yoga & Dhanteras Alignment',
        tithiOrDate: 'Autumn Season',
        isVerified: true,
        reasoning: 'Explores real inner vessel capacity before seeking commercial prosperity.'
      }
    },
    {
      id: 'topic-fb-2',
      workingTitle: 'Feeling Distant in Marriage? The Heart Chakra Reset',
      category: 'relationships',
      concept: 'Anahata Chakra & Prana Withdrawal in Intimacy',
      whyNow: 'Silent emotional abandonment trends on YouTube and Reddit',
      bestFormat: 'long-form YouTube',
      hook: 'Why do you feel totally alone even while sleeping next to your partner?',
      festivalTie: {
        eventName: 'Karwa Chauth / Chandra Mindfulness',
        tithiOrDate: 'Krishna Paksha Chaturthi',
        isVerified: true,
        reasoning: 'Re-centering relational devotion and energetic reciprocity.'
      }
    },
    {
      id: 'topic-fb-3',
      workingTitle: 'Waking Up at 3 AM with Racing Heart? The Vedic Fix',
      category: 'mental_health',
      concept: 'Ayurvedic Vata Hour & Padabhyanga Foot Grounding',
      whyNow: 'Nocturnal panic attack and cortisol spike searches are up 85%',
      bestFormat: 'long-form YouTube',
      hook: 'Your 3 AM panic attack is not an intellectual problem—it is a Vata storm.',
      festivalTie: {
        eventName: 'Amavasya (New Moon)',
        tithiOrDate: 'Monthly Lunar Reset',
        isVerified: true,
        reasoning: 'Dark moon night exacerbates mental agitation; ideal time for deep grounding rituals.'
      }
    },
    {
      id: 'topic-fb-4',
      workingTitle: 'The Lump in Your Throat: Unspoken Boundaries',
      category: 'physical_health',
      concept: 'Vishuddha Chakra & Shankha Mudra Somatic Unclenching',
      whyNow: 'Globus sensation and somatic stress searches trending without ENT diagnosis',
      bestFormat: 'long-form YouTube',
      hook: 'That tightness in your throat is every boundary you swallowed this year.',
      festivalTie: {
        eventName: 'None / Evergreen',
        tithiOrDate: 'Evergreen',
        isVerified: true,
        reasoning: 'Applicable throughout the year as an organic somatic release masterclass.'
      }
    },
    {
      id: 'topic-fb-5',
      workingTitle: 'Overcoming Grief & Heartbreak: The Water Element Flow',
      category: 'emotional_health',
      concept: 'Svadhishthana Chakra & Jala Tattva Emotional Discharge',
      whyNow: 'Pinterest searches for emotional numbness and breakup healing up 60%',
      bestFormat: 'long-form YouTube',
      hook: 'Why trying to be strong after heartbreak is poisoning your emotional body.',
      festivalTie: {
        eventName: 'Purnima (Full Moon)',
        tithiOrDate: 'Monthly Full Moon',
        isVerified: true,
        reasoning: 'High water element tide provides the natural lunar release for suppressed grief.'
      }
    }
  ];
}

export function getFallbackTrends(category?: string, focusSpace?: string): TrendItem[] {
  return [
    {
      id: 'fb-trend-1',
      platform: 'YouTube',
      trendTerm: 'why do I get nervous when things go well in life',
      category: 'mental_health',
      intent: 'Users experiencing upper-limit panic whenever relationships or business flourish.',
      contentAngle: 'Muladhara ungroundedness: the nervous system associates success with being targeted.',
      gap: 'Generic coaches say "just be grateful"; we explain the evolutionary survival reflex.',
      urgency: 'high',
      searchVolumeEstimate: '+54% this week'
    },
    {
      id: 'fb-trend-2',
      platform: 'Google Search',
      trendTerm: 'waking up at 2am tight chest cortisol spike spiritual reason',
      category: 'physical_health',
      intent: 'Physical panic symptoms during the Vata/Pitta transition hour of the night.',
      contentAngle: 'Ayurvedic circadian rhythm reset and Ajna chakra overstimulation.',
      gap: 'Medical sites give generic sleep hygiene; we provide somatic breath and foot oil ritual.',
      urgency: 'high',
      searchVolumeEstimate: '+78% monthly spike'
    },
    {
      id: 'fb-trend-3',
      platform: 'Pinterest',
      trendTerm: 'root chakra money blocks healing affirmation',
      category: 'money_business',
      intent: 'Searching for visual guides to unblock persistent financial anxiety.',
      contentAngle: 'Gita 2.47 detachment from outcome as a nervous system regulation practice.',
      gap: 'Pins feature aesthetic crystals; we provide practical psychological depth.',
      urgency: 'evergreen',
      searchVolumeEstimate: '110k monthly saves'
    },
    {
      id: 'fb-trend-4',
      platform: 'Reddit & Quora',
      trendTerm: 'How to stop taking on partner emotional burden and burnout',
      category: 'relationships',
      intent: 'Over-functioning in romantic partnerships leading to exhaustion and loss of passion.',
      contentAngle: 'Karmic Runanubandha boundaries and restoring Shiva-Shakti balance.',
      gap: 'Reddit advice is cynical; we guide emotional boundary setting with compassionate detachment.',
      urgency: 'high',
      searchVolumeEstimate: 'Top weekly thread'
    }
  ];
}

export function getFallbackCalendar(month?: string, year?: string): CalendarItem[] {
  const currentMonth = month || 'September';
  const currentYear = year || '2026';
  return [
    {
      id: 'cal-fb-1',
      date: `${currentYear}-09-06`,
      dayOfWeek: 'Sunday',
      festivalOrTithi: 'Aja Ekadashi Preparation',
      platform: 'YouTube',
      contentType: 'Long-form Video',
      title: 'Why You Freeze When You Get Money: The Root Chakra Fix (14 min)',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'Weekly Anchor Video with Nakul & Nikhil dynamic dialogue. Includes consultation CTA.'
    },
    {
      id: 'cal-fb-2',
      date: `${currentYear}-09-07`,
      dayOfWeek: 'Monday',
      festivalOrTithi: 'Ekadashi Vrata',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel Cut #1: The 2 AM Payday Panic Attack (48s)',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'Soft CTA driving viewers to the YouTube video link in bio. No direct consultation ask.'
    },
    {
      id: 'cal-fb-3',
      date: `${currentYear}-09-08`,
      dayOfWeek: 'Tuesday',
      festivalOrTithi: 'Post-Ekadashi Parana',
      platform: 'Pinterest',
      contentType: 'Pinterest Pin',
      title: 'Watercolor Pin: 5 Signs Your Root Chakra Is in Freeze',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'Links directly to YouTube video URL.'
    },
    {
      id: 'cal-fb-4',
      date: `${currentYear}-09-09`,
      dayOfWeek: 'Wednesday',
      festivalOrTithi: 'Pradosh Vrat',
      platform: 'Instagram/Facebook',
      contentType: 'Carousel',
      title: 'Carousel (7 slides): The Unbaked Clay Pot Metaphor',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'High save rate asset. Final slide drives to YouTube link in bio.'
    },
    {
      id: 'cal-fb-5',
      date: `${currentYear}-09-10`,
      dayOfWeek: 'Thursday',
      festivalOrTithi: 'Brihaspati Guruvāra',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel Cut #2: Bhagavad Gita 2.47 in 55 Seconds',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'Shlok breakdown with Sanskrit audio cue. Link in bio CTA.'
    },
    {
      id: 'cal-fb-6',
      date: `${currentYear}-09-11`,
      dayOfWeek: 'Friday',
      festivalOrTithi: 'Shukra Sandhya',
      platform: 'Pinterest',
      contentType: 'Pinterest Pin',
      title: 'Illustration Pin: How to Ground Your Nervous System in 3 Minutes',
      category: 'money_business',
      status: 'Scheduled',
      notes: 'Drives to YouTube channel.'
    },
    {
      id: 'cal-fb-7',
      date: `${currentYear}-09-12`,
      dayOfWeek: 'Saturday',
      festivalOrTithi: 'Shani Amavasya Pre-Eve',
      platform: 'Meta/Stories',
      contentType: 'Pre-Launch Hype',
      title: 'Community Poll & Hype: What keeps you awake at 2 AM?',
      category: 'mental_health',
      status: 'Idea',
      notes: 'Pre-launch algorithm warming for next week’s Sunday anchor video.'
    }
  ];
}

export function getFallbackLearningAnalysis(feedbackLogs?: any[]): FeedbackAnalysis {
  return {
    totalAnalyzed: feedbackLogs?.length || 8,
    topPerformingCategories: [
      { category: 'money_business', avgCtr: 9.4, avgRetention: 62.5 },
      { category: 'mental_health', avgCtr: 8.8, avgRetention: 58.0 },
      { category: 'relationships', avgCtr: 8.2, avgRetention: 54.0 }
    ],
    hookFormulaEffectiveness: [
      {
        formula: 'Nakul 2 AM Relatable Panic Attack + Nikhil Sthira Pause',
        winRate: 92,
        recommendation: 'Keep opening 0-15s tightly focused on Nakul stating the exact bodily symptom before philosophical explanation.'
      },
      {
        formula: 'Symptom-Led YouTube Title (<50 chars)',
        winRate: 88,
        recommendation: 'Always lead with the physical ache or panic question rather than Sanskrit terminology in the first 30 characters.'
      }
    ],
    seoLessons: [
      'Problem-led titles consistently outperform spiritual-led titles by 2.4x in click-through rate.',
      'Sanskrit terms belong in tags and timestamps, not in the primary 40 characters of thumbnail text.',
      'Descriptions that front-load the 2 AM emotional pain point before the fold convert 35% higher to the consultation link.',
      'Pinterest pins formatted with 2:3 vertical aspect ratio and muted earth tones yield 4x repins over bright saturation.'
    ],
    strategicAdjustments: [
      'Ensure Nakul is acted with genuine exasperation and comedic relatability so Nikhil never sounds arrogant or academic.',
      'Strictly maintain the 3-step YouTube CTA ladder: Share -> 1-on-1 Consultation -> Next watch loop.',
      'Never include direct consultation links on Instagram or Pinterest; channel all external traffic to the YouTube anchor.'
    ],
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

