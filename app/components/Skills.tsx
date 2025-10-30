'use client';

import { motion, useInView } from 'framer-motion';
import { Database, Globe, Layers, Terminal } from 'lucide-react';
import { useRef } from 'react';
import { TechIcons } from './TechIcons';

const skillCategories = [
  {
    icon: Globe,
    title: 'Frontend',
    color: 'primary',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 80 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
    ]
  },
  {
    icon: Terminal,
    title: 'Backend',
    color: 'secondary',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Django', level: 95 },
      { name: 'API Design', level: 80 },
      { name: 'FastAPI', level: 90 },
    ]
  },
  {
    icon: Database,
    title: 'Database & Cloud',
    color: 'tertiary',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 85 },
      { name: 'Supabase', level: 92 },
      { name: 'Cloudflare', level: 80 }
    ]
  },
  {
    icon: Layers,
    title: 'Tools & Workflow',
    color: 'secondary',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Jira', level: 85 },
      { name: 'Scrum', level: 88 }
    ]
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
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
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            Habilidades
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-neutral bg-clip-text text-transparent">
              Stack Tecnológico
            </span>
          </h2>
          <p className="text-xl text-neutral-variant max-w-3xl mx-auto leading-relaxed">
            Dominio de tecnologías modernas para construir aplicaciones robustas y escalables
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-card-bg border border-neutral/10 hover:border-primary/30 transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-xl bg-${category.color}/20 border border-${category.color}/30`}
                  >
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = TechIcons[skill.name];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            {IconComponent && (
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                                className={`text-${category.color}`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </motion.div>
                            )}
                            <span className="text-foreground font-medium">{skill.name}</span>
                          </div>
                          <span className="text-neutral text-sm">{skill.level}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-neutral/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                              ease: "easeOut"
                            }}
                            className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/60 rounded-full relative`}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-variant mb-4">
            Siempre aprendiendo y explorando nuevas tecnologías
          </p>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block text-4xl"
          >
            🚀
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}