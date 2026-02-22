export type RiasecType = 
  | 'REALISTIC'
  | 'INVESTIGATIVE'
  | 'ARTISTIC'
  | 'SOCIAL'
  | 'ENTERPRISING'
  | 'CONVENTIONAL';

export const RIASEC_TYPES: RiasecType[] = [
  'REALISTIC',
  'INVESTIGATIVE',
  'ARTISTIC',
  'SOCIAL',
  'ENTERPRISING',
  'CONVENTIONAL',
];

/** Background (and theme) color per personality type for the result page */
export const PERSONALITY_THEME_COLORS: Record<RiasecType, string> = {
  REALISTIC: '#0CB6FF',
  INVESTIGATIVE: '#0055FF',
  ARTISTIC: '#8800FF',
  SOCIAL: '#52DFC8',
  ENTERPRISING: '#FFA600',
  CONVENTIONAL: '#A0D951',
};
