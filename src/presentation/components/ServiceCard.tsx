'use client';

import { motion } from 'motion/react';
import { ServiceDto } from '../../application/dto/ServiceDto';
import { useAnimations } from '../hooks/useAnimations';

interface ServiceCardProps {
  service: ServiceDto;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { applyCustomAnimation } = useAnimations();

  const handleMouseEnter = (cardElement: HTMLElement) => {
    applyCustomAnimation(cardElement, 'scale', 0.7, 'power2.out');
  };

  const handleMouseLeave = (cardElement: HTMLElement) => {
    applyCustomAnimation(cardElement, 'scale', 0.7, 'power2.out');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-8 transition-all duration-500 relative overflow-hidden"
      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800" />
      <div className="absolute -inset-6 bg-gradient-radial from-white/8 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-800 blur-2xl" />
      
      <div className="absolute inset-0 opacity-3 group-hover:opacity-8 transition-opacity duration-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] transform group-hover:scale-110 transition-transform duration-700" />
      </div>
      
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
          {service.icon}
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-vertiga-black text-white mb-4 group-hover:text-zinc-50 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
            {service.description}
          </p>
          
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
  );
};