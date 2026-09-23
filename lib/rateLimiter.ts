// lib/rateLimiter.ts
import { NextRequest, NextResponse } from 'next/server';
import { incrementCounter, getFromCache, setInCache } from '@/lib/redis';

const LOGIN_ATTEMPT_LIMIT = 5;
const LOCKOUT_PERIOD = 15 * 60;

export async function rateLimitLogin(req: NextRequest) {
  void req;
  const lockout = await getFromCache('login_attempts:stub');
  if (lockout && Number(lockout) > Date.now()) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again later.' },
      { status: 429 }
    );
  }

  const attempts = await incrementCounter('login_attempts:stub', 15 * 60);

  if (attempts > LOGIN_ATTEMPT_LIMIT) {
    await setInCache('login_attempts:stub', String(Date.now() + LOCKOUT_PERIOD * 1000));
  }

  return null;
}
