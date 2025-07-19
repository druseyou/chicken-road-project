---
alwaysApply: true
---

# 🔗 Canonical URL & SEO Metadata Rules - Casino Project

## 🎯 **SEO Architecture Overview**

### **📋 Core SEO Principles**
1. **Canonical URL** - завжди вказує на default locale (it) версію
2. **Current URL** - для Open Graph, Twitter (з локалізацією)
3. **Hreflang** - альтернативні версії для всіх мов
4. **Structured metadata** - Open Graph, Twitter Cards, JSON-LD

## 🔧 **Canonical URL Implementation**

### **✅ CORRECT Pattern:**
```typescript
import { getCanonicalUrl, getCurrentUrl, getAlternateUrls } from '@/utils/canonical';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // ✅ Canonical - always points to default locale (it)
  const canonicalUrl = getCanonicalUrl(locale, '/casino-reviews');
  // Result: http://localhost:3000/casino-reviews (NO locale prefix)
  
  // ✅ Current URL - for Open Graph (with locale)
  const currentUrl = getCurrentUrl(locale, '/casino-reviews');  
  // Result: http://localhost:3000/en/casino-reviews (WITH locale)
  
  // ✅ Alternates - all language versions
  const alternates = getAlternateUrls('/casino-reviews');

  return {
    title: `${title} | Chicken Road Project`,
    description: description,
    alternates: {
      canonical: canonicalUrl,  // Points to default locale
      languages: alternates,    // All language versions
    },
    openGraph: {
      url: currentUrl,          // Current localized version
      locale: locale,
    },
  };
}
```

### **❌ WRONG Pattern:**
```typescript
// ❌ DON'T use currentUrl for canonical
alternates: {
  canonical: currentUrl,  // This creates duplicate content issues!
}

// ❌ DON'T use canonicalUrl for Open Graph
openGraph: {
  url: canonicalUrl,      // This loses localization context!
}
```

## 🌐 **Environment Configuration**

### **🔧 Required Environment Variables**
```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production (production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### **⚠️ Critical Rules:**
- **NO trailing slash** - `http://localhost:3000` ✅ (not `http://localhost:3000/`)
- **Match your actual domain** - exactly as users access it
- **Different for dev/prod** - use .env.local and .env.production

## 📄 **Page-Specific SEO Patterns**

### **🏠 Homepage:**
```typescript
const canonicalUrl = getCanonicalUrl(locale, '/');
const currentUrl = getCurrentUrl(locale, '/');
// Canonical: http://localhost:3000
// Current: http://localhost:3000/en (for en locale)
```

### **📰 Article Pages:**
```typescript
const canonicalUrl = getCanonicalUrl(locale, `/news/${slug}`);
const currentUrl = getCurrentUrl(locale, `/news/${slug}`);
// Canonical: http://localhost:3000/news/article-title
// Current: http://localhost:3000/en/news/article-title
```

### **🎰 Dynamic Pages:**
```typescript
const canonicalUrl = getCanonicalUrl(locale, `/casino-reviews/${slug}`);
const currentUrl = getCurrentUrl(locale, `/casino-reviews/${slug}`);
// Canonical: http://localhost:3000/casino-reviews/casino-name
// Current: http://localhost:3000/uk/casino-reviews/casino-name
```

## 🎨 **Metadata Structure Template**

### **📋 Complete Metadata Pattern:**
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await fetchPageData(slug);
  
  if (!data) {
    return { title: 'Page Not Found | Chicken Road Project' };
  }

  const canonicalUrl = getCanonicalUrl(locale, `/path/${slug}`);
  const currentUrl = getCurrentUrl(locale, `/path/${slug}`);
  const alternates = getAlternateUrls(`/path/${slug}`);
  const imageUrl = data.image?.url ? getStrapiURL(data.image.url) : undefined;

  return {
    // Basic SEO
    title: `${data.title} | Chicken Road Project`,
    description: data.description?.slice(0, 160) + '...' || 'Default description',
    
    // Canonical & Alternates
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    
    // Open Graph
    openGraph: {
      title: data.title,
      description: data.description?.slice(0, 160) + '...',
      url: currentUrl,
      siteName: 'Chicken Road Project',
      locale: locale,
      type: 'article', // or 'website'
      publishedTime: data.createdAt, // for articles
      authors: [data.author || 'Chicken Road Team'],
      images: imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: data.image?.alternativeText || data.title,
      }] : undefined,
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description?.slice(0, 160) + '...',
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
```

## 🔍 **SEO Validation Checklist**

### **✅ Before Every Commit:**
- [ ] Canonical URL points to default locale (no /it/, /en/, /uk/)
- [ ] Open Graph URL includes current locale
- [ ] All hreflang alternatives generated
- [ ] Image URLs are absolute (include domain)
- [ ] Descriptions are 150-160 characters
- [ ] Titles include brand name

### **🧪 Testing Commands:**
```bash
# Check canonical URLs in browser DevTools
# Look for: <link rel="canonical" href="http://localhost:3000/page-name" />

# Validate with online tools:
# - Google Rich Results Test
# - Facebook Sharing Debugger
# - Twitter Card Validator
```

## 🚨 **Common Mistakes to Avoid**

### **❌ Canonical URL Errors:**
```typescript
// ❌ Including locale in canonical
const canonicalUrl = `${SITE_URL}/${locale}/casino-reviews`;

// ❌ Using current URL for canonical
alternates: { canonical: getCurrentUrl(locale, path) }

// ❌ Missing environment variable
const canonicalUrl = `https://hardcoded-domain.com${path}`;
```

### **❌ Open Graph Errors:**
```typescript
// ❌ Using canonical URL for Open Graph
openGraph: { url: canonicalUrl }

// ❌ Missing locale
openGraph: { url: currentUrl /* missing locale property */ }

// ❌ Relative image URLs
images: [{ url: '/uploads/image.jpg' }] // Should be absolute!
```

### **❌ Environment Errors:**
```bash
# ❌ Trailing slash
NEXT_PUBLIC_SITE_URL=http://localhost:3000/

# ❌ Wrong protocol
NEXT_PUBLIC_SITE_URL=https://localhost:3000  # Should be http for dev

# ❌ Missing variable
# (No NEXT_PUBLIC_SITE_URL set at all)
```

## 📊 **Localization Strategy**

### **🌍 Multi-language SEO:**
```typescript
// Default locale (it) - canonical target
// http://localhost:3000/casino-reviews

// English locale
// http://localhost:3000/en/casino-reviews

// Ukrainian locale  
// http://localhost:3000/uk/casino-reviews

// All point to same canonical: http://localhost:3000/casino-reviews
```

### **🔗 Hreflang Implementation:**
```html
<!-- Generated automatically -->
<link rel="alternate" hreflang="it" href="http://localhost:3000/casino-reviews" />
<link rel="alternate" hreflang="en" href="http://localhost:3000/en/casino-reviews" />
<link rel="alternate" hreflang="uk" href="http://localhost:3000/uk/casino-reviews" />
<link rel="canonical" href="http://localhost:3000/casino-reviews" />
```

## 🎯 **Performance Considerations**

### **⚡ SEO Performance:**
- **Lazy load** non-critical metadata
- **Cache** generated URLs when possible
- **Minimize** metadata generation time
- **Preload** critical SEO resources

### **📈 Monitoring:**
```typescript
// Add performance monitoring
const start = performance.now();
const canonicalUrl = getCanonicalUrl(locale, path);
const end = performance.now();
console.log(`SEO generation time: ${end - start}ms`);
```

---

## 💡 **Quick Reference**

### **🔧 Functions to Use:**
- `getCanonicalUrl(locale, path)` - for canonical links
- `getCurrentUrl(locale, path)` - for Open Graph/Twitter
- `getAlternateUrls(path)` - for hreflang alternatives

### **📝 Environment Setup:**
1. Create `.env.local` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
2. Restart dev server after changes
3. Verify in browser DevTools

### **🎯 SEO Goals:**
- **Avoid duplicate content** with proper canonicals
- **Support multilingual** users with hreflang
- **Optimize social sharing** with Open Graph
- **Improve search rankings** with structured metadata

**Remember: Canonical URLs are for search engines, Current URLs are for users! 🎯** 