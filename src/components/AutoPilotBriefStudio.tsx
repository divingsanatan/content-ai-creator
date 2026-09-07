import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Calendar as CalendarIcon, 
  FileText, 
  Search, 
  Pin, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Compass, 
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Eye,
  Layers,
  Flame,
  ChevronDown,
  ChevronUp,
  Brain,
  List
} from 'lucide-react';
import { 
  AutoPilotRunResult, 
  LifeProblemCategory, 
  TopicIdea, 
  CalendarItem, 
  ScriptPackage, 
  SEOPackage, 
  PinterestPackage,
  CreatorMindsetProfile
} from '../types';
import { CATEGORY_LABELS } from '../data/sanatanCalendar';
import { ActiveModule } from './Navbar';
import { CreatorMindsetStudio } from './CreatorMindsetStudio';
import { ScheduledIdeasPipeline } from './ScheduledIdeasPipeline';
import { CategorySelect } from './CategorySelect';
import { useCategories } from '../context/CategoryContext';

interface AutoPilotBriefStudioProps {
  existingCalendar: CalendarItem[];
  existingTopics: TopicIdea[];
  mindsetProfile?: CreatorMindsetProfile | null;
  onAutoPilotComplete: (result: AutoPilotRunResult) => void;
  onUpdateMindsetGuidance?: (guidance: string) => Promise<void>;
  onAddMindsetRule?: (ruleData: { category: any; rule: string; sourceIdeaOrBrief?: string }) => Promise<void>;
  onRemoveMindsetRule?: (ruleId: string) => Promise<void>;
  onSelectTopicForScript?: (topic: TopicIdea) => void;
  onNavigate: (module: ActiveModule) => void;
}

export const AutoPilotBriefStudio: React.FC<AutoPilotBriefStudioProps> = ({
  existingCalendar,
  existingTopics,
  mindsetProfile,
  onAutoPilotComplete,
  onUpdateMindsetGuidance,
  onAddMindsetRule,
  onRemoveMindsetRule,
  onSelectTopicForScript,
  onNavigate
}) => {
  const { getCategoryMeta } = useCategories();
  const [activeMainTab, setActiveMainTab] = useState<'plan' | 'ideas_pipeline' | 'creator_mindset'>('plan');
  const [briefInput, setBriefInput] = useState('');
  const [categoryPreference, setCategoryPreference] = useState<string>('auto');
  const [userNotes, setUserNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<AutoPilotRunResult | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'script' | 'calendar' | 'seo' | 'pinterest'>('script');

  // One-click idea inspiration pills
  const INSPIRATION_BRIEFS = [
    {
      title: 'Money Freeze & Root Chakra',
      category: 'money_business',
      brief: 'Why do high-income earners freeze up or feel terrified right after getting unexpected cash or closing a deal? Nakul panics about bills despite having money, Nikhil explains Muladhara safety dysregulation and why holding wealth triggers evolutionary fight-or-flight.'
    },
    {
      title: 'Relationship Burnout & Karmic Debt',
      category: 'relationships',
      brief: 'Why do you keep attracting partners you have to emotionally parent and mother? Nakul is exhausted from being his partner’s therapist, Nikhil explains Anahata contraction and Runanubandha karmic debt mirror with Katha Upanishad boundaries.'
    },
    {
      title: 'Sudden Workday Panic & Vata Reset',
      category: 'mental_health',
      brief: 'Freezing in high-stakes meetings with adrenaline in chest, heart racing, and doom spiral even though life is calm. Nakul describes the physical terror, Nikhil breaks down Vata dosha imbalance and Patanjali Yoga Sutra mental regulation.'
    },
    {
      title: 'Corporate Layoff Dread & Svadharma',
      category: 'money_business',
      brief: 'Tech workers paralyzed by layoff rumors and imposter syndrome after 10 years in corporate. Nakul feels stripped of identity, Nikhil grounds him in Bhagavad Gita 3.35 Svadharma: doing your own path vs. mimicking a company ladder.'
    },
    {
      title: 'Emotional Numbness & Heartbreak',
      category: 'emotional_health',
      brief: 'Why trying to be strong after a sudden breakup or grief causes chronic pelvic and gut numbness. Nakul tries to intellectualize away sorrow, Nikhil explains Svadhishthana Jala Tattva flow and why suppression poisons the emotional body.'
    }
  ];

  const PIPELINE_STEPS = [
    { title: 'Analyzing Brief & Grounding', desc: 'Mapping life problem to named Sanatan Dharma concept & lived experience hook' },
    { title: 'Calendar Slotting & Pacing', desc: 'Finding open weekly anchor date (1 video/week rule) & aligning lunar tithi' },
    { title: '6-Day Satellite Orbit Batching', desc: 'Generating Pre-launch hype, 3 Reels, Carousel & Pinterest dates' },
    { title: 'Nakul & Nikhil Dual Scripting', desc: 'Writing conversational Hinglish dialogue, Sanskrit Shlok card & 3 Reel cuts' },
    { title: 'Multi-Channel Packaging', desc: 'Assembling YouTube SEO (4 titles, description, tags) & Pinterest visual prompts' },
    { title: 'Atomic Database Persistence', desc: 'Syncing topic, schedule, and full script package into active persistent store' }
  ];

  const handleRunAutoPilot = async () => {
    if (!briefInput.trim()) {
      setErrorMessage('Please enter an idea, client observation, or topic brief.');
      return;
    }

    setIsRunning(true);
    setErrorMessage(null);
    setStatusMessage('Initiating Autonomous Pipeline Engine...');
    setActiveStep(1);

    // Progressive visual milestones timer for UI feedback
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/pipeline/auto-plan-and-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: briefInput.trim(),
          categoryPreference: categoryPreference !== 'auto' ? categoryPreference : undefined,
          userNotes: userNotes.trim() || undefined
        })
      });

      clearInterval(stepInterval);
      setActiveStep(6);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const json = await response.json();
      if (!json.data) {
        throw new Error('Pipeline returned unexpected response format');
      }

      const result: AutoPilotRunResult = json.data;
      setLastResult(result);
      onAutoPilotComplete(result);
      setStatusMessage('Autonomous Pipeline Completed: Topic scheduled, scripted, and packaged!');
    } catch (err: any) {
      console.error('AutoPilot client error:', err);
      clearInterval(stepInterval);
      setErrorMessage(err?.message || 'Pipeline execution encountered an issue. Please retry.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyScript = () => {
    if (!lastResult?.scriptPackage) return;
    const pkg = lastResult.scriptPackage;
    
    let text = `# ${pkg.topicTitle || pkg.topic || 'Video Script'}\n`;
    text += `Category: ${pkg.category} | Concept: ${pkg.concept}\n\n`;
    
    if (pkg.shlokCard?.included) {
      text += `## SANSKRIT SHLOK CARD\n`;
      text += `${pkg.shlokCard.sanskrit}\n`;
      text += `${pkg.shlokCard.transliteration}\n`;
      text += `Source: ${pkg.shlokCard.source}\n`;
      text += `Nikhil's Explanation: ${pkg.shlokCard.nikhilExplanation}\n\n`;
    }

    if (pkg.dialogueScript && pkg.dialogueScript.length > 0) {
      text += `## DUAL-CHARACTER HINGLISH DIALOGUE (NAKUL & NIKHIL)\n\n`;
      pkg.dialogueScript.forEach(line => {
        text += `${line.speaker.toUpperCase()} ${line.actorNote || ''}:\n"${line.dialogue}"\n\n`;
      });
    }

    if (pkg.cta) {
      text += `## YOUTUBE CTA LADDER\n`;
      text += `1. Share: ${pkg.cta.sharePrompt}\n`;
      text += `2. 1-on-1 Consultation: ${pkg.cta.consultationOffer}\n`;
      text += `3. Next Watch Loop: ${pkg.cta.nextVideoLoop}\n\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleResetForAnother = () => {
    setBriefInput('');
    setUserNotes('');
    setLastResult(null);
    setActiveStep(0);
    setStatusMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0E1116] border border-amber-500/30 rounded-lg p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Autonomous Content Pipeline
              </span>
              <span className="text-xs font-mono text-slate-400">
                End-to-End Orchestrator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white flex items-center gap-2">
              <span>Idea Brief</span>
              <ArrowRight className="w-5 h-5 text-amber-500" />
              <span className="text-amber-500">Calendar & Full Script Flow</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Drop any raw brief or client observation. The AI determines when to insert it on the calendar (respecting the 1 anchor/week cadence & Hindu tithis), schedules the 6-day satellite orbit, writes the complete Nakul & Nikhil Hinglish dual-character script (with Shlok & 3 Reel cuts), and packages SEO & Pinterest metadata.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('module4_calendar')}
              className="px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => onNavigate('module5_scripts')}
              className="px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Script Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveMainTab('plan')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeMainTab === 'plan'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>⚡ Plan New Idea</span>
          </button>

          <button
            onClick={() => setActiveMainTab('ideas_pipeline')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeMainTab === 'ideas_pipeline'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
            <span>📋 Generated Ideas & Schedules</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              activeMainTab === 'ideas_pipeline' ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-amber-400'
            }`}>
              {existingTopics.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab('creator_mindset')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
              activeMainTab === 'creator_mindset'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>🧠 Creator Mindset & Content DNA</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              activeMainTab === 'creator_mindset' ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-emerald-400'
            }`}>
              {mindsetProfile?.learnedRules.length || 6} Rules
            </span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
          {activeMainTab === 'plan' && 'Ready to analyze & auto-schedule next brief'}
          {activeMainTab === 'ideas_pipeline' && 'Full visibility into anchor dates & satellites'}
          {activeMainTab === 'creator_mindset' && 'AI continually adapts to how you create'}
        </div>
      </div>

      {/* Tab: Generated Ideas & Schedule Pipeline */}
      {activeMainTab === 'ideas_pipeline' && (
        <ScheduledIdeasPipeline
          topics={existingTopics}
          calendar={existingCalendar}
          onSelectTopicForScript={onSelectTopicForScript}
          onNavigate={onNavigate}
        />
      )}

      {/* Tab: Creator Mindset & Content DNA Studio */}
      {activeMainTab === 'creator_mindset' && (
        <CreatorMindsetStudio
          mindsetProfile={mindsetProfile}
          onUpdateMindsetGuidance={onUpdateMindsetGuidance}
          onAddMindsetRule={onAddMindsetRule}
          onRemoveMindsetRule={onRemoveMindsetRule}
          onNavigateToAutoPilot={() => setActiveMainTab('plan')}
        />
      )}

      {/* Tab: Plan & Auto-Script Pipeline */}
      {activeMainTab === 'plan' && (
        <>
          {/* Input Stage Container */}
          {!lastResult && (
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Enter Topic Brief or Raw Concept</span>
            </label>
            <span className="text-xs text-slate-500">Natural Hinglish or English accepted</span>
          </div>

          {/* Text Area Input */}
          <div className="relative">
            <textarea
              id="autopilot-brief-input"
              rows={4}
              value={briefInput}
              onChange={(e) => setBriefInput(e.target.value)}
              disabled={isRunning}
              placeholder="E.g. Why high-income earners freeze up or feel terrified right after getting unexpected cash or closing a big deal. Nakul panics about bills despite having money in his account; Nikhil explains Muladhara safety dysregulation and why holding wealth triggers evolutionary fight-or-flight..."
              className="w-full bg-[#07090C] border border-slate-700 rounded-lg p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition resize-y"
            />
          </div>

          {/* Quick Preset Ideas Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Quick Inspiration Briefs (Click to load):
            </span>
            <div className="flex flex-wrap gap-2">
              {INSPIRATION_BRIEFS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setBriefInput(item.brief);
                    setCategoryPreference(item.category);
                  }}
                  disabled={isRunning}
                  className="px-2.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Category Indicator */}
          <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Which Category Should It Be?</span>
                <span className="text-amber-400">*</span>
              </label>
              <span className="text-[11px] text-slate-500">
                Calibrates Sanskrit shlok & psychological frame
              </span>
            </div>
            <div className="bg-[#07090C] p-2.5 rounded-lg border border-slate-800">
              <CategorySelect
                value={categoryPreference}
                onChange={setCategoryPreference}
                disabled={isRunning}
                extraOptions={[
                  { value: 'auto', label: '⚡ Auto-Detect Best Fit' }
                ]}
                size="md"
              />
            </div>
          </div>

          {/* Optional Directing Notes Accordion */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition cursor-pointer"
            >
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showAdvanced ? 'Hide Directing Notes' : '+ Add Optional Directing Notes (Tone, Sarcasm, Ending Chants)'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-2.5 p-3 rounded bg-[#07090C] border border-slate-800 animate-in fade-in duration-150">
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Directing & Tone Notes for Nakul / Nikhil (Optional)
                </label>
                <input
                  type="text"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  disabled={isRunning}
                  placeholder="E.g. Extra sarcastic Nakul pacing, end with quiet Sanskrit chant"
                  className="w-full bg-[#0E1116] border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              {isRunning ? (
                <span className="text-amber-400 animate-pulse font-mono">
                  Autonomous engine executing stages...
                </span>
              ) : (
                <span>One-click execution: Inserts onto Calendar, writes full script, and packages distribution.</span>
              )}
            </div>

            <button
              type="button"
              id="run-autopilot-btn"
              onClick={handleRunAutoPilot}
              disabled={isRunning || !briefInput.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running Full Autonomous Pipeline...' : 'Run Full Autonomous Pipeline'}</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded bg-red-950/40 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Real-time Progress Visualizer */}
          {isRunning && (
            <div className="mt-4 p-5 rounded-lg bg-[#07090C] border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Live Pipeline Progress
                </span>
                <span className="font-mono text-slate-400">
                  Step {Math.min(activeStep, 6)} of 6
                </span>
              </div>

              <div className="space-y-2.5">
                {PIPELINE_STEPS.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = activeStep > stepNum;
                  const isCurrent = activeStep === stepNum;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-2.5 rounded transition ${
                        isCurrent
                          ? 'bg-amber-500/10 border border-amber-500/30'
                          : isDone
                          ? 'bg-slate-900/40 border border-slate-800'
                          : 'opacity-40'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                            {stepNum}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className={`text-xs font-medium ${isCurrent ? 'text-amber-300 font-semibold' : 'text-slate-200'}`}>
                          {step.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Execution Results View */}
      {lastResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Success Banner */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-emerald-300">
                  Autonomous Flow Successfully Completed & Persisted!
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  1 Anchor Video + {lastResult.calendarItems.length - 1} Orbit Satellites inserted on the Calendar. Full Nakul & Nikhil Hinglish script, Shlok card, 3 Reel cuts, and distribution metadata ready.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyScript}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetForAnother}
                className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>+ Add Another Idea</span>
              </button>
            </div>
          </div>

          {/* Decision Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Slot Card */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <CalendarIcon className="w-3 h-3 text-amber-400" />
                Calendar Insertion
              </span>
              <div className="text-sm font-semibold text-white">
                {lastResult.schedulingReasoning.anchorReleaseDate} ({lastResult.schedulingReasoning.dayOfWeek})
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">
                {lastResult.schedulingReasoning.selectedSprint}
              </p>
              {lastResult.schedulingReasoning.festivalOrTithiAlignment && (
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {lastResult.schedulingReasoning.festivalOrTithiAlignment}
                </div>
              )}
            </div>

            {/* Topic Formulation */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3 h-3 text-amber-400" />
                Formulated Topic Title
              </span>
              <div className="text-sm font-semibold text-amber-300 line-clamp-2">
                "{lastResult.topic.workingTitle}"
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 capitalize">
                  {getCategoryMeta(lastResult.topic.category).label}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {lastResult.topic.workingTitle.length} chars (Target &lt;60)
                </span>
              </div>
            </div>

            {/* Sanatan Grounding */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Sanatan Grounding
              </span>
              <div className="text-xs font-medium text-slate-200 line-clamp-2">
                {lastResult.topic.concept}
              </div>
              <p className="text-[11px] text-slate-400 italic line-clamp-2">
                Hook: "{lastResult.topic.hook}"
              </p>
            </div>
          </div>

          {/* Results Navigation Tabs */}
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg overflow-hidden">
            <div className="flex border-b border-slate-800 bg-[#0A0C10] p-1 gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveResultTab('script')}
                className={`px-4 py-2 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  activeResultTab === 'script'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Dual-Character Script ({lastResult.scriptPackage.dialogueScript?.length || 0} Lines)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('calendar')}
                className={`px-4 py-2 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  activeResultTab === 'calendar'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Scheduled 7-Day Orbit ({lastResult.calendarItems.length} Entries)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('seo')}
                className={`px-4 py-2 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  activeResultTab === 'seo'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>YouTube SEO Packaging</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('pinterest')}
                className={`px-4 py-2 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  activeResultTab === 'pinterest'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Pinterest Pin Prompts</span>
              </button>
            </div>

            {/* Tab 1: Script Preview */}
            {activeResultTab === 'script' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <span>{lastResult.scriptPackage.topicTitle || lastResult.topic.workingTitle}</span>
                      <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        10-15 min Anchor
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Conversational Hinglish dialogue between Nakul (Anxious Creator) and Nikhil (Sthira Sage).
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('module5_scripts')}
                    className="px-3.5 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    <span>Open in Full Script Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Shlok Card Highlight */}
                {lastResult.scriptPackage.shlokCard?.included && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold tracking-wider">
                      Sanskrit Shlok Anchor: {lastResult.scriptPackage.shlokCard.source}
                    </span>
                    <p className="text-sm font-serif text-amber-100 italic">
                      "{lastResult.scriptPackage.shlokCard.sanskrit}"
                    </p>
                    <p className="text-xs font-mono text-amber-300/80">
                      {lastResult.scriptPackage.shlokCard.transliteration}
                    </p>
                    <p className="text-xs text-slate-300 pt-1">
                      <span className="text-amber-400 font-medium">Nikhil's Breakthrough:</span> {lastResult.scriptPackage.shlokCard.nikhilExplanation}
                    </p>
                  </div>
                )}

                {/* 3 Reel Cuts Badges */}
                {lastResult.scriptPackage.reelCuts && lastResult.scriptPackage.reelCuts.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      3 Embedded Reel Cuts for Instagram & Shorts:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {lastResult.scriptPackage.reelCuts.map((cut, idx) => (
                        <div key={idx} className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                            <span>Reel #{cut.cutNumber}</span>
                            <span>{cut.targetDuration}</span>
                          </div>
                          <p className="text-xs font-medium text-white line-clamp-1">{cut.title}</p>
                          <p className="text-[11px] text-slate-400 italic line-clamp-2">Hook: "{cut.hookLine}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dialogue Lines Stream */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Dialogue Exchange Sample:
                  </span>
                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-2">
                    {lastResult.scriptPackage.dialogueScript?.slice(0, 6).map((line, idx) => {
                      const isNakul = line.speaker === 'Nakul';
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-xs space-y-1 ${
                            isNakul
                              ? 'bg-slate-900/80 border-slate-800 text-slate-200 mr-6'
                              : 'bg-amber-950/20 border-amber-500/20 text-amber-100 ml-6'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${isNakul ? 'text-red-400' : 'text-amber-400'}`}>
                              {line.speaker} {line.actorNote && <span className="font-normal italic text-slate-400 text-[11px]">{line.actorNote}</span>}
                            </span>
                            {line.timestamp && (
                              <span className="font-mono text-[10px] text-slate-500">{line.timestamp}</span>
                            )}
                          </div>
                          <p className="text-xs leading-relaxed">{line.dialogue}</p>
                        </div>
                      );
                    })}
                  </div>
                  {(lastResult.scriptPackage.dialogueScript?.length || 0) > 6 && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => onNavigate('module5_scripts')}
                        className="text-xs text-amber-400 hover:underline cursor-pointer"
                      >
                        + {(lastResult.scriptPackage.dialogueScript?.length || 0) - 6} more dialogue lines in Script Studio →
                      </button>
                    </div>
                  )}
                </div>

                {/* CTA Ladder */}
                {lastResult.scriptPackage.cta && (
                  <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      3-Step YouTube CTA Ladder (Embedded in Script)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="font-semibold text-slate-300">1. Share Prompt:</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">{lastResult.scriptPackage.cta.sharePrompt}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-400">2. 1-on-1 Consultation:</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">{lastResult.scriptPackage.cta.consultationOffer}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-300">3. Next Watch Loop:</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">{lastResult.scriptPackage.cta.nextVideoLoop}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Calendar Schedule */}
            {activeResultTab === 'calendar' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Complete 7-Day Orbit Batch Inserted on Calendar
                    </h3>
                    <p className="text-xs text-slate-400">
                      Anchor long-form video with 6 surrounding satellite derivatives across YouTube, Instagram & Pinterest.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('module4_calendar')}
                    className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>View Calendar Grid</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {lastResult.calendarItems.map((item, idx) => {
                    const isAnchor = item.contentType === 'Long-form Video';
                    return (
                      <div
                        key={idx}
                        className={`py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isAnchor ? 'bg-amber-500/5 -mx-3 px-3 rounded' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-center w-16 shrink-0 font-mono">
                            <span className="text-[10px] text-slate-500 uppercase block">{item.dayOfWeek.slice(0, 3)}</span>
                            <span className={`text-xs font-bold ${isAnchor ? 'text-amber-400' : 'text-slate-300'}`}>
                              {item.date.slice(5)}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                isAnchor
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'bg-slate-800 text-slate-300'
                              }`}>
                                {item.contentType}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {item.platform}
                              </span>
                              {item.festivalOrTithi && (
                                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded">
                                  {item.festivalOrTithi}
                                </span>
                              )}
                            </div>
                            <h4 className={`text-xs mt-1 ${isAnchor ? 'font-semibold text-white text-sm' : 'text-slate-300'}`}>
                              {item.title}
                            </h4>
                            {item.notes && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.notes}</p>
                            )}
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-emerald-400 shrink-0 self-end sm:self-center">
                          ✓ Scheduled
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: SEO */}
            {activeResultTab === 'seo' && lastResult.seoPackage && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-semibold text-white">YouTube SEO Package</h3>
                    <p className="text-xs text-slate-400">High-CTR titles, timestamps & problem-aware tags.</p>
                  </div>
                  <button
                    onClick={() => onNavigate('module6_seo')}
                    className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>View SEO Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    High-CTR YouTube Title Variations (&lt;60 Chars):
                  </span>
                  <div className="space-y-2">
                    {lastResult.seoPackage.titles?.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{t.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{t.charCount || t.title.length} chars</span>
                      </div>
                    ))}
                  </div>
                </div>

                {lastResult.seoPackage.youtubeDescription && (
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <span className="font-semibold text-slate-300 block">Description First 2 Lines (Above the fold):</span>
                    <p className="text-slate-400 italic">{lastResult.seoPackage.youtubeDescription.firstTwoLinesFold}</p>
                    <span className="font-semibold text-amber-400 block pt-1">Consultation CTA in Description:</span>
                    <p className="text-slate-400">{lastResult.seoPackage.youtubeDescription.consultationCta}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Pinterest */}
            {activeResultTab === 'pinterest' && lastResult.pinterestPackage && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-semibold text-white">Pinterest Multi-Style Visual Pins</h3>
                    <p className="text-xs text-slate-400">Watercolor, minimalist flat illustration & photo-realistic prompts.</p>
                  </div>
                  <button
                    onClick={() => onNavigate('module7_pinterest')}
                    className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>View Pinterest Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {lastResult.pinterestPackage.pins?.map((pin, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <span className="text-[10px] font-mono uppercase text-amber-400 block">{pin.style}</span>
                      <h4 className="font-semibold text-white line-clamp-1">{pin.pinTitle}</h4>
                      <p className="text-[11px] text-amber-300 italic">Overlay: "{pin.overlayText}"</p>
                      <p className="text-slate-400 text-[11px] line-clamp-2">{pin.pinDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
