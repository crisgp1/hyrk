'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import SuperAdminGuard from '../components/auth/SuperAdminGuard';
import UserMenu from '../components/auth/UserMenu';

interface NavItem {
  name: { en: string; es: string };
  href: string;
  icon: string;
  badge?: number;
  subItems?: { name: { en: string; es: string }; href: string }[];
}

export default function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(3);

  const navItems: NavItem[] = [
    {
      name: { en: 'Dashboard', es: 'Panel de Control' },
      href: '/intranet/dashboard',
      icon: '📊',
      badge: notifications
    },
    {
      name: { en: 'Projects', es: 'Proyectos' },
      href: '/intranet/projects',
      icon: '💼',
      subItems: [
        { name: { en: 'Active', es: 'Activos' }, href: '/intranet/projects/active' },
        { name: { en: 'Archived', es: 'Archivados' }, href: '/intranet/projects/archived' },
        { name: { en: 'Templates', es: 'Plantillas' }, href: '/intranet/projects/templates' }
      ]
    },
    {
      name: { en: 'Clients', es: 'Clientes' },
      href: '/intranet/clients',
      icon: '👥'
    },
    {
      name: { en: 'Team', es: 'Equipo' },
      href: '/intranet/team',
      icon: '🏢',
      subItems: [
        { name: { en: 'Directory', es: 'Directorio' }, href: '/intranet/team/directory' },
        { name: { en: 'Org Chart', es: 'Organigrama' }, href: '/intranet/team/org-chart' },
        { name: { en: 'Attendance', es: 'Asistencia' }, href: '/intranet/team/attendance' }
      ]
    },
    {
      name: { en: 'Finances', es: 'Finanzas' },
      href: '/intranet/finances',
      icon: '💰'
    },
    {
      name: { en: 'Documentation', es: 'Documentación' },
      href: '/intranet/docs',
      icon: '📚'
    },
    {
      name: { en: 'Settings', es: 'Configuración' },
      href: '/intranet/settings',
      icon: '⚙️'
    }
  ];

  const toggleExpanded = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  return (
    <SuperAdminGuard>
      <div className="min-h-screen bg-zinc-950 text-white font-vertiga-regular">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 z-50">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/img/hyrk logo blanco.svg"
                alt="hyrk.io"
                width={100}
                height={24}
                className="h-6 w-auto group-hover:scale-105 transition-transform"
              />
              <span className="text-zinc-500 text-sm font-mono">/ intranet</span>
            </Link>

            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-zinc-400">
              <span>/</span>
              <span className="text-white">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder={language === 'en' ? 'Search...' : 'Buscar...'}
                className="w-64 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <div className="absolute right-3 top-2.5 text-zinc-500">
                <kbd className="text-xs bg-zinc-700 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: isCollapsed ? 80 : 260 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed left-0 top-16 bottom-0 bg-zinc-900 border-r border-zinc-800 overflow-hidden"
        >
          <div className="p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full p-2 hover:bg-zinc-800 rounded-lg transition-colors text-left flex items-center justify-between"
            >
              <span className="text-xl">{isCollapsed ? '→' : '←'}</span>
            </button>
          </div>

          <nav className="px-3 pb-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItem === item.href;

              return (
                <div key={item.href} className="mb-1">
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        toggleExpanded(item.href);
                      }
                    }}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}
                    `}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="truncate">{item.name[language]}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {hasSubItems && (
                          <motion.span
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-zinc-500"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    )}
                  </Link>

                  {/* Sub Items */}
                  <AnimatePresence>
                    {!isCollapsed && hasSubItems && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-11 mt-1 space-y-1">
                          {item.subItems?.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`
                                  block px-3 py-1.5 rounded-md text-sm transition-colors
                                  ${isSubActive ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'}
                                `}
                              >
                                {subItem.name[language]}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Bottom section */}
          {!isCollapsed && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
              <div className="text-xs text-zinc-500">
                <p>Hyrk.io Intranet v1.0</p>
                <p className="mt-1">© 2024 All rights reserved</p>
              </div>
            </div>
          )}
        </motion.aside>

        {/* Main Content */}
        <main 
          className="flex-1 min-h-screen bg-zinc-950"
          style={{ marginLeft: isCollapsed ? 80 : 260 }}
        >
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </SuperAdminGuard>
  );
}