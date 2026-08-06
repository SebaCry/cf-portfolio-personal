'use client';

import emailjs from '@emailjs/browser';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../lib/i18n';

const EMAILJS_SERVICE_ID = 'service_jog6pxo';
const EMAILJS_TEMPLATE_ID = 'template_suijyms';
const EMAILJS_PUBLIC_KEY = 'gtoVHAzEdEhnJmmyC';

type Status = 'idle' | 'sending' | 'success' | 'error';

/** `dict.contact.form` son todo strings, así que se puede serializar a cliente. */
export default function ContactForm({ t }: { t: Dictionary['contact']['form'] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // El mensaje de resultado se limpia solo, pero sin dejar el timer colgando
  // si el componente se desmonta antes.
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const timer = setTimeout(() => setStatus('idle'), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'sending' || !formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setStatus('error');
    }
  };

  const isSending = status === 'sending';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="w-full rounded-xl border border-neutral/20 bg-card-bg px-4 py-3 text-foreground transition-colors placeholder:text-neutral focus:border-primary focus:outline-none"
          placeholder={t.namePlaceholder}
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full rounded-xl border border-neutral/20 bg-card-bg px-4 py-3 text-foreground transition-colors placeholder:text-neutral focus:border-primary focus:outline-none"
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          rows={6}
          className="w-full resize-none rounded-xl border border-neutral/20 bg-card-bg px-4 py-3 text-foreground transition-colors placeholder:text-neutral focus:border-primary focus:outline-none"
          placeholder={t.messagePlaceholder}
          required
        />
      </div>

      {/* aria-live: los lectores de pantalla anuncian el resultado del envío. */}
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <p className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-primary">
            <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {t.success}
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-3 rounded-xl border border-error/30 bg-error/10 p-4 text-error">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {t.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="group w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-4 font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
      >
        <span className="flex items-center justify-center gap-2">
          {isSending ? (
            <>
              {t.sending}
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              {t.submit}
              <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </span>
      </button>
    </form>
  );
}
