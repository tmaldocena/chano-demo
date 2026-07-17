import { useEffect, useRef, useState, useCallback } from 'react';
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
const DRAG_THRESHOLD = 50;

function getCardWidth(track: HTMLDivElement): number {
  const firstCard = track.querySelector('.test-card') as HTMLElement | null;
  return firstCard ? firstCard.offsetWidth : 480;
}

function getStep(track: HTMLDivElement): number {
  const cards = track.querySelectorAll('.test-card');
  if (cards.length < 2) return 480;
  return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
}

function getIsMobile(): boolean {
  return window.innerWidth < 768;
}

export default function Testimonials() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(LEN);
  const { t } = useLanguage();

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
    startTrackX: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-card', {
        opacity: 0, y: 26, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const animateTo = useCallback((index: number, animated = true) => {
    if (!track.current) return;
    const step = getStep(track.current);
    const cardW = getCardWidth(track.current);
    const containerW = track.current.parentElement!.offsetWidth;
    const centerOffset = (containerW - cardW) / 2;
    const x = centerOffset - index * step;

    if (animated) {
      gsap.to(track.current, { x, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.set(track.current, { x });
    }

    const allCards = track.current.querySelectorAll('.test-card');
    allCards.forEach((card, i) => {
      const dist = Math.abs(i - index);
      const isFocused = dist === 0;
      gsap.to(card, {
        scale: isFocused ? 1.05 : 0.92,
        opacity: isFocused ? 1 : dist === 1 ? 0.5 : 0.25,
        filter: isFocused ? 'blur(0px)' : `blur(${Math.min(dist * 2, 6)}px)`,
        duration: animated ? 0.45 : 0,
        ease: 'power2.out',
      });
    });
  }, []);

  useEffect(() => {
    animateTo(active);
  }, [active, animateTo]);

  const scroll = (dir: 'left' | 'right') => {
    setActive((prev) => {
      const next = dir === 'right' ? prev + 1 : prev - 1;
      if (next >= LEN * 2 || next < LEN) {
        const step = track.current ? getStep(track.current) : 480;
        const cardW = track.current ? getCardWidth(track.current) : 480;
        const containerW = track.current!.parentElement!.offsetWidth;
        gsap.set(track.current!, { x: (containerW - cardW) / 2 - LEN * step });
        return LEN;
      }
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!getIsMobile()) return;
    const d = dragRef.current;
    d.isDragging = true;
    d.startX = e.clientX;
    d.startTrackX = track.current ? ((track.current as unknown as { _gsap: { x: number } })._gsap?.x ?? 0) : 0;

    const trackEl = track.current;
    if (trackEl) {
      gsap.killTweensOf(trackEl);
      trackEl.style.cursor = 'grabbing';
      trackEl.style.touchAction = 'pan-y';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.isDragging || !track.current) return;

    const deltaX = e.clientX - d.startX;
    d.currentX = e.clientX;
    gsap.set(track.current, { x: d.startTrackX + deltaX });
  };

  const handlePointerUp = () => {
    const d = dragRef.current;
    if (!d.isDragging || !track.current) return;
    d.isDragging = false;

    track.current.style.cursor = '';
    track.current.style.touchAction = '';

    const deltaX = d.currentX - d.startX;
    const absDelta = Math.abs(deltaX);

    if (absDelta > DRAG_THRESHOLD) {
      if (deltaX < 0) {
        scroll('right');
      } else {
        scroll('left');
      }
    } else {
      animateTo(active);
    }
  };

  return (
    <section id="testimonios" ref={root} className="py-16 md:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 mb-10 md:mb-14 flex items-center justify-between">
        <h2 className="font-display font-bold text-[clamp(22px,4vw,38px)]">
          {t('testimonials.heading')}
        </h2>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          ref={track}
          className="flex"
          style={{ touchAction: 'pan-y', cursor: 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {cards.map((item, i) => (
            <div
              key={i}
              className="test-card shrink-0 w-[min(480px,85vw)] bg-[var(--surface-2)] rounded-2xl overflow-hidden card-grain flex select-none"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] object-cover shrink-0 self-center rounded-xl m-4 md:m-5 pointer-events-none"
                draggable={false}
              />
              <div className="py-5 pr-5 md:py-7 md:pr-7 pl-2 flex flex-col">
                <Quote size={18} className="text-[var(--accent)]/50 mb-2 md:mb-3" />
                <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed italic mb-4 md:mb-5 flex-grow">
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
