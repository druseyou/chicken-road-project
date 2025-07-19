---
alwaysApply: true
---

# 📊 Документація UI системи та дизайну проекту

## 🎯 Правила проекту:

### **Frontend правила:**
- Використовувати UI систему з `src/ui/components/`
- Тільки Tailwind CSS для стилізації
- Mobile-first дизайн
- Інтернаціоналізація через `useTranslations`
- TypeScript з строгою типізацією
- Семантичний HTML з accessibility
- Розділення client/server компонентів (Next.js App Router)

### **UI система:**
- Атомарна структура (atoms/molecules/organisms)
- CSS змінні для дизайн-токенів
- Performance-first підхід
- Мемоізація дорогих компонентів
- Оптимізація bundle size

## 🎨 Реалізована дизайн-система:

### **Дизайн-токени (РЕАЛІЗОВАНО):**

#### Кольори:
```css
/* frontend/src/ui/styles/tokens.css */
--casino-red-primary: #dc2626;
--casino-red-secondary: #ef4444;
--casino-gold: #f59e0b;
--casino-emerald: #10b981;
--casino-purple: #8b5cf6;
--casino-blue: #3b82f6;

/* Градієнти */
--gradient-casino: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
--gradient-premium: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
--gradient-gold: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
--gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

#### Типографія:
```typescript
// frontend/src/ui/tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  }
};
```

## ⚛️ Реалізовані UI компоненти:

### **Atoms (Атоми):**

#### 1. Rating Component
```typescript
// frontend/src/ui/components/atoms/Rating/Rating.tsx
interface RatingProps {
  value: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'casino';
  showValue?: boolean;
  showLabel?: boolean;
}
```

#### 2. StatusBadge Component
```typescript
// frontend/src/ui/components/atoms/StatusBadge/StatusBadge.tsx
interface StatusBadgeProps {
  variant: 'default' | 'featured' | 'new' | 'popular' | 'exclusive' | 'casino';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

#### 3. StatCard Component
```typescript
// frontend/src/ui/components/atoms/StatCard/StatCard.tsx
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant?: 'default' | 'compact';
  size?: 'sm' | 'md' | 'lg';
}
```

#### 4. GradientButton Component
```typescript
// frontend/src/ui/components/atoms/GradientButton/GradientButton.tsx
interface GradientButtonProps {
  variant: 'casino' | 'premium' | 'gold' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

### **Molecules (Молекули):**

#### 1. Card Component
```typescript
// frontend/src/ui/components/molecules/Card/Card.tsx
interface CardProps {
  variant?: 'default' | 'casino' | 'slot' | 'article' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}
```

#### 2. SearchBar Component (Client-side)
```typescript
// frontend/src/ui/components/molecules/SearchBar/SearchBar.tsx
'use client';
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

#### 3. FilterDropdown Component (Client-side)
```typescript
// frontend/src/ui/components/molecules/FilterDropdown/FilterDropdown.tsx
'use client';
interface FilterDropdownProps {
  options: FilterOption[];
  onFilter: (value: string) => void;
  placeholder?: string;
}
```

## 🃏 Оновлені компоненти карток:

### **CasinoCard.v2 (РЕАЛІЗОВАНО):**
- **Структура**: Ранг + Лого | Основна інформація | Бонус + CTA
- **Нові елементи**: StatusBadge, Rating, StatCard
- **Градієнти**: border-l-4 border-l-red-500
- **Статистика**: RTP, Payout, Games з іконками
- **Анімації**: hover:shadow-xl, group-hover ефекти

### **SlotCard.v2 (РЕАЛІЗОВАНО):**
- **Структура**: Зображення з оверлеями | Контент з рейтингом
- **Нові елементи**: StatusBadge (New, Hot), Rating, StatCard
- **Play button overlay** з backdrop-blur
- **Статистика**: RTP, Volatility
- **Анімації**: scale-105 на hover, opacity transitions

### **ArticleCard (ОНОВЛЕНО):**
- **StatusBadge** замість div для Featured/New
- **Градієнтні оверлеї** для кращої читабельності
- **Категорії** через StatusBadge

### **HeroSection (ОНОВЛЕНО):**
- **Trust Indicators** через StatusBadge компоненти
- **Варіанти**: featured, exclusive, new
- **Розміри**: md для кращого відображення

## 🏗️ Архітектура файлів:

```
frontend/src/ui/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Typography/
│   │   ├── Rating/           ✅ НОВИЙ
│   │   ├── StatusBadge/      ✅ НОВИЙ  
│   │   ├── StatCard/         ✅ НОВИЙ
│   │   └── GradientButton/   ✅ НОВИЙ
│   ├── molecules/
│   │   ├── Card/             ✅ ОНОВЛЕНО
│   │   ├── SearchBar/        ✅ НОВИЙ
│   │   └── FilterDropdown/   ✅ НОВИЙ
│   └── organisms/
├── styles/
│   └── tokens.css            ✅ ОНОВЛЕНО
├── tokens/
│   ├── colors.ts             ✅ ОНОВЛЕНО
│   ├── spacing.ts
│   └── typography.ts
└── utils/
    └── cn.ts
```

## 🚀 Статус реалізації:

### ✅ **ЗАВЕРШЕНО:**
- [x] Дизайн-токени та CSS змінні
- [x] Атомарні компоненти (Rating, StatusBadge, StatCard, GradientButton)
- [x] Молекулярні компоненти (Card, SearchBar, FilterDropdown)
- [x] CasinoCard.v2 з повним новим дизайном
- [x] SlotCard.v2 з оверлеями та анімаціями
- [x] Оновлення HeroSection з StatusBadge
- [x] Оновлення ArticleCard з новими компонентами
- [x] Правильне розділення client/server компонентів
- [x] TypeScript типізація без помилок
- [x] Responsive дизайн для всіх пристроїв

### 🎯 **ГОТОВО ДО ВИКОРИСТАННЯ:**
Вся UI система готова та протестована. Всі компоненти працюють без помилок.

## 📋 Інструкції по використанню:

### **Імпорти:**
```typescript
// Атоми
import { Rating, StatusBadge, StatCard, GradientButton } from '@/ui/components/atoms';

// Молекули  
import { Card, SearchBar, FilterDropdown } from '@/ui/components/molecules';

// Оновлені картки
import CasinoCard from '@/components/cards/CasinoCard.v2';
import SlotCard from '@/components/cards/SlotCard.v2';
```

### **Приклади використання:**
```tsx
// Рейтинг казино
<Rating value={4.5} variant="casino" showValue showLabel />

// Статусний бейдж
<StatusBadge variant="featured" size="md">⭐ Featured</StatusBadge>

// Статистична картка
<StatCard 
  icon={<StarIcon />}
  label="RTP" 
  value="97.5%" 
  variant="compact" 
/>

// Картка казино
<CasinoCard 
  casino={casino} 
  rank={1} 
  isFeatured 
  isExclusive 
/>
```

## 🎨 Дизайн принципи:

1. **Casino-first**: Всі компоненти адаптовані для казино-тематики
2. **Performance**: Client/server розділення, lazy loading
3. **Accessibility**: ARIA атрибути, семантичний HTML
4. **Mobile-first**: Responsive дизайн з Tailwind
5. **Consistency**: Єдина дизайн-система через токени
6. **Animation**: Smooth transitions та micro-interactions

---

**🎉 UI система повністю готова та реалізована!**