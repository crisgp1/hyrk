'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'review' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  deadline: string;
  budget: number;
  spent: number;
  team: string[];
  description: string;
  tags: string[];
  lastUpdate: string;
}

type ViewMode = 'grid' | 'list' | 'kanban';
type FilterStatus = 'all' | 'planning' | 'active' | 'review' | 'completed' | 'paused' | 'cancelled';
type SortBy = 'name' | 'deadline' | 'progress' | 'priority' | 'budget';

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('deadline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      client: 'Cliquealo',
      status: 'active',
      priority: 'high',
      progress: 75,
      startDate: '2024-06-01',
      deadline: '2024-08-15',
      budget: 120000,
      spent: 89000,
      team: ['María González', 'Carlos Ruiz', 'Ana Martínez', 'Luis Castro'],
      description: 'Complete redesign of the e-commerce platform with focus on UX/UI improvements and performance optimization.',
      tags: ['E-commerce', 'React', 'Node.js', 'UX/UI'],
      lastUpdate: '2024-07-18'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'Tramboory',
      status: 'review',
      priority: 'medium',
      progress: 60,
      startDate: '2024-05-15',
      deadline: '2024-08-22',
      budget: 85000,
      spent: 51000,
      team: ['Roberto García', 'Sofia Pérez', 'Kevin Morales'],
      description: 'Native mobile application for iOS and Android with real-time features.',
      tags: ['Mobile', 'React Native', 'Firebase'],
      lastUpdate: '2024-07-17'
    },
    {
      id: '3',
      name: 'Cloud Migration',
      client: 'Livinning',
      status: 'paused',
      priority: 'critical',
      progress: 40,
      startDate: '2024-04-01',
      deadline: '2024-07-30',
      budget: 200000,
      spent: 120000,
      team: ['Teresa Portillo', 'Nicolas Barrera', 'Jorge Mendoza'],
      description: 'Migration of legacy systems to AWS cloud infrastructure with enhanced security and scalability.',
      tags: ['AWS', 'DevOps', 'Migration', 'Security'],
      lastUpdate: '2024-07-10'
    },
    {
      id: '4',
      name: 'Marketing Automation',
      client: 'Trigger',
      status: 'active',
      priority: 'medium',
      progress: 90,
      startDate: '2024-03-15',
      deadline: '2024-08-05',
      budget: 65000,
      spent: 58000,
      team: ['Miguel García', 'Laura Kim', 'David Brown'],
      description: 'Implementation of automated marketing workflows and customer journey optimization.',
      tags: ['Marketing', 'Automation', 'CRM'],
      lastUpdate: '2024-07-18'
    },
    {
      id: '5',
      name: 'Data Analytics Dashboard',
      client: 'Internal',
      status: 'completed',
      priority: 'low',
      progress: 100,
      startDate: '2024-05-01',
      deadline: '2024-07-20',
      budget: 45000,
      spent: 43000,
      team: ['Alberto Vázquez', 'Carmen Moreno', 'Rafael Flores'],
      description: 'Internal dashboard for business intelligence and data visualization.',
      tags: ['Analytics', 'Dashboard', 'BI'],
      lastUpdate: '2024-07-20'
    },
    {
      id: '6',
      name: 'API Development',
      client: 'TechCorp',
      status: 'planning',
      priority: 'high',
      progress: 15,
      startDate: '2024-08-01',
      deadline: '2024-10-15',
      budget: 95000,
      spent: 12000,
      team: ['Patricia Silva', 'Fernando López'],
      description: 'RESTful API development with microservices architecture.',
      tags: ['API', 'Microservices', 'Node.js'],
      lastUpdate: '2024-07-15'
    }
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'budget':
          return b.budget - a.budget;
        default:
          return 0;
      }
    });
  }, [filterStatus, searchQuery, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      case 'paused': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-zinc-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-zinc-400 border-zinc-400';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      planning: { en: 'Planning', es: 'Planificación' },
      active: { en: 'Active', es: 'Activo' },
      review: { en: 'Review', es: 'Revisión' },
      completed: { en: 'Completed', es: 'Completado' },
      paused: { en: 'Paused', es: 'Pausado' },
      cancelled: { en: 'Cancelled', es: 'Cancelado' }
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

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">{project.name}</h3>
            <p className="text-zinc-400 text-sm">{project.client}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs border rounded ${getPriorityColor(project.priority)}`}>
          {project.priority.toUpperCase()}
        </span>
      </div>

      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-400 text-sm">
            {language === 'en' ? 'Progress' : 'Progreso'}
          </span>
          <span className="text-white font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-zinc-400 to-white h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-zinc-400 text-xs">
            {language === 'en' ? 'Budget' : 'Presupuesto'}
          </p>
          <p className="text-white font-medium">{formatCurrency(project.budget)}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-400 text-xs">
            {language === 'en' ? 'Deadline' : 'Fecha límite'}
          </p>
          <p className="text-white font-medium text-sm">
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {project.team.slice(0, 3).map((member, i) => {
            const initials = member.split(' ').map(n => n[0]).join('');
            return (
              <div
                key={i}
                className="w-6 h-6 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-xs text-white"
                title={member}
              >
                {initials}
              </div>
            );
          })}
          {project.team.length > 3 && (
            <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-xs text-zinc-300">
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <span className="text-zinc-500 text-xs">{getStatusText(project.status)}</span>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
            +{project.tags.length - 3}
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
          <h1 className="text-3xl font-vertiga-black text-white">
            {language === 'en' ? 'Projects' : 'Proyectos'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {language === 'en' 
              ? 'Manage and track all your active projects' 
              : 'Gestiona y rastrea todos tus proyectos activos'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
        >
          {language === 'en' ? '+ New Project' : '+ Nuevo Proyecto'}
        </motion.button>
      </div>

      {/* Filters and Controls */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search projects...' : 'Buscar proyectos...'}
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
              <option value="planning">{language === 'en' ? 'Planning' : 'Planificación'}</option>
              <option value="active">{language === 'en' ? 'Active' : 'Activo'}</option>
              <option value="review">{language === 'en' ? 'Review' : 'Revisión'}</option>
              <option value="completed">{language === 'en' ? 'Completed' : 'Completado'}</option>
              <option value="paused">{language === 'en' ? 'Paused' : 'Pausado'}</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="deadline">{language === 'en' ? 'Deadline' : 'Fecha límite'}</option>
              <option value="name">{language === 'en' ? 'Name' : 'Nombre'}</option>
              <option value="progress">{language === 'en' ? 'Progress' : 'Progreso'}</option>
              <option value="priority">{language === 'en' ? 'Priority' : 'Prioridad'}</option>
              <option value="budget">{language === 'en' ? 'Budget' : 'Presupuesto'}</option>
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

      {/* Projects Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'en' ? 'No projects found' : 'No se encontraron proyectos'}
          </h3>
          <p className="text-zinc-400">
            {language === 'en' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Intenta ajustar tu búsqueda o criterios de filtro'
            }
          </p>
        </div>
      )}

      {/* Project Modal/Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-vertiga-black text-white mb-2">
                    {selectedProject.name}
                  </h2>
                  <p className="text-zinc-400">{selectedProject.client}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-zinc-300 leading-relaxed">{selectedProject.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Project Details' : 'Detalles del Proyecto'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Status:' : 'Estado:'}
                        </span>
                        <span className="text-white">{getStatusText(selectedProject.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Priority:' : 'Prioridad:'}
                        </span>
                        <span className="text-white">{selectedProject.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Progress:' : 'Progreso:'}
                        </span>
                        <span className="text-white">{selectedProject.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Timeline & Budget' : 'Cronograma y Presupuesto'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Start Date:' : 'Fecha de Inicio:'}
                        </span>
                        <span className="text-white">
                          {new Date(selectedProject.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Deadline:' : 'Fecha límite:'}
                        </span>
                        <span className="text-white">
                          {new Date(selectedProject.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Budget:' : 'Presupuesto:'}
                        </span>
                        <span className="text-white">{formatCurrency(selectedProject.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Spent:' : 'Gastado:'}
                        </span>
                        <span className="text-white">{formatCurrency(selectedProject.spent)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">
                    {language === 'en' ? 'Team Members' : 'Miembros del Equipo'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.team.map((member, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 bg-zinc-800 rounded-lg px-3 py-2"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-xs text-white">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white text-sm">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">
                    {language === 'en' ? 'Tags' : 'Etiquetas'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}