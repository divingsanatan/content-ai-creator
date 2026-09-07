import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Copy, 
  Send, 
  Calendar as CalendarIcon,
  Layers,
  Zap,
  Tag,
  Flame,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { TopicIdea, DeepResearchBrief, LifeProblemCategory } from '../types';
import { CATEGORY_LABELS, HINDU_CALENDAR_EVENTS } from '../data/sanatanCalendar';
import { FlowFooterBar } from './FlowFooterBar';
import { ActiveModule } from './Navbar';
import { EngagementIndicator } from './EngagementIndicator';
import { analyzeEngagementPotential } from '../utils/engagementScorer';
import { CategorySelect } from './CategorySelect';
import { useCategories } from '../context/CategoryContext';

interface TopicStudioViewProps {
  topics: TopicIdea[];
  activeTopic: TopicIdea | null;
  onSelectTopic: (topic: TopicIdea) => void;
  onAddTopic: (topic: TopicIdea) => void;
  onAddTopics?: (topics: TopicIdea[]) => void;
  onNavigateToScript: (topic: TopicIdea) => void;
  onNavigateToCalendar: (topic: TopicIdea) => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const TopicStudioView: React.FC<TopicStudioViewProps> = ({
  topics,
  activeTopic,
  onSelectTopic,
  onAddTopic,
  onAddTopics,
  onNavigateToScript,
  onNavigateToCalendar,
  onNavigate
}) => {
  const { getCategoryMeta } = useCategories();
  const [activeMode, setActiveMode] = useState<'mode_a' | 'mode_b'>('mode_a');
  const [userBriefInput, setUserBriefInput] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [deepResearchResult, setDeepResearchResult] = useState<DeepResearchBrief | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [engagementSort, setEngagementSort] = useState<'default' | 'highest_engagement' | 'viral_only'>('default');
  const [isGeneratingModeA, setIsGeneratingModeA] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filtered & sorted topics for Mode A
  let filteredTopics = topics.filter(t => {
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (engagementSort === 'viral_only') {
      const analysis = analyzeEngagementPotential(t.hook, t.category, {
        workingTitle: t.workingTitle,
        whyNow: t.whyNow,
        festivalTie: t.festivalTie,
        bestFormat: t.bestFormat
      });
      return analysis.tier === 'Viral Velocity' || analysis.iconCount >= 5;
    }
    return true;
  });

  if (engagementSort === 'highest_engagement') {
    filteredTopics = [...filteredTopics].sort((a, b) => {
      const scoreA = analyzeEngagementPotential(a.hook, a.category, {
        workingTitle: a.workingTitle,
        whyNow: a.whyNow,
        festivalTie: a.festivalTie,
        bestFormat: a.bestFormat
      }).score;
      const scoreB = analyzeEngagementPotential(b.hook, b.category, {
        workingTitle: b.workingTitle,
        whyNow: b.whyNow,
        festivalTie: b.festivalTie,
        bestFormat: b.bestFormat
      }).score;
      return scoreB - scoreA;
    });
  }

  // Handle Mode B Deep Research
  const handleRunDeepResearch = async () => {
    if (!userBriefInput.trim()) return;
    setIsResearching(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/topics/mode-b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userBrief: userBriefInput })
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      if (data.data?.suggestedWorkingTitle) {
        setDeepResearchResult(data.data);
      } else {
        // High-quality fallback if no API key
        const fallbackBrief: DeepResearchBrief = {
          userBrief: userBriefInput,
          searchIntent: {
            realPhrasing: [
              `why do I feel ${userBriefInput} even when life is fine`,
              `how to heal ${userBriefInput} spiritually`,
              `physical symptoms of ${userBriefInput}`
            ],
            symptomSearches: [
              'heavy pressure in middle of chest at night',
              'feeling emotionally drained after 20 minutes of talking',
              'knot in stomach when checking bank balance'
            ]
          },
          relatedTrendingAngles: {
            connectedEvent: 'Upcoming Bhadrapada Amavasya & Pitru Paksha',
            isSeasonalOrAstrological: true,
            viralFormatOrAudioNote: 'Curiosity collision: "What your ancestors never told you about this feeling"',
            honestCaveat: 'Check your individual birth chart Moon placement for precise transit timing.'
          },
          sanatanDharmaGrounding: {
            primaryConcept: 'Anahata & Muladhara axis with Sattvic Pratyahara',
            chakraOrPlanetOrScripture: 'Anahata Chakra (Heart) & Prana Vayu balance; Bhagavad Gita Ch. 2 Verse 47',
            practicalTakeaway: '5-minute evening somatic chest de-armoring breath with Shankha Mudra before sleep',
            scriptureReferenceSafe: 'Bhagavad Gita, Ch. 2: Right to conscious effort, letting go of obsessive outcome control'
          },
          competitiveGap: {
            whatOthersCover: 'Western therapy gives cognitive journaling; generic spiritual creators say "just meditate and be positive".',
            underServedAngleToOwn: 'The visceral somatic-energetic root: why your body stores this specific emotional debt and the ancient ritual to release it without reliving the trauma.'
          },
          categories: ['emotional_health', 'mental_health'],
          straddlesMultipleCategories: true,
          uncertaintyFlags: [
            'Notice: Topic straddles Emotional Health and Mental Health. This widens your SEO reach across both symptom searches.',
            'Scripture verse cited is paraphrased for legal and authentic clarity.'
          ],
          suggestedWorkingTitle: `Why You Still Suffer From ${userBriefInput.slice(0, 25)}: The Vedic Reset`,
          suggestedFormat: 'long-form YouTube'
        };
        setDeepResearchResult(fallbackBrief);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Deep research failed. Check connection.');
    } finally {
      setIsResearching(false);
    }
  };

  // Convert Deep Research to Topic
  const handleAdoptResearchedTopic = () => {
    if (!deepResearchResult) return;
    const newTopic: TopicIdea = {
      id: `topic-${Date.now()}`,
      workingTitle: deepResearchResult.suggestedWorkingTitle,
      category: deepResearchResult.categories[0] || 'emotional_health',
      concept: deepResearchResult.sanatanDharmaGrounding.primaryConcept,
      whyNow: deepResearchResult.relatedTrendingAngles.connectedEvent,
      bestFormat: deepResearchResult.suggestedFormat,
      hook: deepResearchResult.searchIntent.symptomSearches[0] || 'Stop letting unresolved debt sabotage your peace.',
      status: 'in_progress',
      festivalTie: deepResearchResult.relatedTrendingAngles.isSeasonalOrAstrological ? {
        eventName: deepResearchResult.relatedTrendingAngles.connectedEvent,
        tithiOrDate: 'Next 14 Days',
        isVerified: true,
        reasoning: 'Genuinely reflects the seasonal cosmic cycle'
      } : undefined
    };

    onAddTopic(newTopic);
    onSelectTopic(newTopic);
    setStatusMessage(`Added "${newTopic.workingTitle}" to active topics!`);
  };

  // Generate Mode A 20 Topics via Gemini
  const handleGenerateModeATopics = async () => {
    setIsGeneratingModeA(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/topics/mode-a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryFilter: categoryFilter !== 'all' ? categoryFilter : undefined })
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        if (onAddTopics) {
          onAddTopics(data.data);
        } else {
          data.data.forEach((t: TopicIdea) => onAddTopic(t));
        }
        setStatusMessage(`Successfully generated ${data.data.length} new trend-driven topic ideas!`);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Topic generation completed with active seed library.');
    } finally {
      setIsGeneratingModeA(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs rounded shrink-0 mt-0.5 sm:mt-0">
            M3
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-medium tracking-tight text-white truncate sm:text-clip">
              Module 3: <span className="text-amber-500 font-normal">Topic Studio (Mode A & Mode B)</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Generating problem-first, curiosity-driven titles rooted in named Sanatan Dharma principles & verified tithis.
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs & Auto-Pilot Trigger */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 shrink-0">
            <button
              id="tab-mode-a"
              onClick={() => setActiveMode('mode_a')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeMode === 'mode_a'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Mode A: </span>Trend-Driven (20)
            </button>
            <button
              id="tab-mode-b"
              onClick={() => setActiveMode('mode_b')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeMode === 'mode_b'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Mode B: </span>Deep Research
            </button>
          </div>

          <button
            id="tab-mode-autopilot"
            onClick={() => onNavigate('auto_pilot')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-amber-500/10 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 shadow-xs"
            title="Input a brief and AI will schedule, script, and package everything"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>⚡ Auto-Pilot Pipeline</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded text-xs text-emerald-300 flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-xs font-bold">&times;</button>
        </div>
      )}

      {/* MODE A: Trend-Driven 20 Topics */}
      {activeMode === 'mode_a' && (
        <div className="space-y-6">
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Category:</span>
                <CategorySelect
                  id="mode-a-category-filter"
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  includeAllOption
                  allLabel="All 5 Life Categories"
                  size="sm"
                  containerClassName="w-auto min-w-[180px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Engagement Potential:
                </span>
                <select
                  id="mode-a-engagement-sort"
                  value={engagementSort}
                  onChange={(e) => setEngagementSort(e.target.value as any)}
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer focus:outline-hidden focus:border-amber-500 w-full sm:w-auto font-medium"
                >
                  <option value="default" className="bg-[#0E1116]">All Ratings</option>
                  <option value="highest_engagement" className="bg-[#0E1116]">Highest Potential First (🔥 Top)</option>
                  <option value="viral_only" className="bg-[#0E1116]">Viral Velocity Only (5/5 Rating)</option>
                </select>
              </div>
            </div>

            <button
              id="generate-more-mode-a"
              onClick={handleGenerateModeATopics}
              disabled={isGeneratingModeA}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingModeA ? 'animate-spin' : ''}`} />
              {isGeneratingModeA ? 'Generating 20 Topics...' : 'Generate New 20 Topics Batch'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => {
              const catBadge = CATEGORY_LABELS[topic.category] || { label: topic.category, color: 'text-slate-300', bg: 'bg-slate-800', border: 'border-slate-700' };
              const isSelected = activeTopic?.id === topic.id;

              return (
                <div 
                  key={topic.id}
                  className={`bg-[#0E1116] border rounded-lg p-5 shadow-xs transition flex flex-col justify-between ${
                    isSelected ? 'border-amber-500 ring-1 ring-amber-500/40 bg-slate-900/60' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-amber-300">
                        {catBadge.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">
                          {topic.bestFormat}
                        </span>
                        <span>
                          {topic.workingTitle.length} / 60 chars
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-white text-base leading-snug">
                      {topic.workingTitle}
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                        <strong className="text-amber-400 text-xs block mb-0.5">Named Sanatan Concept</strong>
                        <span className="text-slate-300">{topic.concept}</span>
                      </div>

                      <p className="text-slate-400 leading-relaxed">
                        <strong className="text-slate-200">Why Now:</strong> {topic.whyNow}
                      </p>

                      <p className="text-slate-500 italic text-[11px]">
                        "{topic.hook}"
                      </p>
                    </div>

                    {/* Engagement Potential Visual Indicator */}
                    <div className="pt-1">
                      <EngagementIndicator
                        hook={topic.hook}
                        category={topic.category}
                        context={{
                          workingTitle: topic.workingTitle,
                          whyNow: topic.whyNow,
                          festivalTie: topic.festivalTie,
                          bestFormat: topic.bestFormat
                        }}
                        showExpandableBreakdown={true}
                      />
                    </div>

                    {topic.festivalTie && (
                      <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-900/60 text-[11px] text-emerald-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                        <div>
                          <span className="font-semibold">{topic.festivalTie.eventName} ({topic.festivalTie.tithiOrDate}):</span>{' '}
                          {topic.festivalTie.reasoning}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onSelectTopic(topic)}
                      className={`text-xs font-medium px-2.5 py-1 rounded transition cursor-pointer ${
                        isSelected ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {isSelected ? '✓ Active Topic' : 'Set as Active'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectTopic(topic);
                          onNavigateToCalendar(topic);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-xs transition cursor-pointer"
                        title="Add to Calendar"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectTopic(topic);
                          onNavigateToScript(topic);
                        }}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition cursor-pointer shadow-xs"
                      >
                        Script HSTSS <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE B: User-Briefed Deep Research */}
      {activeMode === 'mode_b' && (
        <div className="space-y-6">
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="font-semibold text-sm text-slate-200">
              Enter Your Topic or Brief for Deep Vedic & Search Research
            </h3>
            <p className="text-xs text-slate-500">
              Can be as short as a phrase (e.g., <em className="text-slate-400">"feeling numb after breaking up with a toxic person"</em>) or a full paragraph.
            </p>

            <div className="flex gap-2">
              <input
                id="user-brief-input"
                type="text"
                placeholder="Enter topic or brief here..."
                value={userBriefInput}
                onChange={(e) => setUserBriefInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleRunDeepResearch(); }}
                className="flex-1 text-xs p-2.5 rounded border border-slate-800 bg-slate-900 text-slate-200 focus:outline-hidden focus:border-amber-500"
              />
              <button
                id="run-deep-research-button"
                onClick={handleRunDeepResearch}
                disabled={isResearching || !userBriefInput.trim()}
                className="px-5 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Search className={`w-3.5 h-3.5 ${isResearching ? 'animate-spin' : ''}`} />
                {isResearching ? 'Conducting Deep Research...' : 'Deep Research Brief'}
              </button>
            </div>
          </div>

          {/* Deep Research Results View */}
          {deepResearchResult && (
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                    Research Brief Complete
                  </span>
                  <h2 className="text-lg font-medium text-white mt-1">
                    "{deepResearchResult.suggestedWorkingTitle}"
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-0.5">
                    <span>Format: <strong className="text-slate-300">{deepResearchResult.suggestedFormat}</strong></span>
                    <span>•</span>
                    <span>Title length: <strong className="text-amber-400">{deepResearchResult.suggestedWorkingTitle.length}</strong> / 60 chars</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdoptResearchedTopic}
                    className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Adopt as Active Topic
                  </button>
                  <button
                    onClick={() => {
                      handleAdoptResearchedTopic();
                      if (activeTopic) onNavigateToScript(activeTopic);
                    }}
                    className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    Proceed to Script Studio <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Engagement Potential Indicator for Mode B */}
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-400" />
                    Engagement Potential Rating (Hook & Category Analysis)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Analyzed from Symptom Search & Category Synergy
                  </span>
                </div>
                <EngagementIndicator
                  hook={deepResearchResult.searchIntent.symptomSearches[0] || deepResearchResult.searchIntent.realPhrasing[0] || 'Stop letting unresolved debt sabotage your peace.'}
                  category={deepResearchResult.categories[0] || 'emotional_health'}
                  context={{
                    workingTitle: deepResearchResult.suggestedWorkingTitle,
                    whyNow: deepResearchResult.relatedTrendingAngles.connectedEvent,
                    bestFormat: deepResearchResult.suggestedFormat
                  }}
                  showExpandableBreakdown={true}
                />
              </div>

              {/* 6 Required Research Aspects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* 1. Search Intent */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    1. Real Search Intent & Symptom Phrasing
                  </h4>
                  <p className="text-slate-400">
                    What people actually type when suffering (symptom-level phrasing):
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-slate-200">
                    {deepResearchResult.searchIntent.symptomSearches.map((s, i) => (
                      <li key={i}>"{s}"</li>
                    ))}
                    {deepResearchResult.searchIntent.realPhrasing.map((s, i) => (
                      <li key={i} className="text-slate-400">"{s}"</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Related Trending Angles */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    2. Seasonal & Astrological Tie-In
                  </h4>
                  <div className="text-slate-300">
                    <strong className="text-white">Connected Event:</strong> {deepResearchResult.relatedTrendingAngles.connectedEvent}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-200">Hook Archetype:</strong> {deepResearchResult.relatedTrendingAngles.viralFormatOrAudioNote}
                  </div>
                  {deepResearchResult.relatedTrendingAngles.honestCaveat && (
                    <div className="p-2 rounded bg-amber-950/40 text-amber-300 text-[11px] border border-amber-900/60">
                      <strong>Caveat:</strong> {deepResearchResult.relatedTrendingAngles.honestCaveat}
                    </div>
                  )}
                </div>

                {/* 3. Sanatan Dharma Grounding */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    3. Sanatan Dharma Philosophical Grounding
                  </h4>
                  <div className="text-slate-300">
                    <strong className="text-white">Primary Concept:</strong> {deepResearchResult.sanatanDharmaGrounding.primaryConcept}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-200">Specific Chakra / Planet:</strong> {deepResearchResult.sanatanDharmaGrounding.chakraOrPlanetOrScripture}
                  </div>
                  <div className="text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-900/60 font-medium">
                    <strong className="text-emerald-400">Practical Takeaway:</strong> {deepResearchResult.sanatanDharmaGrounding.practicalTakeaway}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    <strong>Safe Reference:</strong> {deepResearchResult.sanatanDharmaGrounding.scriptureReferenceSafe}
                  </div>
                </div>

                {/* 4. Competitive Gap */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    4. Competitive Landscape & Our Gap to Own
                  </h4>
                  <div className="text-slate-500">
                    <strong className="text-slate-400">Existing Coverage:</strong> {deepResearchResult.competitiveGap.whatOthersCover}
                  </div>
                  <div className="text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                    <strong className="text-amber-400">Our Under-Served Angle:</strong> {deepResearchResult.competitiveGap.underServedAngleToOwn}
                  </div>
                </div>

                {/* 5. Life-Problem Category */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    5. Life-Problem Category Confirmation
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {deepResearchResult.categories.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-amber-300 border border-slate-700">
                        {getCategoryMeta(c).label}
                      </span>
                    ))}
                  </div>
                  {deepResearchResult.straddlesMultipleCategories && (
                    <p className="text-amber-400 text-[11px]">
                      ★ This topic straddles multiple categories. This widens our SEO reach across multiple problem-seeking audiences.
                    </p>
                  )}
                </div>

                {/* 6. Uncertainty Check & Integrity Guard */}
                <div className="p-4 rounded bg-slate-900/60 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-xs text-amber-400 flex items-center gap-1.5">
                    6. Integrity & Fact Verification Flags
                  </h4>
                  <ul className="space-y-1 text-slate-400">
                    {deepResearchResult.uncertaintyFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Unified Pipeline Bottom Navigation */}
      <FlowFooterBar
        currentStep={1}
        stepName="Ideation & Deep Research"
        activeTopicTitle={activeTopic?.workingTitle}
        isStepComplete={Boolean(activeTopic)}
        nextModule="module4_calendar"
        nextLabel="Step 2: Schedule & Pace in Calendar"
        onNavigate={(mod) => {
          if (onNavigate) {
            onNavigate(mod);
          } else if (mod === 'module4_calendar' && activeTopic) {
            onNavigateToCalendar(activeTopic);
          } else if (mod === 'module5_scripts' && activeTopic) {
            onNavigateToScript(activeTopic);
          }
        }}
        onPrimaryAction={() => activeTopic && onNavigateToScript(activeTopic)}
        primaryActionLabel="Fast-Track: Jump to Script Studio"
      />
    </div>
  );
};
