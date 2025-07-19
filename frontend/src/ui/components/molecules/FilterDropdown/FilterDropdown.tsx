'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/ui/utils/cn';
import { StatusBadge } from '../../atoms';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: FilterOption[];
  selectedValues?: string[];
  onSelectionChange?: (selectedValues: string[]) => void;
  placeholder?: string;
  variant?: 'default' | 'casino' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  maxHeight?: string;
  label?: string;
  showCount?: boolean;
}

const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ 
    className,
    options = [],
    selectedValues = [],
    onSelectionChange,
    placeholder = "Select options...",
    variant = 'default',
    size = 'md',
    multiple = true,
    searchable = false,
    clearable = true,
    disabled = false,
    maxHeight = '240px',
    label,
    showCount = true,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = searchable && searchQuery
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    const selectedOptions = options.filter(option => selectedValues.includes(option.value));

    const handleOptionToggle = (optionValue: string) => {
      if (disabled) return;

      let newSelectedValues: string[];
      
      if (multiple) {
        newSelectedValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(value => value !== optionValue)
          : [...selectedValues, optionValue];
      } else {
        newSelectedValues = selectedValues.includes(optionValue) ? [] : [optionValue];
        setIsOpen(false);
      }
      
      onSelectionChange?.(newSelectedValues);
    };

    const handleClear = () => {
      if (disabled) return;
      onSelectionChange?.([]);
    };

    const baseStyles = [
      'relative w-full',
    ];

    const triggerBaseStyles = [
      'w-full flex items-center justify-between rounded-lg border transition-all duration-200 cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled && 'opacity-50 cursor-not-allowed',
    ];

    const variants = {
      default: [
        'border-gray-300 bg-white text-gray-900 hover:border-gray-400',
        'focus:border-blue-500 focus:ring-blue-500',
      ],
      casino: [
        'border-red-200 bg-gradient-to-r from-red-50 to-orange-50 text-gray-900',
        'hover:border-red-300 focus:border-red-500 focus:ring-red-500',
      ],
      minimal: [
        'border-gray-200 bg-gray-50 text-gray-900 hover:border-gray-300',
        'focus:border-gray-400 focus:ring-gray-400',
      ],
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    const getDisplayText = () => {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) return selectedOptions[0]?.label || '';
      return `${selectedValues.length} selected`;
    };

    return (
      <div ref={ref} className={cn(baseStyles, className)} {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div ref={dropdownRef} className="relative">
          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              triggerBaseStyles,
              variants[variant],
              sizes[size]
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="truncate">
                {getDisplayText()}
              </span>
              {selectedValues.length > 0 && showCount && (
                <StatusBadge variant="default" size="sm">
                  {selectedValues.length}
                </StatusBadge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {clearable && selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={disabled}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              <svg
                className={cn(
                  'w-4 h-4 text-gray-400 transition-transform duration-200',
                  isOpen && 'transform rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {searchable && (
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto" style={{ maxHeight }}>
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    {searchQuery ? 'No options found' : 'No options available'}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionToggle(option.value)}
                      disabled={option.disabled}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors',
                        'hover:bg-gray-50 focus:outline-none focus:bg-gray-50',
                        'border-b border-gray-50 last:border-b-0',
                        selectedValues.includes(option.value) && 'bg-blue-50 text-blue-700',
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {multiple && (
                          <div className={cn(
                            'w-4 h-4 rounded border-2 flex items-center justify-center',
                            selectedValues.includes(option.value)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          )}>
                            {selectedValues.includes(option.value) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        )}
                        <span>{option.label}</span>
                      </div>
                      
                      {option.count !== undefined && (
                        <StatusBadge variant="default" size="sm">
                          {option.count}
                        </StatusBadge>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown';

export { FilterDropdown }; 