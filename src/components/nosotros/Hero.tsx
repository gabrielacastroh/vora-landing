import heroBg from '../../assets/vora/nosotros-hero-bg.webp';

/** "MADE TO MOVE FORWARD": dark hero over a blurred street photo that drifts slowly (data-pan). */
export default function Hero() {
  return (
    <section data-hero className="relative flex min-h-svh flex-col justify-center overflow-hidden lg:block lg:h-[66.1875rem] lg:min-h-0">
      <div data-hero-bg className="absolute inset-0">
        {/* Figma frame 425:150 is 1868 wide, shifted 264px left of the page: the extra width is the pan range. */}
        <div
          data-pan
          className="absolute inset-0 opacity-[0.38] lg:right-auto lg:bottom-auto lg:-left-[18.33%] lg:top-[0.7%] lg:h-[104.47%] lg:w-[129.72%]"
        >
          <img
            data-hero-img
            alt=""
            src={heroBg.src}
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[72%_center] opacity-[0.84] lg:object-center"
          />
          <div className="absolute inset-0 bg-black/26" />
        </div>
      </div>

      <div
        data-hero-content
        className="relative mx-auto w-full max-w-360 px-6 pt-28 pb-16 sm:px-10 lg:pt-[19.1875rem] lg:pr-0 lg:pb-0 lg:pl-[4.9375rem]"
      >
        <h1 data-split="lines" data-delay="0.3" className="font-mont italic leading-[0.8] text-[#ece6dd]">
          <span className="block text-[1.75rem] font-normal sm:text-[2.5rem] lg:text-[3.371rem]">MADE TO</span>
          <span className="block text-[3.5rem] font-black sm:text-[5rem] lg:text-[6.336rem]">MOVE</span>
          <span className="block text-[3.5rem] font-black sm:text-[5rem] lg:text-[6.336rem]">FORWARD</span>
        </h1>
        <p data-hero-item className="mt-7 max-w-[39.5rem] font-mont text-base leading-[1.27] text-[#ece6dd]">
          VORA nace para quienes no temen redefinirse. Somos un proyecto <br className="max-lg:hidden" />
          impulsado por el diseño, para una generación que entiende <br className="max-lg:hidden" />
          el movimiento como una forma de ser.
        </p>
        <a
          data-hero-item
          href="#adn"
          className="mt-10 inline-flex h-[1.875rem] items-center rounded-[2px] bg-[#6d1212] px-3.5 font-mont text-base font-bold leading-[0.8] text-white transition-colors hover:bg-[#8a1717] lg:mt-[3.5rem] lg:w-[14.495rem]"
        >
          CONOCE NUESTRO ADN
        </a>
      </div>
    </section>
  );
}
