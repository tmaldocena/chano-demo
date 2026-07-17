import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  const stats = [
    { num: t('hero.stat1Num'), label: t('hero.stat1Label') },
    { num: t('hero.stat2Num'), label: t('hero.stat2Label') },
    { num: t('hero.stat3Num'), label: t('hero.stat3Label') },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 14, duration: 0.6 })
        .from('.hero-title-line', { opacity: 0, y: 30, stagger: 0.12, duration: 0.8 }, '-=0.3')
        .from('.hero-lead', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { opacity: 0, y: 16, duration: 0.6 }, '-=0.45');

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      stats.forEach((s, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const numEl = el.querySelector('.stat-num');
        if (!numEl) return;

        const raw = s.num;
        const suffix = raw.replace(/[0-9]/g, '');
        const target = parseFloat(raw);

        if (isNaN(target)) return;

        const proxy = { val: 0 };
        gsap.fromTo(proxy, { val: 0 }, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
          },
          onUpdate() {
            numEl.textContent = Math.round(proxy.val) + suffix;
          },
        });

        gsap.from(el, {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[88vh] flex items-center overflow-hidden pt-32 pb-20 px-6">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 bg-[var(--bg)]/70" />
      </div>
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        <div className="max-w-xl">
          <div className="hero-eyebrow inline-flex items-center gap-2 text-[var(--accent-light)] text-[13px] font-semibold tracking-[0.14em] uppercase mb-6 border border-[var(--accent)]/30 rounded-full px-4 py-1.5 bg-[var(--accent)]/10">
            {t('hero.eyebrow')}
          </div>
          <h1 className="font-display font-bold text-[clamp(34px,5.4vw,58px)] leading-[1.05] tracking-[-0.02em] mb-6 text-balance">
            <span className="hero-title-line block">{t('hero.title1')}</span>
            <span className="hero-title-line block text-[var(--accent-light)]">{t('hero.title2')}</span>
          </h1>
          <p className="hero-lead text-white/60 text-lg leading-relaxed max-w-md mb-9">
            {t('hero.lead')}
          </p>
          <div className="hero-cta flex flex-wrap items-center gap-6 mb-16">
            <a
              href="#planes"
              className="btn-magnetic inline-flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-base font-semibold pl-7 pr-2 py-2 rounded-full"
            >
              {t('hero.cta')}
              <span className="bg-white text-[var(--accent)] rounded-full p-2 flex items-center justify-center">
                <ArrowRight size={18} strokeWidth={2.4} />
              </span>
            </a>
            <a href="#planes" className="text-white/80 hover:text-white font-medium text-[15px] border-b border-white/30 pb-0.5 transition-colors">
              {t('hero.viewPlans')}
            </a>
          </div>
          <div className="flex gap-10 flex-wrap">
            {stats.map((s, i) => (
              <div key={s.label} ref={(el) => { statRefs.current[i] = el; }} className="hero-stat">
                <div className="font-mono-num text-3xl font-bold text-[var(--accent-light)] stat-num">{s.num}</div>
                <div className="text-[11px] text-white/40 uppercase tracking-[0.08em] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
