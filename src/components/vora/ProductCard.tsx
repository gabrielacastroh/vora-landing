import { motion } from 'motion/react';

interface Props {
  slug: string;
  name: string;
  variant: string;
  image: string;
  /** Image box ratio from the Figma card, e.g. "280 / 286". */
  ratio: string;
  theme: 'dark' | 'light';
  delay?: number;
  className?: string;
}

export default function ProductCard({ slug, name, variant, image, ratio, theme, delay = 0, className = '' }: Props) {
  const light = theme === 'light';
  return (
    <motion.a
      href={`/producto/${slug}`}
      className={`group flex w-full flex-col gap-3 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`relative w-full overflow-hidden ${light ? 'shadow-[0.25rem_0.75rem_1.125rem_0_rgba(0,0,0,0.11)]' : ''}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          alt={`${name} — ${variant}`}
          src={image}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4 whitespace-nowrap leading-normal">
        <div className="flex flex-col gap-0.5">
          <p className={`font-display text-[0.9375rem] font-bold ${light ? 'text-[#240407]' : 'text-[#ece6dd]'}`}>{name}</p>
          <p className="text-xs text-[#8d877d]">{variant}</p>
        </div>
        <p className="text-[0.6875rem] font-bold text-[#a32b32]">VER PRODUCTO →</p>
      </div>
    </motion.a>
  );
}
