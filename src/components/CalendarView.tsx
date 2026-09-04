import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Filter, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  ArrowRight,
  Youtube,
  Share2,
  LayoutGrid,
  ListFilter,
  Check
} from 'lucide-react';
import { CalendarItem, TopicIdea, LifeProblemCategory } from '../types';
import { HINDU_CALENDAR_EVENTS, CATEGORY_LABELS } from '../data/sanatanCalendar';
import { FlowFooterBar } from './FlowFooterBar';
import { ActiveModule } from './Navbar';

interface CalendarViewProps {
  calendar: CalendarItem[];
  topics: TopicIdea[];
  activeTopic?: TopicIdea | null;
  onAddCalendarItem: (item: CalendarItem) => void;
  onUpdateCalendarItem: (item: CalendarItem) => void;
  onSelectTopicForScript: (title: string, cat: LifeProblemCategory) => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  calendar,
  topics,
  activeTopic,
  onAddCalendarItem,
  onUpdateCalendarItem,
  onSelectTopicForScript,
  onNavigate
}) => {
  const [selectedMonth, setSelectedMonth] = useState('September');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'sprints' | 'chronological'>('sprints');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-09-15');
  const [newPlatform, setNewPlatform] = useState<any>('Instagram/Facebook');
  const [newType, setNewType] = useState<any>('Short/Reel');
  const [newCat, setNewCat] = useState<LifeProblemCategory>('relationships');
  const [newNotes, setNewNotes] = useState('');
  const [newParentLongformId, setNewParentLongformId] = useState('');

  // Category percentage calculation (<40% rule)
  const categoryCounts: Record<string, number> = {
    relationships: 0,
    money_business: 0,
    mental_health: 0,
    physical_health: 0,
    emotional_health: 0,
  };

  calendar.forEach((item) => {
    if (categoryCounts[item.category] !== undefined) {
      categoryCounts[item.category]++;
    }
  });

  const totalItems = calendar.length || 1;
  const categoryBreakdown = Object.entries(categoryCounts).map(([cat, count]) => {
    const percent = Math.round((count / totalItems) * 100);
    return {
      category: cat,
      label: CATEGORY_LABELS[cat]?.label || cat,
      count,
      percent,
      isViolating: percent > 40
    };
  });

  const hasViolation = categoryBreakdown.some(c => c.isViolating);

  // Long-form anchors in calendar
  const allAnchors = calendar.filter(item => item.contentType === 'Long-form Video');

  // Defined Weekly Sprints (September 2026)
  // Cadence Rule: Exactly 1 Long-form YouTube Video per week, rest are Reels, Carousels, Pins, Community
  const SPRINT_CONFIGS = [
    {
      weekNum: 1,
      name: 'Week 1 Sprint',
      dateRange: 'Sep 04 – Sep 12',
      startDate: '2026-09-04',
      endDate: '2026-09-12',
      coreTheme: 'Financial Freeze & Root Chakra (Muladhara)'
    },
    {
      weekNum: 2,
      name: 'Week 2 Sprint',
      dateRange: 'Sep 13 – Sep 19',
      startDate: '2026-09-13',
      endDate: '2026-09-19',
      coreTheme: 'Nocturnal 3am Panic & Vata-Heart Reset'
    },
    {
      weekNum: 3,
      name: 'Week 3 Sprint',
      dateRange: 'Sep 20 – Sep 26',
      startDate: '2026-09-20',
      endDate: '2026-09-26',
      coreTheme: 'Relationship Ancestral Debt & Caregiver Trap'
    },
    {
      weekNum: 4,
      name: 'Week 4 Sprint',
      dateRange: 'Sep 27 – Oct 03',
      startDate: '2026-09-27',
      endDate: '2026-10-03',
      coreTheme: 'Corporate Burnout & Bhagavad Gita Svadharma'
    }
  ];

  const sprints = SPRINT_CONFIGS.map(cfg => {
    const itemsInWeek = calendar.filter(item => item.date >= cfg.startDate && item.date <= cfg.endDate);
    const anchorsInWeek = itemsInWeek.filter(item => item.contentType === 'Long-form Video');
    const derivativesInWeek = itemsInWeek.filter(item => item.contentType !== 'Long-form Video');
    const isCompliant = anchorsInWeek.length === 1;
    const isOverProducing = anchorsInWeek.length > 1;

    return {
      ...cfg,
      items: itemsInWeek,
      anchor: anchorsInWeek[0] || null,
      allAnchorsInWeek: anchorsInWeek,
      derivatives: derivativesInWeek,
      isCompliant,
      isOverProducing,
      reelsCount: derivativesInWeek.filter(d => d.contentType === 'Short/Reel').length,
      carouselsCount: derivativesInWeek.filter(d => d.contentType === 'Carousel').length,
      pinsCount: derivativesInWeek.filter(d => d.contentType === 'Pinterest Pin').length,
      otherCount: derivativesInWeek.filter(d => !['Short/Reel', 'Carousel', 'Pinterest Pin'].includes(d.contentType)).length,
    };
  });

  const totalCompliantSprints = sprints.filter(s => s.isCompliant).length;
  const isOverallCadenceCompliant = totalCompliantSprints === sprints.length;

  // Filtered calendar items
  const filteredItems = calendar.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesStatus && matchesCat;
  }).sort((a, b) => a.date.localeCompare(b.date));

  // Tithis for current month
  const monthEvents = HINDU_CALENDAR_EVENTS.filter(e => e.date.startsWith('2026-09'));

  // Quick AI Generate Calendar
  const handleGenerateMonthCalendar = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/calendar/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: selectedMonth,
          year: selectedYear,
          selectedTopics: topics.slice(0, 8).map(t => ({ title: t.workingTitle, cat: t.category }))
        })
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        data.data.forEach((item: CalendarItem) => onAddCalendarItem(item));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: CalendarItem = {
      id: `cal-${Date.now()}`,
      date: newDate,
      dayOfWeek: new Date(newDate).toLocaleDateString('en-US', { weekday: 'long' }),
      platform: newPlatform,
      contentType: newType,
      title: newTitle,
      category: newCat,
      status: 'Idea',
      notes: newNotes,
      parentLongformId: newParentLongformId || undefined
    };

    onAddCalendarItem(newItem);
    setShowAddModal(false);
    setNewTitle('');
    setNewNotes('');
  };

  const openAddSatelliteModal = (pillarId?: string, defaultCat?: LifeProblemCategory, defaultDate?: string) => {
    if (pillarId) setNewParentLongformId(pillarId);
    if (defaultCat) setNewCat(defaultCat);
    if (defaultDate) setNewDate(defaultDate);
    setNewType('Short/Reel');
    setNewPlatform('Instagram/Facebook');
    setShowAddModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs rounded">
            M4
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-tight text-white">
              Module 4: <span className="text-amber-500 font-normal">Content Calendar & Sprint Pacing</span>
            </h1>
            <p className="text-xs text-slate-500">
              Weekly Cadence: 1 Anchor YouTube Video/week • 6 Repurposed Satellites (Reels/Carousels/Pins) • Tithi Alignment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setNewParentLongformId('');
              setShowAddModal(true);
            }}
            className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            Schedule Item
          </button>
          <button
            onClick={handleGenerateMonthCalendar}
            disabled={isGenerating}
            className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Aligning Tithis...' : 'AI Full Month Auto-Pacing'}
          </button>
        </div>
      </div>

      {/* Cadence Health Monitor Banner */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-white">
                Cadence Rule: 1 Long YouTube Video / Week
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                isOverallCadenceCompliant 
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/70'
                  : 'bg-amber-950/60 text-amber-400 border-amber-800/70'
              }`}>
                {isOverallCadenceCompliant ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {totalCompliantSprints}/4 Sprints Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plan exactly 1 high-gravity pillar YouTube video per week. The remaining 6 days are populated exclusively with repurposed satellites (Instagram Reels, Carousels, Pinterest Pins) that funnel audience back to that anchor.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-1 self-start md:self-center shrink-0">
            <button
              onClick={() => setViewMode('sprints')}
              className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'sprints'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Weekly Sprints
            </button>
            <button
              onClick={() => setViewMode('chronological')}
              className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'chronological'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              Chronological ({filteredItems.length})
            </button>
          </div>
        </div>

        {/* Sprint Status Micro-bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {sprints.map((sp) => {
            const hasPillar = Boolean(sp.anchor);
            return (
              <div 
                key={sp.weekNum}
                className={`p-3 rounded border text-xs ${
                  sp.isCompliant 
                    ? 'bg-slate-900/50 border-slate-800'
                    : sp.isOverProducing 
                    ? 'bg-red-950/20 border-red-800/60'
                    : 'bg-amber-950/20 border-amber-800/60'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-semibold text-slate-200">W{sp.weekNum}: {sp.dateRange}</span>
                  {sp.isCompliant ? (
                    <span className="text-emerald-400 flex items-center gap-0.5 text-[10px]">
                      <Check className="w-3 h-3" /> 1 Anchor
                    </span>
                  ) : sp.isOverProducing ? (
                    <span className="text-red-400 text-[10px] font-bold">
                      {sp.allAnchorsInWeek.length} Anchors (Over-budget)
                    </span>
                  ) : (
                    <span className="text-amber-400 text-[10px]">
                      0 Anchors (Missing)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 truncate mb-1">
                  {hasPillar ? sp.anchor?.title : 'No Pillar Scheduled'}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span>{sp.reelsCount} Reels</span>
                  <span>•</span>
                  <span>{sp.carouselsCount} Carousels</span>
                  <span>•</span>
                  <span>{sp.pinsCount} Pins</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial Balance Guard & Rules Compliance */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            Monthly Category Balance Meter (Max 40% per category)
          </span>
          {hasViolation ? (
            <span className="text-[11px] font-medium text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Imbalance Alert (&gt;40%)
            </span>
          ) : (
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Balanced (&lt;40% each)
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
          {categoryBreakdown.map((item) => (
            <div 
              key={item.category}
              className={`p-3 rounded border text-xs ${
                item.isViolating ? 'bg-red-950/30 border-red-800/80' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-200 truncate">{item.label}</span>
                <span className={`font-mono font-bold ${item.isViolating ? 'text-red-400' : 'text-amber-400'}`}>
                  {item.percent}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${item.isViolating ? 'bg-red-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, item.percent * 2.5)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500 block mt-1.5">{item.count} scheduled items</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hindu Calendar Tithi Strip for Current Month */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-300">
            Verified Astrological & Tithi Milestones (September 2026)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Dates pre-verified with Hindu ephemeris
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {monthEvents.map((evt) => (
            <div 
              key={evt.date}
              className="shrink-0 w-64 bg-slate-900/80 border border-slate-800 rounded p-3 text-xs"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  {evt.date}
                </span>
                <span className="text-slate-400">{evt.tithi}</span>
              </div>
              <h4 className="font-semibold text-white truncate">{evt.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{evt.significance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPRINT VIEW MODE */}
      {viewMode === 'sprints' && (
        <div className="space-y-6">
          {sprints.map((sprint) => {
            const anchor = sprint.anchor;
            const anchorCatBadge = anchor ? CATEGORY_LABELS[anchor.category] : null;

            return (
              <div 
                key={sprint.weekNum}
                className="bg-[#0E1116] border border-slate-800 rounded-lg overflow-hidden shadow-xs"
              >
                {/* Sprint Header */}
                <div className="bg-slate-900/80 border-b border-slate-800 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold">
                      {sprint.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {sprint.dateRange}
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden md:inline">
                      • {sprint.coreTheme}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400">
                      Satellites: <strong className="text-slate-200">{sprint.derivatives.length}</strong> (Reels, Carousels, Pins)
                    </span>
                    <button
                      onClick={() => openAddSatelliteModal(anchor?.id, anchor?.category, sprint.startDate)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add Satellite
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* The Weekly Pillar (Long-Form YouTube Anchor) */}
                  <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold flex items-center gap-1">
                          <Youtube className="w-3 h-3" />
                          WEEKLY PILLAR ANCHOR (YOUTUBE)
                        </span>
                        {anchorCatBadge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-amber-300">
                            {anchorCatBadge.label}
                          </span>
                        )}
                        {anchor?.festivalOrTithi && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                            {anchor.festivalOrTithi}
                          </span>
                        )}
                      </div>

                      {anchor && (
                        <div className="flex items-center gap-2">
                          <select
                            value={anchor.status}
                            onChange={(e) => onUpdateCalendarItem({ ...anchor, status: e.target.value as any })}
                            className="text-xs font-mono font-semibold px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-300 cursor-pointer"
                          >
                            <option value="Idea">Idea</option>
                            <option value="Scripted">Scripted</option>
                            <option value="Shot">Shot</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Live">Live</option>
                          </select>
                          <button
                            onClick={() => onSelectTopicForScript(anchor.title, anchor.category)}
                            className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer shadow-xs"
                          >
                            Open HSTSS Script <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {anchor ? (
                      <div className="space-y-1.5 mt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-mono text-amber-400 font-bold">
                            {anchor.date} ({anchor.dayOfWeek}):
                          </span>
                          <h3 className="font-semibold text-white text-sm sm:text-base">
                            {anchor.title}
                          </h3>
                        </div>
                        {anchor.notes && (
                          <p className="text-xs text-slate-400 leading-relaxed pl-1 border-l-2 border-amber-500/40">
                            {anchor.notes}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs text-amber-400/80">
                        No YouTube Anchor scheduled for this sprint yet. Click "Schedule Item" to assign this week's long-form pillar.
                      </div>
                    )}
                  </div>

                  {/* Satellite Repurposed Assets for the Week */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-amber-400" />
                        Repurposed Satellite Satellites for the Week ({sprint.derivatives.length})
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Funnel: Drive all traffic back to YouTube Pillar Anchor
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {sprint.derivatives.map((sat) => {
                        const isReel = sat.contentType === 'Short/Reel';
                        const isCarousel = sat.contentType === 'Carousel';
                        const isPin = sat.contentType === 'Pinterest Pin';
                        const isHype = sat.contentType === 'Pre-Launch Hype';

                        return (
                          <div 
                            key={sat.id}
                            className="p-3 rounded border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 transition flex flex-col justify-between gap-2 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className={`px-1.5 py-0.5 rounded font-medium ${
                                  isReel ? 'bg-pink-950/60 text-pink-300 border border-pink-800/60' :
                                  isCarousel ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60' :
                                  isPin ? 'bg-red-950/60 text-red-300 border border-red-800/60' :
                                  isHype ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60' :
                                  'bg-slate-800 text-slate-300'
                                }`}>
                                  {sat.contentType}
                                </span>
                                <span className="text-slate-400">
                                  {sat.date.slice(5)} ({sat.dayOfWeek.slice(0, 3)})
                                </span>
                              </div>

                              <h4 className="font-medium text-slate-200 line-clamp-2 pt-0.5">
                                {sat.title}
                              </h4>

                              {sat.notes && (
                                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                  {sat.notes}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px]">
                              <span className="text-slate-500 font-mono">
                                {sat.platform}
                              </span>
                              <select
                                value={sat.status}
                                onChange={(e) => onUpdateCalendarItem({ ...sat, status: e.target.value as any })}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900 text-slate-300 cursor-pointer"
                              >
                                <option value="Idea">Idea</option>
                                <option value="Scripted">Scripted</option>
                                <option value="Shot">Shot</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Live">Live</option>
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CHRONOLOGICAL VIEW MODE */}
      {viewMode === 'chronological' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0E1116] p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Filter Status:</span>
                <select
                  id="calendar-status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-2 py-1 rounded border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer focus:outline-hidden focus:border-amber-500"
                >
                  <option value="all" className="bg-[#0E1116]">All Statuses</option>
                  <option value="Idea" className="bg-[#0E1116]">Idea</option>
                  <option value="Scripted" className="bg-[#0E1116]">Scripted</option>
                  <option value="Shot" className="bg-[#0E1116]">Shot</option>
                  <option value="Scheduled" className="bg-[#0E1116]">Scheduled</option>
                  <option value="Live" className="bg-[#0E1116]">Live</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Category:</span>
                <select
                  id="calendar-category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs px-2 py-1 rounded border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer focus:outline-hidden focus:border-amber-500"
                >
                  <option value="all" className="bg-[#0E1116]">All Categories</option>
                  <option value="relationships" className="bg-[#0E1116]">Relationships</option>
                  <option value="money_business" className="bg-[#0E1116]">Money & Business</option>
                  <option value="mental_health" className="bg-[#0E1116]">Mental Health</option>
                  <option value="physical_health" className="bg-[#0E1116]">Physical Health</option>
                  <option value="emotional_health" className="bg-[#0E1116]">Emotional Health</option>
                </select>
              </div>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-amber-400">{filteredItems.length}</strong> scheduled assets
            </span>
          </div>

          {/* Calendar List View */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const catBadge = CATEGORY_LABELS[item.category] || { label: item.category, color: 'text-slate-300', bg: 'bg-slate-800', border: 'border-slate-700' };
              const isAnchor = item.contentType === 'Long-form Video';
              const isHype = item.contentType === 'Pre-Launch Hype';

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg border transition flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs ${
                    isAnchor ? 'bg-[#0E1116] border-slate-800 border-l-2 border-l-amber-500' :
                    isHype ? 'bg-[#0E1116] border-slate-800 border-l-2 border-l-amber-300/60' :
                    'bg-[#0E1116] border-slate-800'
                  }`}
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Date Badge */}
                    <div className="text-center w-16 p-2 rounded bg-slate-900 border border-slate-800 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-amber-400 block">
                        {item.dayOfWeek.slice(0, 3)}
                      </span>
                      <span className="text-base font-mono font-bold text-white">
                        {item.date.split('-')[2]}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {item.date.split('-')[1] === '09' ? 'Sep' : 'Oct'}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isAnchor ? 'bg-amber-600 text-white font-medium' :
                          isHype ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {item.platform}: {item.contentType}
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-800/80 text-amber-300">
                          {catBadge.label}
                        </span>

                        {item.festivalOrTithi && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                            {item.festivalOrTithi}
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-white text-sm md:text-base">
                        {item.title}
                      </h3>

                      {item.notes && (
                        <p className="text-xs text-slate-400">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateCalendarItem({ ...item, status: e.target.value as any })}
                      className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded border cursor-pointer ${
                        item.status === 'Live' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' :
                        item.status === 'Scheduled' ? 'bg-blue-950/60 text-blue-400 border-blue-800' :
                        item.status === 'Shot' ? 'bg-amber-950/60 text-amber-400 border-amber-800' :
                        item.status === 'Scripted' ? 'bg-purple-950/60 text-purple-400 border-purple-800' :
                        'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      <option value="Idea" className="bg-[#0E1116]">Idea</option>
                      <option value="Scripted" className="bg-[#0E1116]">Scripted</option>
                      <option value="Shot" className="bg-[#0E1116]">Shot</option>
                      <option value="Scheduled" className="bg-[#0E1116]">Scheduled</option>
                      <option value="Live" className="bg-[#0E1116]">Live</option>
                    </select>

                    {isAnchor && (
                      <button
                        onClick={() => onSelectTopicForScript(item.title, item.category)}
                        className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer shadow-xs"
                      >
                        HSTSS Script <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Schedule Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0E1116] rounded-lg max-w-md w-full p-6 shadow-xl border border-slate-800 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-sm text-slate-200">
                Schedule New Content Asset
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-white text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Title / Working Headline:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Stop Letting Unresolved Debt Drain Your Throat Chakra"
                  className="w-full p-2.5 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Date:</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Category:</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full p-2 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="relationships" className="bg-[#0E1116]">Relationships</option>
                    <option value="money_business" className="bg-[#0E1116]">Money & Business</option>
                    <option value="mental_health" className="bg-[#0E1116]">Mental Health</option>
                    <option value="physical_health" className="bg-[#0E1116]">Physical Health</option>
                    <option value="emotional_health" className="bg-[#0E1116]">Emotional Health</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Platform:</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as any)}
                    className="w-full p-2 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="YouTube" className="bg-[#0E1116]">YouTube</option>
                    <option value="Instagram/Facebook" className="bg-[#0E1116]">Instagram/Facebook</option>
                    <option value="Pinterest" className="bg-[#0E1116]">Pinterest</option>
                    <option value="Meta/Stories" className="bg-[#0E1116]">Meta/Stories</option>
                    <option value="Quora/Reddit" className="bg-[#0E1116]">Quora/Reddit</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Content Type:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="Short/Reel" className="bg-[#0E1116]">Short/Reel (Satellite)</option>
                    <option value="Carousel" className="bg-[#0E1116]">Carousel (Satellite)</option>
                    <option value="Pinterest Pin" className="bg-[#0E1116]">Pinterest Pin (Satellite)</option>
                    <option value="Pre-Launch Hype" className="bg-[#0E1116]">Pre-Launch Hype</option>
                    <option value="Community Q&A" className="bg-[#0E1116]">Community Q&A</option>
                    <option value="Long-form Video" className="bg-[#0E1116]">Long-form Video (Weekly Pillar)</option>
                  </select>
                </div>
              </div>

              {newType !== 'Long-form Video' && (
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Parent Long-form Anchor (Funnel Target):</label>
                  <select
                    value={newParentLongformId}
                    onChange={(e) => setNewParentLongformId(e.target.value)}
                    className="w-full p-2 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="" className="bg-[#0E1116]">None / General</option>
                    {allAnchors.map((anc) => (
                      <option key={anc.id} value={anc.id} className="bg-[#0E1116]">
                        {anc.date} • {anc.title.slice(0, 48)}...
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Repurposing / Production Notes:</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Notes on CTA ladder, script angles, or editorial reminders..."
                  className="w-full p-2.5 border border-slate-800 bg-slate-900 rounded text-slate-200 text-xs focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded border border-slate-700 bg-slate-800 text-slate-300 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs cursor-pointer shadow-xs"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unified Pipeline Bottom Navigation */}
      <FlowFooterBar
        currentStep={2}
        stepName="Editorial Calendar & Pacing"
        activeTopicTitle={activeTopic?.workingTitle}
        isStepComplete={true}
        prevModule="module3_topics"
        prevLabel="Step 1: Topic Studio"
        nextModule="module5_scripts"
        nextLabel="Step 3: HSTSS Script Studio"
        onNavigate={(mod) => {
          if (onNavigate) onNavigate(mod);
          else if (mod === 'module5_scripts' && activeTopic) {
            onSelectTopicForScript(activeTopic.workingTitle, activeTopic.category);
          }
        }}
        onPrimaryAction={() => {
          if (activeTopic) onSelectTopicForScript(activeTopic.workingTitle, activeTopic.category);
        }}
        primaryActionLabel="Proceed to Write HSTSS Script"
      />
    </div>
  );
};
