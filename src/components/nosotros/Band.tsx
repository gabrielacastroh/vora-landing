import { at, place, stageVars } from './stage';

import band from '../../assets/vora/nosotros-band.webp';
import sequence from '../../assets/vora/nosotros-secuencia.gif';

/** Full-bleed photo with the "VORA es movimiento con intención." statement, then the animated AMBICIÓN strip. */
export default function Band() {
  return (
    <>
      <section data-seq="top 35%" className="@container relative isolate overflow-hidden bg-[#2a0a0c]">
      {/* Figma: photo with a rgba(107,1,1,.26) tint. */}
      <img
        data-ken
        alt="Camiseta Keep Going vista de espaldas bajo luz urbana"
        src={band.src}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 size-full max-w-none object-cover object-[30%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[rgba(107,1,1,0.26)]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent xl:hidden" />
        <div
          className="relative mx-auto flex min-h-[34rem] w-full max-w-360 flex-col justify-end px-6 pt-72 pb-12 sm:min-h-[40rem] sm:px-10 xl:block xl:aspect-[1440/632] xl:min-h-0 xl:p-0"
          style={stageVars}
        >
          <div className="relative xl:contents">
            <p
              data-in="fade"
              className={`font-sans text-xl font-semibold text-[#d51722] xl:text-(length:--fs) ${place}`}
              style={at(743, 183, { fs: 20 })}
            >
              VORA ES
            </p>
            <h2
              data-split="lines"
              className={`font-display text-[2.25rem] leading-[1.1] font-black text-[#ece6dd] italic sm:text-[3.5rem] xl:w-(--w) xl:text-(length:--fs) xl:leading-[normal] ${place}`}
              style={at(743, 203, { w: 588, fs: 63.514 })}
            >
              <span className="block">MOVIMIENTO</span>
              <span className="block">
                CON INTENCIÓN<span className="text-white">.</span>
              </span>
            </h2>
            <span
              data-in="draw"
              className={`my-5 block h-px w-[8.375rem] bg-[#fb000f] xl:my-0 xl:h-px xl:w-(--w) ${place}`}
              style={at(743, 365, { w: 134 })}
            />
            <p
              data-in="fade"
              className={`max-w-[36.75rem] text-base leading-[1.6] font-medium text-white/80 sm:text-lg xl:w-(--w) xl:max-w-none xl:text-(length:--fs) ${place}`}
              style={at(743, 390, { w: 588, fs: 18.321 })}
            >
              Piezas gráficas y versátiles que acompañan distintas formas de avanzar.
            </p>
          </div>
        </div>
      </section>

      {/* Animated GIF, 1440 × 150: below md it is cropped around the centred word instead of shrinking it. */}
      <div data-seq="top 90%" className="overflow-hidden bg-[#c8102e]">
        <div data-in="wipe" data-from="up">
          <img
            alt="AMBICIÓN"
            src={sequence.src}
            width={sequence.width}
            height={sequence.height}
            loading="lazy"
            decoding="async"
            className="block h-20 w-full max-w-none object-cover object-center md:h-auto md:aspect-[1440/150]"
          />
        </div>
      </div>
    </>
  );
}
