import React, { useState } from 'react';
import { 
  Layers, 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Filter, 
  Youtube, 
  Instagram, 
  Pin, 
  FileText, 
  BookOpen, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  AlertCircle,
  CalendarCheck,
  Flame,
  LayoutGrid,
  List,
  Table as TableIcon,
  Tag,
  Check,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { TopicIdea, CalendarItem, LifeProblemCategory, ScriptPackage, AutoPilotRunResult } from '../types';
import { CATEGORY_LABELS } from '../data/sanatanCalendar';
import { ActiveModule } from './Navbar';
import { CategorySelect } from './CategorySelect';
import { useCategories } from '../context/CategoryContext';

interface IdeasAndFlowViewProps {
  topics: TopicIdea[];
  calendar: CalendarItem[];
  activeTopic: TopicIdea | null;
  scriptPackage: ScriptPackage | null;
  onSelectTopic: (topic: TopicIdea) => void;
  onAddTopic?: (topic: TopicIdea) => void;
  onScheduleTopic?: (topic: TopicIdea, date: string) => void;
  onNavigate: (module: ActiveModule) => void;
  onAutoPilotComplete?: (result: AutoPilotRunResult) => void;
}

export const IdeasAndFlowView: React.FC<IdeasAndFlowViewProps> = ({
  topics,
  calendar,
  activeTopic,
  scriptPackage,
  onSelectTopic,
  onAddTopic,
  onScheduleTopic,
  onNavigate,
  onAutoPilotComplete
}) => {
  const { getCategoryMeta } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'scheduled' | 'unscheduled'>('all');
  const [viewMode, setViewMode] = useState<'flow_cards' | 'timeline' | 'matrix'>('flow_cards');
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({
    [topics[0]?.id || '']: true
  });
  const [scheduleModalTopic, setScheduleModalTopic] = useState<TopicIdea | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>('2026-09-13');

  // Streamlined "Explain Idea -> Create Script & Content" State
  const [isQuickIdeateOpen, setIsQuickIdeateOpen] = useState(false);
  const [ideaText, setIdeaText] = useState('');
  const [ideaCategory, setIdeaCategory] = useState<string>('mental_health');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<AutoPilotRunResult | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedTopicIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateScriptsFromIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim() || isGeneratingContent) return;

    setIsGeneratingContent(true);
    setGenerationError(null);
    setGenerationStep(1);

    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await fetch('/api/pipeline/auto-plan-and-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: ideaText.trim(),
          categoryPreference: ideaCategory
        })
      });

      clearInterval(stepInterval);
      setGenerationStep(5);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const json = await response.json();
      if (!json.data) {
        throw new Error('Pipeline returned unexpected response format');
      }

      const result: AutoPilotRunResult = json.data;
      setGeneratedResult(result);

      if (onAutoPilotComplete) {
        onAutoPilotComplete(result);
      } else {
        if (onAddTopic) onAddTopic(result.topic);
        onSelectTopic(result.topic);
      }

      setExpandedTopicIds(prev => ({ ...prev, [result.topic.id]: true }));
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Error generating scripts from idea:', err);
      setGenerationError(err?.message || 'Failed to generate scripts and content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // Helper to find calendar items for a topic
  const getCalendarItemsForTopic = (topic: TopicIdea) => {
    const titleLower = topic.workingTitle.toLowerCase();
    const shortTitle = titleLower.slice(0, 20);

    return calendar.filter(item => {
      const itemTitleLower = item.title.toLowerCase();
      return (
        itemTitleLower.includes(titleLower) ||
        itemTitleLower.includes(shortTitle) ||
        (item.parentLongformId && item.parentLongformId.includes(topic.id))
      );
    });
  };

  // Helper to find anchor long-form video item
  const getAnchorItemForTopic = (topic: TopicIdea) => {
    const items = getCalendarItemsForTopic(topic);
    const longform = items.find(i => i.contentType === 'Long-form Video');
    if (longform) return longform;
    return items[0] || null;
  };

  // Compute satellite items
  const getSatellitesForTopic = (topic: TopicIdea) => {
    const items = getCalendarItemsForTopic(topic);
    return items.filter(i => i.contentType !== 'Long-form Video');
  };

  // Format date readable
  const formatDateFriendly = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Calculate days difference
  const getDaysUntil = (dateStr: string) => {
    try {
      const target = new Date(dateStr + 'T00:00:00');
      const now = new Date('2026-09-05T00:00:00'); // Consistent reference date
      const diffTime = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  };

  // Category styling handled by useCategories() hook


  // Filtering
  const filteredTopics = topics.filter(t => {
    const matchesSearch = searchQuery === '' || 
      t.workingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.hook.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;

    const anchor = getAnchorItemForTopic(t);
    const matchesSchedule = 
      scheduleFilter === 'all' ? true :
      scheduleFilter === 'scheduled' ? Boolean(anchor) :
      !anchor;

    return matchesSearch && matchesCategory && matchesSchedule;
  });

  const scheduledCount = topics.filter(t => Boolean(getAnchorItemForTopic(t))).length;
  const unscheduledCount = topics.length - scheduledCount;
  const totalSatellites = calendar.filter(c => c.contentType !== 'Long-form Video').length;

  // Handle scheduling submission
  const handleScheduleSubmit = () => {
    if (!scheduleModalTopic || !selectedScheduleDate) return;
    if (onScheduleTopic) {
      onScheduleTopic(scheduleModalTopic, selectedScheduleDate);
    }
    setScheduleModalTopic(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Hero Banner with Summary Stats */}
      <div className="bg-[#0E1116] border border-amber-500/30 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono tracking-wider text-amber-400 uppercase font-semibold">
                Ideas & Schedule Flow Tracker
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                {topics.length} Ideas Generated
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Generated Ideas & Production Flow
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track each concept through its entire 6-stage lifecycle: from its Vedic philosophical grounding, 
              exact calendar drop date, dual-actor script, to its 6-day multi-platform satellite orbit.
            </p>
          </div>

          {/* Quick Metrics Bar & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="grid grid-cols-3 gap-2 bg-[#0A0C10] p-2.5 rounded-lg border border-slate-800">
              <div className="text-center px-2">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Scheduled</p>
                <p className="text-base font-bold text-amber-400 font-mono">{scheduledCount}</p>
              </div>
              <div className="text-center px-2 border-x border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Satellites</p>
                <p className="text-base font-bold text-sky-400 font-mono">{totalSatellites}</p>
              </div>
              <div className="text-center px-2">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Backlog</p>
                <p className="text-base font-bold text-slate-300 font-mono">{unscheduledCount}</p>
              </div>
            </div>

            <button
              id="ideas-flow-quick-ideate-btn"
              onClick={() => {
                setIdeaText('');
                setGeneratedResult(null);
                setGenerationError(null);
                setIsQuickIdeateOpen(true);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>+ Explain Idea to Script</span>
            </button>

            <button
              id="ideas-flow-autopilot-btn"
              onClick={() => onNavigate('auto_pilot')}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>⚡ Generate in Auto-Pilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Category Filters, Schedule Filter, View Mode Toggle */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic title, concept, shlok, or hook..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0A0C10] border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-amber-500/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 shrink-0 min-w-[220px]">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <CategorySelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              includeAllOption
              allLabel="All 5 Life Problem Categories"
              size="sm"
            />
          </div>

          {/* Schedule Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#0A0C10] p-1 rounded border border-slate-800 shrink-0">
            <button
              onClick={() => setScheduleFilter('all')}
              className={`px-2.5 py-1 text-xs rounded transition cursor-pointer ${
                scheduleFilter === 'all'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({topics.length})
            </button>
            <button
              onClick={() => setScheduleFilter('scheduled')}
              className={`px-2.5 py-1 text-xs rounded transition cursor-pointer flex items-center gap-1 ${
                scheduleFilter === 'scheduled'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CalendarCheck className="w-3 h-3" />
              Scheduled ({scheduledCount})
            </button>
            <button
              onClick={() => setScheduleFilter('unscheduled')}
              className={`px-2.5 py-1 text-xs rounded transition cursor-pointer ${
                scheduleFilter === 'unscheduled'
                  ? 'bg-slate-800 text-amber-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Backlog ({unscheduledCount})
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#0A0C10] p-1 rounded border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('flow_cards')}
              className={`px-2.5 py-1 text-xs rounded flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'flow_cards'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full 6-Step Visual Flow Cards"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Flow Cards</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-2.5 py-1 text-xs rounded flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Chronological Scheduled Timeline"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Schedule Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-2.5 py-1 text-xs rounded flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Compact Production Table"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matrix Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Notification Banner */}
      {(searchQuery || selectedCategory !== 'all' || scheduleFilter !== 'all') && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-amber-300">
            <Filter className="w-3.5 h-3.5 shrink-0" />
            <span>
              Showing <strong>{filteredTopics.length}</strong> of <strong>{topics.length}</strong> generated ideas
              {searchQuery && <span> matching <em>"{searchQuery}"</em></span>}
              {selectedCategory !== 'all' && <span> in <strong>{getCategoryMeta(selectedCategory as LifeProblemCategory).label}</strong></span>}
              {scheduleFilter !== 'all' && <span> ({scheduleFilter})</span>}
            </span>
          </div>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setScheduleFilter('all'); }}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded font-semibold text-[11px] transition cursor-pointer border border-amber-500/40"
          >
            Clear Filters & Show All ({topics.length})
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 1: FLOW CARDS (Detailed 6-Step Lifecycle for Every Idea)       */}
      {/* ========================================================================= */}
      {viewMode === 'flow_cards' && (
        <div className="space-y-4">
          {filteredTopics.length === 0 ? (
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-12 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto opacity-60" />
              <h3 className="text-sm font-semibold text-white">No Ideas Match Your Filter</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try clearing your search query or selecting "All Categories" to view your generated concepts.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setScheduleFilter('all'); }}
                className="px-3 py-1.5 bg-slate-800 text-xs text-slate-200 rounded hover:bg-slate-700 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTopics.map((topic, index) => {
              const catMeta = getCategoryMeta(topic.category);
              const anchorItem = getAnchorItemForTopic(topic);
              const satellites = getSatellitesForTopic(topic);
              const isExpanded = Boolean(expandedTopicIds[topic.id]);
              const isSelected = activeTopic?.id === topic.id;
              const daysUntil = anchorItem ? getDaysUntil(anchorItem.date) : null;
              const isScripted = topic.status === 'scripted' || (isSelected && Boolean(scriptPackage?.hook));

              return (
                <div 
                  key={topic.id}
                  className={`bg-[#0E1116] border rounded-xl transition-all duration-200 overflow-hidden shadow-sm ${
                    isSelected 
                      ? 'border-amber-500/60 ring-1 ring-amber-500/20 shadow-amber-500/5' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header Bar */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/30 border-b border-slate-800/80">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase font-semibold ${catMeta.bg} ${catMeta.color} ${catMeta.border}`}>
                          {catMeta.label}
                        </span>
                        
                        {/* Schedule Badge */}
                        {anchorItem ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CalendarCheck className="w-3 h-3 text-emerald-400" />
                            <span>Drops {formatDateFriendly(anchorItem.date)}</span>
                            {daysUntil !== null && (
                              <span className="text-[10px] text-emerald-400 font-bold">
                                ({daysUntil > 0 ? `in ${daysUntil}d` : daysUntil === 0 ? 'TODAY' : `${Math.abs(daysUntil)}d ago`})
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>Unscheduled Backlog</span>
                          </span>
                        )}

                        {/* Script Status */}
                        {isScripted ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-amber-400" />
                            <span>Script Ready</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Idea Stage
                          </span>
                        )}

                        {isSelected && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                            Active in Studio
                          </span>
                        )}
                      </div>

                      {/* Working Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <span>{topic.workingTitle}</span>
                      </h3>

                      {/* Concept & Hook Summary */}
                      <p className="text-xs text-slate-300 line-clamp-2">
                        <span className="text-amber-400/90 font-medium">Core Concept:</span> {topic.concept}
                      </p>
                    </div>

                    {/* Quick Jump & Select Buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onSelectTopic(topic);
                          onNavigate('module5_scripts');
                        }}
                        className="px-3 py-1.5 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        title="Load into Script Studio"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Script Studio</span>
                      </button>

                      {anchorItem ? (
                        <button
                          onClick={() => onNavigate('module4_calendar')}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                          title="View on Content Calendar"
                        >
                          <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                          <span>View in Calendar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setScheduleModalTopic(topic);
                            setSelectedScheduleDate('2026-09-13');
                          }}
                          className="px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                          title="Assign Anchor Date on Calendar"
                        >
                          <CalendarCheck className="w-3.5 h-3.5" />
                          <span>Schedule Now</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleExpand(topic.id)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        title={isExpanded ? 'Collapse Flow' : 'Expand Flow'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 6-Stage Visual Stepper Nodes Line */}
                  <div className="px-5 py-3 bg-[#0A0C10] border-b border-slate-800/80 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-between min-w-[650px] text-[11px] font-mono text-slate-400">
                      
                      {/* Step 1: Vedic Hook */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                          1
                        </div>
                        <span className="text-slate-200 font-semibold">Vedic Anchor</span>
                      </div>

                      <div className="w-8 h-[1px] bg-slate-700" />

                      {/* Step 2: Calendar Slot */}
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          anchorItem 
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400' 
                            : 'bg-amber-500/20 border border-amber-500 text-amber-400'
                        }`}>
                          2
                        </div>
                        <span className={anchorItem ? 'text-slate-200 font-semibold' : 'text-amber-400'}>
                          {anchorItem ? 'Scheduled' : 'Slot Pending'}
                        </span>
                      </div>

                      <div className="w-8 h-[1px] bg-slate-700" />

                      {/* Step 3: Script */}
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          isScripted
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-slate-800 border border-slate-700 text-slate-400'
                        }`}>
                          3
                        </div>
                        <span className={isScripted ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                          HSTSS Script
                        </span>
                      </div>

                      <div className="w-8 h-[1px] bg-slate-700" />

                      {/* Step 4: Satellites */}
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          satellites.length > 0
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-slate-800 border border-slate-700 text-slate-400'
                        }`}>
                          4
                        </div>
                        <span className={satellites.length > 0 ? 'text-slate-200 font-semibold' : 'text-slate-400'}>
                          6-Day Orbit ({satellites.length || 0})
                        </span>
                      </div>

                      <div className="w-8 h-[1px] bg-slate-700" />

                      {/* Step 5: SEO Pack */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                          5
                        </div>
                        <span className="text-slate-300">SEO Package</span>
                      </div>

                      <div className="w-8 h-[1px] bg-slate-700" />

                      {/* Step 6: Pins & Hype */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                          6
                        </div>
                        <span className="text-slate-300">Pinterest & Hype</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Flow Content */}
                  {isExpanded && (
                    <div className="p-6 space-y-6 animate-in fade-in duration-150">
                      
                      {/* Grid 1: Stage 1 (Vedic Foundation) & Stage 2 (When Is It Scheduled) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        
                        {/* STAGE 1: Ideation & Vedic Core */}
                        <div className="bg-[#0A0C10] border border-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              Stage 1: Ideation & Vedic Foundation
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">Format: {topic.bestFormat}</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Visceral Lived Experience Hook</p>
                              <p className="text-slate-200 italic bg-slate-900/60 p-2 rounded border border-slate-800/80">
                                "{topic.hook}"
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Shastra Grounding & Concept</p>
                              <p className="text-slate-300 font-medium">
                                {topic.concept}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-mono">Why Now / Astrological Timing</p>
                              <p className="text-slate-400">
                                {topic.whyNow}
                              </p>
                            </div>

                            {topic.festivalTie && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                <span>Tied to {topic.festivalTie.eventName} ({topic.festivalTie.tithiOrDate})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* STAGE 2: Scheduled Drop Dates & Calendar Placement */}
                        <div className="bg-[#0A0C10] border border-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                              <CalendarIcon className="w-3.5 h-3.5" />
                              Stage 2: When Is It Scheduled
                            </span>
                            {anchorItem ? (
                              <span className="text-[10px] font-mono text-emerald-400 font-semibold">● Confirmed Slot</span>
                            ) : (
                              <span className="text-[10px] font-mono text-amber-400 font-semibold">○ Not Yet Scheduled</span>
                            )}
                          </div>

                          {anchorItem ? (
                            <div className="space-y-3">
                              {/* Anchor Box */}
                              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                                    <Youtube className="w-3.5 h-3.5" />
                                    Anchor Premiere Date
                                  </span>
                                  <span className="text-xs font-bold text-white font-mono">
                                    {formatDateFriendly(anchorItem.date)}
                                  </span>
                                </div>
                                <p className="text-xs font-semibold text-emerald-200">
                                  {anchorItem.title}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-[11px] text-emerald-300/80 font-mono">
                                  <span>Day: {anchorItem.dayOfWeek}</span>
                                  {anchorItem.festivalOrTithi && (
                                    <>
                                      <span>•</span>
                                      <span className="text-amber-300">Tithi: {anchorItem.festivalOrTithi}</span>
                                    </>
                                  )}
                                  <span>•</span>
                                  <span>Slot: 10:00 AM IST</span>
                                </div>
                              </div>

                              {/* Quick actions for schedule */}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[11px] text-slate-400">
                                  {daysUntil !== null && daysUntil > 0 
                                    ? `Scheduled in ${daysUntil} days` 
                                    : daysUntil === 0 
                                    ? 'Drops Today!' 
                                    : 'Premiered'}
                                </span>
                                <button
                                  onClick={() => {
                                    setScheduleModalTopic(topic);
                                    setSelectedScheduleDate(anchorItem.date);
                                  }}
                                  className="text-xs text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                                >
                                  Reschedule Anchor Date
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-5 space-y-2.5">
                              <p className="text-xs text-slate-400">
                                This idea does not have an active YouTube anchor slot on your calendar yet.
                              </p>
                              <button
                                onClick={() => {
                                  setScheduleModalTopic(topic);
                                  setSelectedScheduleDate('2026-09-13');
                                }}
                                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <CalendarCheck className="w-3.5 h-3.5" />
                                <span>Assign Anchor Drop Date</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* STAGE 4: 6-Day Satellite Orbit Drop Schedule */}
                      <div className="bg-[#0A0C10] border border-slate-800 rounded-lg p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-3.5 h-3.5 text-sky-400" />
                            <span className="text-xs font-mono uppercase text-sky-400 font-bold">
                              Stage 4: 6-Day Satellite Orbit Drop Schedule
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            Repurposed from Anchor • 1-to-10 Rule
                          </span>
                        </div>

                        {satellites.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                            {satellites.map((sat, sIdx) => {
                              const satDays = getDaysUntil(sat.date);
                              return (
                                <div 
                                  key={sat.id || sIdx}
                                  className="p-2.5 rounded bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between gap-2"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-mono font-semibold text-amber-400 flex items-center gap-1">
                                        {sat.platform.includes('Instagram') ? <Instagram className="w-3 h-3 text-pink-400" /> :
                                         sat.platform.includes('Pinterest') ? <Pin className="w-3 h-3 text-rose-400" /> :
                                         <Youtube className="w-3 h-3 text-red-400" />}
                                        {sat.platform}
                                      </span>
                                      <span className="text-[10px] font-mono text-slate-400">
                                        {sat.contentType}
                                      </span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-200 line-clamp-2">
                                      {sat.title}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-slate-400">{formatDateFriendly(sat.date)}</span>
                                    <span className="text-slate-500">
                                      {satDays !== null && satDays > 0 ? `in ${satDays}d` : satDays === 0 ? 'Today' : 'Released'}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-4 rounded bg-slate-900/30 border border-slate-800/80 text-center space-y-1.5">
                            <p className="text-xs text-slate-400">
                              Satellites are generated automatically when you run this brief through Auto-Pilot or assign an Anchor drop date.
                            </p>
                            <button
                              onClick={() => {
                                onSelectTopic(topic);
                                onNavigate('module8_growth');
                              }}
                              className="text-xs text-amber-400 hover:underline cursor-pointer font-medium"
                            >
                              Generate 1-to-10 Atomization Plan in Growth Engine &rarr;
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Row 3: Quick Navigation to All Downstream Studios for this Idea */}
                      <div className="p-3.5 rounded-lg bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>Jump straight into production with <strong>{topic.workingTitle}</strong> pre-loaded:</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => {
                              onSelectTopic(topic);
                              onNavigate('module5_scripts');
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3 text-amber-400" />
                            <span>Script Studio</span>
                          </button>

                          <button
                            onClick={() => {
                              onSelectTopic(topic);
                              onNavigate('module6_seo');
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1"
                          >
                            <Search className="w-3 h-3 text-sky-400" />
                            <span>SEO Package</span>
                          </button>

                          <button
                            onClick={() => {
                              onSelectTopic(topic);
                              onNavigate('module7_pinterest');
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1"
                          >
                            <Pin className="w-3 h-3 text-rose-400" />
                            <span>Pinterest Studio</span>
                          </button>

                          <button
                            onClick={() => {
                              onSelectTopic(topic);
                              onNavigate('module8_growth');
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Growth Playbook</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: SCHEDULED TIMELINE (Chronological Calendar Drop Dates)       */}
      {/* ========================================================================= */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>Chronological Drop Schedule for Generated Ideas</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Every scheduled video and its multi-platform satellites sorted by drop date.
                </p>
              </div>
              <button
                onClick={() => onNavigate('module4_calendar')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 transition cursor-pointer"
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Full Calendar View</span>
              </button>
            </div>

            {/* List of items sorted by date */}
            <div className="space-y-3">
              {calendar
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((item, idx) => {
                  const isLongform = item.contentType === 'Long-form Video';
                  const catMeta = getCategoryMeta(item.category);
                  const daysUntil = getDaysUntil(item.date);

                  return (
                    <div 
                      key={item.id || idx}
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                        isLongform 
                          ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20' 
                          : 'bg-slate-900/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-center shrink-0 w-16 bg-[#0A0C10] p-1.5 rounded border border-slate-800">
                          <p className="text-[10px] text-slate-400 uppercase font-mono">{item.dayOfWeek.slice(0, 3)}</p>
                          <p className="text-xs font-bold text-white font-mono">{item.date.slice(5)}</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10px] font-mono px-2 py-0.2 rounded border uppercase font-semibold ${catMeta.bg} ${catMeta.color} ${catMeta.border}`}>
                              {catMeta.label}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.2 rounded border font-medium ${
                              isLongform 
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400' 
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}>
                              {item.contentType}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.platform}
                            </span>
                            {item.festivalOrTithi && (
                              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30">
                                🕉️ {item.festivalOrTithi}
                              </span>
                            )}
                          </div>
                          
                          <p className={`text-xs font-semibold ${isLongform ? 'text-white' : 'text-slate-200'}`}>
                            {item.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 sm:self-center">
                        <span className="text-xs font-mono text-slate-400">
                          {daysUntil !== null && daysUntil > 0 ? `In ${daysUntil} days` : daysUntil === 0 ? 'Drops Today!' : 'Past'}
                        </span>
                        {isLongform && (
                          <button
                            onClick={() => {
                              const foundTopic = topics.find(t => item.title.toLowerCase().includes(t.workingTitle.toLowerCase()));
                              if (foundTopic) onSelectTopic(foundTopic);
                              onNavigate('module5_scripts');
                            }}
                            className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition cursor-pointer"
                          >
                            Open Script
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 3: PRODUCTION MATRIX TABLE                                      */}
      {/* ========================================================================= */}
      {viewMode === 'matrix' && (
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0C10] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Topic / Working Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Vedic Concept</th>
                  <th className="py-3 px-4">Anchor Drop Date</th>
                  <th className="py-3 px-4">Satellites</th>
                  <th className="py-3 px-4">Script Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTopics.map((topic) => {
                  const catMeta = getCategoryMeta(topic.category);
                  const anchorItem = getAnchorItemForTopic(topic);
                  const satellites = getSatellitesForTopic(topic);
                  const isScripted = topic.status === 'scripted';

                  return (
                    <tr key={topic.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3 px-4 font-medium text-white max-w-xs truncate">
                        {topic.workingTitle}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${catMeta.bg} ${catMeta.color} ${catMeta.border}`}>
                          {catMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                        {topic.concept}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {anchorItem ? (
                          <span className="text-emerald-400 font-semibold">
                            {formatDateFriendly(anchorItem.date)}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Unscheduled</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {satellites.length} in orbit
                      </td>
                      <td className="py-3 px-4">
                        {isScripted ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Scripted
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            onSelectTopic(topic);
                            onNavigate('module5_scripts');
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                        >
                          Script
                        </button>
                        <span className="text-slate-700">|</span>
                        <button
                          onClick={() => {
                            onSelectTopic(topic);
                            onNavigate('module6_seo');
                          }}
                          className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                        >
                          SEO
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Assign / Reschedule Anchor Date */}
      {scheduleModalTopic && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0E1116] border border-amber-500/40 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Schedule Anchor Drop Date</h3>
              </div>
              <button
                onClick={() => setScheduleModalTopic(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                Choose the target release date for the anchor YouTube long-form video:
              </p>

              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <p className="text-[10px] font-mono text-slate-500 uppercase">Topic Title</p>
                <p className="text-xs font-semibold text-amber-300">{scheduleModalTopic.workingTitle}</p>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Anchor Drop Date (Sunday Recommended)
                </label>
                <input
                  type="date"
                  value={selectedScheduleDate}
                  onChange={(e) => setSelectedScheduleDate(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] space-y-1">
                <p className="font-semibold">⚡ Automatic 6-Day Orbit Setup:</p>
                <p className="text-slate-300">
                  Setting this anchor date automatically creates Day -2 Pre-launch hype, Day +1 & +3 Instagram Reels, Day +2 Carousel, and Day +4 Pinterest Pins.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setScheduleModalTopic(null)}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleScheduleSubmit}
                className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition cursor-pointer"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Streamlined Idea Explanation -> Auto Create Scripts & Content */}
      {isQuickIdeateOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0E1116] border border-amber-500/40 rounded-xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {generatedResult ? 'Scripts & Content Generated' : 'Explain Your Idea'}
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {generatedResult 
                    ? 'Your topic is scheduled on the calendar and full dual-character scripts are ready.'
                    : 'Just explain your thought or situation in plain words. We’ll automatically build the Vedic grounding, calendar cadence, and complete scripts.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isGeneratingContent) {
                    setIsQuickIdeateOpen(false);
                    setGeneratedResult(null);
                  }
                }}
                disabled={isGeneratingContent}
                className="text-slate-400 hover:text-white text-sm cursor-pointer p-1 rounded hover:bg-slate-800 transition disabled:opacity-30"
              >
                ✕
              </button>
            </div>

            {/* ERROR BANNER */}
            {generationError && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {/* VIEW A: SUCCESS SUMMARY (When scripts & content have been generated) */}
            {generatedResult ? (
              <div className="space-y-4 py-1 animate-in fade-in">
                <div className="p-4 rounded-xl bg-[#07090C] border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Content Package Ready
                    </span>
                    <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                      Friday, {formatDateFriendly(generatedResult.anchorDate)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-2">
                      {generatedResult.topic.workingTitle}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      <span className="text-slate-500 font-mono">Concept:</span> {generatedResult.topic.concept}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>Nakul & Nikhil Script ({generatedResult.scriptPackage?.dialogueScript?.length || 10} exchanges)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>3 High-Voltage Reel Cuts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>Sanskrit Shlok Card Included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>Mon–Thu Reels + Sat–Sun Quora</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopic(generatedResult.topic);
                      setIsQuickIdeateOpen(false);
                      setGeneratedResult(null);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer text-center"
                  >
                    View in Pipeline
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopic(generatedResult.topic);
                      setIsQuickIdeateOpen(false);
                      setGeneratedResult(null);
                      onNavigate('module4_calendar');
                    }}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>View in Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectTopic(generatedResult.topic);
                      setIsQuickIdeateOpen(false);
                      setGeneratedResult(null);
                      onNavigate('module5_scripts');
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-950" />
                    <span>Open Dual Script Studio</span>
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW B: THE FOCUSED FORM (Idea Textarea + Category Indicator) */
              <form onSubmit={handleCreateScriptsFromIdea} className="space-y-4">
                
                {/* 1. THE IDEA BOX */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="idea-box-input" className="block text-xs font-bold text-white tracking-wide">
                      1. Explain Your Idea <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {ideaText.length > 0 ? `${ideaText.length} characters` : 'Describe the situation or emotion'}
                    </span>
                  </div>

                  <textarea
                    id="idea-box-input"
                    required
                    rows={4}
                    disabled={isGeneratingContent}
                    placeholder="Describe what's on your mind, the situation, life problem, or lesson you want to talk about... (e.g., 'People feel intense guilt when they take a break on weekends because they tie self-worth to productivity', or 'Why high achievers freeze in anxiety right after closing their biggest deal')."
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                    className="w-full bg-[#07090C] border border-slate-700/80 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 leading-relaxed resize-none transition"
                  />

                  {/* Spark suggestions */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 font-mono">Need a spark? Click an idea:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isGeneratingContent}
                        onClick={() => {
                          setIdeaText('Why people feel intense guilt when they relax or take a break on weekends because they equate rest with laziness.');
                          setIdeaCategory('emotional_health');
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition cursor-pointer"
                      >
                        Guilt When Resting
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingContent}
                        onClick={() => {
                          setIdeaText('Why closing a massive dream client wire transfer or getting promoted triggers immediate nervous system freeze and imposter panic.');
                          setIdeaCategory('money_business');
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition cursor-pointer"
                      >
                        Success Freeze & Money
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingContent}
                        onClick={() => {
                          setIdeaText('Chronic people-pleasing and inability to say no because of fear of abandonment: The karmic boundary breakdown.');
                          setIdeaCategory('relationships');
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition cursor-pointer"
                      >
                        Boundary Breakdown
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingContent}
                        onClick={() => {
                          setIdeaText('That tight knot in your stomach and throat during 2 PM workday meetings: Somatic nervous system reset vs talk therapy.');
                          setIdeaCategory('mental_health');
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition cursor-pointer"
                      >
                        Workday Somatic Knot
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. WHICH CATEGORY SHOULD IT BE? */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white tracking-wide">
                      2. Which Category Should It Be? <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Indicate the life problem domain
                    </span>
                  </div>

                  <div className="bg-[#07090C] p-2.5 rounded-lg border border-slate-800">
                    <CategorySelect
                      value={ideaCategory}
                      onChange={(val) => setIdeaCategory(val)}
                      disabled={isGeneratingContent}
                      size="md"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    The AI engine will calibrate the script dynamic, Sanskrit shlok selection, and CTA ladder to this category.
                  </p>
                </div>

                {/* PROGRESS BAR & ACTIVE STATUS (When submitting) */}
                {isGeneratingContent && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        Generating Scripts & Cadence...
                      </span>
                      <span className="text-[10px] font-mono text-amber-400/80">
                        Stage {generationStep} of 4
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(100, (generationStep / 4) * 100)}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-300 font-mono">
                      {generationStep === 1 && 'Analyzing idea & formulating authentic Vedic grounding...'}
                      {generationStep === 2 && 'Scheduling weekly cadence (Mon–Thu Reels, Friday Anchor, Sat–Sun Quora)...'}
                      {generationStep === 3 && 'Drafting Nakul & Nikhil Hinglish dialogue & 3 Reel cuts...'}
                      {generationStep >= 4 && 'Packaging YouTube SEO, tags, and multi-channel assets...'}
                    </p>
                  </div>
                )}

                {/* MODAL ACTIONS */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    disabled={isGeneratingContent}
                    onClick={() => setIsQuickIdeateOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    id="submit-idea-create-scripts-btn"
                    disabled={!ideaText.trim() || isGeneratingContent}
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-xs font-bold text-slate-950 transition cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-amber-500/20"
                  >
                    {isGeneratingContent ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Creating Content...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Create Scripts & Content</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
