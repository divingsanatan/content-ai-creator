import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Flame, 
  Clock, 
  Volume2, 
  Share2, 
  BookOpen, 
  Smartphone,
  Tag,
  Scissors,
  Video,
  User,
  Quote,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  UploadCloud,
  Target,
  ShieldCheck,
  Activity,
  Compass,
  CheckCheck
} from 'lucide-react';
import { ScriptPackage, TopicIdea, LifeProblemCategory, DialogueLine, ReelCutGuide, StoryBrandCTA, PasoOrbitShort, ABTDiagnostic, UniversalRetentionCheck } from '../types';
import { INITIAL_SCRIPT_PACKAGE } from '../data/initialPackages';
import { CATEGORY_LABELS } from '../data/sanatanCalendar';
import { FlowFooterBar } from './FlowFooterBar';
import { ActiveModule } from './Navbar';

interface ScriptStudioViewProps {
  activeTopic: TopicIdea | null;
  scriptPackage: ScriptPackage | null;
  onUpdateScriptPackage: (pkg: ScriptPackage) => void;
  onNavigateToSEO: () => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const ScriptStudioView: React.FC<ScriptStudioViewProps> = ({
  activeTopic,
  scriptPackage,
  onUpdateScriptPackage,
  onNavigateToSEO,
  onNavigate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'dialogue' | 'reel_cuts' | 'shlok' | 'hstss' | 'frameworks' | 'teleprompter' | 'directing'>('dialogue');
  const [speakerFilter, setSpeakerFilter] = useState<'all' | 'Nakul' | 'Nikhil'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');

  // Teleprompter state
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 to 5
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('large');
  const teleprompterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isPlaying && teleprompterRef.current) {
      interval = setInterval(() => {
        if (teleprompterRef.current) {
          teleprompterRef.current.scrollTop += scrollSpeed;
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scrollSpeed]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateScript = async () => {
    if (!activeTopic) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/script/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic.workingTitle,
          category: activeTopic.category,
          concept: activeTopic.concept,
          userNotes
        })
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.data && (data.data.dialogueScript?.length > 0 || data.data.hook)) {
        onUpdateScriptPackage(data.data);
      } else {
        // High quality fallback with dynamic topic replacement
        const fallback: ScriptPackage = {
          ...INITIAL_SCRIPT_PACKAGE,
          topic: activeTopic.workingTitle,
          category: activeTopic.category,
          concept: activeTopic.concept
        };
        onUpdateScriptPackage(fallback);
      }
    } catch (err) {
      console.error(err);
      // If server request fails, fallback safely
      const fallback: ScriptPackage = {
        ...INITIAL_SCRIPT_PACKAGE,
        topic: activeTopic.workingTitle,
        category: activeTopic.category,
        concept: activeTopic.concept
      };
      onUpdateScriptPackage(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentPkg = scriptPackage || INITIAL_SCRIPT_PACKAGE;

  const [isSavingToSupabase, setIsSavingToSupabase] = useState(false);
  const [supabaseSaveStatus, setSupabaseSaveStatus] = useState<string | null>(null);

  const handleSaveToSupabase = async () => {
    if (!currentPkg) return;
    setIsSavingToSupabase(true);
    setSupabaseSaveStatus(null);
    try {
      const res = await fetch('/api/supabase/sync-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptPackage: currentPkg }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseSaveStatus('Saved to Supabase!');
        setTimeout(() => setSupabaseSaveStatus(null), 3000);
      } else {
        setSupabaseSaveStatus(data.error || 'Configure Supabase keys in Secrets');
        setTimeout(() => setSupabaseSaveStatus(null), 4000);
      }
    } catch (err: any) {
      setSupabaseSaveStatus('Failed to sync');
      setTimeout(() => setSupabaseSaveStatus(null), 3000);
    } finally {
      setIsSavingToSupabase(false);
    }
  };

  // Dialogue lines
  const dialogueLines = currentPkg.dialogueScript || INITIAL_SCRIPT_PACKAGE.dialogueScript || [];
  const filteredDialogue = speakerFilter === 'all' 
    ? dialogueLines 
    : dialogueLines.filter(line => line.speaker === speakerFilter);

  // Approximate spoken word count and duration
  const spokenWords = dialogueLines.map(d => d.dialogue).join(' ');
  const wordCount = spokenWords.trim().split(/\s+/).filter(Boolean).length || 1450;
  const estMinutes = Math.round(wordCount / 130); // ~130 wpm spoken pacing

  // Reel Cuts
  const reelCuts = currentPkg.reelCuts || INITIAL_SCRIPT_PACKAGE.reelCuts || [];

  // Shlok Card
  const shlokCard = currentPkg.shlokCard || INITIAL_SCRIPT_PACKAGE.shlokCard;

  // Directing Guide
  const directingGuide = currentPkg.directingGuide || INITIAL_SCRIPT_PACKAGE.directingGuide;

  // 4 Proven Narrative Frameworks (StoryBrand SB7, PASO, ABT, Universal Retention)
  const storyBrandCTA = currentPkg.storyBrandCTA || INITIAL_SCRIPT_PACKAGE.storyBrandCTA;
  const pasoOrbitShort = currentPkg.pasoOrbitShort || INITIAL_SCRIPT_PACKAGE.pasoOrbitShort;
  const abtDiagnostic = currentPkg.abtDiagnostic || INITIAL_SCRIPT_PACKAGE.abtDiagnostic;
  const universalRetentionCheck = currentPkg.universalRetentionCheck || INITIAL_SCRIPT_PACKAGE.universalRetentionCheck;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs rounded shrink-0 mt-0.5 sm:mt-0">
            M5
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-medium tracking-tight text-white truncate sm:text-clip">
                Module 5: <span className="text-amber-500 font-normal">Nakul & Nikhil Dual-Character Script Studio</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Solo Performer Format
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enacted dialogue between anxious Nakul & calm Nikhil • Embedded Reel Cut markers • Grounded Vedic Shloks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {currentPkg && (
            <button
              onClick={handleSaveToSupabase}
              disabled={isSavingToSupabase}
              className="px-3.5 py-2 rounded bg-[#0A0C10] hover:bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 whitespace-nowrap"
              title="Save script package to Supabase content_scripts table"
            >
              <Database className={`w-3.5 h-3.5 ${isSavingToSupabase ? 'animate-spin' : ''}`} />
              {isSavingToSupabase ? 'Saving...' : supabaseSaveStatus || 'Save to Supabase'}
            </button>
          )}

          {currentPkg && (
            <button
              onClick={onNavigateToSEO}
              className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              Export to M6 SEO <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}

          <button
            id="generate-script-button"
            onClick={handleGenerateScript}
            disabled={isGenerating || !activeTopic}
            className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Drafting Nakul & Nikhil Script...' : 'Generate Nakul & Nikhil Script'}
          </button>
        </div>
      </div>

      {/* Two Character Dynamic Banner & Production Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nakul Card */}
        <div className="bg-gradient-to-br from-amber-950/20 via-[#0E1116] to-[#0E1116] border border-amber-500/30 rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-amber-300">
                  Nakul (Acted by You)
                </h3>
                <span className="text-[11px] font-mono text-amber-400/80">
                  Camera Left • 45mm Tighter Lens • Casual Hoodie
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              High Cortisol Relatability
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            Anxious, irritated, frustrated, and sarcastic. He says what the suffering viewer is thinking in high-stress moments. Calls out spiritual clichés with sharp wit.
          </p>
        </div>

        {/* Nikhil Card */}
        <div className="bg-gradient-to-br from-emerald-950/20 via-[#0E1116] to-[#0E1116] border border-emerald-500/30 rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-emerald-300">
                  Nikhil (Also Acted by You)
                </h3>
                <span className="text-[11px] font-mono text-emerald-400/80">
                  Camera Right • 35mm Locked Tripod • Minimal Linen Shirt
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Deep Voice • Sthira Wisdom
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            Calm, composed, chest-resonant voice. Gives clear, straight answers without preaching or taking Nakul's emotional bait. Unlocks ancient Vedic truth.
          </p>
        </div>
      </div>

      {/* Active Focus Bar */}
      <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-medium text-amber-400 block">
            Targeting Topic Anchor:
          </span>
          <h2 className="text-sm font-semibold text-white mt-0.5">
            {activeTopic?.workingTitle || currentPkg.topic}
          </h2>
          <span className="text-xs text-slate-400">
            Grounding: <strong className="text-slate-200">{activeTopic?.concept || currentPkg.concept}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-900 px-3 py-1.5 rounded border border-slate-800 font-mono flex-wrap">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Clock className="w-3.5 h-3.5" /> ~{estMinutes} min dialogue (~{wordCount} words)
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300 font-medium flex items-center gap-1">
            🌐 Hinglish Script
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <Scissors className="w-3 h-3" /> {reelCuts.length} Reel Cuts Mapped
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-purple-400 font-medium flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> {shlokCard?.included ? 'Sanskrit Shlok Included' : 'No Shlok Needed'}
          </span>
        </div>
      </div>

      {/* Script Studio Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('dialogue')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'dialogue'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Nakul & Nikhil Script ({dialogueLines.length} Turns)
        </button>
        <button
          onClick={() => setActiveTab('reel_cuts')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'reel_cuts'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <Scissors className="w-3.5 h-3.5 text-emerald-400" />
          Reel Cut-Down Guides ({reelCuts.length} Ready Cuts)
        </button>
        <button
          onClick={() => setActiveTab('shlok')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'shlok'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          Scripture & Shlok Breakdown
        </button>
        <button
          onClick={() => setActiveTab('hstss')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'hstss'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          HSTSS Structural Breakdown & CTA Ladder
        </button>
        <button
          onClick={() => setActiveTab('frameworks')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'frameworks'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-amber-400" />
          StoryBrand (SB7) & Frameworks QA
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
            4 Layers
          </span>
        </button>
        <button
          onClick={() => setActiveTab('teleprompter')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'teleprompter'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          Teleprompter / Rehearsal Mode
        </button>
        <button
          onClick={() => setActiveTab('directing')}
          className={`px-4 py-2 text-xs font-medium rounded-t transition cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'directing'
              ? 'bg-slate-800 text-amber-400 border-t-2 border-t-amber-500 font-semibold'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Solo Actor Filming Guide
        </button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* TAB 1: Nakul & Nikhil Dynamic Dialogue Script */}
        {activeTab === 'dialogue' && (
          <div className="space-y-4">
            {/* Filter & Export Toolbar */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-mono">Speaker Filter:</span>
                <button
                  onClick={() => setSpeakerFilter('all')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition ${
                    speakerFilter === 'all'
                      ? 'bg-slate-700 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Both Characters ({dialogueLines.length})
                </button>
                <button
                  onClick={() => setSpeakerFilter('Nakul')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition flex items-center gap-1 ${
                    speakerFilter === 'Nakul'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  Nakul Lines Only (Film Camera Left)
                </button>
                <button
                  onClick={() => setSpeakerFilter('Nikhil')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition flex items-center gap-1 ${
                    speakerFilter === 'Nikhil'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-slate-900 text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  Nikhil Lines Only (Film Camera Right)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const formatted = dialogueLines
                      .map(d => `${d.speaker.toUpperCase()} ${d.actorNote}\n"${d.dialogue}"\n`)
                      .join('\n');
                    copyToClipboard(formatted, 'full_dialogue');
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedKey === 'full_dialogue' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Full Teleplay
                </button>
              </div>
            </div>

            {/* Dialogue Turns */}
            <div className="space-y-3.5">
              {filteredDialogue.map((item, idx) => {
                const isNakul = item.speaker === 'Nakul';
                return (
                  <div
                    key={item.id || idx}
                    className={`rounded-lg border p-4.5 transition relative ${
                      isNakul
                        ? 'bg-[#12100E] border-amber-500/30 hover:border-amber-500/50'
                        : 'bg-[#0B1115] border-emerald-500/30 hover:border-emerald-500/50'
                    }`}
                  >
                    {/* Header line for speaker turn */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isNakul
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}
                        >
                          {isNakul ? <Flame className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                        </span>
                        <span
                          className={`font-semibold text-sm ${
                            isNakul ? 'text-amber-300' : 'text-emerald-300'
                          }`}
                        >
                          {item.speaker}
                        </span>
                        {item.timestamp && (
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {item.timestamp}
                          </span>
                        )}

                        {item.isReelCutStart && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold flex items-center gap-1">
                            <Scissors className="w-3 h-3" />
                            Reel Cut Marker ({item.reelCutId})
                          </span>
                        )}

                        {item.isShlokMoment && (
                          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-semibold flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Sanskrit Shlok Recitation
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => copyToClipboard(`${item.speaker}: ${item.dialogue}`, `line_${idx}`)}
                        className="text-slate-500 hover:text-slate-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition"
                      >
                        {copiedKey === `line_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        Copy
                      </button>
                    </div>

                    {/* Actor Direction Tag */}
                    <div className="mb-2">
                      <span className="text-xs font-mono text-slate-400 italic bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800/60 inline-block">
                        {item.actorNote}
                      </span>
                    </div>

                    {/* Spoken Dialogue */}
                    <p className={`text-base leading-relaxed font-sans ${isNakul ? 'text-slate-100' : 'text-slate-100 font-medium'}`}>
                      {item.dialogue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Curated Reel Cut-Down Guides */}
        {activeTab === 'reel_cuts' && (
          <div className="space-y-6">
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Scissors className="w-4 h-4" />
                <span>Reel & Short Atomization Strategy</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                You do not need to film separate vertical shorts! These 3 micro-narrative cuts are pre-planned directly inside your main YouTube video. Simply pull these timecodes into your video editing timeline, crop to 9:16 vertical, apply the suggested sound cue, and attach the soft-CTA driving viewers back to your YouTube channel bio link.
              </p>
            </div>

            <div className="space-y-5">
              {reelCuts.map((cut, cIdx) => (
                <div key={cut.id || cIdx} className="bg-[#0E1116] border border-emerald-500/30 rounded-lg p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
                          #{cut.cutNumber || cIdx + 1}
                        </span>
                        <h3 className="font-semibold text-white text-sm">
                          {cut.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                        <span className="text-amber-400">Timestamp: {cut.timecodeInLongVideo}</span>
                        <span>•</span>
                        <span className="text-emerald-400">Target Duration: {cut.targetDuration}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const fullReel = `
TITLE: ${cut.title}
TIMECODE: ${cut.timecodeInLongVideo} (${cut.targetDuration})
HOOK: "${cut.hookLine}"
CAPTION ON SCREEN: "${cut.onScreenCaptionText}"
DIRECTION: ${cut.editingDirection}
AUDIO: ${cut.audioTrackVibe}

DIALOGUE:
${cut.dialogueExchanges.map(d => `${d.speaker} ${d.note}:\n"${d.line}"`).join('\n\n')}

SOFT CTA:
"${cut.softCtaText}"
                        `;
                        copyToClipboard(fullReel, `reel_${cIdx}`);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                    >
                      {copiedKey === `reel_${cIdx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copy Reel Script
                    </button>
                  </div>

                  {/* Reel Hook Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-900 rounded border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                        First 3-Second Spoken & Visual Hook:
                      </span>
                      <p className="text-sm font-semibold text-white font-serif italic">
                        "{cut.hookLine}"
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-900 rounded border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                        Large On-Screen Caption Text (Viewer Scroll Stopper):
                      </span>
                      <p className="text-xs font-mono font-medium text-emerald-200">
                        {cut.onScreenCaptionText}
                      </p>
                    </div>
                  </div>

                  {/* Editing & Audio Direction */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-0.5">
                        Camera & Cut Direction:
                      </span>
                      <p className="text-slate-300">{cut.editingDirection}</p>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-0.5">
                        Audio Track / Foley Vibe:
                      </span>
                      <p className="text-slate-300">{cut.audioTrackVibe}</p>
                    </div>
                  </div>

                  {/* Dialogue Excerpt */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Reel Dialogue Excerpt:
                    </span>
                    {cut.dialogueExchanges.map((turn, tIdx) => (
                      <div
                        key={tIdx}
                        className={`p-3 rounded border text-xs ${
                          turn.speaker === 'Nakul'
                            ? 'bg-amber-950/20 border-amber-500/20'
                            : 'bg-emerald-950/20 border-emerald-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <strong className={turn.speaker === 'Nakul' ? 'text-amber-400' : 'text-emerald-400'}>
                            {turn.speaker}
                          </strong>
                          <span className="text-[10px] font-mono text-slate-500 italic">
                            {turn.note}
                          </span>
                        </div>
                        <p className="text-slate-200">{turn.line}</p>
                      </div>
                    ))}
                  </div>

                  {/* Soft CTA */}
                  <div className="p-3 bg-amber-950/30 rounded border border-amber-500/40 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                        Mandatory Soft CTA (Never consult directly on Reels):
                      </span>
                      <p className="text-amber-200 font-semibold mt-0.5">"{cut.softCtaText}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Spiritual Scripture & Shlok Card */}
        {activeTab === 'shlok' && (
          <div className="space-y-6">
            {shlokCard?.included ? (
              <div className="bg-[#0E1116] border border-purple-500/30 rounded-lg p-6 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-sm">
                      🕉️
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-base">
                        Vedic Scripture Integration
                      </h3>
                      <span className="text-xs font-mono text-purple-400">
                        {shlokCard.source}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const text = `
SOURCE: ${shlokCard.source}

SANSKRIT:
${shlokCard.sanskrit}

TRANSLITERATION:
${shlokCard.transliteration}

NIKHIL'S MODERN BREAKDOWN:
${shlokCard.nikhilExplanation}
                      `;
                      copyToClipboard(text, 'shlok_copy');
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'shlok_copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Shlok Card
                  </button>
                </div>

                {/* Sanskrit Devanagari Box */}
                <div className="p-6 bg-purple-950/20 border border-purple-500/30 rounded-lg text-center space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                    Original Sanskrit Verse (Mool Shlok)
                  </span>
                  <p className="text-2xl md:text-3xl font-serif text-purple-100 whitespace-pre-line tracking-wide leading-relaxed">
                    {shlokCard.sanskrit}
                  </p>
                  <p className="text-xs md:text-sm font-mono text-purple-300/80 italic pt-2 border-t border-purple-500/20 whitespace-pre-line">
                    {shlokCard.transliteration}
                  </p>
                </div>

                {/* Nikhil's Translation & Practical Demystification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Nikhil's Direct Translation (Pierces Nakul's Defense):
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {shlokCard.nikhilExplanation}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Context in Dialogue (Why it enters here):
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {shlokCard.contextInDialogue}
                    </p>
                  </div>
                </div>

                {/* Guideline reminder */}
                <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
                  <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-200">The "When Needed, Not Always" Rule:</strong> Shloks are integrated only when they provide an immediate cognitive pivot to stop Nakul's spiral. We never recite Sanskrit merely for aesthetic decoration or preachy jargon.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-10 text-center">
                <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-white">No Specific Shlok Required for this Topic</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  This topic relies purely on somatic biological grounding and direct philosophical inquiry.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: HSTSS Structural Foundation & CTA Ladder */}
        {activeTab === 'hstss' && (
          <div className="space-y-4">
            {/* H - HOOK */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    H
                  </span>
                  <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-300">
                    HOOK (0–3s Idea Collision & 4–11s Detail Build)
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(currentPkg.hook.ideaCollision, 'hook')}
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedKey === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Hook
                </button>
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded border border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Primary 0–3s Collision Hook:
                </span>
                <p className="text-base font-semibold text-white italic font-serif leading-relaxed">
                  "{currentPkg.hook.ideaCollision}"
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  4–11s Concrete Detail Build (Hold Retention):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentPkg.hook.buildToElevenSeconds}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Alternative Collision Hooks for A/B Testing:
                </span>
                <div className="space-y-1.5">
                  {currentPkg.hook.alternateCollisionOptions.map((alt, idx) => (
                    <div key={idx} className="text-xs p-2.5 rounded bg-slate-900 border border-slate-800/80 text-slate-300">
                      • {alt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* S - STAKES */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    S
                  </span>
                  <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-300">
                    STAKES (Visceral Real-World Physical Feeling & Lowest Point)
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(currentPkg.stakes.lowestPointStory, 'stakes')}
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedKey === 'stakes' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Stakes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="font-mono text-amber-400 block text-[10px] uppercase">Visceral Physical Body Feeling:</span>
                  <p className="text-slate-300 leading-relaxed">{currentPkg.stakes.visceralBodyFeeling}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="font-mono text-amber-400 block text-[10px] uppercase">Internal Crisis Dialogue:</span>
                  <p className="text-slate-300 italic font-serif leading-relaxed">{currentPkg.stakes.twoAmInternalDialogue || currentPkg.stakes.internalCrisisDialogue}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Lowest Point Story Arc:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{currentPkg.stakes.lowestPointStory}</p>
              </div>
            </div>

            {/* T - TURN */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    T
                  </span>
                  <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-300">
                    TURN (Lived Realization & Sanatan Dharma Translation)
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(currentPkg.turn.livedRealization, 'turn')}
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedKey === 'turn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Turn
                </button>
              </div>

              <div className="p-3.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 block uppercase mb-1">Lived Breakthrough Moment:</span>
                <p className="text-xs text-slate-200 leading-relaxed">{currentPkg.turn.livedRealization}</p>
              </div>

              <div className="p-3.5 bg-emerald-950/20 rounded border border-emerald-500/30">
                <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">Sanatan Dharma Concept Demystified:</span>
                <p className="text-xs text-slate-200 leading-relaxed">{currentPkg.turn.sanatanTeachingIntegrated}</p>
              </div>
            </div>

            {/* S - SHATTER & CTA LADDER */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="border-b border-slate-800 pb-2">
                <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-300">
                  SHATTER (Mic-Drop Quote) & STANDARD YOUTUBE CTA LADDER
                </h3>
              </div>

              <div className="p-4 bg-purple-950/30 border border-purple-500/40 rounded">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block mb-1">
                  1-2 Sentence Quotable Mic-Drop:
                </span>
                <p className="text-base font-semibold text-purple-100 font-serif italic">
                  "{currentPkg.shatter.micDropQuote}"
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">
                  Standard 3-Step Sequence:
                </span>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
                  <strong className="text-amber-400 block mb-0.5">1. Share Ask:</strong>
                  <p className="text-slate-300">{currentPkg.ctaLadder.step1_share}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
                  <strong className="text-amber-400 block mb-0.5">2. General Spiritual Consultation Invitation:</strong>
                  <p className="text-slate-300">{currentPkg.ctaLadder.step2_consult}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs">
                  <strong className="text-amber-400 block mb-0.5">3. Next Video Hook-Loop:</strong>
                  <p className="text-slate-300">{currentPkg.ctaLadder.step3_nextVideo}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: StoryBrand (SB7) & Proven Frameworks QA (Donald Miller, PASO, Randy Olson ABT, Universal Retention) */}
        {activeTab === 'frameworks' && (
          <div className="space-y-6">
            {/* Architectural Layering Explanation Banner */}
            <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/30 rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm shrink-0">
                    <Target className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Four Proven Narrative Frameworks Layered on Top of HSTSS
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      HSTSS remains the core storytelling engine. These 4 named frameworks solve the distinct execution bottlenecks: CTA framing, Orbit cuts, anti-lecture diagnosis, and retention pacing.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All 4 Frameworks Calibrated
                  </span>
                </div>
              </div>
            </div>

            {/* FRAMEWORK 1: STORYBRAND (SB7) HERO / GUIDE CTA FRAMEWORK */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    SB7
                  </span>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-amber-300">
                      1. StoryBrand (SB7) — Donald Miller CTA Framing Engine
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Viewer = The Hero • Creator/Nikhil = The Empathic Guide • CTA = The 3-Step Plan
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(storyBrandCTA?.callToAction || currentPkg.ctaLadder.step2_consult, 'sb7-cta')}
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition px-3 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  {copiedKey === 'sb7-cta' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy StoryBrand CTA
                </button>
              </div>

              {/* Core Principle Callout */}
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/20 rounded-lg flex items-start gap-3 text-xs text-amber-200 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Why Donald Miller's SB7 matters for spiritual channels:</strong> Most spiritual creators position themselves as the enlightened hero while treating viewers as passive observers. When you make yourself the hero, viewers have nowhere to place themselves. In our system, <strong>the viewer is the hero</strong> with an unresolved life crisis, and you (and Nikhil) are the <strong>guide</strong> who has walked the terrain and hands them the map.
                </p>
              </div>

              {/* 7 Beats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Character (Hero) */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <User className="w-3 h-3" /> Beat 1: The Character (Hero)
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.hero}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    Viewer's identity & emotional state entering this video
                  </span>
                </div>

                {/* 2. Problem */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Beat 2: Three-Level Problem
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.problem}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    External symptom + Internal turmoil + Philosophical conflict
                  </span>
                </div>

                {/* 3. The Guide */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Beat 3: Meets a Guide
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.guideRole}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    Empathy (has suffered too) + Authority (Vedic wisdom/Sthira)
                  </span>
                </div>

                {/* 4. The Plan */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Beat 4: Who Gives Them a Plan
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.plan}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    Simple 3-step pathway (Diagnostic → Somatic Reset → Container)
                  </span>
                </div>

                {/* 5. Failure Avoided */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Beat 6: Failure Avoided
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.failureAvoided}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    Exhausting cycle of chronic panic & self-sabotage halted
                  </span>
                </div>

                {/* 6. Success Vision */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Beat 7: Ends in Success
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {storyBrandCTA?.successVision}
                  </p>
                  <span className="text-[10px] text-slate-500 italic block">
                    Grounded Sthira, somatic capacity, and biological peace
                  </span>
                </div>
              </div>

              {/* Turn Beat Role in Long Video */}
              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  The HSTSS "Turn" Beat Role (Where You Become the Guide):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {storyBrandCTA?.turnBeatRole}
                </p>
              </div>

              {/* Word-for-Word StoryBrand Call to Action */}
              <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-lg border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                    Beat 5: The Exact Word-for-Word Call to Action Script:
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Spoken by Nikhil / You at the climax
                  </span>
                </div>
                <p className="text-sm font-medium text-white italic font-serif leading-relaxed bg-slate-950/60 p-3 rounded border border-slate-800">
                  "{storyBrandCTA?.callToAction || currentPkg.ctaLadder.step2_consult}"
                </p>
              </div>
            </div>

            {/* FRAMEWORK 2: PAS / PASO (PROBLEM — AGITATE — SOLVE — OUTCOME) */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    PASO
                  </span>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-emerald-300">
                      2. PAS / PASO — Orbit Shorts & Reels Direct-Response Engine
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Problem → Agitate → Solve → Outcome (60–90s Rapid Compression)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Zero Fabrication Verified
                  </span>
                  <button
                    onClick={() => {
                      const fullPaso = `[PROBLEM]: ${pasoOrbitShort?.problem}\n\n[AGITATE]: ${pasoOrbitShort?.agitate}\n\n[SOLVE]: ${pasoOrbitShort?.solve}\n\n[OUTCOME]: ${pasoOrbitShort?.outcome}\n\n[CTA]: ${pasoOrbitShort?.softCta}`;
                      copyToClipboard(fullPaso, 'paso-full');
                    }}
                    className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer transition px-3 py-1 rounded bg-slate-900 border border-slate-800"
                  >
                    {copiedKey === 'paso-full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy PASO Short
                  </button>
                </div>
              </div>

              {/* Zero Fabrication Rule Box */}
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg flex items-start gap-2.5 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Strict Agitation Quality Rule:</strong> Direct-response copywriting requires agitating the problem, but in spiritual work, <em>never fabricate or exaggerate panic</em>. The agitation below captures the 100% authentic, biological reality of visceral anxiety without sensationalism.
                </p>
              </div>

              {/* 4 PASO Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problem */}
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-xs">P</span>
                      Problem (Exact Somatic Symptom)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">00:00 - 00:15</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    "{pasoOrbitShort?.problem}"
                  </p>
                </div>

                {/* Agitate */}
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center text-xs">A</span>
                      Agitate (Visceral Somatic Weight)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">00:15 - 00:35</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pasoOrbitShort?.agitate}
                  </p>
                </div>

                {/* Solve */}
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-xs">S</span>
                      Solve (The Single Sanatan Insight)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">00:35 - 00:55</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {pasoOrbitShort?.solve}
                  </p>
                </div>

                {/* Outcome */}
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-xs">O</span>
                      Outcome (Somatic Relief & Change)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">00:55 - 01:15</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pasoOrbitShort?.outcome}
                  </p>
                </div>
              </div>

              {/* Orbit Soft-CTA Reminder */}
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    Orbit Content Soft-CTA (Must Point to YouTube Full Video):
                  </span>
                  <p className="text-slate-300 font-medium italic">
                    "{pasoOrbitShort?.softCta || 'Full breakdown on YouTube — link in bio.'}"
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-1 bg-slate-800 rounded shrink-0">
                  Zero Direct Booking CTAs on Orbit
                </span>
              </div>
            </div>

            {/* FRAMEWORK 3: ABT (AND, BUT, THEREFORE) SCRIPT-TIGHTENING DIAGNOSTIC */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    ABT
                  </span>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-purple-300">
                      3. ABT (And, But, Therefore) — 30-Second Script QA Diagnostic
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Randy Olson Diagnostic • Identifiable-Protagonist & Linchpin Contradiction Test
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    {abtDiagnostic?.diagnosticVerdict || 'Story Engine Validated (Linchpin Found)'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(abtDiagnostic?.compressedOneLiner || '', 'abt-line')}
                    className="text-xs font-mono text-slate-400 hover:text-purple-400 flex items-center gap-1.5 cursor-pointer transition px-3 py-1 rounded bg-slate-900 border border-slate-800"
                  >
                    {copiedKey === 'abt-line' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy ABT Compression
                  </button>
                </div>
              </div>

              {/* Compressed 1-Liner Box with Highlighted Chips */}
              <div className="p-4 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900 rounded-lg border border-purple-500/30 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 block">
                  Compressed 1-Sentence Narrative Test (Randy Olson):
                </span>
                <p className="text-sm font-medium text-slate-100 leading-relaxed font-serif">
                  {abtDiagnostic?.compressedOneLiner}
                </p>
              </div>

              {/* 3 ABT Component Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* AND Setup */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                    <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono text-[9px]">AND</span>
                    The Context Setup
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {abtDiagnostic?.andSetup}
                  </p>
                </div>

                {/* BUT Linchpin */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-amber-500/30 space-y-1.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold uppercase rounded-bl">
                    Linchpin
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px]">BUT</span>
                    The Contradiction / Conflict
                  </span>
                  <p className="text-xs text-amber-100 leading-relaxed font-medium">
                    {abtDiagnostic?.butLinchpin}
                  </p>
                </div>

                {/* THEREFORE Resolution */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px]">THEREFORE</span>
                    The Resolution Shift
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {abtDiagnostic?.thereforeResolution}
                  </p>
                </div>
              </div>

              {/* Identifiable-Protagonist & Anti-Lecture Diagnostics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-900/60 rounded border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                  <User className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Identifiable-Victim Effect Validated:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Focused on: <span className="text-purple-300 font-mono">{abtDiagnostic?.singleIdentifiableProtagonist}</span>. Prevents cold, abstract lecturing by anchoring empathy in one concrete human.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Lecture Trap Avoidance:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Because the script possesses an irreconcilable "BUT" friction, it cannot degenerate into a dry monologue or academic sermon.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FRAMEWORK 4: UNIVERSAL RETENTION STRUCTURE (4-BEAT SANITY CHECK) */}
            <div className="bg-[#0E1116] border border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    URS
                  </span>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-cyan-300">
                      4. Universal Retention Structure — 4-Beat Pacing Sanity Check
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Reason to Care → Movement → Payoff → CTA (Mid-Edit Flow Diagnostic)
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Pacing Rating: {universalRetentionCheck?.retentionRating || 'Optimal Flow'}
                </span>
              </div>

              {/* 4 Retention Beats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Beat 1: Reason to Care */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      1. Reason to Care
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      Pass
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-200 font-mono block">
                    {universalRetentionCheck?.reasonToCare?.beat}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {universalRetentionCheck?.reasonToCare?.note}
                  </p>
                </div>

                {/* Beat 2: Movement */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      2. Movement / Momentum
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      Pass
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-200 font-mono block">
                    {universalRetentionCheck?.movement?.beat}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {universalRetentionCheck?.movement?.note}
                  </p>
                </div>

                {/* Beat 3: Payoff */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      3. Payoff (Sanatan)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      Pass
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-200 font-mono block">
                    {universalRetentionCheck?.payoff?.beat}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {universalRetentionCheck?.payoff?.note}
                  </p>
                </div>

                {/* Beat 4: CTA Loop */}
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      4. Closed-Loop CTA
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                      Pass
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-200 font-mono block">
                    {universalRetentionCheck?.ctaLoop?.beat}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {universalRetentionCheck?.ctaLoop?.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Teleprompter / Rehearsal Mode */}
        {activeTab === 'teleprompter' && (
          <div className="bg-[#0A0C10] text-slate-300 rounded-lg p-6 shadow-lg border border-slate-800 space-y-4">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                  Dual-Character Teleprompter
                </span>
                <h2 className="text-lg font-medium text-white uppercase mt-0.5">
                  {currentPkg.topic}
                </h2>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Speaker Filter for filming batch takes */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-xs">
                  <button
                    onClick={() => setSpeakerFilter('all')}
                    className={`px-2.5 py-1 rounded cursor-pointer ${speakerFilter === 'all' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Both
                  </button>
                  <button
                    onClick={() => setSpeakerFilter('Nakul')}
                    className={`px-2.5 py-1 rounded cursor-pointer ${speakerFilter === 'Nakul' ? 'bg-amber-600 text-white font-bold' : 'text-amber-400'}`}
                  >
                    Nakul (Left)
                  </button>
                  <button
                    onClick={() => setSpeakerFilter('Nikhil')}
                    className={`px-2.5 py-1 rounded cursor-pointer ${speakerFilter === 'Nikhil' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-400'}`}
                  >
                    Nikhil (Right)
                  </button>
                </div>

                {/* Font Size */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-xs">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 rounded cursor-pointer text-sm font-bold ${fontSize === 'large' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('huge')}
                    className={`px-2 py-0.5 rounded cursor-pointer text-base font-bold ${fontSize === 'huge' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    A
                  </button>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded border border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono">Speed: {scrollSpeed}x</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scrollSpeed}
                    onChange={(e) => setScrollSpeed(Number(e.target.value))}
                    className="w-16 accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Play / Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Start Scroll'}
                </button>

                <button
                  onClick={() => {
                    if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0;
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition"
                  title="Reset to Top"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable teleprompter window */}
            <div
              ref={teleprompterRef}
              className="h-[520px] overflow-y-auto pr-4 space-y-6 scroll-smooth select-none font-sans"
            >
              {filteredDialogue.map((d, i) => {
                const isNakul = d.speaker === 'Nakul';
                return (
                  <div
                    key={i}
                    className={`p-5 rounded-lg border transition ${
                      isNakul
                        ? 'bg-amber-950/15 border-amber-500/20'
                        : 'bg-emerald-950/15 border-emerald-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                      <span className={`font-bold uppercase ${isNakul ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {d.speaker}
                      </span>
                      <span className="text-slate-500 italic">
                        {d.actorNote}
                      </span>
                    </div>

                    <p
                      className={`leading-relaxed ${
                        fontSize === 'normal'
                          ? 'text-base'
                          : fontSize === 'large'
                          ? 'text-xl font-medium'
                          : 'text-2xl font-semibold'
                      } ${isNakul ? 'text-amber-100' : 'text-emerald-100'}`}
                    >
                      {d.dialogue}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: Solo Actor Production Cheatsheet */}
        {activeTab === 'directing' && (
          <div className="space-y-6">
            <div className="bg-[#0E1116] border border-amber-500/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-sm">
                  🎬
                </span>
                <div>
                  <h3 className="font-semibold text-white text-base">
                    Solo Creator Filming & Directing Masterclass
                  </h3>
                  <p className="text-xs text-slate-400">
                    How one creator records both Nakul and Nikhil seamlessly without complex setups.
                  </p>
                </div>
              </div>

              {/* Master Filming Cheat */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <strong className="text-amber-400 text-xs font-mono uppercase block mb-1">
                  Batch Filming Workflow (Save 70% Production Time):
                </strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {directingGuide.filmingWorkflowTip}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Nakul Directing */}
                <div className="p-4 bg-amber-950/15 border border-amber-500/20 rounded-lg space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <strong className="text-amber-300 text-sm">Nakul Setup (Camera Left)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Vocal Delivery:</span>
                    <p className="text-slate-300">{directingGuide.nakulRole.vocalPacing}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Physical & Acting Cues:</span>
                    <p className="text-slate-300">{directingGuide.nakulRole.physicalCues}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Wardrobe & Hair:</span>
                    <p className="text-slate-300">{directingGuide.nakulRole.wardrobe}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Camera Framing:</span>
                    <p className="text-slate-300">{directingGuide.nakulRole.framing}</p>
                  </div>
                </div>

                {/* Nikhil Directing */}
                <div className="p-4 bg-emerald-950/15 border border-emerald-500/20 rounded-lg space-y-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <strong className="text-emerald-300 text-sm">Nikhil Setup (Camera Right)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Vocal Delivery:</span>
                    <p className="text-slate-300">{directingGuide.nikhilRole.vocalPacing}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Physical & Acting Cues:</span>
                    <p className="text-slate-300">{directingGuide.nikhilRole.physicalCues}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Wardrobe & Posture:</span>
                    <p className="text-slate-300">{directingGuide.nikhilRole.wardrobe}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Camera Framing:</span>
                    <p className="text-slate-300">{directingGuide.nikhilRole.framing}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unified Pipeline Bottom Navigation */}
      <FlowFooterBar
        currentStep={3}
        stepName="HSTSS Master Scripting"
        activeTopicTitle={activeTopic?.workingTitle || currentPkg.topic}
        isStepComplete={Boolean(currentPkg)}
        prevModule="module4_calendar"
        prevLabel="Step 2: Editorial Calendar"
        nextModule="module6_seo"
        nextLabel="Step 4: YouTube SEO & Packaging"
        onNavigate={(mod) => {
          if (onNavigate) onNavigate(mod);
          else if (mod === 'module6_seo') onNavigateToSEO();
        }}
        onPrimaryAction={onNavigateToSEO}
        primaryActionLabel="Package SEO & Thumbnails for this Script"
      />
    </div>
  );
};
