---
alwaysApply: true
---

# 🎰 Backend Development Rules - Casino CMS (Strapi)

## 🏗️ **Architecture & Structure**

### **Project Structure**
```
backend/src/
├── api/                   # API endpoints
│   ├── article/          # Articles collection
│   ├── casino-review/    # Casino reviews collection
│   ├── slot/            # Slots collection
│   ├── bonus/           # Bonuses collection
│   ├── comment/         # Comments collection
│   └── category/        # Categories collection
├── config/              # Configuration files
│   ├── api.ts          # API configuration
│   ├── database.ts     # Database configuration
│   ├── server.ts       # Server configuration
│   └── middlewares.ts  # Middleware configuration
└── extensions/         # Strapi extensions
```

## 📋 **Collection Types Guidelines**

### **Schema Design Principles**
- **Always** include proper validation (min/max lengths, required fields)
- Use descriptive field names and add descriptions
- Implement proper relationships between collections
- Include SEO fields (meta_title, meta_description) for public content
- Add status fields for content moderation (draft/published)

### **Required Fields Pattern**
```json
{
  "name": {
    "type": "string",
    "required": true,
    "maxLength": 100,
    "minLength": 3
  },
  "slug": {
    "type": "uid",
    "targetField": "name",
    "required": true
  },
  "meta_title": {
    "type": "string",
    "maxLength": 60
  },
  "meta_description": {
    "type": "text",
    "maxLength": 160
  }
}
```

### **Media Fields**
```json
{
  "cover_image": {
    "type": "media",
    "multiple": false,
    "required": false,
    "allowedTypes": ["images"]
  }
}
```

### **Rating and Numeric Fields**
```json
{
  "rating": {
    "type": "decimal",
    "min": 0,
    "max": 10,
    "required": true,
    "default": 0
  },
  "rtp": {
    "type": "decimal",
    "min": 80,
    "max": 99,
    "default": 96
  }
}
```

## 🔧 **Controller Development**

### **Controller Structure**
```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::collection.collection', ({ strapi }) => ({
  // Override find method with default population
  async find(ctx) {
    const { query } = ctx;
    
    ctx.query = {
      ...query,
      populate: query.populate || {
        // Define default relations to populate
        media_field: true,
        relation_field: true,
        nested_relation: {
          filters: {
            publishedAt: { $notNull: true }
          }
        }
      },
      sort: query.sort || 'createdAt:desc'
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Custom methods for specific business logic
  async findFeatured(ctx) {
    const entities = await strapi.entityService.findMany('api::collection.collection', {
      filters: {
        is_featured: true,
        publishedAt: { $notNull: true }
      },
      populate: {
        media_field: true,
        relation_field: true
      },
      sort: 'createdAt:desc',
      pagination: {
        limit: ctx.query.limit || 10
      }
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  }
}));
```

### **Service Layer**
```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::collection.collection', ({ strapi }) => ({
  // Custom service methods
  async findPublished(params = {}) {
    return await strapi.entityService.findMany('api::collection.collection', {
      ...params,
      filters: {
        ...params.filters,
        publishedAt: { $notNull: true }
      }
    });
  },

  // Business logic methods
  async incrementViewCount(id: number) {
    const entity = await strapi.entityService.findOne('api::collection.collection', id);
    
    if (entity) {
      return await strapi.entityService.update('api::collection.collection', id, {
        data: {
          view_count: (entity.view_count || 0) + 1
        }
      });
    }
  }
}));
```

### **Route Configuration**
```typescript
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::collection.collection', {
  config: {
    find: {
      middlewares: ['api::collection.populate-defaults']
    },
    findOne: {
      middlewares: ['api::collection.populate-defaults']
    }
  }
});
```

## 🔒 **Security & Validation**

### **Input Validation**
- Use schema-level validation for all fields
- Implement proper min/max constraints
- Validate email formats, URLs, and other specific data types
- Use enumerations for fixed value sets

### **Access Control**
```typescript
// In policies or middlewares
export default (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;
  
  if (!user) {
    return false; // Deny access
  }
  
  // Check user permissions
  return user.role.type === 'authenticated';
};
```

### **Data Sanitization**
```typescript
// Always sanitize output
const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
return this.transformResponse(sanitizedEntities);
```

## 📊 **Database Best Practices**

### **Relationships**
```json
{
  "category": {
    "type": "relation",
    "relation": "manyToOne",
    "target": "api::category.category",
    "inversedBy": "articles"
  },
  "comments": {
    "type": "relation",
    "relation": "oneToMany",
    "target": "api::comment.comment",
    "mappedBy": "article"
  }
}
```

### **Indexing Strategy**
- Index frequently queried fields (slug, status, publishedAt)
- Create composite indexes for common query patterns
- Monitor query performance and optimize accordingly

### **Data Migration**
```javascript
// In database migrations
module.exports = {
  async up(knex) {
    // Add new columns with proper defaults
    await knex.schema.alterTable('articles', (table) => {
      table.integer('view_count').defaultTo(0);
      table.boolean('is_featured').defaultTo(false);
    });
  },

  async down(knex) {
    // Rollback changes
    await knex.schema.alterTable('articles', (table) => {
      table.dropColumn('view_count');
      table.dropColumn('is_featured');
    });
  }
};
```

## 🚀 **Performance Optimization**

### **Query Optimization**
```typescript
// ✅ Efficient queries with selective population
const entities = await strapi.entityService.findMany('api::article.article', {
  fields: ['title', 'slug', 'excerpt'], // Only fetch needed fields
  populate: {
    category: {
      fields: ['name', 'slug'] // Limit populated fields
    },
    preview_image: {
      fields: ['url', 'alternativeText']
    }
  },
  filters: {
    publishedAt: { $notNull: true }
  },
  sort: 'publishedAt:desc',
  pagination: {
    limit: 10
  }
});
```

### **Caching Strategy**
```typescript
// Implement caching for frequently accessed data
const cacheKey = `casino-reviews-top-rated`;
let topCasinos = await strapi.cache.get(cacheKey);

if (!topCasinos) {
  topCasinos = await strapi.entityService.findMany('api::casino-review.casino-review', {
    filters: { rating: { $gte: 8 } },
    sort: 'rating:desc',
    pagination: { limit: 10 }
  });
  
  await strapi.cache.set(cacheKey, topCasinos, 3600000); // 1 hour
}
```

### **Bulk Operations**
```typescript
// For bulk data operations
const bulkCreate = async (data) => {
  return await Promise.all(
    data.map(item => 
      strapi.entityService.create('api::collection.collection', { data: item })
    )
  );
};
```

## 🌐 **API Design Standards**

### **Response Format**
```typescript
// Consistent API responses
return {
  data: sanitizedEntities,
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 10,
      total: 250
    }
  }
};
```

### **Error Handling**
```typescript
try {
  const entity = await strapi.entityService.findOne(uid, id);
  
  if (!entity) {
    return ctx.notFound('Entity not found');
  }
  
  return entity;
} catch (error) {
  strapi.log.error('Error in controller:', error);
  return ctx.internalServerError('Internal server error');
}
```

### **Custom Endpoints**
```typescript
// Custom routes for specific business needs
{
  method: 'GET',
  path: '/casino-reviews/top-rated',
  handler: 'casino-review.findTopRated',
  config: {
    policies: [],
    middlewares: []
  }
}
```

## 🔧 **Configuration Management**

### **Environment Variables**
```typescript
// server.ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    url: env('PUBLIC_ADMIN_URL', '/admin'),
    serveAdminPanel: env.bool('SERVE_ADMIN', true),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

### **Database Configuration**
```typescript
// database.ts
export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false)
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10) 
      }
    }
  };
  
  return {
    connection: {
      client,
      ...connections[client]
    }
  };
};
```

## 🧪 **Testing Guidelines**

### **Unit Tests**
```javascript
// Test service methods
describe('Article Service', () => {
  test('should create article with valid data', async () => {
    const articleData = {
      title: 'Test Article',
      content: 'Test content',
      author: 'Test Author'
    };
    
    const article = await strapi.services['api::article.article'].create({
      data: articleData
    });
    
    expect(article.title).toBe(articleData.title);
  });
});
```

### **Integration Tests**
```javascript
// Test API endpoints
describe('Article API', () => {
  test('GET /api/articles should return articles', async () => {
    const response = await request(strapi.server.httpServer)
      .get('/api/articles')
      .expect(200);
    
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

## 🚨 **Common Mistakes to Avoid**

### **❌ DON'T DO**
```typescript
// Don't use raw database queries without sanitization
const articles = await strapi.db.query('api::article.article').findMany({
  where: { title: userInput } // Potential SQL injection
});

// Don't expose sensitive data
return {
  user: {
    password: user.password, // Never expose passwords
    email: user.email
  }
};

// Don't forget error handling
const entity = await strapi.entityService.findOne(uid, id);
return entity; // What if entity is null?
```

### **✅ DO THIS INSTEAD**
```typescript
// Use entity service with proper filtering
const articles = await strapi.entityService.findMany('api::article.article', {
  filters: {
    title: {
      $containsi: userInput // Safe filtering
    }
  }
});

// Sanitize output
const sanitizedUser = await this.sanitizeOutput(user, ctx);
return sanitizedUser;

// Handle errors properly
const entity = await strapi.entityService.findOne(uid, id);
if (!entity) {
  return ctx.notFound('Entity not found');
}
return this.sanitizeOutput(entity, ctx);
```

## 📝 **File Naming Conventions**

- **Controllers**: kebab-case (`casino-review.ts`)
- **Services**: kebab-case (`casino-review.ts`)
- **Routes**: kebab-case (`casino-review.ts`)
- **Schemas**: kebab-case (`schema.json`)
- **Middlewares**: camelCase (`populateDefaults.ts`)
- **Policies**: camelCase (`isAuthenticated.ts`)

## 🔍 **Logging and Monitoring**

### **Structured Logging**
```typescript
// Use Strapi's built-in logger
strapi.log.info('Article created', {
  id: article.id,
  title: article.title,
  author: article.author
});

strapi.log.error('Database error', {
  error: error.message,
  stack: error.stack,
  query: 'articles.findMany'
});
```

### **Performance Monitoring**
```typescript
// Monitor query performance
const startTime = Date.now();
const entities = await strapi.entityService.findMany(uid, params);
const duration = Date.now() - startTime;

if (duration > 1000) {
  strapi.log.warn('Slow query detected', {
    duration,
    uid,
    params
  });
}
```

## 📋 **Deployment Checklist**

Before deploying to production:
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Backup strategy implemented
- [ ] Monitoring and logging configured
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Content types validated
- [ ] API endpoints tested
- [ ] Performance optimized

---

## 🎯 **Quick Reference**

### **Common Strapi Methods**
```typescript
// Entity Service
strapi.entityService.findMany(uid, params)
strapi.entityService.findOne(uid, id, params)
strapi.entityService.create(uid, params)
strapi.entityService.update(uid, id, params)
strapi.entityService.delete(uid, id)

// Query Engine
strapi.db.query(uid).findMany(params)
strapi.db.query(uid).findOne(params)
strapi.db.query(uid).create(params)
strapi.db.query(uid).update(params)
strapi.db.query(uid).delete(params)
```

### **Useful Filters**
```typescript
// Common filter patterns
filters: {
  publishedAt: { $notNull: true },
  rating: { $gte: 8 },
  title: { $containsi: 'casino' },
  createdAt: { $between: [startDate, endDate] },
  category: { slug: { $in: ['slots', 'casino'] } }
}
``` 