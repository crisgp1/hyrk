'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SettingsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-6xl mb-4">⚙️</div>
          <h1 className="text-3xl font-lexend font-bold text-white">
            {language === 'en' ? 'System Settings' : 'Configuración del Sistema'}
          </h1>
          <p className="text-zinc-400 max-w-md mx-auto">
            {language === 'en' 
              ? 'System configuration, user management, and preferences will be available here.' 
              : 'Configuración del sistema, gestión de usuarios y preferencias estarán disponibles aquí.'
            }
          </p>
          <div className="mt-8">
            <span className="px-4 py-2 bg-zinc-800 text-zinc-400 text-sm rounded-lg">
              {language === 'en' ? 'Coming Soon' : 'Próximamente'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}