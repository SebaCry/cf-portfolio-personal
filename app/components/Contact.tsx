'use client';

import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Jspc513@gmail.com',
    href: 'mailto:Jspc513@email.com',
    color: 'primary'
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+57 315 277 3333',
    href: 'tel:+573152773333',
    color: 'secondary'
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Ibagué, Colombia',
    href: '#',
    color: 'tertiary'
  },
];

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.sendForm(
        "service_jog6pxo",
        "template_suijyms",
        formRef.current!,
        "gtoVHAzEdEhnJmmyC"
      )

      console.log("Mensaje enviado", result.text)
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });

    } catch (err) {
      console.error("Error al enviar: ", err)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 500)
    }
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
            Contacto
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-neutral bg-clip-text text-transparent">
              Trabajemos Juntos
            </span>
          </h2>
          <p className="text-xl text-neutral-variant max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Conversemos sobre cómo puedo ayudarte a hacerlo realidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card-bg border border-neutral/10 hover:border-primary/30 transition-all"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-lg bg-${info.color}/20 border border-${info.color}/30`}
                    >
                      <info.icon className={`w-5 h-5 text-${info.color}`} />
                    </motion.div>
                    <div>
                      <div className="text-sm text-neutral-variant">{info.label}</div>
                      <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-tertiary/10 border border-primary/20"
            >
              <h4 className="text-lg font-bold text-foreground mb-3">
                ¿Por qué trabajar conmigo?
              </h4>
              <ul className="space-y-2 text-neutral-variant">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Respuesta rápida en menos de 24 horas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Código limpio y bien documentado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Comunicación clara y constante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Entrega puntual garantizada</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-neutral/20 text-foreground placeholder:text-neutral focus:border-primary focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-neutral/20 text-foreground placeholder:text-neutral focus:border-primary focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-neutral/20 text-foreground placeholder:text-neutral focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                  required
                />
              </motion.div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-600'
                      : 'bg-red-500/10 border border-red-500/30 text-red-600'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>¡Mensaje enviado exitosamente! Te responderé pronto.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Hubo un error. Por favor intenta de nuevo.</span>
                    </>
                  )}
                </motion.div>
              )}

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium transition-all relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enviar Mensaje
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}