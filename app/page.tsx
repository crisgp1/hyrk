'use client';

import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import { useLanguage } from './contexts/LanguageContext';

interface ClientProps {
  name: string;
  domain: string;
  description: string;
}

interface ExpertiseProps {
  title: string;
  description: string;
  icon: string;
}

export default function Home() {
  const { t } = useLanguage();
  const [activeClient, setActiveClient] = useState<number | null>(null);
  const [particles, setParticles] = useState<{left: number; top: number; delay: number}[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const clientCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expertiseCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const clients: ClientProps[] = [
    {
      name: "Cliquealo",
      domain: "cliquealo.mx",
      description: t.home.cliquealoDesc
    },
    {
      name: "Tramboory",
      domain: "tramboory.com",
      description: t.home.trambooryDesc
    },
    {
      name: "Livinning",
      domain: "livinning.com",
      description: t.home.livinningDesc
    },
    {
      name: "Trigger",
      domain: "trigger.mx",
      description: t.home.triggerDesc
    }
  ];

  const expertise: ExpertiseProps[] = [
    {
      title: t.home.automotiveLuxury,
      description: t.home.automotiveLuxuryDesc,
      icon: "🚗"
    },
    {
      title: t.home.financialServices,
      description: t.home.financialServicesDesc,
      icon: "💰"
    },
    {
      title: t.home.clientTracking,
      description: t.home.clientTrackingDesc,
      icon: "📊"
    },
    {
      title: t.home.digitalTransformation,
      description: t.home.digitalTransformationDesc,
      icon: "⚡"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  useEffect(() => {
    // Generate particles only on client-side
    const newParticles = Array.from({length: 15}, (_, i) => ({
      left: (i * 37 + 23) % 100, // Deterministic positioning
      top: (i * 47 + 31) % 100,
      delay: (i * 0.3) % 2
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const particlesElement = particlesRef.current;

    if (!hero || !title || !subtitle || !buttons || !particlesElement) return;

    // Set initial states
    gsap.set([title, subtitle, buttons], { opacity: 0, y: 60 });
    gsap.set(particlesElement.children, { opacity: 0, scale: 0 });

    // Create timeline
    const tl = gsap.timeline({ delay: 1 });
    
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(particlesElement.children, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

    // Continuous floating animation for particles
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

    // Parallax effect on scroll
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
    <div className="min-h-screen bg-zinc-950 text-white font-outfit">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"></div>
        
        {/* Dynamic geometric background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
          </div>

          {/* Floating particles */}
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

          {/* Gradient orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-zinc-800/30 to-zinc-900/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-zinc-700/20 to-zinc-800/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl font-lexend font-bold mb-6 tracking-tight leading-none"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent hover:from-zinc-200 hover:via-white hover:to-zinc-300 transition-all duration-500">
                hyrk.io
              </span>
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-light"
            >
              <span className="text-white font-medium">{t.home.subtitle1}</span> & <span className="text-white font-medium">{t.home.subtitle2}</span> {t.home.subtitle3} <span className="text-zinc-300">{t.home.subtitle4}</span>, <span className="text-zinc-300">{t.home.subtitle5}</span>, y <span className="text-zinc-300">{t.home.subtitle6}</span> {t.home.subtitle7}.
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
              <span className="relative z-10">{t.home.startYourProject}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-zinc-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-900/50 transition-all duration-300 backdrop-blur-sm"
            >
              {t.home.viewOurWork}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-lexend font-bold text-white mb-6">
              {t.home.trustedByLeaders}
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {t.home.trustedByLeadersDesc}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {clients.map((client, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  clientCardsRef.current[index] = el;
                }}
                variants={fadeInUp}
                className="group bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
                onMouseEnter={() => {
                  setActiveClient(index);
                  const card = clientCardsRef.current[index];
                  if (card) {
                    gsap.to(card, {
                      boxShadow: "0 0 60px rgba(255,255,255,0.15), 0 0 120px rgba(255,255,255,0.08), inset 0 0 40px rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.3)",
                      duration: 0.6,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={() => {
                  setActiveClient(null);
                  const card = clientCardsRef.current[index];
                  if (card) {
                    gsap.to(card, {
                      boxShadow: "0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0), inset 0 0 0px rgba(255,255,255,0)",
                      borderColor: "rgba(113, 113, 122, 1)",
                      duration: 0.6,
                      ease: "power2.out"
                    });
                  }
                }}
                whileHover={{ 
                  scale: 1.02
                }}
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Ambient light effect */}
                <div className="absolute -inset-4 bg-gradient-radial from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-xl" />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-zinc-700 to-zinc-600 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-zinc-600 group-hover:to-zinc-500 transition-all duration-500"
                    whileHover={{ 
                      scale: 1.1,
                      filter: "brightness(1.2)"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-white font-bold text-lg group-hover:text-zinc-100 transition-colors">
                      {client.name.charAt(0)}
                    </span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-lexend font-bold text-white mb-2 group-hover:text-zinc-50 transition-colors duration-300">
                    {client.name}
                  </h3>
                  <p className="text-zinc-400 mb-4 font-mono text-sm group-hover:text-zinc-200 transition-colors duration-300">
                    {client.domain}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeClient === index ? 1 : 0,
                      height: activeClient === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-zinc-300 text-sm leading-relaxed overflow-hidden group-hover:text-zinc-100"
                  >
                    {client.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-lexend font-bold text-white mb-6">
              {t.home.ourExpertise}
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {t.home.ourExpertiseDesc}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  expertiseCardsRef.current[index] = el;
                }}
                variants={fadeInUp}
                className="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-8 transition-all duration-500 relative overflow-hidden"
                onMouseEnter={() => {
                  const card = expertiseCardsRef.current[index];
                  if (card) {
                    gsap.to(card, {
                      boxShadow: "0 0 80px rgba(255,255,255,0.12), 0 0 150px rgba(255,255,255,0.06), inset 0 0 50px rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.25)",
                      duration: 0.7,
                      ease: "power2.out"
                    });
                  }
                }}
                onMouseLeave={() => {
                  const card = expertiseCardsRef.current[index];
                  if (card) {
                    gsap.to(card, {
                      boxShadow: "0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0), inset 0 0 0px rgba(255,255,255,0)",
                      borderColor: "rgba(113, 113, 122, 1)",
                      duration: 0.7,
                      ease: "power2.out"
                    });
                  }
                }}
                whileHover={{ 
                  scale: 1.01
                }}
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800" />
                
                {/* Ambient light effect */}
                <div className="absolute -inset-6 bg-gradient-radial from-white/8 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-800 blur-2xl" />
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-3 group-hover:opacity-8 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                {/* Glowing accent line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-start gap-6">
                  <motion.div 
                    className="text-5xl p-4 bg-zinc-800 group-hover:bg-zinc-700 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      filter: "brightness(1.3)"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-lexend font-bold text-white mb-4 group-hover:text-zinc-50 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    {/* Animated progress bar */}
                    <motion.div
                      className="mt-6 h-1 bg-zinc-700 overflow-hidden group-hover:bg-zinc-600 transition-colors duration-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-zinc-500 to-zinc-400 group-hover:from-zinc-400 group-hover:to-zinc-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              { number: '50+', label: t.home.projectsDelivered },
              { number: '100%', label: t.home.clientSatisfaction },
              { number: '24/7', label: t.home.supportCoverage },
              { number: '10+', label: t.home.yearsExperience }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-5xl md:text-6xl font-lexend font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
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
            <h2 className="text-4xl md:text-6xl font-lexend font-bold text-white mb-6">
              {t.home.readyToTransform}
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              {t.home.readyToTransformDesc}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-12 py-4 rounded-lg font-semibold text-lg hover:bg-zinc-200 transition-colors"
            >
              {t.home.getStartedToday}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-3xl font-lexend font-bold text-white mb-4">
              hyrk.io
            </div>
            <p className="text-zinc-500 mb-8">
              {t.home.premiumAccelerator}
            </p>
            <div className="text-zinc-600 text-sm">
              © 2024 hyrk.io. {t.home.allRightsReserved}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}