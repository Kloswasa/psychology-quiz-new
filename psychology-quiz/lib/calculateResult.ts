import { RiasecType } from '@/lib/types';

export function calculateResult(answers: (RiasecType | null)[]): RiasecType {
  const scores: Record<RiasecType, number> = {
    REALISTIC: 0,
    INVESTIGATIVE: 0,
    ARTISTIC: 0,
    SOCIAL: 0,
    ENTERPRISING: 0,
    CONVENTIONAL: 0,
  };
  for (const a of answers) {
    if (a) scores[a]++;
  }
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as RiasecType);
}

