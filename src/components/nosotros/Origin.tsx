import type { CSSProperties, ReactNode } from 'react';

import { at, place, stageVars } from './stage';
import { u } from '../vora/mask';

import flag from '../../assets/vora/nosotros-flag.webp';
import map from '../../assets/vora/nosotros-map.webp';
import portrait from '../../assets/vora/nosotros-origin-portrait.webp';
import palms from '../../assets/vora/nosotros-origin-palms.webp';
import triptych from '../../assets/vora/nosotros-origin-triptych.webp';
import label from '../../assets/vora/nosotros-origin-label.webp';
import ellipse from '../../assets/vora/nosotros-origin-ellipse.svg';
import port from '../../assets/vora/nosotros-origin-port.webp';

interface PieceProps {
  src: string;
  /** Un-rotated design-px rect inside the 1440 × 898 stage. */
  x: number;
  y: number;
  w: number;
  h?: number;
  r?: number;
  /** drop-shadow() of the Figma effect, in design px: [y, blur, alpha]. */
  shadow?: [number, number, number];
  alt?: string;
  className?: string;
  children?: ReactNode;
}

/** One collage piece: a plain image on mobile, an absolutely placed (and rotated) photo from xl. */
function Piece({ src, x, y, w, h, r, shadow, alt = '', className = '', children }: PieceProps) {
  const style: CSSProperties = at(x, y, { w, h, r });
  if (shadow) style.filter = `drop-shadow(0 ${u(shadow[0])} ${u(shadow[1])} rgb(0 0 0 / ${shadow[2]}))`;
  return (
    <div
      data-in="drop"
      className={`relative w-full xl:w-(--w) ${h ? 'xl:h-(--h)' : ''} ${r ? 'xl:rotate-(--r)' : ''} ${place} ${className}`}
      style={style}
    >
      <img alt={alt} src={src} loading="lazy" decoding="async" className="block h-auto w-full max-w-none object-cover xl:size-full" />
      {children}
    </div>
  );
}

/** "DESDE AQUÍ.": cream section with the Colombia origin story and a rotated photo / map collage. */
export default function Origin() {
  return (
    <section className="relative z-10 bg-[#e3d9cf]">
      <div className="@container">
        <div
          className="relative mx-auto flex w-full max-w-360 flex-col gap-12 px-6 py-20 sm:px-10 xl:block xl:aspect-[1440/898] xl:p-0"
          style={stageVars}
        >
          <div data-seq="top 70%" className="flex flex-col xl:contents">
            <p
              data-in="fade"
              className={`text-[0.9375rem] leading-[1.6] font-light tracking-[0.27em] text-black/80 uppercase xl:w-(--w) xl:text-(length:--fs) ${place}`}
              style={at(122, 228, { w: 212.18, fs: 15 })}
            >
              NUESTRO ORIGEN
            </p>
            <h2
              data-split="lines"
              className={`mt-3 font-display text-[3.75rem] leading-[0.87375] font-black text-[#1c1c1c] sm:text-[5rem] xl:mt-0 xl:w-(--w) xl:text-(length:--fs) ${place}`}
              style={at(122, 262.93, { w: 384, fs: 81.655 })}
            >
              <span className="block">DESDE</span>
              <span className="block text-[#6d1212]">AQUÍ.</span>
            </h2>
            <div
              data-in="wipe"
              data-from="left"
              className={`mt-6 flex items-center gap-[0.5625rem] xl:mt-0 xl:gap-(--gap) ${place}`}
              style={{ ...at(122, 428), '--gap': u(9) } as CSSProperties}
            >
              <img alt="" src={flag.src} className="size-[1.5625rem] max-w-none xl:size-(--w)" style={at(0, 0, { w: 25 })} />
              <span
                className="text-lg leading-[1.6] font-extrabold tracking-[0.8em] text-black/80 xl:text-(length:--fs)"
                style={at(0, 0, { fs: 18.321 })}
              >
                COLOMBIA
              </span>
            </div>
            <p
              data-in="fade"
              className={`mt-10 max-w-[24rem] text-base leading-[1.6] text-black/80 xl:mt-0 xl:w-(--w) xl:max-w-none xl:text-(length:--fs) ${place}`}
              style={at(122, 539, { w: 384, fs: 16 })}
            >
              <strong className="font-bold">VORA</strong> nace en Colombia.
              <br />
              <span className="font-normal">
                Un territorio de contrastes, movimiento y carácter. De aquí viene nuestra forma de crear, avanzar y mirar siempre
                hacia lo que sigue.
              </span>
            </p>
          </div>

          {/* Mobile: two-up grid. xl: the Figma collage, clipped to the section (the port polaroid is not). */}
          <div data-seq="top 65%" className="grid grid-cols-2 items-start gap-4 xl:contents">
            <div className="contents xl:absolute xl:inset-0 xl:block xl:overflow-hidden">
              <Piece src={map.src} alt="Mapa de Colombia en collage cartográfico vintage" x={829.53} y={-24.14} w={529.399} h={674.733} r={4.54} />
              <Piece src={portrait.src} alt="Retrato vintage ante torre multicolor" x={561} y={-17} w={410} h={459} />
              <Piece
                src={palms.src}
                alt="Palmas de cera entre montañas y niebla"
                x={897.29}
                y={638.92}
                w={639.862}
                h={281.187}
                r={1.6}
                className="col-span-2"
              >
                {/* Figma inset shadow: darkens the bottom of the photo under the caption. */}
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 ${u(-88)} ${u(13.4)} 0 rgb(0 0 0 / 0.73)` }} />
              </Piece>
              <Piece
                src={triptych.src}
                alt="Tríptico andino en película retro"
                x={1280.63}
                y={-36.45}
                w={309.146}
                h={723.476}
                r={5.69}
                shadow={[16, 5.9, 0.31]}
              />
              <Piece src={label.src} alt="Etiqueta VORA en polaroid vintage" x={568.56} y={388} w={394.002} h={360.067} />
              <Piece src={ellipse.src} x={686.45} y={616.64} w={138.141} r={17.52} className="max-xl:hidden" />
              <p
                className={`pointer-events-none text-sm font-semibold text-white/50 uppercase max-xl:hidden xl:text-(length:--fs) ${place}`}
                style={at(1246, 850, { fs: 14 })}
              >
                MADE TO MOVE FORWARD
              </p>
            </div>
            <Piece
              src={port.src}
              alt="Polaroid vintage del puerto colonial"
              x={575.5}
              y={657}
              w={402}
              h={288}
              shadow={[16, 10.3, 0.25]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
