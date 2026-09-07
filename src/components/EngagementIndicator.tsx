import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { LifeProblemCategory } from '../types';
import { analyzeEngagementPotential, EngagementAnalysis } from '../utils/engagementScorer';

interface EngagementIndicatorProps {
  hook: string;
  category: LifeProblemCategory;
  context?: {
    workingTitle?: string;
    whyNow?: string;
    festivalTie?: any;
    bestFormat?: string;
  };
  compact?: boolean;
  showExpandableBreakdown?: boolean;
  iconStyle?: 'flame' | 'zap' | 'star';
  className?: string;
}

export const EngagementIndicator: React.FC<EngagementIndicatorProps> = ({
  hook,
  category,
  context,
  compact = false,
  showExpandableBreakdown = true,
  iconStyle = 'flame',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'flame' | 'zap' | 'star'>(iconStyle);

  const analysis: EngagementAnalysis = analyzeEngagementPotential(hook, category, context);

  // Render 5 Rating Icons
  const renderIcons = () => {
    const icons = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= analysis.iconCount;
      
      let IconComponent = Flame;
      if (activeIcon === 'zap') IconComponent = Zap;
      if (activeIcon === 'star') IconComponent = Star;

      icons.push(
        <span 
          key={i} 
          className={`transition-all duration-200 inline-flex items-center ${
            isFilled 
              ? `${analysis.tierColor.iconColor} drop-shadow-[0_0_6px_rgba(244,63,94,0.35)] scale-105` 
              : 'text-slate-700'
          }`}
          title={`${analysis.rating} / 5 Rating`}
        >
          <IconComponent 
            className={`w-3.5 h-3.5 ${isFilled ? 'fill-current' : 'fill-none stroke-[1.5]'}`} 
          />
        </span>
      );
    }
    return icons;
  };

  return (
    <div className={`rounded-md border ${analysis.tierColor.badgeBorder} ${analysis.tierColor.badgeBg} transition-all duration-200 ${className}`}>
      {/* Primary Bar */}
      <div className="px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Rating Icons Container */}
          <div className="flex items-center gap-0.5 bg-slate-950/70 px-2 py-1 rounded border border-slate-800/80 shadow-inner">
            {renderIcons()}
          </div>

          {/* Metric Label & Tier */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              {analysis.score}%
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              ({analysis.rating}/5)
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${analysis.tierColor.badgeBorder} ${analysis.tierColor.badgeText} bg-slate-950/50`}>
              {analysis.tier}
            </span>
          </div>
        </div>

        {/* Expand Breakdown Toggle */}
        {showExpandableBreakdown && (
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Icon Style switcher micro-pills */}
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-950/60 p-0.5 rounded border border-slate-800 text-[10px]">
              <button
                type="button"
                onClick={() => setActiveIcon('flame')}
                className={`p-1 rounded cursor-pointer transition ${activeIcon === 'flame' ? 'bg-slate-800 text-rose-400' : 'text-slate-500 hover:text-slate-300'}`}
                title="Flame Rating"
              >
                <Flame className="w-2.5 h-2.5 fill-current" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIcon('zap')}
                className={`p-1 rounded cursor-pointer transition ${activeIcon === 'zap' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                title="Zap Rating"
              >
                <Zap className="w-2.5 h-2.5 fill-current" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIcon('star')}
                className={`p-1 rounded cursor-pointer transition ${activeIcon === 'star' ? 'bg-slate-800 text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
                title="Star Rating"
              >
                <Star className="w-2.5 h-2.5 fill-current" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-950/60 hover:bg-slate-900 border border-slate-800 flex items-center gap-1 transition cursor-pointer"
            >
              <span>{isExpanded ? 'Hide Analysis' : 'Hook Analysis'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        )}
      </div>

      {/* Expanded Breakdown Drawer */}
      {showExpandableBreakdown && isExpanded && (
        <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-800/80 bg-slate-950/80 rounded-b-md space-y-3 text-xs">
          {/* Rationale Statement */}
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {analysis.rationale}
          </p>

          {/* 4 Core Dimensions Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Hook Curiosity & Tension</span>
                <span className="font-mono text-slate-200 font-semibold">{analysis.metrics.hookCuriosity}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.metrics.hookCuriosity}%` }} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Category Synergy & Alignment</span>
                <span className="font-mono text-slate-200 font-semibold">{analysis.metrics.categorySynergy}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.metrics.categorySynergy}%` }} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Visceral Emotional Stakes</span>
                <span className="font-mono text-slate-200 font-semibold">{analysis.metrics.emotionalTension}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.metrics.emotionalTension}%` }} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Peer Share & Comment Propensity</span>
                <span className="font-mono text-slate-200 font-semibold">{analysis.metrics.sharePotential}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.metrics.sharePotential}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Key Drivers / Signals Detected */}
          {analysis.keyDrivers.length > 0 && (
            <div className="pt-1.5 border-t border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">
                Key Algorithmic & Human Triggers Detected:
              </span>
              <ul className="space-y-1">
                {analysis.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
