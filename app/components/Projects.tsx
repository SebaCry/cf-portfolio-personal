'use client';

import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { TechIcons } from './TechIcons';

const projects = [
  {
    title: 'SIEKI',
    description: 'Plataforma completa de comercio electrónico y panel administrativo para la empresa Epa Keratinas Ibague con procesamiento de pagos, gestión de inventario y panel de administración.',
    technologies: ['Django', 'React', 'Supabase'],
    videoUrl: '/videos/sieki-demo.mp4', // Ruta a tu video
    githubUrl: 'https://github.com/SebaCry/django-sieki',
    demoUrl: 'https://django-sieki.onrender.com',
    gradient: 'from-primary to-secondary',
    featured: true
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full rounded-2xl bg-card-bg border border-neutral/10 hover:border-primary/30 transition-all overflow-hidden"
              >
                {/* Featured badge */}
                {project.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm border border-primary/30 shadow-lg"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">Destacado</span>
                  </motion.div>
                )}

                {/* Video Preview */}
                <div className="relative w-full aspect-video bg-neutral/5 overflow-hidden">
                  <motion.video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Video overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-variant leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies with Icons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech) => {
                      const IconComponent = TechIcons[tech];
                      return (
                        <motion.div
                          key={tech}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral/10 border border-neutral/20 hover:border-primary/30 transition-all"
                        >
                          {IconComponent && (
                            <IconComponent className="w-4 h-4 text-primary" />
                          )}
                          <span className="text-sm font-medium text-neutral">
                            {tech}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.githubUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all border border-primary/20"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Código</span>
                    </motion.a>
                    <motion.a
                      href={project.demoUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all border border-secondary/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
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