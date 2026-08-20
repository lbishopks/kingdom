import type { Metadata } from "next";
import { contentSeries, site } from "@/lib/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch UKnighted Kingdom's original series — The Light, Grace Under Glitter, It's a Sexy World, and Sexy Church — free on YouTube.",
  alternates: { canonical: "/watch" },
};

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let id: string | null = null;
    if (parsed.hostname.includes("youtu.be")) {
      id = parsed.pathname.slice(1);
    } else if (parsed.searchParams.get("v")) {
      id = parsed.searchParams.get("v");
    } else if (parsed.pathname.startsWith("/embed/")) {
      id = parsed.pathname.replace("/embed/", "");
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export default async function WatchPage() {
  const content = await getContent();

  return (
    <>
      <section className="gradient-royal py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Watch</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Original series, free to watch</h1>
          <p className="mt-6 text-lg text-paper/80">
            New episodes premiere on our YouTube channel. Subscribe so you never miss a release.
          </p>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3 text-sm font-semibold text-royal hover:bg-gold-light"
          >
            Watch Us on YouTube
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {contentSeries.map((item) => {
            const videoUrl = content.videos[item.slug];
            const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

            return (
              <article key={item.slug} id={item.slug} className="rounded-2xl border border-royal/10 p-8 card-shadow">
                {embedUrl && (
                  <div className="mb-5 aspect-video overflow-hidden rounded-xl">
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <h2 className="font-display text-2xl font-semibold text-royal">{item.title}</h2>
                <p className="mt-3 text-muted">{item.description}</p>
                <a
                  href={videoUrl || site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-semibold text-rose hover:underline"
                >
                  Watch episodes →
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
