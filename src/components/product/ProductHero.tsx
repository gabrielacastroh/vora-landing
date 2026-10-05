import { Fragment, type CSSProperties } from 'react';
import type { Product } from '../../data/products';
import { products } from '../../data/products';

/** Named View Transition layer; `.info` blocks are choreographed when paging between products. */
const info = (name: string) => ({ viewTransitionName: name, viewTransitionClass: 'info' }) as CSSProperties;

export default function ProductHero({ product }: { product: Product }) {
  const index = products.findIndex((p) => p.slug === product.slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  // Garment first, then the model wearing it. Products without a model shot have one image.
  const images = [
    { src: product.cardImage.src, packshot: true, position: undefined, label: 'prenda' },
    ...(product.packshot ? [] : [{ src: product.heroImage.src, packshot: false, position: product.heroPosition, label: 'en uso' }]),
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
              src={image.src}
              alt={`${product.name} — ${product.variant}, ${image.label}`}
              loading={i ? 'lazy' : undefined}
              className={`h-full w-full ${image.packshot ? 'object-contain p-[12%]' : 'object-cover'}`}
              style={{ objectPosition: image.position }}
            />
          </div>
        ))}

        {images.length > 1 && (
          <div className="absolute top-1/2 right-4 z-10 flex -translate-y-1/2 flex-col items-center gap-3 rounded-full bg-black/25 px-2 py-4 text-[0.6875rem] font-medium text-[#ece6dd] backdrop-blur-md sm:right-6 lg:right-8">
            {images.map((image, i) => (
              <Fragment key={image.src}>
                {i > 0 && (
                  <span className="relative h-12 w-px overflow-hidden bg-[#ece6dd]/25">
                    <span data-slide-fill className="absolute inset-0 origin-top bg-[#ece6dd]" style={{ transform: 'scaleY(0)' }} />
                  </span>
                )}
                <button
                  type="button"
                  data-slide-dot
                  aria-label={`Ver imagen ${i + 1}: ${image.label}`}
                  aria-current={i === 0 ? 'true' : undefined}
                  className="flex size-7 items-center justify-center tabular-nums opacity-40 transition-opacity hover:opacity-100 aria-current:opacity-100"
                >
                  {pad(i + 1)}
                </button>
              </Fragment>
            ))}
            <button
              type="button"
              data-slide-next
              aria-label="Siguiente imagen"
              className="mt-1 flex size-9 items-center justify-center rounded-full border border-[#ece6dd]/40 transition-colors hover:bg-[#ece6dd] hover:text-[#240407]"
            >
              <svg data-slide-arrow viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 2v12M3 9l5 5 5-5" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-8 px-6 py-16 sm:px-10 lg:w-1/2 lg:px-20 lg:pt-[11.5rem] lg:pb-20">
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
            <p data-reveal className="text-sm font-semibold uppercase text-vora-red">{product.variant}</p>
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

        <div data-reveal className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-3">
            <p className="text-[0.8125rem] text-vora-cream" style={info('product-count')}>
              {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </p>
            <div className="flex gap-1">
              <a
                href={`/producto/${prev.slug}`}
                data-dir="prev"
                aria-label="Producto anterior"
                className="flex size-6 items-center justify-center border border-vora-cream text-[0.625rem] text-vora-cream"
              >
                &lt;
              </a>
              <a
                href={`/producto/${next.slug}`}
                data-dir="next"
                aria-label="Producto siguiente"
                className="flex size-6 items-center justify-center border border-vora-cream/50 text-[0.625rem] text-vora-cream"
              >
                &gt;
              </a>
            </div>
          </div>
          <a href="/coleccion" className="text-xs font-bold text-vora-red underline">
            VER COLECCIÓN ↓
          </a>
        </div>
      </div>
    </section>
  );
}
