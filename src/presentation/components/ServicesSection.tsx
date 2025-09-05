'use client';

import { motion } from 'motion/react';
import { ServiceCard } from './ServiceCard';
import { useServices } from '../hooks/useServices';
import { useTranslations } from '../hooks/useTranslations';

interface ServicesSectionProps {
  language?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language = 'en' }) => {
  const { services, loading, error } = useServices();
  const { t } = useTranslations(language);

  if (loading) {
    return (
      <section id="services" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-vertiga-black text-white mb-6">
            {t('home.ourExpertise', 'Our Expertise')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Specialized solutions across high-value industries, delivering premium software that drives business transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};