import type { CSSProperties, ReactNode } from 'react';

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

interface Props {
  src: string;
  alt?: string;
  /** Visible window size in design px (the Figma mask rectangle). */
  w: number;
  h: number;
  /** Image rect relative to that window, in design px: [x, y, width, height]. Omit to fill (cover). */
  img?: readonly [number, number, number, number];
  className?: string;
  /** false skips the data-clip wipe, for crops that run their own scroll animation. */
  reveal?: boolean;
  /** Scroll parallax factor, see data-speed in scripts/motion.ts. */
  speed?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Figma rectangle mask as a plain overflow crop. Every offset is a percentage of
 * the window, so the framing is identical at any rendered size.
 */
export default function Crop({ src, alt = '', w, h, img = [0, 0, w, h], className = 'relative', reveal = true, speed, style, children }: Props) {
  const [x, y, iw, ih] = img;
  return (
    <div data-clip={reveal || undefined} data-speed={speed} className={`overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute max-w-none object-cover"
        style={{ left: pct(x, w), top: pct(y, h), width: pct(iw, w), height: pct(ih, h) }}
      />
      {children}
    </div>
  );
}
