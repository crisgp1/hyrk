'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { ClientDto } from '../../application/dto/ClientDto';
import { useAnimations } from '../hooks/useAnimations';

interface ClientCardProps {
  client: ClientDto;
  index: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave
}) => {
  const { applyCustomAnimation } = useAnimations();

  const handleMouseEnter = (cardElement: HTMLElement) => {
    onMouseEnter();
    applyCustomAnimation(cardElement, 'scale', 0.6, 'power2.out');
  };

  const handleMouseLeave = (cardElement: HTMLElement) => {
    onMouseLeave();
    applyCustomAnimation(cardElement, 'scale', 0.6, 'power2.out');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="group bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 transition-all duration-500 cursor-pointer relative overflow-hidden"
      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
            {client.initial}
          </span>
        </motion.div>
        
        <h3 className="text-2xl font-vertiga-black text-white mb-2 group-hover:text-zinc-50 transition-colors duration-300">
          {client.name}
        </h3>
        <p className="text-zinc-400 mb-4 font-mono text-sm group-hover:text-zinc-200 transition-colors duration-300">
          {client.domain}
        </p>
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isActive ? 1 : 0,
            height: isActive ? 'auto' : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-zinc-300 text-sm leading-relaxed overflow-hidden group-hover:text-zinc-100"
        >
          {client.description}
        </motion.p>
      </div>
    </motion.div>
  );
};