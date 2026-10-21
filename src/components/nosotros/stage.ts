import type { CSSProperties } from 'react';
import { u } from '../vora/mask';

/**
 * Sections below `xl` flow normally; from `xl` they become a 1440-wide Figma "stage" scaled as one piece.
 * The stage defines `--u` (its width / 1440, see mask.ts) and every piece carries its design-px placement
 * as custom properties that only the `xl:` utilities read, so one markup serves both layouts.
 */
export const stageVars = { '--u': 'calc(min(100cqw, 90rem) / 1440)' } as CSSProperties;

/** Utility classes that turn a piece with `at()` vars into an absolutely placed one at xl. */
export const place = 'xl:absolute xl:left-(--x) xl:top-(--y)';

type Box = { w?: number; h?: number; fs?: number; r?: number; tracking?: number };

/** Design-px position (and optional size / font size / rotation) → CSS vars. */
export function at(x: number, y: number, { w, h, fs, r, tracking }: Box = {}): CSSProperties {
  const vars: Record<string, string> = { '--x': u(x), '--y': u(y) };
  if (w !== undefined) vars['--w'] = u(w);
  if (h !== undefined) vars['--h'] = u(h);
  if (fs !== undefined) vars['--fs'] = u(fs);
  if (tracking !== undefined) vars['--tr'] = u(tracking);
  if (r !== undefined) vars['--r'] = `${r}deg`;
  return vars as CSSProperties;
}
