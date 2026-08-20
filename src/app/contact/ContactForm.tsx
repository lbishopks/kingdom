"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to a Vercel API route, Formspree, or your CRM of choice.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-royal/10 bg-royal/5 p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-royal">Message received!</h2>
        <p className="mt-2 text-muted">Thanks for reaching out — we&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-royal"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-royal"
        />
      </div>
      <div>
        <label htmlFor="reason" className="text-sm font-medium text-ink">
          I&apos;m reaching out as a...
        </label>
        <select
          id="reason"
          name="reason"
          className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-royal"
        >
          <option>Parent / Family</option>
          <option>Community or Faith Leader</option>
          <option>Entertainment Industry</option>
          <option>Business Leader / Sponsor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 outline-none focus:ring-2 focus:ring-royal"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-royal px-7 py-3 text-sm font-semibold text-paper transition hover:bg-royal-light"
      >
        Send Message
      </button>
    </form>
  );
}
