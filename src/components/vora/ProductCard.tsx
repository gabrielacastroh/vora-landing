interface Props {
  slug: string;
  name: string;
  variant: string;
  image: string;
  /** Image box ratio from the Figma card, e.g. "280 / 286". */
  ratio: string;
  theme: 'dark' | 'light';
  className?: string;
}

export default function ProductCard({ slug, name, variant, image, ratio, theme, className = '' }: Props) {
  const light = theme === 'light';
  return (
    // The whole card reveals as one unit (image, shadow and text in sync); siblings stagger.
    <a data-reveal href={`/producto/${slug}`} className={`group flex w-full flex-col gap-3 ${className}`}>
      <div
        data-skew
        // Named only on click (scripts/motion.ts) so the card morphs into the product page
        // without also morphing between home and collection, which share slugs.
        data-vt={`product-${slug}`}
        className={`relative w-full overflow-hidden ${light ? 'shadow-[0.25rem_0.75rem_1.125rem_0_rgba(0,0,0,0.11)]' : ''}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          alt={`${name} — ${variant}`}
          src={image}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-[scale] duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4 whitespace-nowrap leading-normal">
        <div className="flex flex-col gap-0.5">
          <p className={`font-display text-[0.9375rem] font-bold ${light ? 'text-[#240407]' : 'text-[#ece6dd]'}`}>{name}</p>
          {/* Muted grey on cream fails contrast; the light theme uses a darker step. */}
          <p className={`text-xs ${light ? 'text-[#6b655c]' : 'text-[#8d877d]'}`}>{variant}</p>
        </div>
        <p className={`text-[0.6875rem] font-bold ${light ? 'text-vora-red' : 'text-vora-red-bright'}`}>VER PRODUCTO →</p>
      </div>
    </a>
  );
}
