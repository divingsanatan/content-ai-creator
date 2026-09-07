import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  Lightbulb, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Flame, 
  Eye, 
  Sliders, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CreatorMindsetProfile, CreatorMindsetRule, LifeProblemCategory } from '../types';

interface CreatorMindsetStudioProps {
  mindsetProfile?: CreatorMindsetProfile | null;
  onUpdateMindsetGuidance?: (guidance: string) => Promise<void>;
  onAddMindsetRule?: (ruleData: { category: any; rule: string; sourceIdeaOrBrief?: string }) => Promise<void>;
  onRemoveMindsetRule?: (ruleId: string) => Promise<void>;
  onNavigateToAutoPilot?: () => void;
}

export const CreatorMindsetStudio: React.FC<CreatorMindsetStudioProps> = ({
  mindsetProfile,
  onUpdateMindsetGuidance,
  onAddMindsetRule,
  onRemoveMindsetRule,
  onNavigateToAutoPilot
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [customGuidance, setCustomGuidance] = useState(
    mindsetProfile?.customMindsetGuidance || 
    'I want my content to bridge raw, unfiltered human suffering with ancient Vedic psychology. Never be toxic positive or preachy. Keep it funny, painfully honest, and somatic.'
  );
  const [isSavingGuidance, setIsSavingGuidance] = useState(false);
  const [guidanceSaved, setGuidanceSaved] = useState(false);

  // New Rule Form
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRuleCategory, setNewRuleCategory] = useState<CreatorMindsetRule['category']>('voice_and_tone');
  const [newRuleText, setNewRuleText] = useState('');
  const [newRuleSource, setNewRuleSource] = useState('');
  const [isAddingRule, setIsAddingRule] = useState(false);

  // Test learn simulation
  const [testIdeaInput, setTestIdeaInput] = useState('');
  const [isLearningTest, setIsLearningTest] = useState(false);
  const [testLearnFeedback, setTestLearnFeedback] = useState<string | null>(null);

  const CATEGORY_NAMES: Record<CreatorMindsetRule['category'], { label: string; color: string; desc: string }> = {
    voice_and_tone: { 
      label: 'Voice & Tone', 
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      desc: 'Speech cadence, Hinglish slang, relatable skepticism vs deep composure'
    },
    hook_psychology: { 
      label: 'Hook Psychology', 
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      desc: 'Novel lived experiences, daytime visceral symptom triggers, real-world high-stakes moments'
    },
    spiritual_grounding: { 
      label: 'Spiritual Grounding', 
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      desc: 'Authentic Sanskrit shloks, Upanishadic mirrors, zero toxic positivity'
    },
    format_and_pacing: { 
      label: 'Format & Pacing', 
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      desc: '11-second story anchor, Reel cuts, rapid dialogue exchanges, 3-step CTA ladder'
    },
    creator_obsession: { 
      label: 'Creator Obsessions', 
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      desc: 'Core topics & psychological angles you obsess over (Root chakra, Runanubandha, Vata)'
    }
  };

  const handleSaveGuidance = async () => {
    if (!onUpdateMindsetGuidance) return;
    setIsSavingGuidance(true);
    try {
      await onUpdateMindsetGuidance(customGuidance);
      setGuidanceSaved(true);
      setTimeout(() => setGuidanceSaved(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingGuidance(false);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleText.trim() || !onAddMindsetRule) return;

    setIsAddingRule(true);
    try {
      await onAddMindsetRule({
        category: newRuleCategory,
        rule: newRuleText.trim(),
        sourceIdeaOrBrief: newRuleSource.trim() || 'Manual creator guidance'
      });
      setNewRuleText('');
      setNewRuleSource('');
      setShowAddRule(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAddingRule(false);
    }
  };

  const handleSimulateIdeaLearn = async () => {
    if (!testIdeaInput.trim()) return;
    setIsLearningTest(true);
    setTestLearnFeedback(null);
    try {
      const res = await fetch('/api/mindset/learn-from-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: testIdeaInput.trim(),
          topicTitle: 'Creator Mindset Idea Analysis',
          userNotes: 'Directly analyzing creator angle & mindset'
        })
      });
      const data = await res.json();
      if (data.profile) {
        setTestLearnFeedback(`✨ Successfully ingested! Extracted new creative rules and added to Recurring Themes. AI now recognizes this psychological angle.`);
        setTestIdeaInput('');
      }
    } catch (err: any) {
      setTestLearnFeedback(`Could not analyze idea: ${err?.message}`);
    } finally {
      setIsLearningTest(false);
    }
  };

  const rules = mindsetProfile?.learnedRules || [];
  const filteredRules = activeCategoryFilter === 'all' 
    ? rules 
    : rules.filter(r => r.category === activeCategoryFilter);

  return (
    <div className="space-y-6">
      {/* Engine Status Banner */}
      <div className="bg-[#0E1116] border border-amber-500/30 rounded-lg p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono tracking-wider text-amber-400 uppercase font-semibold">
                Creator Mindset & Content DNA Engine
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Active in Generation Prompts
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Calibration to Your Creative Headspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every time you submit an idea or topic brief, the AI deconstructs your creative choices—your cynical humor, somatic pain points, and Sanskrit grounding—and permanently encodes them into its generation memory.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-mono">Ideas Analyzed</span>
              <span className="text-2xl font-bold text-amber-400">{mindsetProfile?.totalIdeasLearnedFrom || 5}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-mono">Learned Rules</span>
              <span className="text-2xl font-bold text-white">{rules.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Direct Guidance Textarea */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Direct Mindset Guidance (How You Want To Think & Create)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Type your unfiltered creative philosophy. The AI reads this before writing every single line, hook, and dialogue.
            </p>
          </div>
          <button
            onClick={handleSaveGuidance}
            disabled={isSavingGuidance}
            className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer self-start sm:self-auto shrink-0"
          >
            {guidanceSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved & Active!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSavingGuidance ? 'Updating AI...' : 'Save Mindset'}</span>
              </>
            )}
          </button>
        </div>

        <textarea
          value={customGuidance}
          onChange={(e) => setCustomGuidance(e.target.value)}
          rows={3}
          placeholder="e.g. Keep Nakul super sarcastic about spiritual buzzwords. Nikhil should never sound like a motivational speaker; he must speak with quiet, heavy authority..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>💡 Tip: Mention specific phrases you love or ban (e.g., "Never say 'high vibes'", "Always mention the chest or gut").</span>
          <span className="font-mono">{customGuidance.length} characters</span>
        </div>
      </div>

      {/* Interactive Quick Idea Tester */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">Test Teach the AI: Feed Any Raw Idea or Observation</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">On-demand Mindset Extraction</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={testIdeaInput}
            onChange={(e) => setTestIdeaInput(e.target.value)}
            placeholder="e.g. Why founders get panic attacks on Sunday nights even when revenue is breaking records..."
            className="flex-1 bg-[#0E1116] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSimulateIdeaLearn();
            }}
          />
          <button
            onClick={handleSimulateIdeaLearn}
            disabled={isLearningTest || !testIdeaInput.trim()}
            className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>{isLearningTest ? 'Ingesting...' : 'Ingest Idea Angle'}</span>
          </button>
        </div>
        {testLearnFeedback && (
          <p className="text-xs text-amber-300 font-mono bg-amber-500/10 border border-amber-500/20 p-2 rounded">
            {testLearnFeedback}
          </p>
        )}
      </div>

      {/* Dual Personas Directing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nakul's Learned Mindset */}
        <div className="p-4 rounded-lg bg-[#0E1116] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Nakul (Camera Left • The Suffering Human)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              Skeptical & Breathless
            </span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            {mindsetProfile?.nakulDirectingNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nikhil's Learned Mindset */}
        <div className="p-4 rounded-lg bg-[#0E1116] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Nikhil (Camera Right • Grounded Vedic Mirror)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Sthira (Unshakeable)
            </span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            {mindsetProfile?.nikhilDirectingNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learned Rules DNA Repository */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Learned Creative Rules & DNA ({filteredRules.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Extracted automatically from your submitted ideas and manual instructions.
            </p>
          </div>

          <button
            onClick={() => setShowAddRule(prev => !prev)}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>{showAddRule ? 'Close Form' : 'Add Creative Rule'}</span>
          </button>
        </div>

        {/* Add Rule Form */}
        {showAddRule && (
          <form onSubmit={handleCreateRule} className="p-4 rounded-lg bg-slate-900 border border-amber-500/30 space-y-3 animate-in fade-in duration-150">
            <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Creator Rule</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Category</label>
                <select
                  value={newRuleCategory}
                  onChange={(e) => setNewRuleCategory(e.target.value as any)}
                  className="w-full bg-[#0E1116] border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="voice_and_tone">Voice & Tone</option>
                  <option value="hook_psychology">Hook Psychology</option>
                  <option value="spiritual_grounding">Spiritual Grounding</option>
                  <option value="format_and_pacing">Format & Pacing</option>
                  <option value="creator_obsession">Creator Obsession</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Source (Optional)</label>
                <input
                  type="text"
                  value={newRuleSource}
                  onChange={(e) => setNewRuleSource(e.target.value)}
                  placeholder="e.g. Money Freeze brief, client consult note"
                  className="w-full bg-[#0E1116] border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Rule Directive</label>
              <textarea
                value={newRuleText}
                onChange={(e) => setNewRuleText(e.target.value)}
                rows={2}
                placeholder="e.g. Always state the physical stomach sensation before introducing the root chakra."
                className="w-full bg-[#0E1116] border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddRule(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAddingRule || !newRuleText.trim()}
                className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingRule ? 'Adding...' : 'Save Rule'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
              activeCategoryFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Categories ({rules.length})
          </button>
          {Object.entries(CATEGORY_NAMES).map(([cat, config]) => {
            const count = rules.filter(r => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  activeCategoryFilter === cat
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{config.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Rules List */}
        <div className="space-y-3">
          {filteredRules.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-lg border border-slate-800/80">
              No rules found in this category. Submit ideas in Auto-Pilot to let the AI learn automatically!
            </div>
          ) : (
            filteredRules.map((rule) => {
              const meta = CATEGORY_NAMES[rule.category] || CATEGORY_NAMES.voice_and_tone;
              return (
                <div
                  key={rule.id}
                  className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${meta.color}`}>
                        {meta.label}
                      </span>
                      {rule.sourceIdeaOrBrief && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Source: <span className="text-slate-300">"{rule.sourceIdeaOrBrief}"</span>
                        </span>
                      )}
                      <span className="text-[10px] text-slate-600 font-mono">
                        Learned {rule.learnedAt}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {rule.rule}
                    </p>
                  </div>

                  {onRemoveMindsetRule && (
                    <button
                      onClick={() => onRemoveMindsetRule(rule.id)}
                      title="Delete rule"
                      className="p-1.5 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition cursor-pointer self-end sm:self-center opacity-70 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Recurring Creative Themes Extracted */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-white">
              Recurring Themes & Psychological Obsessions
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {mindsetProfile?.recurringThemes?.length || 0} Themes Recognized
          </span>
        </div>
        <p className="text-xs text-slate-400">
          The core somatic tensions your channel gravitated toward in submitted ideas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {mindsetProfile?.recurringThemes?.map((theme, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span className="leading-snug">{theme}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
