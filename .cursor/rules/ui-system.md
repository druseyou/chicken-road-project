---
alwaysApply: true
---

# 🎨 UI System Optimization Rules - Casino Project

## 🏗️ **UI Architecture & Performance**

### **📁 Directory Structure**
```
src/ui/
├── components/           # React UI components
│   ├── atoms/           # Basic elements (Button, Typography)
│   ├── molecules/       # Combined elements (Card, Form)
│   └── organisms/       # Complex components
├── styles/             # CSS tokens and global styles
│   └── tokens.css      # Design system variables
├── utils/              # UI utilities
│   └── cn.ts          # Class name utility
└── tokens/            # Design tokens (colors, spacing, etc.)
```

## 🎯 **Performance-First Development**

### **⚡ Bundle Optimization Rules**

#### **1. Import Optimization**
```typescript
// ✅ GOOD - Tree-shakeable imports
import { cn } from '@/ui/utils/cn';
import { Button } from '@/ui/components/atoms/Button';

// ❌ BAD - Barrel imports that increase bundle size
import * from '@/ui';
import { Button, Card, Text, Heading } from '@/ui';
```

#### **2. Component Splitting Strategy**
```typescript
// ✅ GOOD - Split large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // If not needed for SEO
});

// ✅ GOOD - Conditional loading
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <div>Loading admin...</div>,
});
```

#### **3. CSS-in-JS Avoidance**
```typescript
// ✅ GOOD - Use Tailwind classes + CSS variables
const Button = ({ variant = 'primary' }) => (
  <button className={cn(
    'px-4 py-2 rounded-md font-medium transition-colors',
    variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600',
    variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  )}>
    {children}
  </button>
);

// ❌ BAD - Runtime CSS generation
const Button = styled.button`
  padding: ${props => props.size === 'large' ? '12px 24px' : '8px 16px'};
  background: ${props => props.variant === 'primary' ? '#0ea5e9' : '#f3f4f6'};
`;
```

### **🎨 Design System Integration**

#### **1. CSS Variables Usage**
```css
/* ✅ GOOD - Use design tokens */
.button-primary {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  font-family: var(--font-family-sans);
}

/* ❌ BAD - Hardcoded values */
.button-primary {
  background-color: #0ea5e9;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}
```

#### **2. Responsive Design Patterns**
```typescript
// ✅ GOOD - Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ GOOD - Breakpoint-specific utilities
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// ❌ BAD - Fixed layouts
<div className="grid-cols-3 gap-4">
```

### **🚀 Component Performance Patterns**

#### **1. Memoization Strategy**
```typescript
// ✅ GOOD - Memoize expensive components
const ExpensiveCard = memo(({ data, onAction }) => {
  const processedData = useMemo(() => 
    processComplexData(data), [data]
  );
  
  const handleAction = useCallback((id) => 
    onAction(id), [onAction]
  );

  return <Card data={processedData} onAction={handleAction} />;
});

// ✅ GOOD - Memoize selectors
const useFilteredItems = (items, filter) => {
  return useMemo(() => 
    items.filter(item => item.category === filter), 
    [items, filter]
  );
};
```

#### **2. Lazy Loading Images**
```typescript
// ✅ GOOD - Use OptimizedImage component
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src={imageUrl}
  alt="Description"
  width={400}
  height={300}
  className="rounded-lg"
  showBlurPlaceholder={true}
  priority={false} // Only true for above-the-fold images
/>

// ❌ BAD - Standard img tag
<img src={imageUrl} alt="Description" />
```

#### **3. Form Optimization**
```typescript
// ✅ GOOD - Debounced inputs for search
const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full px-3 py-2 border rounded-md"
    />
  );
};
```

### **🎭 Animation & Interaction Guidelines**

#### **1. CSS Transitions Over JavaScript**
```css
/* ✅ GOOD - CSS transitions */
.button {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}
```

#### **2. Reduced Motion Support**
```css
/* ✅ GOOD - Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}
```

### **📱 Mobile-First Optimization**

#### **1. Touch-Friendly Interactions**
```typescript
// ✅ GOOD - Adequate touch targets
<button className="min-h-[44px] min-w-[44px] p-3 rounded-lg">

// ✅ GOOD - Touch feedback
<button className="active:scale-95 transition-transform">
```

#### **2. Viewport Considerations**
```typescript
// ✅ GOOD - Safe area handling
<div className="pb-safe-area-inset-bottom">

// ✅ GOOD - Responsive text scaling
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
```

### **🔍 Accessibility & SEO**

#### **1. Semantic HTML**
```typescript
// ✅ GOOD - Proper semantic structure
<article className="card">
  <header>
    <h2>Card Title</h2>
  </header>
  <main>
    <p>Card content...</p>
  </main>
  <footer>
    <button>Action</button>
  </footer>
</article>
```

#### **2. ARIA Attributes**
```typescript
// ✅ GOOD - Proper ARIA labels
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</button>
```

### **🧪 Testing & Quality**

#### **1. Component Testing Pattern**
```typescript
// ✅ GOOD - Test component behavior
describe('Button Component', () => {
  it('applies correct styles for variants', () => {
    render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-500');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### **📊 Bundle Size Monitoring**

#### **1. Import Analysis**
```bash
# ✅ GOOD - Regular bundle analysis
npm run analyze

# Monitor these metrics:
# - Total bundle size (target: <250KB gzipped)
# - Individual chunk sizes (target: <50KB each)
# - Unused code percentage (target: <10%)
```

#### **2. Performance Budgets**
```typescript
// ✅ GOOD - Set performance budgets in tests
describe('Performance', () => {
  it('component should render within 16ms', async () => {
    const start = performance.now();
    render(<ComplexComponent />);
    const end = performance.now();
    expect(end - start).toBeLessThan(16); // 60fps budget
  });
});
```

## 🎯 **UI Development Checklist**

### **Before Creating New Component:**
- [ ] Check if similar component exists
- [ ] Consider component composition over creation
- [ ] Plan for mobile-first responsive design
- [ ] Define performance requirements

### **During Development:**
- [ ] Use CSS variables from design tokens
- [ ] Implement proper TypeScript types
- [ ] Add accessibility attributes
- [ ] Optimize for bundle size
- [ ] Test on mobile devices

### **Before Commit:**
- [ ] Run bundle analyzer if adding dependencies
- [ ] Test with slow 3G network simulation
- [ ] Verify accessibility with screen reader
- [ ] Check responsive design on various screens
- [ ] Validate performance metrics

## 🚀 **Performance Targets**

### **Bundle Metrics:**
- **Total UI bundle**: <30KB gzipped
- **Individual components**: <5KB each
- **CSS bundle**: <20KB gzipped
- **Tree shaking efficiency**: >90%

### **Runtime Metrics:**
- **Component render time**: <16ms
- **First paint**: <100ms after mount
- **Interaction response**: <100ms
- **Animation frame rate**: 60fps

---

## 💡 **Best Practices Summary**

1. **Import only what you need** - avoid barrel exports
2. **Use CSS variables** - maintain design system consistency  
3. **Memoize expensive operations** - optimize re-renders
4. **Lazy load non-critical components** - improve initial load
5. **Test performance regularly** - monitor bundle size
6. **Design mobile-first** - optimize for majority users
7. **Implement accessibility** - ensure inclusive design
8. **Use semantic HTML** - improve SEO and screen readers

Remember: **Performance is a feature!** Every optimization improves user experience. 