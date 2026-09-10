# VoxPhantom Deployment Guide

## 🚀 Deployment Options

### Vercel (Frontend)
1. Push your code to GitHub
2. Import your project on Vercel
3. Set the build command to: `npm run build`
4. Set the output directory to: `.next`
5. Deploy!

### Railway (Backend)
1. Create a new project on Railway
2. Connect your GitHub repository
3. Set environment variables from `.env.example`
4. Deploy!

### Docker
1. Build the Docker image:
   ```bash
   docker build -t voxphantom .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 -d voxphantom
   ```

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your environment variables:
   - `JWT_SECRET` - Your JWT secret key
   - `DATABASE_URL` - Your database connection string
   - `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, etc.
   - `NEXT_PUBLIC_ADMIN_EMAIL` - Admin email address

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for JWT signing |
| `REFRESH_TOKEN_SECRET` | Secret key for refresh tokens |
| `AUTH0_DOMAIN` | Your Auth0 domain |
| `AUTH0_CLIENT_ID` | Auth0 client ID |
| `AUTH0_CLIENT_SECRET` | Auth0 client secret |
| `AUTH0_REDIRECT_URI` | Your redirect URI |
| `ADMIN_EMAIL` | Admin email address |
| `NEXTAUTH_URL` | Your domain URL |