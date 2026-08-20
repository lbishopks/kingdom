"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import { contentSeries } from "@/lib/site";

const imageFields: { key: keyof SiteContent["images"]; label: string; hint: string }[] = [
  { key: "hero", label: "Homepage Hero Image", hint: "Shown at the top of the homepage." },
  { key: "about", label: "Our Story Photo", hint: "Shown on the Our Story page." },
  { key: "mission", label: "Our Mission Photo", hint: "Shown on the Our Mission page." },
];

export default function Dashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleUpload(field: keyof SiteContent["images"], file: File) {
    setUploading(field);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setContent((prev) => ({ ...prev, images: { ...prev.images, [field]: data.url } }));
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setUploading(null);
    }
  }

  function handleVideoChange(slug: string, value: string) {
    setContent((prev) => ({ ...prev, videos: { ...prev.videos, [slug]: value } }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setMessage({ type: "success", text: "Changes saved and live on the site." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Save failed." });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-royal">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Update site photos and video links. Changes go live after you save.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-royal/20 px-4 py-2 text-sm font-semibold text-royal hover:bg-royal/5"
        >
          Log out
        </button>
      </div>

      {message && (
        <div
          className={`mt-6 rounded-lg px-4 py-3 text-sm ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mt-10 space-y-8">
        <h2 className="font-display text-xl font-semibold text-royal">Photos</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {imageFields.map((field) => (
            <div key={field.key} className="rounded-2xl border border-royal/10 p-5">
              <p className="font-semibold text-ink">{field.label}</p>
              <p className="mt-1 text-xs text-muted">{field.hint}</p>

              <div className="mt-3 aspect-[4/3] overflow-hidden rounded-lg bg-royal/5">
                {content.images[field.key] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={content.images[field.key]} alt={field.label} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted">No image yet</div>
                )}
              </div>

              <label className="mt-3 block">
                <span className="sr-only">Upload {field.label}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-xs"
                  disabled={uploading === field.key}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(field.key, file);
                  }}
                />
              </label>
              {uploading === field.key && <p className="mt-1 text-xs text-muted">Uploading...</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="font-display text-xl font-semibold text-royal">Video Links</h2>
        <p className="text-sm text-muted">Paste the YouTube URL for each series. Leave blank to hide the link.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {contentSeries.map((series) => (
            <div key={series.slug}>
              <label htmlFor={`video-${series.slug}`} className="text-sm font-medium text-ink">
                {series.title}
              </label>
              <input
                id={`video-${series.slug}`}
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={content.videos[series.slug] ?? ""}
                onChange={(e) => handleVideoChange(series.slug, e.target.value)}
                className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-12 rounded-full bg-royal px-7 py-3 text-sm font-semibold text-paper transition hover:bg-royal-light disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </section>
  );
}
