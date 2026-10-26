import { content } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { SECTIONS } from '../lib/site';
import { SocialLinks } from './ui';

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { profile, contact } = content;

  return (
    <footer className="border-t border-neutral/15 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-neutral-variant">{profile.role[locale]}</p>
          <p className="text-sm text-neutral-variant">
            {contact.location.locality}, {contact.location.country}
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-neutral-variant hover:text-foreground">
                  {dict.nav[section.label]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-neutral/15 pt-6 text-sm text-neutral-variant sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{dict.footer.builtWith}</p>
      </div>
    </footer>
  );
}
