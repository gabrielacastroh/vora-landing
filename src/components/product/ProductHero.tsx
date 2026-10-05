import type { CSSProperties } from 'react';
import type { Product } from '../../data/catalog';

/** Named View Transition layer; `.info` blocks are choreographed when paging between products. */
const info = (name: string) => ({ viewTransitionName: name, viewTransitionClass: 'info' }) as CSSProperties;

interface Props {
  product: Product;
  prev: Product;
  next: Product;
  /** 1-based position in the catalog and catalog size, for the "02 / 05" counter. */
  position: number;
  total: number;
}

export default function ProductHero({ product, prev, next, position, total }: Props) {
  // Garment first, then the photos: the gallery when there is one, else the single model shot.
  const photos = product.gallery ?? (product.heroImage ? [{ image: product.heroImage, position: product.heroPosition }] : []);
  const images = [
    { src: product.cardImage.src, packshot: true, position: undefined as string | undefined, label: 'prenda' },
    ...photos.map((p, i) => ({ src: p.image.src, packshot: false, position: p.position, label: `foto ${i + 1}` })),
  ];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="flex min-h-svh flex-col bg-vora-bg lg:flex-row">
      <div
        data-slider
        tabIndex={images.length > 1 ? 0 : undefined}
        aria-roledescription="carrusel"
        aria-label={`Imágenes de ${product.name}`}
        className="relative h-[30rem] w-full overflow-hidden bg-[#240407] outline-none lg:h-auto lg:w-1/2"
        // Shares its name with the collection card: the card morphs into the first slide.
        style={{ viewTransitionName: `product-${product.slug}`, viewTransitionClass: 'product' } as CSSProperties}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            data-slide
            aria-hidden={i > 0}
            // Opaque: the packshot PNG is transparent, and mid-transition the other slide sits under it.
            className="absolute inset-0 overflow-hidden bg-[#240407]"
            style={i > 0 ? { clipPath: 'inset(100% 0% 0% 0%)' } : { zIndex: 1 }}
          >
            <img
              data-tilt={image.packshot || undefined}
              src={image.src}
              alt={`${product.name} — ${product.variant}, ${image.label}`}
              loading={i ? 'lazy' : undefined}
              className={`h-full w-full ${image.packshot ? 'object-contain p-[12%]' : 'object-cover'}`}
              style={{
                objectPosition: image.position,
                // Shadow drifts opposite the tilt (--tilt-x set by motion.ts) to sell the depth.
                filter: image.packshot ? 'drop-shadow(calc(var(--tilt-x, 0) * 1px) 2.5rem 2rem rgb(0 0 0 / 0.45))' : undefined,
              }}
            />
          </div>
        ))}

        {images.length > 1 && (
          // Fixed-size control (arrows, counter, progress) so it reads the same with 2 photos or 30.
          <div className="absolute top-1/2 right-4 z-10 flex -translate-y-1/2 flex-col items-center gap-3 rounded-full bg-black/25 px-2 py-3 text-[#ece6dd] backdrop-blur-md sm:right-6 lg:right-8">
            <button
              type="button"
              data-slide-prev
              aria-label="Imagen anterior"
              className="flex size-9 items-center justify-center rounded-full border border-[#ece6dd]/40 transition-colors hover:bg-[#ece6dd] hover:text-[#240407]"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 14V2M3 7l5-5 5 5" />
              </svg>
            </button>
            <p aria-live="polite" className="flex flex-col items-center text-[0.6875rem] font-medium leading-tight tabular-nums">
              <span className="sr-only">Imagen </span>
              <span data-slide-count>{pad(1)}</span>
              <span className="text-[#ece6dd]/40">
                <span className="sr-only"> de </span>
                {pad(images.length)}
              </span>
            </p>
            <span className="relative h-16 w-px overflow-hidden bg-[#ece6dd]/25" aria-hidden="true">
              <span data-slide-fill className="absolute inset-0 origin-top bg-[#ece6dd]" style={{ transform: `scaleY(${1 / images.length})` }} />
            </span>
            <button
              type="button"
              data-slide-next
              aria-label="Siguiente imagen"
              className="flex size-9 items-center justify-center rounded-full border border-[#ece6dd]/40 transition-colors hover:bg-[#ece6dd] hover:text-[#240407]"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 2v12M3 9l5 5 5-5" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-8 px-6 pt-16 sm:px-10 lg:w-1/2 lg:px-20 lg:pt-[11.5rem]">
        <div className="flex flex-col items-start gap-3 pt-10">
          <h1
            data-split="chars"
            data-delay="0.35"
            className="font-display text-[2.5rem] font-extrabold text-vora-cream"
            style={info('product-title')}
          >
            {product.name}
          </h1>
          <div className="flex flex-col items-start gap-3" style={info('product-copy')}>
            <p data-reveal className="text-sm font-semibold uppercase text-vora-red-bright">{product.variant}</p>
            <p data-reveal className="text-sm leading-relaxed text-vora-muted">{product.description}</p>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-start gap-3 text-[0.8125rem]" style={info('product-details')}>
          <p className="font-display font-bold text-vora-cream">Detalles</p>
          <div className="flex w-full flex-col gap-2 border-t border-[#525256] pt-3">
            {product.details.map((d) => (
              <div key={d.label} className="flex items-start justify-between">
                <span className="text-vora-muted">{d.label}</span>
                <span className="text-vora-cream">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="flex flex-col items-start gap-3" style={info('product-sizes')}>
          <p className="font-display text-[0.8125rem] font-bold text-vora-cream">Tallas</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="flex size-10 items-center justify-center border border-vora-cream text-[0.8125rem] text-vora-cream transition-colors hover:bg-vora-cream hover:text-vora-bg"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky bottom bar: when the copy fits it rests at the column's end (= viewport bottom), when it
            doesn't it sticks to the viewport bottom. Either way the arrows land on the same spot for every
            product, so the cursor never has to chase them. */}
        <div
          data-reveal
          className="sticky bottom-0 z-10 -mx-6 mt-auto flex items-center justify-between border-t border-[#525256] bg-vora-bg px-6 py-5 sm:-mx-10 sm:px-10 lg:-mx-20 lg:px-20 lg:py-6"
        >
          <div className="flex items-center gap-5">
            <p className="font-display text-[0.8125rem] tabular-nums text-vora-cream" style={info('product-count')}>
              {pad(position)} <span className="text-vora-muted">/ {pad(total)}</span>
            </p>
            <div className="flex gap-2">
              {[
                { dir: 'prev', target: prev, label: 'anterior', path: 'M10 3 5 8l5 5' },
                { dir: 'next', target: next, label: 'siguiente', path: 'm6 3 5 5-5 5' },
              ].map(({ dir, target, label, path }) => (
                <a
                  key={dir}
                  href={`/producto/${target.slug}`}
                  data-dir={dir}
                  aria-label={`Producto ${label}: ${target.name}`}
                  className="flex size-11 items-center justify-center rounded-full border border-vora-cream/40 text-vora-cream transition-colors hover:border-vora-cream hover:bg-vora-cream hover:text-vora-bg"
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <a href="/coleccion" className="group flex items-center gap-2 text-xs font-bold uppercase text-vora-red-bright">
            Ver colección
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
