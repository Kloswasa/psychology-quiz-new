'use client';

import { RiasecType } from '@/lib/types';

type AnswerOption = {
  id: string;
  text: string;
  riasecType: RiasecType;
};

type Props = {
  questionIndex: number;
  questionText: string;
  answers: AnswerOption[];
  selected: RiasecType | null;
  onSelect: (type: RiasecType) => void;
};

export default function QuestionCard({
  questionIndex,
  questionText,
  answers,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Q{questionIndex + 1}. {questionText}</h2>
      <div className="grid gap-3">
        {answers.map((a) => {
          const isActive = selected === a.riasecType;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.riasecType)}
              className={`text-left rounded-lg border px-4 py-3 transition-colors ${
                isActive ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {a.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

