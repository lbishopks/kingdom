"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import StripeAdmin from "@/components/StripeAdmin";

export default function AdminStripeBridge({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveStripe() {
    setSaving(true);
    setMessage(null);
    try {
      const current = await fetch("/api/content").then((r) => r.json());
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...current, stripe: content.stripe }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setMessage("Stripe settings saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pt-16">
      <StripeAdmin content={content} setContent={setContent} />
      <button
        type="button"
        onClick={saveStripe}
        disabled={saving}
        className="mt-4 rounded-full bg-royal px-7 py-3 text-sm font-semibold text-paper transition hover:bg-royal-light disabled:opacity-60"
      >
        {saving ? "Saving Stripe..." : "Save Stripe Settings"}
      </button>
      {message && <p className="mt-3 text-sm text-muted">{message}</p>}
    </section>
  );
}
