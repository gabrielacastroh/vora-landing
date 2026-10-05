/**
 * Site-wide motion. Components only declare intent with data attributes; this
 * file owns every animation so pages ship as static HTML (no React runtime).
 *
 *   data-split="lines|words|chars"  masked text reveal (data-delay = play on load)
 *   data-reveal                      fade-up, batched so siblings stagger
 *   data-clip                        image wipe-up with inner zoom-out
 *   data-speed="0.1"                 scroll parallax (negative = opposite way)
 *   data-line                        hairline drawn left → right
 *   data-drift                       lines slide in at different speeds (scrubbed)
 *   data-skew                        skews with scroll velocity
 *   data-glow                        slow breathing light
 *   data-hero / data-statement       page-specific timelines
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = 'expo.out';
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

let lenis: Lenis | null = null;

// Signal that the bundle is running before awaiting anything, so the inline fallback in
// Layout only reveals content when the script truly failed to load.
(window as Window & { __voraMotion?: boolean }).__voraMotion = true;

initMenu();
initSliders();

// Card → product morph: name only the clicked card's image right before the old page is captured.
for (const el of $$('[data-vt]')) {
  el.closest('a')?.addEventListener('click', () => {
    el.style.setProperty('view-transition-name', el.dataset.vt!);
    el.style.setProperty('view-transition-class', 'product');
  });
}

// Remember which arrow was used so the next page can play the swap in the right direction.
for (const link of $$('[data-dir]')) {
  link.addEventListener('click', () => {
    try {
      sessionStorage.setItem('vora-dir', link.dataset.dir!);
    } catch {}
  });
}

// Split text only once the webfonts are in: measuring fallback metrics makes SplitText
// re-split (and kill its ScrollTriggers) in the middle of ScrollTrigger's first refresh.
await document.fonts.ready;

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  lenis = new Lenis({ lerp: 0.09, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Content swapped in place by the product-swap view transition is already visible.
  const swapped = document.documentElement.hasAttribute('data-swap');
  hero();
  statement();
  if (!swapped) {
    splits();
    reveals();
  }
  clips();
  parallax();
  lines();
  drift();
  glow();
  skew(lenis);
  navAutoHide();

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
});

// Packshots tilt toward the cursor like an object held in the hand. Mouse only: touch has no hover.
gsap.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
  const offs = $$('[data-tilt]').map((img) => {
    const area = img.closest<HTMLElement>('[data-slider]')!;
    gsap.set(img, { transformPerspective: 900, transformOrigin: '50% 50%' });
    const rx = gsap.quickTo(img, 'rotationX', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(img, 'rotationY', { duration: 0.8, ease: 'power3' });
    const shadow = gsap.quickTo(img, '--tilt-x', { duration: 0.8, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ry(x * 28);
      rx(-y * 18);
      shadow(-x * 40);
    };
    const leave = () => (rx(0), ry(0), shadow(0));
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    return () => {
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerleave', leave);
    };
  });
  return () => offs.forEach((off) => off());
});

function splits() {
  for (const el of $$('[data-split]')) {
    const type = el.dataset.split as 'lines' | 'words' | 'chars';
    const delay = el.dataset.delay;
    SplitText.create(el, {
      // Chars are grouped in words so a word never breaks across lines.
      type: type === 'chars' ? 'words,chars' : type,
      mask: type,
      // Visually split copy is aria-hidden and a screen-reader copy keeps the sentence intact;
      // the default puts aria-label on <p>, which is not allowed on generic elements.
      aria: 'hidden',
      // Keep intentional spacing (e.g. "LOOKBOOK   /   01"); JSX emits no stray whitespace.
      reduceWhiteSpace: false,
      autoSplit: true,
      onSplit(self) {
        el.style.visibility = 'visible';
        return gsap.from(self[type], {
          yPercent: 115,
          duration: type === 'chars' ? 1 : 1.3,
          ease: EASE,
          stagger: type === 'chars' ? 0.022 : 0.1,
          delay: delay ? Number(delay) : 0,
          scrollTrigger: delay ? undefined : { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      },
    });
  }
}

function reveals() {
  gsap.set('[data-reveal]', { autoAlpha: 0, y: '3rem' });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top bottom',
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE, stagger: 0.1, overwrite: true }),
  });
}

function clips() {
  for (const el of $$('[data-clip]')) {
    const img = el.querySelector('img');
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
      .from(img, { scale: 1.35, duration: 2, ease: EASE, clearProps: 'transform' }, 0.1)
      // Drop the clip once open so box-shadows and hover zooms are not cut off.
      .set(el, { clipPath: 'none' });
  }
}

function parallax() {
  for (const el of $$('[data-speed]')) {
    const speed = Number(el.dataset.speed);
    gsap.fromTo(
      el,
      { y: () => speed * innerHeight * 0.5 },
      {
        y: () => -speed * innerHeight * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      },
    );
  }
}

function lines() {
  for (const el of $$('[data-line]')) {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' } },
    );
  }
}

/** "MADE TO / MOVE / FORWARD": each line catches up from further back — moving forward. */
function drift() {
  for (const el of $$('[data-drift]')) {
    SplitText.create(el, {
      type: 'lines',
      aria: 'hidden',
      autoSplit: true,
      onSplit(self) {
        el.style.visibility = 'visible';
        return gsap.fromTo(
          self.lines,
          { xPercent: (i) => -18 * (i + 1), autoAlpha: 0 },
          {
            xPercent: 0,
            autoAlpha: 1,
            ease: 'power2.out',
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: 1 },
          },
        );
      },
    });
  }
}

function glow() {
  for (const el of $$('[data-glow]')) {
    gsap.to(el, { scale: 1.18, opacity: 0.65, duration: gsap.utils.random(4, 6), ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }
}

function skew(scroller: Lenis) {
  const targets = $$('[data-skew]');
  if (!targets.length) return;
  const setters = targets.map((t) => gsap.quickTo(t, 'skewY', { duration: 0.6, ease: 'power3.out' }));
  const clamp = gsap.utils.clamp(-5, 5);
  scroller.on('scroll', ({ velocity }: Lenis) => {
    const value = clamp(velocity * 0.25);
    for (const set of setters) set(value);
  });
}

function hero() {
  const root = document.querySelector<HTMLElement>('[data-hero]');
  if (!root) return;

  // Scale only: the hero image is the LCP element, so it must be painted from the first frame.
  gsap.fromTo('[data-hero-img]', { scale: 1.3 }, { scale: 1, duration: 2.6, ease: EASE });
  gsap.fromTo('[data-nav]', { yPercent: -100 }, { yPercent: 0, duration: 1.2, ease: EASE, delay: 0.6 });
  gsap.fromTo(
    '[data-hero-item]',
    { autoAlpha: 0, y: '2rem' },
    { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE, stagger: 0.12, delay: 1 },
  );

  // Leaving the hero: background sinks, copy lifts and fades.
  const scrub = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-bg]', { yPercent: 22, ease: 'none', scrollTrigger: scrub });
  gsap.to('[data-hero-content]', { yPercent: -12, autoAlpha: 0, ease: 'none', scrollTrigger: { ...scrub, end: '80% top' } });
}

function statement() {
  const root = document.querySelector<HTMLElement>('[data-statement]');
  if (!root) return;
  const range = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true };
  gsap.fromTo($$('[data-statement-photo]', root), { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: range });
  gsap.fromTo(
    '[data-statement-diagonal]',
    { xPercent: -45 },
    { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 25%', scrub: 1 } },
  );
}

function navAutoHide() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const show = (visible: boolean) => gsap.to(nav, { yPercent: visible ? 0 : -100, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  ScrollTrigger.create({
    start: 160,
    end: 'max',
    onUpdate: (self) => show(self.direction === -1),
    onLeaveBack: () => show(true),
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById('vora-menu');
  if (!toggle || !panel) return;
  const links = $$('[data-menu-link]', panel);

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    panel.hidden = !open;
    if (open) {
      lenis?.stop();
      gsap.fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut' });
      gsap.fromTo(links, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: EASE, stagger: 0.06, delay: 0.25 });
    } else {
      lenis?.start();
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
}

/**
 * Product image slider: curtain wipe in the travel direction, incoming image settles from a zoom
 * while the outgoing one drifts back. Works without motion too (instant swap).
 */
function initSliders() {
  for (const root of $$('[data-slider]')) {
    const slides = $$('[data-slide]', root);
    if (slides.length < 2) continue;
    const dots = $$<HTMLButtonElement>('[data-slide-dot]', root);
    const fills = $$('[data-slide-fill]', root);
    const arrow = root.querySelector<SVGElement>('[data-slide-arrow]');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let busy = false;

    const go = (to: number) => {
      to = (to + slides.length) % slides.length;
      if (to === current || busy) return;
      const dir = to > current ? 1 : -1;
      const from = slides[current];
      const next = slides[to];
      const fromImg = from.querySelector('img');
      const nextImg = next.querySelector('img');

      dots.forEach((d, i) => (i === to ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
      slides.forEach((s, i) => s.setAttribute('aria-hidden', String(i !== to)));
      const last = to === slides.length - 1;
      root.querySelector('[data-slide-next]')?.setAttribute('aria-label', last ? 'Volver a la primera imagen' : 'Siguiente imagen');
      current = to;

      if (reduce) {
        gsap.set(slides, { zIndex: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(next, { zIndex: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(fills, { scaleY: (i) => (i < to ? 1 : 0) });
        gsap.set(arrow, { rotation: last ? 180 : 0 });
        return;
      }

      busy = true;
      gsap.set(slides, { zIndex: 0 });
      gsap.set(from, { zIndex: 1 });
      gsap.set(next, { zIndex: 2 });
      gsap
        .timeline({ defaults: { duration: 1.2, ease: 'expo.inOut' } })
        .fromTo(
          next,
          { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)' },
          0,
        )
        .fromTo(nextImg, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: EASE }, 0)
        .to(fromImg, { yPercent: -14 * dir }, 0)
        .to(fills, { scaleY: (i) => (i < to ? 1 : 0), duration: 1 }, 0.1)
        .to(arrow, { rotation: last ? 180 : 0, duration: 0.8, ease: 'power3.inOut' }, 0.2)
        // Unlock as soon as the curtain lands; the zoom keeps settling but must not block input.
        .call(
          () => {
            gsap.set(from, { clipPath: 'inset(100% 0% 0% 0%)' });
            gsap.set(fromImg, { yPercent: 0 });
            busy = false;
          },
          [],
          1.2,
        );
    };

    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
    root.querySelector('[data-slide-next]')?.addEventListener('click', () => go(current + 1));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(current + 1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(current - 1);
      else return;
      e.preventDefault();
    });

    // Horizontal swipe (touch/pen); vertical drags stay page scroll.
    let start: { x: number; y: number } | null = null;
    root.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') start = { x: e.clientX, y: e.clientY };
    });
    root.addEventListener('pointerup', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
    });
  }
}

