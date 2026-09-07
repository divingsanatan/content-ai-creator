import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CategoryDefinition } from '../types';
import { DEFAULT_CATEGORIES } from '../data/sanatanCalendar';

interface CategoryContextType {
  categories: CategoryDefinition[];
  categoryMap: Record<string, CategoryDefinition>;
  isLoading: boolean;
  error: string | null;
  addCategory: (payload: Partial<CategoryDefinition>) => Promise<CategoryDefinition>;
  updateCategory: (id: string, updates: Partial<CategoryDefinition>) => Promise<CategoryDefinition>;
  deleteCategory: (id: string, reassignToId?: string) => Promise<{ success: boolean; reassignedCount: number }>;
  getCategoryMeta: (catId?: string) => { label: string; color: string; bg: string; border: string; chartColor?: string; description?: string };
  isManageModalOpen: boolean;
  openManageModal: (initialCategoryId?: string, initialMode?: 'list' | 'create' | 'edit') => void;
  closeManageModal: () => void;
  selectedCategoryForEdit: string | null;
  modalInitialMode: 'list' | 'create' | 'edit';
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryDefinition[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState<string | null>(null);
  const [modalInitialMode, setModalInitialMode] = useState<'list' | 'create' | 'edit'>('list');

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      }
    } catch (err: any) {
      console.warn('[CategoryContext] Error fetching categories, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoryMap = useMemo(() => {
    const map: Record<string, CategoryDefinition> = {};
    for (const cat of categories) {
      map[cat.id] = cat;
    }
    return map;
  }, [categories]);

  const getCategoryMeta = (catId?: string) => {
    if (!catId) {
      return {
        label: 'Uncategorized',
        color: 'text-slate-400',
        bg: 'bg-slate-800/80',
        border: 'border-slate-700',
        description: ''
      };
    }

    const found = categoryMap[catId];
    if (found) {
      return {
        label: found.label,
        color: found.color || 'text-slate-300',
        bg: found.bg || 'bg-slate-800/80',
        border: found.border || 'border-slate-700',
        chartColor: found.chartColor || '#F59E0B',
        description: found.description || ''
      };
    }

    // Dynamic formatting for arbitrary ids
    const prettyLabel = catId
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      label: prettyLabel,
      color: 'text-amber-400',
      bg: 'bg-amber-950/60',
      border: 'border-amber-800/60',
      chartColor: '#F59E0B',
      description: ''
    };
  };

  const addCategory = async (payload: Partial<CategoryDefinition>): Promise<CategoryDefinition> => {
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create category');
      }

      const newCat: CategoryDefinition = data.category;
      setCategories(prev => [...prev.filter(c => c.id !== newCat.id), newCat]);
      return newCat;
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
      throw err;
    }
  };

  const updateCategory = async (id: string, updates: Partial<CategoryDefinition>): Promise<CategoryDefinition> => {
    setError(null);
    try {
      const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update category');
      }

      const updated: CategoryDefinition = data.category;
      setCategories(prev => prev.map(c => (c.id === id ? updated : c)));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
      throw err;
    }
  };

  const deleteCategory = async (id: string, reassignToId?: string): Promise<{ success: boolean; reassignedCount: number }> => {
    setError(null);
    try {
      const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reassignToId })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete category');
      }

      setCategories(prev => prev.filter(c => c.id !== id));
      return { success: true, reassignedCount: data.reassignedCount || 0 };
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
      throw err;
    }
  };

  const openManageModal = (initialCategoryId?: string, initialMode: 'list' | 'create' | 'edit' = 'list') => {
    setSelectedCategoryForEdit(initialCategoryId || null);
    setModalInitialMode(initialMode);
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setSelectedCategoryForEdit(null);
    setModalInitialMode('list');
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryMap,
        isLoading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryMeta,
        isManageModalOpen,
        openManageModal,
        closeManageModal,
        selectedCategoryForEdit,
        modalInitialMode,
        refreshCategories: fetchCategories
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
