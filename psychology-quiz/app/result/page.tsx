import { prisma } from '@/lib/prisma';
import TravelerResult from '@/components/TravelerResult';
import ShareButton from '@/components/ShareButton';
import { RiasecType, RIASEC_TYPES } from '@/lib/types';
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

  const url = `/result?type=${data.riasecType}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <TravelerResult
        title={data.title}
        description={data.description}
        imageUrl={data.imageUrl}
        destinations={destinations}
        tips={tips}
        trivia={trivia}
      />
      <div>
        <ShareButton url={url} title={`I'm ${data.title}! What's your travel personality?`} />
      </div>
      <a href="/quiz" className="inline-block text-blue-600 hover:underline">Retake Quiz</a>
    </div>
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

