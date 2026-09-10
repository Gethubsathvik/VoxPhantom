# VoxPhantom Architecture

VoxPhantom is a **production-ready, full-stack VoIP calling platform** designed for scalability, security, and ease of use. The system follows modern best practices and is structured for maintainability and growth.

## 🏗️ System Architecture

### 🏗️ Layered Architecture
1. **Presentation Layer** - Next.js 15 (React 19)
2. **API Layer** - Next.js API Routes
3. **Database Layer** - PostgreSQL with Prisma ORM
4. **Infrastructure Layer** - Docker, Redis, and external services

### 🏗️ Key Components

#### 1. **Frontend (Next.js)**
- File-based routing with App Router
- Server Components for optimal performance
- Server Actions for data mutations
- Server Components for data fetching
- Server Components for server-side rendering

#### Key Files:
- `app/page.tsx` - Root layout and landing page
- `app/page.tsx` - Landing page component
- `app/layout.tsx` - Root layout with authentication wrapper
- `app/api/` - API route handlers
- `components/` - Reusable UI components
- `hooks/` - Custom React hooks for state management

#### Backend (API Routes)
- File-based routing in `app/api/`
- API route handlers in `/api/` directory
- Authentication routes in `/api/auth/`
- Call management routes in `/api/calls/`
- Credit management in `/api/credits/`

### 🗄️ Database Schema (Prisma)

The database schema includes 13 core models:

1. **User** - User accounts & profiles
2. **OAuthAccount** - OAuth integration
3. **Session** - Session management
4. **Credits** - Credit balance tracking
5. **Call** - Call records
6. **Transaction** - Financial transactions
7. **Device** - Device management
9. **Report** - User reports
10. **ApiKey** - API key management
10. **UserSettings** - User preferences
11. **Analytics** - Platform metrics
13. **Referral** - Referral system
14. **Relationships** - All indexed & optimized

## 🔒 Security Measures

- ✅ **HTTPS/TLS** - All traffic encrypted
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Rate Limiting** - 100 requests/minute per IP
- ✅ **CORS Protection** - Strict origin control
- ✅ **CSRF Protection** - Token-based verification
- ✅ **XSS Protection** - Input sanitization
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Security Headers** - CSP, X-Frame-Options, etc.
- ✅ **Session Management** - Secure session handling
- ✅ **Device Fingerprinting** - Trusted devices tracking

## 🛠️ Development Workflow

1. **Local Development**: `npm run dev`
2. **Database Setup**: `npm run db:push && npm run db:seed`
3. **Testing**: `npm test`
4. **Linting**: `npm run lint`
5. **Type Checking**: `npm run typecheck`

## 📦 Deployment

- **Vercel**: For frontend deployment
- **Railway** - For backend and database
- **Docker** - Containerization for consistency
- **CI/CD** - GitHub Actions workflow for automated testing and deployment

## 🔄 Data Flow

1. User interacts with UI → Next.js components
2. API routes handle requests with authentication middleware
3. Auth middleware verifies JWT tokens
4. Prisma ORM queries database
5. Twilio API for phone calls
6. WebRTC for browser-to-browser calls
7. Redis used for rate limiting and caching
8. Responses returned to client

## 📈 Scalability Features

- **Database Indexing** - All models have proper indexes
- ✅ Connection Pooling - Optimized database connections
- ✅ Redis Caching - Reduce database load
- ✅ CDN Integration (Cloudflare) - Global content delivery
- ✅ Load Balancing - Multiple instances behind load balancer
- ✅ Horizontal Scaling - Add more instances as needed

## 🔄 Continuous Integration/Continuous Deployment (CI/CD)

- GitHub Actions workflow for CI/CD
- Automated linting and type checking
- Automated testing
- Build artifact creation
- Deployment to Vercel and Railway

## 📈 Monitoring & Observability

- Health checks endpoint (`/api/health`)
- Error tracking and logging
- Performance monitoring
- Usage analytics
- Alerting system for critical issues

This architecture ensures that VoxPhantom can scale horizontally, maintain security, and provide an excellent user experience across all devices.