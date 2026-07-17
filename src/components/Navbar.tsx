import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['method', 'plans', 'testimonials', 'faq'] as const;
const navHrefs = ['#metodo', '#planes', '#testimonios', '#faq'];

export default function Navbar() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScroll = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
        lastScroll = y;
        return;
      }
      if (y > lastScroll + 5) {
        gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.in' });
      } else if (y < lastScroll - 5) {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      }
      lastScroll = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => {
    gsap.to(drawerRef.current, { x: '100%', duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: () => setMobileOpen(false) });
  };

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const handleLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)';
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <img src="/chano-logo.png" alt="Chano" className="h-8" />

        <div className="hidden md:flex items-center gap-9 text-sm font-medium text-white/60">
          {navLinks.map((key, i) => (
            <a key={key} href={navHrefs[i]} className="hover:text-white transition-colors duration-200">{t(`nav.${key}`)}</a>
          ))}
          <div className="flex items-center border border-white/20 rounded-full text-xs overflow-hidden">
            {(['es', 'en'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-3 py-1.5 font-semibold uppercase transition-colors duration-200 ${
                  locale === l ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            ref={btnRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp'))}
            className="btn-magnetic inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold pl-5 pr-1.5 py-1.5 rounded-full"
          >
            {t('nav.startNow')}
            <span className="bg-white text-[var(--accent)] rounded-full p-1.5 flex items-center justify-center">
              <ArrowRight size={14} strokeWidth={2.6} />
            </span>
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {mobileOpen && (
        <>
          <div ref={overlayRef} className="fixed inset-0 bg-black/60 z-40" onClick={closeMobile} />
          <div ref={drawerRef} className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--bg)] border-l border-white/10 z-50 flex flex-col px-6 pt-[env(safe-area-inset-top)]">
            <div className="flex items-center justify-between py-4 border-b border-white/10 mb-4">
              <img src="/chano-logo.png" alt="Chano" className="h-7" />
              <button onClick={closeMobile} className="text-white/60 hover:text-white" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((key, i) => (
                <a
                  key={key}
                  href={navHrefs[i]}
                  onClick={closeMobile}
                  className="text-white/70 hover:text-white hover:bg-white/5 rounded-lg px-3 py-3 text-[15px] font-medium transition-colors"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </div>

            <div className="mt-6 mb-6">
              <div className="flex items-center border border-white/20 rounded-full text-xs overflow-hidden w-fit">
                {(['es', 'en'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-4 py-2 font-semibold uppercase transition-colors duration-200 ${
                      locale === l ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pb-[env(safe-area-inset-bottom)]">
              <button
                onClick={() => { closeMobile(); window.dispatchEvent(new CustomEvent('open-whatsapp')); }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-semibold pl-5 pr-1.5 py-2.5 rounded-full transition-colors"
              >
                {t('nav.startNow')}
                <span className="bg-white text-[var(--accent)] rounded-full p-1.5 flex items-center justify-center">
                  <ArrowRight size={14} strokeWidth={2.6} />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
