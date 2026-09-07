import React, { useState, useEffect } from 'react';
import { useCategories } from '../context/CategoryContext';
import { CategoryDefinition, TopicIdea, CalendarItem } from '../types';
import { X, Plus, Edit2, Trash2, Check, AlertCircle, Tag, Layers, Sparkles, FolderPlus } from 'lucide-react';

interface CategoryManagerModalProps {
  topics?: TopicIdea[];
  calendar?: CalendarItem[];
  onCategoryCreated?: (newCategory: CategoryDefinition) => void;
}

// Curated color themes for categories
export const COLOR_THEMES = [
  { id: 'pink', name: 'Rose / Pink', color: 'text-pink-400', bg: 'bg-pink-950/60', border: 'border-pink-800/60', dot: '#F472B6' },
  { id: 'amber', name: 'Amber / Saffron', color: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-800/60', dot: '#FBBF24' },
  { id: 'blue', name: 'Blue / Azure', color: 'text-blue-400', bg: 'bg-blue-950/60', border: 'border-blue-800/60', dot: '#60A5FA' },
  { id: 'emerald', name: 'Emerald / Green', color: 'text-emerald-400', bg: 'bg-emerald-950/60', border: 'border-emerald-800/60', dot: '#34D399' },
  { id: 'purple', name: 'Purple / Violet', color: 'text-purple-400', bg: 'bg-purple-950/60', border: 'border-purple-800/60', dot: '#C084FC' },
  { id: 'cyan', name: 'Cyan / Sky', color: 'text-cyan-400', bg: 'bg-cyan-950/60', border: 'border-cyan-800/60', dot: '#22D3EE' },
  { id: 'orange', name: 'Orange / Agni', color: 'text-orange-400', bg: 'bg-orange-950/60', border: 'border-orange-800/60', dot: '#FB923C' },
  { id: 'indigo', name: 'Indigo / Third Eye', color: 'text-indigo-400', bg: 'bg-indigo-950/60', border: 'border-indigo-800/60', dot: '#818CF8' },
  { id: 'teal', name: 'Teal / Deep Prana', color: 'text-teal-400', bg: 'bg-teal-950/60', border: 'border-teal-800/60', dot: '#2DD4BF' },
  { id: 'rose', name: 'Crimson / Devotion', color: 'text-rose-400', bg: 'bg-rose-950/60', border: 'border-rose-800/60', dot: '#FB7185' },
];

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  topics = [],
  calendar = [],
  onCategoryCreated
}) => {
  const {
    categories,
    isManageModalOpen,
    closeManageModal,
    modalInitialMode,
    selectedCategoryForEdit,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  // Form states
  const [label, setLabel] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[5]); // cyan default
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  // Delete modal confirmation
  const [deletingCat, setDeletingCat] = useState<CategoryDefinition | null>(null);
  const [reassignTarget, setReassignTarget] = useState<string>('mental_health');

  // Auto-sync initial mode and edit category
  useEffect(() => {
    if (isManageModalOpen) {
      setFeedbackError(null);
      setFeedbackSuccess(null);
      if (modalInitialMode === 'create') {
        setActiveTab('create');
        resetForm();
      } else if (modalInitialMode === 'edit' && selectedCategoryForEdit) {
        setActiveTab('create');
        startEdit(selectedCategoryForEdit);
      } else {
        setActiveTab('list');
      }
    }
  }, [isManageModalOpen, modalInitialMode, selectedCategoryForEdit]);

  const resetForm = () => {
    setLabel('');
    setId('');
    setDescription('');
    setSelectedTheme(COLOR_THEMES[5]);
    setEditingCatId(null);
    setFeedbackError(null);
  };

  const startEdit = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    setEditingCatId(cat.id);
    setLabel(cat.label);
    setId(cat.id);
    setDescription(cat.description || '');

    // match theme
    const matchedTheme = COLOR_THEMES.find(t => t.color === cat.color) || COLOR_THEMES[0];
    setSelectedTheme(matchedTheme);
    setActiveTab('create');
  };

  const handleLabelChange = (val: string) => {
    setLabel(val);
    if (!editingCatId) {
      // Auto-generate slug ID
      const autoSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
      setId(autoSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setFeedbackError('Category title / label is required.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackError(null);

    try {
      if (editingCatId) {
        const updated = await updateCategory(editingCatId, {
          label: label.trim(),
          color: selectedTheme.color,
          bg: selectedTheme.bg,
          border: selectedTheme.border,
          description: description.trim()
        });
        setFeedbackSuccess(`Category "${updated.label}" updated successfully!`);
        setTimeout(() => {
          setActiveTab('list');
          resetForm();
          setFeedbackSuccess(null);
        }, 1200);
      } else {
        const created = await addCategory({
          label: label.trim(),
          id: id.trim() || undefined,
          color: selectedTheme.color,
          bg: selectedTheme.bg,
          border: selectedTheme.border,
          description: description.trim()
        });
        setFeedbackSuccess(`Category "${created.label}" added to categories!`);
        if (onCategoryCreated) {
          onCategoryCreated(created);
        }
        setTimeout(() => {
          setActiveTab('list');
          resetForm();
          setFeedbackSuccess(null);
        }, 1200);
      }
    } catch (err: any) {
      setFeedbackError(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingCat) return;
    setIsSubmitting(true);
    setFeedbackError(null);

    try {
      await deleteCategory(deletingCat.id, reassignTarget);
      setDeletingCat(null);
      setFeedbackSuccess(`Category "${deletingCat.label}" removed.`);
      setTimeout(() => setFeedbackSuccess(null), 2500);
    } catch (err: any) {
      setFeedbackError(err.message || 'Failed to delete category');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isManageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0D1117] border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#161B22]/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Manage Life Problem Categories
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {categories.length} Categories
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Custom categories apply across Flow, Auto-Pilot, Calendar, and Generation modules.
              </p>
            </div>
          </div>
          <button
            onClick={closeManageModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-5 pt-3 bg-[#0E131A] gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('list');
              resetForm();
            }}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
              activeTab === 'list'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            All Categories ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('create');
              resetForm();
            }}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
              activeTab === 'create'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {editingCatId ? <Edit2 className="w-3.5 h-3.5" /> : <FolderPlus className="w-3.5 h-3.5" />}
            {editingCatId ? 'Edit Category' : '+ Add New Category'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
          
          {feedbackSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedbackSuccess}</span>
            </div>
          )}

          {feedbackError && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-lg text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{feedbackError}</span>
            </div>
          )}

          {/* LIST VIEW */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Configured Categories & Usage
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('create');
                    resetForm();
                  }}
                  className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-medium flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Category
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {categories.map(cat => {
                  const topicCount = topics.filter(t => t.category === cat.id).length;
                  const calCount = calendar.filter(c => c.category === cat.id).length;

                  return (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-lg bg-[#161B22]/70 border border-slate-800 hover:border-slate-700 transition flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded text-xs font-semibold border inline-flex items-center gap-1.5 ${cat.bg} ${cat.color} ${cat.border}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {cat.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            id: <code className="text-slate-400">{cat.id}</code>
                          </span>
                          {cat.isDefault ? (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              Core Default
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/40 text-amber-400 border border-amber-800/40">
                              Custom
                            </span>
                          )}
                        </div>

                        {cat.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {cat.description}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pt-0.5">
                          <span>📚 {topicCount} Ideas in Flow</span>
                          <span>•</span>
                          <span>🗓️ {calCount} Scheduled Drops</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                        <button
                          type="button"
                          onClick={() => startEdit(cat.id)}
                          title="Edit category"
                          className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {!cat.isDefault && (
                          <button
                            type="button"
                            onClick={() => setDeletingCat(cat)}
                            title="Delete category"
                            className="p-1.5 rounded bg-slate-800/80 hover:bg-red-950/80 text-slate-400 hover:text-red-400 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CREATE / EDIT VIEW */}
          {activeTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#161B22]/40 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">
                    {editingCatId ? 'Editing Category' : 'Create Custom Category'}
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Will instantly appear in all category dropdowns and auto-pilot prompts.
                  </p>
                </div>
                {/* Live Preview badge */}
                <div className="shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">Live Preview:</span>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold border inline-flex items-center gap-1.5 ${selectedTheme.bg} ${selectedTheme.color} ${selectedTheme.border}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    {label.trim() || 'New Category Preview'}
                  </span>
                </div>
              </div>

              {/* Title / Label input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category Display Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Spiritual Growth, Parenting & Family, Sleep & Circadian"
                  value={label}
                  onChange={e => handleLabelChange(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500"
                  required
                />
              </div>

              {/* Slug ID (editable) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Category Key / ID (Used in database & AI filters)
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">lowercase snake_case</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g., spiritual_growth"
                  value={id}
                  disabled={Boolean(editingCatId)}
                  onChange={e => setId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'))}
                  className="w-full bg-[#0A0C10] border border-slate-700 rounded px-3 py-2 text-xs font-mono text-amber-300 placeholder-slate-500 focus:outline-hidden focus:border-amber-500 disabled:opacity-60"
                />
              </div>

              {/* Description / Scope for AI */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category Description & Sanatan Context
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Sadhana, inner awakening, dharma, Kundalini awakening, meditation obstacles, and spiritual bypassing."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-[#0A0C10] border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 resize-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Helps the AI auto-pilot map specific Vedic concepts, scriptures, and somatic hooks to this category.
                </p>
              </div>

              {/* Color Theme Swatches */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Visual Badge Color Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {COLOR_THEMES.map(theme => {
                    const isSelected = selectedTheme.id === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400/50'
                            : 'bg-[#161B22] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: theme.dot }}
                        />
                        <span className={`text-[11px] font-medium truncate ${theme.color}`}>
                          {theme.name.split(' / ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('list');
                    resetForm();
                  }}
                  className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !label.trim()}
                  className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  {isSubmitting
                    ? 'Saving...'
                    : editingCatId
                    ? 'Save Category Changes'
                    : 'Create & Add Category'}
                </button>
              </div>
            </form>
          )}

          {/* DELETE CONFIRMATION MODAL OVERLAY */}
          {deletingCat && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
              <div className="bg-[#161B22] border border-red-800/80 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <div className="p-2 rounded-full bg-red-950/80 border border-red-800">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Delete Category "{deletingCat.label}"?
                    </h3>
                    <p className="text-xs text-slate-400">
                      This action will remove the category from selection menus.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-2">
                  <p className="text-slate-300">
                    Existing topics and calendar items using this category will be reassigned safely:
                  </p>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Reassign existing items to:
                    </label>
                    <select
                      value={reassignTarget}
                      onChange={e => setReassignTarget(e.target.value)}
                      className="w-full bg-[#0A0C10] border border-slate-700 rounded p-2 text-xs text-white"
                    >
                      {categories
                        .filter(c => c.id !== deletingCat.id)
                        .map(c => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDeletingCat(null)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-500 rounded text-xs font-bold text-white transition cursor-pointer"
                  >
                    {isSubmitting ? 'Deleting...' : 'Confirm Reassign & Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
