'use client';

import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Rocket, Users } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Code2,
    title: 'Desarrollo',
    description: 'Código limpio, escalable y mantenible con las últimas tecnologías.',
    color: 'from-primary to-primary/60'
  },
  {
    icon: Palette,
    title: 'Diseño',
    description: 'Interfaces modernas e intuitivas que deleitan a los usuarios.',
    color: 'from-tertiary to-tertiary/60'
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimización constante para experiencias ultra rápidas.',
    color: 'from-secondary to-secondary/60'
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajo en equipo efectivo con comunicación clara.',
    color: 'from-primary to-tertiary'
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 px-6 sm:px-12 lg:px-16">
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
            className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4"
          >
            Sobre Mí
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-neutral bg-clip-text text-transparent">
              Pasión por crear
            </span>
          </h2>
          <p className="text-xl text-neutral-variant max-w-3xl mx-auto leading-relaxed">
            Soy un desarrollador apasionado por construir soluciones web que marquen la diferencia.
            Me especializo en crear experiencias que combinan funcionalidad excepcional con diseño elegante.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group h-full p-6 rounded-2xl bg-card-bg border border-neutral/10 overflow-hidden transition-all hover:border-primary/30"
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-neutral-variant leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-br from-card-bg to-card-bg/50 border border-neutral/10"
        >
          {[
            { value: '50+', label: 'Proyectos' },
            { value: '3+', label: 'Años' },
            { value: '30+', label: 'Clientes' },
            { value: '99%', label: 'Satisfacción' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-variant uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}