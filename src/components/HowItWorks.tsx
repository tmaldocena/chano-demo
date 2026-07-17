import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t, tv } = useLanguage();

  const steps = tv('howItWorks.steps') as { title: string; body: string }[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-item', {
        opacity: 0, y: 24, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-[var(--surface-2)] py-16 md:py-28 px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-bold text-center text-[clamp(26px,4vw,38px)] mb-12 md:mb-20">
          {t('howItWorks.heading')}
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          <div ref={lineRef} className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-[var(--accent)]/30" />
          {steps.map((s, i) => (
            <div key={i} className="step-item flex flex-col items-center text-center relative z-10">
              <div className="font-mono-num w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-lg font-bold mb-5">
                {i + 1}
              </div>
              <h3 className="text-[19px] font-semibold mb-2.5">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-[260px]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
