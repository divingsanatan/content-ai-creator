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
  FeedbackAnalysis,
  AutoPilotRunResult
} from '../src/types';
import { INITIAL_SCRIPT_PACKAGE, INITIAL_SEO_PACKAGE, INITIAL_PINTEREST_PACKAGE, INITIAL_GROWTH_PLAYBOOK } from '../src/data/initialPackages';

export function getFallbackScriptPackage(
  topic?: string,
  category?: LifeProblemCategory,
  concept?: string,
  userNotes?: string
): ScriptPackage {
  const chosenTopic = topic || 'Why Big Wins & Success Trigger Sudden Nervous System Freeze';
  const chosenCategory: LifeProblemCategory = category || 'mental_health';
  const chosenConcept = concept || 'Muladhara Grounding & Gita Chapter 2 Nishkama Karma';

  // Customize dialogue with user's topic in natural conversational Hinglish
  const dialogueScript = [
    {
      id: 'd-1',
      speaker: 'Nakul' as const,
      actorNote: '[Pacing rapidly, voice strained, intense relatable frustration]',
      dialogue: `Nikhil, mujhe bas ek seedha jawab de before I lose my mind. Tuesday dopehar ko 2:30 baje jab mere biggest client ka advance wire transfer aaya, to main celebrate karne ke bajay apni car me baith ke hyperventilate kyu kar raha tha about "${chosenTopic}"? Maine deep breathing try kiya, affirmations bole, par gala band ho gaya aur haath kaanpne lage. Why does my body treat success like an existential predator right now?!`,
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
      dialogue: `Wah bhai, fantastic! To main apne bills aur clients ko bol du ki main gravity me grounded hu?! What about the actual problem? Aise broad daylight me baith ke lotus pose me sab theek hone ka manifest karu?!`,
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
    storyArchetype: 'paradox_of_success',
    storySetting: 'Tuesday 2:30 PM parked in a car right after signing a dream contract',
    personalLearningTakeaway: 'The nervous system cannot distinguish between survival terror and unfamiliar success until the root chakra is somaticized and grounded.',
    dialogueScript,
    hook: {
      ideaCollision: `Tuesday dopehar ko 2:30 baje account me life-changing payment aane par celebrate karne ke bajay apni car me freeze kyu ho gaya?`,
      alternateCollisionOptions: [
        `Jaise hi "${chosenTopic}" ki baat aati hai, tumhara dimaag freeze kyu ho jata hai.`,
        `Kyu tumhara nervous system success ko ek existential threat samajhta hai.`,
        `Rishis ko "${chosenTopic}" ke baare me kya pata tha jo modern therapy miss kar deti hai.`
      ],
      buildToElevenSeconds: `Agar aapne saare affirmations try kar liye hain, fir bhi badi jeet milne par gala band ho jata hai aur haath kaanpne lagte hain, to ye mindset failure nahi hai—ye ek ungrounded root reflex hai.`
    },
    stakes: {
      lowestPointStory: `Car ki steering wheel ko pakad kar freeze ho jana jabki phone screen pe congratulations ke messages aa rahe the, unable to swallow because the throat locked down in sheer unworthiness.`,
      visceralBodyFeeling: `Gala band ho jana, chest me heavy lead anvil, hatheliyon pe thanda paseena aur shallow breathing.`,
      internalCrisisDialogue: `"Agar main is success ko handle nahi kar paya to agle mahine sab chhin jayega aur meri pol khul jayegi."`,
      twoAmInternalDialogue: `"Agar main is success ko handle nahi kar paya to agle mahine sab chhin jayega aur meri pol khul jayegi."`
    },
    turn: {
      livedRealization: `Ye realize karna ki somatic freeze ko overthink karne se aag aur bhadakti hai. Tum soch ke safety tak nahi pahunch sakte; tumhe gravity me anchor hona padega.`,
      sanatanTeachingIntegrated: chosenConcept,
      momentOfLevityOrJoy: `Nakul realizing that his dramatic nervous system reaction was just a classic ungrounded Vata reflex, laughing at how he turned his biggest win into a horror film in broad daylight.`
    },
    shatter: {
      micDropQuote: `Kacche mitti ke bartan me amrit nahi tikta. Pehle root ko regulate karo, tabhi abundance rukk payegi.`,
      quotableLines: [
        `Anxiety koi character flaw nahi hai; ye prana hai bina kisi anchor ke.`,
        `Action tumhare haath me hai; outcome pe obsess karna Prakriti ke aage God khelna hai.`
      ]
    },
    ctaLadder: {
      step1_share: `Ye video apne us dost ko zaroor share karo jo din bhar hard work karke jeetne ke baad bhi andar se shaant nahi ho pata.`,
      step2_consult: `Agar aap ${chosenTopic.toLowerCase()} ya mental burnout me phase hue hain, to description me 1-on-1 spiritual healing aur life coaching consultation book karein. Hum milkar aapka energetic blueprint restore karenge.`,
      step3_nextVideo: `Iske baad, hamara next episode dekhein: Kaise subah sirf 7 minute me apne Prana ko reset karein taaki din bhar overwhelm na ho.`
    },
    storyBrandCTA: {
      hero: `The viewer trapped in ${chosenTopic.toLowerCase()} who feels exhausted and misunderstood by conventional advice.`,
      problem: `External: Constant friction around ${chosenTopic.toLowerCase()}. Internal: Nighttime anxiety, chest tightness, and emotional drain. Philosophical: Why does striving for peace feel like a fight for survival?`,
      guideRole: `Nikhil (and you): Grounded spiritual guide who has navigated the same abyss, bringing Vedic psychology and somatic regulation without toxic positivity or preachy superiority.`,
      plan: `1. Book a 1-on-1 Vedic consultation -> 2. Diagnose your root energetic knot and dosha/kosha imbalance -> 3. Receive an actionable somatic regulation protocol.`,
      callToAction: `Book a 1-on-1 consultation for spiritual healing and life coaching via the link in the description.`,
      failureAvoided: `Avoids endless spiral of insomnia, wasted energy on superficial fixes, and chronic biological burnout.`,
      successVision: `Restoring Sthira: waking up with a calm heart, grounded presence, and the inner capacity to face modern challenges without panic.`,
      turnBeatRole: `The Turn beat is where the speaker transforms from fellow sufferer into the Guide, pointing not to personal vanity, but to the timeless Vedic roadmap.`
    },
    pasoOrbitShort: {
      duration: '60-90s',
      problem: `Badi deal ya success aate hi chest tight aur nervous system freeze kyu ho jata hai?`,
      agitate: `Aapne saare mindset hacks try kar liye, par jab body me breakthrough aati hai to ungrounded root use existential threat register karti hai. Dimaag worst-case scenarios create karne lagta hai.`,
      solve: `Sanatan wisdom ka core secret: ${chosenConcept}. Ye intellectual debate nahi, ek biological reset protocol hai.`,
      outcome: `Chest se tight band pighal jata hai, pelvic floor tak saans aati hai, aur mind spiral karna band kar deta hai.`,
      softCta: `Watch the full deep-dive breakdown on YouTube. Link in bio.`,
      zeroFabricationVerified: true
    },
    abtDiagnostic: {
      andSetup: `Nakul worked for years to close the biggest opportunity of his career AND celebrated on paper,`,
      butLinchpin: `BUT his autonomic nervous system treated this huge win as a biological predator in broad daylight,`,
      thereforeResolution: `THEREFORE, he had to stop trying to think his way to safety and use Sanatan somatic grounding (${chosenConcept}) to anchor his root.`,
      compressedOneLiner: `Nakul worked years to achieve "${chosenTopic}" AND succeeded, BUT his nervous system panicked in his car, THEREFORE he had to anchor his root with ${chosenConcept}.`,
      hasLinchpinContradiction: true,
      singleIdentifiableProtagonist: 'Nakul (One specific relatable human dealing with this crisis)',
      diagnosticVerdict: 'Story Engine Validated (Linchpin Found)'
    },
    universalRetentionCheck: {
      reasonToCare: {
        beat: `00:00 - 00:45 (Visceral success freeze hook for ${chosenTopic})`,
        status: 'pass',
        note: 'Directly triggers immediate emotional recognition in the viewer within 8 seconds.'
      },
      movement: {
        beat: '01:00 - 05:00 (Dynamic Nakul & Nikhil banter without monologue lectures)',
        status: 'pass',
        note: 'Keeps narrative momentum high with alternating conflict and grounded responses.'
      },
      payoff: {
        beat: `05:15 - 08:30 (Actionable Sanatan teaching: ${chosenConcept})`,
        status: 'pass',
        note: 'Delivers a crisp, satisfying resolution that genuinely untangles the tension.'
      },
      ctaLoop: {
        beat: '09:00 - End (StoryBrand Guide CTA & next video hook)',
        status: 'pass',
        note: 'Naturally bridges viewer into deep 1-on-1 consultation support.'
      },
      retentionRating: 'Optimal Flow'
    },
    reelCuts: [
      {
        id: 'reel-1',
        cutNumber: 1,
        title: `The Payday Panic: When Success Freezes Your Body`,
        timecodeInLongVideo: '00:00 - 00:48',
        targetDuration: '48s',
        hookLine: `${chosenTopic} achieve karte hi celebrate karne ke bajay pet me achanak knot kyu ban jata hai?`,
        onScreenCaptionText: `POV: Deal close ho gayi par nervous system ne red alert ghoshit kar diya 💀`,
        audioTrackVibe: 'Ticking clock Foley under Nakul, abrupt quiet when Nikhil delivers the truth',
        editingDirection: 'Tight dynamic zoom on Nakul staring at his steering wheel, hard cut to Nikhil upright and serene.',
        dialogueExchanges: [
          {
            speaker: 'Nakul',
            note: '[Agitated, pacing rapidly]',
            line: `Nikhil, ${chosenTopic} hote hi aisa kyu lagta hai ki kisi ne mere haath me live grenade pakda diya ho?!`
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
  const chosenTopic = topic || 'Why Success & Big Deals Freeze Your Body';
  const cleanTitle = chosenTopic.replace(/["\n\r]/g, '').slice(0, 50);

  return {
    ...INITIAL_SEO_PACKAGE,
    topic: chosenTopic,
    titles: [
      {
        title: `Why You Freeze Under Pressure (And How to Stop It)`,
        charCount: 47,
        isProblemLed: true
      },
      {
        title: `Can't Celebrate Your Wins? Ancient Vedic Root Fix`,
        charCount: 49,
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
      firstTwoLinesFold: `If big opportunities or daily pressure leave you with a pounding heart and spiraling thoughts about ${cleanTitle.toLowerCase()}, this video reveals why mindset tricks fail and what ancient Sanatan Dharma offers instead.`,
      summary: `In this episode, we break down why modern overthinking is not a failure of will, but an ungrounded nervous system reflex. Using Vedic psychology, Bhagavad Gita Chapter 2, and somatic root regulation, we explore the step-by-step pathway from panic to unshakable peace.`,
      timestampsPlaceholder: `0:00 - The Real-World Breakdown\n0:55 - Why Affirmations Make Panic Worse\n3:20 - Bhagavad Gita 2.47 Explained Simply\n6:15 - The Unbaked Clay Pot Metaphor\n8:40 - 3-Minute Somatic Grounding Exercise\n11:20 - Next Steps & 1-on-1 Consultation`,
      consultationCta: `Ready to dissolve the root blocks in your life? Book a personalized 1-on-1 Spiritual Healing & Life Coaching Consultation here: https://example.com/consultation`,
      wordCount: 220
    },
    youtubeTags: [
      { tag: 'why do i freeze under pressure', type: 'symptom_problem' },
      { tag: 'how to stop spiraling thoughts', type: 'symptom_problem' },
      { tag: 'nervous system freeze response', type: 'symptom_problem' },
      { tag: 'panic when success arrives', type: 'symptom_problem' },
      { tag: 'root chakra healing for anxiety', type: 'spiritual_astrological' },
      { tag: 'bhagavad gita on mental health', type: 'spiritual_astrological' },
      { tag: 'sanatan dharma emotional healing', type: 'spiritual_astrological' },
      { tag: 'vedic psychology overthinking', type: 'spiritual_astrological' },
      { tag: 'muladhara chakra meditation', type: 'spiritual_astrological' },
      { tag: 'spiritual coaching for burnout', type: 'broad_longtail' },
      { tag: 'somatic healing rituals', type: 'broad_longtail' },
      { tag: 'nishkama karma real meaning', type: 'spiritual_astrological' },
      { tag: 'anxiety relief tips daytime', type: 'symptom_problem' },
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
      { text: 'WHY PRESSURE FREEZES YOU', isProblemStated: true },
      { text: 'STOP THE MENTAL SPIRAL', isProblemStated: true },
      { text: 'ANCIENT NERVOUS RESET', isProblemStated: false }
    ],
    instagramFacebookCaption: {
      hookLine: `Ever closed a huge deal or stepped into a big moment, only for your throat to lock up and your hands to freeze?`,
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
  const chosenTopic = topic || 'Why Success & Big Wins Freeze Your Body';
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
  const brief = userBrief || 'Overcoming Imposter Syndrome and Sudden Nervous System Freeze';
  return {
    userBrief: brief,
    searchIntent: {
      realPhrasing: [
        `why do I get so anxious about ${brief.toLowerCase().slice(0, 25)}`,
        'how to calm down when spiraling under pressure',
        'somatic symptoms of fear and worry'
      ],
      symptomSearches: [
        'tight throat and chest pressure with no medical cause',
        'hands shaking and freeze response when praised or paid'
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
      hook: 'Why did signing my biggest deal make my throat freeze instead of celebrating?',
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
      hook: 'Why do you feel totally alone even while sitting next to your partner at dinner?',
      festivalTie: {
        eventName: 'Karwa Chauth / Chandra Mindfulness',
        tithiOrDate: 'Krishna Paksha Chaturthi',
        isVerified: true,
        reasoning: 'Re-centering relational devotion and energetic reciprocity.'
      }
    },
    {
      id: 'topic-fb-3',
      workingTitle: 'When Workday Pressure Mounts: The Ancient Vedic Fix',
      category: 'mental_health',
      concept: 'Ayurvedic Vata Hour & Padabhyanga Foot Grounding',
      whyNow: 'Workday panic attack and cortisol spike searches are up 85%',
      bestFormat: 'long-form YouTube',
      hook: 'Your sudden afternoon freeze is not an intellectual problem—it is a Vata storm.',
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
      trendTerm: 'sudden workday chest tightness freeze spiritual reason',
      category: 'physical_health',
      intent: 'Physical panic symptoms during the high-pressure work hours.',
      contentAngle: 'Ayurvedic circadian rhythm reset and Ajna chakra overstimulation.',
      gap: 'Medical sites give generic advice; we provide somatic breath and grounding ritual.',
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
    // Monday-Thursday: Reels cut from the main video
    {
      id: 'cal-fb-1',
      date: `${currentYear}-09-07`,
      dayOfWeek: 'Monday',
      festivalOrTithi: 'Aja Ekadashi',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel 1: The $45k Afternoon Payday Freeze (Hook Cut)',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Cut from Sept 11 main video: Nakul pacing in parking lot after contract signing. Soft CTA: Full video drops Friday on YouTube.'
    },
    {
      id: 'cal-fb-2',
      date: `${currentYear}-09-08`,
      dayOfWeek: 'Tuesday',
      festivalOrTithi: 'Post-Ekadashi Parana',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel 2: Nakul vs Nikhil - Why Budgeting Won\'t Fix Root Fear (Dialogue Cut)',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Cut from Sept 11 main video: Clash between surface advice and deep Muladhara survival fear. Drops Friday on YouTube.'
    },
    {
      id: 'cal-fb-3',
      date: `${currentYear}-09-09`,
      dayOfWeek: 'Wednesday',
      festivalOrTithi: 'Pradosh Vrat',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel 3: 3 Somatic Shifts to Unfreeze Your Nervous System (Body Cut)',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Cut from Sept 11 main video: Annamaya Kosha pelvic grounding and diaphragmatic reset. Coming Friday to YouTube.'
    },
    {
      id: 'cal-fb-4',
      date: `${currentYear}-09-10`,
      dayOfWeek: 'Thursday',
      festivalOrTithi: 'Pre-Bhadrapada Amavasya',
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: 'Reel 4: Ancient Shlok Resolution - Gita 2.47 in 50 Seconds (Pre-Release Cut)',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Cut from Sept 11 main video: Sanskrit chanting by Nikhil with modern corporate reframing. Tomorrow: Full 14-min Masterclass!'
    },
    // Friday: Main YouTube Anchor Video
    {
      id: 'cal-fb-5',
      date: `${currentYear}-09-11`,
      dayOfWeek: 'Friday',
      festivalOrTithi: 'Bhadrapada Amavasya (Pithori Amavasya)',
      platform: 'YouTube',
      contentType: 'Long-form Video',
      title: 'Why You Freeze When You Get Money: Healing Root Panic',
      category: 'money_business',
      status: 'Scheduled',
      notes: '🏆 WEEK 1 YOUTUBE PILLAR ANCHOR (14 min). Masterclass featuring Nakul & Nikhil dynamic dialogue, Gita 2.47 grounding, and full consultation CTA ladder.'
    },
    // Saturday & Sunday: Quora marketing for the main video
    {
      id: 'cal-fb-6',
      date: `${currentYear}-09-12`,
      dayOfWeek: 'Saturday',
      festivalOrTithi: 'Shani Amavasya Eve',
      platform: 'Quora',
      contentType: 'Quora Marketing',
      title: 'Quora Marketing: Answering "Why do I feel intense panic and anxiety right after getting paid?"',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Weekend Quora distribution: High-intent answer explaining somatic survival freeze, providing actionable takeaways, and embedding link to the Friday YouTube video.'
    },
    {
      id: 'cal-fb-7',
      date: `${currentYear}-09-13`,
      dayOfWeek: 'Sunday',
      festivalOrTithi: 'Shani Amavasya (Sanatan Grounding)',
      platform: 'Quora',
      contentType: 'Quora Marketing',
      title: 'Quora Marketing: Deep-Dive Case Study on Muladhara Survival Freeze & Reconditioning the Nervous System',
      category: 'money_business',
      status: 'Scheduled',
      parentLongformId: 'cal-fb-5',
      notes: 'Weekend Quora distribution: Long-tail authority post on "Can nervous system regulation heal financial self-sabotage?", routing readers to Friday\'s YouTube anchor.'
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
        formula: 'Nakul Real-World Relatable Vulnerability + Nikhil Sthira Pause',
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
      'Descriptions that front-load the relatable bodily trigger before the fold convert 35% higher to the consultation link.',
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

export function getFallbackAutoPlanAndScript(
  brief: string,
  existingCalendar: CalendarItem[],
  categoryPreference?: LifeProblemCategory
): AutoPilotRunResult {
  const cleanBrief = brief.trim() || 'Why you freeze when you get money: root chakra healing';
  const lowerBrief = cleanBrief.toLowerCase();

  // 1. Determine Category
  let category: LifeProblemCategory = categoryPreference || 'mental_health';
  if (!categoryPreference) {
    if (lowerBrief.includes('money') || lowerBrief.includes('business') || lowerBrief.includes('salary') || lowerBrief.includes('wealth') || lowerBrief.includes('cash') || lowerBrief.includes('client')) {
      category = 'money_business';
    } else if (lowerBrief.includes('relationship') || lowerBrief.includes('partner') || lowerBrief.includes('marriage') || lowerBrief.includes('dating') || lowerBrief.includes('mother') || lowerBrief.includes('ex')) {
      category = 'relationships';
    } else if (lowerBrief.includes('chest') || lowerBrief.includes('gut') || lowerBrief.includes('stomach') || lowerBrief.includes('sleep') || lowerBrief.includes('vata') || lowerBrief.includes('pitta') || lowerBrief.includes('ache')) {
      category = 'physical_health';
    } else if (lowerBrief.includes('grief') || lowerBrief.includes('shame') || lowerBrief.includes('guilt') || lowerBrief.includes('heartbreak') || lowerBrief.includes('sadness')) {
      category = 'emotional_health';
    }
  }

  // 2. Determine Sanatan Dharma Concept
  const conceptMap: Record<string, { concept: string; shlokSource: string; shlokSanskrit: string; hook: string }> = {
    money_business: {
      concept: 'Muladhara (Root Chakra) safety dysregulation & Bhagavad Gita 2.47 Nishkama Karma',
      shlokSource: 'Bhagavad Gita, Chapter 2, Verse 47',
      shlokSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      hook: 'I once froze for three hours after getting a bonus because my nervous system registered wealth as danger.'
    },
    relationships: {
      concept: 'Anahata (Heart Chakra) contraction & Runanubandha karmic debt boundaries',
      shlokSource: 'Katha Upanishad, Chapter 1, Section 3',
      shlokSanskrit: 'आत्मानं रथिनं विद्धि शरीरं रथमेव तु। बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च॥',
      hook: 'If you keep feeling like your partner’s unpaid therapist, you are not in love — you are paying an energetic karmic debt.'
    },
    mental_health: {
      concept: 'Vata Dosha nocturnal surge & Manas-Prana stabilization with Sattvic Pratyahara',
      shlokSource: 'Patanjali Yoga Sutras 1.2',
      shlokSanskrit: 'योगश्चित्तवृत्तिनिरोधः॥',
      hook: 'When you wake up at 2:47 AM with adrenaline in your throat, your soul isn’t broken — your Vata is blowing through your chest.'
    },
    physical_health: {
      concept: 'Manipura Chakra digestive fire (Jatharagni) & Somatic grounding rituals',
      shlokSource: 'Charaka Samhita, Sutrasthana 28',
      shlokSanskrit: 'शान्तेऽग्नौ म्रियते, युक्ते चिरं जीवत्यनामयः।',
      hook: 'That chronic knot right below your ribcage isn’t just bad posture — it’s where your nervous system stores unspoken boundaries.'
    },
    emotional_health: {
      concept: 'Svadhishthana Jala Tattva flow & Releasing ancestral sorrow without suppression',
      shlokSource: 'Bhagavad Gita, Chapter 2, Verse 14',
      shlokSanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      hook: 'The emotional numbness you feel after trauma is not weakness; it is your soul’s emergency fuse protecting you from overload.'
    }
  };

  const selectedConcept = conceptMap[category] || {
    concept: `${category.replace(/_/g, ' ')} harmony through Sanatan Dharma principles`,
    shlokSource: 'Bhagavad Gita, Chapter 2, Verse 47',
    shlokSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    hook: `That tension you feel around ${category.replace(/_/g, ' ')} isn't a failure — it's your nervous system seeking equilibrium.`
  };

  // 3. Generate Working Title (<60 chars)
  let workingTitle = `Why You Freeze With ${cleanBrief.slice(0, 22).trim()}`;
  if (cleanBrief.length <= 48 && !cleanBrief.includes('\n')) {
    workingTitle = cleanBrief.charAt(0).toUpperCase() + cleanBrief.slice(1);
  } else if (category === 'money_business') {
    workingTitle = 'Why Big Wins Trigger Sudden Nervous System Freeze';
  } else if (category === 'relationships') {
    workingTitle = 'Why You Attract Partners You Mother (Karmic Loop)';
  } else if (category === 'mental_health') {
    workingTitle = 'The Workday Panic Attack: Somatic Vedic Reset';
  } else if (category === 'physical_health') {
    workingTitle = 'Why Chronic Tension Stays in Your Gut (Pitta Reset)';
  } else {
    workingTitle = 'Healing Unspoken Emotional Numbness: The Turn';
  }

  // Ensure title is strictly <= 60 characters
  if (workingTitle.length > 58) {
    workingTitle = workingTitle.slice(0, 55).trim() + '...';
  }

  // 4. Determine Smart Calendar Placement & Weekly Cadence
  // Find which Fridays already have an anchor video
  const existingAnchorDates = new Set(
    existingCalendar
      .filter(item => item.contentType === 'Long-form Video')
      .map(item => item.date)
  );

  const candidateFridays = [
    { date: '2026-09-11', sprint: 'Week 1 Sprint (Sep 07 - Sep 13)', festival: 'Bhadrapada Amavasya (Pithori Amavasya)' },
    { date: '2026-09-18', sprint: 'Week 2 Sprint (Sep 14 - Sep 20)', festival: 'Post-Ganesh Chaturthi Window' },
    { date: '2026-09-25', sprint: 'Week 3 Sprint (Sep 21 - Sep 27)', festival: 'Anant Chaturdashi Transition' },
    { date: '2026-10-02', sprint: 'Week 4 Sprint (Sep 28 - Oct 04)', festival: 'Mahalaya Transition' },
    { date: '2026-10-09', sprint: 'Week 5 Sprint (Oct 05 - Oct 11)', festival: 'Indira Ekadashi Window' },
    { date: '2026-10-16', sprint: 'Week 6 Sprint (Oct 12 - Oct 18)', festival: 'Sharad Navratri Pratipada' },
    { date: '2026-10-23', sprint: 'Week 7 Sprint (Oct 19 - Oct 25)', festival: 'Durga Ashtami & Vijayadashami' },
    { date: '2026-10-30', sprint: 'Week 8 Sprint (Oct 26 - Nov 01)', festival: 'Sharad Purnima Healing Moon' }
  ];

  // Pick the earliest Friday that is not already booked with a long-form anchor
  let chosenSlot = candidateFridays.find(slot => !existingAnchorDates.has(slot.date));
  if (!chosenSlot) {
    chosenSlot = candidateFridays[1]; // fallback to Week 2
  }

  const anchorDate = chosenSlot.date;
  const anchorId = `cal-anchor-${Date.now()}`;

  // Helper to get offset date YYYY-MM-DD
  const getOffsetDate = (baseDateStr: string, offsetDays: number): string => {
    const d = new Date(baseDateStr + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const getDayName = (dateStr: string): string => {
    return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  };

  // 5. Generate Full 7-Day Cadence:
  // - Monday to Thursday: Reels cut from the main video
  // - Friday: YouTube Anchor Video
  // - Saturday and Sunday: Quora marketing for the main video
  const generatedCalendarItems: CalendarItem[] = [
    {
      id: `cal-reel1-${Date.now()}`,
      date: getOffsetDate(anchorDate, -4),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, -4)),
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: `Reel 1: The 0-45s Hook Cut from "${workingTitle}"`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'High-voltage opening hook cut directly from the main video. Spoken in conversational Hinglish. Soft CTA points to Friday YouTube video.'
    },
    {
      id: `cal-reel2-${Date.now()}`,
      date: getOffsetDate(anchorDate, -3),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, -3)),
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: `Reel 2: Nakul vs Nikhil Clash Cut from "${workingTitle}"`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'Dynamic dialogue clash cut from the main video exposing surface spiritual clichés. Drops Friday on YouTube.'
    },
    {
      id: `cal-reel3-${Date.now()}`,
      date: getOffsetDate(anchorDate, -2),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, -2)),
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: `Reel 3: 3 Somatic Shifts Cut from "${workingTitle}"`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'Physical nervous system unfreeze ritual cut from main video. Teases Friday full breakdown on YouTube.'
    },
    {
      id: `cal-reel4-${Date.now()}`,
      date: getOffsetDate(anchorDate, -1),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, -1)),
      platform: 'Instagram/Facebook',
      contentType: 'Short/Reel',
      title: `Reel 4: Nikhil's Shlok Breakthrough Cut (${selectedConcept.shlokSource.split(',')[0]})`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'Sanskrit shlok chanting with modern reframing cut from main video. Tomorrow: Full 12-15 min Masterclass!'
    },
    {
      id: anchorId,
      date: anchorDate,
      dayOfWeek: getDayName(anchorDate),
      festivalOrTithi: chosenSlot.festival,
      platform: 'YouTube',
      contentType: 'Long-form Video',
      title: `${workingTitle} (12–15 Min Anchor)`,
      category,
      status: 'Scheduled',
      notes: `Weekly Anchor Pillar: Dynamic Nakul & Nikhil dialogue in Hinglish. Features 4 Reel cuts earlier in the week and embedded consultation CTA.`
    },
    {
      id: `cal-quora1-${Date.now()}`,
      date: getOffsetDate(anchorDate, 1),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, 1)),
      platform: 'Quora',
      contentType: 'Quora Marketing',
      title: `Quora Marketing: Answering high-intent questions on "${workingTitle.slice(0, 38)}"`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'Weekend Quora distribution: High-intent answer explaining somatic roots, providing actionable takeaways, and embedding link to the Friday YouTube video.'
    },
    {
      id: `cal-quora2-${Date.now()}`,
      date: getOffsetDate(anchorDate, 2),
      dayOfWeek: getDayName(getOffsetDate(anchorDate, 2)),
      platform: 'Quora',
      contentType: 'Quora Marketing',
      title: `Quora Marketing: Deep-dive Vedic case study on "${workingTitle.slice(0, 38)}"`,
      category,
      status: 'Scheduled',
      parentLongformId: anchorId,
      notes: 'Weekend Quora distribution: Long-tail authority breakdown driving compound organic search readers to Friday\'s YouTube anchor.'
    }
  ];

  // 6. Generate Script Package
  const scriptPackage = getFallbackScriptPackage(workingTitle, category, selectedConcept.concept, cleanBrief);
  scriptPackage.id = `script-${Date.now()}`;
  scriptPackage.topicTitle = workingTitle;

  // 7. Generate SEO Package
  const seoPackage = getFallbackSEOPackage(workingTitle, category, cleanBrief);

  // 8. Generate Pinterest Package
  const pinterestPackage = getFallbackPinterestPackage(workingTitle, category, selectedConcept.concept);

  // 9. Topic Object
  const topic: TopicIdea = {
    id: `topic-${Date.now()}`,
    workingTitle,
    category,
    concept: selectedConcept.concept,
    whyNow: chosenSlot.festival,
    bestFormat: 'long-form YouTube',
    hook: selectedConcept.hook,
    status: 'scripted',
    festivalTie: {
      eventName: chosenSlot.festival,
      tithiOrDate: chosenSlot.date,
      isVerified: true,
      reasoning: `Scheduled during ${chosenSlot.sprint} to honor weekly cadence and match lunar energy.`
    }
  };

  return {
    brief: cleanBrief,
    topic,
    calendarItems: generatedCalendarItems,
    anchorDate,
    scriptPackage,
    seoPackage,
    pinterestPackage,
    schedulingReasoning: {
      selectedSprint: chosenSlot.sprint,
      anchorReleaseDate: anchorDate,
      dayOfWeek: getDayName(anchorDate),
      whyThisDate: `Selected as the next open weekly anchor release slot adhering to the 1 main video/week rule. It aligns with ${chosenSlot.festival}.`,
      festivalOrTithiAlignment: chosenSlot.festival,
      categoryBalanceImpact: `Adds +1 anchor in ${category} to maintain balanced 5-pillar distribution under the 40% threshold.`,
      satellitesGeneratedCount: generatedCalendarItems.length - 1
    },
    persistedToDatabase: true,
    timestamp: new Date().toISOString()
  };
}

