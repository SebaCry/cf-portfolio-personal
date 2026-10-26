import { content } from '../lib/content';
import { getDictionary, type Locale } from '../lib/i18n';
import About from './About';
import Contact from './Contact';
import Education from './Education';
import Experience from './Experience';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Projects from './Projects';
import Skills from './Skills';
import Websites from './Websites';

/**
 * Composición de la página, compartida por `/` (es) y `/en`.
 * El orden de las secciones debe coincidir con `SECTIONS` (app/lib/site.ts).
 * El diccionario se pasa por props: en componentes de servidor no hay contexto
 * de React, y las props mantienen el árbol entero renderizado en el servidor.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar t={dict.nav} locale={locale} name={content.profile.name} />
      <main>
        <Hero dict={dict} locale={locale} />
        <About dict={dict} locale={locale} />
        <Experience dict={dict} locale={locale} />
        <Projects dict={dict} locale={locale} />
        <Websites dict={dict} />
        <Skills dict={dict} locale={locale} />
        <Education dict={dict} locale={locale} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
