import voraLogo from '../../assets/vora/vora-logo.png';
import { container } from './mask';
import { site } from '../../data/site';

const links = site.nav;

interface Props {
  active: string;
  background?: string;
  theme: 'dark' | 'light';
  logo?: string;
}

/** Static markup; the mobile menu and hide-on-scroll live in scripts/motion.ts. */
export default function FrameNav({ active, background, theme, logo = voraLogo.src }: Props) {
  const activeColor = theme === 'dark' ? '#ffffff' : '#6d1212';
  const idleColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(109,18,18,0.5)';
  const panelBg = theme === 'dark' ? 'bg-[#0b0b0d]' : 'bg-[#ece6dd]';
  const color = (key: string) => ({ color: key === active ? activeColor : idleColor });

  return (
    <>
      <nav data-nav className="fixed inset-x-0 top-0 z-30">
        {background && (
          <img alt="" src={background} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" />
        )}
        <div className={`${container} relative flex items-center justify-between py-6 sm:py-8 lg:py-10`}>
          <a href="/admin-vora" aria-label="VORA — inicio" className="block h-10 shrink-0 sm:h-[3.3125rem]">
            <img alt="VORA" src={logo} className="h-full w-auto max-w-none" />
          </a>

          <div className="hidden items-center gap-10 whitespace-nowrap text-[0.8125rem] font-medium uppercase md:flex">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                aria-current={link.key === active ? 'page' : undefined}
                className="transition-opacity hover:opacity-80"
                style={color(link.key)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            data-menu-toggle
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="vora-menu"
            className="group flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className="block h-px w-6 transition-transform duration-300 group-aria-expanded:translate-y-[3.5px] group-aria-expanded:rotate-45"
              style={{ backgroundColor: activeColor }}
            />
            <span
              className="block h-px w-6 transition-transform duration-300 group-aria-expanded:-translate-y-[3.5px] group-aria-expanded:-rotate-45"
              style={{ backgroundColor: activeColor }}
            />
          </button>
        </div>
      </nav>

      {/* Sibling of the nav, not a child: the nav gets transformed on scroll, which would trap a fixed child. */}
      <div id="vora-menu" hidden className={`fixed inset-0 z-20 flex flex-col justify-center gap-8 px-6 sm:px-10 md:hidden ${panelBg}`}>
        {links.map((link) => (
          <div key={link.key} className="overflow-hidden">
            <a
              href={link.href}
              data-menu-link
              aria-current={link.key === active ? 'page' : undefined}
              className="font-display block text-4xl font-black uppercase"
              style={color(link.key)}
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
