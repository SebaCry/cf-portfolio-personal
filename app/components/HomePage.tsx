import { content } from '../lib/content';
import { getDictionary, type Locale } from '../lib/i18n';
import Contact from './Contact';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Profile from './Profile';
import Projects from './Projects';
import VideoSection from './VideoSection';
import Websites from './Websites';

/**
 * Composición de la página, compartida por `/` (es) y `/en`.
 * Primero el trabajo y después el perfil: la página les habla a empleadores.
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
        <Projects dict={dict} locale={locale} />
        <VideoSection dict={dict} locale={locale} />
        <Websites dict={dict} />
        <Profile dict={dict} locale={locale} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
