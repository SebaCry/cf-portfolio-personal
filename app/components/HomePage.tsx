import { getDictionary, type Locale } from '../lib/i18n';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Projects from './Projects';
import Skills from './Skills';

/**
 * Composición de la página, compartida por `/` (es) y `/en`.
 * El diccionario se pasa por props: en componentes de servidor no hay contexto
 * de React, y las props mantienen el árbol entero renderizado en el servidor.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar t={dict.nav} locale={locale} />
      <main className="relative">
        <Hero dict={dict} />
        <About dict={dict} />
        <Experience dict={dict} />
        <Skills dict={dict} />
        <Projects dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
