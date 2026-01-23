import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: { answers: true },
    });
    return NextResponse.json(questions);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

