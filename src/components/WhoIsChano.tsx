import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function WhoIsChano() {
  const root = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.who-photo', {
        opacity: 0, x: -30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
      gsap.from('.who-text > *', {
        opacity: 0, y: 20, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-28 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <img src="/chano.jpg" alt="Foto de Chano entrenando" className="who-photo aspect-[4/5] rounded-[20px] card-grain object-cover" />
        <div className="who-text">
          <div className="text-[var(--accent-light)] text-[13px] font-semibold uppercase tracking-[0.14em] mb-4">
            {t('whoIs.label')}
          </div>
          <h2 className="font-display font-bold text-[clamp(24px,3.4vw,34px)] leading-tight mb-6 text-balance">
            {t('whoIs.heading')}
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-4">
            {t('whoIs.p1')}
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            {t('whoIs.p2')}
          </p>
        </div>
      </div>
    </section>
  );
}
