// app/api/countries/route.ts
import { NextResponse } from 'next/server';
import { COUNTRIES } from '@/utils/constants';

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: COUNTRIES,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Countries fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
