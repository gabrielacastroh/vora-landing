interface Props {
  slug: string;
  name: string;
  variant: string;
  image: string;
  /** Image box ratio from the Figma card, e.g. "280 / 286". */
  ratio: string;
  theme: 'dark' | 'light';
  /** 'lg': the bigger /coleccion card. */
  size?: 'md' | 'lg';
  className?: string;
}

export default function ProductCard({ slug, name, variant, image, ratio, theme, size = 'md', className = '' }: Props) {
  const light = theme === 'light';
  const lg = size === 'lg';
  return (
    // The whole card reveals as one unit (image, shadow and text in sync); siblings stagger.
    <a data-reveal href={`/producto/${slug}`} className={`group flex w-full flex-col ${lg ? 'gap-[0.8917rem]' : 'gap-3'} ${className}`}>
      <div
        // The big collection cards stay square; velocity skew is a home-page accent.
        data-skew={lg ? undefined : true}
        // Named only on click (scripts/motion.ts) so the card morphs into the product page
        // without also morphing between home and collection, which share slugs.
        data-vt={`product-${slug}`}
        // lg: lift + cursor spotlight on hover (scripts/motion.ts).
        data-spot={lg || undefined}
        className={`relative w-full overflow-hidden ${
          light
            ? lg
              ? 'transition-[translate] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:-translate-y-2'
              : 'shadow-[0.25rem_0.75rem_1.125rem_0_rgba(0,0,0,0.11)]'
            : ''
        }`}
        style={{ aspectRatio: ratio }}
      >
        <img
          alt={`${name} — ${variant}`}
          src={image}
          loading="lazy"
          decoding="async"
          className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-[scale] group-hover:scale-105 ${lg ? 'duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]' : 'duration-500'}`}
        />
        {lg && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.7), transparent 45%)' }}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4 whitespace-nowrap leading-normal">
        <div className="flex flex-col gap-0.5">
          <p className={`font-display font-bold ${lg ? 'text-[1.1146rem]' : 'text-[0.9375rem]'} ${light ? 'text-[#240407]' : 'text-[#ece6dd]'}`}>
            {lg ? (
              // Name rolls up and comes back in red from below.
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:-translate-y-full">{name}</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full text-vora-red transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:translate-y-0 motion-reduce:hidden"
                >
                  {name}
                </span>
              </span>
            ) : (
              name
            )}
          </p>
          {/* Muted grey on cream fails contrast; the light theme uses a darker step. */}
          <p className={`${lg ? 'text-[0.8917rem]' : 'text-xs'} ${light ? 'text-[#6b655c]' : 'text-[#8d877d]'}`}>{variant}</p>
        </div>
        {lg ? (
          <p className={`relative flex items-center gap-1 pb-0.5 text-[0.8174rem] font-bold ${light ? 'text-vora-red' : 'text-vora-red-bright'}`}>
            VER PRODUCTO
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
            />
          </p>
        ) : (
          <p className={`text-[0.6875rem] font-bold ${light ? 'text-vora-red' : 'text-vora-red-bright'}`}>VER PRODUCTO →</p>
        )}
      </div>
    </a>
  );
}
