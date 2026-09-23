// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function withAuth(handler: Function) {
  return async (req: NextRequest, res: Response) => {
    // Check for token in cookies
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      // For API routes, check if we're in an authenticated route
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      // For web routes, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Attach user to request
    (req as any).user = decoded;
    
    return handler(req, res);
  };
}

// Root middleware for security headers
export function securityHeaders(req: NextRequest, res: Response, next: Function) {
  const headers = new Headers(req.headers);
  
  // Add security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
  
  // Add CSP for authentication
  headers.set('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
  
  // Add HSTS header
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Add X-Frame-Options
  headers.set('X-Frame-Options', 'DENY');
  
  // Add X-Content-Type-Options
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Add X-XSS-Protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  next();
}