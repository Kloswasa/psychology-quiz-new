import { prisma } from '@/lib/prisma';
import TravelerResult from '@/components/TravelerResult';
import { RiasecType, RIASEC_TYPES, PERSONALITY_THEME_COLORS } from '@/lib/types';
import type { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const typeKey = (params.type ?? '').toUpperCase() as RiasecType;
  if (!typeKey || !RIASEC_TYPES.includes(typeKey)) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold">Result not found</h1>
        <p className="mt-2 text-gray-600">Please retake the quiz.</p>
      </div>
    );
  }

  const data = await prisma.travelerType.findUnique({
    where: { riasecType: typeKey },
  });

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold">Result not found</h1>
      </div>
    );
  }

  const destinations = JSON.parse(data.destinations) as Array<{ name: string; reason: string }>;
  const tips = JSON.parse(data.tips) as string[];
  const trivia = JSON.parse(data.trivia) as string[];

  const shareUrl = `/result?type=${data.riasecType}`;
  const shareTitle = `I'm ${data.title}! What's your travel personality?`;
  const themeColor = PERSONALITY_THEME_COLORS[data.riasecType];

  return (
    <>
      <TravelerResult
        title={data.title}
        description={data.description}
        shareUrl={shareUrl}
        shareTitle={shareTitle}
        imageUrl={data.imageUrl}
        themeColor={themeColor}
        destinations={destinations}
        tips={tips}
        trivia={trivia}
      />
      <div className="flex justify-center px-4 pb-8" style={{ backgroundColor: themeColor }}>
        <a
          href="/quiz"
          className="text-white underline decoration-white/80 underline-offset-2 hover:decoration-white"
        >
          Retake Quiz
        </a>
      </div>
    </>
  );
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const typeKey = (params.type ?? '').toUpperCase() as RiasecType;
  if (!typeKey || !RIASEC_TYPES.includes(typeKey)) {
    return {};
  }
  const data = await prisma.travelerType.findUnique({
    where: { riasecType: typeKey },
  });
  if (!data) return {};

  const title = `I'm ${data.title}! What's your travel personality?`;
  const description = data.description.slice(0, 150);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: data.shareImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [data.shareImageUrl],
    },
  };
}

