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

export const archivo = { fontFamily: 'Archivo, sans-serif' } as const;
export const geist = { fontFamily: 'Geist, sans-serif' } as const;

// No negative viewport margin: the frame is scaled down on narrow screens, so a
// margin in screen px shrinks the trigger area enough to leave on-screen elements
// stuck at opacity 0.
export const reveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};
