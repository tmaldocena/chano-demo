export type Locale = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      method: 'Método',
      plans: 'Planes',
      testimonials: 'Testimonios',
      faq: 'Preguntas Frecuentes',
      startNow: 'Empezar ahora',
    },
    hero: {
      eyebrow: 'Prescripción del Movimiento & Longevidad',
      title1: 'Tu cuerpo no necesita más esfuerzo.',
      title2: 'Necesita un plan hecho para ti.',
      lead: 'Entrenamiento personalizado 100% online, diseñado por un profesional con 31 años de trayectoria — sin rutinas genéricas, sin lesionarte, sin perder tiempo.',
      cta: 'Quiero mi plan personalizado',
      viewPlans: 'Ver planes y precios',
      stat1Num: '31',
      stat1Label: 'Años de trayectoria',
      stat2Num: '3',
      stat2Label: 'Meses por plan',
      stat3Num: '100%',
      stat3Label: 'Online y personalizado',
    },
    credentials: {
      heading: 'Respaldo real, no solo experiencia',
      items: [
        '31 años de trayectoria',
        'Licenciado en Educación Física',
        'Ex entrenador de alto rendimiento',
        'Certificado en múltiples disciplinas',
        'Bicampeón nacional de danzas folclóricas',
      ],
    },
    whoIs: {
      label: 'Quién es Chano',
      heading: '31 años entendiendo cómo entrena la gente real',
      p1: 'Mi nombre es Luciano Rodríguez Zamora, para todos, simplemente Chano. Llevo 31 años entrenando personas — en gimnasios, equipos y contextos muy distintos. Eso me enseñó algo que no está en ningún libro: cómo entrena la gente real, no la gente de las fotos de stock.',
      p2: 'Hoy me dedico exclusivamente a diseñar planes personalizados, seguros y sostenibles — pensados para que los sigas, no para que los abandones al mes.',
    },
    forWho: {
      heading: 'Este entrenamiento es para vos si:',
      reasons: [
        'Ya probaste rutinas de internet o de otra persona, y no te sirvieron porque no eran para tu cuerpo.',
        'Tenés poco tiempo y necesitás un plan claro, no una lista interminable de ejercicios.',
        'Sos principiante o nivel intermedio y querés avanzar sin lesionarte por hacer las cosas mal.',
        'Preferís resultados sostenibles a soluciones rápidas que no duran.',
      ],
      tagline: 'No se trata de entrenar más. Se trata de entrenar con criterio.',
    },
    howItWorks: {
      heading: 'Cómo funciona',
      steps: [
        { title: 'Contame sobre vos', body: 'Altura, peso, estado de salud, nivel actual y dónde entrenás (casa, gimnasio u oficina).' },
        { title: 'Recibí tu plan personalizado', body: 'Diseñado 100% para tu cuerpo y tu rutina real.' },
        { title: 'Arrancá con acompañamiento', body: 'Sesión virtual en vivo + soporte durante todo el proceso.' },
      ],
    },
    testimonials: {
      heading: 'Resultados de personas reales',
    },
    pricing: {
      heading: 'Planes y precios',
      subheading: 'Pago único. Sin mensualidades. Sin sorpresas.',
      badge: 'POPULAR',
      oneTime: 'pago único',
      choosePrefix: 'Elegir',
      paymentInfo: 'Medios de pago: PayPal · Billeteras virtuales locales (Nequi y otras)',
      plans: [
        {
          name: 'Essential',
          price: '$60',
          features: [
            'Evaluación física inicial',
            'Plan de entrenamiento de 3 meses',
            'Ajuste de rutina a las 4 semanas',
            'Guía de nutrición básica',
            'Soporte por correo electrónico',
          ],
        },
        {
          name: 'Premium',
          price: '$150',
          features: [
            'Todo lo del plan Essential',
            'Plan 100% personalizado, revisión semanal',
            'Seguimiento biométrico mensual',
            'Soporte prioritario por WhatsApp',
            '1 videollamada mensual',
          ],
        },
        {
          name: 'VIP Longevidad',
          price: '$350',
          features: [
            'Todo lo del plan Premium',
            'Evaluación médico-deportiva completa',
            'Plan de longevidad personalizado',
            'WhatsApp directo con Chano',
            '4 videollamadas mensuales',
            'Análisis de composición corporal',
          ],
        },
      ],
    },
    footer: {
      heading: 'Empezá con un plan hecho para vos, no genérico',
      subheading: 'Desde $60 USD. Pagás una vez, en la moneda de tu país, sin sorpresas.',
      cta: 'Quiero mi plan personalizado',
      copyright: '© 2026 Chano Rodríguez. Prescripción del Movimiento y Longevidad.',
    },
    whatsapp: {
      generic: '¡Hola! Soy Chano 👋 Hace 31 años ayudo a personas a entrenar mejor, no más. Contame tu objetivo y armamos tu plan personalizado.',
      planPrefix: 'Hola, me interesa el plan',
      planSuffix: 'Quisiera saber más información.',
    },
  },
  en: {
    nav: {
      method: 'Method',
      plans: 'Plans',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      startNow: 'Start now',
    },
    hero: {
      eyebrow: 'Movement Prescription & Longevity',
      title1: "Your body doesn't need more effort.",
      title2: 'It needs a plan made for you.',
      lead: '100% online personalized training, designed by a professional with 31 years of experience — no generic routines, no injuries, no wasted time.',
      cta: 'Get my personalized plan',
      viewPlans: 'View plans and pricing',
      stat1Num: '31',
      stat1Label: 'Years of experience',
      stat2Num: '3',
      stat2Label: 'Months per plan',
      stat3Num: '100%',
      stat3Label: 'Online & personalized',
    },
    credentials: {
      heading: 'Real credentials, not just experience',
      items: [
        '31 years of experience',
        'Degree in Physical Education',
        'Former high-performance coach',
        'Certified in multiple disciplines',
        'Two-time national folk dance champion',
      ],
    },
    whoIs: {
      label: 'Who is Chano',
      heading: '31 years understanding how real people train',
      p1: "My name is Luciano Rodríguez Zamora, but everyone knows me as Chano. I've been training people for 31 years — in gyms, teams, and very different environments. That taught me something no book can: how real people train, not the people in stock photos.",
      p2: "Today I focus exclusively on designing personalized, safe, and sustainable plans — built so you'll stick with them, not quit after a month.",
    },
    forWho: {
      heading: 'This training is for you if:',
      reasons: [
        "You've tried internet or someone else's routines and they didn't work because they weren't made for your body.",
        "You don't have much time and need a clear plan, not an endless list of exercises.",
        "You're a beginner or intermediate and want to progress without getting injured.",
        "You prefer sustainable results over quick fixes that don't last.",
      ],
      tagline: "It's not about training more. It's about training smarter.",
    },
    howItWorks: {
      heading: 'How it works',
      steps: [
        { title: 'Tell me about you', body: 'Height, weight, health status, current level, and where you train (home, gym, or office).' },
        { title: 'Receive your personalized plan', body: 'Designed 100% for your body and your real routine.' },
        { title: 'Get started with support', body: 'Live virtual session + guidance throughout the entire process.' },
      ],
    },
    testimonials: {
      heading: 'Results from real people',
    },
    pricing: {
      heading: 'Plans & pricing',
      subheading: 'One-time payment. No subscriptions. No surprises.',
      badge: 'POPULAR',
      oneTime: 'one-time',
      choosePrefix: 'Choose',
      paymentInfo: 'Payment methods: PayPal · Local virtual wallets (Nequi and others)',
      plans: [
        {
          name: 'Essential',
          price: '$60',
          features: [
            'Initial physical assessment',
            '3-month training plan',
            'Routine adjustment at 4 weeks',
            'Basic nutrition guide',
            'Email support',
          ],
        },
        {
          name: 'Premium',
          price: '$150',
          features: [
            'Everything in Essential',
            '100% personalized plan, weekly review',
            'Monthly biometric tracking',
            'Priority WhatsApp support',
            '1 monthly video call',
          ],
        },
        {
          name: 'VIP Longevity',
          price: '$350',
          features: [
            'Everything in Premium',
            'Complete medical-sports assessment',
            'Personalized longevity plan',
            'Direct WhatsApp with Chano',
            '4 monthly video calls',
            'Body composition analysis',
          ],
        },
      ],
    },
    footer: {
      heading: 'Start with a plan made for you, not a generic one',
      subheading: 'From $60 USD. Pay once, in your country\'s currency, no surprises.',
      cta: 'Get my personalized plan',
      copyright: '© 2026 Chano Rodríguez. Movement Prescription & Longevity.',
    },
    whatsapp: {
      generic: "Hi! I'm Chano 👋 I've been helping people train smarter, not harder, for 31 years. Tell me your goal and we'll build your personalized plan.",
      planPrefix: "Hi, I'm interested in the",
      planSuffix: 'plan. I\'d like to learn more.',
    },
  },
} as const;

export type TranslationKey = string;
