# VoxPhantom Quick Start Guide

## 📋 What's Included

**VoxPhantom** is a **production-ready, full-stack VoIP calling platform** with:
- Browser-based calls to mobile numbers and landlines
- WebRTC for browser-to-browser calls
- Twilio integration for phone calls
- Credit system with daily bonuses
- Admin dashboard with analytics
- Modern UI with dark mode

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
cd "d:/project's/projetc 1"
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/voip_db"

# JWT
JWT_SECRET="your-secret-key-change-this-in-production"

# Auth0 (optional)
AUTH0_DOMAIN="your-auth0-domain.auth0.com"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"
AUTH0_REDIRECT_URI="http://localhost:3000"
AUTH0_AUDIENCE="https://your-api.com"

# Twilio
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"