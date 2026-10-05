import { useEffect, useState } from 'react';
import voraLogo from '../../assets/vora/vora-logo.png';
import { container } from './mask';

const links = [
  { label: 'inicio', href: '/', key: 'inicio' },
  { label: 'colección', href: '/coleccion', key: 'coleccion' },
  { label: 'ropa', href: '#', key: 'ropa' },
  { label: 'nosotros', href: '#', key: 'nosotros' },
  { label: 'contacto', href: '#contacto', key: 'contacto' },
];

interface Props {
  active: string;
  background?: string;
  theme: 'dark' | 'light';
  logo?: string;
}

export default function FrameNav({ active, background, theme, logo = voraLogo.src }: Props) {
  const [open, setOpen] = useState(false);
  const activeColor = theme === 'dark' ? '#ffffff' : '#6d1212';
  const idleColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(109,18,18,0.5)';
  const panelBg = theme === 'dark' ? 'bg-[#0b0b0d]/95' : 'bg-[#ece6dd]/95';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav className="absolute inset-x-0 top-0 z-30">
      {background && (
        <img alt="" src={background} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      )}
      <div className={`${container} relative z-10 flex items-center justify-between py-6 sm:py-8 lg:py-10`}>
        <a href="/" aria-label="VORA — inicio" className="relative z-10 block h-10 shrink-0 sm:h-[3.3125rem]">
          <img alt="VORA" src={logo} className="h-full w-auto max-w-none" />
        </a>

        <div className="hidden items-center gap-10 whitespace-nowrap text-[0.8125rem] font-medium uppercase md:flex">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              aria-current={link.key === active ? 'page' : undefined}
              className="transition-opacity hover:opacity-80"
              style={{ color: link.key === active ? activeColor : idleColor }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="vora-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="block h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: activeColor,
                transform: open ? `translateY(${i ? -3.5 : 3.5}px) rotate(${i ? -45 : 45}deg)` : undefined,
              }}
            />
          ))}
        </button>
      </div>

      <div
        id="vora-menu"
        hidden={!open}
        className={`fixed inset-0 flex flex-col justify-center gap-8 px-6 backdrop-blur-sm sm:px-10 md:hidden ${panelBg}`}
      >
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={link.key === active ? 'page' : undefined}
            className="font-display text-4xl font-black uppercase"
            style={{ color: link.key === active ? activeColor : idleColor }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
