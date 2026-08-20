import { site } from "@/lib/site";

const socials = [
  { label: "YouTube", href: site.youtube },
  { label: "TikTok", href: site.tiktok },
  { label: "Instagram", href: site.instagram },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-softgold">Connect &amp; Follow</h2>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-softgold">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-xl border-t border-cream/15 pt-8">
          <p className="font-display text-lg">XOXO — Michele Collins, Owner of Uknighted Kingdom</p>
          <p className="mt-2 text-sm italic text-cream/70">
            &ldquo;Do you want love? Do you want a loving family? Join my love mission.&rdquo;
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-1 text-xs text-cream/60">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Combining biblical principles with entertainment for families.</p>
        </div>
      </div>
    </footer>
  );
}
