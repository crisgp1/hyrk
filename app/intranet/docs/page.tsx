'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Document {
  id: string;
  title: { en: string; es: string };
  category: { en: string; es: string };
  type: 'guide' | 'policy' | 'template' | 'api' | 'tutorial' | 'process';
  content: { en: string; es: string };
  tags: string[];
  author: string;
  lastUpdated: string;
  views: number;
  status: 'published' | 'draft' | 'archived';
  attachments?: string[];
  relatedDocs?: string[];
}

interface Category {
  id: string;
  name: { en: string; es: string };
  icon: string;
  count: number;
  description: { en: string; es: string };
}

type ViewMode = 'grid' | 'list' | 'tree';
type FilterType = 'all' | 'guide' | 'policy' | 'template' | 'api' | 'tutorial' | 'process';
type FilterStatus = 'all' | 'published' | 'draft' | 'archived';

export default function DocsPage() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('published');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const documents: Document[] = [
    {
      id: '1',
      title: { 
        en: 'Employee Onboarding Guide', 
        es: 'Guía de Incorporación de Empleados' 
      },
      category: { en: 'HR', es: 'Recursos Humanos' },
      type: 'guide',
      content: { 
        en: 'Complete guide for new employee onboarding process, including paperwork, equipment setup, and team introductions.',
        es: 'Guía completa para el proceso de incorporación de nuevos empleados, incluyendo documentación, configuración de equipos e introducciones del equipo.'
      },
      tags: ['HR', 'Onboarding', 'Process', 'New Hire'],
      author: 'María González',
      lastUpdated: '2024-07-15',
      views: 245,
      status: 'published',
      attachments: ['onboarding-checklist.pdf', 'welcome-package.pdf'],
      relatedDocs: ['2', '3']
    },
    {
      id: '2',
      title: { 
        en: 'Code Review Standards', 
        es: 'Estándares de Revisión de Código' 
      },
      category: { en: 'Engineering', es: 'Ingeniería' },
      type: 'policy',
      content: { 
        en: 'Guidelines and best practices for conducting code reviews, including review criteria, process, and tools.',
        es: 'Pautas y mejores prácticas para realizar revisiones de código, incluyendo criterios de revisión, proceso y herramientas.'
      },
      tags: ['Engineering', 'Code Review', 'Standards', 'Best Practices'],
      author: 'Carlos Ruiz',
      lastUpdated: '2024-07-12',
      views: 189,
      status: 'published',
      attachments: ['code-review-checklist.md'],
      relatedDocs: ['4', '5']
    },
    {
      id: '3',
      title: { 
        en: 'Remote Work Policy', 
        es: 'Política de Trabajo Remoto' 
      },
      category: { en: 'HR', es: 'Recursos Humanos' },
      type: 'policy',
      content: { 
        en: 'Company policy for remote work arrangements, including eligibility, expectations, and communication guidelines.',
        es: 'Política de la empresa para acuerdos de trabajo remoto, incluyendo elegibilidad, expectativas y pautas de comunicación.'
      },
      tags: ['HR', 'Remote Work', 'Policy', 'Communication'],
      author: 'Sofia Pérez',
      lastUpdated: '2024-07-10',
      views: 156,
      status: 'published',
      attachments: ['remote-work-agreement.pdf'],
      relatedDocs: ['1']
    },
    {
      id: '4',
      title: { 
        en: 'API Documentation Template', 
        es: 'Plantilla de Documentación de API' 
      },
      category: { en: 'Engineering', es: 'Ingeniería' },
      type: 'template',
      content: { 
        en: 'Standard template for documenting APIs, including endpoints, parameters, examples, and authentication.',
        es: 'Plantilla estándar para documentar APIs, incluyendo endpoints, parámetros, ejemplos y autenticación.'
      },
      tags: ['Engineering', 'API', 'Documentation', 'Template'],
      author: 'Luis Castro',
      lastUpdated: '2024-07-08',
      views: 134,
      status: 'published',
      attachments: ['api-template.md', 'openapi-spec.json'],
      relatedDocs: ['2', '6']
    },
    {
      id: '5',
      title: { 
        en: 'Git Workflow Tutorial', 
        es: 'Tutorial de Flujo de Trabajo Git' 
      },
      category: { en: 'Engineering', es: 'Ingeniería' },
      type: 'tutorial',
      content: { 
        en: 'Step-by-step tutorial for using Git in team projects, including branching strategies and merge procedures.',
        es: 'Tutorial paso a paso para usar Git en proyectos de equipo, incluyendo estrategias de ramificación y procedimientos de fusión.'
      },
      tags: ['Engineering', 'Git', 'Version Control', 'Tutorial'],
      author: 'Roberto García',
      lastUpdated: '2024-07-05',
      views: 98,
      status: 'published',
      attachments: ['git-commands.txt'],
      relatedDocs: ['2', '4']
    },
    {
      id: '6',
      title: { 
        en: 'REST API Reference', 
        es: 'Referencia de API REST' 
      },
      category: { en: 'Engineering', es: 'Ingeniería' },
      type: 'api',
      content: { 
        en: 'Complete reference for our REST API endpoints, including authentication, rate limiting, and error codes.',
        es: 'Referencia completa para nuestros endpoints de API REST, incluyendo autenticación, limitación de velocidad y códigos de error.'
      },
      tags: ['API', 'REST', 'Reference', 'Documentation'],
      author: 'Ana Martínez',
      lastUpdated: '2024-07-18',
      views: 267,
      status: 'published',
      attachments: ['api-reference.json', 'postman-collection.json'],
      relatedDocs: ['4']
    },
    {
      id: '7',
      title: { 
        en: 'Design System Guidelines', 
        es: 'Pautas del Sistema de Diseño' 
      },
      category: { en: 'Design', es: 'Diseño' },
      type: 'guide',
      content: { 
        en: 'Comprehensive guide to our design system, including colors, typography, components, and usage guidelines.',
        es: 'Guía completa de nuestro sistema de diseño, incluyendo colores, tipografía, componentes y pautas de uso.'
      },
      tags: ['Design', 'Design System', 'UI', 'Branding'],
      author: 'Sofia Pérez',
      lastUpdated: '2024-07-14',
      views: 203,
      status: 'published',
      attachments: ['design-tokens.json', 'component-library.figma'],
      relatedDocs: ['8']
    },
    {
      id: '8',
      title: { 
        en: 'Project Proposal Template', 
        es: 'Plantilla de Propuesta de Proyecto' 
      },
      category: { en: 'Business', es: 'Negocio' },
      type: 'template',
      content: { 
        en: 'Standard template for creating project proposals, including scope, timeline, budget, and deliverables.',
        es: 'Plantilla estándar para crear propuestas de proyectos, incluyendo alcance, cronograma, presupuesto y entregables.'
      },
      tags: ['Business', 'Proposal', 'Template', 'Project Management'],
      author: 'Laura Kim',
      lastUpdated: '2024-07-11',
      views: 176,
      status: 'published',
      attachments: ['proposal-template.docx', 'budget-calculator.xlsx'],
      relatedDocs: ['9']
    },
    {
      id: '9',
      title: { 
        en: 'Client Communication Process', 
        es: 'Proceso de Comunicación con Clientes' 
      },
      category: { en: 'Business', es: 'Negocio' },
      type: 'process',
      content: { 
        en: 'Standard process for client communication, including meeting protocols, status updates, and escalation procedures.',
        es: 'Proceso estándar para comunicación con clientes, incluyendo protocolos de reuniones, actualizaciones de estado y procedimientos de escalación.'
      },
      tags: ['Business', 'Communication', 'Process', 'Client Relations'],
      author: 'David Brown',
      lastUpdated: '2024-07-09',
      views: 142,
      status: 'published',
      attachments: ['communication-templates.pdf'],
      relatedDocs: ['8']
    },
    {
      id: '10',
      title: { 
        en: 'Security Best Practices', 
        es: 'Mejores Prácticas de Seguridad' 
      },
      category: { en: 'Security', es: 'Seguridad' },
      type: 'guide',
      content: { 
        en: 'Security guidelines and best practices for development, including authentication, data protection, and vulnerability management.',
        es: 'Pautas de seguridad y mejores prácticas para desarrollo, incluyendo autenticación, protección de datos y gestión de vulnerabilidades.'
      },
      tags: ['Security', 'Best Practices', 'Development', 'Data Protection'],
      author: 'Roberto García',
      lastUpdated: '2024-07-16',
      views: 221,
      status: 'published',
      attachments: ['security-checklist.pdf', 'owasp-guide.pdf'],
      relatedDocs: ['2', '6']
    }
  ];

  const categories: Category[] = [
    {
      id: 'hr',
      name: { en: 'Human Resources', es: 'Recursos Humanos' },
      icon: '👥',
      count: documents.filter(d => d.category.en === 'HR').length,
      description: { en: 'HR policies, procedures, and guidelines', es: 'Políticas, procedimientos y pautas de RH' }
    },
    {
      id: 'engineering',
      name: { en: 'Engineering', es: 'Ingeniería' },
      icon: '⚙️',
      count: documents.filter(d => d.category.en === 'Engineering').length,
      description: { en: 'Technical documentation and development guides', es: 'Documentación técnica y guías de desarrollo' }
    },
    {
      id: 'design',
      name: { en: 'Design', es: 'Diseño' },
      icon: '🎨',
      count: documents.filter(d => d.category.en === 'Design').length,
      description: { en: 'Design systems, guidelines, and assets', es: 'Sistemas de diseño, pautas y recursos' }
    },
    {
      id: 'business',
      name: { en: 'Business', es: 'Negocio' },
      icon: '💼',
      count: documents.filter(d => d.category.en === 'Business').length,
      description: { en: 'Business processes and templates', es: 'Procesos empresariales y plantillas' }
    },
    {
      id: 'security',
      name: { en: 'Security', es: 'Seguridad' },
      icon: '🔒',
      count: documents.filter(d => d.category.en === 'Security').length,
      description: { en: 'Security policies and best practices', es: 'Políticas de seguridad y mejores prácticas' }
    }
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesType = filterType === 'all' || doc.type === filterType;
      const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
      const matchesCategory = selectedCategory === 'all' || 
        doc.category.en.toLowerCase() === categories.find(c => c.id === selectedCategory)?.name.en.toLowerCase();
      const matchesSearch = 
        doc.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.title.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesType && matchesStatus && matchesCategory && matchesSearch;
    });
  }, [filterType, filterStatus, selectedCategory, searchQuery]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'text-blue-400 border-blue-400';
      case 'policy': return 'text-red-400 border-red-400';
      case 'template': return 'text-green-400 border-green-400';
      case 'api': return 'text-purple-400 border-purple-400';
      case 'tutorial': return 'text-yellow-400 border-yellow-400';
      case 'process': return 'text-orange-400 border-orange-400';
      default: return 'text-zinc-400 border-zinc-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '📖';
      case 'policy': return '📋';
      case 'template': return '📄';
      case 'api': return '🔗';
      case 'tutorial': return '🎓';
      case 'process': return '⚡';
      default: return '📝';
    }
  };

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all cursor-pointer"
      onClick={() => setSelectedDoc(doc)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(doc.type)}</span>
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">{doc.title[language]}</h3>
            <p className="text-zinc-400 text-sm">{doc.category[language]}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs border rounded ${getTypeColor(doc.type)}`}>
          {doc.type.toUpperCase()}
        </span>
      </div>

      <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{doc.content[language]}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-zinc-500 text-xs">👁</span>
            <span className="text-zinc-500 text-xs">{doc.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-zinc-500 text-xs">👤</span>
            <span className="text-zinc-500 text-xs">{doc.author}</span>
          </div>
        </div>
        <span className="text-zinc-500 text-xs">
          {new Date(doc.lastUpdated).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {doc.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {doc.tags.length > 3 && (
          <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
            +{doc.tags.length - 3}
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
            {language === 'en' ? 'Knowledge Base' : 'Base de Conocimiento'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {language === 'en' 
              ? 'Access company documentation, guides, and resources' 
              : 'Accede a documentación, guías y recursos de la empresa'
            }
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
        >
          {language === 'en' ? '+ New Document' : '+ Nuevo Documento'}
        </motion.button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-zinc-900 border rounded-xl p-4 cursor-pointer transition-all ${
            selectedCategory === 'all' ? 'border-white' : 'border-zinc-800 hover:border-zinc-700'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          <div className="text-center">
            <span className="text-2xl mb-2 block">📚</span>
            <h3 className="text-white font-semibold">
              {language === 'en' ? 'All Docs' : 'Todos'}
            </h3>
            <p className="text-zinc-400 text-sm">{documents.length}</p>
          </div>
        </motion.div>

        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-zinc-900 border rounded-xl p-4 cursor-pointer transition-all ${
              selectedCategory === category.id ? 'border-white' : 'border-zinc-800 hover:border-zinc-700'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">{category.icon}</span>
              <h3 className="text-white font-semibold">{category.name[language]}</h3>
              <p className="text-zinc-400 text-sm">{category.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder={language === 'en' ? 'Search documentation...' : 'Buscar documentación...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="all">{language === 'en' ? 'All Types' : 'Todos los Tipos'}</option>
              <option value="guide">{language === 'en' ? 'Guides' : 'Guías'}</option>
              <option value="policy">{language === 'en' ? 'Policies' : 'Políticas'}</option>
              <option value="template">{language === 'en' ? 'Templates' : 'Plantillas'}</option>
              <option value="api">API</option>
              <option value="tutorial">{language === 'en' ? 'Tutorials' : 'Tutoriales'}</option>
              <option value="process">{language === 'en' ? 'Processes' : 'Procesos'}</option>
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

      {/* Documents Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {language === 'en' ? 'No documents found' : 'No se encontraron documentos'}
          </h3>
          <p className="text-zinc-400">
            {language === 'en' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Intenta ajustar tu búsqueda o criterios de filtro'
            }
          </p>
        </div>
      )}

      {/* Document Modal/Details */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoc(null)}
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
                  <span className="text-3xl">{getTypeIcon(selectedDoc.type)}</span>
                  <div>
                    <h2 className="text-2xl font-vertiga-black text-white mb-1">
                      {selectedDoc.title[language]}
                    </h2>
                    <p className="text-zinc-400 mb-2">{selectedDoc.category[language]}</p>
                    <div className="flex items-center space-x-4 text-sm text-zinc-500">
                      <span>👤 {selectedDoc.author}</span>
                      <span>📅 {new Date(selectedDoc.lastUpdated).toLocaleDateString()}</span>
                      <span>👁 {selectedDoc.views} views</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-zinc-300 leading-relaxed text-lg">{selectedDoc.content[language]}</p>
                </div>

                {selectedDoc.attachments && selectedDoc.attachments.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Attachments' : 'Archivos Adjuntos'}
                    </h3>
                    <div className="space-y-2">
                      {selectedDoc.attachments.map((attachment, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 bg-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-700 cursor-pointer transition-colors"
                        >
                          <span className="text-zinc-400">📎</span>
                          <span className="text-white text-sm">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-white font-semibold mb-3">
                    {language === 'en' ? 'Tags' : 'Etiquetas'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedDoc.relatedDocs && selectedDoc.relatedDocs.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      {language === 'en' ? 'Related Documents' : 'Documentos Relacionados'}
                    </h3>
                    <div className="space-y-2">
                      {selectedDoc.relatedDocs.map((relatedId, i) => {
                        const relatedDoc = documents.find(d => d.id === relatedId);
                        if (!relatedDoc) return null;
                        return (
                          <div
                            key={i}
                            className="flex items-center space-x-2 bg-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-700 cursor-pointer transition-colors"
                            onClick={() => setSelectedDoc(relatedDoc)}
                          >
                            <span className="text-xl">{getTypeIcon(relatedDoc.type)}</span>
                            <span className="text-white text-sm">{relatedDoc.title[language]}</span>
                          </div>
                        );
                      })}
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