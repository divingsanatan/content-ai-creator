import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Copy, 
  ExternalLink,
  Layers,
  HeartHandshake
} from 'lucide-react';

export const StrategyHubView: React.FC = () => {
  const [testContent, setTestContent] = useState('');
  const [testResult, setTestResult] = useState<{
    score: number;
    hasProblemPhrasing: boolean;
    hasSpiritualTerm: boolean;
    hasMedicalRedFlag: boolean;
    hasFearMongeringFlag: boolean;
    hasPrematureConsultCta: boolean;
    feedback: string[];
  } | null>(null);

  const handleTestContent = () => {
    const text = testContent.toLowerCase();
    const problemTerms = ['anxiety', 'stress', 'fear', 'breakup', 'money', 'burnout', 'exhausted', 'freeze', 'guilt', 'stuck', 'pain', 'toxic', 'insomnia', 'throat'];
    const spiritualTerms = ['chakra', 'karma', 'dharma', 'gita', 'vedic', 'prana', 'shakti', 'shani', 'rahu', 'astrology', 'tithi', 'ekadashi', 'mudra', 'ritual', 'surrender'];
    const medicalFlags = ['cure cancer', 'cure depression', 'cure disease', 'replace doctor', 'guaranteed cure', 'stop your medication'];
    const fearFlags = ['you are cursed', 'evil eye will ruin you', 'sinful', 'hell', 'catastrophic destruction', 'doomed'];
    const prematureBookingFlags = ['book a consult', 'dm to book', 'link in bio to book call', 'hire me for healing'];

    const hasProblem = problemTerms.some(t => text.includes(t));
    const hasSpiritual = spiritualTerms.some(t => text.includes(t));
    const hasMedical = medicalFlags.some(t => text.includes(t));
    const hasFear = fearFlags.some(t => text.includes(t));
    const hasPremature = prematureBookingFlags.some(t => text.includes(t));

    const feedback: string[] = [];
    let score = 100;

    if (!hasProblem) {
      score -= 25;
      feedback.push('Missing Problem/Symptom Phrasing: Make sure to include how a person suffering feels (e.g. anxiety, burnout, stuck, freeze), not just spiritual terms.');
    } else {
      feedback.push('✓ Contains realistic human problem/symptom phrasing.');
    }

    if (!hasSpiritual) {
      score -= 20;
      feedback.push('Missing Named Sanatan Concept: Anchor this with a specific chakra, planetary transit, Gita teaching, or Vedic ritual.');
    } else {
      feedback.push('✓ Rooted in recognizable Sanatan Dharma philosophy.');
    }

    if (hasMedical) {
      score -= 50;
      feedback.push('CRITICAL: Detected medical/clinical claim! Guidance must be framed as spiritual/emotional support that complements professional medical help.');
    }

    if (hasFear) {
      score -= 50;
      feedback.push('CRITICAL: Detected fear-mongering or guilt-tripping tone! Brand voice must be warm, grounded, and empowering.');
    }

    if (hasPremature) {
      score -= 30;
      feedback.push('WARNING: If this is for Instagram, Facebook, or Pinterest, remember: Content on satellite platforms must NEVER CTA directly to consult booking. Only drive traffic to the YouTube full breakdown.');
    }

    setTestResult({
      score: Math.max(0, score),
      hasProblemPhrasing: hasProblem,
      hasSpiritualTerm: hasSpiritual,
      hasMedicalRedFlag: hasMedical,
      hasFearMongeringFlag: hasFear,
      hasPrematureConsultCta: hasPremature,
      feedback
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
            M1
          </div>
          <div>
            <h1 className="text-xl font-light tracking-tight text-white uppercase">
              Module 1: <span className="text-amber-500 font-normal">Strategy Engine, Brand Voice & Compliance Core</span>
            </h1>
            <p className="text-xs text-slate-500">
              The foundational DNA of all content creation across the platform.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Strategic Framework & CTA Ladder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Voice Card */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">
                The Brand Voice Mandate
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2 p-4 bg-slate-900/50 rounded border border-slate-800 border-l-2 border-l-emerald-500">
                <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> What We Stand For
                </span>
                <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                  <li><strong className="text-slate-200">Warm & Grounded:</strong> Relatable, compassionate, speaking to visceral human pain.</li>
                  <li><strong className="text-slate-200">Rooted in Shastra:</strong> Vedas, Puranas, Jyotish, Chakras, Karma, Dharma.</li>
                  <li><strong className="text-slate-200">Practical Relevance:</strong> Always translated into modern workplace, marriage, and health dilemmas.</li>
                  <li><strong className="text-slate-200">Beginner Accessible:</strong> Deep concepts demystified without esoteric superiority.</li>
                </ul>
              </div>

              <div className="space-y-2 p-4 bg-slate-900/50 rounded border border-slate-800 border-l-2 border-l-red-500">
                <span className="font-semibold text-red-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" /> What We Never Do
                </span>
                <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                  <li><strong className="text-slate-200">No Fear-Mongering:</strong> Never use Rahu, Shani, or curses to scare people.</li>
                  <li><strong className="text-slate-200">No Guilt-Tripping:</strong> Karma is not punitive revenge; it is cosmic education.</li>
                  <li><strong className="text-slate-200">No Miracle Cures:</strong> No "manifest $50,000 in 24 hours" false promises.</li>
                  <li><strong className="text-slate-200">No Medical Claims:</strong> Frame all guidance as complementary spiritual support.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Standard CTA Ladder Protocol */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-500" />
                <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">
                  Standard CTA Ladder (Strict YouTube Sequence)
                </h2>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                Must End Every Long-Form Script
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Use this exact order in every video script. Adapt the phrasing to match the video's theme, but preserve the psychological sequence:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Step 1: Ask the Viewer to Share</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ask them to send this video to one person in their life who is quietly drowning in this specific issue. Generosity fuels social sharing.
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] text-amber-300/90 bg-slate-950 p-2 rounded border border-slate-800/80">
                    "If you have a friend who is lying awake at 2am with this exact knot in their chest, send this to them."
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Step 2: General Consultation Invitation (Tied to This Problem)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Invite them to consult with you for spiritual healing / life coaching. Frame it directly around whatever life problem this video addressed (relationships, finances, mental health, physical health, emotional distress) so it feels tailor-made, while clarifying you support all 5 life areas.
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] text-amber-300/90 bg-slate-950 p-2 rounded border border-slate-800/80">
                    "If you are ready to unpack your personal energetic blueprint and break this pattern once and for all, my 1-on-1 consultation link is below."
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Step 3: Soft-CTA to Linked Next Video (Hook-Loop)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Point to the linked next video that explores an adjacent angle. This creates session-to-session watch loops that YouTube's algorithm rewards heavily.
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] text-emerald-300/90 bg-slate-950 p-2 rounded border border-slate-800/80">
                    "Now that you understand why your root chakra froze, watch this video next to learn the physical evening ritual that resets it tonight."
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Satellite Platform CTA Rule */}
          <div className="bg-[#0E1116] border border-amber-500/40 rounded-lg p-5 shadow-xs space-y-2 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-300">
                The Satellite Funnel Rule (Instagram, Facebook, Pinterest)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-amber-400">CRITICAL LAW:</strong> Content on Instagram, Facebook, and Pinterest <em className="text-slate-200">never</em> calls to action directly to booking a consultation. Its sole job is to drive traffic to the YouTube channel where the anchor breakdown lives.
              Captions and pin descriptions should always say: <code className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded font-mono text-amber-300">"Full breakdown on YouTube — link in bio"</code>.
              The consultation ask lives strictly inside the YouTube video itself!
            </p>
          </div>
        </div>

        {/* Right Col: Interactive Live Rule & Compliance Inspector */}
        <div className="space-y-6">
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">
                Compliance Inspector
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Paste any topic, hook, caption, or script fragment to verify against our Sanatan Strategy guidelines:
            </p>

            <textarea
              id="compliance-test-input"
              rows={4}
              value={testContent}
              onChange={(e) => setTestContent(e.target.value)}
              placeholder="e.g. Why You Freeze When You Get Money: Healing Root Panic with Muladhara stillness..."
              className="w-full text-xs p-3 rounded border border-slate-800 bg-slate-900/80 text-slate-200 focus:outline-hidden focus:border-amber-500 font-sans"
            />

            <button
              id="run-compliance-check"
              onClick={handleTestContent}
              disabled={!testContent.trim()}
              className="w-full py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-40 transition cursor-pointer"
            >
              Run Compliance Inspection
            </button>

            {testResult && (
              <div className="p-3.5 rounded bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Score:</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    testResult.score >= 80 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                    testResult.score >= 50 ? 'bg-amber-950/60 text-amber-400 border border-amber-800' :
                    'bg-red-950/60 text-red-400 border border-red-800'
                  }`}>
                    {testResult.score} / 100
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {testResult.feedback.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2 rounded border ${
                        item.startsWith('✓') ? 'text-emerald-300 bg-emerald-950/30 border-emerald-900/60' :
                        item.startsWith('CRITICAL') ? 'text-red-300 bg-red-950/30 border-red-900/60 font-semibold' :
                        'text-amber-300 bg-amber-950/30 border-amber-900/60'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Checklist Reference */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Pre-Flight Checklist
            </h4>
            <ul className="text-xs space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-bold">01.</span>
                <span>Does the title solve a searchable symptom or pain?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-bold">02.</span>
                <span>Is a named Sanatan concept included (not vague spirituality)?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-bold">03.</span>
                <span>Did you check if an Ekadashi or Purnima falls on the publish date?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-bold">04.</span>
                <span>Are scriptures paraphrased with book/chapter citations?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-500 font-mono font-bold">05.</span>
                <span>Are tags balanced 50/50 between symptom keywords and spiritual terms?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
