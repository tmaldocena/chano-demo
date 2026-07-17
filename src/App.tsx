import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Credentials from './components/Credentials';
import WhoIsChano from './components/WhoIsChano';
import ForWho from './components/ForWho';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import { FinalCTA, WhatsAppFloat } from './components/FinalSections';

function LangSync() {
  const { locale } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <LangSync />
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Credentials />
        <WhoIsChano />
        <ForWho />
        <Testimonials />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}
