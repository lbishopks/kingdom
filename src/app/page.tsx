import Link from "next/link";
import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import { audiences, contentSeries, site } from "@/lib/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const stats = [
  { value: "80–100ms", label: "is all it takes your brain to form a first impression of what it sees (NIH)." },
  { value: "3h 16m", label: "average daily television viewing per person — nearly an hour of it commercials." },
  { value: "4", label: "original content series built around healthy love, faith, and family." },
];

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <section className="gradient-royal relative overflow-hidden text-paper">
        {content.images.hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.images.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        )}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:py-32">
          <div>
            <p className="inline-block rounded-full bg-paper/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light">
              Faith-Rooted Family Media
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Media that protects the <span className="text-gradient-gold">kingdom of your home.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/80">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/watch"
                className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-royal shadow-lg transition hover:bg-gold-light"
              >
                Start Watching
              </Link>
              <Link
                href="/mission"
                className="rounded-full border border-paper/30 px-7 py-3 text-sm font-semibold text-paper transition hover:bg-paper/10"
              >
                Our Mission
              </Link>
            </div>
          </div>

          <div className="self-center rounded-3xl border border-paper/15 bg-paper/5 p-8 backdrop-blur">
            <h2 className="font-display text-xl font-semibold text-gold-light">Get UKnighted</h2>
            <p className="mt-2 text-sm text-paper/75">
              Join our newsletter for new episodes, media-literacy tools for families, and behind-the-scenes updates.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-royal/10 bg-white p-6 card-shadow">
              <p className="font-display text-3xl font-semibold text-royal">{stat.value}</p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-royal sm:text-4xl">Original series built for real conversations</h2>
            <p className="mt-4 text-muted">
              Every UKnighted Kingdom production is designed to open a dialogue — about love, faith, culture, and what
              we let into our homes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {contentSeries.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-royal/10 p-6 transition hover:border-royal/30 hover:shadow-md">
                <h3 className="font-display text-xl font-semibold text-royal">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <Link href="/watch" className="mt-4 inline-block text-sm font-semibold text-rose hover:underline">
                  Watch now →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-royal sm:text-4xl">Who we serve</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl bg-royal/5 p-6">
              <h3 className="font-semibold text-royal">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-royal py-20 text-paper">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to get UKnighted?</h2>
          <p className="max-w-xl text-paper/80">
            Start today — watch our latest episode, or reach out to bring UKnighted Kingdom content into your home,
            church, or business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-royal hover:bg-gold-light"
            >
              Watch Us on YouTube
            </a>
            <Link href="/contact" className="rounded-full border border-paper/30 px-7 py-3 text-sm font-semibold hover:bg-paper/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
