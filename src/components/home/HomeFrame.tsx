import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';

import FrameNav from '../vora/FrameNav';
import Crop from '../vora/Crop';
import ProductCard from '../vora/ProductCard';
import { mask, u, container, reveal } from '../vora/mask';

import heroBg from '../../assets/vora/hero-bg-node.png';
import spotlight from '../../assets/vora/spotlight.svg';
import spotlight1 from '../../assets/vora/spotlight-1.svg';
import arrowRight from '../../assets/vora/arrow-right.svg';
import arrowRight1 from '../../assets/vora/arrow-right-1.svg';
import dividerRect from '../../assets/vora/divider-rectangle.png';
import navBg from '../../assets/vora/nav-bg.png';

import productVora01 from '../../assets/vora/product-vora01.png';
import productVora02 from '../../assets/vora/product-vora02.png';
import productVora05 from '../../assets/vora/product-vora05.png';

import heroFigure from '../../assets/vora/hero-figure.png';
import img1150272 from '../../assets/vora/mask-1150272.png';
import img1146032 from '../../assets/vora/mask-1146032.png';
import img1135152 from '../../assets/vora/mask-1135152.png';
import galleryMountainMask from '../../assets/vora/gallery-mountain-1.png';
import galleryMountain from '../../assets/vora/gallery-mountain-2.png';
import img1145542 from '../../assets/vora/mask-1145542.png';
import galleryPortrait from '../../assets/vora/gallery-portrait-1.png';
import img1154471 from '../../assets/vora/mask-1154471.png';

const ease = [0.16, 1, 0.3, 1] as const;

const productCards = [
  { ratio: '280 / 286', image: productVora01.src, name: 'VORA 01', variant: 'Camiseta / Verde', slug: 'vora-01' },
  { ratio: '280 / 282', image: productVora02.src, name: 'VORA 02', variant: 'Camiseta / Beige', slug: 'vora-02' },
  { ratio: '280 / 282', image: productVora05.src, name: 'VORA 05', variant: 'Camiseta / Azul Claro', slug: 'vora-05' },
];

const captions = {
  personas: ['PERSONAS', 'QUE SIGUEN', 'AVANZANDO'],
  horizontes: ['MISMAS', 'PERSONAS', 'NUEVOS', 'HORIZONTES'],
  caminos: ['NUEVOS CAMINOS', 'MISMAS GANAS'],
  movimiento: ['MOVIMIENTO', 'IDEAS', 'PERSONAS', 'LUGARES', 'EVOLUCIÓN'],
  enTi: ['EL', 'MOVIMIENTO', 'TAMBIÉN', 'VIVE', 'EN TI'],
  explorar: ['EXPLORAR', 'TAMBIÉN', 'ES UNA FORMA', 'DE AVANZAR'],
};

/**
 * Gallery images. `crop` is the Figma mask window inside the 1440 × 1258 gallery
 * frame; `img` is the image rect relative to that window.
 */
const gallery = {
  figure: { src: heroFigure.src, crop: [912, 669, 453, 392], img: [0, -26, 453, 566] },
  faded: { src: img1150272.src, crop: [466, 769, 200, 292], img: [-266, 0, 520, 293] },
  tall: { src: img1146032.src, crop: [1118, 215, 248, 369], img: [-206, 0, 553.5, 369] },
  wide: { src: img1135152.src, crop: [700, 419, 402, 350], img: [0, -147, 447, 671] },
  mountain: { src: galleryMountain.src, crop: [237, 169, 580, 500], img: [0, -69, 580, 871] },
  left: { src: img1145542.src, crop: [248, 769, 200, 292], img: [-72, -54, 306, 382] },
  portrait: { src: galleryPortrait.src, crop: [681, 131, 402, 250], img: [-16, -22, 438, 292] },
  right: { src: img1154471.src, crop: [684, 769, 200, 292], img: [-31, -18, 232, 348] },
} satisfies Record<string, { src: string; crop: number[]; img: [number, number, number, number] }>;

type GalleryKey = keyof typeof gallery;

const mountainStyle = mask(galleryMountainMask.src, '0 0', '100% 100%');

/** Mountain shadow is defined in px of a 580px-wide image; cqw keeps it proportional. */
function MountainShade() {
  return <div className="absolute inset-0 shadow-[inset_16.38cqw_0_16.12cqw_0_#1e0c10]" />;
}

function GalleryCrop({ id, desktop, className = '', children }: { id: GalleryKey; desktop?: boolean; className?: string; children?: ReactNode }) {
  const { src, crop, img } = gallery[id];
  const [x, y, w, h] = crop;
  const isMountain = id === 'mountain';
  return (
    <Crop
      src={src}
      w={w}
      h={h}
      img={img}
      className={`${isMountain ? '@container' : ''} ${desktop ? 'absolute' : 'relative w-full'} ${className}`}
      style={{ ...(desktop ? { left: u(x), top: u(y), width: u(w) } : {}), ...(isMountain ? mountainStyle : {}) }}
    >
      {isMountain && <MountainShade />}
      {/* Figma layer opacity 0.59 over the page background; motion's reveal owns the opacity property. */}
      {id === 'faded' && <div className="absolute inset-0 bg-[#0b0b0d]/[0.41]" />}
      {children}
    </Crop>
  );
}

function Spotlight({ src, className = '', style }: { src: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style}>
      <img alt="" src={src} className="absolute inset-[-14.29%] block size-[128.58%] max-w-none" />
    </div>
  );
}

function DesktopCaption({ x, y, lineY, lines }: { x: number; y: number; lineY: number; lines: string[] }) {
  return (
    <>
      <motion.div
        {...reveal}
        className="font-display absolute whitespace-nowrap font-thin leading-[1.43] text-white"
        style={{ left: u(x), top: u(y), fontSize: u(13) }}
      >
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </motion.div>
      <div className="absolute h-px bg-white" style={{ left: u(x), top: u(lineY), width: u(42) }} />
    </>
  );
}

function TileCaption({ lines }: { lines: string[] }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
      <div className="font-display text-[0.8125rem] font-thin leading-[1.43] text-white">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="mt-2 h-px w-[2.625rem] bg-white" />
    </div>
  );
}

function Manifesto({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <motion.h2 {...reveal} className={`font-display font-black leading-[0.88] text-[#ece6dd] ${className}`} style={style}>
      MADE TO <br />
      MOVE <br />
      FORWARD
    </motion.h2>
  );
}

const tagline = ['Ropa para una generación', 'que no se detiene.', 'Explorar, Aprender, Crear', 'Seguir adelante.'];

function Tagline({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <motion.div {...reveal} className={`font-display font-light leading-[1.16] text-[#ece6dd] ${className}`} style={style}>
      {tagline.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
      >
        <img
          alt=""
          src={heroBg.src}
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[72%_center] lg:object-center"
        />
      </motion.div>
      <Spotlight src={spotlight1.src} className="left-[6.25rem] top-[9.375rem] size-[43.75rem] max-lg:-left-60" />
      <img
        alt=""
        src={dividerRect.src}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[8.4375rem] w-full max-w-none object-cover"
      />

      <div className={`${container} relative flex flex-1 flex-col pt-28 pb-[11.9375rem] lg:pt-[8.3125rem]`}>
        <motion.div
          className="my-auto flex max-w-[45rem] flex-col items-start gap-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-sm font-semibold uppercase text-[#a32b32]">MADE TO MOVE FORWARD</p>
          <h1 className="font-display text-[2.25rem] font-extrabold leading-[1.15] text-[#ece6dd] sm:text-5xl lg:text-[3.5rem]">
            TODAVÍA NO HEMOS LLEGADO. PERO YA ESTAMOS AVANZANDO.
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <div className="flex max-w-[23.75rem] flex-col items-start gap-6">
            <p className="text-sm leading-[1.6] text-[#8d877d]">
              VORA nace para quienes no temen redefinirse. Diseñamos con la firme convicción de que el destino es
              solo un pretexto para seguir moviéndonos.
            </p>
            <a href="/coleccion" className="group flex items-center gap-2">
              <span className="text-sm font-bold uppercase text-[#ece6dd]">Ver Colección</span>
              <img alt="" src={arrowRight.src} className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="font-display text-[0.8125rem] font-semibold uppercase text-[#ece6dd]">AMBICIÓN · PROPÓSITO · EVOLUCIÓN</p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollection() {
  return (
    <section className={`${container} relative pt-20 pb-20 lg:pt-[8.0625rem] lg:pb-[5.875rem]`}>
      <motion.div {...reveal}>
        <h2 className="font-display text-[2rem] font-black uppercase leading-tight text-[#ece6dd] sm:text-5xl">COLECCIÓN DESTACADA</h2>
        <div className="mt-2 uppercase">
          <p className="text-2xl font-semibold text-[#a32b32]">COLECCIÓN 01</p>
          <p className="text-sm font-thin text-[#cecece]">SS26 — PRE-RELEASE</p>
        </div>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-[70.25rem] grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-[9.125rem] lg:grid-cols-[repeat(3,minmax(0,17.5rem))] lg:justify-between">
        {productCards.map((product, i) => (
          <ProductCard key={product.slug} {...product} theme="dark" delay={i * 0.1} />
        ))}
      </div>

      <motion.a {...reveal} href="/coleccion" className="group mx-auto mt-16 flex w-fit items-center gap-2 lg:mt-[6.8125rem]">
        <span className="text-sm font-bold uppercase text-[#a32b32]">EXPLORAR COLECCIÓN</span>
        <img alt="" src={arrowRight1.src} className="size-3.5 transition-transform group-hover:translate-x-1" />
      </motion.a>
    </section>
  );
}

function Gallery() {
  return (
    <section className="relative">
      {/* < xl: editorial masonry, every image keeps its Figma framing. */}
      <div className={`${container} relative pb-20 xl:hidden`}>
        <Spotlight src={spotlight.src} className="-left-40 -top-24 size-[43.75rem]" />
        <Manifesto className="relative text-[3.5rem] sm:text-[5rem] md:text-[6rem]" />
        <Tagline className="relative mt-8 text-[0.8125rem]" />
        <div className="relative mt-12 columns-2 gap-3 md:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
          <GalleryCrop id="mountain">
            <TileCaption lines={captions.personas} />
          </GalleryCrop>
          <GalleryCrop id="tall">
            <TileCaption lines={captions.explorar} />
          </GalleryCrop>
          <GalleryCrop id="portrait" />
          <GalleryCrop id="wide">
            <TileCaption lines={captions.horizontes} />
          </GalleryCrop>
          <GalleryCrop id="left">
            <TileCaption lines={captions.enTi} />
          </GalleryCrop>
          <GalleryCrop id="right">
            <TileCaption lines={captions.caminos} />
          </GalleryCrop>
          <GalleryCrop id="faded" />
          <GalleryCrop id="figure">
            <TileCaption lines={captions.movimiento} />
          </GalleryCrop>
        </div>
      </div>

      {/* ≥ xl: the Figma collage, scaled as one piece so the composition never shifts. */}
      <div className="@container hidden xl:block">
        <div
          className="relative mx-auto aspect-[1440/1258] w-full max-w-360"
          style={{ '--u': 'calc(min(100cqw, 90rem) / 1440)' } as CSSProperties}
        >
          <Spotlight src={spotlight.src} style={{ left: u(912), top: u(461), width: u(700), height: u(700) }} />
          <GalleryCrop id="figure" desktop />
          <GalleryCrop id="faded" desktop />
          <Spotlight src={spotlight.src} style={{ left: u(-95), top: 0, width: u(700), height: u(700) }} />
          <Tagline className="absolute whitespace-nowrap" style={{ left: u(69), top: u(763), fontSize: u(13) }} />
          <DesktopCaption x={69} y={298} lineY={364} lines={captions.personas} />
          <GalleryCrop id="tall" desktop />
          <GalleryCrop id="wide" desktop />
          <GalleryCrop id="mountain" desktop className="pointer-events-none" />
          <DesktopCaption x={701} y={532} lineY={615} lines={captions.horizontes} />
          <DesktopCaption x={1222} y={517} lineY={565} lines={captions.caminos} />
          <DesktopCaption x={1257} y={885} lineY={989} lines={captions.movimiento} />
          <DesktopCaption x={482} y={937} lineY={1043} lines={captions.enTi} />
          <GalleryCrop id="left" desktop />
          <GalleryCrop id="portrait" desktop />
          <DesktopCaption x={961} y={282} lineY={366} lines={captions.explorar} />
          <GalleryCrop id="right" desktop />
          <Manifesto className="absolute" style={{ left: u(60), top: u(468), width: u(545), fontSize: u(96) }} />
        </div>
      </div>
    </section>
  );
}

export default function HomeFrame() {
  return (
    <div className="relative overflow-x-clip bg-[#0b0b0d]">
      <FrameNav active="inicio" background={navBg.src} theme="dark" />
      <Hero />
      <FeaturedCollection />
      <Gallery />
    </div>
  );
}
