// app/api/calls/initiate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeInput } from '@/lib/sanitization';
import { z } from 'zod';

// Define schema for call initiation
const CallInitiateSchema = z.object({
  recipientNumber: z.string().min(10, 'Invalid phone number'),
  country: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sanitizedBody = sanitizeInput(body);
    
    // Validate input
    const result = CallInitiateSchema.safeParse(sanitizedBody);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    const { recipientNumber, country } = result.data;
    
    // Find user
    const user = await db.user.findUnique({
      where: { email: 'user@example.com' } // In real app, get from auth
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check credit balance
    const credits = await db.credits.findUnique({
      where: { userId: user.id }
    });
    
    // Calculate cost
    const costPerMinute = 0.01;
    const duration = 300; // 5 minutes example
    const creditsNeeded = Math.ceil((duration / 60) * costPerMinute);
    
    if (credits && credits.balance <= 0) {
      return NextResponse.json(
        { success: false, error: 'Insufficient credits' },
        { status: 400 }
      );
    }
    
    if (credits && credits.balance < creditsNeeded) {
      return NextResponse.json(
        { success: false, error: 'Insufficient credits' },
        { status: 400 }
      );
    }
    
    // Create call record
    const call = await db.call.create({
      data: {
        userId: user.id,
        recipientNumber,
        recipientCountry: country || 'Unknown',
        duration: 0,
        creditsUsed: 0,
        status: 'INITIATED',
        recordingUrl: null,
        transcript: null,
        quality: null,
        startedAt: new Date(),
        twilioSid: 'twilio-call-sid-123',
      },
    });
    
    // Deduct credits
    await db.credits.update({
      where: { userId: user.id },
      data: {
        balance: credits!.balance - creditsNeeded,
      },
    });
    
    return NextResponse.json(
      {
        success: true,
        data: {
          callId: call.id,
          costPerMinute,
          creditsUsed: creditsNeeded,
          newBalance: credits!.balance - creditsNeeded,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Call initiation error:', error);
    return NextResponse.json(
      { success: false, error: 'Call initiation failed' },
      { status: 500 }
    );
  }
}
