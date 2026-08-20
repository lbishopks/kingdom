import { put, head } from "@vercel/blob";
import { videoSlots } from "@/lib/site";

const CONTENT_KEY = "site-content.json";

export type VideoEntry = {
  title: string;
  url: string;
  duration: string;
};

export type OfferItem = {
  title: string;
  description: string;
};

export type OffersContent = {
  eyebrow: string;
  heading: string;
  description: string;
  free: {
    label: string;
    title: string;
    description: string;
    buttonText: string;
  };
  popular: {
    label: string;
    title: string;
    description: string;
    bullets: string; // newline-separated lines
    buttonText: string;
  };
  alsoAvailableHeading: string;
  alsoAvailable: OfferItem[];
};

export type BookingContent = {
  eyebrow: string;
  heading: string;
  description: string;
  calendlyUrl: string; // full Calendly scheduling link, e.g. https://calendly.com/your-handle
  buttonText: string;
};

export type SiteContent = {
  photo: string; // Michele's headshot / hero photo
  videos: Record<string, VideoEntry>; // slot slug -> title + video URL + duration
  offers: OffersContent;
  booking: BookingContent;
};

export const defaultOffers: OffersContent = {
  eyebrow: "Uknighted Campaign",
  heading: "How to Get Uknighted",
  description: "Everything points back to the same purpose: learning real Sexy Love and building families that last.",
  free: {
    label: "Free",
    title: "Sexy Church Online",
    description: "Bible-based love lessons available on demand and weekly live. Experience real love without transaction.",
    buttonText: "Attend Free Sexy Church",
  },
  popular: {
    label: "Most Popular",
    title: "Keep Love Sexy — $50",
    description:
      "Online Zoom course (max 10 people). Learn how companies sell versions of love — and how to live without pain or conflict. Based on Award Winning Mindset™.",
    bullets: "25 min teaching\n20 min Q&A\n15 min quiz",
    buttonText: "Reserve Your Spot",
  },
  alsoAvailableHeading: "Also Available",
  alsoAvailable: [
    { title: "$300 — Choose Sexy Love", description: "1-hour message + improv comedy + quiz." },
    { title: "Grace Under Glitter Tour", description: "Comedy shows + sponsorship packages." },
    { title: "Merchandise", description: "Sexy Love t-shirts and more." },
  ],
};

export const defaultBooking: BookingContent = {
  eyebrow: "Book a Session",
  heading: "Schedule Time With Michele",
  description:
    "Pick a time that works for you to talk through coaching, speaking, or event bookings. Choose a slot below and it's confirmed instantly.",
  calendlyUrl: "",
  buttonText: "Book Your Appointment",
};

export const defaultContent: SiteContent = {
  photo: "",
  videos: Object.fromEntries(
    videoSlots.map((v) => [
      v.slug,
      { title: v.defaultTitle, url: v.defaultUrl, duration: v.defaultDuration },
    ]),
  ),
  offers: defaultOffers,
  booking: defaultBooking,
};

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function normalizeVideos(raw: unknown): Record<string, VideoEntry> {
  const result: Record<string, VideoEntry> = { ...defaultContent.videos };
  if (!raw || typeof raw !== "object") return result;

  for (const [slug, value] of Object.entries(raw as Record<string, unknown>)) {
    const fallback = result[slug] ?? { title: slug, url: "", duration: "" };
    if (typeof value === "string") {
      // Legacy shape: plain URL string.
      result[slug] = { title: fallback.title, url: value, duration: fallback.duration };
    } else if (value && typeof value === "object") {
      const v = value as Partial<VideoEntry>;
      result[slug] = {
        title: typeof v.title === "string" && v.title.trim() ? v.title : fallback.title,
        url: typeof v.url === "string" ? v.url : "",
        duration: typeof v.duration === "string" ? v.duration : fallback.duration,
      };
    }
  }

  return result;
}

function normalizeAlsoAvailable(raw: unknown): OfferItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultOffers.alsoAvailable;
  return defaultOffers.alsoAvailable.map((fallback, i) => {
    const v = raw[i];
    if (!v || typeof v !== "object") return fallback;
    const item = v as Partial<OfferItem>;
    return {
      title: typeof item.title === "string" ? item.title : fallback.title,
      description: typeof item.description === "string" ? item.description : fallback.description,
    };
  });
}

function normalizeOffers(raw: unknown): OffersContent {
  if (!raw || typeof raw !== "object") return defaultOffers;
  const o = raw as Partial<OffersContent>;
  const free = (o.free ?? {}) as Partial<OffersContent["free"]>;
  const popular = (o.popular ?? {}) as Partial<OffersContent["popular"]>;

  return {
    eyebrow: typeof o.eyebrow === "string" ? o.eyebrow : defaultOffers.eyebrow,
    heading: typeof o.heading === "string" ? o.heading : defaultOffers.heading,
    description: typeof o.description === "string" ? o.description : defaultOffers.description,
    free: {
      label: typeof free.label === "string" ? free.label : defaultOffers.free.label,
      title: typeof free.title === "string" ? free.title : defaultOffers.free.title,
      description: typeof free.description === "string" ? free.description : defaultOffers.free.description,
      buttonText: typeof free.buttonText === "string" ? free.buttonText : defaultOffers.free.buttonText,
    },
    popular: {
      label: typeof popular.label === "string" ? popular.label : defaultOffers.popular.label,
      title: typeof popular.title === "string" ? popular.title : defaultOffers.popular.title,
      description: typeof popular.description === "string" ? popular.description : defaultOffers.popular.description,
      bullets: typeof popular.bullets === "string" ? popular.bullets : defaultOffers.popular.bullets,
      buttonText: typeof popular.buttonText === "string" ? popular.buttonText : defaultOffers.popular.buttonText,
    },
    alsoAvailableHeading:
      typeof o.alsoAvailableHeading === "string" ? o.alsoAvailableHeading : defaultOffers.alsoAvailableHeading,
    alsoAvailable: normalizeAlsoAvailable(o.alsoAvailable),
  };
}

function normalizeBooking(raw: unknown): BookingContent {
  if (!raw || typeof raw !== "object") return defaultBooking;
  const b = raw as Partial<BookingContent>;
  return {
    eyebrow: typeof b.eyebrow === "string" ? b.eyebrow : defaultBooking.eyebrow,
    heading: typeof b.heading === "string" ? b.heading : defaultBooking.heading,
    description: typeof b.description === "string" ? b.description : defaultBooking.description,
    calendlyUrl: typeof b.calendlyUrl === "string" ? b.calendlyUrl : defaultBooking.calendlyUrl,
    buttonText: typeof b.buttonText === "string" ? b.buttonText : defaultBooking.buttonText,
  };
}

export async function getContent(): Promise<SiteContent> {
  if (!hasBlobToken()) return defaultContent;

  try {
    const blob = await head(CONTENT_KEY);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return defaultContent;
    const data = (await res.json()) as Partial<SiteContent>;
    return {
      photo: typeof data.photo === "string" ? data.photo : defaultContent.photo,
      videos: normalizeVideos(data.videos),
      offers: normalizeOffers(data.offers),
      booking: normalizeBooking(data.booking),
    };
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (!hasBlobToken()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set — connect Vercel Blob storage first.");
  }
  await put(CONTENT_KEY, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}
