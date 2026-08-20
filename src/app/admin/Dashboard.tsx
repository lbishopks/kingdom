"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { OffersContent, SiteContent } from "@/lib/content";
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

  function handleOffersFieldChange(field: "eyebrow" | "heading" | "description" | "alsoAvailableHeading", value: string) {
    setContent((prev) => ({
      ...prev,
      offers: { ...prev.offers, [field]: value },
    }));
  }

  function handleOffersFreeChange(field: keyof OffersContent["free"], value: string) {
    setContent((prev) => ({
      ...prev,
      offers: { ...prev.offers, free: { ...prev.offers.free, [field]: value } },
    }));
  }

  function handleOffersPopularChange(
    field: "label" | "title" | "description" | "bullets" | "buttonText",
    value: string,
  ) {
    setContent((prev) => ({
      ...prev,
      offers: { ...prev.offers, popular: { ...prev.offers.popular, [field]: value } },
    }));
  }

  function handlePopularPriceChange(dollars: string) {
    const cents = Math.max(0, Math.round(Number(dollars || "0") * 100));
    setContent((prev) => ({
      ...prev,
      offers: { ...prev.offers, popular: { ...prev.offers.popular, priceCents: Number.isFinite(cents) ? cents : 0 } },
    }));
  }

  function handleAlsoAvailableChange(index: number, field: "title" | "description", value: string) {
    setContent((prev) => ({
      ...prev,
      offers: {
        ...prev.offers,
        alsoAvailable: prev.offers.alsoAvailable.map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        ),
      },
    }));
  }

  function handleBookingFieldChange(
    field: "eyebrow" | "heading" | "description" | "calendlyUrl" | "buttonText",
    value: string,
  ) {
    setContent((prev) => ({
      ...prev,
      booking: { ...prev.booking, [field]: value },
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

      <div className="mt-12 space-y-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-royal">How to Get Uknighted (Offers)</h2>
          <p className="text-sm text-muted">
            Everything in the offers section near the bottom of the homepage — headings, the free and paid cards,
            and the &quot;Also Available&quot; row. Edit any text below; it goes live after you save.
          </p>
        </div>

        <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-ink">Section Intro</h3>
          <div>
            <label htmlFor="offers-eyebrow" className="text-sm font-medium text-ink">
              Eyebrow
            </label>
            <input
              id="offers-eyebrow"
              type="text"
              value={content.offers.eyebrow}
              onChange={(e) => handleOffersFieldChange("eyebrow", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-heading" className="text-sm font-medium text-ink">
              Heading
            </label>
            <input
              id="offers-heading"
              type="text"
              value={content.offers.heading}
              onChange={(e) => handleOffersFieldChange("heading", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-description" className="text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="offers-description"
              rows={2}
              value={content.offers.description}
              onChange={(e) => handleOffersFieldChange("description", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-ink">Free Card — Sexy Church Online</h3>
          <div>
            <label htmlFor="offers-free-label" className="text-sm font-medium text-ink">
              Label
            </label>
            <input
              id="offers-free-label"
              type="text"
              value={content.offers.free.label}
              onChange={(e) => handleOffersFreeChange("label", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-free-title" className="text-sm font-medium text-ink">
              Title
            </label>
            <input
              id="offers-free-title"
              type="text"
              value={content.offers.free.title}
              onChange={(e) => handleOffersFreeChange("title", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-free-description" className="text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="offers-free-description"
              rows={2}
              value={content.offers.free.description}
              onChange={(e) => handleOffersFreeChange("description", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-free-button" className="text-sm font-medium text-ink">
              Button Text
            </label>
            <input
              id="offers-free-button"
              type="text"
              value={content.offers.free.buttonText}
              onChange={(e) => handleOffersFreeChange("buttonText", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-ink">Popular Card — Keep Love Sexy</h3>
          <div>
            <label htmlFor="offers-popular-label" className="text-sm font-medium text-ink">
              Label
            </label>
            <input
              id="offers-popular-label"
              type="text"
              value={content.offers.popular.label}
              onChange={(e) => handleOffersPopularChange("label", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-popular-title" className="text-sm font-medium text-ink">
              Title
            </label>
            <input
              id="offers-popular-title"
              type="text"
              value={content.offers.popular.title}
              onChange={(e) => handleOffersPopularChange("title", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-popular-description" className="text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="offers-popular-description"
              rows={3}
              value={content.offers.popular.description}
              onChange={(e) => handleOffersPopularChange("description", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-popular-price" className="text-sm font-medium text-ink">
              Price (USD)
            </label>
            <input
              id="offers-popular-price"
              type="number"
              min="0"
              step="0.01"
              value={(content.offers.popular.priceCents / 100).toString()}
              onChange={(e) => handlePopularPriceChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
            <p className="mt-1 text-xs text-muted">
              Charged via Stripe Checkout when someone clicks the button below. Set to 0 to disable payment and link
              to the newsletter section instead.
            </p>
          </div>
          <div>
            <label htmlFor="offers-popular-bullets" className="text-sm font-medium text-ink">
              Bullet Points (one per line)
            </label>
            <textarea
              id="offers-popular-bullets"
              rows={3}
              value={content.offers.popular.bullets}
              onChange={(e) => handleOffersPopularChange("bullets", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="offers-popular-button" className="text-sm font-medium text-ink">
              Button Text
            </label>
            <input
              id="offers-popular-button"
              type="text"
              value={content.offers.popular.buttonText}
              onChange={(e) => handleOffersPopularChange("buttonText", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-ink">Also Available Row</h3>
          <div>
            <label htmlFor="offers-also-heading" className="text-sm font-medium text-ink">
              Row Heading
            </label>
            <input
              id="offers-also-heading"
              type="text"
              value={content.offers.alsoAvailableHeading}
              onChange={(e) => handleOffersFieldChange("alsoAvailableHeading", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.offers.alsoAvailable.map((item, i) => (
              <div key={i} className="rounded-xl border border-royal/10 p-4">
                <label htmlFor={`also-title-${i}`} className="text-sm font-medium text-ink">
                  Title
                </label>
                <input
                  id={`also-title-${i}`}
                  type="text"
                  value={item.title}
                  onChange={(e) => handleAlsoAvailableChange(i, "title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-royal/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-royal"
                />
                <label htmlFor={`also-description-${i}`} className="mt-3 block text-sm font-medium text-ink">
                  Description
                </label>
                <textarea
                  id={`also-description-${i}`}
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleAlsoAvailableChange(i, "description", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-royal/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-royal"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-royal">Book an Appointment (Calendly)</h2>
          <p className="text-sm text-muted">
            Paste your Calendly scheduling link below to show a live booking calendar on the site. Leave it blank to
            show a &quot;coming soon&quot; message with an email link instead.
          </p>
        </div>
        <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
          <div>
            <label htmlFor="booking-eyebrow" className="text-sm font-medium text-ink">
              Eyebrow
            </label>
            <input
              id="booking-eyebrow"
              type="text"
              value={content.booking.eyebrow}
              onChange={(e) => handleBookingFieldChange("eyebrow", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="booking-heading" className="text-sm font-medium text-ink">
              Heading
            </label>
            <input
              id="booking-heading"
              type="text"
              value={content.booking.heading}
              onChange={(e) => handleBookingFieldChange("heading", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="booking-description" className="text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="booking-description"
              rows={2}
              value={content.booking.description}
              onChange={(e) => handleBookingFieldChange("description", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="booking-url" className="text-sm font-medium text-ink">
              Calendly Link
            </label>
            <input
              id="booking-url"
              type="url"
              placeholder="https://calendly.com/your-handle"
              value={content.booking.calendlyUrl}
              onChange={(e) => handleBookingFieldChange("calendlyUrl", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
          <div>
            <label htmlFor="booking-button" className="text-sm font-medium text-ink">
              Fallback Button Text
            </label>
            <input
              id="booking-button"
              type="text"
              value={content.booking.buttonText}
              onChange={(e) => handleBookingFieldChange("buttonText", e.target.value)}
              className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
            />
          </div>
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
