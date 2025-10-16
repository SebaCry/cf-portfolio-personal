'use client';

import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Plataforma completa de comercio electrónico con procesamiento de pagos, gestión de inventario y panel de administración.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    gradient: 'from-primary to-secondary',
    featured: true
  },
  {
    title: 'AI Content Generator',
    description: 'Aplicación SaaS para generar contenido con IA, incluyendo textos, imágenes y análisis de datos en tiempo real.',
    tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
    gradient: 'from-tertiary to-primary',
    featured: true
  },
  {
    title: 'Task Management App',
    description: 'Sistema de gestión de tareas colaborativo con tableros Kanban, seguimiento de tiempo y reportes.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
    gradient: 'from-secondary to-tertiary',
    featured: false
  },
  {
    title: 'Fitness Tracker',
    description: 'App móvil y web para seguimiento de ejercicios, nutrición y progreso personal con gráficas interactivas.',
    tags: ['React Native', 'Firebase', 'Chart.js'],
    gradient: 'from-primary to-tertiary',
    featured: false
  },
  {
    title: 'Real Estate Platform',
    description: 'Plataforma inmobiliaria con búsqueda avanzada, tours virtuales 3D y sistema de agendamiento.',
    tags: ['Next.js', 'Three.js', 'Prisma', 'Tailwind'],
    gradient: 'from-secondary to-primary',
    featured: false
  },
  {
    title: 'Analytics Dashboard',
    description: 'Dashboard de analíticas en tiempo real con visualizaciones interactivas y exportación de reportes.',
    tags: ['React', 'D3.js', 'Node.js', 'Redis'],
    gradient: 'from-tertiary to-secondary',
    featured: false
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-neutral bg-clip-text text-transparent">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-xl text-neutral-variant max-w-3xl mx-auto leading-relaxed">
            Una selección de proyectos que demuestran mi experiencia en desarrollo web
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative h-full p-6 rounded-2xl bg-card-bg border border-neutral/10 hover:border-primary/30 transition-all overflow-hidden"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Featured badge */}
                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">Destacado</span>
                  </motion.div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Project Icon/Number */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} mb-4`}
                  >
                    <span className="text-white font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-variant leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-neutral/10 border border-neutral/20 text-neutral text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Código</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary/30 text-foreground hover:bg-primary/10 transition-all"
          >
            Ver todos los proyectos
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}