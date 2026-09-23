// middleware/rateLimit.ts
import { NextRequest, NextResponse } from 'next/server';
import { incrementCounter } from '@/lib/redis';

export async function rateLimit(request: NextRequest, limit: number = 100, window: number = 60) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  try {
    const count = await incrementCounter(`rate-limit:${ip}`, window);
    if (count > limit) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }
  } catch (error) {
    console.error('Rate limit check error:', error);
  }

  return null;
}
