import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    img: '/testimonio1.jpeg',
    name: 'Valentina M.',
    location: 'Buenos Aires, Argentina',
    text: 'Llevaba años probando rutinas de YouTube y nada funcionaba. Con Chano por primera vez siento que el entrenamiento está hecho para mí, no para cualquiera.',
  },
  {
    img: '/testimonio2.jpeg',
    name: 'Martína G.',
    location: 'Medellín, Colombia',
    text: 'Tenía dolor de espalda hacía 5 años. En 3 meses no solo desapareció, sino que estoy más fuerte que nunca. El nivel de atención es incomparable.',
  },
  {
    img: '/testimonio3.png',
    name: 'Lucía P.',
    location: 'Miami, USA',
    text: 'Lo que más valoro es la constancia. No me prometió resultados mágicos, me dio un plan real que puedo sostener. 6 meses después, no reconozco mi cuerpo.',
  },
  {
    img: '/testimonio4.png',
    name: 'Chano Rodríguez',
    location: 'Caracas, Venezuela',
    text: 'Hace 31 años entendí algo simple: no existen recetas universales. Cada cuerpo tiene su historia, sus límites y su potencial. Mi trabajo es diseñar el camino que se ajuste a vos, no al revés.',
  },
  {
    img: '/testimonio5.png',
    name: 'Camilo R.',
    location: 'Cali, Colombia',
    text: 'Empecé con mucho miedo por una lesión vieja. Chano lo entendió desde el día uno y armó un plan donde nunca me sentí en riesgo. Hoy entreno con confianza.',
  },
  {
    img: '/testimonio6.png',
    name: 'Daniela L.',
    location: 'Houston, USA',
    text: 'Trabajo 10 horas sentado y sentía que mi cuerpo se estaba apagando. En dos meses noté una diferencia brutal en energía, postura y fuerza.',
  },
  {
    img: '/testimonio7.png',
    name: 'Sofía A.',
    location: 'Bogotá, Colombia',
    text: 'Lo que diferencia a Chano es que te escucha. No te tira un plan genérico y desaparece. Cada ajuste, cada cambio, tiene una explicación y un sentido.',
  },
  {
    img: '/testimonio8.png',
    name: 'Andrea F.',
    location: 'Caracas, Venezuela',
    text: 'Probé 3 entrenadores antes. Ninguno me explicó por qué hacía lo que hacía. Chano te educa mientras te entrena, y eso cambia todo.',
  },
  {
    img: '/testimonio9.png',
    name: 'María E.',
    location: 'Buenos Aires, Argentina',
    text: 'Tenía 45 años y pensé que era tarde para empezar. Fue lo mejor que me pasó. Me siento más fuerte que a los 30.',
  },
  {
    img: '/testimonio10.png',
    name: 'Carlos M.',
    location: 'Orlando, USA',
    text: 'El plan se adapta a mis horarios y a lo que tengo disponible. No necesito gimnasio caro ni equipo especial. Eso para mí vale oro.',
  },
];

const LEN = testimonials.length;
const cards = [...testimonials, ...testimonials, ...testimonials];
const CARD_W = 480;
const GAP = 24;

export default function Testimonials() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(LEN);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-card', {
        opacity: 0, y: 26, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!track.current) return;
    const containerW = track.current.parentElement!.offsetWidth;
    const centerOffset = (containerW - CARD_W) / 2;
    const x = centerOffset - active * (CARD_W + GAP);
    gsap.to(track.current, { x, duration: 0.5, ease: 'power2.out' });

    const allCards = track.current.querySelectorAll('.test-card');
    allCards.forEach((card, i) => {
      const dist = Math.abs(i - active);
      const isFocused = dist === 0;
      gsap.to(card, {
        scale: isFocused ? 1.05 : 0.92,
        opacity: isFocused ? 1 : dist === 1 ? 0.5 : 0.25,
        filter: isFocused ? 'blur(0px)' : `blur(${Math.min(dist * 2, 6)}px)`,
        duration: 0.45,
        ease: 'power2.out',
      });
    });
  }, [active]);

  const scroll = (dir: 'left' | 'right') => {
    setActive((prev) => {
      const next = dir === 'right' ? prev + 1 : prev - 1;
      if (next >= LEN * 2) {
        gsap.set(track.current!, { x: (track.current!.parentElement!.offsetWidth - CARD_W) / 2 - LEN * (CARD_W + GAP) });
        return LEN;
      }
      if (next < LEN) {
        gsap.set(track.current!, { x: (track.current!.parentElement!.offsetWidth - CARD_W) / 2 - LEN * (CARD_W + GAP) });
        return LEN;
      }
      return next;
    });
  };

  return (
    <section id="testimonios" ref={root} className="py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 mb-14 flex items-center justify-between">
        <h2 className="font-display font-bold text-[clamp(26px,4vw,38px)]">
          {t('testimonials.heading')}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div ref={track} className="flex" style={{ gap: `${GAP}px` }}>
          {cards.map((item, i) => (
            <div
              key={i}
              className="test-card shrink-0 w-[480px] bg-[var(--surface-2)] rounded-2xl overflow-hidden card-grain flex"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[180px] h-[180px] object-cover shrink-0 self-center rounded-xl m-5"
              />
              <div className="py-7 pr-7 pl-2 flex flex-col">
                <Quote size={20} className="text-[var(--accent)]/50 mb-3" />
                <p className="text-white/70 text-[14px] leading-relaxed italic mb-5 flex-grow">
                  "{item.text}"
                </p>
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-white/40">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
