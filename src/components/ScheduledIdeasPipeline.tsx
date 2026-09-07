import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Youtube, 
  Instagram, 
  Pin, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  Brain, 
  Layers, 
  ChevronRight,
  Share2,
  BookOpen
} from 'lucide-react';
import { TopicIdea, CalendarItem, LifeProblemCategory } from '../types';
import { CATEGORY_LABELS } from '../data/sanatanCalendar';
import { ActiveModule } from './Navbar';
import { CategorySelect } from './CategorySelect';
import { useCategories } from '../context/CategoryContext';

interface ScheduledIdeasPipelineProps {
  topics: TopicIdea[];
  calendar: CalendarItem[];
  onSelectTopicForScript?: (topic: TopicIdea) => void;
  onNavigate: (module: ActiveModule) => void;
}

export const ScheduledIdeasPipeline: React.FC<ScheduledIdeasPipelineProps> = ({
  topics,
  calendar,
  onSelectTopicForScript,
  onNavigate
}) => {
  const { getCategoryMeta } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

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

    // Fallback: search for longform matching category or title words
    return items[0] || null;
  };

  const filteredTopics = topics.filter(t => {
    const matchesSearch = searchQuery === '' || 
      t.workingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.hook.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scheduledCount = topics.filter(t => Boolean(getAnchorItemForTopic(t))).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0E1116] border border-amber-500/30 rounded-lg p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono tracking-wider text-amber-400 uppercase font-semibold">
                Generated Ideas & Calendar Pipeline
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {scheduledCount} of {topics.length} Ideas Scheduled
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Where Your Ideas Are Scheduled & When They Drop
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every idea generated through Auto-Pilot or Topic Studio is mapped to a Friday YouTube anchor slot and organized into a weekly orbit (Mon–Thu anticipation Reels, Friday YouTube release, and Sat–Sun Quora marketing).
            </p>
          </div>

          {/* Action to Calendar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('module4_calendar')}
              className="px-4 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Open Full Calendar Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search generated ideas by title, shlok concept, or hook..."
            className="w-full bg-slate-900 border border-slate-800 rounded pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 min-w-[200px]">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            includeAllOption
            allLabel={`All Categories (${topics.length})`}
            size="sm"
            containerClassName="w-auto min-w-[180px]"
          />
        </div>
      </div>

      {/* Ideas Pipeline Grid */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center bg-[#0E1116] border border-slate-800 rounded-lg space-y-3">
            <p className="text-sm text-slate-400">No generated ideas match your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const catMeta = getCategoryMeta(topic.category);
            const topicCalendarItems = getCalendarItemsForTopic(topic);
            const anchorItem = getAnchorItemForTopic(topic);
            const isExpanded = expandedTopicId === topic.id;
            const satelliteItems = topicCalendarItems.filter(i => i.id !== anchorItem?.id);

            return (
              <div
                key={topic.id}
                className="bg-[#0E1116] border border-slate-800 hover:border-slate-700/80 rounded-lg p-5 space-y-4 transition shadow-md"
              >
                {/* Topic Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${catMeta.bg} ${catMeta.color} ${catMeta.border}`}>
                        {catMeta.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Concept: <span className="text-amber-300 font-semibold">{topic.concept}</span>
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        topic.status === 'scripted'
                          ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60'
                          : 'bg-amber-950/70 text-amber-400 border-amber-800/60'
                      }`}>
                        {topic.status === 'scripted' ? '✓ Scripted & In Calendar' : 'In Ideation'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {topic.workingTitle}
                    </h3>

                    {topic.hook && (
                      <p className="text-xs text-slate-400 line-clamp-2 italic">
                        "{topic.hook}"
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (onSelectTopicForScript) onSelectTopicForScript(topic);
                        onNavigate('module5_scripts');
                      }}
                      className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Script Studio</span>
                    </button>
                    <button
                      onClick={() => onNavigate('module4_calendar')}
                      className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>View in Calendar</span>
                    </button>
                    <button
                      onClick={() => onNavigate('module6_seo')}
                      className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-medium transition cursor-pointer"
                      title="SEO Packaging"
                    >
                      <span>SEO</span>
                    </button>
                    <button
                      onClick={() => onNavigate('module7_pinterest')}
                      className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-medium transition cursor-pointer"
                      title="Pinterest Visuals"
                    >
                      <span>Pins</span>
                    </button>
                  </div>
                </div>

                {/* Where & When Is It Scheduled: Anchor Video Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Anchor Slot */}
                  <div className="md:col-span-2 p-3.5 rounded-lg bg-slate-900/90 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Anchor YouTube Video Schedule
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
                        Cadence: Primary Weekly Pillar
                      </span>
                    </div>

                    {anchorItem ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-amber-400 font-mono">
                              🗓️ {anchorItem.date}
                            </span>
                            <span className="text-xs text-slate-300 font-medium">
                              ({anchorItem.dayOfWeek || 'Friday'})
                            </span>
                          </div>
                          <span className="text-xs text-slate-300 block">
                            Format: YouTube Long-Form (12-15 min) • Status: {anchorItem.status}
                          </span>
                        </div>

                        {anchorItem.festivalOrTithi && (
                          <div className="text-right sm:text-right">
                            <span className="text-[10px] font-mono text-slate-400 block">Cosmic Alignment:</span>
                            <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded inline-block">
                              {anchorItem.festivalOrTithi}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-2 text-xs text-slate-400 flex items-center justify-between">
                        <span>Not yet assigned an exact date slot.</span>
                        <button
                          onClick={() => onNavigate('module4_calendar')}
                          className="text-amber-400 hover:underline font-semibold"
                        >
                          Assign in Calendar &rarr;
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Satellite Repurposing Count */}
                  <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        6-Day Satellite Orbit
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold text-white">
                          {satelliteItems.length > 0 ? satelliteItems.length : '6 Planned'}
                        </span>
                        <span className="text-xs text-slate-400">Satellites Funneling to Anchor</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition cursor-pointer self-start"
                    >
                      <span>{isExpanded ? 'Hide satellite schedule' : 'View all satellite drop dates'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Satellite Schedule Breakdown */}
                {isExpanded && (
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
                        Scheduled Satellite Drop Sequence (Funnel to Anchor):
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {satelliteItems.length} Content Drops
                      </span>
                    </div>

                    {satelliteItems.length === 0 ? (
                      <div className="text-xs text-slate-400 py-3 text-center">
                        Satellites will be generated when Auto-Pilot runs for this topic, or you can add them manually from Calendar.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {satelliteItems.map((sat) => (
                          <div
                            key={sat.id}
                            className="p-2.5 rounded bg-slate-900 border border-slate-800/90 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-amber-400 font-bold text-[11px]">
                                {sat.date}
                              </span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                sat.platform === 'Quora' || sat.contentType === 'Quora Marketing'
                                  ? 'bg-red-950/70 text-red-300 border border-red-800/60'
                                  : sat.contentType === 'Short/Reel'
                                  ? 'bg-pink-950/60 text-pink-300 border border-pink-800/60'
                                  : 'text-slate-400 bg-slate-800'
                              }`}>
                                {sat.platform}
                              </span>
                            </div>
                            <h4 className="font-medium text-slate-200 line-clamp-1">{sat.title}</h4>
                            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                              <span className={sat.contentType === 'Quora Marketing' ? 'text-red-400 font-medium' : ''}>
                                {sat.contentType}
                              </span>
                              <span className="text-emerald-400">✓ In Orbit</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
