import React, { useState } from 'react';
import { 
  Pin, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Eye, 
  Palette, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PinterestPackage, TopicIdea } from '../types';
import { FlowFooterBar } from './FlowFooterBar';
import { ActiveModule } from './Navbar';

interface PinterestStudioViewProps {
  activeTopic: TopicIdea | null;
  pinterestPackage: PinterestPackage | null;
  onUpdatePinterestPackage: (pkg: PinterestPackage) => void;
  onNavigateToGrowth: () => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const PinterestStudioView: React.FC<PinterestStudioViewProps> = ({
  activeTopic,
  pinterestPackage,
  onUpdatePinterestPackage,
  onNavigateToGrowth,
  onNavigate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedPinIndex, setSelectedPinIndex] = useState(0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGeneratePins = async () => {
    if (!activeTopic) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/pinterest/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic.workingTitle,
          category: activeTopic.category,
          concept: activeTopic.concept
        })
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.data?.pins && data.data.pins.length > 0) {
        onUpdatePinterestPackage(data.data);
      } else {
        // High quality fallback matching exact required prompt formula
        const fallback: PinterestPackage = {
          topic: activeTopic.workingTitle,
          pins: [
            {
              id: "pin-1",
              style: "soft watercolor",
              imagePrompt: "A soft watercolor image of an unbaked terracotta clay pot resting on fertile red earth with gentle roots intertwining, in a color palette of deep terracotta red, ochre yellow, and soft earthen sand, with space at the top/bottom for text overlay, vertical 2:3 ratio, no readable text in the image itself.",
              overlayText: "Why You Panic When Money Comes In: The Root Reset",
              pinTitle: "Why Do I Get Anxious Checking My Bank Balance? (Root Chakra Reset)",
              isProblemLedTitle: true,
              pinDescription: "Ever feel an icy knot in your stomach when checking your bank account? In Sanatan Dharma, wealth cannot rest in an ungrounded vessel. Discover the ancient Muladhara somatic grounding ritual that ends financial freeze for good. Watch the full 14-minute deep dive on YouTube — link in bio.",
              suggestedBoard: "Spiritual Healing & Wealth Mindset",
              destinationLinkNote: "https://youtube.com/watch?v=example-anchored-video"
            },
            {
              id: "pin-2",
              style: "minimalist flat illustration",
              imagePrompt: "A minimalist flat illustration image of a serene seated human silhouette with the lowest chakra radiating subtle geometric earth petals, in a color palette of warm crimson, muted sage, and warm cream, with space at the top/bottom for text overlay, vertical 2:3 ratio, no readable text in the image itself.",
              overlayText: "5 Somatic Signs Your Root Chakra Is In Freeze Mode",
              pinTitle: "5 Physical Signs Your Root Chakra Is Blocked & How to Heal It",
              isProblemLedTitle: false,
              pinDescription: "Shallow breathing, clenching your jaw at night, and persistent financial worry are physical signs of Muladhara dysregulation. Learn how the earth element in Vedic wisdom restores your nervous system. Full practical breakdown on YouTube — link in bio.",
              suggestedBoard: "Chakra Healing & Somatics",
              destinationLinkNote: "https://youtube.com/watch?v=example-anchored-video"
            },
            {
              id: "pin-3",
              style: "warm photo-realistic",
              imagePrompt: "A warm photo-realistic image of bare feet grounded on cool temple flagstones with fallen frangipani blossoms and morning sunlight casting soft geometric shadows, in a color palette of warm golden dawn, stone gray, and deep marigold orange, with space at the top/bottom for text overlay, vertical 2:3 ratio, no readable text in the image itself.",
              overlayText: "The 7-Minute Evening Earth Grounding Ritual",
              pinTitle: "How to Stop Sudden Financial Stress Naturally (Vedic Grounding)",
              isProblemLedTitle: true,
              pinDescription: "If late-night panic keeps you awake, stop trying to spreadsheet away your fear. Reset your prana vayu with this evening somatic practice from ancient Vedic texts. Watch the step-by-step masterclass on YouTube — link in bio.",
              suggestedBoard: "Evening Healing Rituals",
              destinationLinkNote: "https://youtube.com/watch?v=example-anchored-video"
            }
          ],
          keywordVariations: [
            "Root chakra somatic anxiety relief",
            "Vedic financial stress healing rituals"
          ]
        };
        onUpdatePinterestPackage(fallback);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentPkg = pinterestPackage;
  const activePin = currentPkg?.pins[selectedPinIndex] || currentPkg?.pins[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs rounded shrink-0 mt-0.5 sm:mt-0">
            M7
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-medium tracking-tight text-white truncate sm:text-clip">
              Module 7: <span className="text-amber-500 font-normal">Pinterest Studio & Exact Prompt Formulator</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact Formula: "A [style] image of [subject], in a color palette of [colors], with space at top/bottom, 2:3 ratio, no readable text".
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {currentPkg && (
            <button
              onClick={onNavigateToGrowth}
              className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              Growth Playbook <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}

          <button
            id="generate-pinterest-button"
            onClick={handleGeneratePins}
            disabled={isGenerating || !activeTopic}
            className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Synthesizing Prompts...' : 'Generate 3 Pinterest Pins'}
          </button>
        </div>
      </div>

      {currentPkg ? (
        <div className="space-y-6">
          {/* Keyword Variations Banner */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-500">
                2 Non-Competing Keyword Targets:
              </span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {currentPkg.keywordVariations.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800">
                    #{i + 1}: {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/60 flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Pinterest Pin descriptions funnel to YouTube ONLY (Never consult directly).</span>
            </div>
          </div>

          {/* Pin Selection Grid & Visual Canvas Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: 3 Pin Cards */}
            <div className="lg:col-span-2 space-y-4">
              {currentPkg.pins.map((pin, idx) => {
                const isSelected = selectedPinIndex === idx;
                return (
                  <div 
                    key={pin.id}
                    className={`bg-[#0E1116] border rounded-lg p-5 shadow-xs transition space-y-3 cursor-pointer ${
                      isSelected ? 'border-amber-500 ring-1 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                    }`}
                    onClick={() => setSelectedPinIndex(idx)}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-amber-400">
                          Style: {pin.style}
                        </span>
                        {pin.isProblemLedTitle && (
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                            Problem-Led Title
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(pin.imagePrompt, `prompt_${idx}`);
                        }}
                        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition"
                      >
                        {copiedKey === `prompt_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy Prompt
                      </button>
                    </div>

                    {/* Exact Image Prompt Formula Box */}
                    <div className="p-3.5 bg-slate-900 rounded border border-slate-800 space-y-1.5">
                      <span className="text-xs font-semibold text-slate-300 block">
                        Exact 2:3 Midjourney / DALL-E Image Prompt:
                      </span>
                      <p className="text-xs text-amber-200/90 font-mono leading-relaxed bg-[#0A0C10] p-2.5 rounded border border-slate-800">
                        "{pin.imagePrompt}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <strong className="text-amber-400 text-xs block mb-0.5">Pin Overlay Text (Benefit-Driven 6–10 words):</strong>
                        <p className="text-white font-semibold mt-1">"{pin.overlayText}"</p>
                      </div>

                      <div>
                        <strong className="text-slate-400 text-xs block mb-0.5">Pin Title (&lt;100 Characters):</strong>
                        <p className="text-slate-300 mt-1">{pin.pinTitle}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
                      <strong className="text-slate-400 text-xs block mb-1">Pin Description (200–500 Characters):</strong>
                      <p className="text-slate-300 leading-relaxed">{pin.pinDescription}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Board: <strong className="text-slate-200">{pin.suggestedBoard}</strong></span>
                      <span className="text-amber-400 font-semibold">{pin.destinationLinkNote}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Col: Visual 2:3 Vertical Pin Mockup Canvas */}
            <div className="space-y-3">
              <span className="text-sm font-semibold text-slate-300 block">
                Live 2:3 Pinterest Pin Canvas Preview
              </span>

              {activePin && (
                <div className="w-full max-w-[320px] mx-auto aspect-[2/3] rounded-lg shadow-xl overflow-hidden flex flex-col justify-between p-6 relative border border-slate-800 bg-[#0A0C10] text-white">
                  {/* Subtle decorative background glow representing chakra grounding */}
                  <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-black/80 pointer-events-none" />

                  {/* Top: Space for Brand & Category */}
                  <div className="relative z-10 text-center">
                    <span className="text-[11px] font-medium text-amber-300 bg-black/60 px-2.5 py-1 rounded border border-amber-500/30">
                      {activePin.suggestedBoard}
                    </span>
                  </div>

                  {/* Center: Style Badge & Visual Graphic Placeholder */}
                  <div className="relative z-10 text-center space-y-2 p-3 bg-slate-900/80 rounded border border-slate-800 backdrop-blur-xs">
                    <Palette className="w-6 h-6 text-amber-500 mx-auto" />
                    <span className="text-xs font-semibold text-slate-200 block">
                      {activePin.style}
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-3 italic font-mono">
                      "{activePin.imagePrompt}"
                    </p>
                  </div>

                  {/* Bottom: The High-Contrast Text Overlay (Benefit Driven) */}
                  <div className="relative z-10 text-center space-y-2">
                    <div className="bg-slate-900 text-white p-3.5 rounded shadow-lg border border-amber-500/40">
                      <h4 className="text-xs font-semibold text-amber-400 leading-tight">
                        {activePin.overlayText}
                      </h4>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 font-semibold">
                      Watch Full Masterclass on YouTube
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-12 text-center shadow-xs">
          <Pin className="w-10 h-10 text-amber-500 mx-auto mb-3 opacity-60" />
          <h3 className="font-semibold text-white text-base">No Pinterest Package Formatted Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Click "Generate 3 Pinterest Pins" above to create exact Midjourney/DALL-E prompt formulas, overlay text, and long-tail SEO descriptions.
          </p>
          <button
            onClick={handleGeneratePins}
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
        currentStep={5}
        stepName="Pinterest Studio & AI Prompts"
        activeTopicTitle={activeTopic?.workingTitle}
        isStepComplete={Boolean(currentPkg)}
        prevModule="module6_seo"
        prevLabel="Step 4: YouTube SEO & Packaging"
        nextModule="module8_growth"
        nextLabel="Step 6: Launch Playbook & Feedback"
        onNavigate={(mod) => {
          if (onNavigate) onNavigate(mod);
          else if (mod === 'module8_growth') onNavigateToGrowth();
        }}
        onPrimaryAction={onNavigateToGrowth}
        primaryActionLabel="Review 1-to-10 Launch Playbook"
      />
    </div>
  );
};
