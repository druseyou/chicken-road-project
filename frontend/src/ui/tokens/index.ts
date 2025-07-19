export * from './colors';
export * from './typography';
export * from './spacing';

// Re-export everything as a single tokens object for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const; 