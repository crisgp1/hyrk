'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Client {
  id: string;
  name: string;
  industry: { en: string; es: string };
  status: 'active' | 'inactive' | 'prospect' | 'former';
  tier: 'enterprise' | 'premium' | 'standard' | 'starter';
  primaryContact: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  company: {
    website: string;
    employees: string;
    revenue: string;
    location: string;
    founded: string;
  };
  engagement: {
    startDate: string;
    lastContact: string;
    totalProjects: number;
    activeProjects: number;
    totalValue: number;
    satisfaction: number;
  };
  projects: string[];
  notes: string;
  tags: string[];
  avatar: string;
}

type ViewMode = 'grid' | 'list' | 'pipeline';
type FilterStatus = 'all' | 'active' | 'inactive' | 'prospect' | 'former';
type FilterTier = 'all' | 'enterprise' | 'premium' | 'standard' | 'starter';

export default function ClientsPage() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterTier, setFilterTier] = useState<FilterTier>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clients: Client[] = [
    {
      id: '1',
      name: 'Cliquealo',
      industry: { en: 'E-commerce', es: 'Comercio Electrónico' },
      status: 'active',
      tier: 'enterprise',
      primaryContact: {
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@cliquealo.mx',
        phone: '+52 33 1234-5678',
        position: 'CTO'
      },
      company: {
        website: 'https://cliquealo.mx',
        employees: '50-100',
        revenue: '$5M-10M',
        location: 'Guadalajara, México',
        founded: '2019'
      },
      engagement: {
        startDate: '2022-03-15',
        lastContact: '2024-07-18',
        totalProjects: 3,
        activeProjects: 1,
        totalValue: 450000,
        satisfaction: 9.2
      },
      projects: ['E-commerce Platform Redesign', 'Mobile App Development'],
      notes: 'Long-term strategic partner. Focus on scalable e-commerce solutions.',
      tags: ['E-commerce', 'Retail', 'B2C', 'Technology'],
      avatar: 'CL'
    },
    {
      id: '2',
      name: 'Tramboory',
      industry: { en: 'Travel & Tourism', es: 'Viajes y Turismo' },
      status: 'active',
      tier: 'premium',
      primaryContact: {
        name: 'Ana Rodriguez',
        email: 'ana.rodriguez@tramboory.com',
        phone: '+52 55 2345-6789',
        position: 'Product Manager'
      },
      company: {
        website: 'https://tramboory.com',
        employees: '20-50',
        revenue: '$1M-5M',
        location: 'Ciudad de México, México',
        founded: '2020'
      },
      engagement: {
        startDate: '2023-01-10',
        lastContact: '2024-07-17',
        totalProjects: 2,
        activeProjects: 1,
        totalValue: 180000,
        satisfaction: 8.8
      },
      projects: ['Mobile App Development', 'API Integration'],
      notes: 'Growing travel platform with focus on unique experiences.',
      tags: ['Travel', 'Mobile', 'B2C', 'Startup'],
      avatar: 'TR'
    },
    {
      id: '3',
      name: 'Livinning',
      industry: { en: 'Real Estate', es: 'Bienes Raíces' },
      status: 'active',
      tier: 'enterprise',
      primaryContact: {
        name: 'Miguel Torres',
        email: 'miguel.torres@livinning.com',
        phone: '+52 81 3456-7890',
        position: 'CEO'
      },
      company: {
        website: 'https://livinning.com',
        employees: '100-500',
        revenue: '$10M+',
        location: 'Monterrey, México',
        founded: '2015'
      },
      engagement: {
        startDate: '2021-06-01',
        lastContact: '2024-07-15',
        totalProjects: 4,
        activeProjects: 1,
        totalValue: 850000,
        satisfaction: 8.5
      },
      projects: ['Cloud Migration', 'Data Analytics Platform'],
      notes: 'Major real estate platform requiring enterprise-level solutions.',
      tags: ['Real Estate', 'Enterprise', 'B2B', 'PropTech'],
      avatar: 'LV'
    },
    {
      id: '4',
      name: 'Trigger',
      industry: { en: 'Marketing', es: 'Marketing' },
      status: 'active',
      tier: 'standard',
      primaryContact: {
        name: 'Sofia Gutierrez',
        email: 'sofia.gutierrez@trigger.mx',
        phone: '+52 33 4567-8901',
        position: 'Marketing Director'
      },
      company: {
        website: 'https://trigger.mx',
        employees: '10-20',
        revenue: '$500K-1M',
        location: 'Guadalajara, México',
        founded: '2021'
      },
      engagement: {
        startDate: '2023-03-15',
        lastContact: '2024-07-18',
        totalProjects: 1,
        activeProjects: 1,
        totalValue: 95000,
        satisfaction: 9.0
      },
      projects: ['Marketing Automation Platform'],
      notes: 'Digital marketing agency looking for automation solutions.',
      tags: ['Marketing', 'Automation', 'B2B', 'Agency'],
      avatar: 'TG'
    },
    {
      id: '5',
      name: 'TechCorp Solutions',
      industry: { en: 'Technology', es: 'Tecnología' },
      status: 'prospect',
      tier: 'premium',
      primaryContact: {
        name: 'Roberto Silva',
        email: 'roberto.silva@techcorp.com',
        phone: '+52 55 5678-9012',
        position: 'VP Engineering'
      },
      company: {
        website: 'https://techcorp.com',
        employees: '200-500',
        revenue: '$20M+',
        location: 'Ciudad de México, México',
        founded: '2010'
      },
      engagement: {
        startDate: '2024-07-01',
        lastContact: '2024-07-16',
        totalProjects: 0,
        activeProjects: 0,
        totalValue: 0,
        satisfaction: 0
      },
      projects: [],
      notes: 'Potential major client for API development and cloud solutions.',
      tags: ['Technology', 'Enterprise', 'B2B', 'SaaS'],
      avatar: 'TC'
    },
    {
      id: '6',
      name: 'RetailMax',
      industry: { en: 'Retail', es: 'Retail' },
      status: 'inactive',
      tier: 'standard',
      primaryContact: {
        name: 'Laura Perez',
        email: 'laura.perez@retailmax.mx',
        phone: '+52 81 6789-0123',
        position: 'IT Manager'
      },
      company: {
        website: 'https://retailmax.mx',
        employees: '50-100',
        revenue: '$2M-5M',
        location: 'Monterrey, México',
        founded: '2018'
      },
      engagement: {
        startDate: '2022-08-01',
        lastContact: '2023-12-15',
        totalProjects: 2,
        activeProjects: 0,
        totalValue: 120000,
        satisfaction: 7.8
      },
      projects: ['Inventory Management System'],
      notes: 'Completed project successfully. Potential for future engagement.',
      tags: ['Retail', 'Inventory', 'B2B', 'SME'],
      avatar: 'RM'
    }
  ];

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
      const matchesTier = filterTier === 'all' || client.tier === filterTier;
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.industry.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.industry.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.primaryContact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesStatus && matchesTier && matchesSearch;
    });
  }, [filterStatus, filterTier, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-zinc-500';
      case 'prospect': return 'bg-blue-500';
      case 'former': return 'bg-red-500';
      default: return 'bg-zinc-500';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'text-purple-400 border-purple-400';
      case 'premium': return 'text-yellow-400 border-yellow-400';
      case 'standard': return 'text-blue-400 border-blue-400';
      case 'starter': return 'text-green-400 border-green-400';
      default: return 'text-zinc-400 border-zinc-400';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      active: { en: 'Active', es: 'Activo' },
      inactive: { en: 'Inactive', es: 'Inactivo' },
      prospect: { en: 'Prospect', es: 'Prospecto' },
      former: { en: 'Former', es: 'Anterior' }
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const ClientCard = ({ client }: { client: Client }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all cursor-pointer"
      onClick={() => setSelectedClient(client)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-lg flex items-center justify-center text-white font-bold">
            {client.avatar}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{client.name}</h3>
            <p className="text-zinc-400 text-sm">{client.industry[language]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(client.status)}`} />
          <span className={`px-2 py-1 text-xs border rounded ${getTierColor(client.tier)}`}>
            {client.tier.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 text-sm">
            {language === 'en' ? 'Primary Contact' : 'Contacto Principal'}
          </span>
          <span className="text-white text-sm">{client.primaryContact.name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 text-sm">
            {language === 'en' ? 'Active Projects' : 'Proyectos Activos'}
          </span>
          <span className="text-white text-sm">{client.engagement.activeProjects}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 text-sm">
            {language === 'en' ? 'Total Value' : 'Valor Total'}
          </span>
          <span className="text-white text-sm font-medium">
            {formatCurrency(client.engagement.totalValue)}
          </span>
        </div>

        {client.engagement.satisfaction > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm">
              {language === 'en' ? 'Satisfaction' : 'Satisfacción'}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-white text-sm">{client.engagement.satisfaction}</span>
              <span className="text-yellow-400">⭐</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-xs">{getStatusText(client.status)}</span>
          <span className="text-zinc-500 text-xs">
            {language === 'en' ? 'Last contact:' : 'Último contacto:'} {
              client.engagement.lastContact ? 
                new Date(client.engagement.lastContact).toLocaleDateString() : 
                '-'
            }
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {client.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {client.tags.length > 3 && (
          <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
            +{client.tags.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-lexend font-bold text-white">
            {language === 'en' ? 'Client Management' : 'Gestión de Clientes'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {language === 'en' 
              ? 'Manage client relationships and track business opportunities' 
              : 'Gestiona relaciones con clientes y rastrea oportunidades de negocio'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
        >
          {language === 'en' ? '+ Add Client' : '+ Agregar Cliente'}
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: { en: 'Total Clients', es: 'Clientes Totales' }, 
            value: clients.length,
            icon: '👥'
          },
          { 
            label: { en: 'Active Clients', es: 'Clientes Activos' }, 
            value: clients.filter(c => c.status === 'active').length,
            icon: '✅'
          },
          { 
            label: { en: 'Prospects', es: 'Prospectos' }, 
            value: clients.filter(c => c.status === 'prospect').length,
            icon: '🎯'
          },
          { 
            label: { en: 'Total Revenue', es: 'Ingresos Totales' }, 
            value: formatCurrency(clients.reduce((sum, c) => sum + c.engagement.totalValue, 0)),
            icon: '💰'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <p className="text-zinc-400 text-sm">{stat.label[language]}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search clients...' : 'Buscar clientes...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="all">{language === 'en' ? 'All Status' : 'Todos los Estados'}</option>
              <option value="active">{language === 'en' ? 'Active' : 'Activo'}</option>
              <option value="inactive">{language === 'en' ? 'Inactive' : 'Inactivo'}</option>
              <option value="prospect">{language === 'en' ? 'Prospect' : 'Prospecto'}</option>
              <option value="former">{language === 'en' ? 'Former' : 'Anterior'}</option>
            </select>

            {/* Tier Filter */}
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value as FilterTier)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="all">{language === 'en' ? 'All Tiers' : 'Todos los Niveles'}</option>
              <option value="enterprise">Enterprise</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
              <option value="starter">Starter</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-zinc-800 rounded-lg p-1">
              {(['grid', 'list'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    viewMode === mode
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mode === 'grid' ? '⊞' : '☰'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'en' ? 'No clients found' : 'No se encontraron clientes'}
          </h3>
          <p className="text-zinc-400">
            {language === 'en' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Intenta ajustar tu búsqueda o criterios de filtro'
            }
          </p>
        </div>
      )}

      {/* Client Modal/Details */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-lg flex items-center justify-center text-xl text-white font-bold">
                    {selectedClient.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-lexend font-bold text-white mb-1">
                      {selectedClient.name}
                    </h2>
                    <p className="text-zinc-400 mb-1">{selectedClient.industry[language]}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(selectedClient.status)}`} />
                      <span className="text-zinc-500 text-sm">{getStatusText(selectedClient.status)}</span>
                      <span className={`px-2 py-1 text-xs border rounded ${getTierColor(selectedClient.tier)}`}>
                        {selectedClient.tier.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Primary Contact' : 'Contacto Principal'}
                    </h3>
                    <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Name:' : 'Nombre:'}</span>
                        <span className="text-white">{selectedClient.primaryContact.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Position:' : 'Posición:'}</span>
                        <span className="text-white">{selectedClient.primaryContact.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Email:</span>
                        <a href={`mailto:${selectedClient.primaryContact.email}`} className="text-white hover:text-zinc-300">
                          {selectedClient.primaryContact.email}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Phone:' : 'Teléfono:'}</span>
                        <a href={`tel:${selectedClient.primaryContact.phone}`} className="text-white hover:text-zinc-300">
                          {selectedClient.primaryContact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Company Information' : 'Información de la Empresa'}
                    </h3>
                    <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Website:</span>
                        <a href={selectedClient.company.website} target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300">
                          {selectedClient.company.website}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Employees:' : 'Empleados:'}</span>
                        <span className="text-white">{selectedClient.company.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Revenue:' : 'Ingresos:'}</span>
                        <span className="text-white">{selectedClient.company.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Location:' : 'Ubicación:'}</span>
                        <span className="text-white">{selectedClient.company.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Founded:' : 'Fundada:'}</span>
                        <span className="text-white">{selectedClient.company.founded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Tags' : 'Etiquetas'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Engagement Metrics */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Engagement Metrics' : 'Métricas de Compromiso'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-zinc-400 text-sm mb-1">
                          {language === 'en' ? 'Total Projects' : 'Proyectos Totales'}
                        </p>
                        <p className="text-2xl font-bold text-white">{selectedClient.engagement.totalProjects}</p>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-zinc-400 text-sm mb-1">
                          {language === 'en' ? 'Active Projects' : 'Proyectos Activos'}
                        </p>
                        <p className="text-2xl font-bold text-white">{selectedClient.engagement.activeProjects}</p>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-zinc-400 text-sm mb-1">
                          {language === 'en' ? 'Total Value' : 'Valor Total'}
                        </p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(selectedClient.engagement.totalValue)}</p>
                      </div>
                      {selectedClient.engagement.satisfaction > 0 && (
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                          <p className="text-zinc-400 text-sm mb-1">
                            {language === 'en' ? 'Satisfaction' : 'Satisfacción'}
                          </p>
                          <div className="flex items-center space-x-1">
                            <p className="text-2xl font-bold text-white">{selectedClient.engagement.satisfaction}</p>
                            <span className="text-yellow-400">⭐</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Current Projects */}
                  {selectedClient.projects.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        {language === 'en' ? 'Current Projects' : 'Proyectos Actuales'}
                      </h3>
                      <div className="space-y-2">
                        {selectedClient.projects.map((project, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 bg-zinc-800/50 rounded-lg px-3 py-2"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-white text-sm">{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Timeline' : 'Cronología'}
                    </h3>
                    <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Start Date:' : 'Fecha de Inicio:'}</span>
                        <span className="text-white">
                          {new Date(selectedClient.engagement.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{language === 'en' ? 'Last Contact:' : 'Último Contacto:'}</span>
                        <span className="text-white">
                          {selectedClient.engagement.lastContact ? 
                            new Date(selectedClient.engagement.lastContact).toLocaleDateString() : 
                            '-'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedClient.notes && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">
                        {language === 'en' ? 'Notes' : 'Notas'}
                      </h3>
                      <div className="bg-zinc-800/50 rounded-lg p-4">
                        <p className="text-zinc-300 text-sm leading-relaxed">{selectedClient.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}