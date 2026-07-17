import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
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
          <a href="#metodo" className="hover:text-white transition-colors duration-200">{t('nav.method')}</a>
          <a href="#planes" className="hover:text-white transition-colors duration-200">{t('nav.plans')}</a>
          <a href="#testimonios" className="hover:text-white transition-colors duration-200">{t('nav.testimonials')}</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">{t('nav.faq')}</a>
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
      </div>
    </nav>
  );
}
