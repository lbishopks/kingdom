"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full gradient-rose text-cream">
            ♛
          </span>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-deeprose"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#join"
            className="rounded-full gradient-rose px-5 py-2 text-sm font-semibold text-cream transition hover:opacity-90"
          >
            Get Uknighted
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-ink/10 bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block text-base font-medium text-ink" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#join"
                className="inline-block rounded-full gradient-rose px-5 py-2 text-sm font-semibold text-cream"
                onClick={() => setOpen(false)}
              >
                Get Uknighted
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
