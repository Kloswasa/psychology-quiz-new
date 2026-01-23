import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RIASEC_TYPES } from '@/lib/types';
import type { RiasecType } from '@/lib/types';

export async function GET(_: Request, context: any) {
  try {
    const typeParam = await context?.params;
    const key = typeParam?.type?.toUpperCase() as RiasecType;
    if (!key || !RIASEC_TYPES.includes(key)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    const data = await prisma.travelerType.findUnique({
      where: { riasecType: key },
    });
    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    // Parse JSON fields before returning
    const parsed = {
      ...data,
      destinations: JSON.parse(data.destinations),
      tips: JSON.parse(data.tips),
      trivia: JSON.parse(data.trivia),
    };
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch traveler type' }, { status: 500 });
  }
}

