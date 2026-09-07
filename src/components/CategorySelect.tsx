import React, { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { Plus, Settings2 } from 'lucide-react';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  includeAllOption?: boolean;
  allLabel?: string;
  extraOptions?: { value: string; label: string }[];
  showAddButton?: boolean;
  showManageOption?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  id,
  name,
  disabled = false,
  className = '',
  containerClassName = '',
  includeAllOption = false,
  allLabel = 'All Categories',
  extraOptions,
  showAddButton = true,
  showManageOption = true,
  placeholder,
  size = 'md'
}) => {
  const { categories, openManageModal, getCategoryMeta } = useCategories();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVal = e.target.value;
    if (selectedVal === '__ADD_NEW__') {
      // Revert select back to current value and open modal
      e.target.value = value;
      openManageModal(undefined, 'create');
      return;
    }
    if (selectedVal === '__MANAGE__') {
      e.target.value = value;
      openManageModal(undefined, 'list');
      return;
    }
    onChange(selectedVal);
  };

  const currentMeta = value && value !== 'all' ? getCategoryMeta(value) : null;

  const sizeClasses = {
    sm: 'py-1 px-2 text-[11px]',
    md: 'py-2 px-3 text-xs',
    lg: 'py-2.5 px-3.5 text-sm'
  };

  const btnSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-2.5'
  };

  return (
    <div className={`flex items-center gap-1.5 w-full ${containerClassName}`}>
      <div className="relative flex-1 min-w-0">
        <select
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          onChange={handleSelectChange}
          className={`w-full bg-[#0A0C10] border border-slate-700 rounded text-white focus:outline-hidden focus:border-amber-500 appearance-none pr-8 cursor-pointer transition ${sizeClasses[size]} ${className}`}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#0D1117] text-slate-500">
              {placeholder}
            </option>
          )}

          {includeAllOption && (
            <option value="all" className="bg-[#0D1117] text-white">
              {allLabel}
            </option>
          )}

          {extraOptions && extraOptions.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-[#0D1117] text-white">
              {opt.label}
            </option>
          ))}

          <optgroup label="Categories" className="bg-[#0D1117] text-slate-400">
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-[#0D1117] text-white py-1">
                {cat.label} {cat.isDefault ? '' : '★'}
              </option>
            ))}
          </optgroup>

          <optgroup label="Manage Categories" className="bg-[#0D1117] text-amber-400">
            <option value="__ADD_NEW__" className="bg-[#161B22] text-amber-400 font-semibold py-1">
              ➕ + Add New Category...
            </option>
            {showManageOption && (
              <option value="__MANAGE__" className="bg-[#161B22] text-slate-300 py-1">
                ⚙️ Manage Categories (CRUD)...
              </option>
            )}
          </optgroup>
        </select>

        {/* Custom Chevron Indicator */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Direct Plus Button next to the dropdown */}
      {showAddButton && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => openManageModal(undefined, 'create')}
            title="Add New Category"
            aria-label="Add New Category"
            className={`rounded bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-500/60 transition cursor-pointer flex items-center justify-center ${btnSizeClasses[size]}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {showManageOption && (
            <button
              type="button"
              onClick={() => openManageModal(undefined, 'list')}
              title="Manage Categories"
              aria-label="Manage Categories"
              className={`rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition cursor-pointer flex items-center justify-center ${btnSizeClasses[size]}`}
            >
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
