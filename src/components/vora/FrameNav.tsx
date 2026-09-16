import voraLogo from '../../assets/vora/vora-logo.png';

const geist = { fontFamily: 'Geist, sans-serif' } as const;

const links = [
  { label: 'inicio', href: '/', key: 'inicio' },
  { label: 'colección', href: '/coleccion', key: 'coleccion' },
  { label: 'ropa', href: '#', key: 'ropa' },
  { label: 'nosotros', href: '#', key: 'nosotros' },
  { label: 'contacto', href: '#contacto', key: 'contacto' },
];

interface Props {
  active: string;
  background: string;
  theme: 'dark' | 'light';
  logo?: string;
}

export default function FrameNav({ active, background, theme, logo = voraLogo.src }: Props) {
  const activeColor = theme === 'dark' ? '#ffffff' : '#6d1212';
  const idleColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(109,18,18,0.5)';

  return (
    <nav className="absolute left-0 top-0 flex w-[1440px] items-center justify-between px-[60px] py-[40px]">
      <img alt="" src={background} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      <a href="/" aria-label="VORA — inicio" className="relative h-[53px] w-[131px] shrink-0">
        <img alt="VORA" src={logo} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
      </a>
      <div
        className="relative flex h-[37px] w-[461px] items-center justify-center gap-[40px] whitespace-nowrap text-center text-[13px] font-medium uppercase"
        style={geist}
      >
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="shrink-0 leading-[normal] transition-opacity hover:opacity-80"
            style={{ color: link.key === active ? activeColor : idleColor }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
