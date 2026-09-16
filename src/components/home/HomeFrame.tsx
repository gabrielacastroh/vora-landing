import { motion } from 'motion/react';

import FrameNav from '../vora/FrameNav';
import FrameFooter from '../vora/FrameFooter';
import { mask, archivo, geist, reveal } from '../vora/mask';

import heroBg from '../../assets/vora/hero-bg-node.png';
import spotlight from '../../assets/vora/spotlight.svg';
import spotlight1 from '../../assets/vora/spotlight-1.svg';
import arrowRight from '../../assets/vora/arrow-right.svg';
import arrowRight1 from '../../assets/vora/arrow-right-1.svg';
import dividerRect from '../../assets/vora/divider-rectangle.png';
import line1 from '../../assets/vora/line-1.svg';
import navBg from '../../assets/vora/nav-bg.png';

import productVora01 from '../../assets/vora/product-vora01.png';
import productVora02 from '../../assets/vora/product-vora02.png';
import productVora05 from '../../assets/vora/product-vora05.png';

import heroFigure from '../../assets/vora/hero-figure.png';
import maskHeroFigure from '../../assets/vora/mask-1151171.svg';
import img1150272 from '../../assets/vora/mask-1150272.png';
import mask1150271 from '../../assets/vora/mask-1150271.svg';
import img1146032 from '../../assets/vora/mask-1146032.png';
import mask1146031 from '../../assets/vora/mask-1146031.svg';
import img1135152 from '../../assets/vora/mask-1135152.png';
import mask1135151 from '../../assets/vora/mask-1135151.svg';
import galleryMountainMask from '../../assets/vora/gallery-mountain-1.png';
import galleryMountain from '../../assets/vora/gallery-mountain-2.png';
import img1145542 from '../../assets/vora/mask-1145542.png';
import mask1145541 from '../../assets/vora/mask-1145541.svg';
import galleryPortrait from '../../assets/vora/gallery-portrait-1.png';
import maskImage1 from '../../assets/vora/mask-image1.svg';
import img1154471 from '../../assets/vora/mask-1154471.png';

function Spotlight({ src, left, top }: { src: string; left: number; top: number }) {
  return (
    <div className="absolute size-[700px]" style={{ left, top }}>
      <div className="absolute inset-[-14.29%]">
        <img alt="" src={src} className="block size-full max-w-none" />
      </div>
    </div>
  );
}

function Caption({ left, top, lines, lineTop }: { left: number; top: number; lines: string[]; lineTop: number }) {
  return (
    <>
      <motion.div
        {...reveal}
        className="absolute whitespace-nowrap text-[13px] font-thin text-white"
        style={{ left, top, ...archivo }}
      >
        {lines.map((line) => (
          <p key={line} className="leading-[1.43]">
            {line}
          </p>
        ))}
      </motion.div>
      <div className="absolute h-0 w-[42px]" style={{ left, top: lineTop }}>
        <div className="absolute inset-[-1px_0_0_0]">
          <img alt="" src={line1.src} className="block size-full max-w-none" />
        </div>
      </div>
    </>
  );
}

const productCards = [
  {
    left: 183,
    imgHeight: 286,
    image: productVora01.src,
    name: 'VORA 01',
    variant: 'Camiseta / Verde',
    slug: 'vora-01',
  },
  {
    left: 605,
    imgHeight: 282,
    image: productVora02.src,
    name: 'VORA 02',
    variant: 'Camiseta / Beige',
    slug: 'vora-02',
  },
  {
    left: 1027,
    imgHeight: 282,
    image: productVora05.src,
    name: 'VORA 05',
    variant: 'Camiseta / Azul Claro',
    slug: 'vora-05',
  },
];

export default function HomeFrame() {
  return (
    <div className="relative size-full bg-white">
      <div className="absolute left-0 top-0 h-[3604px] w-[1440px] overflow-clip bg-[#0b0b0d]">
        <Spotlight src={spotlight.src} left={912} top={2413} />
        <motion.div
          {...reveal}
          className="absolute h-[566px] w-[453px]"
          style={{ left: 912, top: 2595, ...mask(maskHeroFigure.src, '0px 26px', '454px 392px') }}
        >
          <img alt="" src={heroFigure.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <motion.div
          {...reveal}
          className="absolute h-[293px] w-[520px] opacity-[0.59]"
          style={{ left: 200, top: 2721, ...mask(mask1150271.src, '266px 0px', '200px 292px') }}
        >
          <img alt="" src={img1150272.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <Spotlight src={spotlight.src} left={-95} top={1952} />

        <motion.div
          className="absolute h-[1024px] w-[1440px]"
          style={{ left: 0, top: 0 }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img alt="" src={heroBg.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <Spotlight src={spotlight1.src} left={100} top={150} />

        <motion.div
          className="absolute flex w-[720px] flex-col items-start gap-[24px]"
          style={{ left: 60, top: 333 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="whitespace-nowrap text-[14px] font-semibold uppercase text-[#a32b32]" style={geist}>
            MADE TO MOVE FORWARD
          </p>
          <p className="w-full text-[56px] font-extrabold leading-[1.15] text-[#ece6dd]" style={archivo}>
            TODAVÍA NO HEMOS LLEGADO. PERO YA ESTAMOS AVANZANDO.
          </p>
        </motion.div>

        <motion.div
          className="absolute flex w-[1320px] items-end justify-between"
          style={{ left: 60, top: 725 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-[380px] shrink-0 flex-col items-start gap-[24px]">
            <p className="w-full text-[14px] font-normal leading-[1.6] text-[#8d877d]" style={geist}>
              VORA nace para quienes no temen redefinirse. Diseñamos con la firme convicción de que el
              destino es solo un pretexto para seguir moviéndonos.
            </p>
            <a href="/coleccion" className="group flex shrink-0 items-center gap-[8px]">
              <p className="whitespace-nowrap text-left text-[14px] font-bold uppercase text-[#ece6dd]" style={geist}>
                Ver Colección
              </p>
              <span className="flex size-[14px] shrink-0 items-center justify-center">
                <img
                  alt=""
                  src={arrowRight.src}
                  className="block size-[14px] max-w-none transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>
          </div>
          <div className="flex shrink-0 items-center">
            <p className="whitespace-nowrap text-[13px] font-semibold uppercase text-[#ece6dd]" style={archivo}>
              AMBICIÓN · PROPÓSITO · EVOLUCIÓN
            </p>
          </div>
        </motion.div>

        <div className="absolute left-0 h-[135px] w-[1440px]" style={{ top: 889 }}>
          <img alt="" src={dividerRect.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </div>

        <motion.p
          {...reveal}
          className="absolute h-[43px] w-[662px] text-[48px] font-black uppercase leading-[normal] text-[#ece6dd]"
          style={{ left: 60, top: 1153, ...archivo }}
        >
          COLECCIÓN DESTACADA
        </motion.p>

        <motion.div
          {...reveal}
          className="absolute whitespace-nowrap text-[13px] font-light leading-[1.16] text-[#ece6dd]"
          style={{ left: 69, top: 2715, ...archivo }}
        >
          <p className="leading-[1.16]">Ropa para una generación</p>
          <p className="leading-[1.16]">que no se detiene.</p>
          <p className="leading-[1.16]">Explorar, Aprender, Crear</p>
          <p className="leading-[1.16]">Seguir adelante.</p>
        </motion.div>

        <Caption left={69} top={2250} lineTop={2316} lines={['PERSONAS', 'QUE SIGUEN', 'AVANZANDO']} />

        <motion.div
          {...reveal}
          className="absolute h-[369px] w-[553.5px]"
          style={{ left: 912, top: 2167, ...mask(mask1146031.src, '206px 0px', '248px 369px') }}
        >
          <img alt="" src={img1146032.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <motion.div
          {...reveal}
          className="absolute h-[671px] w-[447px]"
          style={{ left: 700, top: 2224, ...mask(mask1135151.src, '0px 147px', '402px 350px') }}
        >
          <img alt="" src={img1135152.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <motion.div
          {...reveal}
          className="pointer-events-none absolute h-[871px] w-[580px]"
          style={{ left: 237, top: 2052, ...mask(galleryMountainMask.src, '0px 69px', '581px 500px') }}
        >
          <img alt="" src={galleryMountain.src} className="absolute inset-0 size-full max-w-none object-cover" />
          <div className="absolute inset-0 shadow-[inset_95px_0px_93.5px_0px_#1e0c10]" />
        </motion.div>

        <Caption left={701} top={2484} lineTop={2567} lines={['MISMAS', 'PERSONAS', 'NUEVOS', 'HORIZONTES']} />
        <Caption left={1222} top={2469} lineTop={2517} lines={['NUEVOS CAMINOS', 'MISMAS GANAS']} />
        <Caption
          left={1257}
          top={2837}
          lineTop={2941}
          lines={['MOVIMIENRO', 'IDEAS', 'PERSONAS', 'LUGARES', 'EVOLUCIÓN']}
        />
        <Caption left={482} top={2889} lineTop={2995} lines={['EL', 'MOVIMIENTO', 'TAMBÍEN', 'VIVE', 'EN TI']} />

        <motion.div
          {...reveal}
          className="absolute h-[382px] w-[306px]"
          style={{ left: 176, top: 2667, ...mask(mask1145541.src, '72px 54px', '200px 292px') }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="" src={img1145542.src} className="absolute left-[0.14%] top-[-0.1%] h-[100.1%] w-full max-w-none" />
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="absolute h-[292px] w-[438px]"
          style={{ left: 665, top: 2061, ...mask(maskImage1.src, '16px 22px', '402px 250px') }}
        >
          <img alt="" src={galleryPortrait.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        <Caption
          left={961}
          top={2234}
          lineTop={2318}
          lines={['EXPLORAR', 'TAMBÍEN', 'ES UNA FORMA', 'DE AVANZAR']}
        />

        <motion.div
          {...reveal}
          className="absolute h-[348px] w-[232px]"
          style={{ left: 653, top: 2703, ...mask(mask1150271.src, '31px 18px', '200px 292px') }}
        >
          <img alt="" src={img1154471.src} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        </motion.div>

        {productCards.map((product, i) => (
          <motion.a
            key={product.slug}
            href={`/producto/${product.slug}`}
            className="group absolute flex h-[327px] flex-col items-start gap-[12px]"
            style={{ left: product.left, top: 1405 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[280px] shrink-0 overflow-hidden" style={{ height: product.imgHeight }}>
              <img
                alt={`${product.name} — ${product.variant}`}
                src={product.image}
                className="pointer-events-none absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex w-full shrink-0 items-center justify-between whitespace-nowrap leading-[normal]">
              <div className="flex shrink-0 flex-col items-start gap-[2px]">
                <p className="text-[15px] font-bold text-[#ece6dd]" style={archivo}>
                  {product.name}
                </p>
                <p className="text-[12px] font-normal text-[#8d877d]" style={geist}>
                  {product.variant}
                </p>
              </div>
              <p className="shrink-0 text-[11px] font-bold text-[#a32b32]" style={geist}>
                VER PRODUCTO →
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        {...reveal}
        className="absolute flex w-[720px] flex-col items-start"
        style={{ left: 60, top: 1213 }}
      >
        <div className="whitespace-nowrap uppercase" style={geist}>
          <p className="text-[24px] font-semibold leading-[normal] text-[#a32b32]">COLECCIÓN 01</p>
          <p className="text-[14px] font-thin leading-[normal] text-[#cecece]">SS26 — PRE-RELEASE</p>
        </div>
      </motion.div>

      <motion.a
        {...reveal}
        href="/coleccion"
        className="group absolute flex items-center gap-[8px]"
        style={{ left: 628, top: 1841 }}
      >
        <p className="whitespace-nowrap text-left text-[14px] font-bold uppercase text-[#a32b32]" style={geist}>
          EXPLORAR COLECCIÓN
        </p>
        <span className="flex size-[14px] shrink-0 items-center justify-center">
          <img
            alt=""
            src={arrowRight1.src}
            className="block size-[14px] max-w-none transition-transform group-hover:translate-x-1"
          />
        </span>
      </motion.a>

      <FrameFooter left={2} top={3210} />

      <motion.div
        {...reveal}
        className="absolute flex w-[545px] flex-col items-start"
        style={{ left: 60, top: 2420 }}
      >
        <div className="w-full text-[96px] font-black text-[#ece6dd]" style={archivo}>
          <p className="leading-[0.88]">MADE TO </p>
          <p className="leading-[0.88]">MOVE </p>
          <p className="leading-[0.88]">FORWARD</p>
        </div>
      </motion.div>

      <FrameNav active="inicio" background={navBg.src} theme="dark" />
    </div>
  );
}
