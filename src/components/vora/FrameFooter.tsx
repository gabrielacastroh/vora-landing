import voraLogo from '../../assets/vora/vora-logo.png';
import footerSocial1 from '../../assets/vora/footer-social-1.png';
import footerSocial2 from '../../assets/vora/footer-social-2.png';
import footerSocial3 from '../../assets/vora/footer-social-3.png';
import footerCopyrightIcon from '../../assets/vora/footer-copyright-icon.png';
import line7 from '../../assets/vora/line-7.svg';
import line8 from '../../assets/vora/line-8.svg';

const archivo = { fontFamily: 'Archivo, sans-serif' } as const;
const geist = { fontFamily: 'Geist, sans-serif' } as const;

const explora = [
  { label: 'Inicio', href: '/', top: 120, width: 39 },
  { label: 'Colección', href: '/coleccion', top: 156, width: 65 },
  { label: 'Sobre Vora', href: '#', top: 192, width: 74 },
  { label: 'Contacto', href: '#', top: 228, width: 74 },
];

const masDeVora = [
  { label: 'Filosofía', href: '#', top: 120, width: 65 },
  { label: 'Preguntas Frecuentes', href: '#', top: 156, width: 133 },
];

export default function FrameFooter({ left, top }: { left: number; top: number }) {
  return (
    <footer id="contacto" className="absolute h-[394px] w-[1440px] overflow-clip bg-[#5c141a]" style={{ left, top }}>
      <img alt="VORA" src={voraLogo.src} className="absolute h-[78px] w-[193px] max-w-none object-cover" style={{ left: 176, top: 62 }} />

      <div className="absolute whitespace-nowrap text-[13px] capitalize leading-[normal] text-white" style={{ left: 192, top: 159, ...geist }}>
        <p className="font-extralight">
          Para <span className="lowercase">para quienes no se detienen.</span>
        </p>
        <p className="font-extralight">
          una <span className="lowercase">mentalidad en constante movimiento.</span>
        </p>
      </div>

      <p
        className="absolute whitespace-nowrap text-[13px] font-normal uppercase leading-[normal] text-[#ece6dd]"
        style={{ left: 192, top: 231, ...archivo }}
      >
        AMBICIÓN · PROPÓSITO · EVOLUCIÓN
      </p>

      <p className="absolute whitespace-nowrap text-[13px] font-medium uppercase leading-[normal] text-white" style={{ left: 612, top: 84, ...geist }}>
        EXPLORA
      </p>
      {explora.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="absolute h-[17px] text-[13px] font-extralight capitalize leading-[normal] text-white"
          style={{ left: 612, top: item.top, width: item.width, ...geist }}
        >
          {item.label}
        </a>
      ))}

      <p className="absolute whitespace-nowrap text-[13px] font-medium uppercase leading-[normal] text-white" style={{ left: 844, top: 84, ...geist }}>
        MÁS DE VORA
      </p>
      {masDeVora.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="absolute h-[17px] text-[13px] font-extralight capitalize leading-[normal] text-white"
          style={{ left: 844, top: item.top, width: item.width, ...geist }}
        >
          {item.label}
        </a>
      ))}

      <div className="absolute h-[34px] w-[130px] text-[13px] font-extralight capitalize text-white" style={{ left: 1135, top: 120, ...geist }}>
        <p className="leading-[normal]">sigamos avanzando</p>
        <p className="leading-[normal]">
          Encuéntranos <span className="lowercase">en</span>
        </p>
      </div>
      <a href="#" aria-label="Instagram" className="absolute size-[20px]" style={{ left: 1135, top: 169 }}>
        <img alt="" src={footerSocial3.src} className="absolute inset-0 size-full max-w-none object-cover" />
      </a>
      <a href="#" aria-label="TikTok" className="absolute size-[21px]" style={{ left: 1167, top: 169 }}>
        <img alt="" src={footerSocial1.src} className="absolute inset-0 size-full max-w-none object-cover" />
      </a>
      <a href="#" aria-label="WhatsApp" className="absolute h-[20px] w-[18px]" style={{ left: 1199, top: 170 }}>
        <img alt="" src={footerSocial2.src} className="absolute inset-0 size-full max-w-none object-cover" />
      </a>

      <div className="absolute h-0 w-[1073px]" style={{ left: 192, top: 293 }}>
        <div className="absolute inset-[-0.25px_0_0_0]">
          <img alt="" src={line7.src} className="block size-full max-w-none" />
        </div>
      </div>

      {[533, 765, 1056].map((x) => (
        <div key={x} className="absolute flex h-[161px] w-0 items-center justify-center" style={{ left: x, top: 84 }}>
          <div className="flex-none rotate-90">
            <div className="relative h-0 w-[161px]">
              <div className="absolute inset-[-0.25px_0_0_0]">
                <img alt="" src={line8.src} className="block size-full max-w-none" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <img alt="" src={footerCopyrightIcon.src} className="absolute size-[11px] max-w-none object-cover" style={{ left: 192, top: 322 }} />
      <p
        className="absolute h-[11px] w-[219px] text-[11px] font-thin uppercase leading-[normal] text-white"
        style={{ left: 210, top: 322, ...archivo }}
      >
        2026 vora, <span className="capitalize">todos</span>
        <span className="lowercase"> los derechos reservados.</span>
      </p>
    </footer>
  );
}
