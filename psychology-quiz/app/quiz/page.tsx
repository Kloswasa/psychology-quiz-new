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
};

type Question = {
  id: string;
  text: string;
  order: number;
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
    <div className="mx-auto max-w-3xl px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <ProgressBar current={current + 1} total={total} />
        <BackButton onClick={goBack} disabled={current === 0} />
      </div>
      <QuestionCard
        questionIndex={current}
        questionText={currentQuestion.text}
        answers={currentQuestion.answers.map((a) => ({ id: a.id, text: a.text, riasecType: a.riasecType }))}
        selected={answers[current]}
        onSelect={selectAnswer}
      />
    </div>
  );
}

