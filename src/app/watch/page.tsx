import type { Metadata } from "next";
import { contentSeries, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch UKnighted Kingdom's original series — The Light, Grace Under Glitter, It's a Sexy World, and Sexy Church — free on YouTube.",
  alternates: { canonical: "/watch" },
};

export default function WatchPage() {
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
          {contentSeries.map((item) => (
            <article key={item.slug} id={item.slug} className="rounded-2xl border border-royal/10 p-8 card-shadow">
              <h2 className="font-display text-2xl font-semibold text-royal">{item.title}</h2>
              <p className="mt-3 text-muted">{item.description}</p>
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-rose hover:underline"
              >
                Watch episodes →
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
