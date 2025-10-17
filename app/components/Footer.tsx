'use client';

import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

const footerLinks = [
  {
    title: 'Navegación',
    links: [
      { name: 'Inicio', href: '#hero' },
      { name: 'Sobre Mí', href: '#about' },
      { name: 'Proyectos', href: '#projects' },
      { name: 'Contacto', href: '#contact' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { name: 'Desarrollo Web', href: '#' },
      { name: 'Desarrollo Móvil', href: '#' },
      { name: 'UI/UX Design', href: '#' },
      { name: 'Consultoría', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 sm:px-12 lg:px-16 border-t border-neutral/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                  Sebastian Pérez
                </span>
              </h3>
              <p className="text-neutral-variant mb-6 leading-relaxed max-w-md">
                Desarrollador AI-Full Stack apasionado por crear experiencias web excepcionales.
                Transformando ideas en realidad digital.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-card-bg border border-neutral/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-neutral hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h4 className="text-foreground font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-variant hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-neutral/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-neutral-variant text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Portfolio. Hecho con
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-error fill-error" />
            </motion.span>
            y mucho café
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-neutral-variant hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-neutral-variant hover:text-primary transition-colors">
              Términos de Uso
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}