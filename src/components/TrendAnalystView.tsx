import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  RefreshCw, 
  Sparkles, 
  Filter, 
  ArrowUpRight, 
  ExternalLink,
  Flame,
  Calendar as CalendarIcon,
  HelpCircle
} from 'lucide-react';
import { TrendItem, LifeProblemCategory, TopicIdea } from '../types';
import { CATEGORY_LABELS } from '../data/sanatanCalendar';

interface TrendAnalystViewProps {
  trends: TrendItem[];
  onAddTrend: (trend: TrendItem) => void;
  onPromoteToTopic: (trend: TrendItem) => void;
}

export const TrendAnalystView: React.FC<TrendAnalystViewProps> = ({
  trends,
  onAddTrend,
  onPromoteToTopic
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const platforms = [
    'all',
    'YouTube',
    'Google Search',
    'Pinterest',
    'Instagram/Reels',
    'Reddit & Quora',
    'Hindu Calendar/Astrology'
  ];

  const filteredTrends = trends.filter(t => {
    const matchesPlatform = platformFilter === 'all' || t.platform === platformFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      t.trendTerm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.intent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.contentAngle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.gap.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesCategory && matchesSearch;
  });

  const handleRefreshTrends = async () => {
    setIsRefreshing(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          focusSpace: platformFilter !== 'all' ? platformFilter : undefined
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        data.data.forEach((item: TrendItem) => {
          onAddTrend(item);
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to fetch real-time trends.');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
            M2
          </div>
          <div>
            <h1 className="text-xl font-light tracking-tight text-white uppercase">
              Module 2: <span className="text-amber-500 font-normal">Real-Time Trend Research Analyst</span>
            </h1>
            <p className="text-xs text-slate-500">
              Monitoring YouTube, Google, Pinterest, Reels, Reddit/Quora & Upcoming Tithis over the last 7–14 days.
            </p>
          </div>
        </div>

        <button
          id="refresh-trends-button"
          onClick={handleRefreshTrends}
          disabled={isRefreshing}
          className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-200' : ''}`} />
          {isRefreshing ? 'Analyzing Search Spikes...' : 'Run Live Trend Analysis'}
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-950/40 border border-red-800 rounded text-xs text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            id="trend-search-input"
            type="text"
            placeholder="Search trend query, intent, or Vedic angle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-800 bg-slate-900 text-slate-200 focus:outline-hidden focus:border-amber-500"
          />
        </div>

        {/* Platform Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 whitespace-nowrap">Platform:</span>
          <select
            id="trend-platform-filter"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer focus:outline-hidden focus:border-amber-500"
          >
            {platforms.map(p => (
              <option key={p} value={p} className="bg-[#0E1116]">
                {p === 'all' ? 'All 6 Platforms' : p}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 whitespace-nowrap">Category:</span>
          <select
            id="trend-category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-200 cursor-pointer focus:outline-hidden focus:border-amber-500"
          >
            <option value="all" className="bg-[#0E1116]">All 5 Life Categories</option>
            <option value="relationships" className="bg-[#0E1116]">Relationships</option>
            <option value="money_business" className="bg-[#0E1116]">Money & Business</option>
            <option value="mental_health" className="bg-[#0E1116]">Mental Health</option>
            <option value="physical_health" className="bg-[#0E1116]">Physical Health</option>
            <option value="emotional_health" className="bg-[#0E1116]">Emotional Health</option>
          </select>
        </div>
      </div>

      {/* Structured Trend Table (Matching Required Prompt Specification) */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Trend Intelligence Matrix ({filteredTrends.length} Active Records)
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Platform | Term | Intent | Angle | Gap
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 w-32">Platform</th>
                <th className="py-3 px-4 w-52">Trend / Search Term</th>
                <th className="py-3 px-4 w-56">Search Intent (Pain)</th>
                <th className="py-3 px-4">Sanatan Content Angle</th>
                <th className="py-3 px-4 w-56">Competitive Gap</th>
                <th className="py-3 px-4 w-28 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTrends.map((trend) => {
                const catBadge = CATEGORY_LABELS[trend.category] || { label: trend.category, color: 'text-slate-300', bg: 'bg-slate-800', border: 'border-slate-700' };
                return (
                  <tr key={trend.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 align-top">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {trend.platform}
                      </span>
                      {trend.searchVolumeEstimate && (
                        <span className="block text-[10px] text-amber-400 font-mono font-medium mt-1">
                          {trend.searchVolumeEstimate}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 align-top">
                      <div className="font-semibold text-white leading-snug">
                        "{trend.trendTerm}"
                      </div>
                      <span className="inline-block mt-1.5 text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border border-slate-700 bg-slate-800/80 text-amber-300">
                        {catBadge.label}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 align-top text-slate-400 leading-relaxed">
                      {trend.intent}
                    </td>

                    <td className="py-3.5 px-4 align-top text-slate-200 font-normal leading-relaxed">
                      {trend.contentAngle}
                    </td>

                    <td className="py-3.5 px-4 align-top text-slate-500 text-[11px] leading-relaxed">
                      {trend.gap}
                    </td>

                    <td className="py-3.5 px-4 align-top text-right">
                      <button
                        onClick={() => onPromoteToTopic(trend)}
                        className="px-2.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition cursor-pointer"
                      >
                        Use in M3 <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTrends.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">
            No trend terms match your current filters. Try changing platforms or searching another keyword.
          </div>
        )}
      </div>
    </div>
  );
};
