'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ClientCard } from './ClientCard';
import { usePortfolio } from '../hooks/usePortfolio';
import { useTranslations } from '../hooks/useTranslations';

interface ClientsSectionProps {
  language?: string;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ language = 'en' }) => {
  const [activeClient, setActiveClient] = useState<number | null>(null);
  const { clients, loading, error } = usePortfolio();
  const { t } = useTranslations(language);

  if (loading) {
    return (
      <section id="clients" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white">Loading clients...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="clients" className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
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
            {t('home.trustedByLeaders', 'Trusted by Industry Leaders')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We've partnered with innovative companies to transform their ideas into market-leading solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <ClientCard
              key={client.id}
              client={client}
              index={index}
              isActive={activeClient === index}
              onMouseEnter={() => setActiveClient(index)}
              onMouseLeave={() => setActiveClient(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};