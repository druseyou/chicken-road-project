---
alwaysApply: true
---

# 🌐 Правила локализации проекта

## ⚠️ КРИТИЧНО: Никогда не используйте статичный текст!

### **ВСЕГДА используйте локализацию:**

1. **Все текстовые строки** должны быть в файлах `frontend/messages/`
2. **Используйте `useTranslations()`** для client компонентов
3. **Используйте `getTranslations()`** для server компонентов
4. **НЕ пишите текст напрямую** в JSX

### **Структура файлов локализации:**
```
frontend/messages/
├── en.json    - Английский
├── it.json    - Итальянский (основной)
├── uk.json    - Украинский
```

### **Правильные примеры:**

#### ✅ Server Component:
```typescript
export default async function Page() {
  const t = await getTranslations('PageName');
  
  return (
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  );
}
```

#### ✅ Client Component:
```typescript
'use client';
export default function Component() {
  const t = useTranslations('ComponentName');
  
  return (
    <span>{t('label')}</span>
  );
}
```

### **ЗАПРЕЩЕННЫЕ примеры:**

#### ❌ НИКОГДА не делайте так:
```typescript
// ПЛОХО - статичный текст
<h1>🏆 Top Rated</h1>
<p>Expert reviews of the best online casinos</p>
<span>Total Casinos</span>

// ПЛОХО - хардкод на английском
<button>Play Now</button>
<div>Welcome Bonuses</div>
```

### **Соглашения по ключам:**

1. **Используйте вложенную структуру:**
```json
{
  "NewsPage": {
    "title": "Новини",
    "badges": {
      "latest": "Останні новини",
      "breaking": "Термінові",
      "expert": "Експертний аналіз"
    },
    "stats": {
      "totalArticles": "Всього статей",
      "categories": "Категорії"
    }
  }
}
```

2. **Логическая группировка:**
   - `badges` - для всех бейджів
   - `stats` - для статистики
   - `buttons` - для кнопок
   - `sections` - для заголовків секцій
   - `messages` - для повідомлень

3. **Описательные ключи:**
   - `playNow` вместо `btn1`
   - `expertChoice` вместо `badge2`
   - `totalCasinos` вместо `stat1`

### **Обязательные поля для каждой страницы:**

```json
{
  "PageName": {
    "title": "Заголовок страницы",
    "description": "Описание страницы",
    "subtitle": "Подзаголовок (если есть)",
    "badges": {
      "badge1": "Текст бейджа 1",
      "badge2": "Текст бейджа 2"
    },
    "sections": {
      "section1": "Заголовок секции 1",
      "section2": "Заголовок секции 2"
    },
    "stats": {
      "stat1": "Статистика 1",
      "stat2": "Статистика 2"
    },
    "buttons": {
      "viewAll": "Переглянути всі",
      "playNow": "Грати зараз"
    },
    "messages": {
      "noResults": "Результатів не знайдено",
      "loading": "Завантаження..."
    }
  }
}
```

### **Проверка перед коммитом:**

1. **Найдите все хардкодные строки** в компонентах
2. **Проверьте наличие ключей** во всех языковых файлах
3. **Убедитесь в консистентности** переводов

### **Инструменты для проверки:**

```bash
# Поиск хардкодных строк (примеры)
grep -r "🏆" frontend/src/app/
grep -r "Total" frontend/src/app/
grep -r "Expert" frontend/src/app/
```

### **При создании новых компонентов:**

1. **Сначала определите все текстовые строки**
2. **Добавьте ключи в messages файлы**
3. **Только потом пишите JSX с t() функциями**

---

**🚨 ПОМНИТЕ: Каждая текстовая строка должна быть локализована!** 