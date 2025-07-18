'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Employee {
  id: string;
  name: string;
  position: { en: string; es: string };
  department: { en: string; es: string };
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: 'available' | 'busy' | 'away' | 'offline';
  skills: string[];
  projects: string[];
  startDate: string;
  reportingTo: string;
  bio: { en: string; es: string };
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

type ViewMode = 'grid' | 'list' | 'org';
type FilterDepartment = 'all' | 'engineering' | 'design' | 'marketing' | 'sales' | 'hr' | 'finance';

export default function TeamPage() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterDepartment, setFilterDepartment] = useState<FilterDepartment>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    {
      id: '1',
      name: 'María González',
      position: { en: 'Senior Frontend Developer', es: 'Desarrolladora Frontend Senior' },
      department: { en: 'Engineering', es: 'Ingeniería' },
      email: 'maria.gonzalez@hyrk.io',
      phone: '+52 33 1234-5678',
      location: 'Guadalajara, México',
      avatar: 'MG',
      status: 'available',
      skills: ['React', 'TypeScript', 'Next.js', 'GSAP', 'Tailwind CSS'],
      projects: ['E-commerce Platform Redesign', 'Mobile App Development'],
      startDate: '2022-03-15',
      reportingTo: 'Carlos Ruiz',
      bio: { 
        en: 'Passionate frontend developer with 5+ years of experience creating beautiful and performant web applications.', 
        es: 'Desarrolladora frontend apasionada con más de 5 años de experiencia creando aplicaciones web hermosas y eficientes.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/maria-gonzalez',
        github: 'https://github.com/mariagonzalez'
      }
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      position: { en: 'Tech Lead', es: 'Líder Técnico' },
      department: { en: 'Engineering', es: 'Ingeniería' },
      email: 'carlos.ruiz@hyrk.io',
      phone: '+52 33 2345-6789',
      location: 'Guadalajara, México',
      avatar: 'CR',
      status: 'busy',
      skills: ['Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
      projects: ['Cloud Migration', 'API Development'],
      startDate: '2021-01-10',
      reportingTo: 'CEO',
      bio: { 
        en: 'Experienced tech lead specializing in scalable backend systems and cloud architecture.', 
        es: 'Líder técnico experimentado especializado en sistemas backend escalables y arquitectura en la nube.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carlos-ruiz',
        github: 'https://github.com/carlosruiz'
      }
    },
    {
      id: '3',
      name: 'Ana Martínez',
      position: { en: 'UX/UI Designer', es: 'Diseñadora UX/UI' },
      department: { en: 'Design', es: 'Diseño' },
      email: 'ana.martinez@hyrk.io',
      phone: '+52 55 3456-7890',
      location: 'Ciudad de México, México',
      avatar: 'AM',
      status: 'available',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      projects: ['E-commerce Platform Redesign', 'Marketing Automation'],
      startDate: '2022-06-20',
      reportingTo: 'Sofia Pérez',
      bio: { 
        en: 'Creative designer focused on user-centered design and creating intuitive digital experiences.', 
        es: 'Diseñadora creativa enfocada en el diseño centrado en el usuario y la creación de experiencias digitales intuitivas.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ana-martinez'
      }
    },
    {
      id: '4',
      name: 'Luis Castro',
      position: { en: 'Backend Developer', es: 'Desarrollador Backend' },
      department: { en: 'Engineering', es: 'Ingeniería' },
      email: 'luis.castro@hyrk.io',
      phone: '+52 81 4567-8901',
      location: 'Monterrey, México',
      avatar: 'LC',
      status: 'away',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Microservices'],
      projects: ['API Development', 'Data Analytics Dashboard'],
      startDate: '2023-02-01',
      reportingTo: 'Carlos Ruiz',
      bio: { 
        en: 'Backend specialist with expertise in building robust and scalable server-side applications.', 
        es: 'Especialista en backend con experiencia en la construcción de aplicaciones del lado del servidor robustas y escalables.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/luis-castro',
        github: 'https://github.com/luiscastro'
      }
    },
    {
      id: '5',
      name: 'Sofia Pérez',
      position: { en: 'Design Lead', es: 'Líder de Diseño' },
      department: { en: 'Design', es: 'Diseño' },
      email: 'sofia.perez@hyrk.io',
      phone: '+52 55 5678-9012',
      location: 'Ciudad de México, México',
      avatar: 'SP',
      status: 'available',
      skills: ['Design Strategy', 'Team Leadership', 'Branding', 'Design Systems', 'Figma'],
      projects: ['Mobile App Development', 'Marketing Automation'],
      startDate: '2021-08-15',
      reportingTo: 'CEO',
      bio: { 
        en: 'Design leader passionate about creating cohesive brand experiences and building strong design teams.', 
        es: 'Líder de diseño apasionada por crear experiencias de marca cohesivas y construir equipos de diseño sólidos.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sofia-perez'
      }
    },
    {
      id: '6',
      name: 'Roberto García',
      position: { en: 'DevOps Engineer', es: 'Ingeniero DevOps' },
      department: { en: 'Engineering', es: 'Ingeniería' },
      email: 'roberto.garcia@hyrk.io',
      phone: '+52 33 6789-0123',
      location: 'Guadalajara, México',
      avatar: 'RG',
      status: 'offline',
      skills: ['AWS', 'Terraform', 'Jenkins', 'Docker', 'Monitoring'],
      projects: ['Cloud Migration'],
      startDate: '2022-11-01',
      reportingTo: 'Carlos Ruiz',
      bio: { 
        en: 'DevOps engineer specialized in cloud infrastructure and automation pipelines.', 
        es: 'Ingeniero DevOps especializado en infraestructura en la nube y pipelines de automatización.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/roberto-garcia',
        github: 'https://github.com/robertogarcia'
      }
    },
    {
      id: '7',
      name: 'Laura Kim',
      position: { en: 'Marketing Manager', es: 'Gerente de Marketing' },
      department: { en: 'Marketing', es: 'Marketing' },
      email: 'laura.kim@hyrk.io',
      phone: '+52 55 7890-1234',
      location: 'Ciudad de México, México',
      avatar: 'LK',
      status: 'busy',
      skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics', 'Campaign Management'],
      projects: ['Marketing Automation'],
      startDate: '2023-01-15',
      reportingTo: 'CEO',
      bio: { 
        en: 'Marketing professional with expertise in digital campaigns and growth strategies.', 
        es: 'Profesional de marketing con experiencia en campañas digitales y estrategias de crecimiento.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/laura-kim'
      }
    },
    {
      id: '8',
      name: 'David Brown',
      position: { en: 'Sales Representative', es: 'Representante de Ventas' },
      department: { en: 'Sales', es: 'Ventas' },
      email: 'david.brown@hyrk.io',
      phone: '+52 81 8901-2345',
      location: 'Monterrey, México',
      avatar: 'DB',
      status: 'available',
      skills: ['Sales Strategy', 'Client Relations', 'CRM', 'Negotiation', 'Business Development'],
      projects: ['Marketing Automation'],
      startDate: '2022-09-01',
      reportingTo: 'CEO',
      bio: { 
        en: 'Sales professional focused on building lasting client relationships and driving business growth.', 
        es: 'Profesional de ventas enfocado en construir relaciones duraderas con clientes e impulsar el crecimiento empresarial.' 
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/in/david-brown'
      }
    }
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesDepartment = filterDepartment === 'all' || 
        employee.department.en.toLowerCase().includes(filterDepartment) ||
        employee.department.es.toLowerCase().includes(filterDepartment);
      
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDepartment && matchesSearch;
    });
  }, [filterDepartment, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-zinc-500';
      default: return 'bg-zinc-500';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      available: { en: 'Available', es: 'Disponible' },
      busy: { en: 'Busy', es: 'Ocupado' },
      away: { en: 'Away', es: 'Ausente' },
      offline: { en: 'Offline', es: 'Desconectado' }
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all cursor-pointer"
      onClick={() => setSelectedEmployee(employee)}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-xl text-white font-bold">
            {employee.avatar}
          </div>
          <span className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(employee.status)} rounded-full border-2 border-zinc-900`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg">{employee.name}</h3>
          <p className="text-zinc-400 text-sm mb-1">{employee.position[language]}</p>
          <p className="text-zinc-500 text-xs mb-3">{employee.department[language]}</p>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-zinc-400 text-xs">📍</span>
            <span className="text-zinc-400 text-xs">{employee.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {employee.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {employee.skills.length > 3 && (
              <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
                +{employee.skills.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-xs">{getStatusText(employee.status)}</span>
            <div className="flex space-x-2">
              <span className="text-zinc-400 hover:text-white cursor-pointer">📧</span>
              <span className="text-zinc-400 hover:text-white cursor-pointer">📞</span>
              {employee.socialLinks.linkedin && (
                <span className="text-zinc-400 hover:text-white cursor-pointer">💼</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-lexend font-bold text-white">
            {language === 'en' ? 'Team Directory' : 'Directorio del Equipo'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {language === 'en' 
              ? 'Connect with team members and view organizational structure' 
              : 'Conecta con miembros del equipo y ve la estructura organizacional'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
        >
          {language === 'en' ? '+ Add Member' : '+ Agregar Miembro'}
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: { en: 'Total Members', es: 'Miembros Totales' }, value: employees.length },
          { label: { en: 'Available', es: 'Disponibles' }, value: employees.filter(e => e.status === 'available').length },
          { label: { en: 'Departments', es: 'Departamentos' }, value: new Set(employees.map(e => e.department.en)).size },
          { label: { en: 'Active Projects', es: 'Proyectos Activos' }, value: new Set(employees.flatMap(e => e.projects)).size }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <p className="text-zinc-400 text-sm mb-1">{stat.label[language]}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
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
              placeholder={language === 'en' ? 'Search team members...' : 'Buscar miembros del equipo...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value as FilterDepartment)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="all">{language === 'en' ? 'All Departments' : 'Todos los Departamentos'}</option>
              <option value="engineering">{language === 'en' ? 'Engineering' : 'Ingeniería'}</option>
              <option value="design">{language === 'en' ? 'Design' : 'Diseño'}</option>
              <option value="marketing">Marketing</option>
              <option value="sales">{language === 'en' ? 'Sales' : 'Ventas'}</option>
              <option value="hr">HR</option>
              <option value="finance">{language === 'en' ? 'Finance' : 'Finanzas'}</option>
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

      {/* Team Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'en' ? 'No team members found' : 'No se encontraron miembros del equipo'}
          </h3>
          <p className="text-zinc-400">
            {language === 'en' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Intenta ajustar tu búsqueda o criterios de filtro'
            }
          </p>
        </div>
      )}

      {/* Employee Modal/Details */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                      {selectedEmployee.avatar}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(selectedEmployee.status)} rounded-full border-2 border-zinc-900`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-lexend font-bold text-white mb-1">
                      {selectedEmployee.name}
                    </h2>
                    <p className="text-zinc-400 mb-1">{selectedEmployee.position[language]}</p>
                    <p className="text-zinc-500 text-sm">{selectedEmployee.department[language]}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-zinc-300 leading-relaxed">{selectedEmployee.bio[language]}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-400">📧</span>
                        <a href={`mailto:${selectedEmployee.email}`} className="text-white hover:text-zinc-300">
                          {selectedEmployee.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-400">📞</span>
                        <a href={`tel:${selectedEmployee.phone}`} className="text-white hover:text-zinc-300">
                          {selectedEmployee.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-400">📍</span>
                        <span className="text-white">{selectedEmployee.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Work Information' : 'Información Laboral'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Start Date:' : 'Fecha de Inicio:'}
                        </span>
                        <span className="text-white">
                          {new Date(selectedEmployee.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Reports To:' : 'Reporta a:'}
                        </span>
                        <span className="text-white">{selectedEmployee.reportingTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">
                          {language === 'en' ? 'Status:' : 'Estado:'}
                        </span>
                        <span className="text-white">{getStatusText(selectedEmployee.status)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">
                    {language === 'en' ? 'Skills & Expertise' : 'Habilidades y Experiencia'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">
                    {language === 'en' ? 'Current Projects' : 'Proyectos Actuales'}
                  </h3>
                  <div className="space-y-2">
                    {selectedEmployee.projects.map((project, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 bg-zinc-800 rounded-lg px-3 py-2"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-white text-sm">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {Object.keys(selectedEmployee.socialLinks).length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Social Links' : 'Enlaces Sociales'}
                    </h3>
                    <div className="flex space-x-4">
                      {selectedEmployee.socialLinks.linkedin && (
                        <a
                          href={selectedEmployee.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                      {selectedEmployee.socialLinks.github && (
                        <a
                          href={selectedEmployee.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {selectedEmployee.socialLinks.twitter && (
                        <a
                          href={selectedEmployee.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          Twitter
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}