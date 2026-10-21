import type { CSSProperties } from 'react';

import Crop from '../vora/Crop';
import { at, place, stageVars } from './stage';
import { u } from '../vora/mask';

import backpack from '../../assets/vora/nosotros-adn-photo-a.webp';
import road from '../../assets/vora/nosotros-adn-photo-b.webp';
import couple from '../../assets/vora/nosotros-adn-portrait.webp';
import star from '../../assets/vora/nosotros-star.webp';
import card1 from '../../assets/vora/nosotros-card-1.svg';
import card2 from '../../assets/vora/nosotros-card-2.svg';
import card3 from '../../assets/vora/nosotros-card-3.svg';

const pillars = [
  { n: '01', title: 'AMBICIÓN', bg: card1.src, text: 'Mirar más allá de lo que somos hoy. No conformarnos con lo establecido.' },
  { n: '02', title: 'PROPÓSITO', bg: card2.src, text: 'Dar intención a cada paso. Entender el diseño como una forma de expresión.' },
  { n: '03', title: 'EVOLUCIÓN', bg: card3.src, text: 'Permitimos cambiar. Redefinimos sin perder lo que nos mueve.' },
];

// Photo collage, in design px inside its own 580 × 645 box (so it scales on its own below xl).
const W = 580;
const H = 645;
const box = (x: number, y: number, w: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
});
const shade = <div className="absolute inset-0 bg-black/20" />;

function Collage({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div data-seq="top 65%" className={`relative mx-auto w-full max-w-[36.25rem] ${className}`} style={{ aspectRatio: `${W} / ${H}`, ...style }}>
      <div data-in="wipe" data-settle data-from="left" data-parallax="0.04" className="absolute" style={box(12, 44, 290)}>
        <Crop src={backpack.src} w={290} h={265} img={[-79, -40.3, 397, 345.6]} reveal={false} className="relative">
          {shade}
        </Crop>
      </div>
      <div data-in="wipe" data-settle data-from="up" data-parallax="-0.03" className="absolute" style={{ ...box(113.7, 117.5, 292.569), rotate: '6.32deg' }}>
        <Crop src={couple.src} w={292.569} h={438.854} reveal={false} className="relative">
          {shade}
        </Crop>
      </div>
      <div data-in="wipe" data-settle data-from="right" data-parallax="0.08" className="absolute" style={box(306.6, 433.05, 143.4)}>
        <Crop src={road.src} w={143.4} h={209.4} img={[-190.74, -172.5, 373.1, 555]} reveal={false} className="relative">
          {shade}
        </Crop>
      </div>
      <div data-in="pop" data-speed="0.06" className="pointer-events-none absolute" style={{ ...box(282.2, 10.3, 289.345), rotate: '2.5deg' }}>
        <img alt="" src={star.src} data-float loading="lazy" decoding="async" className="block h-auto w-full max-w-none" />
      </div>
      <div data-in="pop" data-speed="-0.05" className="pointer-events-none absolute" style={{ ...box(20.1, 445.5, 156.989), rotate: '-6.53deg' }}>
        <img alt="" src={star.src} data-float loading="lazy" decoding="async" className="block h-auto w-full max-w-none" />
      </div>
    </div>
  );
}

/**
 * Accordion card (behaviour in initCards, scripts/motion.ts). Collapsed it is the red pill; open, a dark panel
 * with the description slides out below it.
 */
function Pillar({ n, title, bg, text }: (typeof pillars)[number]) {
  const id = `adn-${n}`;
  return (
    <div
      data-in="slide"
      data-card
      className="@container group w-full max-w-[22rem] transition-[filter] duration-700 data-open:drop-shadow-[-3px_7px_7px_rgb(0_0_0/0.4)] xl:max-w-none"
    >
      <button
        type="button"
        data-card-toggle
        aria-expanded="false"
        aria-controls={id}
        className="relative block aspect-[273.667/82.247] w-full text-left transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <img alt="" src={bg} className="absolute inset-0 block size-full max-w-none" />
        <span className="absolute top-[10.7%] left-[9.15%] w-[4.57%] text-center font-mont text-[2.64cqw] leading-[normal] font-light text-white">{n}</span>
        <span className="absolute top-[35.7%] left-[11.27%] font-mont text-[11.45cqw] leading-[normal] font-extrabold whitespace-nowrap text-white">{title}</span>
      </button>
      <div id={id} data-card-panel role="region" aria-label={title} className="invisible h-0 overflow-hidden">
        <div className="relative aspect-[273.667/82.247] rounded-b-[6.8cqw] border border-t-0 border-[#a32b32] bg-[#1c1c1c]">
          <p
            data-card-text
            className="absolute top-1/2 left-[11.27%] w-[75.78%] -translate-y-1/2 text-[3.32cqw] leading-[1.6] text-[#ece6dd] xl:top-[5.85%] xl:translate-y-0"
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/** "NUESTRO ADN": three words, a photo collage with two red stars and three pill cards. */
export default function Adn() {
  return (
    <section id="adn" className="relative bg-[#0b0b0d]">
      <div className="@container">
        <div
          className="relative mx-auto flex w-full max-w-360 flex-col gap-12 px-6 py-20 sm:px-10 xl:block xl:aspect-[1440/763] xl:p-0"
          style={stageVars}
        >
          <div data-seq="top 75%" className="flex flex-col gap-6 xl:contents">
            <p
              data-in="fade"
              className={`font-sans text-sm font-semibold text-white xl:w-(--w) xl:text-(length:--fs) ${place}`}
              style={at(79, 210, { w: 645.215, fs: 14 })}
            >
              NUESTRO ADN
            </p>
            <h2
              data-split="lines"
              className={`font-mont leading-[1.04] font-extrabold xl:w-(--w) xl:text-(length:--fs) ${place}`}
              style={at(79, 248, { w: 645.215, fs: 68.106 })}
            >
              <span className="block text-[2.75rem] text-[#6e161b] sm:text-[4.25rem] xl:text-[length:inherit]">AMBICIÓN</span>
              <span className="block text-[2.75rem] text-[#ece6dd] sm:text-[4.25rem] xl:text-[length:inherit]">PROPÓSITO</span>
              <span className="block text-[2.75rem] text-[#6e161b] sm:text-[4.25rem] xl:text-[length:inherit]">EVOLUCIÓN</span>
            </h2>
            <p
              data-in="fade"
              className={`max-w-[27.0625rem] font-mont text-base leading-[1.27] text-[#ece6dd] xl:w-(--w) xl:max-w-none xl:text-(length:--fs) ${place}`}
              style={at(79, 481, { w: 433, fs: 16.057 })}
            >
              Más que ropa, somos un movimiento. Creemos en las personas que avanzan con intención y en todo lo que está por venir.
            </p>
          </div>

          <Collage className={`xl:w-(--w) xl:max-w-none ${place}`} style={at(500, 31, { w: 580 })} />

          <div
            data-seq="top 80%"
            className={`flex flex-col items-center gap-6 sm:items-start xl:w-(--w) xl:items-stretch xl:gap-(--gap) ${place}`}
            style={{ ...at(1056, 207, { w: 273.667 }), '--gap': u(48.753) } as CSSProperties}
          >
            {pillars.map((p) => (
              <Pillar key={p.n} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
