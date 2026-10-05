import type { CSSProperties } from 'react';

export function mask(src: string, position: string, size: string): CSSProperties {
  return {
    maskImage: `url(${src})`,
    maskMode: 'alpha',
    maskRepeat: 'no-repeat',
    maskPosition: position,
    maskSize: size,
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: position,
    WebkitMaskSize: size,
  };
}

/** Design pixels → length in a box that defines `--u` (its width / 1440). */
export const u = (px: number) => `calc(${px} * var(--u))`;

/** Shared horizontal rhythm: full-bleed backgrounds, content capped at the 1440 design width. */
export const container = 'mx-auto w-full max-w-360 px-6 sm:px-10 lg:px-15';

export const reveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};
