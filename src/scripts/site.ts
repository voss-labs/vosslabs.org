type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'voss-theme';

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');

  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (moonIcon) moonIcon.style.display = 'none';
    if (sunIcon) sunIcon.style.display = 'block';
  } else {
    root.removeAttribute('data-theme');
    if (moonIcon) moonIcon.style.display = 'block';
    if (sunIcon) sunIcon.style.display = 'none';
  }
}

function initTheme(): void {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  const toggle = document.getElementById('themeToggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next: Theme = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  });
}

function initMobileMenu(): void {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initRevealObserver(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => observer.observe(el));

  document.querySelectorAll<HTMLElement>('#hero [data-reveal]').forEach((el, i) => {
    window.setTimeout(() => el.classList.add('revealed'), 200 + i * 120);
  });
}

function initNavScroll(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = (): void => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initActiveNav(): void {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"]');
  if (navLinks.length === 0) return;

  const targets = new Map<string, HTMLAnchorElement>();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.length > 1) targets.set(href.slice(1), link);
  });

  const sections = Array.from(targets.keys())
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length === 0) return;

  const setActive = (id: string | null): void => {
    navLinks.forEach((link) => {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    });
    if (id) {
      const link = targets.get(id);
      if (link) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) {
        setActive(visible[0]!.target.id);
      }
    },
    { rootMargin: '-20% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  sections.forEach((section) => observer.observe(section));
}

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function init(): void {
  initTheme();
  initMobileMenu();
  initRevealObserver();
  initNavScroll();
  initActiveNav();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
