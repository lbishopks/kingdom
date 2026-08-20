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
      <p className={`mt-4 text-sm font-medium ${isFooter ? "text-softgold" : "text-deeprose"}`}>
        You&apos;re on the list! Watch your inbox for updates from Uknighted Kingdom.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
      <label htmlFor={`email-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`email-${variant}`}
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 ${
          isFooter
            ? "border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50 focus:ring-softgold"
            : "border-ink/20 bg-white text-ink placeholder:text-muted focus:ring-deeprose"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
          isFooter ? "bg-softgold text-ink hover:opacity-90" : "gradient-rose text-cream hover:opacity-90"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}
