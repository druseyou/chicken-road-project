# 🎰 Casino & Gambling Backend (Strapi CMS)

A powerful headless CMS built with Strapi v5 for managing casino reviews, slot games, articles, and gambling content.

## 🚀 Features

- **Casino Reviews Management** - Complete casino review system with ratings, bonuses, and detailed information
- **Slot Games Database** - Comprehensive slot game catalog with RTP, volatility, and provider information  
- **News & Articles** - Blog system with categories, featured articles, and view tracking
- **Comments System** - User comments for casinos, slots, and articles with moderation
- **Bonus Management** - Casino bonus tracking with terms and promotional codes
- **Multi-language Support** - Internationalization ready with i18n plugin
- **Advanced API** - Custom endpoints for featured content, top-rated items, and filtered results
- **Performance Optimized** - Caching, compression, and database optimizations
- **SEO Ready** - Meta fields, structured data, and search-friendly URLs

## 📋 Collection Types

### 🏛️ Casino Reviews (`casino-review`)
- Basic info (name, slug, description, logo)
- Ratings and RTP information
- Detailed reviews with pros/cons
- License and regulatory information
- Supported languages and currencies
- Payment methods and bonus relationships

### 🎲 Slots (`slot`)
- Game information (name, provider, theme)
- Technical details (RTP, volatility, paylines)
- Visual assets (cover images)
- Demo links and betting limits
- Category relationships and popularity flags

### 📰 Articles (`article`)
- Content management (title, content, excerpts)
- SEO optimization (meta titles/descriptions)
- Author and category relationships
- Featured articles and view tracking
- Reading time estimation

### 🎁 Bonuses (`bonus`)
- Bonus types (deposit, no-deposit, free spins)
- Terms and wagering requirements
- Promotional codes and validity periods
- Casino relationships

### 💬 Comments (`comment`)
- User feedback system
- Moderation workflow (pending/published/rejected)
- Ratings and review relationships
- Author information

### 🏷️ Categories (`category`)
- Content organization
- Article and slot categorization

## 🛠️ Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Environment setup:**
```bash
# Copy example environment file
cp .env.example .env

# Generate app keys
npm run strapi generate
```

3. **Database setup:**
```bash
# Development (SQLite)
npm run develop

# Production (PostgreSQL recommended)
# Configure DATABASE_* variables in .env
```

4. **Start the server:**
```bash
# Development mode
npm run develop

# Production mode
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `1337` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_CLIENT` | Database type | `sqlite` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |

### API Configuration

- **Default Limit:** 25 items per request
- **Max Limit:** 100 items per request
- **Caching:** Enabled in production
- **Rate Limiting:** 100 requests per minute
- **CORS:** Configured for frontend domains

## 📡 API Endpoints

### Standard REST API
```
GET    /api/articles
GET    /api/articles/:id
POST   /api/articles
PUT    /api/articles/:id
DELETE /api/articles/:id
```

### Custom Endpoints
```
GET /api/articles/featured     - Featured articles
GET /api/articles/popular      - Most viewed articles
GET /api/casino-reviews/top    - Top-rated casinos
GET /api/slots/popular         - Popular slot games
GET /api/slots/high-rtp        - High RTP slots (96%+)
```

## 🎯 Custom Features

### Performance Optimizations
- **Automatic Population** - Relations auto-populated in responses
- **Query Optimization** - Efficient database queries with field selection
- **Caching Layer** - Memory caching for frequently accessed content
- **Compression** - Response compression for better load times

### Content Management
- **View Tracking** - Automatic view count increment for articles
- **Featured Content** - Special endpoints for homepage content
- **Filtered Results** - Smart filtering by ratings, popularity, RTP
- **Draft & Publish** - Content workflow with draft/published states

### Security & Validation
- **Input Validation** - Schema-level validation with min/max constraints
- **Rate Limiting** - API abuse protection
- **CORS Configuration** - Secure cross-origin requests
- **Content Security Policy** - XSS protection headers

## 🔄 Development Scripts

```bash
# Development
npm run develop          # Start with auto-reload
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Check code style
npm run lint:fix        # Fix code style issues
npm run type-check      # TypeScript validation

# Maintenance
npm run clean           # Clean build files
npm run upgrade         # Upgrade Strapi version
npm run export          # Export content
npm run import          # Import content
```

## 📚 Content Structure

### Relationships
- Articles → Categories (Many-to-One)
- Articles → Comments (One-to-Many)
- Casino Reviews → Bonuses (One-to-Many)
- Casino Reviews → Comments (One-to-Many)
- Slots → Categories (Many-to-One)
- Slots → Comments (One-to-Many)

### Media Management
- Image uploads for casino logos
- Slot game cover images
- Article preview images
- Automatic image optimization
- Multiple format support

## 🌐 Internationalization

- Multi-language content support
- Locale-specific API responses
- Translated meta information
- Language-aware URL structures

## 📈 Monitoring & Analytics

- Request logging (configurable)
- Performance monitoring
- Error tracking
- Content analytics (view counts)

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure PostgreSQL database
- [ ] Set up environment variables
- [ ] Enable caching and compression
- [ ] Configure CDN for media files
- [ ] Set up SSL certificates
- [ ] Configure backup strategy

### Recommended Stack
- **Database:** PostgreSQL 13+
- **Cache:** Redis (optional)
- **Storage:** AWS S3 or Cloudinary
- **Hosting:** Railway, Heroku, or VPS
- **CDN:** Cloudflare or AWS CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

<sub>🎰 Built with Strapi v5 for modern headless CMS needs</sub>
