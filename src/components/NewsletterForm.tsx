"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function NewsletterForm({ variant = "light" }: { variant?: "light" | "footer" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const isFooter = variant === "footer";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("form", "Newsletter Signup");

      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed.");
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <p className={`mt-4 text-sm font-medium ${isFooter ? "text-softgold" : "text-deeprose"}`}>
        You&apos;re on the list! Watch your inbox for updates from Uknighted Kingdom.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
        <label htmlFor={`email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${variant}`}
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          disabled={status === "submitting"}
          className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 disabled:opacity-60 ${
            isFooter
              ? "border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50 focus:ring-softgold"
              : "border-ink/20 bg-white text-ink placeholder:text-muted focus:ring-deeprose"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${
            isFooter ? "bg-softgold text-ink hover:opacity-90" : "gradient-rose text-cream hover:opacity-90"
          }`}
        >
          {status === "submitting" ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {status === "error" && (
        <p className={`mt-2 text-xs ${isFooter ? "text-red-300" : "text-red-600"}`}>
          Something went wrong — please try again in a moment.
        </p>
      )}
    </div>
  );
}
