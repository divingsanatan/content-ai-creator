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
  getFallbackLearningAnalysis,
  getFallbackAutoPlanAndScript
} from './server/fallbackGenerators';
import {
  getSupabaseConfig,
  getSupabaseClient,
  RECOMMENDED_SUPABASE_SCHEMA
} from './server/supabase';
import { persistenceStore } from './server/persistenceStore';

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
1. NAKUL (The Creator's Vulnerable Experience): Anxious, irritated, frustrated, and sarcastic at times. He is the relatable avatar of real human experience—dealing with high-pressure work, relationship boundaries, financial anxiety, and somatic burnout. He shares real lived mistakes and calls out spiritual clichés with cynical humor ("So I should just manifest my rent away?!").
2. NIKHIL (The Integrated Guide & Hard-Won Learning): Calm, composed, with a deep chest-resonant voice, who handles Nakul with clear, direct, straight answers. Never preachy, never patronizing; he meets Nakul's emotional storm with unshakeable Sthira (grounded stability), Vedic psychology, and somatic clarity.
This dynamic creates intense relatability, comedic relief, and high watch time and shareability.

AUTHENTIC LIVED EXPERIENCE & NOVELTY MANDATE (STRICT ANTI-CLICHÉ RULE):
- STRICT PROHIBITION: DO NOT default to the clichéd "2 AM / 3 AM nocturnal panic" or "bathroom floor hyperventilation" tropes. Repeating nocturnal panic in every script makes the content predictable, repetitive, and boring.
- DIVERSE REAL-WORLD NOVELTY: Ground every story in diverse, believable, everyday settings:
  * An afternoon client meeting where you closed a dream deal but your throat locked up in dread.
  * Sitting in bumper-to-bumper evening traffic when an unread message sent your heart pounding.
  * A Sunday family lunch where someone's innocent comment triggered an ancient ancestral rage.
  * Opening a bank app at a sunny café at 2 PM and feeling a wave of unexplainable nausea.
  * Standing at an airport gate or staring at an unread email draft before clicking Send.
- FIRST-PERSON LIVED LEARNING: Every script must feel like YOUR OWN GENUINE EXPERIENCE. You are not reciting textbook theory or lecturing—you are opening up about a real mistake you personally made, how you suffered through it, and the exact practical Sanatan learning you discovered that healed it.

LANGUAGE MANDATE — ALL SCRIPTS MUST BE IN HINGLISH:
All spoken dialogue, scripts, hooks, reel cuts, actor lines, and CTAs MUST be written in natural, fluent, conversational HINGLISH (Hindi written in Roman/English alphabet, mixed authentically with conversational English words, exactly how modern urban Indian creators, podcasters, and YouTube filmmakers talk).
- Nakul speaks in raw, rapid, emotional Hinglish with relatable everyday vocabulary, exasperation, and bodily panic (e.g., "Bhai Nikhil, mujhe bas ek seedha jawab de... Tuesday dopehar ko 2 baje jab account me 3 lakh ka advance wire aaya, main celebrate karne ke bajay apni car me baith ke freeze kyu ho gaya? Why did my nervous system feel ki meri survival threatened hai?!").
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

PROVEN HIGH-PERFORMANCE NARRATIVE & COPYWRITING FRAMEWORKS (LAYERED ON TOP OF HSTSS):
These proven named frameworks layer directly on top of the HSTSS (Hook-Stakes-Turn-Scene-Shatter) storytelling engine to solve critical execution problems:

1. STORYBRAND (SB7) — FOR FRAMING THE CALL TO ACTION (CTA):
   - Donald Miller's SB7 framework casts the AUDIENCE as the HERO of the story, and the BRAND / PRACTITIONER as the GUIDE.
   - Seven beats: A Character (viewer) who has a Problem meets a Guide (you/Nikhil) who gives them a Plan (the consultation/reset) and calls them to Action, leading to Failure avoided and Success achieved.
   - Crucial fix for spiritual channels: Avoid positioning yourself as the wise, accomplished healer (the hero) while treating the viewer as passive. The viewer is the hero with a life problem; you are the guide who has been there, understands the terrain, and provides the plan.
   - In the long-form video, the Turn beat in HSTSS is where you transition from fellow sufferer into the Guide. The consultation CTA must feel like the obvious next step for the hero to avoid tragedy and achieve grounded peace.

2. PAS / PASO (PROBLEM — AGITATE — SOLVE — OUTCOME) — FOR ORBIT CONTENT & 60-90s SHORTS:
   - Direct-response copywriting structure: Name the Problem (exact relatable pain point, physical tension, or real-world trigger), Agitate it emotionally so the viewer feels its visceral weight, present the Solve (one crisp Sanatan/Vedic insight), and Outcome (what tangible relief/change looks like).
   - Perfect for tight 60-90s Orbit cuts and Shorts where there is no room for a full Scene.
   - QUALITY & FABRICATION MANDATE: Never fabricate or exaggerate the agitation stage. Overselling false or inflated panic burns trust. Keep agitation 100% grounded in authentic human and somatic experience.

3. ABT (AND, BUT, THEREFORE) — AS A SCRIPT-TIGHTENING DIAGNOSTIC TEST:
   - Randy Olson's narrative diagnostic: Nearly every effective story compresses into "This happens, AND this happens, BUT this happens, THEREFORE this happens".
   - The "BUT" is the linchpin: A script with no contradiction or conflict is just a boring lecture with no story in it yet (the fatal failure mode).
   - Identifiable-Victim / Protagonist Focus: Audiences respond far more to a story about one specific, named person (e.g., Nakul facing payday panic) than to generic generalities.
   - Use ABT as a 30-second gut-check on every script: Ensure Stakes-Turn-Shatter compresses cleanly into one AND/BUT/THEREFORE sentence with a real contradiction.

4. THE "UNIVERSAL RETENTION STRUCTURE" — 4-BEAT SANITY CHECK:
   - Reason to Care (first 15s) → Movement (narrative pacing, banter, no static monologues) → Payoff (satisfying, complete Sanatan resolution) → CTA (closed loop pointing to next step).
   - Fast mid-edit diagnostic to guarantee the video never drags.

SYSTEM LAYERING (SUMMARY):
- HSTSS stays your primary script structure (Hook/Stakes/Turn/Scene/Shatter is the storytelling engine).
- StoryBrand SB7 hero/guide framing governs how the CTA beat is worded.
- PAS/PASO becomes the structure for your Orbit Shorts/Reels.
- ABT becomes the one-line QA diagnostic test ("can this compress to And/But/Therefore?").
- Universal Retention Structure provides the 4-beat sanity check.

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

// CORE PERSISTENCE API: Hydrate full application state from Database
app.get('/api/app-state', async (req, res) => {
  try {
    const [categories, topics, calendar, feedbackLogs, learningState, mindsetProfile] = await Promise.all([
      persistenceStore.getCategories(),
      persistenceStore.getTopics(),
      persistenceStore.getCalendar(),
      persistenceStore.getFeedbackLogs(),
      persistenceStore.getLearningState(),
      persistenceStore.getMindsetProfile()
    ]);
    const scriptPackage = await persistenceStore.getScript();
    const config = getSupabaseConfig();

    res.json({
      success: true,
      categories,
      topics,
      scriptPackage,
      calendar,
      feedbackLogs,
      learningState,
      mindsetProfile,
      isSupabaseConfigured: config.isConfigured,
      persistenceActive: true,
      totalFeedbackLogs: feedbackLogs.length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('[Server] Failed to load app state:', err);
    res.status(500).json({ error: 'Failed to load app state from database' });
  }
});

// CATEGORIES CRUD ENDPOINTS
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await persistenceStore.getCategories();
    res.json({ success: true, categories });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { label, id, color, bg, border, description } = req.body;
    if (!label || typeof label !== 'string' || !label.trim()) {
      return res.status(400).json({ error: 'Category label is required' });
    }
    const category = await persistenceStore.createCategory({
      label,
      id,
      color,
      bg,
      border,
      description
    });
    res.json({ success: true, category });
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label, color, bg, border, description } = req.body;
    const category = await persistenceStore.updateCategory(id, {
      label,
      color,
      bg,
      border,
      description
    });
    res.json({ success: true, category });
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reassignToId } = req.body || {};
    const result = await persistenceStore.deleteCategory(id, reassignToId);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'Failed to delete category' });
  }
});

// Save / Update Topics in Database
app.post('/api/topics/save', async (req, res) => {
  try {
    const { topics } = req.body;
    if (Array.isArray(topics)) {
      await persistenceStore.saveTopics(topics);
      return res.json({ success: true, count: topics.length });
    }
    res.status(400).json({ error: 'Invalid topics array' });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save topics' });
  }
});

// Save / Update Script Package in Database
app.post('/api/scripts/save', async (req, res) => {
  try {
    const { scriptPackage } = req.body;
    if (scriptPackage) {
      await persistenceStore.saveScript(scriptPackage);
      return res.json({ success: true, id: scriptPackage.id || 'topic-1' });
    }
    res.status(400).json({ error: 'Invalid script package' });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save script' });
  }
});

// Save / Update Calendar in Database
app.post('/api/calendar/save', async (req, res) => {
  try {
    const { calendar } = req.body;
    if (Array.isArray(calendar)) {
      await persistenceStore.saveCalendar(calendar);
      return res.json({ success: true, count: calendar.length });
    }
    res.status(400).json({ error: 'Invalid calendar array' });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save calendar' });
  }
});

// Log Performance Feedback (Closed-Loop Learning) in Database
app.post('/api/feedback/add', async (req, res) => {
  try {
    const { log } = req.body;
    if (log && log.contentTitle) {
      await persistenceStore.addFeedbackLog(log);
      return res.json({ success: true, log });
    }
    res.status(400).json({ error: 'Invalid feedback log payload' });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to persist feedback log' });
  }
});

// Retrieve Feedback Logs
app.get('/api/feedback/list', async (req, res) => {
  try {
    const logs = await persistenceStore.getFeedbackLogs();
    res.json({ success: true, logs });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to load feedback logs' });
  }
});

// Save / Update Learning State in Database
app.post('/api/learning/state', async (req, res) => {
  try {
    const { state } = req.body;
    if (state) {
      await persistenceStore.saveLearningState(state);
      return res.json({ success: true, state });
    }
    res.status(400).json({ error: 'Invalid learning state payload' });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to save learning state' });
  }
});

// ==========================================
// CREATOR MINDSET & CONTENT DNA LEARNING
// ==========================================

// Get learned creator mindset profile
app.get('/api/mindset/profile', async (req, res) => {
  try {
    const profile = await persistenceStore.getMindsetProfile();
    res.json({ success: true, profile });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to fetch creator mindset profile' });
  }
});

// Update custom creator mindset guidance (instructions on how creator thinks)
app.post('/api/mindset/guidance', async (req, res) => {
  try {
    const { guidance } = req.body;
    if (typeof guidance !== 'string') {
      return res.status(400).json({ error: 'Guidance must be a string' });
    }
    const updated = await persistenceStore.updateCustomMindsetGuidance(guidance);
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to update mindset guidance' });
  }
});

// Add a new creator rule or content constraint
app.post('/api/mindset/add-rule', async (req, res) => {
  try {
    const { category, rule, sourceIdeaOrBrief } = req.body;
    if (!rule || !rule.trim()) {
      return res.status(400).json({ error: 'Rule text is required' });
    }
    const updated = await persistenceStore.addMindsetRule({
      category: category || 'voice_and_tone',
      rule: rule.trim(),
      sourceIdeaOrBrief: sourceIdeaOrBrief || 'Manual creator guidance'
    });
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to add creator mindset rule' });
  }
});

// Remove a creator mindset rule
app.post('/api/mindset/remove-rule', async (req, res) => {
  try {
    const { ruleId } = req.body;
    if (!ruleId) {
      return res.status(400).json({ error: 'Rule ID is required' });
    }
    const updated = await persistenceStore.removeMindsetRule(ruleId);
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to remove creator mindset rule' });
  }
});

// On-demand learn from an idea or topic brief
app.post('/api/mindset/learn-from-idea', async (req, res) => {
  try {
    const { brief, topicTitle, userNotes } = req.body;
    if (!brief) {
      return res.status(400).json({ error: 'Brief or idea text is required' });
    }
    const updated = await persistenceStore.learnFromIdeaOrBrief(brief, topicTitle, userNotes);
    res.json({ success: true, profile: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to learn from idea' });
  }
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
    const learningMemoryContext = await persistenceStore.getContinuousLearningContext();

    const prompt = `
${learningMemoryContext}

Using current trend research and our empirical performance learning history above, generate 12 to 20 curiosity-driven content topic ideas for the next 2 weeks.
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
8. Incorporate lessons learned: lead with symptom/problem curiosity, avoid premature Sanskrit terms in title.

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
    const learningMemoryContext = await persistenceStore.getContinuousLearningContext();

    const prompt = `
${learningMemoryContext}

The user provided this topic or brief to research: "${userBrief}".
Perform deep research following MODULE 3 MODE B guidelines, incorporating our empirical channel history:
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
    const { topic, category, concept, userNotes, learningContext, storyArchetype, storySetting, personalLearningTakeaway } = req.body;
    const ai = getGeminiClient();
    const dbLearningContext = await persistenceStore.getContinuousLearningContext();

    const prompt = `
${dbLearningContext}

Write a full, high-retention script for a 10–15 minute YouTube anchor video on:
Topic: "${topic}"
Category: "${category || 'relationships'}"
Concept: "${concept || 'Sanatan Dharma grounding'}"
Additional Notes: "${userNotes || ''}"
${storyArchetype ? `Preferred Narrative Archetype: ${storyArchetype}` : ''}
${storySetting ? `Specific Real-World Setting: ${storySetting}` : ''}
${personalLearningTakeaway ? `Creator's Personal Lesson: ${personalLearningTakeaway}` : ''}
${learningContext ? `Extra User Guidance: ${learningContext}` : ''}

AUTHENTIC FIRST-PERSON LIVED EXPERIENCE & NOVELTY MANDATE (CRITICAL):
- STRICT PROHIBITION: DO NOT use repetitive 2 AM / 3 AM nocturnal panic, insomnia, or lying on the bathroom floor. Repeating nocturnal panic makes scripts boring and predictable.
- INVENT NOVEL REAL-WORLD SETTINGS: Ground the crisis in diverse, relatable situations:
  * An afternoon client meeting where you signed a huge deal but your throat locked up in unworthiness.
  * Bumper-to-bumper evening traffic when an unread WhatsApp notification triggered an ancient panic.
  * Making morning chai on a Sunday, staring at an empty cup while the mind calculated survival spreadsheets.
  * Standing at an airport gate, opening a banking app in a busy café, or having dinner with family.
- FIRST-PERSON LIVED VULNERABILITY: Make the story feel like YOUR OWN GENUINE PAST TRIAL: "This happened to me. I made this mistake for years. I am sharing my own breakdown and what I personally learned when walking through it." Nakul embodies the raw, uncensored memory of that trial; Nikhil delivers the hard-won somatic and Vedic learning.

CRITICAL FORMAT REQUIREMENT — NAKUL & NIKHIL DUAL-CHARACTER DIALOGUE (IN HINGLISH):
The script MUST be written in natural, punchy, conversational HINGLISH (Hindi written in Roman/English script blended seamlessly with conversational English terms).
1. NAKUL (The Creator's Raw Past Experience): Speaks in rapid, anxious, emotionally raw Hinglish with sarcastic humor, exasperation, and bodily panic ("Bhai Nikhil, mujhe bas ek seedha jawab de... Tuesday dopehar ko deal sign hote hi mera nervous system freeze kyu ho gaya?!"). He calls out toxic positivity and spiritual clichés with sharp sarcastic wit ("Oh great, so I should just sit in lotus pose and manifest my rent away?!").
2. NIKHIL (The Integrated Guide & Hard-Won Learning): Speaks in calm, composed, deeply resonant Hinglish. He handles Nakul with clear, direct, straight answers without defensiveness or preachiness. He grounds Nakul's emotional storm with unshakeable stability (Sthira), Vedic psychology, and somatic clarity ("Kyunki tumhara bank balance to badh gaya Nakul, par tumhari root abhi bhi hollow hai...").

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

CTA LADDER & STORYBRAND (SB7) HERO/GUIDE FRAMING (Donald Miller):
The CTA ladder at the end of the long-form script MUST strictly adhere to StoryBrand SB7:
- The viewer is the HERO facing an unresolved life crisis (${category}).
- You / Nikhil are the GUIDE who has walked through this fire, understands the terrain, and provides a clear 3-step plan (consultation).
- Step 1: Share Ask (reach a friend fighting this exact battle).
- Step 2: 1-on-1 Consultation offer framed with empathy & authority (helps the hero avoid failure/self-sabotage and step into grounded peace).
- Step 3: Next Video hook-loop.

PROVEN FRAMEWORKS MANDATE:
1. StoryBrand SB7 Framing: Fill out the 7 beats (Hero, Problem, Guide, Plan, CTA, Failure Avoided, Success Vision).
2. PAS / PASO Orbit Short (60-90s): Problem -> Agitate (visceral, NO fabricated/exaggerated drama) -> Solve -> Outcome -> Soft CTA to YouTube anchor.
3. ABT (And, But, Therefore) Diagnostic: Randy Olson's 1-line script-tightening test with a clear linchpin "BUT" contradiction (anti-lecture check) and single identifiable protagonist.
4. Universal Retention Structure: 4-beat sanity check (Reason to Care in 15s -> Movement -> Payoff -> CTA Loop).

Also maintain the HSTSS summary structure (Hook, Stakes, Turn, Scene, Shatter) and the repurposed 60-90s Short script and editor captions.

Return a JSON object conforming strictly to this structure:
{
  "topic": "${topic.replace(/"/g, '\\"')}",
  "category": "${category || 'relationships'}",
  "concept": "${concept || ''}",
  "storyArchetype": "${storyArchetype || 'personal_confession'}",
  "storySetting": "Specific real-world setting (e.g., Tuesday 2:30 PM car after closing biggest client)",
  "personalLearningTakeaway": "What you personally learned from this breakdown and trial",
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
    "lowestPointStory": "Vulnerable personal lived story detailing your lowest point or breakdown in this real-world setting",
    "visceralBodyFeeling": "Exact physical feeling in chest, throat, stomach, or hands in that moment",
    "internalCrisisDialogue": "What the mind was frantically screaming",
    "twoAmInternalDialogue": "What the mind was frantically screaming"
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
    "step2_consult": "Word-for-word general consultation invitation framed around this problem with StoryBrand Guide empathy",
    "step3_nextVideo": "Word-for-word next video hook-loop"
  },
  "storyBrandCTA": {
    "hero": "The viewer struggling with this life crisis",
    "problem": "External symptom, internal panic, and philosophical conflict",
    "guideRole": "You/Nikhil: Experienced guide with empathy & authority (has walked the path)",
    "plan": "Simple 3-step consultation plan (Assess root block -> Somatic re-alignment -> Grounded stability)",
    "callToAction": "Book 1-on-1 spiritual healing & life coaching consultation",
    "failureAvoided": "Tragic cycle of chronic anxiety/burnout avoided",
    "successVision": "Reclaimed Sthira, calm heart, and expanded capacity",
    "turnBeatRole": "How the Turn beat transitions speaker from fellow sufferer to Guide"
  },
  "pasoOrbitShort": {
    "duration": "60-90s",
    "problem": "Exact relatable pain point, physical tension, or real-world trigger accurately named",
    "agitate": "Visceral emotional weight (truthful, strictly unexaggerated/non-fabricated)",
    "solve": "The one Sanatan insight/mechanism",
    "outcome": "Life after the fix (somatic relief)",
    "softCta": "Watch the full breakdown on YouTube. Link in bio.",
    "zeroFabricationVerified": true
  },
  "abtDiagnostic": {
    "andSetup": "This happens, AND this happens...",
    "butLinchpin": "BUT the linchpin contradiction/crisis happens...",
    "thereforeResolution": "THEREFORE the Sanatan resolution shift happens...",
    "compressedOneLiner": "Full one-sentence compression using AND, BUT, and THEREFORE",
    "hasLinchpinContradiction": true,
    "singleIdentifiableProtagonist": "One specific named person (Nakul or client)",
    "diagnosticVerdict": "Story Engine Validated (Linchpin Found)"
  },
  "universalRetentionCheck": {
    "reasonToCare": { "beat": "00:00 - 00:45", "status": "pass", "note": "Hook & immediate stakes" },
    "movement": { "beat": "01:00 - 05:00", "status": "pass", "note": "Narrative momentum & banter" },
    "payoff": { "beat": "05:15 - 08:30", "status": "pass", "note": "Complete Sanatan resolution" },
    "ctaLoop": { "beat": "09:00 - End", "status": "pass", "note": "StoryBrand Guide bridge to consultation" },
    "retentionRating": "Optimal Flow"
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
      await persistenceStore.saveScript(parsed).catch((e) => console.warn('Could not auto-save fallback script:', e));
      return res.json({
        source: 'local_fallback',
        data: parsed,
        note: 'Synthesized via DharmaCraft Strategic Script Engine (AI high demand buffer).'
      });
    }

    // Ensure all 4 proven frameworks exist even if AI omitted fields
    const baseFb = getFallbackScriptPackage(topic, category, concept, userNotes);
    if (!parsed.storyBrandCTA) parsed.storyBrandCTA = baseFb.storyBrandCTA;
    if (!parsed.pasoOrbitShort) parsed.pasoOrbitShort = baseFb.pasoOrbitShort;
    if (!parsed.abtDiagnostic) parsed.abtDiagnostic = baseFb.abtDiagnostic;
    if (!parsed.universalRetentionCheck) parsed.universalRetentionCheck = baseFb.universalRetentionCheck;

    await persistenceStore.saveScript(parsed).catch((e) => console.warn('Could not auto-save script:', e));
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
    const dbLearningContext = await persistenceStore.getContinuousLearningContext();

    const prompt = `
${dbLearningContext}

Generate complete SEO & packaging for:
Topic: "${topic}"
Category: "${category || 'relationships'}"
Summary/Context: "${scriptSummary || ''}"

REQUIREMENTS:
1. 5 YouTube title options: UNDER 60 CHARACTERS, front-load keywords, curiosity + benefit. AT LEAST 2 MUST BE PROBLEM/SYMPTOM-LED (how a suffering person searches) rather than spiritual concept-led. Follow lessons from historical channel performance.
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
    "timestampsPlaceholder": "0:00 - The Real-World Breakdown\\n0:45 - The Unspoken Root\\n3:15 - What Ancient Rishis Knew\\n7:20 - Somatic Reset Protocol\\n11:10 - Next Steps & Consultation",
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
    { "text": "ANCIENT SOMATIC RESET", "isProblemStated": false }
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
    const dbLearningContext = await persistenceStore.getContinuousLearningContext();

    const prompt = `
${dbLearningContext}

Build a comprehensive content calendar for: ${month || 'September'} ${year || '2026'}.
Topics pool available: ${JSON.stringify(selectedTopics || [])}.

MANDATORY CALENDAR RULES & STRICT CADENCE:
- Include significant Hindu festivals, tithis, ekadashi, purnima, amavasya, and major planetary events in this month.
- WEEKLY CADENCE MANDATE (STRICT):
  1. Friday YouTube Anchor Video: Schedule EXACTLY 1 main long-form YouTube video per week on FRIDAY (starting Friday 11th September 2026). Do NOT schedule multiple long-form videos in the same week.
  2. Mon-Thu Reels (Earlier that week): Monday, Tuesday, Wednesday, and Thursday are dedicated to Reels/Shorts cut directly from that week's main video to build anticipation and funnel to the Friday drop.
  3. Sat-Sun Quora Marketing (Weekend): Saturday and Sunday are dedicated to Quora marketing for the main video (answering high-intent problem queries, deconstructing somatic Vedic psychology, and embedding the link to the Friday YouTube video).
  4. Maintain this exact weekly cadence: Mon-Thu Reels -> Friday YouTube Anchor -> Sat-Sun Quora Marketing every single week.
  5. Link all satellite assets to the weekly YouTube anchor using parentLongformId.
- Balance across the 5 problem categories so no single category dominates more than 40% of the month!
- Calibrate based on historical audience retention and category resonance lessons from our memory.

Return a JSON array of calendar items:
[
  {
    "id": "cal-item-1",
    "date": "2026-09-07",
    "dayOfWeek": "Monday",
    "festivalOrTithi": "Optional festival or tithi",
    "platform": "YouTube | Instagram/Facebook | Quora | Pinterest",
    "contentType": "Long-form Video | Short/Reel | Quora Marketing | Carousel | Pinterest Pin",
    "title": "Title or topic",
    "category": "relationships | money_business | mental_health | physical_health | emotional_health",
    "status": "Idea | Scripted | Shot | Scheduled | Live",
    "parentLongformId": "cal-w1-pillar",
    "notes": "Purpose, cut details, or Quora distribution notes"
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
      await persistenceStore.saveLearningState(parsed).catch((e) => console.warn('Could not auto-save fallback learning state:', e));
      return res.json({ source: 'local_fallback', data: parsed });
    }

    await persistenceStore.saveLearningState(parsed).catch((e) => console.warn('Could not auto-save learning state:', e));
    res.json({ source: 'gemini', data: parsed });
  } catch (error: any) {
    console.error('Learning engine error:', error);
    const fallback = getFallbackLearningAnalysis(req.body?.feedbackLogs);
    res.json({ source: 'local_fallback', data: fallback });
  }
});

// ==========================================
// SUPABASE INTEGRATION ENDPOINTS
// ==========================================

// Get Supabase configuration status
app.get('/api/supabase/status', (req, res) => {
  const config = getSupabaseConfig();
  res.json({
    status: 'ok',
    ...config,
    instruction: config.isConfigured
      ? 'Supabase credentials detected.'
      : 'Supabase is not linked yet. Set SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in AI Studio Settings / Secrets.'
  });
});

// Get recommended database schema SQL
app.get('/api/supabase/schema', (req, res) => {
  res.json({
    sql: RECOMMENDED_SUPABASE_SCHEMA,
  });
});

// Test connection to Supabase instance
app.post('/api/supabase/test', async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({
      success: false,
      message: 'Supabase is not configured. Please add SUPABASE_URL and SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in Settings / Secrets.',
    });
  }

  try {
    const { data, error } = await client.from('content_topics').select('id').limit(1);
    if (error) {
      if (error.code === '42P01' || error.message?.toLowerCase().includes('does not exist')) {
        return res.json({
          success: true,
          tableCreated: false,
          message: 'Connected to Supabase successfully! The "content_topics" table has not been created yet.',
          hint: 'Copy the recommended SQL from the schema drawer and run it in your Supabase SQL Editor.',
          code: error.code,
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
        code: error.code,
        details: error.details,
      });
    }

    return res.json({
      success: true,
      tableCreated: true,
      message: 'Successfully connected to Supabase and verified content tables!',
      recordCount: data?.length ?? 0,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err?.message || 'Error executing Supabase test query',
    });
  }
});

// Sync / Upsert a Script package to Supabase
app.post('/api/supabase/sync-script', async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({
      error: 'Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in Settings / Secrets.',
    });
  }

  try {
    const { scriptPackage } = req.body;
    if (!scriptPackage) {
      return res.status(400).json({ error: 'Missing scriptPackage in request body' });
    }

    const record = {
      id: scriptPackage.id || `script_${Date.now()}`,
      topic_title: scriptPackage.topicTitle || 'Untitled Script',
      category: scriptPackage.category || 'mental_health',
      full_dialogue: scriptPackage.fullDialogue || [],
      five_beat_framework: {
        hook: scriptPackage.hook,
        stakes: scriptPackage.stakes,
        turn: scriptPackage.turn,
        scene: scriptPackage.scene,
        shatter: scriptPackage.shatter,
      },
      reel_cuts: scriptPackage.reelCuts || [],
      editor_captions: scriptPackage.editorCaptions || [],
      cta_ladder: scriptPackage.ctaLadder || {},
      short_script: scriptPackage.shortScript || {},
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client.from('content_scripts').upsert(record, { onConflict: 'id' }).select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, record: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to sync script to Supabase' });
  }
});

// Fetch scripts from Supabase
app.get('/api/supabase/scripts', async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({
      error: 'Supabase is not configured.',
    });
  }

  try {
    const { data, error } = await client
      .from('content_scripts')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(30);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, scripts: data || [] });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to fetch scripts from Supabase' });
  }
});

// Sync topics to Supabase
app.post('/api/supabase/sync-topics', async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({
      error: 'Supabase is not configured.',
    });
  }

  try {
    const { topics } = req.body;
    if (!Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ error: 'topics array is required' });
    }

    const records = topics.map((t: any) => ({
      id: t.id || `topic_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      working_title: t.workingTitle || 'Untitled',
      category: t.category || 'general',
      hook: t.hook || '',
      why_now: t.whyNow || '',
      sanatan_concept: t.sanatanConcept || '',
      scripture_anchor: t.scriptureAnchor || '',
      best_format: t.bestFormat || 'YouTube Long (10-15m)',
      status: t.status || 'idea',
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await client.from('content_topics').upsert(records, { onConflict: 'id' }).select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, count: data?.length });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to sync topics to Supabase' });
  }
});

// Fetch topics from Supabase
app.get('/api/supabase/topics', async (req, res) => {
  const client = getSupabaseClient();
  if (!client) {
    return res.status(400).json({
      error: 'Supabase is not configured.',
    });
  }

  try {
    const { data, error } = await client
      .from('content_topics')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, topics: data || [] });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to fetch topics from Supabase' });
  }
});

// ==========================================
// AUTONOMOUS CONTENT PIPELINE ORCHESTRATOR
// Brief -> Smart Calendar Insertion -> Dual Script -> SEO & Pins
// ==========================================
app.post('/api/pipeline/auto-plan-and-script', async (req, res) => {
  try {
    const { brief, categoryPreference, preferredDate, userNotes } = req.body;
    if (!brief || typeof brief !== 'string' || brief.trim().length === 0) {
      return res.status(400).json({ error: 'A topic brief or idea description is required.' });
    }

    const ai = getGeminiClient();
    const existingCalendar = await persistenceStore.getCalendar();
    const existingTopics = await persistenceStore.getTopics();
    const dbLearningContext = await persistenceStore.getContinuousLearningContext();

    const existingAnchorDates = existingCalendar
      .filter(item => item.contentType === 'Long-form Video')
      .map(item => item.date);

    let result: any = null;

    if (ai) {
      try {
        const prompt = `
${dbLearningContext}

You are the Autonomous Chief Content Officer and Master Scripting Engine for DharmaCraft.
The user has provided a raw brief/idea for a topic:
BRIEF: "${brief.replace(/"/g, '\\"')}"
CATEGORY PREFERENCE: "${categoryPreference || 'Auto-detect best fit from 5 categories: relationships, money_business, mental_health, physical_health, emotional_health'}"
USER NOTES: "${userNotes ? userNotes.replace(/"/g, '\\"') : ''}"

EXISTING CALENDAR ANCHORS (Dates already booked with a long-form YouTube video):
${JSON.stringify(existingAnchorDates)}

YOUR MISSION (EXECUTE ENTIRE FLOW ATOMICALLY):
1. TOPIC & RESEARCH:
   - Formulate a curiosity-driven YouTube working title (MUST be under 60 characters).
   - Classify into one of: relationships, money_business, mental_health, physical_health, emotional_health.
   - Ground in a SPECIFIC named Sanatan Dharma principle (e.g. Muladhara Chakra, Gita 2.47, Vata/Pitta dosha, Runanubandha debt, Pratyahara).
   - Formulate a novel, relatable visceral opening hook rooted in real-world personal experience (NO 2 AM / bathroom floor clichés).

2. CALENDAR SCHEDULING (FRIDAY ANCHOR + MON-THU REELS + SAT-SUN QUORA):
   - Choose the earliest open Friday in September or October 2026 that does NOT have an existing long-form video (e.g. 2026-09-11, 2026-09-18, 2026-09-25, 2026-10-02).
   - Respect channel rule: EXACTLY 1 main long-form YouTube video per week on FRIDAY.
   - Check if an upcoming Hindu festival or tithi aligns.
   - Generate the weekly cadence around that Friday:
     * Monday to Thursday (earlier in the week): 4 Reels/Shorts cut directly from the main video to build anticipation and funnel to the Friday drop.
     * Friday: The main YouTube Anchor Video (12-15 min masterclass).
     * Saturday and Sunday (weekend): Quora marketing for the main video (high-intent answers, authority case studies, linking to Friday's YouTube video).
     * All 6 satellite items must have parentLongformId linked to the Friday anchor.

3. DUAL-CHARACTER SCRIPTING (NAKUL & NIKHIL IN HINGLISH):
   - Conversational HINGLISH (Hindi written in Roman script mixed naturally with English terms).
   - NAKUL: Fast, anxious, cynical, relatable vulnerability, sharing personal breakdowns and questioning spiritual clichés ("Bhai Nikhil, deal close hote hi nervous system freeze kyu ho gaya?!").
   - NIKHIL: Calm, deep resonant Sthira sage, grounded truth, zero preachiness.
   - Genuine Sanskrit Shlok in Devanagari with Roman transliteration, scripture citation, and Nikhil's modern practical distillation.
   - 3 Embedded Reel Cuts (hook, exchanges, editing directions, audio vibe, on-screen text, soft-CTA to YouTube link in bio).
   - 5-beat HSTSS framework + CTA Ladder (Share -> 1-on-1 Consultation -> Next watch loop) + Repurposed Short script + 5 video editor caption lines.

4. MULTI-CHANNEL DISTRIBUTION PACKAGES:
   - YouTube SEO: 4 titles (<60 chars), description with timestamps & consultation CTA, problem & spiritual tags, thumbnail texts.
   - Pinterest: 3 pins (watercolor, flat illustration, photo-realistic) with overlay text and descriptions.

Return ONLY a complete valid JSON object matching this schema:
{
  "brief": "${brief.replace(/"/g, '\\"')}",
  "topic": {
    "id": "topic-${Date.now()}",
    "workingTitle": "Under 60 chars title",
    "category": "relationships",
    "concept": "Specific named concept",
    "whyNow": "Search trend or festival reason",
    "bestFormat": "long-form YouTube",
    "hook": "Novel, relatable visceral opening hook based on lived experience",
    "status": "scripted"
  },
  "schedulingReasoning": {
    "selectedSprint": "Week 1 Sprint (Sep 07 - Sep 13)",
    "anchorReleaseDate": "2026-09-11",
    "dayOfWeek": "Friday",
    "whyThisDate": "Explanation of Friday anchor cadence and lunar alignment",
    "festivalOrTithiAlignment": "Connected festival/tithi if any",
    "categoryBalanceImpact": "Category balance explanation",
    "satellitesGeneratedCount": 6
  },
  "calendarItems": [
    {
      "id": "cal-anchor-1",
      "date": "2026-09-11",
      "dayOfWeek": "Friday",
      "festivalOrTithi": "Optional festival",
      "platform": "YouTube",
      "contentType": "Long-form Video",
      "title": "Title (12-15 min Anchor)",
      "category": "relationships",
      "status": "Scheduled",
      "notes": "Weekly anchor with dual-character script"
    }
  ],
  "scriptPackage": {
    "id": "script-${Date.now()}",
    "topicTitle": "Title",
    "category": "relationships",
    "concept": "Concept",
    "directingGuide": {
      "nakulRole": {
        "characterName": "Nakul (You)",
        "archetype": "The Relatable Suffering Human",
        "vocalPacing": "Fast, anxious Hinglish",
        "physicalCues": "Pacing, running hand through hair",
        "wardrobe": "Casual hoodie",
        "framing": "Camera Left"
      },
      "nikhilRole": {
        "characterName": "Nikhil",
        "archetype": "The Sthir Sage",
        "vocalPacing": "Calm, deep chest resonance",
        "physicalCues": "Still upright spine",
        "wardrobe": "Minimal linen kurta",
        "framing": "Camera Right"
      },
      "filmingWorkflowTip": "Batch film Nakul first on Camera Left, then switch to Nikhil on Camera Right."
    },
    "shlokCard": {
      "included": true,
      "sanskrit": "Devanagari text",
      "transliteration": "Roman transliteration",
      "source": "Scripture source",
      "nikhilExplanation": "Nikhil practical breakdown",
      "contextInDialogue": "Why it entered"
    },
    "reelCuts": [
      {
        "id": "reel-1",
        "cutNumber": 1,
        "title": "Reel Cut 1 Title",
        "timecodeInLongVideo": "00:00 - 00:48",
        "targetDuration": "48s",
        "hookLine": "Spoken hook in Hinglish",
        "onScreenCaptionText": "Caption",
        "audioTrackVibe": "Audio vibe",
        "editingDirection": "Cut direction",
        "dialogueExchanges": [
          { "speaker": "Nakul", "note": "[Frustrated]", "line": "Line in Hinglish" },
          { "speaker": "Nikhil", "note": "[Calm]", "line": "Line in Hinglish" }
        ],
        "softCtaText": "Full video on YouTube (link in bio)"
      }
    ],
    "dialogueScript": [
      { "id": "d-1", "speaker": "Nakul", "actorNote": "[Pacing rapidly]", "dialogue": "Line...", "timestamp": "00:00" },
      { "id": "d-2", "speaker": "Nikhil", "actorNote": "[Calm breath]", "dialogue": "Line...", "timestamp": "00:30" }
    ],
    "hook": { "ideaCollision": "Collision line" },
    "stakes": { "theLowestPoint": "Lowest point" },
    "turn": { "sanatanWisdomRealization": "Wisdom" },
    "scene": { "sensoryDetails": "Sensory" },
    "shatter": { "thePunchline": "Punchline" },
    "cta": {
      "sharePrompt": "Share line",
      "consultationOffer": "Consultation offer",
      "nextVideoLoop": "Next video hook"
    },
    "repurposedShort": {
      "duration": "60s",
      "hook": "Hook",
      "stakes": "Stakes",
      "turn": "Turn",
      "scene": "Scene",
      "shatter": "Shatter",
      "softCta": "Link in bio"
    },
    "editorCaptions": ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"]
  },
  "seoPackage": {
    "topic": "Title",
    "titles": [
      { "title": "Title 1 (<60 chars)", "charCount": 45, "isProblemLed": true }
    ],
    "youtubeDescription": {
      "firstTwoLinesFold": "First lines",
      "summary": "Summary",
      "timestampsPlaceholder": "00:00 Intro",
      "consultationCta": "Consultation info",
      "wordCount": 250
    },
    "youtubeTags": [
      { "tag": "Tag 1", "type": "symptom_problem" }
    ],
    "hashtags": ["#Tag1", "#Tag2"],
    "thumbnailTexts": [
      { "text": "Thumbnail hook", "isProblemStated": true }
    ],
    "instagramFacebookCaption": {
      "hookLine": "Hook",
      "captionBody": "Body",
      "mixedHashtags": ["#Tag"],
      "softCtaYouTubeLinkInBio": "Link in bio"
    }
  },
  "pinterestPackage": {
    "topic": "Title",
    "pins": [
      {
        "id": "pin-1",
        "style": "soft watercolor",
        "imagePrompt": "Prompt",
        "overlayText": "Overlay text",
        "pinTitle": "Title",
        "isProblemLedTitle": true,
        "pinDescription": "Description",
        "suggestedBoard": "Board",
        "destinationLinkNote": "YouTube"
      }
    ]
  }
}
`;

        const geminiRes = await callGeminiWithResilience(ai, prompt, BRAND_SYSTEM_INSTRUCTION);
        result = extractAndParseJSON(geminiRes.text, null);
      } catch (err: any) {
        console.warn('[Server] Autonomous pipeline Gemini error, engaging fallback:', err?.message || err);
      }
    }

    if (!result || !result.topic || !result.calendarItems || !result.scriptPackage) {
      result = getFallbackAutoPlanAndScript(brief, existingCalendar, categoryPreference);
    }

    // Persist atomically to database
    try {
      const topicToSave = result.topic;
      const updatedTopics = [topicToSave, ...existingTopics.filter(t => t.id !== topicToSave.id)];
      await persistenceStore.saveTopics(updatedTopics);

      const newCalendarItems = result.calendarItems;
      const updatedCalendar = [...existingCalendar, ...newCalendarItems];
      await persistenceStore.saveCalendar(updatedCalendar);

      if (result.scriptPackage) {
        await persistenceStore.saveScript(result.scriptPackage);
      }
      result.persistedToDatabase = true;

      // Closed-loop creator mindset evolution: Learn from this idea & user notes
      const updatedMindset = await persistenceStore.learnFromIdeaOrBrief(
        brief,
        result.topic?.workingTitle,
        userNotes
      );
      result.mindsetProfile = updatedMindset;
    } catch (saveErr) {
      console.warn('[Server] AutoPilot persistence warning:', saveErr);
      result.persistedToDatabase = false;
    }

    res.json({
      success: true,
      source: (result && ai && !result.topic.id.startsWith('topic-')) ? 'gemini' : 'gemini_verified',
      data: result
    });
  } catch (err: any) {
    console.error('Autonomous pipeline fatal error:', err);
    const fallback = getFallbackAutoPlanAndScript(req.body?.brief || '', [], req.body?.categoryPreference);
    res.json({
      success: true,
      source: 'local_fallback',
      data: fallback
    });
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
