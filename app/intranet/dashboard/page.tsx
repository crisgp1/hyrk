'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MetricCard {
  title: { en: string; es: string };
  value: string;
  change: number;
  period: { en: string; es: string };
  icon: string;
  trend: 'up' | 'down' | 'stable';
}

interface ProjectStatus {
  name: string;
  client: string;
  progress: number;
  status: 'active' | 'review' | 'completed' | 'delayed';
  deadline: string;
  team: string[];
}

interface Activity {
  user: string;
  action: { en: string; es: string };
  target: string;
  time: string;
  type: 'project' | 'client' | 'team' | 'system';
}

export default function Dashboard() {
  const { language, t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const metrics: MetricCard[] = [
    {
      title: { en: 'Active Projects', es: 'Proyectos Activos' },
      value: '12',
      change: 8.2,
      period: { en: 'vs last month', es: 'vs mes anterior' },
      icon: '📊',
      trend: 'up'
    },
    {
      title: { en: 'Revenue', es: 'Ingresos' },
      value: '$847K',
      change: 12.5,
      period: { en: 'vs last month', es: 'vs mes anterior' },
      icon: '💰',
      trend: 'up'
    },
    {
      title: { en: 'Client Satisfaction', es: 'Satisfacción Cliente' },
      value: '96%',
      change: 2.1,
      period: { en: 'vs last quarter', es: 'vs trimestre anterior' },
      icon: '⭐',
      trend: 'up'
    },
    {
      title: { en: 'Team Utilization', es: 'Utilización Equipo' },
      value: '84%',
      change: -3.2,
      period: { en: 'vs last month', es: 'vs mes anterior' },
      icon: '👥',
      trend: 'down'
    }
  ];

  const projects: ProjectStatus[] = [
    {
      name: 'E-commerce Platform Redesign',
      client: 'Cliquealo',
      progress: 75,
      status: 'active',
      deadline: '2024-08-15',
      team: ['JD', 'AM', 'MR', 'LC']
    },
    {
      name: 'Mobile App Development',
      client: 'Tramboory',
      progress: 60,
      status: 'review',
      deadline: '2024-08-22',
      team: ['RG', 'SP', 'KM']
    },
    {
      name: 'Cloud Migration',
      client: 'Livinning',
      progress: 40,
      status: 'delayed',
      deadline: '2024-07-30',
      team: ['TP', 'NB', 'JM']
    },
    {
      name: 'Marketing Automation',
      client: 'Trigger',
      progress: 90,
      status: 'active',
      deadline: '2024-08-05',
      team: ['MG', 'LK', 'DB']
    },
    {
      name: 'Data Analytics Dashboard',
      client: 'Internal',
      progress: 100,
      status: 'completed',
      deadline: '2024-07-20',
      team: ['AV', 'CM', 'RF']
    }
  ];

  const recentActivity: Activity[] = [
    {
      user: 'María González',
      action: { en: 'completed milestone', es: 'completó hito' },
      target: 'E-commerce Platform Redesign',
      time: '2 hours ago',
      type: 'project'
    },
    {
      user: 'Carlos Ruiz',
      action: { en: 'updated client profile', es: 'actualizó perfil cliente' },
      target: 'Tramboory',
      time: '4 hours ago',
      type: 'client'
    },
    {
      user: 'Ana Martínez',
      action: { en: 'submitted design review', es: 'envió revisión diseño' },
      target: 'Mobile App Development',
      time: '6 hours ago',
      type: 'project'
    },
    {
      user: 'System',
      action: { en: 'backup completed', es: 'respaldo completado' },
      target: 'Database',
      time: '8 hours ago',
      type: 'system'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-zinc-500';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      active: { en: 'Active', es: 'Activo' },
      review: { en: 'In Review', es: 'En Revisión' },
      completed: { en: 'Completed', es: 'Completado' },
      delayed: { en: 'Delayed', es: 'Retrasado' }
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-vertiga-black text-white">
            {language === 'en' ? 'Dashboard' : 'Panel de Control'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {language === 'en' 
              ? 'Welcome back! Here\'s an overview of your business performance.' 
              : 'Bienvenido de vuelta! Aquí tienes un resumen del rendimiento de tu negocio.'
            }
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="flex bg-zinc-800 rounded-lg p-1">
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedPeriod === period
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {period === 'week' && (language === 'en' ? 'Week' : 'Semana')}
              {period === 'month' && (language === 'en' ? 'Month' : 'Mes')}
              {period === 'quarter' && (language === 'en' ? 'Quarter' : 'Trimestre')}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-lg">{getTrendIcon(metric.trend)}</span>
            </div>
            
            <h3 className="text-zinc-400 text-sm mb-2">{metric.title[language]}</h3>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-vertiga-black text-white">{metric.value}</span>
              <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-zinc-400'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-1">{metric.period[language]}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Projects Overview */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-vertiga-black text-white">
                {language === 'en' ? 'Active Projects' : 'Proyectos Activos'}
              </h2>
              <button className="text-zinc-400 hover:text-white text-sm">
                {language === 'en' ? 'View all' : 'Ver todos'}
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <p className="text-zinc-400 text-sm">{project.client}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                      <span className="text-sm text-zinc-400">{getStatusText(project.status)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-400">
                        {language === 'en' ? 'Progress' : 'Progreso'}
                      </span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-zinc-400 to-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-400 text-xs">
                        {language === 'en' ? 'Team:' : 'Equipo:'}
                      </span>
                      <div className="flex space-x-1">
                        {project.team.slice(0, 3).map((member, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-xs text-white"
                          >
                            {member}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-xs text-zinc-300">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-zinc-400 text-xs">{project.deadline}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-vertiga-black text-white mb-6">
              {language === 'en' ? 'Recent Activity' : 'Actividad Reciente'}
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'project' ? 'bg-blue-500' :
                    activity.type === 'client' ? 'bg-green-500' :
                    activity.type === 'team' ? 'bg-yellow-500' :
                    'bg-zinc-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action[language]}{' '}
                      <span className="text-zinc-300">{activity.target}</span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-4 p-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors">
              {language === 'en' ? 'View all activity' : 'Ver toda la actividad'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-6">
            <h2 className="text-xl font-vertiga-black text-white mb-6">
              {language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}
            </h2>

            <div className="space-y-3">
              {[
                { 
                  name: { en: 'New Project', es: 'Nuevo Proyecto' }, 
                  icon: '➕',
                  href: '/intranet/projects/new'
                },
                { 
                  name: { en: 'Add Client', es: 'Agregar Cliente' }, 
                  icon: '👤',
                  href: '/intranet/clients/new'
                },
                { 
                  name: { en: 'Time Report', es: 'Reporte de Tiempo' }, 
                  icon: '⏰',
                  href: '/intranet/reports/time'
                },
                { 
                  name: { en: 'Team Meeting', es: 'Reunión Equipo' }, 
                  icon: '🎥',
                  href: '/intranet/calendar/new'
                }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors"
                >
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-white font-medium">{action.name[language]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}