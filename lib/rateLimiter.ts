// Rate limiting middleware for login attempts
import { NextRequest, NextResponse } from 'next/server';
import { incrementCounter, getFromCache } from '@/lib/redis';

const LOGIN_ATTEMPT_LIMIT = 5;
const LOCKOUT_PERIOD = 15 * 60; // 15 minutes in seconds

export async function rateLimitLogin(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';
  
  const key = `login_attempts:${ip}`;
  
  // Check if user is already locked out
  const lockout = await getFromCache(key);
  if (lockout && lockout > Date.now()) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again later.' },
      { status: 429 }
    );
  }
  
  // Increment attempt counter
  const attempts = await incrementCounter(key, LOCKOUT_PERIOD);
  
  if (attempts > LOGIN_ATTEMPT_LIMIT) {
    // Lock out for the period
    await setCache(key, Date.now() + LOCKOUT_PERIOD * 1000);
  }
  
  return null;
}

// Helper functions for Redis
async function setCache(key: string, value: number) {
  // Implementation depends on actual Redis client setup
  // This is a placeholder - actual implementation would use redis.set()
  console.log(`Setting cache: ${key} = ${value}`);
}

async function getCache(key: string) {
  // Implementation depends on actual Redis client setup
  // This is a placeholder - actual implementation would use redis.get()
  return null;
}