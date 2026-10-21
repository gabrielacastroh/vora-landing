import bg from '../../assets/vora/contacto-bg.webp';
import whatsapp from '../../assets/vora/contacto-whatsapp.webp';
import instagram from '../../assets/vora/contacto-instagram.webp';
import mail from '../../assets/vora/contacto-mail.webp';
import tiktok from '../../assets/vora/contacto-tiktok.webp';
import { site } from '../../data/site';

// Icons, copy and order live here; every URL comes from site.json (empty = "#", no new tab).
const channels = [
  { title: 'WHATSAPP', text: 'Atención directa para compras, tallas y pedidos.', action: 'ESCRIBIR POR WHATSAPP', label: 'Escribir por WhatsApp', href: site.social.whatsapp, icon: whatsapp.src, iconClass: 'h-[3.0625rem] w-[3.0625rem]' },
  { title: 'INSTAGRAM', text: 'Colecciones, lanzamientos y novedades.', action: '@VORA.CO_', label: 'Abrir Instagram de VORA', href: site.social.instagram, icon: instagram.src, iconClass: 'h-[3.0625rem] w-[3.0625rem]' },
  { title: 'CORREO', text: 'Consultas generales, propuestas y colaboraciones.', action: site.contact.email, label: 'Enviar un correo a VORA', href: `mailto:${site.contact.email}`, icon: mail.src, iconClass: 'h-[2.1875rem] w-[3.0625rem]' },
  { title: 'TIK TOK', text: 'Contenido, procesos y movimiento detrás de VORA.', action: '@VORA.CO_', label: 'Abrir TikTok de VORA', href: site.social.tiktok, icon: tiktok.src, iconClass: 'h-[3.0625rem] w-[2.6875rem]' },
];

const arrow = (
  <svg aria-hidden="true" viewBox="0 0 19 16" fill="none" stroke="currentColor" strokeWidth="1.23" className="h-[0.9688rem] w-[1.175rem] shrink-0 transition-transform duration-500 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none">
    <path d="M0 7.76H18M11.7 15.12 18 7.76 11.7.4" />
  </svg>
);

/** /contacto: copy on the left, four channel cards on the right, over a dimmed stadium photo. */
export default function Contacto() {
  return (
    <section data-hero className="relative flex min-h-svh flex-col gap-12 overflow-hidden px-6 pt-32 pb-16 sm:px-10 lg:block lg:h-svh lg:min-h-[46rem] lg:p-0">
      <div data-hero-bg className="absolute inset-0">
        {/* Figma frame 460:1502 is 1441x1201 and starts 135px above the page. 108% wide: data-pan drifts +-3% of the width, so the extra 4% per side keeps the edges covered. */}
        <div data-pan className="absolute inset-y-0 -left-[4%] w-[108%] lg:inset-y-auto lg:-top-[8.4375rem] lg:h-[75.0625rem]">
          <img
            data-hero-img
            data-mouse="28"
            alt=""
            src={bg.src}
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-[12%_center] opacity-[0.47] max-lg:opacity-[0.6] lg:object-center"
          />
          <div className="absolute inset-0 bg-black/68 max-lg:bg-black/45" />
          <div data-glow aria-hidden="true" className="pointer-events-none absolute bottom-[8%] left-[4%] size-[34rem] max-w-[80%] rounded-full bg-[#d40732]/20 blur-[7rem]" />
        </div>
      </div>

      <div data-hero-content className="relative mx-auto w-full max-w-360 lg:absolute lg:inset-x-0 lg:top-[22.625rem] lg:pl-[5.5rem]">
        <div className="flex items-center gap-4">
          <span className="font-['Barlow_Condensed'] text-[1.4375rem] font-bold leading-none tracking-[0.1875rem] text-[#d51424]">CONTACTO</span>
          <span data-line className="h-px w-[22.1875rem] max-w-[40vw] bg-linear-to-r from-[#d40732] to-transparent" />
        </div>
        <h1 data-split="lines" data-delay="0.3" className="mt-4 font-mont italic leading-[0.9] text-[#ece6dd]">
          <span className="block text-[2.75rem] font-black sm:text-[4rem] lg:text-[4.6875rem]">SIGAMOS</span>
          <span className="block text-[2.75rem] font-black sm:text-[4rem] lg:text-[4.6875rem]">
            EN MOVIMIENTO<span className="inline-block animate-pulse text-[#6d1212] motion-reduce:animate-none">.</span>
          </span>
        </h1>
        <p data-hero-item className="mt-6 max-w-[32.8rem] text-[1.0625rem] leading-[1.4] text-[#b7b7b5]">
          ¿Tienes preguntas sobre una prenda, disponibilidad, <br className="max-lg:hidden" />
          pedidos o colaboraciones?
          <br />
          <br />
          Puedes comunicarte con <strong className="font-bold text-[#ece6dd]">VORA</strong> directamente a <br className="max-lg:hidden" />
          través de nuestros canales oficiales.
        </p>
      </div>

      <ul data-seq="top 85%" data-mouse="-9" className="relative mx-auto flex w-full max-w-lg flex-col gap-[1.7375rem] lg:absolute lg:top-[8.5rem] lg:right-[calc(50%-45rem+6rem)] lg:mx-0 lg:w-[32rem] lg:max-w-none lg:gap-[1.2rem]">
        {channels.map((c, i) => {
          const external = !!c.href && !c.href.startsWith('mailto:');
          return (
            <li key={c.title} data-in="slide">
              <a
                href={c.href || '#'}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={c.label}
                data-spot
                className="group relative flex h-[9.866rem] lg:h-[clamp(7.25rem,calc((100svh_-_10rem_-_3.6rem)/4),9.866rem)] items-center gap-[1.1rem] border-[0.051rem] border-[#55534f] bg-[#080909]/50 pr-5 pl-5 outline-none backdrop-blur-[2px] transition-[border-color,background-color] duration-500 hover:border-[#d40732] hover:bg-[#1a1213]/70 focus-visible:border-[#d40732] focus-visible:bg-[#1a1213]/70 focus-visible:ring-2 focus-visible:ring-[#d40732] sm:pr-[1.9rem] sm:pl-[1.9rem] motion-reduce:transition-none"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" style={{ background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(212 7 50 / 0.22), transparent 55%)' }} />
                <span className="flex w-[3.0625rem] shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none">
                  <img alt="" src={c.icon} className={`${c.iconClass} max-w-none object-contain`} />
                </span>
                <span aria-hidden="true" className="h-[6.9375rem] w-[0.051rem] shrink-0 bg-[#55534f]" />
                <span className="flex min-w-0 flex-1 flex-col lg:w-[16.869rem] lg:flex-none">
                  <span className="text-[0.6125rem] font-bold leading-none text-[#d40732]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-1.5 font-mont text-[1.3rem] font-bold leading-[1.1] text-[#e5e3e0] sm:text-[1.53rem]">{c.title}</span>
                  <span className="mt-1.5 font-mont text-[0.769rem] leading-[1.4] text-[#b7b7b5]">{c.text}</span>
                  <span className="mt-2 inline-flex items-center gap-2.5 text-[0.72rem] font-bold leading-none text-[#d40732] sm:text-[0.8rem]">
                    <span className="truncate">{c.action}</span>
                    {arrow}
                  </span>
                </span>
                <span data-magnet className="shrink-0 max-lg:ml-auto lg:absolute lg:top-[3.322rem] lg:left-[27.4rem]">
                <span
                  aria-hidden="true"
                  className="flex size-[2.556rem] shrink-0 items-center justify-center rounded-full border border-[#b7b7b5] text-[#b7b7b5] transition-[background-color,border-color,color,transform] duration-500 group-hover:-rotate-45 group-hover:border-[#d40732] group-hover:bg-[#d40732] group-hover:text-white group-focus-visible:-rotate-45 group-focus-visible:border-[#d40732] group-focus-visible:bg-[#d40732] group-focus-visible:text-white motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 19 16" fill="none" stroke="currentColor" strokeWidth="1.23" className="h-[0.9688rem] w-[1.175rem]">
                    <path d="M0 7.76H18M11.7 15.12 18 7.76 11.7.4" />
                  </svg>
                </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
