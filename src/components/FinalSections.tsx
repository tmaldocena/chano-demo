import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WA_NUMBER = '573122554632';

export function FinalCTA() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  function openWhatsApp(plan?: string) {
    const msg = plan
      ? `${t('whatsapp.planPrefix')} ${plan}. ${t('whatsapp.planSuffix')}`
      : t('whatsapp.generic');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.final-cta-item', {
        opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power3.out',
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
    <section ref={root} className="relative text-center py-24 px-6 border-t border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]" src="/footer-video.mp4" />
        <div className="absolute inset-0 bg-[var(--bg)]/75" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="final-cta-item font-display font-bold text-white text-[clamp(26px,4vw,38px)] mb-4">
          {t('footer.heading')}
        </h2>
        <p className="final-cta-item text-white/85 text-lg mb-9">
          {t('footer.subheading')}
        </p>
        <div className="final-cta-item">
          <button
            onClick={() => openWhatsApp()}
            className="btn-magnetic inline-flex items-center gap-3 bg-white text-[var(--accent)] hover:bg-white/90 text-base font-semibold pl-7 pr-2 py-2 rounded-full"
          >
            {t('footer.cta')}
            <span className="bg-[var(--accent)] text-white rounded-full p-2 flex items-center justify-center">
              <ArrowRight size={18} strokeWidth={2.4} />
            </span>
          </button>
        </div>
        <div className="final-cta-item mt-20 pt-8 border-t border-white/20">
          <img src="/chano-logo.png" alt="Chano" className="h-8 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-5 mb-4">
            <a href="https://instagram.com/chanoentrenador" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/45 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://tiktok.com/@chanoentrenador" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/45 hover:text-white transition-colors">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 13.4 4h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 2.6-2.6c.27 0 .53.04.78.1V9.1a5.75 5.75 0 0 0-.78-.05 5.7 5.7 0 0 0-5.7 5.7A5.7 5.7 0 0 0 7.7 20.4a5.7 5.7 0 0 0 5.7-5.7V8.36a7.48 7.48 0 0 0 4.4 1.42V6.68a4.28 4.28 0 0 1-1.2-.86Z" />
              </svg>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/45 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
          <p className="text-white/45 text-xs">{t('footer.copyright')}</p>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFloat() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  function openWhatsApp(plan?: string) {
    const msg = plan
      ? `${t('whatsapp.planPrefix')} ${plan}. ${t('whatsapp.planSuffix')}`
      : t('whatsapp.generic');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      openWhatsApp(detail?.plan);
    };
    window.addEventListener('open-whatsapp', handler);
    return () => window.removeEventListener('open-whatsapp', handler);
  }, [t]);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { scale: 1.08, duration: 1.2, ease: 'sine.inOut' })
      .to(el, { boxShadow: '0 0 24px 4px rgba(37,211,102,0.4)', duration: 1.2, ease: 'sine.inOut' }, '<');
    return () => { tl.kill(); };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => openWhatsApp()}
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
    >
      <MessageCircle size={26} className="text-white" fill="white" strokeWidth={0} />
    </button>
  );
}
