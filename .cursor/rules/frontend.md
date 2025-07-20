---
alwaysApply: true
---

# 🎰 Frontend Development Rules - Casino Project

## 🏗️ **Architecture & Structure**

### **Project Structure**
```
frontend/src/
├── app/[locale]/           # Next.js 14 App Router with i18n
├── components/             # React components
│   ├── cards/             # Card components (ArticleCard, CasinoCard, etc.)
│   ├── homepage/          # Homepage sections
│   └── layout/            # Layout components (Header, Footer)
├── ui/                    # Design System
│   ├── components/        # Reusable UI components
│   │   ├── atoms/         # Basic elements (Button, Typography)
│   │   ├── molecules/     # Combined elements (Card, Form)
│   │   └── organisms/     # Complex components
│   ├── styles/           # CSS tokens and global styles
│   ├── tokens/           # Design tokens (colors, spacing, etc.)
│   └── utils/            # UI utilities (cn function)
├── services/             # API services
├── types/               # TypeScript definitions
└── i18n/               # Internationalization
```

## 🎨 **UI/UX Guidelines**

### **Design System Usage**
- **ALWAYS** use components from `src/ui/components/` instead of creating new ones
- **NEVER** use components from deprecated `src/components/ui/` - all UI components have been migrated to `src/ui/`
- Use design tokens from `src/ui/tokens/` for consistent styling
- Prefer CSS variables over hardcoded values
- Use the `cn()` utility for merging Tailwind classes

### **Component Structure**
```typescript
// ✅ Good component structure
interface ComponentProps {
  // Props with clear types
}

export default function Component({ prop }: ComponentProps) {
  // Early returns for error states
  if (!prop) return null;
  
  return (
    <Card variant="casino" padding="lg">
      <CardContent>
        <Heading as="h2" size="xl">Title</Heading>
        <Text color="muted">Description</Text>
      </CardContent>
    </Card>
  );
}
```

### **Styling Rules**
- **ONLY** use Tailwind CSS classes
- Use design system components (Button, Card, Typography)
- Follow mobile-first responsive design
- Use semantic HTML elements
- Implement proper accessibility (ARIA labels, keyboard navigation)

## 🔧 **Code Standards**

### **TypeScript**
- **ALWAYS** define proper interfaces for props and data
- Use strict typing, avoid `any`
- Import types from `@/types/index.ts`
- Use generic types for API responses

### **React Best Practices**
- Use functional components with hooks
- Implement proper error boundaries
- Use `useTranslations` for all text content
- Prefer early returns over nested conditionals
- Use descriptive variable and function names

### **Event Handlers**
```typescript
// ✅ Correct naming
const handleClick = () => {};
const handleSubmit = () => {};
const handleKeyDown = () => {};
```

### **Imports Order**
```typescript
// 1. React and Next.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { useTranslations } from 'next-intl';

// 3. UI System components (PREFERRED - use centralized imports)
import { Card, Button, Heading, OptimizedImage, CopyButton } from '@/ui';
// OR specific imports for better tree-shaking
import { Card } from '@/ui/components/molecules';
import { Button, Heading } from '@/ui/components/atoms';
import { cn } from '@/ui/utils/cn';

// 4. Business logic components
import { ArticleCard, CasinoCard } from '@/components/cards';

// 5. Services and types
import { Casino } from '@/types';
import { getCasinos } from '@/services/strapi';
```

## 🌐 **Internationalization (i18n)**

### **Translation Usage**
```typescript
// ✅ Always use translations
const t = useTranslations('ComponentName');

return <h1>{t('title')}</h1>;

// ❌ Never hardcode text
return <h1>Casino Reviews</h1>;
```

### **Localized Navigation**
```typescript
// ✅ Use localized Link
import { Link } from '@/i18n/navigation';

<Link href="/casino-reviews">Reviews</Link>

// ❌ Don't use Next.js Link directly for internal routes
import Link from 'next/link';
```

## 📡 **API Integration**

### **Service Layer Usage**
```typescript
// ✅ Use service functions
import { getCasinos, getCasinoBySlug } from '@/services/strapi';

const casinos = await getCasinos(locale);
const casino = await getCasinoBySlug(slug);
```

### **Error Handling**
```typescript
// ✅ Proper error handling
try {
  const data = await apiCall();
  return data;
} catch (error) {
  console.error('API Error:', error);
  return [];
}
```

### **Loading States**
```typescript
// ✅ Show loading states
if (loading) {
  return <div>Loading...</div>;
}

if (!data) {
  return <div>No data available</div>;
}
```

## 🎯 **Performance Guidelines**

### **Image Optimization**
```typescript
// ✅ PREFERRED: Use OptimizedImage from UI system
import { OptimizedImage } from '@/ui';

<OptimizedImage
  src={imageUrl}
  alt={altText}
  fill
  className="object-cover"
  showBlurPlaceholder={true}
  fallbackSrc="/placeholder.svg"
/>

// ✅ Alternative: Use Next.js Image component directly
import Image from 'next/image';

<Image
  src={imageUrl}
  alt={altText}
  width={400}
  height={250}
  className="object-cover"
/>
```

### **Code Splitting**
- Use dynamic imports for heavy components
- Implement lazy loading for images
- Use React.Suspense for async components

### **SEO Optimization**
- Use proper meta tags in page components
- Implement structured data
- Use semantic HTML structure
- Optimize images with proper alt attributes

## 🧪 **Component Patterns**

### **Card Components**
```typescript
// ✅ Use existing card components
import { CasinoCard, SlotCard, ArticleCard } from '@/components/cards';

// For detailed views
import { DetailedCasinoCard } from '@/components/cards';
```

### **Form Components**
```typescript
// ✅ Form structure
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <Input
      label={t('email')}
      type="email"
      required
      aria-describedby="email-error"
    />
    <Button type="submit" variant="primary">
      {t('submit')}
    </Button>
  </div>
</form>
```

### **Layout Components**
```typescript
// ✅ Use layout components
import { Header, Footer } from '@/components/layout';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

## 🚨 **Common Mistakes to Avoid**

### **❌ DON'T DO**
```typescript
// Don't hardcode styles
<div style={{ color: 'red', fontSize: '16px' }}>

// Don't use inline styles
<div style={{ marginTop: '20px' }}>

// Don't hardcode text
<h1>Casino Reviews</h1>

// Don't use regular Link for internal routes
import Link from 'next/link';
<Link href="/casino-reviews">

// Don't create custom components when UI system exists
const CustomButton = () => <button>...</button>;

// Don't import from deprecated components/ui folder
import OptimizedImage from '@/components/ui/OptimizedImage';
import CopyButton from '@/components/ui/CopyButton';

// Don't use default exports for UI components (inconsistent pattern)
export default function MyComponent() { ... }
```

### **✅ DO THIS INSTEAD**
```typescript
// Use Tailwind classes
<div className="text-red-600 text-base">

// Use spacing utilities
<div className="mt-5">

// Use translations
<h1>{t('title')}</h1>

// Use localized Link
import { Link } from '@/i18n/navigation';
<Link href="/casino-reviews">

// Use UI system components (PREFERRED: centralized import)
import { Button, OptimizedImage, CopyButton } from '@/ui';
<Button variant="primary">

// OR specific imports for better tree-shaking
import { Button } from '@/ui/components/atoms';
<Button variant="primary">

// Use consistent export pattern for UI components
const MyComponent = ({ prop }: Props) => {
  return <div>{prop}</div>;
};

export { MyComponent };
```

## 📝 **File Naming Conventions**

- **Components**: PascalCase (`CasinoCard.tsx`)
- **Pages**: lowercase (`page.tsx`)
- **Utilities**: camelCase (`cn.ts`)
- **Types**: PascalCase (`index.ts` with PascalCase interfaces)
- **Services**: camelCase (`strapi.ts`)

## 🎨 **Design Tokens Usage**

```typescript
// ✅ Use design tokens
import { colors, spacing, typography } from '@/ui/tokens';

// In CSS variables (preferred)
<div className="bg-primary text-primary-foreground p-4">

// In component props
<Button size="lg" variant="casino">
```

## 🔄 **Component Migration Guidelines**

### **UI System Migration Status**
- ✅ **COMPLETED**: All components from `src/components/ui/` have been migrated to `src/ui/`
- ✅ **OptimizedImage**: Migrated to `src/ui/components/atoms/OptimizedImage/`
- ✅ **CopyButton**: Migrated to `src/ui/components/atoms/CopyButton/`

### **Migration Pattern Used**
```typescript
// OLD (deprecated pattern)
export default function Component() { ... }

// NEW (consistent UI system pattern)
const Component = ({ prop }: Props) => {
  return <div>{prop}</div>;
};

export { Component };
```

### **Import Path Migration**
```typescript
// ❌ OLD: Don't use these paths anymore
import OptimizedImage from '@/components/ui/OptimizedImage';
import CopyButton from '@/components/ui/CopyButton';

// ✅ NEW: Use centralized UI imports
import { OptimizedImage, CopyButton } from '@/ui';

// ✅ NEW: Or specific atomic imports
import { OptimizedImage } from '@/ui/components/atoms/OptimizedImage';
import { CopyButton } from '@/ui/components/atoms/CopyButton';
```

## 🔍 **Testing Guidelines**

- Write unit tests for utility functions
- Test component rendering and interactions
- Mock API calls in tests
- Test accessibility features
- Verify responsive design behavior

---

## 📋 **Quick Checklist**

Before submitting code, verify:
- [ ] Uses UI system components from `@/ui` (NOT from deprecated `@/components/ui`)
- [ ] All text is translated using `useTranslations`
- [ ] Proper TypeScript types defined
- [ ] Responsive design implemented
- [ ] Accessibility features included (ARIA labels, keyboard navigation)
- [ ] Images optimized with `OptimizedImage` or Next.js Image
- [ ] Error handling implemented with try/catch
- [ ] Performance considerations applied (lazy loading, code splitting)
- [ ] SEO meta tags included (for pages)
- [ ] Follows naming conventions (PascalCase for components)
- [ ] Uses consistent export pattern (`const Component = () => {}; export { Component };`)
- [ ] No imports from deprecated `@/components/ui/` folder 