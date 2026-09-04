import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { ActiveModule } from './Navbar';

interface FlowFooterBarProps {
  currentStep: number;
  totalSteps?: number;
  stepName: string;
  activeTopicTitle?: string;
  isStepComplete?: boolean;
  prevModule?: ActiveModule;
  prevLabel?: string;
  nextModule?: ActiveModule;
  nextLabel?: string;
  nextActionNote?: string;
  onNavigate: (module: ActiveModule) => void;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
}

export const FlowFooterBar: React.FC<FlowFooterBarProps> = ({
  currentStep,
  totalSteps = 6,
  stepName,
  activeTopicTitle,
  isStepComplete = false,
  prevModule,
  prevLabel,
  nextModule,
  nextLabel,
  nextActionNote,
  onNavigate,
  onPrimaryAction,
  primaryActionLabel
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-slate-800 bg-[#0E1116] p-4 sm:p-5 rounded-lg border shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Left: Previous Step Button */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        {prevModule && prevLabel ? (
          <button
            onClick={() => onNavigate(prevModule)}
            className="w-full sm:w-auto justify-center px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-2 transition cursor-pointer shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>{prevLabel}</span>
          </button>
        ) : (
          <div className="text-xs text-slate-600 font-mono text-center sm:text-left">
            Step 1 of {totalSteps} • Pipeline Inception
          </div>
        )}
      </div>

      {/* Center: Stage Progress Info */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-mono font-semibold text-amber-400">
            Stage {currentStep} of {totalSteps}: {stepName}
          </span>
          {isStepComplete && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
              <CheckCircle2 className="w-3 h-3" /> Ready
            </span>
          )}
        </div>

        {activeTopicTitle && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-[320px] font-medium text-slate-300">
              "{activeTopicTitle}"
            </span>
          </div>
        )}
      </div>

      {/* Right: Next Step or Primary Action */}
      <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 flex-wrap sm:flex-nowrap">
        {onPrimaryAction && primaryActionLabel && (
          <button
            onClick={onPrimaryAction}
            className="flex-1 sm:flex-initial justify-center px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{primaryActionLabel}</span>
          </button>
        )}

        {nextModule && nextLabel && (
          <button
            onClick={() => onNavigate(nextModule)}
            className="flex-1 sm:flex-initial justify-center px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
