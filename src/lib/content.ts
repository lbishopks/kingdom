import { put, head } from "@vercel/blob";
import { contentSeries } from "@/lib/site";

const CONTENT_KEY = "site-content.json";

export type SiteContent = {
  images: {
    hero: string;
    about: string;
    mission: string;
  };
  videos: Record<string, string>; // series slug -> YouTube URL
};

export const defaultContent: SiteContent = {
  images: {
    hero: "",
    about: "",
    mission: "",
  },
  videos: Object.fromEntries(contentSeries.map((s) => [s.slug, ""])),
};

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function getContent(): Promise<SiteContent> {
  if (!hasBlobToken()) return defaultContent;

  try {
    const blob = await head(CONTENT_KEY);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return defaultContent;
    const data = (await res.json()) as Partial<SiteContent>;
    return {
      images: { ...defaultContent.images, ...data.images },
      videos: { ...defaultContent.videos, ...data.videos },
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
