/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  LifeProblemCategory
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

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  
  // State Collections
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_TRENDS);
  const [topics, setTopics] = useState<TopicIdea[]>(INITIAL_TOPICS);
  const [activeTopic, setActiveTopic] = useState<TopicIdea>(INITIAL_TOPICS[0]);
  const [calendar, setCalendar] = useState<CalendarItem[]>(INITIAL_CALENDAR);
  const [feedbackLogs, setFeedbackLogs] = useState<PerformanceFeedbackLog[]>(INITIAL_FEEDBACK_LOGS);
  const [learningState, setLearningState] = useState<LearningSystemState>(INITIAL_LEARNING_STATE);

  // Content Artifacts for active topic
  const [scriptPackage, setScriptPackage] = useState<ScriptPackage | null>(INITIAL_SCRIPT_PACKAGE);
  const [seoPackage, setSeoPackage] = useState<SEOPackage | null>(INITIAL_SEO_PACKAGE);
  const [pinterestPackage, setPinterestPackage] = useState<PinterestPackage | null>(INITIAL_PINTEREST_PACKAGE);
  const [growthPlaybook, setGrowthPlaybook] = useState<GrowthPlaybook | null>(INITIAL_GROWTH_PLAYBOOK);

  // Handlers
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
    setTopics(prev => [newTopic, ...prev]);
    setActiveTopic(newTopic);
    setActiveModule('module3_topics');
  };

  const handleAddTopic = (newTopic: TopicIdea) => {
    setTopics(prev => [newTopic, ...prev]);
  };

  const handleAddCalendarItem = (item: CalendarItem) => {
    setCalendar(prev => [item, ...prev]);
  };

  const handleUpdateCalendarItem = (updated: CalendarItem) => {
    setCalendar(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const handleAddFeedbackLog = (log: PerformanceFeedbackLog) => {
    setFeedbackLogs(prev => [log, ...prev]);
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
    <div className="min-h-screen bg-[#0A0C10] text-slate-300 flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-300">
      {/* Top Brand Navbar */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        activeTopic={activeTopic}
        topics={topics}
        onSelectTopic={setActiveTopic}
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
            onUpdateGrowthPlaybook={setGrowthPlaybook}
            onAddFeedbackLog={handleAddFeedbackLog}
            onUpdateLearningState={setLearningState}
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
    </div>
  );
}
