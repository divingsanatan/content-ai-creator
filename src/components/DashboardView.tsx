import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Compass, 
  Zap,
  Lightbulb,
  FileText,
  Search,
  Pin,
  Clock,
  Play,
  Share2,
  BookOpen
} from 'lucide-react';
import { 
  TopicIdea, 
  CalendarItem, 
  PerformanceFeedbackLog, 
  LearningSystemState,
  ScriptPackage,
  SEOPackage,
  PinterestPackage,
  GrowthPlaybook
} from '../types';
import { HINDU_CALENDAR_EVENTS, CATEGORY_LABELS } from '../data/sanatanCalendar';
import { ActiveModule } from './Navbar';
import { useCategories } from '../context/CategoryContext';

interface DashboardViewProps {
  topics: TopicIdea[];
  calendar: CalendarItem[];
  feedbackLogs: PerformanceFeedbackLog[];
  learningState: LearningSystemState;
  activeTopic: TopicIdea | null;
  stepStatus: {
    ideation: boolean;
    calendar: boolean;
    script: boolean;
    seo: boolean;
    pinterest: boolean;
    growth: boolean;
  };
  scriptPackage: ScriptPackage | null;
  seoPackage: SEOPackage | null;
  pinterestPackage: PinterestPackage | null;
  growthPlaybook: GrowthPlaybook | null;
  onNavigate: (module: ActiveModule) => void;
  onSelectTopic: (topic: TopicIdea) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  calendar,
  feedbackLogs,
  learningState,
  activeTopic,
  stepStatus,
  scriptPackage,
  seoPackage,
  pinterestPackage,
  growthPlaybook,
  onNavigate,
  onSelectTopic
}) => {
  const { categories, getCategoryMeta } = useCategories();

  // Category distribution calculation for <40% rule compliance (dynamically includes custom categories)
  const categoryCounts: Record<string, number> = {};
  categories.forEach((cat) => {
    categoryCounts[cat.id] = 0;
  });

  calendar.forEach((item) => {
    if (categoryCounts[item.category] !== undefined) {
      categoryCounts[item.category]++;
    } else {
      categoryCounts[item.category] = 1;
    }
  });

  const totalCalendarItems = calendar.length || 1;
  const categoryChartData = Object.entries(categoryCounts).map(([cat, count]) => {
    const percent = Math.round((count / totalCalendarItems) * 100);
    const meta = getCategoryMeta(cat);
    return {
      category: cat,
      label: meta.label,
      count,
      percent,
      color: meta.chartColor || '#F59E0B'
    };
  });

  const categoryViolation = categoryChartData.find(c => c.percent > 40);

  // Next 3 upcoming astrological dates
  const todayStr = '2026-09-03';
  const upcomingEvents = HINDU_CALENDAR_EVENTS.filter(e => e.date >= todayStr).slice(0, 3);

  // Performance data for bar chart
  const perfChartData = feedbackLogs.map(log => ({
    name: log.contentTitle.length > 20 ? log.contentTitle.slice(0, 18) + '...' : log.contentTitle,
    ctr: log.ctrPercent,
    retention: log.avgWatchTimePercent,
    views: Math.round(log.views / 1000)
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Active Content Creation Flow Pipeline Hub */}
      <div className="bg-[#0E1116] border border-amber-500/30 rounded-lg p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-5">
          {/* Header of Flow */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Active Production Cycle
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {Object.values(stepStatus).filter(Boolean).length} of 6 Stages Complete
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight flex items-center gap-2">
                <span>{activeTopic?.workingTitle || 'Select a Topic to Start Flow'}</span>
              </h2>
              {activeTopic && (
                <p className="text-xs text-slate-400 mt-1">
                  Category: <span className="text-amber-400 font-medium capitalize">{getCategoryMeta(activeTopic.category).label}</span> • 
                  Hook: <span className="italic text-slate-300">"{activeTopic.hook}"</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                id="dashboard-autopilot-btn"
                onClick={() => onNavigate('auto_pilot')}
                className="px-3.5 py-2 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
                title="Input a brief, AI will schedule, script, and package everything"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>⚡ Auto-Pilot Flow</span>
              </button>

              <button
                onClick={() => onNavigate('module3_topics')}
                className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Change / New Topic</span>
              </button>

              <button
                onClick={() => {
                  if (!stepStatus.calendar) onNavigate('module4_calendar');
                  else if (!stepStatus.script) onNavigate('module5_scripts');
                  else if (!stepStatus.seo) onNavigate('module6_seo');
                  else if (!stepStatus.pinterest) onNavigate('module7_pinterest');
                  else if (!stepStatus.growth) onNavigate('module8_growth');
                  else onNavigate('module5_scripts');
                }}
                className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
              >
                <span>Continue Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Auto-Pilot Quick-Launch Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Autonomous Brief-to-Execution Pipeline</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">Auto-Pilot</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Have a topic idea or client observation? Drop a brief and AI will automatically find the best calendar slot, align Hindu tithis, schedule the 6-day satellite orbit, and generate the complete Nakul & Nikhil Hinglish dual script.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('auto_pilot')}
              className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
            >
              <span>Launch Auto-Pilot Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Connected 6-Stage Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Step 1 */}
            <div 
              onClick={() => onNavigate('module3_topics')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.ideation 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 1</span>
                  {stepStatus.ideation ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  Ideation & Research
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  Mode A 20-batch or Mode B deep Upanishadic grounding.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-emerald-400 font-medium">Topic Selected</span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => onNavigate('module4_calendar')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.calendar 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 2</span>
                  {stepStatus.calendar ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  Calendar & Pacing
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  Tithi alignment & 40% category limit verification.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className={stepStatus.calendar ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                  {stepStatus.calendar ? 'Scheduled' : 'Pacing Set'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => onNavigate('module5_scripts')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.script 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 3</span>
                  {stepStatus.script ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  HSTSS Script Studio
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  12-15m Anchor script, Teleprompter & 60s short.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className={stepStatus.script ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {stepStatus.script ? 'Drafted (HSTSS)' : 'Not Started'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => onNavigate('module6_seo')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.seo 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 4</span>
                  {stepStatus.seo ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  YouTube SEO & Pack
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  5 problem titles, 15 tags & thumbnail text triggers.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className={stepStatus.seo ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {stepStatus.seo ? 'Packaged (5 Titles)' : 'Pending'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 5 */}
            <div 
              onClick={() => onNavigate('module7_pinterest')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.pinterest 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 5</span>
                  {stepStatus.pinterest ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  Pinterest Studio
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  3 vertical 2:3 pins with Midjourney prompts & overlays.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className={stepStatus.pinterest ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {stepStatus.pinterest ? '3 Pins Formulated' : 'Pending'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Step 6 */}
            <div 
              onClick={() => onNavigate('module8_growth')}
              className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col justify-between group ${
                stepStatus.growth 
                  ? 'bg-[#121620] border-amber-500/30 hover:border-amber-500/60' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 6</span>
                  {stepStatus.growth ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition">
                  Launch & Learn
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  1-to-10 syndication, A/B tests & AI feedback loop.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className={stepStatus.growth ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                  {stepStatus.growth ? 'Playbook Active' : 'Pending'}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Astrological/Festival Opportunities */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-slate-200">
              Next Astrological Search-Spike Dates (Verified Calendar)
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-400/80">
            Automatic Tithi Alignment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((evt) => (
            <div 
              key={evt.date}
              className="bg-slate-900/50 border border-slate-800 rounded p-4 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[11px]">
                    {evt.date}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    Verified Tithi
                  </span>
                </div>
                <h3 className="font-medium text-white text-sm mt-1 tracking-tight">{evt.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{evt.significance}</p>
                <div className="mt-3 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-800">
                  <strong className="font-semibold text-amber-400 text-[11px] block mb-0.5">Suggested Angle:</strong> {evt.suggestedAngle}
                </div>
              </div>
              <button
                onClick={() => onNavigate('module3_topics')}
                className="mt-3 text-xs text-amber-400 font-semibold flex items-center gap-1 hover:text-amber-300 transition cursor-pointer pt-2 border-t border-slate-800/60"
              >
                Create content for this tithi <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Category Balance (<40% Rule) & Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Balance Card */}
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-slate-200">
                  5-Category Editorial Balance
                </h2>
              </div>
              {categoryViolation ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800">
                  <AlertTriangle className="w-3 h-3" /> &gt;40% Cap Exceeded!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Rule Compliant (&lt;40%)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Rule: No single problem category (Relationships, Money, Mental, Physical, Emotional) may exceed 40% of monthly output.
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 50]} unit="%" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#334155" />
                  <YAxis type="category" dataKey="label" width={110} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#334155" />
                  <Tooltip 
                    formatter={(val: any, name: any, item: any) => [`${val}% (${item.payload.count} items)`, 'Share of Month']}
                    contentStyle={{ backgroundColor: '#0E1116', borderColor: '#334155', borderRadius: '4px', fontSize: '12px', color: '#f1f5f9' }}
                    itemStyle={{ color: '#f59e0b' }}
                  />
                  <Bar dataKey="percent" radius={[0, 2, 2, 0]}>
                    {categoryChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.percent > 40 ? '#ef4444' : entry.color === '#B45309' ? '#f59e0b' : entry.color} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Active Calendar Items: <strong className="text-slate-300 font-mono">{totalCalendarItems}</strong></span>
            <button 
              onClick={() => onNavigate('module4_calendar')}
              className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              Open Calendar <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Content Atomization & Funnel Model */}
        <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-slate-200">
                  The 1-to-10 Repurposing Pipeline
                </h2>
              </div>
              <span className="text-[11px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                1 Anchor = 10 Assets
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Every 10-15m long-form YouTube video spawns 9 satellite assets. Only YouTube has the consultation CTA; satellite platforms funnel viewers into YouTube!
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center font-bold text-xs">
                    YT
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">1 Anchor Video (10-15 Min)</h4>
                    <p className="text-[11px] text-slate-400">Embeds the 3-step CTA ladder & direct consultation booking</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">Anchor</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">2x YouTube Shorts</span>
                  <span className="text-[10px] text-slate-500">Compressed HSTSS arc</span>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">2x Instagram Reels</span>
                  <span className="text-[10px] text-slate-500">Link in bio funnel</span>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">1x Carousel (7 slides)</span>
                  <span className="text-[10px] text-slate-500">Saves & algorithm primer</span>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">2x Pinterest Pins</span>
                  <span className="text-[10px] text-slate-500">Watercolor & Flat graphics</span>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">1x Quora Answer</span>
                  <span className="text-[10px] text-slate-500">Long-term Google SEO</span>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-slate-800">
                  <span className="font-medium text-slate-200 block">1x Reddit Discussion</span>
                  <span className="text-[10px] text-slate-500">Problem vocabulary mining</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Strict CTA Compliance: <strong className="text-amber-400">Zero direct bookings on Meta/Pinterest</strong></span>
            <button 
              onClick={() => onNavigate('module8_growth')}
              className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              Growth Playbook <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Historical Performance & AI Learning Status */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-slate-200">
                Channel Feedback & AI Adaptive Learning
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              The AI engine learns from your real performance data to automatically sharpen hook formulas and SEO tags.
            </p>
          </div>
          <button
            onClick={() => onNavigate('module8_growth')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer transition rounded"
          >
            Log New Video Results <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3.5 bg-slate-900/50 border border-slate-800 border-l-2 border-l-amber-500">
            <span className="text-[11px] font-mono text-amber-500 block">Top Hook Formula</span>
            <h4 className="text-sm font-semibold text-white mt-1">{learningState.hookFormulaEffectiveness[0]?.formula || 'Idea Collision'}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{learningState.hookFormulaEffectiveness[0]?.recommendation}</p>
            <span className="inline-block mt-3 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
              Win Rate: {learningState.hookFormulaEffectiveness[0]?.winRate}%
            </span>
          </div>

          <div className="p-3.5 bg-slate-900/50 border border-slate-800 border-l-2 border-l-slate-600">
            <span className="text-[11px] font-mono text-slate-400 block">Key SEO Pattern</span>
            <h4 className="text-sm font-semibold text-white mt-1">Problem-Led Phrasing</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{learningState.seoLessons[0]}</p>
            <span className="inline-block mt-3 text-[10px] font-mono font-semibold text-sky-400 bg-sky-950/40 border border-sky-800 px-2 py-0.5 rounded">
              +41% Higher Click-Through
            </span>
          </div>

          <div className="p-3.5 bg-slate-900/50 border border-slate-800 border-l-2 border-l-amber-500">
            <span className="text-[11px] font-mono text-amber-500 block">Script Retention Factor</span>
            <h4 className="text-sm font-semibold text-white mt-1">Somatic Physical Stakes</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Naming exact somatic visceral feelings (stomach clenching, palpitations) holds 68% audience past the 3-minute mark.</p>
            <span className="inline-block mt-3 text-[10px] font-mono font-semibold text-purple-400 bg-purple-950/40 border border-purple-800 px-2 py-0.5 rounded">
              High Watch Time
            </span>
          </div>
        </div>

        {/* Mini Performance Bars */}
        <div className="h-44 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perfChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#334155" />
              <YAxis yAxisId="left" unit="%" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#334155" />
              <YAxis yAxisId="right" orientation="right" unit="k" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#334155" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0E1116', borderColor: '#334155', borderRadius: '4px', fontSize: '12px', color: '#f1f5f9' }} 
              />
              <Bar yAxisId="left" dataKey="ctr" name="CTR %" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="left" dataKey="retention" name="Avg Retention %" fill="#d97706" radius={[2, 2, 0, 0]} />
              <Bar yAxisId="right" dataKey="views" name="Views (k)" fill="#475569" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
