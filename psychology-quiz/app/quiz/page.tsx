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

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
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
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
    })();
  }, []);

  const total = questions?.length ?? 10;
  const currentQuestion = useMemo(() => {
    if (!questions) return null;
    return questions[current] ?? null;
  }, [questions, current]);

  const selectAnswer = (type: RiasecType) => {
    const updated = [...answers];
    updated[current] = type;
    setAnswers(updated);
    if (current === total - 1) {
      const result = calculateResult(updated);
      router.push(`/result?type=${result}`);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const goBack = () => setCurrent((c) => Math.max(0, c - 1));

  if (!currentQuestion) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="animate-pulse text-gray-500">Loading questions…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative sm:flex sm:items-center sm:justify-center sm:bg-gray-100">
      {/* Fixed header overlay */}
      <header className="fixed top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <ProgressBar current={current + 1} total={total} />
        </div>
        <div className="pointer-events-auto">
          <BackButton onClick={goBack} disabled={current === 0} />
        </div>
      </header>

      {/* Main content area */}
      <main className="h-screen w-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-2xl sm:overflow-hidden">
        <QuestionCard
          questionIndex={current}
          questionText={currentQuestion.text}
          backgroundImage={currentQuestion.backgroundImage}
          answers={currentQuestion.answers.map((a) => ({ 
            id: a.id, 
            text: a.text, 
            riasecType: a.riasecType,
            imageUrl: a.imageUrl 
          }))}
          selected={answers[current]}
          onSelect={selectAnswer}
        />
      </main>
    </div>
  );
}

