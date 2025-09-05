'use client';

import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ClientsSection } from '../components/ClientsSection';
import { ServicesSection } from '../components/ServicesSection';
import { useTranslations } from '../hooks/useTranslations';
import { useAnimations } from '../hooks/useAnimations';

interface HomePageProps {
  language?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ language = 'en' }) => {
  const [particles, setParticles] = useState<{left: number; top: number; delay: number}[]>([]);
  const { t } = useTranslations(language);
  const { useSlideUpAnimation, useFloatAnimation } = useAnimations();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useSlideUpAnimation(1.2, 'power3.out', 1);
  const subtitleRef = useSlideUpAnimation(1, 'power3.out', 0.4);
  const buttonsRef = useSlideUpAnimation(0.8, 'power3.out', 0.2);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newParticles = Array.from({length: 15}, (_, i) => ({
      left: (i * 37 + 23) % 100,
      top: (i * 47 + 31) % 100,
      delay: (i * 0.3) % 2
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const particlesElement = particlesRef.current;

    if (!hero || !particlesElement) return;

    gsap.set(particlesElement.children, { opacity: 0, scale: 0 });

    const tl = gsap.timeline({ delay: 2 });
    
    tl.to(particlesElement.children, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.to(particlesElement.children, {
      y: "random(-30, 30)",
      x: "random(-20, 20)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [particles]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-vertiga-regular">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"></div>
        
        {/* Dynamic geometric background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
          </div>

          <div ref={particlesRef} className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-zinc-400 to-zinc-600 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`
                }}
              />
            ))}
          </div>

          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-zinc-800/30 to-zinc-900/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-zinc-700/20 to-zinc-800/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-vertiga-black mb-6 tracking-tight leading-none"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent hover:from-zinc-200 hover:via-white hover:to-zinc-300 transition-all duration-500">
                {t('home.title', 'hyrk.io')}
              </span>
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-light"
            >
              <span className="text-white font-medium">{t('home.subtitle1', 'Software development accelerator')}</span> {t('home.subtitle2', 'and innovation hub')} {t('home.subtitle3', 'specializing in premium solutions for')} <span className="text-zinc-300">{t('home.subtitle4', 'luxury automotive')}</span>, <span className="text-zinc-300">{t('home.subtitle5', 'financial services')}</span>, and <span className="text-zinc-300">{t('home.subtitle6', 'advanced client tracking')} {t('home.subtitle7', 'systems')}</span>.
            </p>
          </div>

          <div 
            ref={buttonsRef}
            className="flex gap-6 flex-col sm:flex-row justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-200 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">{t('home.startYourProject', 'Start Your Project')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-zinc-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-900/50 transition-all duration-300 backdrop-blur-sm"
            >
              {t('home.viewOurWork', 'View Our Work')}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection language={language} />

      {/* Services Section */}
      <ServicesSection language={language} />

      {/* Stats Section */}
      <section id="about" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '50+', label: t('home.projectsDelivered', 'Projects Delivered') },
              { number: '100%', label: t('home.clientSatisfaction', 'Client Satisfaction') },
              { number: '24/7', label: t('home.supportCoverage', 'Support Coverage') },
              { number: '10+', label: t('home.yearsExperience', 'Years Experience') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-5xl md:text-6xl font-vertiga-black text-white mb-2 group-hover:text-zinc-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-zinc-400 font-medium text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-vertiga-black text-white mb-6">
              {t('home.readyToTransform', 'Ready to Transform Your Ideas?')}
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              {t('home.readyToTransformDesc', 'Join the elite companies that trust hyrk.io to accelerate their software development and bring their most ambitious ideas to life.')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-12 py-4 rounded-lg font-semibold text-lg hover:bg-zinc-200 transition-colors"
            >
              {t('home.getStartedToday', 'Get Started Today')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-3xl font-vertiga-black text-white mb-4">
              {t('home.title', 'hyrk.io')}
            </div>
            <p className="text-zinc-500 mb-8">
              {t('home.premiumAccelerator', 'Software development accelerator and innovation hub')}
            </p>
            <div className="text-zinc-600 text-sm">
              © 2024 hyrk.io. {t('home.allRightsReserved', 'All rights reserved.')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};