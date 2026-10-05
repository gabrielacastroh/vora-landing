import FrameNav from '../vora/FrameNav';
import Crop from '../vora/Crop';
import ProductCard from '../vora/ProductCard';
import type { Detail, Look, Product } from '../../data/catalog';

import shopNavBg from '../../assets/vora/shop-nav-bg.png';
import voraLogoDark from '../../assets/vora/vora-logo-dark.png';
import shopHeroModel from '../../assets/vora/shop-hero-model.webp';
import shopHeroModelCutout from '../../assets/vora/shop-hero-model-cutout.webp';
import shopDiagonalVector from '../../assets/vora/shop-diagonal-vector.svg';

const shopContainer = 'mx-auto w-full max-w-360 px-6 sm:px-10 lg:px-[6.5rem]';

// Desktop grid is 1fr | 230px | 1fr: column starts land on the Figma x = 102 / 605 / 1108.
// Placement per grid slot (first row shares it with the intro copy), not per product.
const slotPlacement = ['xl:translate-x-[4.6875rem]', 'lg:justify-self-end', '', '', 'lg:justify-self-end'];


function Products({ products }: { products: Product[] }) {
  return (
    <section
      className={`${shopContainer} grid grid-cols-1 gap-x-8 gap-y-12 pt-28 pb-20 sm:grid-cols-2 lg:grid-cols-[1fr_14.375rem_1fr] lg:gap-x-0 lg:gap-y-24 lg:pt-[10.75rem] lg:pb-[8.8125rem]`}
    >
      <div className="flex max-w-[26.25rem] flex-col items-start gap-6 sm:col-span-2 lg:col-span-1">
        <p data-split="chars" data-delay="0.2" className="text-sm font-semibold text-[#5c141a]">
          01 / 01 — SS26 PRE-RELEASE
        </p>
        <h1 data-split="lines" data-delay="0.35" className="font-display text-[2.5rem] font-black leading-normal text-[#6d1212] sm:text-[3.25rem]">COLECCIÓN / 01</h1>
        <p data-reveal className="text-[0.9375rem] leading-[1.6] text-[#525256] opacity-80">
          Una colección diseñada en torno a la geometría y el movimiento, adaptándose a siluetas contemporáneas con
          materiales premium. Hilos de algodón peinado y cortes oversize estructurados.
        </p>
      </div>

      {products.map((product, i) => (
        <ProductCard
          key={product.slug}
          slug={product.slug}
          name={product.name}
          variant={product.variant}
          image={product.cardImage.src}
          ratio="230 / 240"
          theme="light"
          className={`lg:w-[14.375rem] ${slotPlacement[i % slotPlacement.length]}`}
        />
      ))}
    </section>
  );
}

function Statement() {
  return (
    <section data-statement className="relative flex min-h-[36rem] flex-col justify-end overflow-hidden lg:h-[38.5625rem] lg:min-h-0 lg:justify-start">
      <img data-statement-photo alt="" src={shopHeroModel.src} loading="lazy" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[80%_center] lg:object-center" />
      <img
        data-statement-photo
        alt="Modelo con camiseta VORA"
        src={shopHeroModelCutout.src}
        loading="lazy"
        className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[80%_center] lg:object-center"
      />
      <img
        data-statement-diagonal
        alt=""
        src={shopDiagonalVector.src}
        className="pointer-events-none absolute top-[1.7828%] left-[-2.1875%] h-[98.136%] w-[160%] max-w-none sm:w-[120%] lg:w-[87.708%]"
      />

      {/* Mobile crop puts the copy over the photo's bright side; keep it legible. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#260202]/90 via-[#260202]/50 to-transparent lg:hidden" />

      <div className={`${shopContainer} relative py-20 text-[#ece6dd] lg:pt-[14rem] lg:pb-0`}>
        <div className="flex max-w-[26.25rem] flex-col items-start gap-6">
          <p data-reveal className="text-sm font-semibold">COLECCIÓN / 01</p>
          <h2 data-split="lines" className="font-display text-[2.5rem] font-black leading-normal sm:text-[3.25rem]">
            HECHA PARA <br />
            SEGUIR <br />
            AVANZANDO
          </h2>
          <p data-reveal className="text-[0.9375rem] leading-[1.6] opacity-80">
            Una colección construida alrededor del movimiento, la dirección y la idea de no permanecer en el mismo lugar.
          </p>
        </div>
        <div data-line className="mt-1 h-px w-[6.375rem] bg-[#ece6dd]/50" />
      </div>
    </section>
  );
}

function Details({ details }: { details: Detail[] }) {
  return (
    <section className={`${shopContainer} pt-20 lg:pt-[7.375rem]`}>
      <h2 data-split="lines" className="font-display text-[1.75rem] font-extrabold leading-normal text-[#6d1212] sm:text-[2rem]">
        DETALLES <br />
        DE LA COLECCIÓN
      </h2>
      <div className="mt-5 grid max-w-[76.3125rem] grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[1.3125rem]">
        {details.map((detail) => (
          <div key={detail.id}>
            <Crop src={detail.image.src} w={393} h={234} img={detail.frame} className="relative w-full" />
            <div data-reveal className="mt-4 flex flex-col gap-0.5 leading-normal text-[#332727] md:mt-[2.3125rem]">
              <p className="font-display text-[0.9375rem] font-bold">{detail.title}</p>
              <p className="text-xs">
                {detail.lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Lookbook({ looks }: { looks: Look[] }) {
  return (
    <section className={`${shopContainer} pt-24 pb-20 lg:pt-[9.375rem] lg:pb-[6.125rem]`}>
      {/* Non-breaking spaces: SplitText collapses runs of regular spaces, losing the Figma gaps. */}
      <h2 data-split="lines" className="font-display text-[1.75rem] font-extrabold leading-normal text-[#5c141a] sm:text-[2rem]">
        {'LOOKBOOK\u00a0\u00a0\u00a0/\u00a0\u00a0\u00a001'}
      </h2>
      <div className="mt-[1.6875rem] grid max-w-[76.9375rem] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-[1.625rem]">
        {looks.map((look) => (
          // Each portrait opens the product it shows.
          <a key={look.slug} href={`/producto/${look.slug}`} aria-label={`${look.name} — ${look.tag}`} className="group block">
            <Crop src={look.image.src} w={393} h={378} img={look.frame} className="relative w-full">
              <div className="absolute inset-0 shadow-[inset_-0.0625rem_-3.125rem_2.5875rem_0_rgba(0,0,0,0.36)]" />
              <div className="absolute bottom-[0.8125rem] left-4 flex flex-col gap-0.5 leading-normal text-white">
                <p className="font-display text-[0.9375rem] font-bold">{look.name}</p>
                <p className="text-xs">{look.tag}</p>
              </div>
            </Crop>
          </a>
        ))}
      </div>
    </section>
  );
}

interface Props {
  products: Product[];
  looks: Look[];
  details: Detail[];
}

export default function ShopFrame({ products, looks, details }: Props) {
  return (
    <div className="relative overflow-x-clip bg-[#ece6dd]">
      <FrameNav active="coleccion" background={shopNavBg.src} theme="light" logo={voraLogoDark.src} />
      <main>
        <Products products={products} />
        <Statement />
        <Details details={details} />
        <Lookbook looks={looks} />
      </main>
    </div>
  );
}
