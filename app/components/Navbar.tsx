'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  name: { en: string; es: string };
  href: string;
  description: { en: string; es: string };
  number: string;
}

interface Region {
  name: string;
  code: string;
  phone: string;
  email: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [scrollY, setScrollY] = useState<number>(0);
  const [expandedService, setExpandedService] = useState<'services' | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const fullscreenMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const languageToggleRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { 
      name: { en: 'Services', es: 'Servicios' }, 
      href: '#services', 
      description: { en: 'Our expertise & solutions', es: 'Nuestra experiencia y soluciones' }, 
      number: '01' 
    },
    { 
      name: { en: 'Clients', es: 'Clientes' }, 
      href: '#clients', 
      description: { en: 'Success stories & partnerships', es: 'Casos de éxito y alianzas' }, 
      number: '02' 
    },
    { 
      name: { en: 'About', es: 'Nosotros' }, 
      href: '#about', 
      description: { en: 'Our story & mission', es: 'Nuestra historia y misión' }, 
      number: '03' 
    },
    { 
      name: { en: 'Contact', es: 'Contacto' }, 
      href: '#contact', 
      description: { en: 'Get in touch with us', es: 'Ponte en contacto con nosotros' }, 
      number: '04' 
    },
  ];

  const regions: Region[] = [
    { name: 'Guadalajara', code: 'GDL', phone: '+52 33 1234-5678', email: 'gdl@hyrk.io' },
    { name: 'Ciudad de México', code: 'CDMX', phone: '+52 55 8765-4321', email: 'cdmx@hyrk.io' },
    { name: 'Monterrey', code: 'MTY', phone: '+52 81 9876-5432', email: 'mty@hyrk.io' },
  ];

  const services = [
    {
      name: { en: 'Software Consultancy', es: 'Consultoría de Software' },
      description: { en: 'Strategic guidance for your tech decisions', es: 'Orientación estratégica para tus decisiones tecnológicas' }
    },
    {
      name: { en: 'Software Development', es: 'Desarrollo de Software' },
      description: { en: 'Custom solutions built to your specifications', es: 'Soluciones personalizadas a tu medida' }
    },
    {
      name: { en: 'Cloud Products', es: 'Productos en la Nube' },
      description: { en: 'Scalable cloud-native applications', es: 'Aplicaciones escalables nativas en la nube' }
    },
    {
      name: { en: 'E-commerce Solutions', es: 'Soluciones E-commerce' },
      description: { en: 'Complete online store platforms', es: 'Plataformas completas de tienda online' }
    },
    {
      name: { en: 'Process Digitalization', es: 'Digitalización de Procesos' },
      description: { en: 'Transform manual workflows into digital systems', es: 'Transforma flujos manuales en sistemas digitales' }
    }
  ];

  const content = {
    en: {
      navigation: 'Navigation',
      getInTouch: 'Get in Touch',
      availableRegions: 'Available Regions',
      international: 'International',
      followUs: 'Follow Us',
      startProject: 'Start Your Project',
      getStarted: 'Get Started',
      copyright: 'All rights reserved.',
      email: 'Email',
      phone: 'Phone'
    },
    es: {
      navigation: 'Navegación',
      getInTouch: 'Contacto',
      availableRegions: 'Regiones Disponibles',
      international: 'Internacional',
      followUs: 'Síguenos',
      startProject: 'Inicia tu Proyecto',
      getStarted: 'Comenzar',
      copyright: 'Todos los derechos reservados.',
      email: 'Correo',
      phone: 'Teléfono'
    }
  };

  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    // Initial navbar animation
    gsap.set(navbar, { y: -100, opacity: 0 });
    gsap.to(navbar, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
    });

    // Animate menu items on load
    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.set(item, { y: 20, opacity: 0 });
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.8 + index * 0.1,
          ease: "power2.out"
        });
      }
    });

    // Scroll-based navbar behavior
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 50) {
        gsap.to(navbar, {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(9, 9, 11, 0.8)",
          duration: 0.3
        });
      } else {
        gsap.to(navbar, {
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(9, 9, 11, 0)",
          duration: 0.3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    const toggle = languageToggleRef.current;
    
    if (toggle) {
      // Smooth professional language toggle animation
      gsap.to(toggle, {
        scale: 0.98,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          setLanguage(newLang);
          gsap.to(toggle, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out"
          });
        }
      });
    } else {
      setLanguage(newLang);
    }
  };

  const toggleServicesExpansion = () => {
    const isCurrentlyExpanded = expandedService === 'services';
    const regionColumn = document.querySelector('.regions-column');
    const gridContainer = document.querySelector('.grid');
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (!isCurrentlyExpanded) {
      // Set state immediately to trigger Motion animations
      setExpandedService('services');
      
      // Enhanced GSAP animations with responsive behavior
      setTimeout(() => {
        try {
          // Create a timeline for coordinated animations
          const tl = gsap.timeline();
          
          // Animate grid layout expansion
          if (gridContainer) {
            tl.to(gridContainer, {
              filter: "brightness(1.05)",
              duration: 0.8,
              ease: "power2.out"
            }, 0);
          }
          
          // Desktop: Slide region column, Mobile: No transform
          if (regionColumn && !isMobile) {
            tl.to(regionColumn, {
              x: 20,
              scale: 0.98,
              duration: 1.2,
              ease: "elastic.out(1, 0.3)"
            }, 0.1);
          }
          
          // Animate services column entrance
          setTimeout(() => {
            if (isMobile) {
              // Mobile: Animate inline expansion
              const mobileServicesColumn = document.querySelector('.services-expansion-mobile');
              if (mobileServicesColumn) {
                gsap.set(mobileServicesColumn, { 
                  opacity: 0,
                  height: 0,
                  y: -20
                });
                
                tl.to(mobileServicesColumn, {
                  opacity: 1,
                  height: 'auto',
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out"
                }, 0.2);
                
                // Animate individual mobile service items
                const mobileServiceItems = mobileServicesColumn.querySelectorAll('.service-expansion-item-mobile');
                gsap.set(mobileServiceItems, { opacity: 0, y: 15 });
                tl.to(mobileServiceItems, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: "power2.out"
                }, 0.4);
              }
            } else {
              // Desktop: Animate side column
              const servicesColumn = document.querySelector('.services-expansion');
              if (servicesColumn) {
                gsap.set(servicesColumn, { 
                  transformOrigin: "left center",
                  scaleX: 0,
                  opacity: 0 
                });
                
                tl.to(servicesColumn, {
                  scaleX: 1,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out"
                }, 0.2);
                
                // Animate individual service items
                const serviceItems = servicesColumn.querySelectorAll('.service-expansion-item');
                gsap.set(serviceItems, { opacity: 0, y: 20 });
                tl.to(serviceItems, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out"
                }, 0.6);
              }
            }
          }, 100);
          
        } catch (error) {
          console.warn('GSAP animation error:', error);
        }
      }, 50);
      
    } else {
      // Enhanced exit animations
      try {
        const tl = gsap.timeline();
        
        // Animate services column exit first
        if (isMobile) {
          const mobileServicesColumn = document.querySelector('.services-expansion-mobile');
          if (mobileServicesColumn) {
            tl.to(mobileServicesColumn, {
              opacity: 0,
              height: 0,
              y: -20,
              duration: 0.5,
              ease: "power2.in"
            }, 0);
          }
        } else {
          const servicesColumn = document.querySelector('.services-expansion');
          if (servicesColumn) {
            tl.to(servicesColumn, {
              scaleX: 0,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
              transformOrigin: "left center"
            }, 0);
          }
        }
        
        // Return region column to position (desktop only)
        if (regionColumn && !isMobile) {
          tl.to(regionColumn, {
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          }, 0.2);
        }
        
        // Remove ambient lighting
        if (gridContainer) {
          tl.to(gridContainer, {
            filter: "brightness(1)",
            duration: 0.6,
            ease: "power2.out"
          }, 0.1);
        }
        
        // Delay state change to allow exit animations
        tl.call(() => {
          setExpandedService(null);
        }, undefined, 0.4);
        
      } catch (error) {
        console.warn('GSAP animation error:', error);
        setExpandedService(null);
      }
    }
  };

  const toggleMenu = () => {
    const hamburger = hamburgerRef.current;
    const fullscreenMenu = fullscreenMenuRef.current;
    const overlay = overlayRef.current;
    const menuContent = menuContentRef.current;
    
    if (!hamburger || !fullscreenMenu || !overlay || !menuContent) return;

    if (!isMenuOpen) {
      setIsMenuOpen(true);
      
      // Show fullscreen menu
      gsap.set(fullscreenMenu, { display: 'flex' });
      
      // Ultra modern overlay animation with morphing effect
      gsap.fromTo(overlay, 
        { 
          scaleX: 0, 
          scaleY: 0, 
          borderRadius: '50%',
          transformOrigin: 'center',
          opacity: 0
        },
        { 
          scaleX: 1, 
          scaleY: 1, 
          borderRadius: '0%',
          opacity: 1,
          duration: 1.2, 
          ease: "power4.out" 
        }
      );
      
      // Modern hamburger transformation
      gsap.to(hamburger.children[0], { 
        rotation: 45, 
        y: 6, 
        scaleX: 1.2,
        duration: 0.5, 
        ease: "power3.out" 
      });
      gsap.to(hamburger.children[1], { 
        opacity: 0, 
        scale: 0,
        duration: 0.3 
      });
      gsap.to(hamburger.children[2], { 
        rotation: -45, 
        y: -6, 
        scaleX: 1.2,
        duration: 0.5, 
        ease: "power3.out" 
      });
      
      // Content animation with elastic effect
      gsap.fromTo(menuContent, 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          delay: 0.4,
          ease: "power3.out" 
        }
      );
      
      // Ultra smooth staggered menu items
      const menuItems = fullscreenMenu.querySelectorAll('.menu-item');
      gsap.fromTo(menuItems, 
        { x: 120, opacity: 0, rotationY: 45 },
        { 
          x: 0, 
          opacity: 1, 
          rotationY: 0,
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.6,
          ease: "power3.out"
        }
      );

      // Modern numbers animation
      const menuNumbers = fullscreenMenu.querySelectorAll('.menu-number');
      gsap.fromTo(menuNumbers,
        { x: -80, opacity: 0, scale: 0.5, rotation: -90 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.8,
          ease: "elastic.out(1, 0.3)"
        }
      );

      // Animate regions with wave effect
      const regionItems = fullscreenMenu.querySelectorAll('.region-item');
      gsap.fromTo(regionItems,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 1,
          ease: "power2.out"
        }
      );

    } else {
      // Ultra modern close animation
      const menuItems = fullscreenMenu.querySelectorAll('.menu-item');
      const menuNumbers = fullscreenMenu.querySelectorAll('.menu-number');
      const regionItems = fullscreenMenu.querySelectorAll('.region-item');
      
      gsap.to(menuItems, {
        x: 120,
        opacity: 0,
        rotationY: -45,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.in"
      });

      gsap.to(menuNumbers, {
        x: -80,
        opacity: 0,
        scale: 0.5,
        rotation: 90,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.in"
      });

      gsap.to(regionItems, {
        y: 60,
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in"
      });
      
      gsap.to(menuContent, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 0.5,
        delay: 0.1,
        ease: "power3.in"
      });
      
      // Modern overlay closing with morphing
      gsap.to(overlay, {
        scaleX: 0,
        scaleY: 0,
        borderRadius: '50%',
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power4.in",
        onComplete: () => {
          gsap.set(fullscreenMenu, { display: 'none' });
          setIsMenuOpen(false);
          setExpandedService(null); // Reset services expansion when menu closes
        }
      });
      
      // Modern hamburger restoration
      gsap.to(hamburger.children[0], { 
        rotation: 0, 
        y: 0, 
        scaleX: 1,
        duration: 0.5, 
        ease: "power3.out" 
      });
      gsap.to(hamburger.children[1], { 
        opacity: 1, 
        scale: 1,
        duration: 0.5, 
        delay: 0.2 
      });
      gsap.to(hamburger.children[2], { 
        rotation: 0, 
        y: 0, 
        scaleX: 1,
        duration: 0.5, 
        ease: "power3.out" 
      });
    }
  };


  const handleNavClick = (href: string) => {
    setActiveItem(href);
    
    // Handle services expansion in fullscreen menu
    if (href === '#services' && isMenuOpen) {
      toggleServicesExpansion();
      return;
    }
    
    // Close menu when clicking other nav items
    if (href !== '#services' && isMenuOpen) {
      toggleMenu();
    }
    
    // Smooth scroll to section (only if not services)
    if (href !== '#services') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-white to-zinc-400 flex items-center justify-center">
              <span className="text-black font-bold text-sm">H</span>
            </div>
            <span className="text-white font-lexend font-bold text-xl">hyrk.io</span>
          </motion.div>

          {/* Desktop Navigation - Hidden when menu is open */}
          <div className={`hidden lg:flex items-center space-x-8 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <li 
                  key={`${item.name.en}-${item.name.es}`}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className="relative group"
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`text-zinc-300 hover:text-white transition-colors duration-300 font-outfit font-medium relative ${
                      activeItem === item.href ? 'text-white' : ''
                    }`}
                  >
                    {item.name[language]}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Language Toggle */}
            <motion.div
              ref={languageToggleRef}
              className="flex items-center bg-zinc-800 rounded-full p-1"
              whileHover={{ scale: 1.05 }}
            >
              <button
                onClick={toggleLanguage}
                className="relative w-12 h-6 bg-zinc-700 rounded-full transition-all duration-300 hover:bg-zinc-600"
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold text-black"
                  animate={{ x: language === 'es' ? 0 : 24 }}
                  transition={{ 
                    type: "tween",
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {language.toUpperCase()}
                  </motion.span>
                </motion.div>
              </button>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2 font-semibold hover:bg-zinc-200 transition-colors duration-300"
            >
              {content[language].getStarted}
            </motion.button>
          </div>

          {/* Menu Button (Desktop & Mobile) */}
          <button
            onClick={toggleMenu}
            className="lg:flex relative w-8 h-8 flex flex-col justify-center items-center z-50"
          >
            <div ref={hamburgerRef} className="w-6 h-4 relative">
              <span className="absolute w-6 h-0.5 bg-white top-0 left-0 transform transition-all duration-300"></span>
              <span className="absolute w-6 h-0.5 bg-white top-1/2 left-0 transform -translate-y-1/2 transition-all duration-300"></span>
              <span className="absolute w-6 h-0.5 bg-white bottom-0 left-0 transform transition-all duration-300"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={fullscreenMenuRef}
        className="fixed inset-0 z-40 hidden"
        style={{ display: 'none' }}
      >
        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl"
        />

        {/* Scrollable Menu Content */}
        <div
          ref={menuContentRef}
          className="relative z-10 h-full flex flex-col"
        >
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-zinc-950/90 to-transparent z-30 pointer-events-none" />
          
          {/* Scrollable container */}
          <motion.div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDrag={(event, info) => {
              setScrollY(info.point.y);
            }}
          >
            <div className="min-h-screen flex items-center justify-center pt-24 px-4 pb-4 sm:pt-28 sm:px-6 sm:pb-6 lg:pt-32 lg:px-8 lg:pb-8">
              <div className="w-full max-w-7xl mx-auto">
                
                {/* Main Navigation Grid */}
                <div className={`grid gap-8 lg:gap-12 xl:gap-16 transition-all duration-700 ease-out ${
                  expandedService 
                    ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'
                }`}>
                  
                  {/* Left Column - Menu Items */}
                  <div className="space-y-6 lg:space-y-8">
                    <div className="mb-8 lg:mb-12">
                      <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-2">
                        {content[language].navigation}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-white to-transparent"></div>
                    </div>
                    
                    <nav className="space-y-6 lg:space-y-8">
                      {navItems.map((item, index) => (
                        <React.Fragment key={item.name[language]}>
                          <div className="menu-item">
                            <div className="group">
                              <button
                                onClick={() => handleNavClick(item.href)}
                                className="flex items-center justify-between w-full text-left hover:text-white transition-colors duration-300"
                              >
                                <div className="flex items-center space-x-4 lg:space-x-6 flex-1 min-w-0">
                                  <span className="menu-number text-zinc-500 font-mono text-sm font-bold flex-shrink-0">
                                    {item.number}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-lexend font-bold text-zinc-200 group-hover:text-white transition-colors duration-300 leading-tight">
                                      {item.name[language]}
                                    </h3>
                                    <p className="text-zinc-400 font-outfit text-sm lg:text-base mt-1 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
                                      {item.description[language]}
                                    </p>
                                  </div>
                                </div>
                                <motion.div
                                  className="w-8 h-8 border border-zinc-600 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0 ml-4"
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  animate={{ 
                                    rotate: item.href === '#services' && expandedService ? 90 : 0 
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <motion.span 
                                    className="text-sm"
                                    animate={{ 
                                      rotate: item.href === '#services' && expandedService ? 90 : 0 
                                    }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    →
                                  </motion.span>
                                </motion.div>
                              </button>
                            </div>
                          </div>

                          {/* Services Expansion - Mobile Inline */}
                          {item.href === '#services' && expandedService === 'services' && (
                            <div className="lg:hidden services-expansion-mobile mt-4 mb-6">
                              <div className="pl-8 space-y-4">
                                <div className="mb-4">
                                  <p className="text-zinc-400 font-outfit text-xs uppercase tracking-wider mb-2">
                                    {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
                                  </p>
                                  <div className="w-12 h-0.5 bg-gradient-to-r from-white to-transparent" />
                                </div>
                                
                                <div className="space-y-3">
                                  {services.map((service, serviceIndex) => (
                                    <div
                                      key={service.name.en}
                                      className="service-expansion-item-mobile group bg-zinc-900/30 p-3 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-500"
                                    >
                                      <h4 className="text-white font-lexend font-semibold text-sm group-hover:text-zinc-100 mb-1">
                                        {service.name[language]}
                                      </h4>
                                      <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300">
                                        {service.description[language]}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </nav>

                    {/* Language Toggle in Menu */}
                    <div className="pt-6 lg:pt-8 border-t border-zinc-800">
                      <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-4">
                        Language / Idioma
                      </p>
                      <div className="flex items-center space-x-4">
                        <motion.button
                          onClick={toggleLanguage}
                          className={`px-4 py-2 rounded-lg font-outfit text-sm transition-all duration-500 ease-out ${
                            language === 'es' 
                              ? 'bg-white text-black' 
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                          whileHover={{ 
                            scale: 1.02,
                            y: -1
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          <motion.span
                            animate={{ 
                              opacity: language === 'es' ? 1 : 0.8,
                              scale: language === 'es' ? 1 : 0.98
                            }}
                            transition={{ 
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            Español
                          </motion.span>
                        </motion.button>
                        <motion.button
                          onClick={toggleLanguage}
                          className={`px-4 py-2 rounded-lg font-outfit text-sm transition-all duration-500 ease-out ${
                            language === 'en' 
                              ? 'bg-white text-black' 
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                          whileHover={{ 
                            scale: 1.02,
                            y: -1
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        >
                          <motion.span
                            animate={{ 
                              opacity: language === 'en' ? 1 : 0.8,
                              scale: language === 'en' ? 1 : 0.98
                            }}
                            transition={{ 
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            English
                          </motion.span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Services Expansion */}
                  <AnimatePresence mode="wait">
                    {expandedService === 'services' && (
                      <div 
                        key="services-column"
                        className="services-expansion space-y-8 lg:space-y-12"
                      >
                      <div className="mb-8 lg:mb-12">
                        <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-2">
                          {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-white to-transparent" />
                      </div>
                      
                      <div className="space-y-4 lg:space-y-6">
                        {services.map((service, serviceIndex) => (
                          <div
                            key={service.name.en}
                            className="service-expansion-item group bg-zinc-900/50 p-4 lg:p-6 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-700 hover:border-zinc-500"
                          >
                            <h4 className="text-white font-lexend font-bold text-lg lg:text-xl group-hover:text-zinc-100 mb-2">
                              {service.name[language]}
                            </h4>
                            <p className="text-zinc-400 text-sm lg:text-base leading-relaxed group-hover:text-zinc-300">
                              {service.description[language]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
                  </AnimatePresence>

                  {/* Right Column - Contact Info & Regions */}
                  <div className="regions-column space-y-8 lg:space-y-12">
                    
                    {/* Regional Offices */}
                    <div>
                      <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-6">
                        {content[language].availableRegions}
                      </p>
                      <div className="space-y-4 lg:space-y-6">
                        {regions.map((region, index) => (
                          <motion.div 
                            key={region.code}
                            className="region-item group bg-zinc-900/50 p-4 lg:p-6 hover:bg-zinc-800/50 transition-all duration-300"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-lexend font-bold text-lg lg:text-xl group-hover:text-zinc-100">
                                  {region.name}
                                </h4>
                                <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-3">
                                  {region.code}
                                </p>
                                <div className="space-y-1 text-sm">
                                  <p className="text-zinc-400 break-all">
                                    {content[language].phone}: 
                                    <a href={`tel:${region.phone}`} className="text-zinc-300 hover:text-white ml-1 transition-colors">
                                      {region.phone}
                                    </a>
                                  </p>
                                  <p className="text-zinc-400 break-all">
                                    {content[language].email}: 
                                    <a href={`mailto:${region.email}`} className="text-zinc-300 hover:text-white ml-1 transition-colors">
                                      {region.email}
                                    </a>
                                  </p>
                                </div>
                              </div>
                              <motion.div
                                className="w-6 h-6 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0 ml-4"
                                whileHover={{ rotate: 180 }}
                              >
                                <span className="text-xs">→</span>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* International Contact */}
                    <div>
                      <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-6">
                        {content[language].international}
                      </p>
                      <div className="space-y-4 bg-zinc-900/30 p-4 lg:p-6">
                        <div>
                          <p className="text-zinc-500 text-sm">{content[language].email}</p>
                          <a href="mailto:hello@hyrk.io" className="text-white text-lg font-outfit hover:text-zinc-300 transition-colors break-all">
                            hello@hyrk.io
                          </a>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-sm">{content[language].phone}</p>
                          <a href="tel:+1234567890" className="text-white text-lg font-outfit hover:text-zinc-300 transition-colors">
                            +1 (234) 567-890
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <p className="text-zinc-400 font-outfit text-sm uppercase tracking-wider mb-6">
                        {content[language].followUs}
                      </p>
                      <div className="flex flex-wrap gap-4 lg:gap-6">
                        {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                          <motion.a
                            key={social}
                            href="#"
                            className="text-zinc-400 hover:text-white transition-colors duration-300 font-outfit text-sm"
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {social}
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6 lg:pt-8">
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-zinc-200 transition-colors duration-300 w-full"
                      >
                        {content[language].startProject}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Footer in scroll area */}
                <div className="mt-16 lg:mt-24 pt-8 border-t border-zinc-800">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-white to-zinc-400 flex items-center justify-center">
                        <span className="text-black font-bold text-xs">H</span>
                      </div>
                      <span className="text-white font-lexend font-bold">hyrk.io</span>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-6">
                      <div className="flex items-center space-x-2 lg:space-x-4 text-zinc-500 text-xs font-outfit">
                        <span>GDL</span>
                        <span>•</span>
                        <span>CDMX</span>
                        <span>•</span>
                        <span>MTY</span>
                        <span>•</span>
                        <span>{content[language].international}</span>
                      </div>
                      <p className="text-zinc-500 text-sm font-outfit">
                        © 2024 hyrk.io. {content[language].copyright}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-zinc-950/90 to-transparent z-30 pointer-events-none" />
        </div>
      </div>
    </>
  );
}