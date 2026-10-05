import FrameNav from '../vora/FrameNav';
import Crop from '../vora/Crop';
import ProductCard from '../vora/ProductCard';

import shopNavBg from '../../assets/vora/shop-nav-bg.png';
import voraLogoDark from '../../assets/vora/vora-logo-dark.png';
import shopCardVora01 from '../../assets/vora/shop-card-vora01.webp';
import shopCardVora02 from '../../assets/vora/shop-card-vora02.webp';
import shopCardVora03 from '../../assets/vora/shop-card-vora03.webp';
import shopCardVora04 from '../../assets/vora/shop-card-vora04.webp';
import shopCardVora05 from '../../assets/vora/shop-card-vora05.webp';
import shopHeroModel from '../../assets/vora/shop-hero-model.webp';
import shopHeroModelCutout from '../../assets/vora/shop-hero-model-cutout.webp';
import shopDiagonalVector from '../../assets/vora/shop-diagonal-vector.svg';
import shopDetailPrint from '../../assets/vora/shop-detail-print.webp';
import shopDetailFabric from '../../assets/vora/shop-detail-fabric.webp';
import shopDetailLabel from '../../assets/vora/shop-detail-label.webp';
import shopPortrait1 from '../../assets/vora/shop-mask-portrait-1.webp';
import shopPortrait2 from '../../assets/vora/shop-mask-portrait-2.webp';
import shopPortrait3 from '../../assets/vora/shop-mask-portrait-3.webp';

const shopContainer = 'mx-auto w-full max-w-360 px-6 sm:px-10 lg:px-[6.5rem]';

// Desktop grid is 1fr | 230px | 1fr: column starts land on the Figma x = 102 / 605 / 1108.
const products = [
  { name: 'VORA 01', variant: 'Camiseta / Azul', image: shopCardVora01.src, slug: 'vora-01', place: 'xl:translate-x-[4.6875rem]' },
  { name: 'VORA 02', variant: 'Camiseta / Beige', image: shopCardVora02.src, slug: 'vora-02', place: 'lg:justify-self-end' },
  { name: 'VORA 03', variant: 'Camiseta / Verde', image: shopCardVora03.src, slug: 'vora-03', place: '' },
  { name: 'VORA 04', variant: 'Camiseta / Blanco', image: shopCardVora04.src, slug: 'vora-04', place: '' },
  { name: 'VORA 05', variant: 'Camiseta / Azul Claro', image: shopCardVora05.src, slug: 'vora-05', place: 'lg:justify-self-end' },
];

const details = [
  { title: '01 / MATERIAL', lines: ['Algodón de alta calidad,', 'transpirable y resistente.'], src: shopDetailPrint.src, img: [-12, -157, 414, 518] },
  { title: '02 / CONSTRUCCIÓN', lines: ['Costuras reforzadas', 'y acabados premium.'], src: shopDetailFabric.src, img: [-6, -47, 399, 399] },
  { title: '03 / IDENTIDAD', lines: ['Un símbolo que representa', 'movimiento y dirección.'], src: shopDetailLabel.src, img: [-41.35, -94.28, 433.95, 542.24] },
] as const;

const lookbook = [
  { name: 'VORA 01', tag: 'Movimiento / Ciudad', src: shopPortrait1.src, img: [0, -24, 399, 498] },
  { name: 'VORA 02', tag: 'Dirección / Libertad', src: shopPortrait3.src, img: [-14, -62, 420.95, 526] },
  { name: 'VORA 03', tag: 'Exploración / Futuro', src: shopPortrait2.src, img: [-3, -15, 411, 514] },
] as const;

function Products() {
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

      {products.map((product) => (
        <ProductCard
          key={product.slug}
          {...product}
          ratio="230 / 240"
          theme="light"
          className={`lg:w-[14.375rem] ${product.place}`}
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

function Details() {
  return (
    <section className={`${shopContainer} pt-20 lg:pt-[7.375rem]`}>
      <h2 data-split="lines" className="font-display text-[1.75rem] font-extrabold leading-normal text-[#6d1212] sm:text-[2rem]">
        DETALLES <br />
        DE LA COLECCIÓN
      </h2>
      <div className="mt-5 grid max-w-[76.3125rem] grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-[1.3125rem]">
        {details.map((detail) => (
          <div key={detail.title}>
            <Crop src={detail.src} w={393} h={234} img={[...detail.img]} className="relative w-full" />
            <div data-reveal className="mt-4 flex flex-col gap-0.5 leading-normal text-[#332727] md:mt-[2.3125rem]">
              <p className="font-display text-[0.9375rem] font-bold">{detail.title}</p>
              <p className="text-xs">
                {detail.lines[0]}
                <br />
                {detail.lines[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section className={`${shopContainer} pt-24 pb-20 lg:pt-[9.375rem] lg:pb-[6.125rem]`}>
      <h2 data-split="lines" className="font-display whitespace-pre text-[1.75rem] font-extrabold leading-normal text-[#5c141a] sm:text-[2rem]">
        {`LOOKBOOK   /   01`}
      </h2>
      <div className="mt-[1.6875rem] grid max-w-[76.9375rem] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-[1.625rem]">
        {lookbook.map((look) => (
          <Crop key={look.name} src={look.src} w={393} h={378} img={[...look.img]} className="relative w-full">
            <div className="absolute inset-0 shadow-[inset_-0.0625rem_-3.125rem_2.5875rem_0_rgba(0,0,0,0.36)]" />
            <div className="absolute bottom-[0.8125rem] left-4 flex flex-col gap-0.5 leading-normal text-white">
              <p className="font-display text-[0.9375rem] font-bold">{look.name}</p>
              <p className="text-xs">{look.tag}</p>
            </div>
          </Crop>
        ))}
      </div>
    </section>
  );
}

export default function ShopFrame() {
  return (
    <div className="relative overflow-x-clip bg-[#ece6dd]">
      <FrameNav active="coleccion" background={shopNavBg.src} theme="light" logo={voraLogoDark.src} />
      <main>
        <Products />
        <Statement />
        <Details />
        <Lookbook />
      </main>
    </div>
  );
}
