import { put, head } from "@vercel/blob";
import { contentSeries } from "@/lib/site";

const CONTENT_KEY = "site-content.json";

export type VideoEntry = {
  title: string;
    url: string;
    };

    export type SiteContent = {
      images: {
          hero: string;
              about: string;
                  mission: string;
                    };
                      videos: Record<string, VideoEntry>; // series slug -> title + video URL (YouTube or direct link)
                      };

                      export const defaultContent: SiteContent = {
                        images: {
                            hero: "",
                                about: "",
                                    mission: "",
                                      },
                                        videos: Object.fromEntries(
                                            contentSeries.map((s) => [s.slug, { title: s.title, url: "" }]),
                                              ),
                                              };

                                              function hasBlobToken(): boolean {
                                                return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
                                                }

                                                function normalizeVideos(raw: unknown): Record<string, VideoEntry> {
                                                  const result: Record<string, VideoEntry> = { ...defaultContent.videos };
                                                    if (!raw || typeof raw !== "object") return result;

                                                      for (const [slug, value] of Object.entries(raw as Record<string, unknown>)) {
                                                          const fallback = result[slug] ?? { title: slug, url: "" };
                                                              if (typeof value === "string") {
                                                                    // Legacy shape: plain URL string.
                                                                          result[slug] = { title: fallback.title, url: value };
                                                                              } else if (value && typeof value === "object") {
                                                                                    const v = value as Partial<VideoEntry>;
                                                                                          result[slug] = {
                                                                                                  title: typeof v.title === "string" && v.title.trim() ? v.title : fallback.title,
                                                                                                          url: typeof v.url === "string" ? v.url : "",
                                                                                                                };
                                                                                                                    }
                                                                                                                      }

                                                                                                                        return result;
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
                                                                                                                                                            videos: normalizeVideos(data.videos),
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
                                                                                                                                                                                                