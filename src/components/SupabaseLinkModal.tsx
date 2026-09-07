import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  X, 
  Sparkles, 
  ShieldCheck, 
  UploadCloud, 
  DownloadCloud,
  FileCode2,
  Terminal,
  Server
} from 'lucide-react';
import { TopicIdea, ScriptPackage } from '../types';

interface SupabaseStatus {
  isConfigured: boolean;
  url: string | null;
  hasServiceRoleKey: boolean;
  hasAnonKey: boolean;
  instruction?: string;
}

interface SupabaseLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScript?: ScriptPackage | null;
  topics?: TopicIdea[];
}

export const SupabaseLinkModal: React.FC<SupabaseLinkModalProps> = ({
  isOpen,
  onClose,
  activeScript,
  topics = []
}) => {
  const [status, setStatus] = useState<SupabaseStatus | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    tableCreated?: boolean;
    hint?: string;
  } | null>(null);
  const [schemaSql, setSchemaSql] = useState<string>('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [syncingScript, setSyncingScript] = useState(false);
  const [syncingTopics, setSyncingTopics] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'status' | 'schema' | 'sync'>('status');

  // Fetch status and SQL schema
  const fetchStatusAndSchema = async () => {
    setIsLoadingStatus(true);
    try {
      const [resStatus, resSchema] = await Promise.all([
        fetch('/api/supabase/status').then(r => r.json()),
        fetch('/api/supabase/schema').then(r => r.json())
      ]);
      setStatus(resStatus);
      setSchemaSql(resSchema.sql || '');
    } catch (err) {
      console.error('Failed to fetch Supabase status/schema:', err);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatusAndSchema();
      setSyncMessage(null);
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/supabase/test', { method: 'POST' });
      const data = await res.json();
      setTestResult({
        success: Boolean(data.success),
        message: data.message || (data.success ? 'Connected successfully!' : 'Connection check failed'),
        tableCreated: data.tableCreated,
        hint: data.hint
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Network error while testing connection to Supabase.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySql = () => {
    if (!schemaSql) return;
    navigator.clipboard.writeText(schemaSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSyncCurrentScript = async () => {
    if (!activeScript) return;
    setSyncingScript(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/supabase/sync-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptPackage: activeScript })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncMessage({ type: 'success', text: `Successfully saved "${activeScript.topicTitle}" to Supabase content_scripts table!` });
      } else {
        setSyncMessage({ type: 'error', text: data.error || 'Failed to sync script to Supabase.' });
      }
    } catch (err: any) {
      setSyncMessage({ type: 'error', text: err?.message || 'Network error syncing script.' });
    } finally {
      setSyncingScript(false);
    }
  };

  const handleSyncTopics = async () => {
    if (!topics || topics.length === 0) return;
    setSyncingTopics(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/supabase/sync-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncMessage({ type: 'success', text: `Successfully synced ${data.count || topics.length} topics to Supabase content_topics table!` });
      } else {
        setSyncMessage({ type: 'error', text: data.error || 'Failed to sync topics to Supabase.' });
      }
    } catch (err: any) {
      setSyncMessage({ type: 'error', text: err?.message || 'Network error syncing topics.' });
    } finally {
      setSyncingTopics(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#0E1116] border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Supabase Project Link
                </h3>
                {status?.isConfigured ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Linked
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800 text-amber-300 font-medium flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> Setup Required
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Connect external PostgreSQL storage for scripts, topics & editorial assets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-slate-800 flex items-center gap-3 bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 font-medium border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" /> Connection & Setup
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 font-medium border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" /> SQL Schema
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className={`pb-2.5 font-medium border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sync'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" /> Cloud Sync
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: Status & Setup */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Connection Status Card */}
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    Supabase Configuration Status
                  </span>
                  <button
                    onClick={fetchStatusAndSchema}
                    disabled={isLoadingStatus}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingStatus ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block mb-0.5">Project URL</span>
                    <span className="font-mono text-slate-200 font-medium">
                      {status?.url ? status.url : 'Not Set in Secrets'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block mb-0.5">API Key Detected</span>
                    <span className="font-mono text-slate-200 font-medium">
                      {status?.hasServiceRoleKey 
                        ? 'Service Role Key (Full Admin)' 
                        : status?.hasAnonKey 
                          ? 'Anon Key (Public)' 
                          : 'No Key Configured'}
                    </span>
                  </div>
                </div>

                {/* Live Test Button & Output */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting || !status?.isConfigured}
                    className={`px-3.5 py-2 rounded-md font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      status?.isConfigured
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isTesting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Test Live Connection
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-slate-400">
                    Runs query check against Supabase PostgreSQL
                  </span>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-md border text-[11px] space-y-1 ${
                    testResult.success
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-1.5 font-semibold">
                      {testResult.success ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                      <span>{testResult.message}</span>
                    </div>
                    {testResult.hint && (
                      <p className="text-slate-300 text-[10px] pl-5">
                        {testResult.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* How to link your Supabase Project Guide */}
              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-2.5">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  How to link your Supabase project in AI Studio:
                </span>
                <ol className="list-decimal list-inside text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                  <li>
                    Open your project dashboard on <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-amber-400 underline hover:text-amber-300 inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-2.5 h-2.5" /></a>
                  </li>
                  <li>
                    Go to <span className="font-semibold text-white">Project Settings → API</span> and copy your <span className="font-mono text-amber-300">Project URL</span> and <span className="font-mono text-amber-300">anon public</span> key (or <span className="font-mono text-amber-300">service_role</span> key).
                  </li>
                  <li>
                    In this Google AI Studio environment, open the <span className="font-semibold text-white">Settings / Secrets panel</span>.
                  </li>
                  <li>
                    Add two environment variables:
                    <div className="mt-1 space-y-1 font-mono text-[10px] bg-slate-950/80 p-2 rounded border border-slate-800">
                      <div><span className="text-emerald-400">SUPABASE_URL</span> = https://your-ref.supabase.co</div>
                      <div><span className="text-emerald-400">SUPABASE_ANON_KEY</span> = eyJhbGciOi...</div>
                    </div>
                  </li>
                  <li>
                    Run the SQL schema in your Supabase SQL Editor (from the <strong>SQL Schema</strong> tab above) to prepare the tables.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: SQL Schema */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">
                    Recommended Database Schema (DDL)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Creates tables for scripts, topics, and calendar with Row Level Security (RLS).
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy SQL
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-[320px] leading-relaxed select-all">
                  {schemaSql || '-- Loading schema...'}
                </pre>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                Paste this into your Supabase Dashboard under <strong>SQL Editor → New Query → Run</strong>.
              </p>
            </div>
          )}

          {/* TAB 3: Cloud Sync */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-200">
                  Manual Database Sync & Backups
                </h4>
                <p className="text-[11px] text-slate-400">
                  Save active generated content into your Supabase tables.
                </p>
              </div>

              {syncMessage && (
                <div className={`p-3 rounded-md border text-[11px] ${
                  syncMessage.type === 'success'
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800 text-rose-300'
                }`}>
                  {syncMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sync Active Script */}
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                      Sync Current Script
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {activeScript 
                        ? `Save "${activeScript.topicTitle}" dialogue, Reel Cuts, and 5-Beat beats to Supabase.`
                        : 'No active script loaded currently.'}
                    </p>
                  </div>
                  <button
                    onClick={handleSyncCurrentScript}
                    disabled={!activeScript || syncingScript || !status?.isConfigured}
                    className={`w-full py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      activeScript && status?.isConfigured
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {syncingScript ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" /> Save Script to Supabase
                      </>
                    )}
                  </button>
                </div>

                {/* Sync Topics */}
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Sync All Topics
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Export all {topics.length} current researched topics and hooks to Supabase.
                    </p>
                  </div>
                  <button
                    onClick={handleSyncTopics}
                    disabled={topics.length === 0 || syncingTopics || !status?.isConfigured}
                    className={`w-full py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      topics.length > 0 && status?.isConfigured
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {syncingTopics ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-3.5 h-3.5" /> Save Topics to Supabase
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
          <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase SDK queries proxied securely via backend server</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
