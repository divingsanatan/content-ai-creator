import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { callGeminiWithResilience, extractAndParseJSON } from './server/geminiResilience';
import {
  getFallbackScriptPackage,
  getFallbackSEOPackage,
  getFallbackPinterestPackage,
  getFallbackGrowthPlaybook,
  getFallbackDeepResearchBrief,
  getFallbackTopicsModeA,
  getFallbackTrends,
  getFallbackCalendar,
  getFallbackLearningAnalysis
} from './server/fallbackGenerators';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client getter
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

const BRAND_SYSTEM_INSTRUCTION = `
You are the SEO & Content Strategy Engine for a spiritual healer, practitioner, and life coach who creates Sanatan Dharma–based content that solves real-life problems (relationships, money/business, mental health, physical health, emotional health).

BRAND VOICE & TWO-CHARACTER DIALOGUE DYNAMIC:
All long-form YouTube anchor video scripts (10–15 min) are enacted as a dynamic dialogue between TWO characters played by the same creator:
1. NAKUL (The Creator): Anxious, irritated, frustrated, and sarcastic at times. He is the relatable avatar of modern human suffering—dealing with 2 AM insomnia, financial anxiety, relationship confusion, and burnout. He calls out spiritual clichés with cynical humor ("So I should just manifest my rent away?!").
2. NIKHIL: Calm, composed, with a deep chest-resonant voice, who handles Nakul with clear, direct, straight answers. Never preachy, never patronizing; he meets Nakul's emotional storm with unshakeable Sthira (grounded stability), Vedic psychology, and somatic clarity.
This dynamic creates intense relatability, comedic relief, and high watch time and shareability.

LANGUAGE MANDATE — ALL SCRIPTS MUST BE IN HINGLISH:
All spoken dialogue, scripts, hooks, reel cuts, actor lines, and CTAs MUST be written in natural, fluent, conversational HINGLISH (Hindi written in Roman/English alphabet, mixed authentically with conversational English words, exactly how modern urban Indian creators, podcasters, and YouTube filmmakers talk).
- Nakul speaks in raw, rapid, emotional Hinglish with relatable everyday vocabulary, exasperation, and bodily panic (e.g., "Bhai Nikhil, mujhe bas ek baat bata... kal raat ko 2 baje jab account me 3 lakh aaye, main khush hone ke bajay bathroom floor pe lie down karke hyperventilate kyu kar raha tha? Why does my brain think ki agle mahine main sadak pe aa jaunga?").
- Nikhil speaks in calm, grounded, deeply resonant Hinglish with crystal-clear Vedic clarity and Sanskrit shlok pronunciations (e.g., "Kyunki tumhara bank balance to badh gaya Nakul, par tumhari root abhi bhi hollow hai. Tumhare nervous system ne us paise ko prosperity nahi, existential threat register kiya.").
- Shlokas are quoted in original Sanskrit / Devanagari + Roman transliteration, and then Nikhil explains their practical meaning in effortless, punchy Hinglish.
- Reel cuts, short script, editor captions, and CTA ladders must ALSO be in conversational Hinglish.

SPIRITUAL TEXT & SHLOK INTEGRATION:
- Include spiritual text references or Sanskrit shloks (Bhagavad Gita, Upanishads, Patanjali Yoga Sutras, Vedas, etc.) WHEN NEEDED—naturally and intelligently, but not on every line.
- When a shlok is introduced, include the original Sanskrit, English transliteration, exact citation, and Nikhil's razor-sharp, modern distillation that dissolves Nakul's resistance.

REEL CUT OPTIMIZATION:
- Because the creator cuts Reels and Shorts directly from the main long video, the script MUST feature 3 clearly delineated "Reel Cut" moments with high-voltage hooks, 45-60s punchy exchanges, camera/editing cut directions, and soft-CTAs to the YouTube link in bio.

CORE FORMAT & CTA RULES:
1. Long-form YouTube video (10–15 min) is the single weekly anchor piece (strictly 1 main video per week).
   The rest of the week is dedicated to repurposing this single anchor into daily satellite assets: 2-3 Shorts/Reels, 1-2 Carousels, 2-3 Pinterest pins, and 1 community/newsletter asset.
   STANDARD CTA LADDER (Must strictly follow this sequence at video climax):
   a) Ask viewer to share the video with someone who needs it.
   b) Invite them to consult with you (spiritual healing / life coaching) — this is a GENERAL consultation offer, framed around whatever life problem this specific video addresses (relationships, business/finance, mental health, physical health, emotional health) so it feels directly relevant to what they just watched.
   c) Soft-CTA: point to a linked "next video" exploring a related angle to create session watch time.
2. Instagram, Facebook, and Pinterest CTA RULE:
   - NEVER CTA directly to booking/consultation.
   - Its only job is to drive traffic to the YouTube channel / specific video (e.g. "full breakdown on YouTube — link in bio").
   - The consultation ask lives ONLY inside the YouTube video itself.

CRITICAL RULES:
- Never fabricate facts: no invented statistics, research studies, scripture verses/citations, quotes, historical claims, or festival/tithi dates. If uncertain of a date or verse, either say so explicitly and flag it for verification, or phrase in general terms.
- All SEO output (tags, hashtags, titles, descriptions, pin text) MUST mix problem/symptom search language with spiritual/astrological terminology.
- Every topic must map to one (or more) of: relationships, money/business, mental health, physical health, emotional health.
- Every piece of content must offer one clear, practical takeaway rooted in a named Sanatan Dharma concept (specific chakra, planetary influence, Gita verse idea, or ritual) — not vague spirituality.
- Cross-check with upcoming Hindu festivals/tithis (Ekadashi, Purnima, Amavasya, Navratri, etc.) before finalizing dates.
- Paraphrase scriptures and cite safely (e.g., "Bhagavad Gita, Ch. 2").
- Do not make medical, legal, or financial claims; frame guidance as spiritual and emotional support that complements professional help.
`;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// MODULE 2: Trend Research
app.post('/api/research', async (req, res) => {
  try {
    const { category, focusSpace } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(200).json({
        source: 'local_fallback',
        message: 'No API key configured. Showing curated research dataset.'
      });
    }

    const prompt = `
Act as the Trend Research Analyst for our Sanatan Dharma life-guidance channel.
Research what is currently trending and being actively searched across:
1. YouTube (search terms in spirituality, astrology, healing, relationships, self-help)
2. Google Search (rising queries on relationship problems, financial stress, anxiety, health anxiety, career confusion)
3. Pinterest (trending in chakra, manifestation, affirmations, healing)
4. Instagram/Reels (trending audio, formats, hooks)
5. Reddit & Quora (r/astrology, r/spirituality, r/relationship_advice, r/AskIndia, Quora karma/chakra questions)
6. Upcoming Hindu festivals, tithis, and astrologically significant dates in next 30-60 days.

Filter context: Category: ${category || 'all 5 categories'}, Focus space: ${focusSpace || 'all 6 platforms'}.

Return a structured JSON array with 6 to 10 high-value trending items:
[
  {
    "id": "trend-generated-1",
    "platform": "YouTube | Google Search | Pinterest | Instagram/Reels | Reddit & Quora | Hindu Calendar/Astrology",
    "trendTerm": "exact search term or phrase people type",
    "category": "relationships | money_business | mental_health | physical_health | emotional_health",
    "intent": "what the person is actually trying to solve",
    "contentAngle": "how Sanatan Dharma teaching answers it practically",
    "gap": "what is being under-served by existing creators",
    "urgency": "high | medium | evergreen",
    "searchVolumeEstimate": "e.g. +58% this week"
  }
]
Respond ONLY with a valid JSON array.
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Trend research AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      parsed = getFallbackTrends(category, focusSpace);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Trend research error:', error);
    const fallback = getFallbackTrends(req.body?.category, req.body?.focusSpace);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 3 Mode A: 20 Trend-Driven Topics
app.post('/api/topics/mode-a', async (req, res) => {
  try {
    const { trendsContext, categoryFilter } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Using current trend research, generate 12 to 20 curiosity-driven content topic ideas for the next 2 weeks.
Focus on solving real-life problems (relationships, money/business, mental health, physical health, emotional health).
Category filter: ${categoryFilter || 'balanced across all 5'}.

Rules:
1. Working title MUST be under 60 characters for YouTube, curiosity-driven.
2. Life-problem category must be one of: relationships, money_business, mental_health, physical_health, emotional_health.
3. Sanatan Dharma concept must be specific: which chakra, which planet, which scripture idea, which ritual (e.g. "Vishuddha Chakra & Shankha Mudra", "Gita Ch. 2 Nishkama Karma", "Shani transit & Svadharma").
4. "Why now": tie to a real trend or upcoming Hindu festival/tithi (e.g. Ekadashi, Amavasya, Purnima, Navratri).
5. Best format: "long-form YouTube" | "Short-only" | "carousel-only".
6. Hook: one-line hook for thumbnail or opening line.
7. If tied to a festival, verify the link is genuine and not forced.

Return a JSON array:
[
  {
    "id": "topic-1",
    "workingTitle": "Under 60 chars title",
    "category": "relationships | money_business | mental_health | physical_health | emotional_health",
    "concept": "Specific named concept",
    "whyNow": "Search trend or festival reason",
    "bestFormat": "long-form YouTube | Short-only | carousel-only",
    "hook": "Compelling one-line hook",
    "festivalTie": {
      "eventName": "Name of festival/tithi or None",
      "tithiOrDate": "Approx date or tithi",
      "isVerified": true,
      "reasoning": "Why this genuinely reflects the date's meaning"
    }
  }
]
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Mode A topics AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      parsed = getFallbackTopicsModeA(categoryFilter);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Mode A generation error:', error);
    const fallback = getFallbackTopicsModeA(req.body?.categoryFilter);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 3 Mode B: Deep Research User Brief
app.post('/api/topics/mode-b', async (req, res) => {
  try {
    const { userBrief } = req.body;
    if (!userBrief) {
      return res.status(400).json({ error: 'userBrief is required' });
    }

    const ai = getGeminiClient();

    const prompt = `
The user provided this topic or brief to research: "${userBrief}".
Perform deep research following MODULE 3 MODE B guidelines:
1. SEARCH INTENT: What are people actually typing into Google/YouTube/Pinterest? List real symptom-level phrasing (how it FEELS, not just polished terms).
2. RELATED TRENDING ANGLES: Connect to seasonal, astrological, or festival events (or explicitly state if nothing connects rather than forcing).
3. SANATAN DHARMA GROUNDING: Specific chakra, planet, scripture idea, or ritual that genuinely explains this, with honest caveats if ambiguous. Paraphrase scriptures safely (e.g. Gita Ch. 2).
4. COMPETITIVE GAP: What existing creators cover and the under-served angle we can own.
5. LIFE-PROBLEM CATEGORY: Confirm which of the 5 categories (relationships, money/business, mental health, physical health, emotional health), and flag if it straddles multiple.
6. UNCERTAINTY FLAGS: Flag any uncertain dates, stats, or scripture specifics for user verification.
7. Confirm suggested working title (<60 chars) and best format (long-form YouTube / Short-only / carousel-only).

Return a JSON object conforming strictly to this format:
{
  "userBrief": "${userBrief.replace(/"/g, '\\"')}",
  "searchIntent": {
    "realPhrasing": ["phrasing 1", "phrasing 2", "phrasing 3"],
    "symptomSearches": ["symptom feeling 1", "symptom feeling 2"]
  },
  "relatedTrendingAngles": {
    "connectedEvent": "festival or transit name, or 'None / Evergreen'",
    "isSeasonalOrAstrological": true,
    "viralFormatOrAudioNote": "description of hook style",
    "honestCaveat": "caveat if any"
  },
  "sanatanDharmaGrounding": {
    "primaryConcept": "e.g. Muladhara Chakra & Rahu nervous system dysregulation",
    "chakraOrPlanetOrScripture": "specific chakra/planet/verse reference",
    "practicalTakeaway": "clear actionable takeaway",
    "scriptureReferenceSafe": "e.g. Bhagavad Gita Ch. 2, Verse 47 paraphrased"
  },
  "competitiveGap": {
    "whatOthersCover": "what generic creators say",
    "underServedAngleToOwn": "our proprietary grounded angle"
  },
  "categories": ["relationships"],
  "straddlesMultipleCategories": false,
  "uncertaintyFlags": ["flag 1 if any, or 'None detected'"],
  "suggestedWorkingTitle": "Under 60 chars working title",
  "suggestedFormat": "long-form YouTube"
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Mode B deep research AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.suggestedWorkingTitle) {
      parsed = getFallbackDeepResearchBrief(userBrief);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Mode B error:', error);
    const fallback = getFallbackDeepResearchBrief(req.body?.userBrief);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 5: Full HSTSS Script Generator + Repurposed Short
app.post('/api/script/generate', async (req, res) => {
  try {
    const { topic, category, concept, userNotes, learningContext } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Write a full, high-retention script for a 10–15 minute YouTube anchor video on:
Topic: "${topic}"
Category: "${category || 'relationships'}"
Concept: "${concept || 'Sanatan Dharma grounding'}"
Additional Notes: "${userNotes || ''}"
${learningContext ? `AI Learned Guidelines from Channel History: ${learningContext}` : ''}

CRITICAL FORMAT REQUIREMENT — NAKUL & NIKHIL DUAL-CHARACTER DIALOGUE (IN HINGLISH):
The script MUST be written in natural, punchy, conversational HINGLISH (Hindi written in Roman/English script blended seamlessly with conversational English terms).
1. NAKUL (The Creator): Speaks in rapid, anxious, emotionally raw Hinglish with sarcastic humor, exasperation, and bodily panic ("Bhai Nikhil, mujhe bas ek baat bata... kal raat ko 2 baje mere account me 3 lakh aaye, to main bathroom floor pe hyperventilate kyu kar raha tha?!"). He calls out toxic positivity and spiritual clichés with sharp sarcastic wit ("Oh great, so I should just sit in lotus pose and manifest my rent away?!").
2. NIKHIL: Speaks in calm, composed, deeply resonant Hinglish. He handles Nakul with clear, direct, straight answers without defensiveness or preachiness. He grounds Nakul's emotional storm with unshakeable stability (Sthira), Vedic psychology, and somatic clarity ("Kyunki tumhara bank balance to badh gaya Nakul, par tumhari root abhi bhi hollow hai...").

LANGUAGE MANDATE (ABSOLUTE):
Every single dialogue line (Nakul & Nikhil), hook line, reel cut dialogue exchange, short script, and CTA MUST be written in conversational Hinglish. Do not output dialogue in formal pure English or Devanagari Hindi. Use Roman script Hinglish that sounds 100% natural when spoken on camera.

SPIRITUAL TEXT / SHLOK REQUIREMENT:
Include a genuine Sanskrit shlok or spiritual text reference (Bhagavad Gita, Upanishads, Patanjali Yoga Sutras, Vedas, etc.) WHEN NEEDED—naturally and intelligently, where it truly dissolves Nakul's defense, not just forced decoration. Provide original Sanskrit, Roman transliteration, scripture citation, and Nikhil's punchy, practical breakdown.

REEL CUTS REQUIREMENT:
Because the creator cuts Instagram Reels and YouTube Shorts directly from this main video, provide 3 EXPLICIT "REEL CUT" sections embedded in the script:
- Reel 1: The 0-45s relatable panic hook.
- Reel 2: The shlok/wisdom breakthrough moment.
- Reel 3: The brutal truth / paradigm shift.
Each reel cut must include: hookLine, targetDuration (40-60s), timecodeInLongVideo, dialogueExchanges, editingDirection (camera cuts/zooms), audioTrackVibe, onScreenCaptionText, and softCtaText.

CTA LADDER (Must strictly follow this sequence at the end of long-form script):
1. Ask them to share this with someone who needs it.
2. Invite them to consult with you for spiritual healing / life coaching — tie it directly to this video's problem (${category}) while stating you work across emotional, physical, mental, relationship, and business/finance areas.
3. Soft-CTA: point to a linked "next video" exploring a related angle.

Also maintain the HSTSS summary structure (Hook, Stakes, Turn, Scene, Shatter) and the repurposed 60-90s Short script and editor captions.

Return a JSON object conforming strictly to this structure:
{
  "topic": "${topic.replace(/"/g, '\\"')}",
  "category": "${category || 'relationships'}",
  "concept": "${concept || ''}",
  "directingGuide": {
    "nakulRole": {
      "characterName": "Nakul (You)",
      "archetype": "The Relatable Suffering Human: Anxious, Irritated, Sarcastic, Overwhelmed",
      "vocalPacing": "Fast-talking, clipped syllables, exasperated laughs, sudden defensive spikes",
      "physicalCues": "Pacing, running hand through hair, checking phone, clutching mug",
      "wardrobe": "Oversized hoodie or rumpled casual tee",
      "framing": "Camera Left, tighter lens, dynamic angle"
    },
    "nikhilRole": {
      "characterName": "Nikhil",
      "archetype": "The Sthir Sage: Calm, Composed, Deep Voice, Direct Truth",
      "vocalPacing": "Deep chest resonance, unhurried cadence, intentional quiet pauses",
      "physicalCues": "Still upright spine, relaxed hands on table, unblinking eye contact",
      "wardrobe": "Clean minimal linen shirt or solid dark tee",
      "framing": "Camera Right, locked tripod, calm eye-level framing"
    },
    "filmingWorkflowTip": "Batch record: film all Nakul takes first with high anxious energy on Camera Left, then change shirt, move to Camera Right, and film Nikhil's calm responses."
  },
  "shlokCard": {
    "included": true,
    "sanskrit": "Sanskrit verse in Devanagari",
    "transliteration": "Roman English transliteration",
    "source": "e.g. Bhagavad Gita Ch. 2, Verse 47",
    "nikhilExplanation": "Nikhil's straight, modern explanation that stops Nakul's spiral",
    "contextInDialogue": "Why this shlok entered right now in the script"
  },
  "reelCuts": [
    {
      "id": "reel-1",
      "cutNumber": 1,
      "title": "Reel 1 Title",
      "timecodeInLongVideo": "00:00 - 00:48",
      "targetDuration": "48s",
      "hookLine": "First 3-second hook spoken & on-screen",
      "onScreenCaptionText": "POV: Text hook on screen",
      "audioTrackVibe": "Audio direction for editor",
      "editingDirection": "Camera cut & pacing direction",
      "dialogueExchanges": [
        { "speaker": "Nakul", "note": "[Frustrated note]", "line": "Line..." },
        { "speaker": "Nikhil", "note": "[Calm deep note]", "line": "Line..." }
      ],
      "softCtaText": "Full breakdown on YouTube — link in bio."
    }
  ],
  "dialogueScript": [
    {
      "id": "d-1",
      "speaker": "Nakul",
      "actorNote": "[Camera Left | Anxious, pacing, holding phone]",
      "dialogue": "Line...",
      "timestamp": "00:00",
      "isReelCutStart": true,
      "reelCutId": "reel-1"
    },
    {
      "id": "d-2",
      "speaker": "Nikhil",
      "actorNote": "[Camera Right | Calm, deep voice, steady gaze]",
      "dialogue": "Line...",
      "timestamp": "00:25"
    }
  ],
  "hook": {
    "ideaCollision": "Primary 0-3s collision line",
    "alternateCollisionOptions": ["Alt collision 1", "Alt collision 2", "Alt collision 3"],
    "buildToElevenSeconds": "4-11s concrete detail build"
  },
  "stakes": {
    "lowestPointStory": "Vulnerable client/personal story detailing the lowest point",
    "visceralBodyFeeling": "Exact physical feeling in chest, throat, or stomach at 2am",
    "twoAmInternalDialogue": "What the mind was screaming at 2am"
  },
  "turn": {
    "livedRealization": "The turning realization moment",
    "sanatanTeachingIntegrated": "How the Sanatan Dharma concept unlocked the shift without preachy jargon",
    "momentOfLevityOrJoy": "Lighter touch or sigh of relief"
  },
  "scene": {
    "sensoryDetails": "Specific visual and atmospheric details",
    "roomAndLight": "What the room looked like and the quality of light",
    "tangibleAnchors": "Chai cup, temple bell, rain, or traffic sounds",
    "dialogueOrPresence": "Key exchange or somatic stillness"
  },
  "shatter": {
    "micDropQuote": "1-2 sentence quotable, screenshot-worthy truth",
    "quotableLines": ["Line 1", "Line 2"]
  },
  "ctaLadder": {
    "step1_share": "Word-for-word share ask",
    "step2_consult": "Word-for-word general consultation invitation framed around this problem",
    "step3_nextVideo": "Word-for-word next video hook-loop"
  },
  "shortScript": {
    "duration": "60-90 seconds",
    "hook": "Fast Short hook",
    "stakes": "Compressed stakes",
    "turn": "Rapid realization",
    "scene": "Micro sensory visual cue",
    "shatter": "Punchy punchline",
    "softCta": "Full breakdown on YouTube — link in bio"
  },
  "editorCaptions": [
    "Caption 1 (Hook)",
    "Caption 2 (Stakes)",
    "Caption 3 (Turn)",
    "Caption 4 (Shatter)",
    "Caption 5 (CTA)"
  ]
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Script generation AI error (503/transient), engaging resilient fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.hook || !parsed.dialogueScript) {
      parsed = getFallbackScriptPackage(topic, category, concept, userNotes);
      return res.json({
        source: 'local_fallback',
        data: parsed,
        note: 'Synthesized via DharmaCraft Strategic Script Engine (AI high demand buffer).'
      });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Script generation error:', error);
    const fallback = getFallbackScriptPackage(
      req.body?.topic || 'Sanatan Guidance',
      req.body?.category,
      req.body?.concept,
      req.body?.userNotes
    );
    res.json({
      source: 'local_fallback',
      data: fallback,
      note: 'Synthesized via DharmaCraft Strategic Script Engine.'
    });
  }
});

// MODULE 6: SEO & Packaging
app.post('/api/seo/generate', async (req, res) => {
  try {
    const { topic, scriptSummary, category } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Generate complete SEO & packaging for:
Topic: "${topic}"
Category: "${category || 'relationships'}"
Summary/Context: "${scriptSummary || ''}"

REQUIREMENTS:
1. 5 YouTube title options: UNDER 60 CHARACTERS, front-load keywords, curiosity + benefit. AT LEAST 2 MUST BE PROBLEM/SYMPTOM-LED (how a suffering person searches) rather than spiritual concept-led.
2. YouTube description (150–300 words): First 2 lines must contain main keyword & hook before "show more", short summary, timestamps placeholder, and a direct consultation/booking page CTA link.
3. 15 YouTube tags: MUST be a strict mix of symptom/problem search tags (e.g. "why do I feel anxious all the time", "financial stress insomnia") alongside spiritual/astrological tags.
4. 5 hashtags: Mix of problem-aware and spiritual (at least 2 problem-aware).
5. 3 thumbnail text options: Max 4-5 words, high-contrast, at least one stated as the problem.
6. Instagram/Facebook caption (100–150 words): Hook in first line, 3-5 mixed hashtags, CTA to watch full breakdown on YouTube link in bio (NEVER a direct consult ask).

Return a JSON object conforming strictly to:
{
  "topic": "${topic.replace(/"/g, '\\"')}",
  "titles": [
    { "title": "Title text under 60 chars", "charCount": 48, "isProblemLed": true },
    { "title": "Title text under 60 chars", "charCount": 52, "isProblemLed": true },
    { "title": "Title text under 60 chars", "charCount": 45, "isProblemLed": false },
    { "title": "Title text under 60 chars", "charCount": 54, "isProblemLed": false },
    { "title": "Title text under 60 chars", "charCount": 49, "isProblemLed": false }
  ],
  "youtubeDescription": {
    "firstTwoLinesFold": "First two lines before the fold containing keyword",
    "summary": "Core body summary of the video",
    "timestampsPlaceholder": "0:00 - The 2am Pattern\\n0:45 - The Unspoken Root\\n3:15 - What Ancient Rishis Knew\\n7:20 - Somatic Reset\\n11:10 - Next Steps",
    "consultationCta": "Book a 1-on-1 Spiritual Healing & Life Coaching Consultation: [Link]",
    "wordCount": 210
  },
  "youtubeTags": [
    { "tag": "problem tag 1", "type": "symptom_problem" },
    { "tag": "problem tag 2", "type": "symptom_problem" },
    { "tag": "problem tag 3", "type": "symptom_problem" },
    { "tag": "spiritual tag 1", "type": "spiritual_astrological" },
    { "tag": "spiritual tag 2", "type": "spiritual_astrological" },
    { "tag": "broad tag 1", "type": "broad_longtail" }
  ],
  "hashtags": ["#AnxietyRelief", "#RootChakra", "#HealingJourney", "#SanatanDharma", "#NervousSystemReset"],
  "thumbnailTexts": [
    { "text": "WHY MONEY SCARES YOU", "isProblemStated": true },
    { "text": "STOP ROOT PANIC NOW", "isProblemStated": false },
    { "text": "THE 2AM NERVOUS RESET", "isProblemStated": false }
  ],
  "instagramFacebookCaption": {
    "hookLine": "Opening hook line",
    "captionBody": "Body of caption",
    "mixedHashtags": ["#Tag1", "#Tag2", "#Tag3"],
    "softCtaYouTubeLinkInBio": "Full deep dive breakdown on YouTube — link in bio."
  }
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] SEO generation AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.titles || !parsed.youtubeDescription) {
      parsed = getFallbackSEOPackage(topic, category, scriptSummary);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('SEO generation error:', error);
    const fallback = getFallbackSEOPackage(
      req.body?.topic || 'Sanatan Life Guidance',
      req.body?.category,
      req.body?.scriptSummary
    );
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 7: Pinterest & Visual Prompts
app.post('/api/pinterest/generate', async (req, res) => {
  try {
    const { topic, category, concept } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Generate Pinterest Pin Package for:
Topic: "${topic}"
Category: "${category || 'relationships'}"
Concept: "${concept || 'Chakra / Vedic healing'}"

REQUIREMENTS:
1. 3 Pinterest pin image prompts formatted EXACTLY as:
   "A [style: soft watercolor / minimalist flat illustration / warm photo-realistic] image of [subject], in a color palette of [colors — tie to the relevant chakra or a calming palette], with space at the top/bottom for text overlay, vertical 2:3 ratio, no readable text in the image itself."
   Vary styles across the 3 (one watercolor, one minimalist flat illustration, one warm photo-realistic).
2. For each pin:
   - Overlay text (words that go ON the pin, 6-10 words, benefit-driven, e.g. "5 Signs Your Root Chakra Is Blocked").
   - Pin title (<100 characters, at least one pin title targeting problem/symptom search language rather than spiritual terms).
   - Pin description (200–500 characters, natural language mixing problem + spiritual keywords, soft CTA to watch full video on YouTube, NEVER consult).
   - Suggested board/category.
   - Destination link note (YouTube video URL placeholder).
3. 2 non-competing keyword variations to target across the pins.

Return a JSON object conforming strictly to:
{
  "topic": "${topic.replace(/"/g, '\\"')}",
  "pins": [
    {
      "id": "pin-1",
      "style": "soft watercolor",
      "imagePrompt": "A soft watercolor image of...",
      "overlayText": "6 to 10 words overlay text",
      "pinTitle": "Keyword rich title under 100 chars",
      "isProblemLedTitle": true,
      "pinDescription": "200-500 char description ending with YouTube link in bio soft CTA",
      "suggestedBoard": "Board name",
      "destinationLinkNote": "YouTube video link"
    },
    {
      "id": "pin-2",
      "style": "minimalist flat illustration",
      "imagePrompt": "A minimalist flat illustration image of...",
      "overlayText": "6 to 10 words overlay text",
      "pinTitle": "Keyword rich title under 100 chars",
      "isProblemLedTitle": false,
      "pinDescription": "200-500 char description ending with YouTube link in bio soft CTA",
      "suggestedBoard": "Board name",
      "destinationLinkNote": "YouTube video link"
    },
    {
      "id": "pin-3",
      "style": "warm photo-realistic",
      "imagePrompt": "A warm photo-realistic image of...",
      "overlayText": "6 to 10 words overlay text",
      "pinTitle": "Keyword rich title under 100 chars",
      "isProblemLedTitle": false,
      "pinDescription": "200-500 char description ending with YouTube link in bio soft CTA",
      "suggestedBoard": "Board name",
      "destinationLinkNote": "YouTube video link"
    }
  ],
  "keywordVariations": ["Keyword variation 1", "Keyword variation 2"]
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Pinterest generation AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.pins) {
      parsed = getFallbackPinterestPackage(topic, category, concept);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Pinterest generation error:', error);
    const fallback = getFallbackPinterestPackage(
      req.body?.topic || 'Sanatan Grounding',
      req.body?.category,
      req.body?.concept
    );
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 4: Content Calendar Generator
app.post('/api/calendar/generate', async (req, res) => {
  try {
    const { month, year, selectedTopics } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Build a comprehensive content calendar for: ${month || 'September'} ${year || '2026'}.
Topics pool available: ${JSON.stringify(selectedTopics || [])}.

MANDATORY CALENDAR RULES:
- Include significant Hindu festivals, tithis, ekadashi, purnima, amavasya, and major planetary events in this month.
- WEEKLY CADENCE MANDATE: Schedule EXACTLY 1 main long-form YouTube video per week (typically Sunday or Thursday). Do NOT schedule multiple long-form videos in the same week.
- 6-DAY ATOMIZATION ORBIT: For the remaining 6 days of each week, schedule repurposed satellite content stemming directly from that week's single long-form video: 2-3 Shorts/Reels, 1-2 Carousels, 2-3 Pinterest pins, and 1 community poll or newsletter post.
- Include a pre-launch "hype" post 2-4 days before the weekly long-form drop.
- Balance across the 5 problem categories so no single category dominates more than 40% of the month!

Return a JSON array of calendar items:
[
  {
    "id": "cal-item-1",
    "date": "2026-09-04",
    "dayOfWeek": "Friday",
    "festivalOrTithi": "Optional festival or tithi",
    "platform": "YouTube | Instagram/Facebook | Pinterest | Meta/Stories | Quora/Reddit",
    "contentType": "Long-form Video | Short/Reel | Carousel | Pinterest Pin | Pre-Launch Hype | Community Q&A",
    "title": "Title or topic",
    "category": "relationships | money_business | mental_health | physical_health | emotional_health",
    "status": "Idea | Scripted | Shot | Scheduled | Live",
    "notes": "Purpose, repurpose link, or CTA note"
  }
]
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Calendar generation AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      parsed = getFallbackCalendar(month, year);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Calendar generation error:', error);
    const fallback = getFallbackCalendar(req.body?.month, req.body?.year);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// MODULE 8: Growth Strategy & Pre-Launch Hype
app.post('/api/growth/generate', async (req, res) => {
  try {
    const { topic, category } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Generate the Module 8 Growth & Visibility Strategy for:
Topic: "${topic}"
Category: "${category || 'relationships'}"

Include:
1. Pre-launch hype sequence (Day -5 teaser Reel, Day -3 question/poll sticker, Day -1 countdown, Day 0 launch cross-post).
2. Reddit & Quora compounding visibility play (exact high-value questions and authentic non-spam contribution).
3. Content atomization map (1 YouTube video into 10 multi-platform assets).
4. A/B thumbnail and title testing hypothesis (Variant A vs Variant B).
5. Community loop pinned comment question to mine audience language.

Return JSON:
{
  "topic": "${topic.replace(/"/g, '\\"')}",
  "preLaunchHype": {
    "dayMinus5": { "type": "Teaser Reel/Short", "prompt": "Hook copy without giving answer", "purpose": "Curiosity surge" },
    "dayMinus3": { "type": "Poll or Question Sticker", "prompt": "Audience vote between 2 angles", "purpose": "Feedback & algorithm priming" },
    "dayMinus1": { "type": "Countdown Post", "prompt": "Pinned comment & countdown preview", "purpose": "Anticipation build" },
    "dayZero": { "type": "Launch & Cross-post", "prompt": "Cross-post Short cut-down with link in bio", "purpose": "Multi-channel funnel" }
  },
  "redditQuoraPlaybook": {
    "quoraTargetQuestions": ["Question 1", "Question 2"],
    "quoraAnswerFramework": "How to answer with real value and soft video mention",
    "redditSubreddits": ["r/spirituality", "r/relationship_advice", "r/AskIndia"],
    "redditAuthenticValueContribution": "Specific non-promotional discussion prompt"
  },
  "atomizationMap": {
    "totalPieces": 10,
    "breakdown": [
      { "platform": "YouTube", "format": "Anchor Video 12 min", "purpose": "Deep connection & consultation conversion" },
      { "platform": "YouTube Shorts", "format": "Short #1", "purpose": "Discovery" },
      { "platform": "YouTube Shorts", "format": "Short #2", "purpose": "Secondary angle" },
      { "platform": "Instagram", "format": "Reel #1", "purpose": "Viral reach to YouTube bio" },
      { "platform": "Instagram", "format": "Reel #2", "purpose": "Alternative hook" },
      { "platform": "Instagram", "format": "Carousel (7 slides)", "purpose": "Saves & shares" },
      { "platform": "Pinterest", "format": "Pin #1 (Watercolor)", "purpose": "Long-tail SEO" },
      { "platform": "Pinterest", "format": "Pin #2 (Illustration)", "purpose": "Visual board ranking" },
      { "platform": "Quora", "format": "Evergreen Answer", "purpose": "Google search index" },
      { "platform": "Reddit", "format": "Community Comment", "purpose": "Audience problem vocabulary mining" }
    ]
  },
  "abThumbnailTestVariants": {
    "variantA": { "headline": "Headline A", "visualFocalPoint": "Visual focus A", "hypothesis": "Hypothesis A" },
    "variantB": { "headline": "Headline B", "visualFocalPoint": "Visual focus B", "hypothesis": "Hypothesis B" }
  },
  "communityQuestionToPin": "Specific inquiry question to pin in YouTube comments"
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Growth playbook AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.preLaunchHype) {
      parsed = getFallbackGrowthPlaybook(topic, category);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Growth strategy generation error:', error);
    const fallback = getFallbackGrowthPlaybook(
      req.body?.topic || 'Sanatan Growth Strategy',
      req.body?.category
    );
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// AI LEARNING ENGINE: Analyze Feedback Logs & Recalibrate Strategy
app.post('/api/learning/analyze', async (req, res) => {
  try {
    const { feedbackLogs } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Act as the Strategic Intelligence Engine for our Sanatan Dharma channel.
Analyze our historical performance data logs:
${JSON.stringify(feedbackLogs || [])}

Tasks:
1. Analyze which problem categories and format angles generated the highest CTR, retention, and consultation clicks.
2. Determine which hook formulas and title patterns (problem-led vs spiritual-led) won with real audiences.
3. Formulate 4 concrete, actionable SEO lessons to guide all future topic generation.
4. Formulate 3 strategic adjustments for future long-form scripts, thumbnail text, and calendar pacing.

Return JSON:
{
  "totalAnalyzed": ${feedbackLogs?.length || 0},
  "topPerformingCategories": [
    { "category": "money_business", "avgCtr": 8.5, "avgRetention": 56.0 },
    { "category": "relationships", "avgCtr": 9.2, "avgRetention": 68.0 }
  ],
  "hookFormulaEffectiveness": [
    { "formula": "Formula name", "winRate": 85, "recommendation": "Specific guideline" }
  ],
  "seoLessons": [
    "Lesson 1",
    "Lesson 2",
    "Lesson 3",
    "Lesson 4"
  ],
  "strategicAdjustments": [
    "Adjustment 1",
    "Adjustment 2",
    "Adjustment 3"
  ],
  "lastUpdated": "${new Date().toISOString().split('T')[0]}"
}
`;

    let parsed: any = null;
    if (ai) {
      try {
        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        parsed = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Learning analysis AI error, engaging fallback:', err?.message || err);
      }
    }

    if (!parsed || !parsed.seoLessons) {
      parsed = getFallbackLearningAnalysis(feedbackLogs);
      return res.json({ source: 'local_fallback', data: parsed });
    }

    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Learning engine error:', error);
    const fallback = getFallbackLearningAnalysis(req.body?.feedbackLogs);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// Vite middleware in dev or static files in prod
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DharmaCraft server running on port ${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
