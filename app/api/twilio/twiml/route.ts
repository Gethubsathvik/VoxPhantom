// app/api/twilio/twiml/route.ts
import { NextResponse } from 'next/server';
import { generateTwiML } from '@/lib/twilio';

export async function POST() {
  try {
    const twiml = generateTwiML('Thank you for calling. Your call has been connected.');
    
    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('TwiML error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate TwiML' },
      { status: 500 }
    );
  }
}
