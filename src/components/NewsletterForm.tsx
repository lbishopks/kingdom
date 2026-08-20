"use client";

import { useState } from "react";

export default function NewsletterForm({ variant = "light" }: { variant?: "light" | "footer" }) {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const isFooter = variant === "footer";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Hook this up to your email provider (Mailchimp, ConvertKit, Beehiiv, etc.)
    // via a Vercel API route or third-party form action.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className={`mt-4 text-sm font-medium ${isFooter ? "text-gold-light" : "text-royal"}`}>
        You&apos;re on the list! Watch your inbox for updates from {isFooter ? "UKnighted" : "us"}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex max-w-sm flex-col gap-2 sm:flex-row" aria-label="Newsletter signup">
      <label htmlFor={`email-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`email-${variant}`}
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className={`w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 ${
          isFooter
            ? "border-paper/30 bg-paper/10 text-paper placeholder:text-paper/50 focus:ring-gold-light"
            : "border-royal/20 bg-white text-ink placeholder:text-muted focus:ring-royal"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
          isFooter ? "bg-gold text-royal hover:bg-gold-light" : "bg-royal text-paper hover:bg-royal-light"
        }`}
      >
        Subscribe
      </button>
    </form>
  );
}
