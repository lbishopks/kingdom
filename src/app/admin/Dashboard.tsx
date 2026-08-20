"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import { videoSlots } from "@/lib/site";

export default function Dashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setContent((prev) => ({ ...prev, photo: data.url }));
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setUploading(false);
    }
  }

  function handleVideoFieldChange(slug: string, field: "title" | "url", value: string) {
    setContent((prev) => ({
      ...prev,
      videos: {
        ...prev.videos,
        [slug]: { ...prev.videos[slug], [field]: value },
      },
    }));
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
          <p className="mt-1 text-sm text-muted">
            Update Michele&apos;s photo and video links. Changes go live after you save.
          </p>
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

      <div className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold text-royal">Michele&apos;s Photo</h2>
        <p className="text-sm text-muted">
          Shown in the hero section at the top of the homepage. A clear, warm photo of Michele works best.
        </p>
        <div className="max-w-xs rounded-2xl border border-royal/10 p-5">
          <div className="aspect-square overflow-hidden rounded-lg bg-royal/5">
            {content.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.photo} alt="Michele Collins" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted">No photo yet</div>
            )}
          </div>

          <label className="mt-3 block">
            <span className="sr-only">Upload photo</span>
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </label>
          {uploading && <p className="mt-1 text-xs text-muted">Uploading...</p>}
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="font-display text-xl font-semibold text-royal">Watch Videos</h2>
        <p className="text-sm text-muted">
          These three videos appear in the Watch section. Each has a title and a video link — both editable any
          time. Links can be a YouTube URL or a direct link to a video file (e.g. ending in .mp4) hosted anywhere
          else. Leave the link blank to hide playback and show a link to your channel instead.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {videoSlots.map((slot) => {
            const entry = content.videos[slot.slug] ?? {
              title: slot.defaultTitle,
              url: slot.defaultUrl,
              duration: slot.defaultDuration,
            };
            return (
              <div key={slot.slug} className="rounded-2xl border border-royal/10 p-5">
                <label htmlFor={`video-title-${slot.slug}`} className="text-sm font-medium text-ink">
                  Title
                </label>
                <input
                  id={`video-title-${slot.slug}`}
                  type="text"
                  placeholder={slot.defaultTitle}
                  value={entry.title}
                  onChange={(e) => handleVideoFieldChange(slot.slug, "title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
                />

                <label htmlFor={`video-url-${slot.slug}`} className="mt-3 block text-sm font-medium text-ink">
                  Video Link
                </label>
                <input
                  id={`video-url-${slot.slug}`}
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                  value={entry.url}
                  onChange={(e) => handleVideoFieldChange(slot.slug, "url", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
                />
              </div>
            );
          })}
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
