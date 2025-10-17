'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content with Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Disponible para proyectos</span>
            </motion.div>

            {/* Main heading with stagger animation */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="block text-foreground">Hola, soy</span>
                <span className="block bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                  Sebastian Pérez
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 text-xl sm:text-2xl lg:text-3xl text-neutral"
              >
                <span>Desarrollador</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  AI
                </motion.span>
                <span className="text-secondary">Full Stack</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg text-neutral-variant leading-relaxed"
            >
              Creando experiencias digitales excepcionales con código limpio y diseños innovadores.
              Transformo ideas en productos web modernos y funcionales.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-primary text-white rounded-full font-medium overflow-hidden transition-all text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver Proyectos
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/80"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/10 transition-all backdrop-blur-sm text-center"
              >
                Contáctame
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/SebaCry', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/sebastián-perez', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:Jspc513@email.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="p-3 rounded-full bg-card-bg border border-neutral/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-neutral hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Animated border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary opacity-50 blur-xl" />
            </motion.div>

            {/* Floating particles effect */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 8)}%`,
                  left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 8)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Image container with effects */}
            <motion.div
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-tertiary/20 to-secondary/20 blur-2xl" />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/image.png"
                    alt="Sebastian Pérez"
                    fill
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-tertiary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-neutral" />
      </motion.div>
    </section>
  );
}
