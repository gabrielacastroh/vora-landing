import { motion } from 'motion/react';
import type { Product } from '../../data/products';
import { products } from '../../data/products';

export default function ProductHero({ product }: { product: Product }) {
  const index = products.findIndex((p) => p.slug === product.slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  return (
    <section className="flex min-h-svh flex-col bg-vora-bg lg:flex-row">
      <div className="relative h-[26.25rem] w-full bg-[#240407] lg:h-auto lg:w-1/2">
        <motion.img
          key={product.slug}
          src={product.heroImage.src}
          alt={`${product.name} — ${product.variant}`}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.div
        key={`${product.slug}-content`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full flex-col justify-center gap-8 px-6 py-16 sm:px-10 lg:w-1/2 lg:px-20 lg:py-0"
      >
        <div className="flex flex-col items-start gap-3 pt-10">
          <h1 className="font-display text-[2.5rem] font-extrabold text-vora-cream">{product.name}</h1>
          <p className="text-sm font-semibold uppercase text-vora-red">{product.variant}</p>
          <p className="text-sm leading-relaxed text-vora-muted">{product.description}</p>
        </div>

        <div className="flex flex-col items-start gap-3 text-[0.8125rem]">
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

        <div className="flex flex-col items-start gap-3">
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

        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-3">
            <p className="text-[0.8125rem] text-vora-cream">
              {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </p>
            <div className="flex gap-1">
              <a
                href={`/producto/${prev.slug}`}
                aria-label="Producto anterior"
                className="flex size-6 items-center justify-center border border-vora-cream text-[0.625rem] text-vora-cream"
              >
                &lt;
              </a>
              <a
                href={`/producto/${next.slug}`}
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
      </motion.div>
    </section>
  );
}
