"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-royal/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-royal">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full gradient-royal text-gold-light">
            ♛
          </span>
          {site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-royal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-royal px-5 py-2 text-sm font-semibold text-paper transition hover:bg-royal-light"
          >
            Get UKnighted
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
        <nav aria-label="Mobile" className="border-t border-royal/10 bg-paper px-6 pb-6 md:hidden">
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
                href="/contact"
                className="inline-block rounded-full bg-royal px-5 py-2 text-sm font-semibold text-paper"
                onClick={() => setOpen(false)}
              >
                Get UKnighted
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
