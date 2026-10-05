import FrameNav from '../vora/FrameNav';
import Crop from '../vora/Crop';
import ProductCard from '../vora/ProductCard';
import type { Detail, Product } from '../../data/catalog';

import shopNavBg from '../../assets/vora/shop-nav-bg.png';
import voraLogoDark from '../../assets/vora/vora-logo-dark.png';
import bannerUnisex from '../../assets/vora/shop-banner-unisex.webp';
import bannerWomens from '../../assets/vora/shop-banner-womens.webp';
import statementPhoto from '../../assets/vora/shop-statement.webp';
import numbersPhoto from '../../assets/vora/shop-numbers.webp';
import statCard1 from '../../assets/vora/stat-card-1.svg';
import statCard2 from '../../assets/vora/stat-card-2.svg';
import statCard3 from '../../assets/vora/stat-card-3.svg';
import statCard4 from '../../assets/vora/stat-card-4.svg';
import statArrow from '../../assets/vora/stat-arrow.svg';

const shopContainer = 'mx-auto w-full max-w-360 px-6 sm:px-10 lg:px-[6.5rem]';
const pad = (n: number) => String(n).padStart(2, '0');

function Intro() {
  return (
    <section className="mx-auto flex w-full max-w-360 flex-col gap-10 px-6 pt-36 pb-16 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:pt-[14.6875rem] lg:pr-[4.3125rem] lg:pb-[7.625rem] lg:pl-[4.375rem]">
      <div className="flex flex-col pt-6 leading-normal">
        <p data-split="chars" data-delay="0.2" className="pl-[0.4375rem] font-semibold text-[#5c141a]">
          VORA · 01 / 2026
        </p>
        <h1 data-split="lines" data-delay="0.35" className="font-display text-[3.5rem] font-black leading-[1.15] text-[#6d1212] sm:text-[6rem]">
          EN MARCHA
        </h1>
        <p data-reveal className="pl-[0.4375rem] text-sm font-semibold text-[#5c141a]/48 sm:text-xl">
          AMBICIÓN - PROPÓSITO - EVOLUCIÓN
        </p>
      </div>
      <p
        data-reveal
        className="relative max-w-[35.875rem] text-base leading-[1.6] text-[#525256] opacity-80 sm:text-xl lg:min-h-[11.5625rem] lg:pt-6 lg:pl-10"
      >
        <span data-line="y" aria-hidden="true" className="absolute top-0 left-0 hidden h-full w-px bg-[#a32b32] lg:block" />
        EN MARCHA representa ese momento en el que decides avanzar, incluso sin tener todo claro. Empezar desde cero, dar el
        primer paso, continuar, ir más lejos y aceptar que también existe lo inesperado.
      </p>
    </section>
  );
}

interface LineProps {
  id: string;
  index: string;
  title: string;
  blurb: string;
  image: string;
  /** Image rect inside the 1440 × 387 banner window (Figma mask). */
  frame: readonly [number, number, number, number];
  overlay: string;
  dark: boolean;
  products: Product[];
}

function Line({ id, index, title, blurb, image, frame, overlay, dark, products }: LineProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div data-banner>
        <Crop src={image} w={1440} h={387} img={frame} reveal={false} className="relative min-h-[26rem] w-full lg:min-h-0">
          <div className="absolute inset-0" style={{ background: overlay }} />
          <div
            className={`absolute inset-0 mx-auto flex max-w-360 flex-col justify-between px-6 pt-8 pb-8 font-mont leading-[1.6] sm:px-10 lg:pr-[2.3125rem] lg:pb-[2.375rem] lg:pl-[4.8125rem] ${
              dark ? 'text-white' : 'text-[#6d1212]'
            }`}
          >
            <p data-reveal className="text-[2rem] font-semibold italic sm:text-[2.7636rem]">
              {index}
            </p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 data-split="lines" data-banner-title className="text-[2.75rem] font-bold leading-[1.15] sm:text-[4.704rem]">
                  {title}
                </h2>
                <p data-reveal className={`text-2xl font-light sm:text-[2.352rem] ${dark ? '' : 'text-black'}`}>
                  <span data-count>{products.length}</span> Piezas
                </p>
              </div>
              <div data-reveal className="max-w-[15.6555rem] lg:mb-[1.125rem]">
                <div className={`h-px w-[3.875rem] ${dark ? 'bg-white' : 'bg-[#6d1212]'}`} />
                <p className={`mt-[1.15rem] text-lg leading-normal sm:text-[1.47rem] ${dark ? 'text-[#cecece]' : 'font-light text-[#5c141a]'}`}>{blurb}</p>
              </div>
            </div>
          </div>
        </Crop>
      </div>

      <div className="mx-auto grid w-full max-w-[70.125rem] grid-cols-1 gap-x-8 gap-y-12 px-6 pt-16 pb-24 sm:grid-cols-2 sm:px-10 lg:px-0 lg:pt-[9.625rem] lg:pb-[10rem] lg:gap-y-[10rem]">
        {products.map((product, i) => (
          <ProductCard
            key={product.slug}
            slug={product.slug}
            name={`${pad(i + 1)} — ${product.name}`}
            variant={product.variant}
            image={product.cardImage.src}
            ratio="405 / 285"
            theme="light"
            size="lg"
            className={`lg:w-[25.3375rem] ${i % 2 ? 'sm:justify-self-end' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section data-statement className="relative flex min-h-[32rem] flex-col justify-end overflow-hidden lg:h-[30.125rem] lg:min-h-0 lg:justify-start">
      <img
        data-statement-photo
        alt="Modelo con la camiseta FIRST STEP"
        src={statementPhoto.src}
        loading="lazy"
        className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[70%_center] lg:object-center"
      />
      {/* Mobile crop puts the copy over the red shirt; keep it legible. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-transparent lg:hidden" />

      <div className="relative mx-auto w-full max-w-360 px-6 py-20 text-[#ece6dd] sm:px-10 lg:px-[5.5rem] lg:pt-[7.8125rem] lg:pb-0">
        <div className="flex max-w-[26.25rem] flex-col items-start gap-6">
          <p data-reveal className="text-sm font-semibold">COLECCIÓN / 01</p>
          <h2 data-split="lines" className="font-display text-[2.5rem] font-black leading-[1.088] sm:text-[3.25rem]">
            HECHA PARA <br />
            SEGUIR <br />
            AVANZANDO
          </h2>
          <p data-reveal className="text-[0.9375rem] leading-[1.6] opacity-80">
            Una colección construida alrededor del movimiento, la dirección y la idea de no permanecer en el mismo lugar.
          </p>
        </div>
      </div>
    </section>
  );
}

function Details({ details }: { details: Detail[] }) {
  return (
    <section id="detalles" className={`${shopContainer} pt-20 lg:pt-[9.125rem]`}>
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

interface Stat {
  value: number;
  label: string;
  lines: [string, string];
  header: string;
  href: string;
}

function StatCard({ stat, i }: { stat: Stat; i: number }) {
  return (
    <a
      data-reveal
      href={stat.href}
      className="group relative block h-[9.8584rem] w-[9.6237rem] shrink-0 overflow-hidden rounded-[1.115rem] bg-[#ece6dd] font-mont leading-normal text-[#1c1c1c] shadow-[-0.4401rem_0.4988rem_0.4019rem_-0.088rem_rgba(0,0,0,0.25)]"
    >
      <img alt="" src={stat.header} width={153.979} height={79.0889} className="absolute top-0 left-0 h-[4.943rem] w-full" />
      <span className="absolute top-[0.54rem] left-[0.85rem] text-[0.4334rem] font-light text-white">{pad(i + 1)}</span>
      <span className="absolute top-[1.6138rem] left-[1.1875rem] text-[2.4316rem] font-semibold text-white" data-count>
        {pad(stat.value)}
      </span>
      <span className="absolute top-[6.1025rem] left-[1.2625rem] text-[0.9394rem] font-semibold">{stat.label}</span>
      <span className="absolute top-[7.5406rem] left-[1.265rem] text-[0.4051rem]">
        {stat.lines.map((line) => (
          <span key={line} className="block whitespace-pre">
            {line}
          </span>
        ))}
      </span>
      <img
        alt=""
        src={statArrow.src}
        width={17.3696}
        height={17.3696}
        className="absolute top-[7.3644rem] left-[7.6875rem] size-[1.0856rem] transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function Numbers({ unisex, womens }: { unisex: number; womens: number }) {
  const stats: Stat[] = [
    { value: unisex + womens, label: 'PIEZAS', lines: ['Una colección completa,', 'un mismo propósito.'], header: statCard1.src, href: '#unisex' },
    { value: unisex, label: 'UNISEX', lines: ['Siluetas versátiles', ' para avanzar contigo.'], header: statCard2.src, href: '#unisex' },
    { value: womens, label: 'PIEZAS', lines: ['Diseños que exploran', ' el movimiento y la evolución.'], header: statCard3.src, href: '#womens' },
    { value: 1, label: 'PIEZAS', lines: ['Un mismo camino, infinitas', 'posibilidades'], header: statCard4.src, href: '#detalles' },
  ];
  return (
    <section className="pt-24 pb-20 lg:pt-[10.1875rem] lg:pb-[7.6875rem]">
      <div className="relative overflow-hidden lg:h-[30.125rem]">
        <img alt="Modelo con la camiseta ON MY WAY frente a las montañas" src={numbersPhoto.src} loading="lazy" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[20%_center]" />
        <div className="relative mx-auto flex w-full max-w-360 flex-col items-center px-6 pt-64 pb-12 sm:px-10 lg:items-end lg:px-[6.5rem] lg:pt-[6.1875rem] lg:pb-0">
          <div className="flex flex-col items-center">
            <div className="text-center font-mont leading-normal text-[#332727]">
              <p data-reveal className="text-[1.1838rem] font-medium">
                LA COLECCIÓN
              </p>
              <h2 data-split="lines" className="-mt-[0.0625rem] text-[2.6876rem] font-extrabold">
                EN NÚMEROS
              </h2>
            </div>
            <div className="mt-[1.8rem] grid grid-cols-2 gap-[1.4375rem] sm:flex">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Props {
  unisex: Product[];
  womens: Product[];
  details: Detail[];
}

export default function ShopFrame({ unisex, womens, details }: Props) {
  return (
    <div className="relative overflow-x-clip bg-[#ece6dd]">
      <FrameNav active="coleccion" background={shopNavBg.src} theme="light" logo={voraLogoDark.src} />
      <main>
        <Intro />
        <Line
          id="unisex"
          index="01"
          title="UNISEX"
          blurb="Siluetas versátiles diseñadas para avanzar contigo."
          image={bannerUnisex.src}
          frame={[-160.65, -52.05, 1761.875, 587.292]}
          overlay="rgba(5,5,5,0.53)"
          dark
          products={unisex}
        />
        <Line
          id="womens"
          index="02"
          title="WOMEN'S FIT"
          blurb="Siluetas versátiles diseñadas para avanzar contigo."
          image={bannerWomens.src}
          frame={[-2.79, -96.86, 1444.92, 481.64]}
          overlay="rgba(201,130,130,0.36)"
          dark={false}
          products={womens}
        />
        <Statement />
        <Details details={details} />
        <Numbers unisex={unisex.length} womens={womens.length} />
      </main>
    </div>
  );
}
