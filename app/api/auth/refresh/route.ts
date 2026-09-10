// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createToken, createRefreshToken } from '@/lib/auth';
import { rateLimitLogin } from '@/lib/rateLimiter';
import { sanitizeInput } from '@/lib/sanitization';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    // Get refresh token from cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: 'No refresh token provided' },
        { status: 401 }
      );
    }
    
    // Rate limit refresh attempts
    const rateLimitResult = await rateLimitLogin(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }
    
    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid refresh token' },
        { status: 401 }
      );
    }
    
    // Create new tokens
    const newToken = createToken(decoded.userId, 'user@example.com');
    const newRefreshToken = createRefreshToken(decoded.userId);
    
    // Set new cookies
    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: decoded.userId,
            email: 'user@example.com',
            firstName: 'User',
            lastName: 'Test',
            country: 'US',
            verified: true,
            createdAt: new Date(),
          },
        },
      },
      { status: 200 }
    );
    
    // Set new HttpOnly cookies
    response.cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    
    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { success: false, error: 'Token refresh failed' },
      { status: 500 }
    );
  }
}