import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ForWho() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, tv } = useLanguage();

  const reasons = tv('forWho.reasons') as string[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.forwho-item', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      if (videoRef.current) {
        gsap.fromTo(videoRef.current, { yPercent: -10 }, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-[var(--surface-2)] py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]" src="/workout.mp4" />
        <div className="absolute inset-0 bg-[var(--bg)]/80" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <h2 className="font-display font-bold text-center text-[clamp(26px,4vw,38px)] mb-14">
          {t('forWho.heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {reasons.map((r) => (
            <div key={r} className="forwho-item flex items-start gap-4 bg-[var(--bg)] rounded-2xl p-6">
              <CheckCircle2 size={22} className="text-[var(--accent-light)] shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-[15px] leading-relaxed text-white/80">{r}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 italic mt-10 text-[15px]">
          {t('forWho.tagline')}
        </p>
      </div>
    </section>
  );
}
