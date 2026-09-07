/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveModule } from './components/Navbar';
import { FlowStepper } from './components/FlowStepper';
import { DashboardView } from './components/DashboardView';
import { StrategyHubView } from './components/StrategyHubView';
import { TrendAnalystView } from './components/TrendAnalystView';
import { TopicStudioView } from './components/TopicStudioView';
import { CalendarView } from './components/CalendarView';
import { ScriptStudioView } from './components/ScriptStudioView';
import { SEOPackagingView } from './components/SEOPackagingView';
import { PinterestStudioView } from './components/PinterestStudioView';
import { GrowthAndLearningView } from './components/GrowthAndLearningView';
import { SupabaseLinkModal } from './components/SupabaseLinkModal';
import { AutoPilotBriefStudio } from './components/AutoPilotBriefStudio';
import { IdeasAndFlowView } from './components/IdeasAndFlowView';
import { CategoryProvider } from './context/CategoryContext';
import { CategoryManagerModal } from './components/CategoryManagerModal';

import { 
  TopicIdea, 
  TrendItem, 
  CalendarItem, 
  PerformanceFeedbackLog, 
  LearningSystemState,
  ScriptPackage,
  SEOPackage,
  PinterestPackage,
  GrowthPlaybook,
  LifeProblemCategory,
  AutoPilotRunResult,
  CreatorMindsetProfile
} from './types';

import { 
  INITIAL_TRENDS, 
  INITIAL_TOPICS, 
  INITIAL_CALENDAR, 
  INITIAL_FEEDBACK_LOGS, 
  INITIAL_LEARNING_STATE 
} from './data/mockData';

import {
  INITIAL_SCRIPT_PACKAGE,
  INITIAL_SEO_PACKAGE,
  INITIAL_PINTEREST_PACKAGE,
  INITIAL_GROWTH_PLAYBOOK
} from './data/initialPackages';

const STORAGE_KEYS = {
  TOPICS: 'dharmacraft_topics_v3',
  CALENDAR: 'dharmacraft_calendar_v3',
  ACTIVE_TOPIC_ID: 'dharmacraft_active_topic_id_v3'
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  
  // State Collections with resilient local storage hydration
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_TRENDS);
  const [topics, setTopics] = useState<TopicIdea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TOPICS;
  });
  const [activeTopic, setActiveTopic] = useState<TopicIdea>(() => {
    try {
      const savedTopics = localStorage.getItem(STORAGE_KEYS.TOPICS);
      const savedId = localStorage.getItem(STORAGE_KEYS.ACTIVE_TOPIC_ID);
      if (savedTopics) {
        const list = JSON.parse(savedTopics);
        if (Array.isArray(list) && list.length > 0) {
          const found = list.find((t: TopicIdea) => t.id === savedId);
          if (found) return found;
          return list[0];
        }
      }
    } catch (e) {}
    return INITIAL_TOPICS[0];
  });
  const [calendar, setCalendar] = useState<CalendarItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_CALENDAR;
  });
  const [feedbackLogs, setFeedbackLogs] = useState<PerformanceFeedbackLog[]>(INITIAL_FEEDBACK_LOGS);
  const [learningState, setLearningState] = useState<LearningSystemState>(INITIAL_LEARNING_STATE);
  const [mindsetProfile, setMindsetProfile] = useState<CreatorMindsetProfile | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Content Artifacts for active topic
  const [scriptPackage, setScriptPackage] = useState<ScriptPackage | null>(INITIAL_SCRIPT_PACKAGE);
  const [seoPackage, setSeoPackage] = useState<SEOPackage | null>(INITIAL_SEO_PACKAGE);
  const [pinterestPackage, setPinterestPackage] = useState<PinterestPackage | null>(INITIAL_PINTEREST_PACKAGE);
  const [growthPlaybook, setGrowthPlaybook] = useState<GrowthPlaybook | null>(INITIAL_GROWTH_PLAYBOOK);

  // Hydrate persistent state from Database / Server Store on initial mount with non-destructive merge
  useEffect(() => {
    fetch('/api/app-state')
      .then(res => res.json())
      .then(data => {
        if (data.topics && Array.isArray(data.topics) && data.topics.length > 0) {
          setTopics(prev => {
            const serverTopics: TopicIdea[] = data.topics;
            const serverIds = new Set(serverTopics.map(t => t.id));
            const serverTitles = new Set(serverTopics.map(t => t.workingTitle.toLowerCase().trim()));
            
            // Keep all server topics, plus any locally created topics that aren't on server yet
            const localUnique = prev.filter(t => 
              !serverIds.has(t.id) && !serverTitles.has(t.workingTitle.toLowerCase().trim())
            );
            const merged = [...localUnique, ...serverTopics];
            
            try {
              localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(merged));
            } catch (e) {}

            // If client had offline/local topics, sync them back to the server store
            if (localUnique.length > 0) {
              fetch('/api/topics/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topics: merged })
              }).catch(e => console.warn('[App] Could not sync local topics to server:', e));
            }

            return merged;
          });
        }
        if (data.scriptPackage && data.scriptPackage.hook) {
          setScriptPackage(data.scriptPackage);
        }
        if (data.calendar && Array.isArray(data.calendar) && data.calendar.length > 0) {
          setCalendar(prev => {
            const serverItems: CalendarItem[] = data.calendar;
            const serverIds = new Set(serverItems.map(c => c.id));
            const localUnique = prev.filter(c => !serverIds.has(c.id));
            const merged = [...serverItems, ...localUnique];
            try {
              localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
        if (data.feedbackLogs && Array.isArray(data.feedbackLogs) && data.feedbackLogs.length > 0) {
          setFeedbackLogs(data.feedbackLogs);
        }
        if (data.learningState && data.learningState.seoLessons) {
          setLearningState(data.learningState);
        }
        if (data.mindsetProfile) {
          setMindsetProfile(data.mindsetProfile);
        }
      })
      .catch(err => console.warn('[App] Could not load persisted database state:', err));
  }, []);

  // Save activeTopic to localStorage
  const handleSetActiveTopic = (topic: TopicIdea) => {
    setActiveTopic(topic);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TOPIC_ID, topic.id);
    } catch (e) {}
  };

  // Handlers with persistent database synchronization
  const handleAddTrend = (newTrend: TrendItem) => {
    setTrends(prev => [newTrend, ...prev]);
  };

  const handlePromoteTrendToTopic = (trend: TrendItem) => {
    const newTopic: TopicIdea = {
      id: `topic-promoted-${Date.now()}`,
      workingTitle: trend.trendTerm.length > 55 ? trend.trendTerm.slice(0, 52) + '...' : trend.trendTerm,
      category: trend.category,
      concept: trend.contentAngle,
      whyNow: `Rising search trend on ${trend.platform} (${trend.searchVolumeEstimate || '+40%'})`,
      bestFormat: 'long-form YouTube',
      hook: `Stop trying to solve ${trend.trendTerm} with generic willpower.`,
      status: 'in_progress'
    };
    handleAddTopic(newTopic);
    handleSetActiveTopic(newTopic);
    setActiveModule('module3_topics');
  };

  const handleAddTopic = (newTopic: TopicIdea) => {
    setTopics(prev => {
      const updated = [newTopic, ...prev.filter(t => t.id !== newTopic.id)];
      try {
        localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(updated));
      } catch (e) {}
      fetch('/api/topics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: updated })
      }).catch(e => console.warn('Could not persist topics:', e));
      return updated;
    });
  };

  const handleAddTopics = (newTopics: TopicIdea[]) => {
    if (!newTopics || newTopics.length === 0) return;
    setTopics(prev => {
      const newIds = new Set(newTopics.map(t => t.id));
      const newTitles = new Set(newTopics.map(t => t.workingTitle.toLowerCase().trim()));
      const filteredPrev = prev.filter(t => !newIds.has(t.id) && !newTitles.has(t.workingTitle.toLowerCase().trim()));
      const updated = [...newTopics, ...filteredPrev];
      try {
        localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(updated));
      } catch (e) {}
      fetch('/api/topics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: updated })
      }).catch(e => console.warn('Could not persist topics batch:', e));
      return updated;
    });
  };

  const handleAddCalendarItem = (item: CalendarItem) => {
    setCalendar(prev => {
      const updated = [item, ...prev.filter(c => c.id !== item.id)];
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(updated));
      } catch (e) {}
      fetch('/api/calendar/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendar: updated })
      }).catch(e => console.warn('Could not persist calendar:', e));
      return updated;
    });
  };

  const handleUpdateCalendarItem = (updatedItem: CalendarItem) => {
    setCalendar(prev => {
      const updated = prev.map(item => item.id === updatedItem.id ? updatedItem : item);
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(updated));
      } catch (e) {}
      fetch('/api/calendar/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendar: updated })
      }).catch(e => console.warn('Could not persist calendar:', e));
      return updated;
    });
  };

  const handleAddFeedbackLog = (log: PerformanceFeedbackLog) => {
    setFeedbackLogs(prev => [log, ...prev]);
    fetch('/api/feedback/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log })
    }).catch(e => console.warn('Could not persist feedback log:', e));
  };

  const handleUpdateLearningState = (newState: LearningSystemState) => {
    setLearningState(newState);
    fetch('/api/learning/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: newState })
    }).catch(e => console.warn('Could not persist learning state:', e));
  };

  const handleSelectTopicForScript = (title: string, cat: LifeProblemCategory) => {
    const existing = topics.find(t => t.workingTitle === title);
    if (existing) {
      setActiveTopic(existing);
    } else {
      const created: TopicIdea = {
        id: `topic-${Date.now()}`,
        workingTitle: title,
        category: cat,
        concept: 'Sanatan Dharma grounding & somatic release',
        whyNow: 'Scheduled in Content Calendar',
        bestFormat: 'long-form YouTube',
        hook: `The real reason ${title.toLowerCase()} won't go away with talk therapy.`,
        status: 'in_progress'
      };
      setTopics(prev => [created, ...prev]);
      setActiveTopic(created);
    }
    setActiveModule('module5_scripts');
  };

  const handleAutoPilotComplete = (result: AutoPilotRunResult) => {
    // 1. Sync Topics
    setTopics(prev => {
      const updatedTopics = [result.topic, ...prev.filter(t => t.id !== result.topic.id)];
      try {
        localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(updatedTopics));
      } catch (e) {}
      fetch('/api/topics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: updatedTopics })
      }).catch(e => console.warn('Could not persist topics from AutoPilot:', e));
      return updatedTopics;
    });
    handleSetActiveTopic(result.topic);

    // 2. Sync Calendar with new anchor and satellites
    setCalendar(prev => {
      const updatedCalendar = [...result.calendarItems, ...prev.filter(c => !result.calendarItems.some(item => item.id === c.id))];
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(updatedCalendar));
      } catch (e) {}
      fetch('/api/calendar/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendar: updatedCalendar })
      }).catch(e => console.warn('Could not persist calendar from AutoPilot:', e));
      return updatedCalendar;
    });

    // 3. Sync Script Package
    if (result.scriptPackage) {
      setScriptPackage(result.scriptPackage);
    }

    // 4. Sync SEO Package
    if (result.seoPackage) {
      setSeoPackage(result.seoPackage);
    }

    // 5. Sync Pinterest Package
    if (result.pinterestPackage) {
      setPinterestPackage(result.pinterestPackage);
    }

    // 6. Sync Mindset Profile if evolved
    if ((result as any).mindsetProfile) {
      setMindsetProfile((result as any).mindsetProfile);
    }
  };

  const handleUpdateMindsetGuidance = async (guidance: string) => {
    try {
      const res = await fetch('/api/mindset/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guidance })
      });
      const json = await res.json();
      if (json.profile) {
        setMindsetProfile(json.profile);
      }
    } catch (err) {
      console.warn('[App] Failed to update mindset guidance:', err);
    }
  };

  const handleAddMindsetRule = async (ruleData: { category: any; rule: string; sourceIdeaOrBrief?: string }) => {
    try {
      const res = await fetch('/api/mindset/add-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleData)
      });
      const json = await res.json();
      if (json.profile) {
        setMindsetProfile(json.profile);
      }
    } catch (err) {
      console.warn('[App] Failed to add mindset rule:', err);
    }
  };

  const handleRemoveMindsetRule = async (ruleId: string) => {
    try {
      const res = await fetch('/api/mindset/remove-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleId })
      });
      const json = await res.json();
      if (json.profile) {
        setMindsetProfile(json.profile);
      }
    } catch (err) {
      console.warn('[App] Failed to remove mindset rule:', err);
    }
  };

  const handleScheduleTopic = (topic: TopicIdea, dateStr: string) => {
    const anchorId = `cal-anchor-${topic.id}-${Date.now()}`;
    const d = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[d.getDay()] || 'Sunday';

    const anchorItem: CalendarItem = {
      id: anchorId,
      date: dateStr,
      dayOfWeek,
      festivalOrTithi: topic.festivalTie?.eventName || 'Sanatan Alignment',
      platform: 'YouTube',
      contentType: 'Long-form Video',
      title: topic.workingTitle,
      category: topic.category,
      status: 'Scheduled',
      notes: `Anchor long-form video mapped to ${topic.concept}`
    };

    const offsets = [
      { days: -2, platform: 'Meta/Stories' as const, contentType: 'Pre-Launch Hype' as const, prefix: 'Teaser Reel: ' },
      { days: 1, platform: 'Instagram/Facebook' as const, contentType: 'Short/Reel' as const, prefix: 'Reel 1 (Payday Freeze): ' },
      { days: 2, platform: 'Instagram/Facebook' as const, contentType: 'Carousel' as const, prefix: 'Carousel: ' },
      { days: 3, platform: 'Instagram/Facebook' as const, contentType: 'Short/Reel' as const, prefix: 'Reel 2 (Dialogue Clash): ' },
      { days: 4, platform: 'Pinterest' as const, contentType: 'Pinterest Pin' as const, prefix: 'Rich Pin: ' },
      { days: 5, platform: 'Instagram/Facebook' as const, contentType: 'Short/Reel' as const, prefix: 'Reel 3 (Shlok Resolution): ' },
    ];

    const satellites: CalendarItem[] = offsets.map((off, idx) => {
      const satDate = new Date(d);
      satDate.setDate(satDate.getDate() + off.days);
      const satDateStr = satDate.toISOString().slice(0, 10);
      const satDay = dayNames[satDate.getDay()];
      return {
        id: `cal-sat-${topic.id}-${idx}-${Date.now()}`,
        date: satDateStr,
        dayOfWeek: satDay,
        platform: off.platform,
        contentType: off.contentType,
        title: `${off.prefix}${topic.workingTitle}`,
        category: topic.category,
        status: 'Scheduled',
        parentLongformId: anchorId,
        notes: `Satellite repurposed from anchor ${topic.workingTitle}`
      };
    });

    setCalendar(prev => {
      const updatedCalendar = [
        anchorItem, 
        ...satellites, 
        ...prev.filter(c => !c.title.toLowerCase().includes(topic.workingTitle.toLowerCase()) && c.parentLongformId !== anchorId)
      ];
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(updatedCalendar));
      } catch (e) {}
      fetch('/api/calendar/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendar: updatedCalendar })
      }).catch(e => console.warn('Could not persist calendar schedule:', e));
      return updatedCalendar;
    });

    // Also update topic status to in_progress
    setTopics(prev => {
      const updatedTopics = prev.map(t => t.id === topic.id ? { ...t, status: 'in_progress' as const } : t);
      try {
        localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(updatedTopics));
      } catch (e) {}
      fetch('/api/topics/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: updatedTopics })
      }).catch(e => console.warn('Could not persist topic status:', e));
      return updatedTopics;
    });

    handleSetActiveTopic(topic);
  };

  const isTopicScheduled = calendar.some(c => 
    c.title.toLowerCase().includes(activeTopic?.workingTitle.toLowerCase() || '') ||
    (activeTopic?.workingTitle && c.title.toLowerCase().includes(activeTopic.workingTitle.slice(0, 20).toLowerCase()))
  );

  const stepStatus = {
    ideation: Boolean(activeTopic),
    calendar: isTopicScheduled,
    script: Boolean(scriptPackage && scriptPackage.hook),
    seo: Boolean(seoPackage && seoPackage.titles?.length > 0),
    pinterest: Boolean(pinterestPackage && pinterestPackage.pins?.length > 0),
    growth: Boolean(growthPlaybook && (growthPlaybook.atomizationMap?.breakdown?.length > 0 || growthPlaybook.preLaunchHype))
  };

  return (
    <CategoryProvider>
      <div className="min-h-screen bg-[#0A0C10] text-slate-300 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-300">
        {/* Top Brand Navbar */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        activeTopic={activeTopic}
        topics={topics}
        onSelectTopic={setActiveTopic}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
      />

      {/* Persistent Content Creation Flow Stepper Bar */}
      <FlowStepper
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        activeTopic={activeTopic}
        stepStatus={stepStatus}
      />

      {/* Dynamic View Router */}
      <main className="flex-1 pb-16">
        {activeModule === 'dashboard' && (
          <DashboardView
            topics={topics}
            calendar={calendar}
            feedbackLogs={feedbackLogs}
            learningState={learningState}
            activeTopic={activeTopic}
            stepStatus={stepStatus}
            scriptPackage={scriptPackage}
            seoPackage={seoPackage}
            pinterestPackage={pinterestPackage}
            growthPlaybook={growthPlaybook}
            onNavigate={setActiveModule}
            onSelectTopic={setActiveTopic}
          />
        )}

        {activeModule === 'auto_pilot' && (
          <AutoPilotBriefStudio
            existingCalendar={calendar}
            existingTopics={topics}
            mindsetProfile={mindsetProfile}
            onAutoPilotComplete={handleAutoPilotComplete}
            onUpdateMindsetGuidance={handleUpdateMindsetGuidance}
            onAddMindsetRule={handleAddMindsetRule}
            onRemoveMindsetRule={handleRemoveMindsetRule}
            onSelectTopicForScript={handleSelectTopicForScript}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'ideas_flow' && (
          <IdeasAndFlowView
            topics={topics}
            calendar={calendar}
            activeTopic={activeTopic}
            scriptPackage={scriptPackage}
            onSelectTopic={setActiveTopic}
            onAddTopic={handleAddTopic}
            onScheduleTopic={handleScheduleTopic}
            onNavigate={setActiveModule}
            onAutoPilotComplete={handleAutoPilotComplete}
          />
        )}

        {activeModule === 'module1_strategy' && (
          <StrategyHubView />
        )}

        {activeModule === 'module2_trends' && (
          <TrendAnalystView
            trends={trends}
            onAddTrend={handleAddTrend}
            onPromoteToTopic={handlePromoteTrendToTopic}
          />
        )}

        {activeModule === 'module3_topics' && (
          <TopicStudioView
            topics={topics}
            activeTopic={activeTopic}
            onSelectTopic={setActiveTopic}
            onAddTopic={handleAddTopic}
            onNavigateToScript={(topic) => {
              setActiveTopic(topic);
              setActiveModule('module5_scripts');
            }}
            onNavigateToCalendar={(topic) => {
              setActiveTopic(topic);
              setActiveModule('module4_calendar');
            }}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'module4_calendar' && (
          <CalendarView
            calendar={calendar}
            topics={topics}
            activeTopic={activeTopic}
            onAddCalendarItem={handleAddCalendarItem}
            onUpdateCalendarItem={handleUpdateCalendarItem}
            onSelectTopicForScript={handleSelectTopicForScript}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'module5_scripts' && (
          <ScriptStudioView
            activeTopic={activeTopic}
            scriptPackage={scriptPackage}
            onUpdateScriptPackage={setScriptPackage}
            onNavigateToSEO={() => setActiveModule('module6_seo')}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'module6_seo' && (
          <SEOPackagingView
            activeTopic={activeTopic}
            scriptPackage={scriptPackage}
            seoPackage={seoPackage}
            onUpdateSEOPackage={setSeoPackage}
            onNavigateToPinterest={() => setActiveModule('module7_pinterest')}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'module7_pinterest' && (
          <PinterestStudioView
            activeTopic={activeTopic}
            pinterestPackage={pinterestPackage}
            onUpdatePinterestPackage={setPinterestPackage}
            onNavigateToGrowth={() => setActiveModule('module8_growth')}
            onNavigate={setActiveModule}
          />
        )}

        {activeModule === 'module8_growth' && (
          <GrowthAndLearningView
            activeTopic={activeTopic}
            growthPlaybook={growthPlaybook}
            feedbackLogs={feedbackLogs}
            learningState={learningState}
            mindsetProfile={mindsetProfile}
            onUpdateGrowthPlaybook={setGrowthPlaybook}
            onAddFeedbackLog={handleAddFeedbackLog}
            onUpdateLearningState={handleUpdateLearningState}
            onUpdateMindsetGuidance={handleUpdateMindsetGuidance}
            onAddMindsetRule={handleAddMindsetRule}
            onRemoveMindsetRule={handleRemoveMindsetRule}
            onNavigate={setActiveModule}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0E1116] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-amber-500/20 border border-amber-500/40 rotate-45 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" />
            </div>
            <span className="font-semibold uppercase tracking-wider text-slate-300">DharmaCraft <span className="text-amber-500 font-light">Prana Engine v2.4</span></span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">Vedic Social Content & SEO Intelligence</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Geometric Balance • Shastra Integrity • 1-to-10 Repurposing • &lt;40% Category Constraint
          </div>
        </div>
      </footer>

      {/* Supabase PostgreSQL Integration & Cloud Sync Modal */}
      <SupabaseLinkModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        activeScript={scriptPackage}
        topics={topics}
      />

      {/* Dynamic Category Manager & CRUD Modal */}
      <CategoryManagerModal
        topics={topics}
        calendar={calendar}
      />
    </div>
    </CategoryProvider>
  );
}
