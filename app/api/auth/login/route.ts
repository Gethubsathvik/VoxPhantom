// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { LoginSchema } from '@/lib/validation';
import { rateLimitLogin } from '@/lib/rateLimiter';
import { sanitizeInput } from '@/lib/sanitization';
import { Auth0Service } from '@/lib/auth0';

const auth0Service = new Auth0Service();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    // Rate limit login attempts
    const rateLimitResult = await rateLimitLogin(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }
    
    // Validate input
    const result = LoginSchema.safeParse(sanitizedBody);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    
    // Use Auth0 service to handle login
    const { token, refreshToken } = await auth0Service.login(email, password);
    
    // Update last login
    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });
    }
    
    // Set HttpOnly cookies
    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user?.id || 'unknown',
            email: email,
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
    
    // Set HttpOnly cookies
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 60 * 60 * 24 * 30,
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
