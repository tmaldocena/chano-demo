import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, Trophy, BadgeCheck, Dumbbell } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const icons = [Award, GraduationCap, Trophy, BadgeCheck, Dumbbell];
const disciplines = ['Rumba', 'Kick Box', 'Aeróbics', 'Step', 'Funcional', 'Fuerza', 'Movilidad', 'Longevidad'];

export default function Credentials() {
  const root = useRef<HTMLDivElement>(null);
  const { t, tv } = useLanguage();

  const items = (tv('credentials.items') as string[]).map((text, i) => ({
    icon: icons[i],
    text,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cred-item', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('.diploma-card', {
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.diploma-card', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metodo" ref={root} className="border-y border-white/[0.07] py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-bold text-center text-[clamp(26px,4vw,38px)] mb-14">
          {t('credentials.heading')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="cred-item flex flex-col items-center text-center">
              <Icon size={28} className="text-[var(--accent-light)] mb-3" strokeWidth={1.7} />
              <div className="text-sm text-white/80 leading-snug">{text}</div>
            </div>
          ))}
        </div>

        <div className="mask-fade-x overflow-hidden mb-16">
          <div className="marquee-track">
            {[...disciplines, ...disciplines].map((d, i) => (
              <span key={i} className="mx-6 shrink-0 text-white/35 text-sm tracking-wide font-medium uppercase">
                {d} <span className="mx-6 text-[var(--accent)]">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="diploma-card max-w-md mx-auto rounded-2xl p-2 bg-[var(--surface)] card-grain">
          <img src="/chano-diana.jpeg" alt="Foto de Chano y Diana" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </section>
  );
}
