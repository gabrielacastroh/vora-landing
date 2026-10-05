import voraLogo from '../../assets/vora/vora-logo.png';
import footerSocial1 from '../../assets/vora/footer-social-1.png';
import footerSocial2 from '../../assets/vora/footer-social-2.png';
import footerSocial3 from '../../assets/vora/footer-social-3.png';
import footerCopyrightIcon from '../../assets/vora/footer-copyright-icon.png';

const explora = [
  { label: 'Inicio', href: '/' },
  { label: 'Colección', href: '/coleccion' },
  { label: 'Sobre Vora', href: '#' },
  { label: 'Contacto', href: '#' },
];

const masDeVora = [
  { label: 'Filosofía', href: '#' },
  { label: 'Preguntas Frecuentes', href: '#' },
];

const socials = [
  { label: 'WhatsApp', icon: footerSocial3.src, className: 'size-5' },
  { label: 'Instagram', icon: footerSocial1.src, className: 'size-[1.3125rem]' },
  { label: 'TikTok', icon: footerSocial2.src, className: 'h-5 w-[1.125rem]' },
];

// Figma column widths (341 / 232 / 291 / 209 px) kept as ratios on desktop.
const column = 'flex flex-col gap-[1.1875rem] lg:mt-[1.375rem] lg:h-[10.0625rem] lg:border-l lg:border-white/25 lg:pl-[4.9375rem]';
const linkClass = 'text-[0.8125rem] font-extralight capitalize text-white transition-opacity hover:opacity-70';

function LinkColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className={column}>
      <p className="text-[0.8125rem] font-medium uppercase text-white">{title}</p>
      {items.map((item) => (
        <a key={item.label} href={item.href} className={linkClass}>
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function FrameFooter() {
  return (
    <footer id="contacto" className="relative bg-[#5c141a]">
      <div className="mx-auto w-full max-w-360 px-6 pt-14 pb-12 sm:px-10 lg:pr-[10.9375rem] lg:pl-[12rem] lg:pt-[3.875rem] lg:pb-[3.8125rem]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-12 lg:grid-cols-[341fr_232fr_291fr_209fr] lg:gap-0">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <img alt="VORA" src={voraLogo.src} className="-ml-4 h-[4.875rem] w-auto max-w-none" />
            <div className="mt-[1.1875rem] text-[0.8125rem] font-extralight capitalize leading-normal text-white">
              <p>
                Para <span className="lowercase">quienes no se detienen.</span>
              </p>
              <p>
                una <span className="lowercase">mentalidad en constante movimiento.</span>
              </p>
            </div>
            <p className="font-display mt-10 text-[0.8125rem] uppercase text-[#ece6dd]">AMBICIÓN · PROPÓSITO · EVOLUCIÓN</p>
          </div>

          <LinkColumn title="EXPLORA" items={explora} />
          <LinkColumn title="MÁS DE VORA" items={masDeVora} />

          <div className={`col-span-2 sm:col-span-1 lg:col-span-1 ${column} gap-0! lg:pt-9`}>
            <p className="text-[0.8125rem] font-extralight capitalize leading-normal text-white">sigamos avanzando</p>
            <p className="text-[0.8125rem] font-extralight capitalize leading-normal text-white">
              Encuéntranos <span className="lowercase">en</span>
            </p>
            <div className="mt-[0.9375rem] flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="transition-opacity hover:opacity-70">
                  <img alt="" src={s.icon} className={`${s.className} max-w-none object-cover`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-[0.4375rem] border-t border-white/25 pt-[1.8125rem] lg:mt-12">
          <img alt="" src={footerCopyrightIcon.src} className="size-[0.6875rem] max-w-none object-cover" />
          <p className="font-display text-[0.6875rem] font-thin uppercase leading-none text-white">
            2026 vora, <span className="capitalize">todos</span>
            <span className="lowercase"> los derechos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
