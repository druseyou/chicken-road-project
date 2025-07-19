'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/ui/utils/cn';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  variant?: 'default' | 'casino' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showSearchIcon?: boolean;
  showClearButton?: boolean;
  isLoading?: boolean;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ 
    className,
    onSearch,
    onClear,
    variant = 'default',
    size = 'md',
    showSearchIcon = true,
    showClearButton = true,
    isLoading = false,
    suggestions = [],
    onSuggestionSelect,
    value: controlledValue,
    onChange,
    onKeyDown,
    placeholder = "Search casinos...",
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Use controlled value if provided, otherwise use internal state
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    const baseInputStyles = [
      'w-full rounded-lg border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ];

    const variants = {
      default: [
        'border-gray-300 bg-white text-gray-900',
        'focus:border-blue-500 focus:ring-blue-500',
        'hover:border-gray-400',
      ],
      casino: [
        'border-red-200 bg-gradient-to-r from-red-50 to-orange-50 text-gray-900',
        'focus:border-red-500 focus:ring-red-500',
        'hover:border-red-300',
      ],
      minimal: [
        'border-gray-200 bg-gray-50 text-gray-900',
        'focus:border-gray-400 focus:ring-gray-400',
        'hover:border-gray-300',
      ],
    };

    const sizes = {
      sm: showSearchIcon ? 'pl-8 pr-8 py-2 text-sm' : 'px-3 py-2 text-sm',
      md: showSearchIcon ? 'pl-10 pr-10 py-3 text-base' : 'px-4 py-3 text-base',
      lg: showSearchIcon ? 'pl-12 pr-12 py-4 text-lg' : 'px-6 py-4 text-lg',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      
      onChange?.(e);
      
      if (suggestions.length > 0) {
        setShowSuggestions(newValue.length > 0);
        setSelectedSuggestionIndex(-1);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (suggestions.length > 0 && showSuggestions) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          return;
        } else if (e.key === 'Escape') {
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
        }
      }
      
      if (e.key === 'Enter') {
        onSearch?.(value.toString());
      }
      
      onKeyDown?.(e);
    };

    const handleSuggestionSelect = (suggestion: string) => {
      if (controlledValue === undefined) {
        setInternalValue(suggestion);
      }
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      onSuggestionSelect?.(suggestion);
      onSearch?.(suggestion);
    };

    const handleClear = () => {
      if (controlledValue === undefined) {
        setInternalValue('');
      }
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      onClear?.();
      inputRef.current?.focus();
    };

    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toString().toLowerCase())
    );

    return (
      <div className="relative">
        <div className="relative">
          {/* Search Icon */}
          {showSearchIcon && (
            <div className={cn(
              'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
              size === 'sm' && 'left-2',
              size === 'lg' && 'left-4'
            )}>
              {isLoading ? (
                <div className={cn('animate-spin', iconSizes[size])}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
              ) : (
                <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref || inputRef}
            className={cn(
              baseInputStyles,
              variants[variant],
              sizes[size],
              className
            )}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && value && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            {...props}
          />
          
          {/* Clear Button */}
          {showClearButton && value && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                'absolute right-3 top-1/2 transform -translate-y-1/2',
                'text-gray-400 hover:text-gray-600 transition-colors',
                size === 'sm' && 'right-2',
                size === 'lg' && 'right-4'
              )}
            >
              <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                className={cn(
                  'w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors',
                  'border-b border-gray-100 last:border-b-0',
                  index === selectedSuggestionIndex && 'bg-blue-50 text-blue-700'
                )}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar }; 