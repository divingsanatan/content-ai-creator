import { ScriptPackage, SEOPackage, PinterestPackage, GrowthPlaybook } from '../types';

export const INITIAL_SCRIPT_PACKAGE: ScriptPackage = {
  topic: 'Why You Freeze When You Get Money: Healing Root Panic',
  category: 'money_business',
  concept: 'Muladhara Chakra & Root Nervous System Regulation',
  storyArchetype: 'paradox_of_success',
  storySetting: 'Tuesday 2:30 PM parked in a car right after signing a dream contract',
  personalLearningTakeaway: 'The nervous system cannot distinguish between survival terror and unfamiliar success until the root chakra is somaticized and grounded.',
  
  // Directing Guide for Solo Creator playing both roles
  directingGuide: {
    nakulRole: {
      characterName: 'Nakul (You)',
      archetype: 'The Relatable Suffering Modern Human: Anxious, Irritated, Sarcastic, Hyperventilating',
      vocalPacing: 'Fast-talking, clipped syllables, exasperated laughs, sudden defensive spikes when challenged',
      physicalCues: 'Pacing back and forth, rubbing temple with hand, staring at bank app on phone, clutching an espresso cup',
      wardrobe: 'Oversized charcoal hoodie or rumpled casual tee, disheveled hair',
      framing: 'Camera Left, 45mm tighter lens, slightly tilted or handheld energy to convey internal chaos'
    },
    nikhilRole: {
      characterName: 'Nikhil',
      archetype: 'The Sthir (Unshakable) Sage & Mirror: Calm, Composed, Deep Resonance, Straight Truth',
      vocalPacing: 'Deep chest resonance, unhurried cadence, intentional 1-second pauses, quiet authority that needs no volume',
      physicalCues: 'Still upright spine, resting wrists on wooden table, taking slow sips of warm water, unblinking compassionate eye contact',
      wardrobe: 'Clean minimal raw-linen shirt or solid dark tee, grounded posture',
      framing: 'Camera Right, 35mm locked tripod, clean horizontal symmetry, calm warm ambient backlight'
    },
    filmingWorkflowTip: 'Filming Cheat: Batch record! Set camera on Left Angle, wear hoodie, and film all of Nakul’s frustrated takes back-to-back with full physical energy. Then take a breath, switch into the clean linen shirt, move camera to Right Angle, and film Nikhil’s grounded replies with measured pauses.'
  },

  // Relevant Scripture / Shlok Card
  shlokCard: {
    included: true,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'Karmany-evādhikāras te mā phaleṣhu kadāchana |\nMā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||',
    source: 'Bhagavad Gita — Chapter 2, Verse 47',
    nikhilExplanation: 'Krishna is not giving Arjun a motivational seminar on detachment. He is diagnosing biological paralysis: the exact second your nervous system attaches survival to the future outcome, your brain freezes. Action belongs to you; the result belongs to Prakriti.',
    contextInDialogue: 'Delivered at minute 05:20 when Nakul sarcastically asks if he should just burn his bank statements and become an ascetic in the Himalayas.'
  },

  // 3 Curated Reel Cuts extracted directly from the main long video
  reelCuts: [
    {
      id: 'reel-1',
      cutNumber: 1,
      title: 'The Payday Panic Attack: When Success Freezes Your Body',
      timecodeInLongVideo: '00:00 - 00:48',
      targetDuration: '48s',
      hookLine: 'Kal dopehar ko client ka bada payment clear hone ke baad, main celebrate karne ke bajay apni car me baithkar freeze kyu ho gaya?!',
      onScreenCaptionText: 'POV: Bank balance to badh gaya par nervous system ko lagta hai jaan khatre me hai 💀',
      audioTrackVibe: 'Tense ticking clock sound under Nakul, abrupt complete silence when Nikhil speaks first sentence',
      editingDirection: 'Jump cut: Zoom in tight on Nakul staring at his glowing iPhone in his car. Quick whip pan to Nikhil sitting completely still in warm natural light.',
      dialogueExchanges: [
        {
          speaker: 'Nakul',
          note: '[Agitated, pacing, staring at phone with bloodshot eyes, sarcastic exasperation]',
          line: 'Nikhil, mujhe bas ek baat bata before I lose my mind. Kal dopehar ko 3 lakh ka wire account me aaya. Teen mahine 80 hours a week kaam kiya tha maine! Mujhe celebrate karna chahiye tha. Par contract sign karke gaadi me baithte hi main freeze ho gaya, steering wheel pe thanda paseena, gala band, aur dimaag keh raha hai ki agle mahine sab chhin jayega! Why does making money feel like someone handed my nervous system a live grenade?!'
        },
        {
          speaker: 'Nikhil',
          note: '[Calm, deep chest voice, taking a slow sip of water, unblinking straight eye contact]',
          line: 'Kyunki tumhara bank balance to badh gaya Nakul, par tumhari root abhi bhi hollow hai. Tumhare dimaag ne screen pe numbers dekhe, par tumhari spine ne ek existential predator ko cave me aate hue register kiya.'
        },
        {
          speaker: 'Nakul',
          note: '[Cynical laugh, throwing hands in the air]',
          line: 'Predator?! Wah bhai! To ab mere savings account ke piche jungle ka sher laga hua hai?!'
        },
        {
          speaker: 'Nikhil',
          note: '[Firm, low tone, zero defensiveness]',
          line: 'Ungrounded nervous system ke liye resources ka hona target banne jaisa hai. Tum ek primal survival reflex ko Excel sheet se theek karne ki koshish kar rahe ho.'
        }
      ],
      softCtaText: 'Watch the full 14-min breakdown on YouTube to rewire your root. Link in bio.'
    },
    {
      id: 'reel-2',
      cutNumber: 2,
      title: 'The Shlok Breakdown: Gita 2.47 vs Modern Panic',
      timecodeInLongVideo: '05:15 - 06:10',
      targetDuration: '55s',
      hookLine: 'Jaise hi zindagi me sab theek hone lagta hai agar aapko panic hota hai, to Krishna ki ye baat dhyan se suno.',
      onScreenCaptionText: '5,000 saal purana Sanskrit shlok jo financial freeze ko 60 seconds me tod deta hai 🧘‍♂️',
      audioTrackVibe: 'Subtle tanpura or deep ambient drone swelling in key of D# as the Sanskrit shlok is spoken',
      editingDirection: 'Split screen: Left side shows Sanskrit Devanagari verse fading in with Roman phonetics; Right side shows Nikhil delivering line with quiet gravity.',
      dialogueExchanges: [
        {
          speaker: 'Nakul',
          note: '[Frustrated, slumping onto chair, sarcastic]',
          line: 'To main kya karu Nikhil? Credit card bill ke samne mantras chant karu? Aakhein band karke Instagram reels ki tarah rent ko manifest karu?!'
        },
        {
          speaker: 'Nikhil',
          note: '[Deep, steady voice, reciting with flawless rhythmic meter]',
          line: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\n"Karmany-evādhikāras te mā phaleṣhu kadāchana."'
        },
        {
          speaker: 'Nakul',
          note: '[Blinks, thrown off by the gravity, tone drops slightly]',
          line: 'Gita 2.47. Haan haan, "fal ki chinta mat karo". Har corporate coffee mug pe likha hota hai ye. Par ye mere sudden success freeze ko kaise roke ga?'
        },
        {
          speaker: 'Nikhil',
          note: '[Direct, leaning forward, piercing clarity]',
          line: 'Kyunki tumne iska matlab hi galat samjha hai. Krishna Arjun ko careless hone nahi keh rahe the; wo ek biological paralysis diagnose kar rahe the. Jab tumhara dimaag kal ke fruit ko secure karne me lagta hai, tumhara Muladhara clench ho jata hai. Dedicated action tumhara kaam hai; outcome cosmic orchestration hai.'
        }
      ],
      softCtaText: 'Full 14-minute YouTube masterclass breaking down the somatic reset. Link in bio.'
    },
    {
      id: 'reel-3',
      cutNumber: 3,
      title: 'The Brutal Truth: Pouring Water into Unbaked Clay',
      timecodeInLongVideo: '08:45 - 09:35',
      targetDuration: '50s',
      hookLine: 'Aise nervous system ke sath hustle karna band karo jo wealthy hone se darta hai.',
      onScreenCaptionText: 'Paise aate hi aap use kharch ya sabotage kyu kar dete ho? 🛑',
      audioTrackVibe: 'Lo-fi warm ambient bass, gentle vinyl crackle',
      editingDirection: 'Fast cuts between Nakul clutching his forehead and Nikhil’s hands resting solidly on the wooden table.',
      dialogueExchanges: [
        {
          speaker: 'Nakul',
          note: '[Vulnerable, voice cracking with genuine exhaustion]',
          line: 'Sabse frustrating cheez self-sabotage hai. Jaise hi savings me 5 lakh cross hota hai, mera brain ek imaginary emergency fabricate kar leta hai—koi reckless kharcha, impulsive gadget, bekaar investment! Aisa lagta hai jaise mere se cushion bardasht hi nahi hota!'
        },
        {
          speaker: 'Nikhil',
          note: '[Soft, deep, deeply empathetic yet uncompromising]',
          line: 'Vedas me iska ek metaphor hai: Āma Kumbha—kaccha mitti ka ghada. Agar tum aise bartan me ghee ya pavitra jal daaloge jo aag me paka hi nahi, to kya hoga? Ghada pighal jayega. Sthira (stability) ke bina aayi hui daulat tumhe nurture nahi karti; wo tumhare container ko tod deti hai.'
        },
        {
          speaker: 'Nakul',
          note: '[Long pause, shoulders drop two inches in physical relief]',
          line: 'To matlab main financial failure nahi hu... meri body abhi is weight ko hold nahi kar paa rahi.'
        },
        {
          speaker: 'Nikhil',
          note: '[Slight nod, final punchline]',
          line: 'Exactly. Khud ko kosna band karo. Pehle vessel ko bake karo.'
        }
      ],
      softCtaText: '3-step daily grounding ritual in the full YouTube episode. Link in bio.'
    }
  ],

  // Full Dialogue Script for the 10-15 minute YouTube Anchor Video
  dialogueScript: [
    {
      id: 'd-1',
      speaker: 'Nakul',
      actorNote: '[Camera Left | Frantic energy, pacing around desk, phone in hand, looking directly at Nikhil with exasperation]',
      dialogue: 'Nikhil, mujhe bas ek seedha jawab chahiye before I lose my mind. Kal dopehar ko 3 lakh ka wire account me credit hua. Teen mahine 80 hours a week kaam kiya tha maine! Mujhe khushi se celebrate karna chahiye tha. Par contract sign karke gaadi me baithte hi main freeze ho gaya, steering wheel pe thanda paseena, gala band, convinced ki agle mahine sab chhin jayega! Why does making money feel like someone handed my nervous system a live grenade?!',
      timestamp: '00:00',
      isReelCutStart: true,
      reelCutId: 'reel-1'
    },
    {
      id: 'd-2',
      speaker: 'Nikhil',
      actorNote: '[Camera Right | Sitting upright in wooden chair, hands resting comfortably on desk, taking a slow sip of warm water, deep resonant voice]',
      dialogue: 'Kyunki tumhara bank balance to badh gaya Nakul, par tumhari root abhi bhi completely hollow hai. Tumhare mind ne screen pe numbers dekhe, par tumhari spine ne ek predator ko cave me aate hue register kiya.',
      timestamp: '00:25'
    },
    {
      id: 'd-3',
      speaker: 'Nakul',
      actorNote: '[Scoffs, rolling eyes with sharp defensive sarcasm, leaning over Nikhil’s table]',
      dialogue: 'Predator?! Wah bhai, brilliant! Ek mystical tiger mere banking app me ghoom raha hai?! Nikhil, please, mujhe poetic metaphors mat sunao aaj. Main yahan agarbatti aur vague philosophy ke liye nahi aaya hu. Mujhe bas ye jaanna hai ki mera gala kyu sukh jata hai, shoulders kaan ke paas kyu chadh jate hain, aur paise aate hi meri car kyu kharab hoti hai ya main impulsive shopping kyu kar deta hu?!',
      timestamp: '00:48'
    },
    {
      id: 'd-4',
      speaker: 'Nikhil',
      actorNote: '[Unflinching, calm eye contact, grounded chest voice]',
      dialogue: 'Kyunki self-sabotage koi accident nahi hai, Nakul. Ye tumhare nervous system ki desperate koshish hai apne purane, familiar survival baseline pe wapas lautne ki. Jab tumne bachpan se financial tension dekhi ho, to excess resources hold karna dangerous feel hota hai. Agar kuch bachega hi nahi, to koi tumse cheen nahi sakta. Agar tum pehle hi uda doge, to at least tumhe lagta hai ki catastrophe tumhare control me hai.',
      timestamp: '01:20'
    },
    {
      id: 'd-5',
      speaker: 'Nakul',
      actorNote: '[Freezes, looks down at his hands, nervous swallow, anger retreating into raw vulnerability]',
      dialogue: '... "Agar main pehle hi uda dunga, to kam se kam loss mere control me rahega." Wow. Tuesday ki subah itna personal attack karne ki zaroorat nahi thi bhai.',
      timestamp: '01:55'
    },
    {
      id: 'd-6',
      speaker: 'Nikhil',
      actorNote: '[Soft, deliberate tone, leaning in slightly]',
      dialogue: 'Dhyan se dekho raat ke 2 baje body me kya hota hai. Thandak kahan mehsoos hoti hai?',
      timestamp: '02:15'
    },
    {
      id: 'd-7',
      speaker: 'Nakul',
      actorNote: '[Touching the soles of his feet and base of spine]',
      dialogue: 'Pair ke talve (soles of my feet). Ekdum barf jaise thande ho jate hain. Aur pelvis ke base pe ek bhari, frozen knot ban jata hai. Saans clavicle ke upar hi atak jati hai.',
      timestamp: '02:28'
    },
    {
      id: 'd-8',
      speaker: 'Nikhil',
      actorNote: '[Speaking with grounded clarity, demystifying the Sanatan terminology]',
      dialogue: 'Sanatan Dharma me us knot ka ek precise naam hai: contracted Muladhara. Taittiriya Upanishad me insaan ko paanch koshon me describe kiya gaya hai. Sabse pehla foundation hai Annamaya Kosha—physical earth body. Jab earth element (Prithvi) ungrounded hota hai, to Prana hawa me udd jata hai—Vata dysregulation. Tum greedy nahi ho, aur na hi tum paise sambhalne me bewakoof ho. Tumhare paas bas wo somatic container nahi hai jo abundance ko bina panic ke hold kar sake.',
      timestamp: '02:50'
    },
    {
      id: 'd-9',
      speaker: 'Nakul',
      actorNote: '[Skeptical brow raised, pacing resumes with hands in pockets]',
      dialogue: 'Theek hai, maan liya. Par 21st century me iska practical matlab kya hai? Main apne credit cards jala du, jhola leke Rishikesh me ped ke niche baith jau? Kyunki mera landlord NEFT transfers leta hai Nikhil, chakra vibrations nahi.',
      timestamp: '03:40'
    },
    {
      id: 'd-10',
      speaker: 'Nikhil',
      actorNote: '[Smiles calmly, quiet warmth]',
      dialogue: 'Landlord NEFT leta hai, par biological bill tumhari body chukati hai. Himalayas bhaagna bhi bas flight mode ka ek tareeka hai. True Sanatan practice bhagne ke baare me nahi hai; ye marketplace ke beech me khade hokar Sthira—yani unshakeable stability—establish karne ke baare me hai.',
      timestamp: '04:15'
    },
    {
      id: 'd-11',
      speaker: 'Nakul',
      actorNote: '[Slumps into chair opposite Nikhil, rubbing forehead, sarcastic sigh]',
      dialogue: 'To main kya karu? Excel sheet ke aage dhyan lagau? Mujhe wo ancient secret batao jisse har payday pe mera seena fattne se bache.',
      timestamp: '04:45'
    },
    {
      id: 'd-12',
      speaker: 'Nikhil',
      actorNote: '[Voice lowers into a quiet, sacred cadence, reciting with clean Sanskrit pronunciation]',
      dialogue: 'Dhyan se suno Krishna ne Arjun se kya kaha tha jab wo Kurukshetra ke maidan me kaanp raha tha:\n\nकर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥\n"Karmany-evādhikāras te mā phaleṣhu kadāchana |\nMā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||"',
      timestamp: '05:15',
      isShlokMoment: true,
      isReelCutStart: true,
      reelCutId: 'reel-2'
    },
    {
      id: 'd-13',
      speaker: 'Nakul',
      actorNote: '[Rolls eyes, familiar with the cliché]',
      dialogue: 'Bhagavad Gita 2.47. Haan, "karm karo, fal ki chinta mat karo." Nikhil bhai, har HR manager bonus reject karte waqt yahi email signature me chipkata hai. Is detachment se mera panic freeze kaise theek hoga?',
      timestamp: '05:40'
    },
    {
      id: 'd-14',
      speaker: 'Nikhil',
      actorNote: '[Leaning forward, eyes piercing with zero hesitation, voice steady like bronze]',
      dialogue: 'Kyunki unhone iska deeper wisdom samjha hi nahi. Krishna ye nahi keh rahe the ki tum parwah mat karo. Wo Arjun ko ek emergency nervous system reset protocol de rahe the. Jab tumhara dimaag kal ke fal ko preserve karne me obsess ho jata hai, tum chronic survival dread activate kar lete ho. Tum Prakriti ko control karne ki koshish karte ho. Kal ki inflation ko tum control nahi kar sakte Nakul. Jaise hi tum kal ki security pe latch hote ho, Muladhara mutthi ki tarah clench ho jata hai. Action tumhara domain hai; outcome cosmic orchestration hai.',
      timestamp: '06:05'
    },
    {
      id: 'd-15',
      speaker: 'Nakul',
      actorNote: '[Stares silently, breath slowing down visibly, realizing the weight]',
      dialogue: '...To matlab har baar jab main bank balance dekh ke agle 10 saal ki chinta karta hu, main apne phone screen se poore universe ko control karne ki koshish kar raha hota hu.',
      timestamp: '06:45'
    },
    {
      id: 'd-16',
      speaker: 'Nikhil',
      actorNote: '[Warm, affirming nod]',
      dialogue: 'Aur ye ek single nervous system ke liye unbearable load hai. Isiliye tumhara man karta hai ki account zero kar do. Zero terrifying zaroor hai, par zero pe at least tumhe pata hota hai kya expect karna hai: survival mode. Peace ke liye trust chahiye. Aur trust ke liye ek baked container chahiye.',
      timestamp: '07:10'
    },
    {
      id: 'd-17',
      speaker: 'Nakul',
      actorNote: '[Curious now, leaning in, tone softened]',
      dialogue: 'Baked container. Tumne pehle bhi ye bola tha. Iska matlab kya hai?',
      timestamp: '07:35'
    },
    {
      id: 'd-18',
      speaker: 'Nikhil',
      actorNote: '[Demonstrating with hands on table, painting the visual scene]',
      dialogue: 'Vedic rituals me ek concept hota hai: Āma Kumbha—kaccha mitti ka ghada. Agar tum ek kachhe ghade me doodh, amrit ya tel daaloge to kya hoga? Paani nahi rukega. Mitti gal jayegi aur sab beh jayega. Hustle culture tumhe kehta hai ki aur paani daalo: "Close more deals! Make more revenue!" Par agar bartan aag aur mitti me paka hi nahi hai, to daulat sirf tumhari shaanti ko dissolve kar degi.',
      timestamp: '08:00',
      isReelCutStart: true,
      reelCutId: 'reel-3'
    },
    {
      id: 'd-19',
      speaker: 'Nakul',
      actorNote: '[Nods slowly, genuine realization dawning on face]',
      dialogue: 'To meri car ka breakdown, impulsive purchases... wo sab ghada phootne ka reflection hai.',
      timestamp: '08:40'
    },
    {
      id: 'd-20',
      speaker: 'Nikhil',
      actorNote: '[Solid, unwavering confirmation]',
      dialogue: 'Haan. Isiliye agla contract sign karne se pehle, hum bartan ko pakayenge. Kal subah se shuru karo: phone chhoone se pehle 10 minute nange pair zameen pe khade hona. Teen deep belly exhalations perineum me "Lam" bija mantra ke sath. Apni pelvis ko yaad dilao ki dharti tumhara weight carry kar rahi hai—tumhara bank balance nahi.',
      timestamp: '09:00'
    },
    {
      id: 'd-21',
      speaker: 'Nakul',
      actorNote: '[Smiles for the first time, genuine laugh of tension release]',
      dialogue: 'Matlab mere financial advisor ko portfolio badalne ki zaroorat nahi thi. Meri spine ko bas ye samajhna tha ki account me paise hone se koi tiger nahi aane wala.',
      timestamp: '09:40'
    },
    {
      id: 'd-22',
      speaker: 'Nikhil',
      actorNote: '[Laughs warmly, raising his brass cup]',
      dialogue: 'Bilkul. Lakshmi aati to kripa se hai, par rukti wahi hai jahan foundations hilti nahi.',
      timestamp: '10:05'
    },
    {
      id: 'd-23',
      speaker: 'Nakul',
      actorNote: '[Turning towards camera, delivering the structured CTA ladder directly to viewer]',
      dialogue: 'Agar aapka koi ambitious dost hai jo success aate hi sab kuch sabotage kar deta hai—jise banking app kholne se pehle ulti jaisa lagta hai—to ye video uske sath zaroor share karo. Shayad pehli baar koi us baat ko acknowledge kar raha hai jo unki body cheekh rahi thi.',
      timestamp: '10:30'
    },
    {
      id: 'd-24',
      speaker: 'Nikhil',
      actorNote: '[Grounded direct-to-camera eye contact, compassionate invitation]',
      dialogue: 'Aur agar aap 60 ghante kaam karne ke baad bhi financial ya emotional fight-or-flight me phans gaye hain, to niche description me hamare sath 1-on-1 Vedic alignment consultation book kar sakte hain. Hum aapke exact energetic blockage ko diagnose karenge aur aapka somatic container rebuild karenge.',
      timestamp: '11:00'
    },
    {
      id: 'd-25',
      speaker: 'Nakul',
      actorNote: '[Energetic, pointing to screen]',
      dialogue: 'Root to ground ho gayi, ab agla video dekho jahan hum break down kar rahe hain: Relationship Freeze—Kaise Ancestral Karma Heart Chakra ko block karta hai. Chalo, wahan milte hain!',
      timestamp: '11:35'
    }
  ],

  hook: {
    ideaCollision: 'Maine ek hardworking creator ko bada contract sign karte dekha—aur deal close hote hi wahi insaan celebrate karne ke bajay apni car me freeze ho gaya ki agle mahine sab chhin jayega.',
    alternateCollisionOptions: [
      'Aapka bank account khali isiliye nahi hai ki financial discipline nahi hai; wo isiliye khali hai kyunki cash hold karna aapke nervous system ko unsafe lagta hai.',
      'Hum paise ko screen pe numbers samajhte hain, par hamari spine achanak aayi hui prosperity ko cave me tiger aane jaisa register karti hai.',
      'Jaise hi savings goal hit hota hai, aapka brain achanak imaginary catastrophe kyu invent kar leta hai?'
    ],
    buildToElevenSeconds: 'Agle 12 minute me hum financial freeze ke piche ke biological mechanism ko unmask karenge—aur wo exact Vedic practice seekhenge jisse aapki root anchor ho sake.'
  },
  stakes: {
    lowestPointStory: 'Teen saal pehle, jab bhi koi client payment clear hoti thi, mera chest instantly tight ho jata tha. 48 ghante ke andar ek emergency kharcha saamne aa jata: car breakdown, bewajah gadget purchase, impulsive investment. Mujhe lagta tha meri kismat kharab hai, jab tak maine body ka visceral pattern observe nahi kiya.',
    visceralBodyFeeling: 'Pair ke talvon me thandi sunn-pan, shallow breath jo sirf chest tak aati hai, aur kamre me aise ghoomna jaise kisi unseen fire se bhaag rahe ho.',
    twoAmInternalDialogue: '"Agar main is success ko hold nahi kar paya, to sab khatam ho jayega aur meri pol khul jayegi."'
  },
  turn: {
    livedRealization: 'Breakthrough tab aaya jab maine budgeting spreadsheets band karke zameen pe nange pair baithna shuru kiya. Problem financial literacy ki nahi thi—somatic load-bearing capacity ki thi.',
    sanatanTeachingIntegrated: 'Taittiriya Upanishad me Annamaya Kosha (physical earth sheath) hamare primal survival ko govern karta hai. Muladhara chakra ka matlab sirf rich banna nahi hai; iska matlab hai "Sthira" establish karna taaki aapka nervous system prosperity ko existential threat na samjhe.',
    momentOfLevityOrJoy: 'Sach to ye hai ki mere financial advisor ko portfolio badalne ki zaroorat nahi thi; meri spine ko bas ye jaanna tha ki account me 5 lakh hone se koi tiger nahi aane wala.'
  },
  scene: {
    sensoryDetails: 'Subah 6 baje cool terracotta floor tiles, khus/vetiver ka earthy scent, aur slow hoti hui pulse rate.',
    roomAndLight: 'Subah ki amber dhoop jo lakdi ke desk pe fail rahi hai, hawa me shaant dust motes.',
    tangibleAnchors: 'Elaichi wali garam chai ka brass cup, lakdi ke floor pe zameen par tike hue pair, aur mandir ke pillars ki tarah straight spine.',
    dialogueOrPresence: 'Mere mentor ne mera haath mere lower abdomen pe rakha aur kaha: "Breathe down to the earth. Bina root ke wealth sirf ek toofan hai."'
  },
  shatter: {
    micDropQuote: 'Paisa aapko badalta nahi hai; ye sirf ye expose karta hai ki aapka nervous system kitni safety tolerate kar sakta bina dissociate hue.',
    quotableLines: [
      'Aap wo accumulate nahi kar sakte jise aapki body lethal manti hai.',
      'Aapki financial freedom kabhi aapke root ki depth se zyada nahi badh sakti.',
      'Hum paise ko screen pe numbers samajhte hain, par hamari spine use cave me aate hue sher jaisa register karti hai.'
    ]
  },
  ctaLadder: {
    step1_share: 'Agar aapka koi ambitious dost hai jo success aate hi sab sabotage kar deta hai, to aaj hi ye video uske sath share karo.',
    step2_consult: 'Agar aap 60 ghante kaam karne ke baad bhi financial fight-or-flight me phanse hue hain, to niche 1-on-1 Vedic somatic alignment consultation book karein. Hum milkar aapke root container ko rebuild karenge.',
    step3_nextVideo: 'Iske baad, dekhein: Sudden Relationship Freeze—Kaise Ancestral Karma Heart Chakra ko block karta hai.'
  },

  // 1. StoryBrand (SB7) Hero / Guide CTA Framework (Donald Miller)
  storyBrandCTA: {
    hero: 'The viewer dealing with financial panic, sudden success freeze, and unconscious money self-sabotage.',
    problem: 'External: Bank account swings / impulse spending. Internal: Deep terror of vulnerability when success arrives. Philosophical: Why does working 80 hours a week feel like biological danger instead of peace?',
    guideRole: 'Nikhil (and you): Grounded practitioner who walked through the same ungrounded panic, understands the Taittiriya Upanishad and somatic root biology, and brings unshakeable Sthira (stability) without moral judgment or toxic positivity.',
    plan: '1. Book a 1-on-1 Vedic Somatic Consultation -> 2. Diagnose your root blockage & ungrounded Prana -> 3. Rebuild an unshakable nervous system container so abundance stays without panic.',
    callToAction: 'Book your 1-on-1 Vedic alignment & spiritual healing consultation via the link in the description.',
    failureAvoided: 'Prevents the exhausting cycle of earning money only to self-sabotage, freezing in high-stakes moments, and burning out in chronic survival fight-or-flight.',
    successVision: 'Cultivating true Sthira: resting peacefully with money in the bank, knowing your worth is anchored to the Earth and Prakriti, not fluctuating account numbers.',
    turnBeatRole: 'The Turn beat is where Nakul (the struggling human) shifts attention to the timeless principle, allowing Nikhil to step in not as a bragging hero, but as the empathetic Guide offering a clear roadmap.'
  },

  // 2. PAS / PASO (Problem - Agitate - Solve - Outcome) Framework for Orbit Content & Shorts
  pasoOrbitShort: {
    duration: '60-90s',
    problem: 'Badi payment account me aate hi celebrate karne ke bajay gala band aur nervous system freeze kyu ho jata hai?',
    agitate: 'Ye koi budgeting failure nahi hai. Jab aapka nervous system cash hold karne ko danger register karta hai, to aapki body freeze ho jati hai—pair ke talve thande, chest me tight knot, aur dimaag keh raha hai ki catastrophe hone wali hai. Jab tak root hollow hai, har dollar ek live grenade jaisa lagega.',
    solve: 'Sanatan Dharma me Taittiriya Upanishad iska somatic answer deta hai: Annamaya Kosha & Muladhara Chakra regulation. Krishna ne Gita 2.47 me sikhaya tha ki control chhodkar pehle container ko bake karo.',
    outcome: 'Aapki spine ko realize hota hai ki account me paisa hone se koi predator nahi aane wala. Chest khulti hai, saans deep hoti hai, aur daulat tikne lagti hai.',
    softCta: 'Watch the full 14-minute YouTube masterclass breaking down the 3-step grounding ritual. Link in bio.',
    zeroFabricationVerified: true
  },

  // 3. ABT (And, But, Therefore) Script-Tightening Diagnostic Test (Randy Olson)
  abtDiagnostic: {
    andSetup: 'Nakul worked 80 hours a week to earn 3 lakh rupees, AND by all modern financial standards he should have celebrated his new savings,',
    butLinchpin: 'BUT the moment the money hit his account, his ungrounded nervous system registered the resources as an existential predator—triggering a daytime car freeze panic and an overwhelming urge to self-sabotage,',
    thereforeResolution: 'THEREFORE, before chasing more revenue or budgeting apps, he must use the Sanatan practice of Sthira to bake his somatic container so his root can hold abundance without panic.',
    compressedOneLiner: 'Nakul worked 80 hours a week to earn 3 lakh rupees AND expected peace, BUT the sudden wealth triggered a visceral biological freeze in his car, THEREFORE he must use Vedic grounding to bake his nervous system container before the money burns him.',
    hasLinchpinContradiction: true,
    singleIdentifiableProtagonist: 'Nakul (One specific relatable human facing acute payday panic)',
    diagnosticVerdict: 'Story Engine Validated (Linchpin Found)'
  },

  // 4. Universal Retention Structure Sanity Check (4-Beat Skeleton)
  universalRetentionCheck: {
    reasonToCare: {
      beat: '00:00 - 00:48 (Daytime car freeze after getting 3 lakh wire)',
      status: 'pass',
      note: 'Visceral real-world symptom hook hooks anyone with financial anxiety within 7 seconds.'
    },
    movement: {
      beat: '01:00 - 05:00 (Rapid ping-pong exchanges between Nakul skepticism & Nikhil calm truth)',
      status: 'pass',
      note: 'Fast-paced banter prevents monologue stagnation; Nakul challenges every cliché.'
    },
    payoff: {
      beat: '05:15 - 09:30 (Gita 2.47 demystification + Āma Kumbha unbaked clay pot metaphor)',
      status: 'pass',
      note: 'Gives concrete, actionable somatic explanation and 3 morning physical rituals.'
    },
    ctaLoop: {
      beat: '10:30 - 11:35 (Sequential Share -> Guide Consultation -> Next Video hook)',
      status: 'pass',
      note: 'StoryBrand Guide framing makes 1-on-1 consult the obvious next step for deep work.'
    },
    retentionRating: 'Optimal Flow'
  },

  shortScript: {
    duration: '60s',
    hook: 'Paise aate hi shaanti milne ke bajay panic attacks kyu aane lagte hain?',
    stakes: 'Observe karo kal jab bada payment aaya: heart rate badh gayi, pet me knot ban gaya, aur achanak ya to impulsive kharcha karne ka man kiya ya kisi bill ka darr lagne laga.',
    turn: 'Sanatan wisdom me ise kehte hain contracted Muladhara (root chakra). Aapki body cash hold karne ko khatra manti hai.',
    scene: 'Cool terracotta tiles pe nange pair, deep saans lower abdomen tak.',
    shatter: 'Aap wo accumulate nahi kar sakte jise aapka nervous system lethal samajhta hai.',
    softCta: '5-minute somatic reset ke liye YouTube pe mera full masterclass dekhein. Link in bio.'
  },
  editorCaptions: [
    'The Payday Car Freeze Panic Attack (Hinglish)',
    'Kyu Cash aate hi Nervous System Freeze hota hai',
    'Muladhara Chakra & Primal Survival Biology',
    '3-Step Root Sthira Grounding Practice',
    'Apni Somatic Wealth Capacity ko Expand Karein'
  ]
};

export const INITIAL_SEO_PACKAGE: SEOPackage = {
  topic: 'Why You Freeze When You Get Money: Healing Root Panic',
  titles: [
    {
      title: 'Why You Freeze When You Make Money (And How to Stop)',
      charCount: 54,
      isProblemLed: true
    },
    {
      title: 'Financial Anxiety at Night? The Root Chakra Fix',
      charCount: 49,
      isProblemLed: true
    },
    {
      title: 'Why Having Money Triggers Panic (The Vedic Root Reset)',
      charCount: 55,
      isProblemLed: true
    },
    {
      title: 'Heal Money Self-Sabotage with Muladhara Chakra Energy',
      charCount: 53,
      isProblemLed: false
    },
    {
      title: 'The Real Reason You Can\'t Keep Money in Your Bank',
      charCount: 50,
      isProblemLed: true
    }
  ],
  youtubeDescription: {
    firstTwoLinesFold: 'Do you feel a sudden wave of panic, chest tightness, or self-sabotage whenever money enters your account? Discover why your nervous system treats cash as danger—and the Vedic somatic reset to heal it.',
    summary: 'In this deep-dive masterclass, we explore why conventional financial advice fails when the root chakra (Muladhara) is trapped in chronic survival mode. You will learn the connection between the Annamaya Kosha (physical body sheath) and money tolerance, plus a daily 5-minute grounding ritual to expand your capacity to hold abundance without fear.',
    timestampsPlaceholder: `00:00 - The $45,000 Payday Car Freeze Panic\n01:45 - The Biology of Money Freeze\n04:20 - Muladhara Chakra: Survival vs Stability\n07:15 - Annamaya Kosha & Nervous System Overload\n10:30 - The 3-Step Morning Grounding Practice\n13:45 - Breaking the Cycle of Panic Spending`,
    consultationCta: '🌿 Book a 1-on-1 Vedic Life & Energy Consultation: https://dharmacraft.com/consultation?ref=yt-money-freeze',
    wordCount: 185
  },
  youtubeTags: [
    { tag: 'why do i freeze when i make money', type: 'symptom_problem' },
    { tag: 'financial anxiety physical symptoms', type: 'symptom_problem' },
    { tag: 'root chakra money blockage', type: 'spiritual_astrological' },
    { tag: 'muladhara chakra healing', type: 'spiritual_astrological' },
    { tag: 'subconscious money panic', type: 'symptom_problem' },
    { tag: 'how to stop spending money recklessly', type: 'symptom_problem' },
    { tag: 'vedic money wisdom', type: 'spiritual_astrological' },
    { tag: 'somatic nervous system wealth', type: 'broad_longtail' },
    { tag: 'fear of having money', type: 'symptom_problem' },
    { tag: 'money self sabotage healing', type: 'broad_longtail' },
    { tag: 'annamaya kosha grounding', type: 'spiritual_astrological' },
    { tag: 'panic attack after payday', type: 'symptom_problem' },
    { tag: 'spiritual meaning of losing money', type: 'broad_longtail' },
    { tag: 'sanatan dharma wealth philosophy', type: 'spiritual_astrological' },
    { tag: 'ganesha muladhara prosperity', type: 'spiritual_astrological' }
  ],
  hashtags: ['#FinancialAnxiety', '#RootChakra', '#VedicWisdom', '#MoneyMindset', '#SomaticHealing'],
  thumbnailTexts: [
    { text: 'WHY CASH MAKES YOU PANIC', isProblemStated: true },
    { text: 'THE MONEY FREEZE RESET', isProblemStated: false },
    { text: 'EMPTY BANK? IT\'S YOUR NERVES', isProblemStated: true }
  ],
  instagramFacebookCaption: {
    hookLine: 'Your bank account isn\'t empty because you lack willpower. It\'s empty because having cash makes your body feel terrified.',
    captionBody: 'Notice what happens when you finally get a raise or savings balance: your stomach knots, your breath shortens, and your mind races to spend it or brace for catastrophe. In Vedic wisdom, this is a contracted Muladhara (root chakra). Your nervous system cannot yet safely hold abundance without feeling exposed.',
    softCtaYouTubeLinkInBio: '👉 I just released a complete 14-minute masterclass breaking down the exact somatic reset. Watch the full episode via the link in our bio.',
    mixedHashtags: ['#VedicWisdom', '#RootChakraHealing', '#MoneyAnxiety', '#SomaticTherapy', '#SanatanDharma']
  }
};

export const INITIAL_PINTEREST_PACKAGE: PinterestPackage = {
  topic: 'Why You Freeze When You Get Money: Healing Root Panic',
  pins: [
    {
      id: 'pin-init-1',
      style: 'warm photo-realistic',
      pinTitle: 'Why Making Money Triggers Panic Attacks (The 4 Somatic Signs)',
      pinDescription: 'Does receiving money cause chest tightness or rapid spending? Discover how a dysregulated root chakra creates subconscious financial freeze and the somatic Vedic practice to heal it. Save this pin and tap the link to watch our full masterclass on YouTube.',
      overlayText: 'Why Having Cash Gives You Panic Attacks',
      suggestedBoard: 'Vedic Healing & Somatic Wellness',
      destinationLinkNote: 'https://youtube.com/watch?v=demo-money-freeze',
      imagePrompt: 'A vertical 2:3 fine art photograph of a stressed professional sitting barefoot on deep terra cotta floor tiles in morning amber light, glowing subtle warm crimson energy radiating gently around the lower spine and feet, cinematic chiaroscuro, earthy textures, warm dark tones, high realism, 8k resolution, minimalist editorial aesthetic --ar 2:3',
      isProblemLedTitle: true
    },
    {
      id: 'pin-init-2',
      style: 'minimalist flat illustration',
      pinTitle: 'The Real Reason You Can\'t Keep Money in Your Bank Account',
      pinDescription: 'You cannot accumulate what your body perceives as dangerous. Learn the ancient Vedic principle of Muladhara stability and how to anchor your nervous system for lasting financial peace. Read full guide on YouTube.',
      overlayText: 'You Sabotage Money Because Your Body Feels Unsafe',
      suggestedBoard: 'Mindset & Sacred Wealth',
      destinationLinkNote: 'https://youtube.com/watch?v=demo-money-freeze',
      imagePrompt: 'A vertical 2:3 fine art conceptual photograph featuring hands gently cupping rich fertile dark soil with a small sprout, warm golden sunlight beam illuminating the dust particles, soft focus sacred temple stone background, serene meditative atmosphere, muted amber and slate palette, shot on Hasselblad --ar 2:3',
      isProblemLedTitle: true
    },
    {
      id: 'pin-init-3',
      style: 'soft watercolor',
      pinTitle: '5-Minute Morning Reset for Financial Panic & Root Chakra',
      pinDescription: 'Feeling overwhelmed by bills or career uncertainty? Follow this 3-step ancient Vedic grounding protocol before touching your phone or checking emails. Tap through to watch the full walkthrough video on YouTube.',
      overlayText: '5-Minute Somatic Reset for Morning Money Panic',
      suggestedBoard: 'Daily Rituals & Calm Living',
      destinationLinkNote: 'https://youtube.com/watch?v=demo-money-freeze',
      imagePrompt: 'A vertical 2:3 still life composition showing a brass bowl of warm sesame oil, fresh vetiver roots, and a brass bell resting on antique dark teak wood, soft morning window light from the side, clean negative space, studio lighting, hyper-detailed texture --ar 2:3',
      isProblemLedTitle: false
    }
  ],
  keywordVariations: [
    'money anxiety physical symptoms somatic',
    'root chakra blocked signs money'
  ]
};

export const INITIAL_GROWTH_PLAYBOOK: GrowthPlaybook = {
  topic: 'Why You Freeze When You Get Money: Healing Root Panic',
  preLaunchHype: {
    dayMinus5: {
      type: 'Teaser Reel (15s)',
      prompt: '"Ever notice you get sick or have a car breakdown the week after your biggest bonus?" Share 15s personal anecdote of the success freeze.',
      purpose: 'Awaken the latent recognition of the financial self-sabotage cycle.'
    },
    dayMinus3: {
      type: 'Instagram Story Poll',
      prompt: 'Sticker: "When your bank balance goes up, do you feel: [A] Total Peace [B] Low-level Dread waiting for the other shoe to drop?"',
      purpose: 'Generate high-intent audience engagement and confirm search phrasing.'
    },
    dayMinus1: {
      type: 'Countdown + Quote Slide',
      prompt: '"You cannot accumulate what your nervous system perceives as lethal." Masterclass drops tomorrow at 6 AM IST / 8:30 PM EST.',
      purpose: 'Build anticipation and drive notification bell saves.'
    },
    dayZero: {
      type: 'Launch Day Cross-Post',
      prompt: 'Post carousel of the 3 Somatic Money Signs with direct swipe to YouTube long-form anchor.',
      purpose: 'Drive first 24-hour YouTube algorithm velocity.'
    }
  },
  redditQuoraPlaybook: {
    quoraTargetQuestions: [
      'Why do I feel extreme anxiety every time I get a bonus or salary raise?',
      'Can nervous system trauma cause someone to compulsively spend money?'
    ],
    quoraAnswerFramework: 'Validate the visceral symptom first (Annamaya Kosha), debunk generic willpower advice, introduce Sthira (somatic capacity), link to YouTube.',
    redditSubreddits: ['r/financialindependence', 'r/Anxiety', 'r/SomaticExperiencing'],
    redditAuthenticValueContribution: 'Why financial discipline advice fails if your nervous system treats cash as an existential threat: A somatic breakdown.'
  },
  atomizationMap: {
    totalPieces: 10,
    breakdown: [
      { platform: 'YouTube', format: 'Anchor Video (12-15 min)', purpose: 'Deep-dive authority & conversion to 1-on-1 Vedic consultation' },
      { platform: 'YouTube Shorts', format: 'Short #1 (60s)', purpose: 'Top of funnel viral hook on the $45,000 panic attack' },
      { platform: 'Instagram', format: 'Reel #1 (60s)', purpose: 'Drive curiosity-gap clicks to YouTube link in bio' },
      { platform: 'Instagram', format: 'Educational Carousel (7 Slides)', purpose: 'Saves & shares on the 4 somatic signs of root chakra freeze' },
      { platform: 'Pinterest', format: 'Pin #1 (Somatic Infographic)', purpose: 'Long-tail visual search traffic to YouTube' },
      { platform: 'Pinterest', format: 'Pin #2 (Editorial Quote)', purpose: 'Repin velocity in spiritual wellness boards' },
      { platform: 'Pinterest', format: 'Pin #3 (Morning Reset Checklist)', purpose: 'Practical utility bookmarking & clickthrough' },
      { platform: 'LinkedIn', format: 'Thought Leadership Essay', purpose: 'Founder / executive nervous system & wealth retention' },
      { platform: 'YouTube Community', format: 'Discussion Question Poll', purpose: 'Mine audience language in comments for next video SEO' },
      { platform: 'Substack', format: 'Newsletter Deep Dive', purpose: 'Nurture email subscribers with Taittiriya Upanishad translation' }
    ]
  },
  abThumbnailTestVariants: {
    variantA: {
      headline: 'WHY CASH GIVES YOU PANIC',
      visualFocalPoint: 'Extreme close-up of tense hands clutching chest over bank statement, amber highlight.',
      hypothesis: 'Problem-centric headline will trigger highest CTR from active anxiety searchers.'
    },
    variantB: {
      headline: 'EMPTY BANK? IT\'S YOUR NERVES',
      visualFocalPoint: 'Split screen: Smartphone banking notification vs calm meditative posture barefoot on floor.',
      hypothesis: 'Curiosity gap linking bodily nerves to banking balance drives broader mainstream click-through.'
    }
  },
  communityQuestionToPin: 'What is the physical sensation you feel in your body right after you check your bank balance? Tell me in the comments—I reply to every one.'
};
