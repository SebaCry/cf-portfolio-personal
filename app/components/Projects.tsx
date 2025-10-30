'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { TechIcons } from './TechIcons';

const projects = [
  {
    title: 'SIEKI',
    description: 'Plataforma completa de comercio electrónico y panel administrativo para la empresa Epa Keratinas Ibague con procesamiento de pagos, gestión de inventario y panel de administración.',
    technologies: ['Django', 'React', 'Supabase'],
    videoUrl: '/assets/sieki-demo.mp4',
    githubUrl: 'https://github.com/SebaCry/django-sieki',
    demoUrl: 'https://django-sieki.onrender.com',
    gradient: 'from-primary to-secondary',
    featured: true,
    type: 'video' as const
  },
  {
    title: 'Django ViewSet',
    technologies: ['Django'],
    type: 'code' as const,
    label: 'Backend con Django 🔥',
    code: `class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(
            is_active=True
        ).order_by('-created_at')`,
    output: `✓ API RESTful lista
✓ Autenticación configurada
✓ Productos ordenados`
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  return (
    <>
      {/* Modal de video expandido */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setExpandedVideo(null)}
          >
            {/* Botón de cerrar */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={() => setExpandedVideo(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Video expandido */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1] // Efecto de rebote suave
              }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={expandedVideo}
                autoPlay
                loop
                controls
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            project.type === 'code' ? (
              // Code Playground - Compact
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index === 2 ? 'lg:-mt-8' : ''}`}
              >
                <div className="rounded-2xl bg-[#1e1e1e] overflow-hidden border border-neutral/20 hover:border-primary/30 transition-all">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-neutral/10">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-neutral-variant text-xs ml-1">
                        {project.technologies?.[0] === 'Python' ? 'playground.py' :
                         project.technologies?.[0] === 'Django' ? 'viewsets.py' :
                         'ProductCard.jsx'}
                      </span>
                    </div>
                    {project.label && (
                      <div className="px-2 py-1 rounded bg-primary/20 border border-primary/40">
                        <span className="text-[10px] text-primary font-medium">{project.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Code Editor */}
                  <div className="p-4 font-mono text-xs">
                    <pre className="text-neutral-variant leading-relaxed whitespace-pre">
{project.code}
                    </pre>

                    {/* Terminal Output */}
                    <div className="mt-3 p-3 bg-black/40 rounded border border-primary/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-primary text-xs">▶</div>
                        <span className="text-[10px] text-neutral-variant">Output:</span>
                      </div>
                      <pre className="text-primary text-xs">
{project.output}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Video Project Card
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
                  <div
                    className="relative w-full aspect-video bg-neutral/5 overflow-hidden cursor-pointer group/video"
                    onClick={() => setExpandedVideo(project.videoUrl || null)}
                  >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-60 group-hover/video:opacity-40 transition-opacity" />

                    {/* Play overlay indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center"
                      >
                        <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                      </motion.div>
                    </div>
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
                    {(project.githubUrl || project.demoUrl) && (
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all border border-primary/20"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-medium">Código</span>
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all border border-secondary/20"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm font-medium">Demo</span>
                          </motion.a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                </motion.div>
              </motion.div>
            )
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
    </>
  );
}