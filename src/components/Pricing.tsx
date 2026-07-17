import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const root = useRef<HTMLDivElement>(null);
  const { t, tv } = useLanguage();

  const plans = tv('pricing.plans') as { name: string; price: string; features: string[] }[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.price-card', {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
  }, []);

  return (
    <section id="planes" ref={root} className="py-16 md:py-28 px-6 border-t border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-bold text-center text-[clamp(26px,4vw,38px)] mb-3">
          {t('pricing.heading')}
        </h2>
        <p className="text-center text-white/50 mb-10 md:mb-16">{t('pricing.subheading')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => {
            const featured = i === 1;
            return (
              <div
                key={p.name}
                onMouseEnter={featured ? undefined : onEnter}
                onMouseLeave={featured ? undefined : onLeave}
                className={`price-card rounded-[20px] p-6 md:p-8 ${
                  featured
                    ? 'bg-[var(--accent)] md:scale-[1.04] shadow-[0_20px_60px_-20px_rgba(59,110,165,0.5)] relative'
                    : 'bg-[var(--surface-2)] border border-white/[0.07] cursor-pointer'
                }`}
              >
                {featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[var(--accent)] text-[11px] font-bold px-4 py-1 rounded-full tracking-wide">
                    {t('pricing.badge')}
                  </div>
                )}
                <div className={`text-base font-semibold mb-1 ${featured ? 'text-white' : 'text-white'}`}>{p.name}</div>
                <div className={`font-mono-num text-[clamp(28px,5vw,38px)] font-bold mb-1 ${featured ? 'text-white' : 'text-white'}`}>{p.price}</div>
                <div className={`text-xs mb-6 ${featured ? 'text-white/70' : 'text-white/40'}`}>{t('pricing.oneTime')}</div>
                <ul className="flex flex-col gap-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${featured ? 'text-white/90' : 'text-white/75'}`}>
                      <Check size={16} className={featured ? 'text-white shrink-0 mt-0.5' : 'text-[var(--accent-light)] shrink-0 mt-0.5'} strokeWidth={2.6} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp', { detail: { plan: p.name } }))}
                  className={`w-full py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    featured
                      ? 'bg-white text-[var(--accent)] hover:bg-white/90'
                      : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                >
                  {t('pricing.choosePrefix')} {p.name}
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-center text-white/40 text-sm mt-11">
          {t('pricing.paymentInfo')}
        </p>
      </div>
    </section>
  );
}
