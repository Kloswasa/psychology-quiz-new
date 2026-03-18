/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import BackButton from '@/components/BackButton';
import QuestionCard from '@/components/QuestionCard';
import { SoundToggleButton } from '@/components/SoundToggleButton';
import { useSound } from '@/components/SoundContext';
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
  const [isAdvancing, setIsAdvancing] = useState(false);
  const router = useRouter();
  const { enabled: soundEnabled } = useSound();

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
    if (!questions || isAdvancing) return;

    const updated = [...answers];
    updated[current] = type;
    setAnswers(updated);

    const hasGifAnswer =
      questions[current]?.answers?.some((a) => a.imageUrl && a.imageUrl.endsWith('.gif')) ?? false;

    const advance = () => {
      if (current === total - 1) {
        const result = calculateResult(updated);
        setResultLoading(result);
      } else {
        setCurrent((c) => c + 1);
      }
    };

    if (hasGifAnswer) {
      setIsAdvancing(true);
      setTimeout(() => {
        advance();
        setIsAdvancing(false);
      }, 1800);
    } else {
      advance();
    }
  };

  const goBack = () => setCurrent((c) => Math.max(0, c - 1));

  const textColors = [
    '#212a37', // Q1: Oxford Blue
    '#ffffff', // Q2: White
    '#212a37', // Q3: Oxford Blue
    '#212a37', // Q4: Oxford Blue
    '#ffffff', // Q5: White
    '#212a37', // Q6: Oxford Blue
    '#ffffff', // Q7: White
    '#ffffff', // Q8: White
    '#ffffff', // Q9: White
    '#212a37', // Q10: Oxford Blue
  ];

  const currentTextColor = textColors[current] ?? '#ffffff';

  const showQuiz = currentQuestion && imagesReady;

  // Play per-question sound when a question becomes active
  useEffect(() => {
    if (!showQuiz || !soundEnabled) return;

    const questionNumber = current + 1;
    const audio = new Audio(`/sounds/question-${questionNumber}.mp3`);
    audio.volume = 0.8;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // Ignore autoplay errors; sound is non-critical
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [showQuiz, current, soundEnabled]);

  if (!showQuiz) {
    return (
      <div className="min-h-screen w-full bg-neutral-200 flex items-center justify-center">
        <div className="mx-auto max-w-[430px] w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-[#0088ff]">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
          <p className="text-white/90 text-lg font-medium">
            {!currentQuestion ? 'Loading questions…' : 'Preparing your quiz…'}
          </p>
        </div>
      </div>
    );
  }

  // After user chose final answer: show loading page before navigating to result
  if (resultLoading) {
    return (
      <div className="min-h-screen w-full bg-neutral-200 flex items-center justify-center">
        <div className="mx-auto max-w-[430px] w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-[#0088ff]">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
          <p className="text-white/90 text-lg font-medium">Calculating your result…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-200 flex justify-center">
      <div className="h-screen max-w-[430px] w-full overflow-hidden relative flex flex-col">
        {/* Main - card fills full height; header overlays on top of image area */}
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
          <div className="flex-1 min-h-0 flex flex-col">
            <QuestionCard
              key={currentQuestion.id}
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
          {/* Progress bar + Back overlaid on top of image area */}
          <header className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between gap-4 bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
            <div className="pointer-events-auto flex-1 flex items-center gap-3">
              <SoundToggleButton className="shrink-0" />
              <ProgressBar current={current + 1} total={total} />
            </div>
            <div className="pointer-events-auto">
              <BackButton onClick={goBack} disabled={current === 0} color={currentTextColor} />
            </div>
          </header>
        </main>
      </div>
    </div>
  );
}

