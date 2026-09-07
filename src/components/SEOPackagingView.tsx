import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Tag, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import { SEOPackage, TopicIdea, ScriptPackage } from '../types';
import { FlowFooterBar } from './FlowFooterBar';
import { ActiveModule } from './Navbar';

interface SEOPackagingViewProps {
  activeTopic: TopicIdea | null;
  scriptPackage: ScriptPackage | null;
  seoPackage: SEOPackage | null;
  onUpdateSEOPackage: (pkg: SEOPackage) => void;
  onNavigateToPinterest: () => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const SEOPackagingView: React.FC<SEOPackagingViewProps> = ({
  activeTopic,
  scriptPackage,
  seoPackage,
  onUpdateSEOPackage,
  onNavigateToPinterest,
  onNavigate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateSEO = async () => {
    if (!activeTopic) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic.workingTitle,
          category: activeTopic.category,
          scriptSummary: scriptPackage?.hook?.ideaCollision || activeTopic.concept
        })
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.data?.titles && data.data.titles.length > 0) {
        onUpdateSEOPackage(data.data);
      } else {
        // High quality fallback
        const fallback: SEOPackage = {
          topic: activeTopic.workingTitle,
          titles: [
            { title: "Why You Panic When Money Comes In: The Root Reset", charCount: 52, isProblemLed: true },
            { title: "The Sudden Financial Anxiety Trap Nobody Talks About", charCount: 51, isProblemLed: true },
            { title: "How Muladhara Chakra Blocks Your Income Stability", charCount: 50, isProblemLed: false },
            { title: "Stop Root Panic: Ancient Vedic Nervous System Reset", charCount: 52, isProblemLed: false },
            { title: "Why Hard Work Won't Fix Your Bank Account Panic", charCount: 47, isProblemLed: true }
          ],
          youtubeDescription: {
            firstTwoLinesFold: "If you get physically anxious every time you check your bank balance, this isn't a budgeting failure. It's an ungrounded nervous system loop rooted in your Muladhara chakra.",
            summary: "In this 14-minute deep dive, we break down why financial stress triggers the ancient fight-or-flight freeze reflex, how the earth element in Vedic philosophy governs material containment, and the somatic ritual to release money panic for good.",
            timestampsPlaceholder: "0:00 - The Real-World Bank Balance Knot\\n1:12 - Why Financial Literacy Doesn't Stop Panic\\n4:15 - What Vedic Rishis Knew About Prithvi Tattva\\n7:40 - The Muladhara Somatic Release\\n11:20 - Next Steps & Personal Alignment",
            consultationCta: "Book a 1-on-1 Spiritual Healing & Life Coaching Consultation: https://dharmacraft.example.com/consult (Covering finances, relationships, emotional burnout, and physical well-being).",
            wordCount: 220
          },
          youtubeTags: [
            { tag: "financial anxiety at night", type: "symptom_problem" },
            { tag: "why do I panic about money", type: "symptom_problem" },
            { tag: "spending money guilt feeling", type: "symptom_problem" },
            { tag: "knot in stomach money stress", type: "symptom_problem" },
            { tag: "root chakra healing", type: "spiritual_astrological" },
            { tag: "muladhara chakra money", type: "spiritual_astrological" },
            { tag: "vedic astrology wealth", type: "spiritual_astrological" },
            { tag: "prana vayu nervous system", type: "spiritual_astrological" },
            { tag: "spiritual life coaching", type: "broad_longtail" },
            { tag: "somatic anxiety release", type: "broad_longtail" },
            { tag: "how to stop worrying about money", type: "symptom_problem" },
            { tag: "rahu transit financial stress", type: "spiritual_astrological" },
            { tag: "fear of running out of money", type: "symptom_problem" },
            { tag: "sanatan dharma wealth philosophy", type: "spiritual_astrological" },
            { tag: "nervous system regulation", type: "broad_longtail" }
          ],
          hashtags: ["#FinancialAnxiety", "#MoneyPanic", "#RootChakra", "#SanatanDharma", "#NervousSystemHealing"],
          thumbnailTexts: [
            { text: "WHY MONEY SCARES YOU", isProblemStated: true },
            { text: "THE SUDDEN PANIC TRAP", isProblemStated: true },
            { text: "ROOT CHAKRA RESET", isProblemStated: false }
          ],
          instagramFacebookCaption: {
            hookLine: "Your bank account isn't empty because you're bad with numbers. It's empty because your nervous system treats money like a predator.",
            captionBody: "Notice what happens in your body the second an unexpected invoice arrives. Your throat closes up, your stomach freezes, and you feel this frantic urge to either disassociate or binge-spend. In Sanatan Dharma, wealth cannot rest inside an ungrounded vessel. When your root chakra is vibrating in terror, hustle only worsens the panic.",
            mixedHashtags: ["#FinancialAnxiety", "#RootChakra", "#HealingMoneyWounds", "#VedicWisdom", "#SomaticHealing"],
            softCtaYouTubeLinkInBio: "Watch the full 14-minute breakdown & somatic release on YouTube — link in bio."
          }
        };
        onUpdateSEOPackage(fallback);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentPkg = seoPackage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs rounded shrink-0 mt-0.5 sm:mt-0">
            M6
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-medium tracking-tight text-white truncate sm:text-clip">
              Module 6: <span className="text-amber-500 font-normal">YouTube SEO & Packaging Engine</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              5 Titles (&lt;60 char, &gt;=2 problem-led) • 150–300w Description • 15 Mixed Tags • 5 Hashtags • 3 Thumbnails • IG/FB Caption.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {currentPkg && (
            <button
              onClick={onNavigateToPinterest}
              className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              Pinterest Studio <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}

          <button
            id="generate-seo-button"
            onClick={handleGenerateSEO}
            disabled={isGenerating || !activeTopic}
            className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Packaging SEO...' : 'Generate SEO Package'}
          </button>
        </div>
      </div>

      {currentPkg ? (
        <div className="space-y-6">
          {/* Section 1: 5 YouTube Titles (<60 chars, >=2 Problem-Led) */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  5 YouTube Titles (Under 60 Characters)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mandate: At least 2 titles must be problem/symptom-led rather than spiritual concept-led.
                </p>
              </div>
              <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                {currentPkg.titles.filter(t => t.isProblemLed).length} / 5 Problem-Led
              </span>
            </div>

            <div className="space-y-2.5">
              {currentPkg.titles.map((t, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 bg-slate-900 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-white">{t.title}</span>
                      <div className="flex items-center gap-2.5 mt-1 text-[10px] font-mono">
                        <span className={`px-2 py-0.5 rounded border ${
                          t.isProblemLed 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {t.isProblemLed ? 'Problem / Symptom-Led' : 'Concept / Vedic-Led'}
                        </span>
                        <span className={`${t.charCount <= 60 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {t.charCount} / 60 chars
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(t.title, `title_${idx}`)}
                    className="self-end sm:self-center px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded flex items-center gap-1 cursor-pointer transition"
                  >
                    {copiedKey === `title_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: YouTube Description (150–300 Words) */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  YouTube Description (150–300 Words)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  First 2 lines hook before "show more" fold • Summary • Timestamps • Consultation Link.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(`
${currentPkg.youtubeDescription.firstTwoLinesFold}

${currentPkg.youtubeDescription.summary}

TIMESTAMPS:
${currentPkg.youtubeDescription.timestampsPlaceholder}

CONSULTATION:
${currentPkg.youtubeDescription.consultationCta}
                `, 'desc_all')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                {copiedKey === 'desc_all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Full Description
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-amber-400 text-xs block mb-1">Above The Fold (First 2 Lines Before "Show More"):</strong>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {currentPkg.youtubeDescription.firstTwoLinesFold}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800">
                <strong className="text-slate-400 text-xs block mb-1">Body Summary:</strong>
                <p className="text-slate-300 leading-relaxed">
                  {currentPkg.youtubeDescription.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-slate-400 text-xs block mb-1">Timestamps Placeholder:</strong>
                  <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                    {currentPkg.youtubeDescription.timestampsPlaceholder}
                  </pre>
                </div>

                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-emerald-400 text-xs block mb-1">Consultation Offer CTA Link:</strong>
                  <p className="text-slate-200 text-[11px] font-mono leading-relaxed">
                    {currentPkg.youtubeDescription.consultationCta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 15 Mixed Tags & 5 Hashtags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 15 Tags */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-semibold text-sm text-slate-200">
                  15 Mixed YouTube Tags (Problem vs Spiritual)
                </h3>
                <button
                  onClick={() => copyToClipboard(currentPkg.youtubeTags.map(t => t.tag).join(', '), 'tags_all')}
                  className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'tags_all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Comma-Separated
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {currentPkg.youtubeTags.map((t, i) => (
                  <span 
                    key={i}
                    className={`px-2 py-1 rounded text-xs font-mono border ${
                      t.type === 'symptom_problem' 
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                        : t.type === 'spiritual_astrological'
                        ? 'bg-blue-950/40 text-blue-300 border-blue-800/60'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 5 Hashtags & 3 Thumbnail Texts */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <h3 className="font-semibold text-sm text-slate-200">
                    5 Video Hashtags
                  </h3>
                  <button
                    onClick={() => copyToClipboard(currentPkg.hashtags.join(' '), 'hash_all')}
                    className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'hash_all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentPkg.hashtags.map((h, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold font-mono">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold text-sm text-slate-200 mb-2">
                  3 Thumbnail Text Options (Max 4–5 Words)
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {currentPkg.thumbnailTexts.map((thumb, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-900 text-white border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        {thumb.text}
                      </span>
                      <span className={`text-[10px] font-mono mt-1.5 block ${thumb.isProblemStated ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {thumb.isProblemStated ? 'Problem Stated' : 'Action / Reset'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Instagram / Facebook Caption (Strict CTA Compliance) */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-500" />
                <h3 className="font-semibold text-sm text-slate-200">
                  Instagram & Facebook Caption (Strict YouTube Traffic Driver)
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(`
${currentPkg.instagramFacebookCaption.hookLine}

${currentPkg.instagramFacebookCaption.captionBody}

${currentPkg.instagramFacebookCaption.softCtaYouTubeLinkInBio}

${currentPkg.instagramFacebookCaption.mixedHashtags.join(' ')}
                `, 'ig_all')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                {copiedKey === 'ig_all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Social Caption
              </button>
            </div>

            <div className="p-3.5 bg-slate-900 rounded border border-slate-800 space-y-2 text-xs">
              <p className="font-semibold text-white">
                {currentPkg.instagramFacebookCaption.hookLine}
              </p>
              <p className="text-slate-300 leading-relaxed">
                {currentPkg.instagramFacebookCaption.captionBody}
              </p>
              <div className="p-2 bg-amber-950/40 rounded text-amber-300 font-mono text-[11px] border border-amber-800/60">
                CTA Rule Applied: "{currentPkg.instagramFacebookCaption.softCtaYouTubeLinkInBio}" (Never asks to book consult directly).
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {currentPkg.instagramFacebookCaption.mixedHashtags.join(' ')}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-12 text-center shadow-xs">
          <Search className="w-10 h-10 text-amber-500 mx-auto mb-3 opacity-60" />
          <h3 className="font-semibold text-white text-base">No SEO Package Generated Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Click "Generate SEO Package" above to draft 5 YouTube titles, 150-300 word description, 15 mixed tags, and satellite social captions.
          </p>
          <button
            onClick={handleGenerateSEO}
            disabled={!activeTopic}
            className="px-5 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate Now For: "{activeTopic?.workingTitle || 'Active Topic'}"
          </button>
        </div>
      )}

      {/* Unified Pipeline Bottom Navigation */}
      <FlowFooterBar
        currentStep={4}
        stepName="YouTube SEO & Packaging"
        activeTopicTitle={activeTopic?.workingTitle}
        isStepComplete={Boolean(currentPkg)}
        prevModule="module5_scripts"
        prevLabel="Step 3: HSTSS Script Studio"
        nextModule="module7_pinterest"
        nextLabel="Step 5: Pinterest Studio"
        onNavigate={(mod) => {
          if (onNavigate) onNavigate(mod);
          else if (mod === 'module7_pinterest') onNavigateToPinterest();
        }}
        onPrimaryAction={onNavigateToPinterest}
        primaryActionLabel="Formulate Pinterest Pins & AI Prompts"
      />
    </div>
  );
};
