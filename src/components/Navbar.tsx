import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Compass, 
  TrendingUp, 
  Lightbulb, 
  Calendar as CalendarIcon, 
  FileText, 
  Search, 
  Pin, 
  BarChart3,
  BookOpen,
  Menu,
  X,
  Database,
  Zap,
  Layers
} from 'lucide-react';
import { TopicIdea } from '../types';

export type ActiveModule = 
  | 'dashboard' 
  | 'auto_pilot'
  | 'ideas_flow'
  | 'module1_strategy' 
  | 'module2_trends' 
  | 'module3_topics' 
  | 'module4_calendar' 
  | 'module5_scripts' 
  | 'module6_seo' 
  | 'module7_pinterest' 
  | 'module8_growth';

interface NavbarProps {
  activeModule: ActiveModule;
  onSelectModule: (mod: ActiveModule) => void;
  activeTopic: TopicIdea | null;
  topics: TopicIdea[];
  onSelectTopic: (topic: TopicIdea) => void;
  onOpenSupabaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  onSelectModule,
  activeTopic,
  topics,
  onSelectTopic,
  onOpenSupabaseModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const flowStages: { 
    id: ActiveModule; 
    step: number; 
    label: string; 
    shortLabel: string;
    icon: React.ReactNode; 
    badge?: string;
  }[] = [
    { id: 'module3_topics', step: 1, label: '1. Ideate & Research', shortLabel: '1. Ideate', icon: <Lightbulb className="w-4 h-4" />, badge: 'Mode A/B' },
    { id: 'module4_calendar', step: 2, label: '2. Schedule & Pace', shortLabel: '2. Schedule', icon: <CalendarIcon className="w-4 h-4" /> },
    { id: 'module5_scripts', step: 3, label: '3. HSTSS Scripting', shortLabel: '3. Scripts', icon: <FileText className="w-4 h-4" /> },
    { id: 'module6_seo', step: 4, label: '4. SEO & Packaging', shortLabel: '4. SEO', icon: <Search className="w-4 h-4" /> },
    { id: 'module7_pinterest', step: 5, label: '5. Pinterest Pins', shortLabel: '5. Pins', icon: <Pin className="w-4 h-4" /> },
    { id: 'module8_growth', step: 6, label: '6. Launch & Learn', shortLabel: '6. Launch', icon: <Sparkles className="w-4 h-4" />, badge: 'AI Learning' },
  ];

  const hubItems: { 
    id: ActiveModule; 
    label: string; 
    shortLabel: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'dashboard', label: 'Pipeline Hub', shortLabel: 'Hub', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'module1_strategy', label: 'Strategy & Rules', shortLabel: 'Strategy', icon: <Compass className="w-4 h-4" /> },
    { id: 'module2_trends', label: 'Live Trends', shortLabel: 'Trends', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const handleModuleSelect = (mod: ActiveModule) => {
    onSelectModule(mod);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E1116] border-b border-slate-800 shadow-lg">
      {/* Top Banner with Brand & Active Topic Selector & Next Tithi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 border-b border-slate-800/80">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-500/20 border border-amber-500/40 rotate-45 flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-amber-500 rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white whitespace-nowrap">
                  Prana Engine <span className="text-amber-500 font-light text-xs sm:text-sm">v2.4</span>
                </h1>
                <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 hidden sm:inline-block">
                  Geometric Balance
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 hidden md:block">
                Sanatan Dharma wisdom mapped to modern life problems & SEO architecture
              </p>
            </div>
          </div>

          {/* Right Header Controls: Tithi, Topic Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Next Tithi Watch */}
            <div className="text-right hidden lg:block border-r border-slate-800 pr-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Next Tithi</p>
              <p className="text-xs text-amber-300 font-mono font-medium whitespace-nowrap">Aja Ekadashi • Sep 07</p>
            </div>

            {/* Global Active Topic Switcher */}
            <div className="flex items-center gap-1.5 bg-[#0A0C10] px-2.5 py-1.5 rounded border border-slate-800 max-w-[170px] xs:max-w-[210px] sm:max-w-[260px]">
              <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">Focus:</span>
              <select 
                id="active-topic-selector"
                className="bg-transparent text-xs font-medium text-slate-200 focus:outline-hidden w-full truncate cursor-pointer"
                value={activeTopic?.id || ''}
                onChange={(e) => {
                  const found = topics.find(t => t.id === e.target.value);
                  if (found) onSelectTopic(found);
                }}
              >
                {topics.map(t => (
                  <option key={t.id} value={t.id} className="bg-[#0E1116] text-slate-200">
                    {t.workingTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-Pilot Direct Pipeline Button */}
            <button
              type="button"
              id="navbar-autopilot-btn"
              onClick={() => handleModuleSelect('auto_pilot')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-semibold transition cursor-pointer shrink-0 ${
                activeModule === 'auto_pilot'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40 hover:border-amber-500/60'
              }`}
              title="Autonomous Pipeline: Input Brief -> Auto-Schedule & Dual Script Flow"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline font-bold">Auto-Pilot</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 hidden md:inline">AI</span>
            </button>

            {/* Ideas & Flow Direct Button */}
            <button
              type="button"
              id="navbar-ideasflow-btn"
              onClick={() => handleModuleSelect('ideas_flow')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-semibold transition cursor-pointer shrink-0 ${
                activeModule === 'ideas_flow'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                  : 'bg-[#0A0C10] hover:bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
              title="Ideas & Schedule Flow: See all generated ideas, the entire flow around them, and drop dates"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline font-medium">Ideas & Flow</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                {topics.length}
              </span>
            </button>

            {/* Supabase Link Button */}
            {onOpenSupabaseModal && (
              <button
                type="button"
                id="navbar-supabase-link-btn"
                onClick={onOpenSupabaseModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-800 bg-[#0A0C10] hover:bg-slate-900 hover:border-slate-700 text-xs text-slate-300 transition cursor-pointer shrink-0"
                title="Supabase PostgreSQL Cloud Storage Link"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline font-medium">Supabase</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              </button>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C10] border-b border-slate-800 px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div>
            <button
              onClick={() => handleModuleSelect('auto_pilot')}
              className={`w-full flex items-center justify-center gap-2 p-2.5 rounded text-xs font-semibold mb-2 transition cursor-pointer ${
                activeModule === 'auto_pilot'
                  ? 'bg-amber-500 text-slate-950 border border-amber-400 font-bold'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>⚡ Autonomous Pipeline (Brief → Script)</span>
            </button>

            <button
              onClick={() => handleModuleSelect('ideas_flow')}
              className={`w-full flex items-center justify-between p-2.5 rounded text-xs font-semibold mb-2.5 transition cursor-pointer ${
                activeModule === 'ideas_flow'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>💡 Generated Ideas & Schedule Flow</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {topics.length} Ideas
              </span>
            </button>

            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Pipeline Creation Flow (1-6)
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {flowStages.map((item) => {
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleModuleSelect(item.id)}
                    className={`flex items-center gap-2 p-2 rounded text-xs text-left transition cursor-pointer ${
                      isActive
                        ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-900'
                    }`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Hub & Strategic Knowledge
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {hubItems.map((item) => {
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleModuleSelect(item.id)}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded text-xs transition cursor-pointer ${
                      isActive
                        ? 'text-white bg-slate-800 border border-slate-700 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-900'
                    }`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {onOpenSupabaseModal && (
            <div className="border-t border-slate-800 pt-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupabaseModal();
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded text-xs bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-200 transition cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Database Link & Cloud Sync</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Horizontal Nav Bar - Collision-proof on all screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center justify-between gap-3 min-w-max">
            {/* 6 Creation Flow Stages (Child 1 - Shrink Protected) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                id="nav-auto_pilot"
                onClick={() => onSelectModule('auto_pilot')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-semibold rounded transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                  activeModule === 'auto_pilot'
                    ? 'text-slate-950 bg-amber-400 border border-amber-300 font-bold shadow-xs'
                    : 'text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Auto-Pilot</span>
                <span className="hidden xl:inline text-[10px] opacity-85 font-mono">(Brief → Flow)</span>
              </button>

              <button
                id="nav-ideas_flow"
                onClick={() => onSelectModule('ideas_flow')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-semibold rounded transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                  activeModule === 'ideas_flow'
                    ? 'text-slate-950 bg-amber-400 border border-amber-300 font-bold shadow-xs'
                    : 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
                title="View all generated ideas, the entire flow around them, and their schedule"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ideas & Flow</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/25 text-amber-300 font-bold">
                  {topics.length}
                </span>
              </button>

              <span className="text-[10px] font-mono text-slate-400 hidden 2xl:inline-block px-1.5 border-r border-slate-800 mr-1">
                Flow:
              </span>
              {flowStages.map((item) => {
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => onSelectModule(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-medium rounded transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 font-semibold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="inline xl:hidden">{item.shortLabel}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono hidden 2xl:inline-block ${
                        isActive ? 'bg-amber-500 text-black font-bold' : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pipeline Hub & Strategy Divider & Links (Child 2 - Shrink Protected) */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-800 shrink-0">
              {hubItems.map((item) => {
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => onSelectModule(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'text-white bg-slate-800 border border-slate-700 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="inline xl:hidden">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

