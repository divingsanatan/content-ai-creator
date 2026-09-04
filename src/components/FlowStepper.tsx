import React from 'react';
import { 
  Lightbulb, 
  Calendar as CalendarIcon, 
  FileText, 
  Search, 
  Pin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { ActiveModule } from './Navbar';
import { TopicIdea } from '../types';

interface FlowStepperProps {
  activeModule: ActiveModule;
  onSelectModule: (mod: ActiveModule) => void;
  activeTopic: TopicIdea | null;
  stepStatus: {
    ideation: boolean;
    calendar: boolean;
    script: boolean;
    seo: boolean;
    pinterest: boolean;
    growth: boolean;
  };
}

export interface PipelineStep {
  id: ActiveModule;
  stepNumber: number;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  icon: React.ReactNode;
  isComplete: boolean;
}

export const FlowStepper: React.FC<FlowStepperProps> = ({
  activeModule,
  onSelectModule,
  activeTopic,
  stepStatus
}) => {
  const steps: PipelineStep[] = [
    {
      id: 'module3_topics',
      stepNumber: 1,
      shortTitle: 'Ideate',
      fullTitle: '1. Ideate & Research',
      subtitle: 'Topic Studio (Mode A/B)',
      icon: <Lightbulb className="w-3.5 h-3.5" />,
      isComplete: stepStatus.ideation
    },
    {
      id: 'module4_calendar',
      stepNumber: 2,
      shortTitle: 'Schedule',
      fullTitle: '2. Schedule & Pace',
      subtitle: 'Tithi & 40% Balance',
      icon: <CalendarIcon className="w-3.5 h-3.5" />,
      isComplete: stepStatus.calendar
    },
    {
      id: 'module5_scripts',
      stepNumber: 3,
      shortTitle: 'Script',
      fullTitle: '3. HSTSS Script',
      subtitle: 'Anchor + Short Script',
      icon: <FileText className="w-3.5 h-3.5" />,
      isComplete: stepStatus.script
    },
    {
      id: 'module6_seo',
      stepNumber: 4,
      shortTitle: 'SEO & Pack',
      fullTitle: '4. YouTube SEO',
      subtitle: '5 Titles & Thumbnails',
      icon: <Search className="w-3.5 h-3.5" />,
      isComplete: stepStatus.seo
    },
    {
      id: 'module7_pinterest',
      stepNumber: 5,
      shortTitle: 'Pins',
      fullTitle: '5. Pinterest Pins',
      subtitle: '2:3 AI Prompts & Overlays',
      icon: <Pin className="w-3.5 h-3.5" />,
      isComplete: stepStatus.pinterest
    },
    {
      id: 'module8_growth',
      stepNumber: 6,
      shortTitle: 'Launch',
      fullTitle: '6. Launch & Learn',
      subtitle: '1-to-10 Playbook & Feedback',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      isComplete: stepStatus.growth
    }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === activeModule);
  const completedCount = Object.values(stepStatus).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const nextPendingStep = steps.find(s => !s.isComplete) || steps[steps.length - 1];

  return (
    <div className="bg-[#0B0D12] border-b border-slate-800/90 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Left: Active Project Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">Pipeline:</span>
            </div>

            {activeTopic ? (
              <div className="flex items-center gap-2 bg-[#12161F] px-2.5 py-1 rounded border border-slate-800 max-w-full">
                <BookOpen className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[150px] xs:max-w-[200px] sm:max-w-[280px]">
                  {activeTopic.workingTitle}
                </span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 whitespace-nowrap shrink-0">
                  {progressPercent}%
                </span>
              </div>
            ) : (
              <span className="text-xs text-slate-500 italic">No topic selected</span>
            )}
          </div>

          {/* Center: Interactive Stepper (Scrollable, collision-proof) */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 no-scrollbar min-w-0 flex-1 justify-start xl:justify-center">
            {steps.map((step, idx) => {
              const isActive = activeModule === step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => onSelectModule(step.id)}
                    className={`group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded transition-all text-xs cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-500/15 border border-amber-500/50 text-amber-300 font-semibold shadow-xs'
                        : step.isComplete
                        ? 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                        : 'bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {/* Number / Status Circle */}
                    <div className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-amber-500 text-black shadow-xs' 
                        : step.isComplete 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {step.isComplete && !isActive ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        step.stepNumber
                      )}
                    </div>

                    <div className="text-left">
                      <span className="block leading-tight text-[11px] whitespace-nowrap">
                        {step.shortTitle}
                      </span>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-slate-500 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: Quick Action / Pipeline Hub button */}
          <div className="flex items-center gap-2 shrink-0 self-end xl:self-center">
            {activeModule !== 'dashboard' && (
              <button
                onClick={() => onSelectModule('dashboard')}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded border border-slate-800 flex items-center gap-1 transition cursor-pointer shrink-0"
                title="View Pipeline Command Center"
              >
                <BarChart3 className="w-3 h-3 text-amber-400" />
                <span className="hidden xs:inline">Overview</span>
              </button>
            )}

            {currentStepIndex >= 0 && currentStepIndex < steps.length - 1 && (
              <button
                onClick={() => onSelectModule(steps[currentStepIndex + 1].id)}
                className="px-2.5 sm:px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold rounded flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
              >
                <span>Next: {steps[currentStepIndex + 1].shortTitle}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}

            {currentStepIndex === steps.length - 1 && (
              <button
                onClick={() => onSelectModule('dashboard')}
                className="px-2.5 sm:px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold rounded flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
              >
                <span>Pipeline Complete</span>
                <CheckCircle2 className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
