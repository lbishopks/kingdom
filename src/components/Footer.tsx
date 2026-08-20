import Link from "next/link";
import { nav, site } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="gradient-royal text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold">{site.shortName}</p>
            <p className="mt-3 max-w-sm text-sm text-paper/75">{site.description}</p>
            <NewsletterForm variant="footer" />
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-light">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-light">Connect</h2>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold-light">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                  Watch on YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Faith-rooted media for stronger families.</p>
        </div>
      </div>
    </footer>
  );
}
