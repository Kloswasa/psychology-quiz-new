/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import QuestionCard from '@/components/QuestionCard';
import { RiasecType } from '@/lib/types';
import { calculateResult } from '@/lib/calculateResult';
import { useRouter } from 'next/navigation';

type Answer = {
  id: string;
  text: string;
  riasecType: RiasecType;
  imageUrl?: string;
};

type Question = {
  id: string;
  text: string;
  order: number;
  backgroundImage: string;
  answers: Answer[];
};

/** Preload image URLs so they are cached before the quiz renders. Resolves when all load or timeout. */
function preloadImages(urls: string[], timeoutMs = 15000): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (unique.length === 0) return Promise.resolve();
  const loadOne = (url: string) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      const t = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        resolve(); // don't block quiz on slow/failed images
      }, timeoutMs);
      img.onload = () => {
        clearTimeout(t);
        resolve();
      };
      img.onerror = () => {
        clearTimeout(t);
        resolve(); // still resolve so quiz can show
      };
      img.src = url;
    });
  return Promise.all(unique.map(loadOne)).then(() => {});
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(RiasecType | null)[]>(new Array(10).fill(null));
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
      const res = await fetch('/api/questions');
        if (!res.ok) {
          console.error('API error:', res.status, await res.text());
          return;
        }
      const data = (await res.json()) as Question[];
        if (!Array.isArray(data)) {
          console.error('Invalid response:', data);
          return;
        }
      setQuestions(data);
      // initialize answers length based on fetched questions
      setAnswers(new Array(data.length).fill(null));
      setImagesReady(false);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
    })();
  }, []);

  // Once we have questions, preload all images (background + answer images) so the quiz runs seamlessly
  useEffect(() => {
    if (!questions?.length) return;
    const urls = questions.flatMap((q) => [
      q.backgroundImage,
      ...(q.answers?.map((a) => a.imageUrl).filter(Boolean) ?? []),
    ]) as string[];
    let cancelled = false;
    preloadImages(urls).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [questions]);

  const total = questions?.length ?? 10;
  const currentQuestion = useMemo(() => {
    if (!questions) return null;
    return questions[current] ?? null;
  }, [questions, current]);

  // After final answer: show loading screen, prefetch result, then navigate
  const [resultLoading, setResultLoading] = useState<RiasecType | null>(null);

  useEffect(() => {
    if (!resultLoading) return;
    const result = resultLoading;
    const url = `/result?type=${result}`;
    router.prefetch(url);
    const t = setTimeout(() => {
      router.push(url);
    }, 1200);
    return () => clearTimeout(t);
  }, [resultLoading, router]);

  const selectAnswer = (type: RiasecType) => {
    const updated = [...answers];
    updated[current] = type;
    setAnswers(updated);
    if (current === total - 1) {
      const result = calculateResult(updated);
      setResultLoading(result);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const goBack = () => setCurrent((c) => Math.max(0, c - 1));

  const showQuiz = currentQuestion && imagesReady;
  if (!showQuiz) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-6">
        <div className="animate-pulse text-gray-500">
          {!currentQuestion ? 'Loading questions…' : 'Preparing quiz…'}
        </div>
      </div>
    );
  }

  // After user chose final answer: show loading page before navigating to result
  if (resultLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
        <p className="text-white/90 text-lg font-medium">Calculating your result…</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <ProgressBar current={current + 1} total={total} />
        </div>
        <div className="pointer-events-auto">
          <BackButton onClick={goBack} disabled={current === 0} />
        </div>
      </header>

      {/* Main - full width so quiz fills screen, no side margins */}
      <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 flex flex-col">
        <QuestionCard
          questionIndex={current}
          questionText={currentQuestion.text}
          backgroundImage={currentQuestion.backgroundImage}
          answers={currentQuestion.answers.map((a) => ({
            id: a.id,
            text: a.text,
            riasecType: a.riasecType,
            imageUrl: a.imageUrl,
          }))}
          selected={answers[current]}
          onSelect={selectAnswer}
        />
        </div>
      </main>
    </div>
  );
}

