import type { Metadata } from "next";
import Image from "next/image";
import { site, videoSlots } from "@/lib/site";
import { getContent } from "@/lib/content";
import NewsletterForm from "@/components/NewsletterForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import CheckoutButton from "@/components/CheckoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const stats = [
  { value: "80–100 ms", label: "Time for the brain to form a perspective (NIH)" },
  { value: "3 hrs 16 min", label: "Average daily TV consumption" },
  { value: "Almost 1 hour", label: "Of commercials absorbed every day" },
];

const purposeCards = [
  {
    title: "What We Believe",
    body: "Real love has no pain points, no character conflict, and does not depend on money. The Bible taught Michele this after she lost everything. That truth is the foundation of everything we create.",
  },
  {
    title: "What We Do",
    body: "We combine modern application of biblical, loving, and spiritual principles with entertainment. The result is content and teaching that builds families instead of breaking them.",
  },
  {
    title: "What We Want",
    body: "Every person to feel part of a loving family that outlasts generations. We want love to influence belief systems the same way entertainment currently influences buying power — without pain or conflict.",
  },
];

const timeline = [
  {
    era: "BEFORE 2017",
    title: "25 Years in Fortune 500 Sales",
    body: [
      "Michele spent 25 years as a top sales executive for companies including Nokia, Baylor Hospital, and the City of Irving. She worked across construction, corporate payments (specializing in media payments), telecommunications, government, and oil & gas. She holds a Business degree with International Business concentration from the University of Texas at Dallas.",
      "She knew how companies sell “sexy” and generate profit. Yet the more money she made, the more personal relationships suffered. She worked on all-male sales teams, outperformed them, and gained respect — but it never brought the love she actually wanted.",
    ],
    quote: "If people knew my past they would have never hired me, invited me in their homes, or dated me.",
  },
  {
    era: "2017–2018",
    title: "Comedy & The Michele Tune",
    body: [
      "In 2017 Michele began performing standup comedy. While writing jokes she noticed something important: character conflict produces laughter on stage, but the same conflict in real life causes unnecessary pain and drives consumer spending.",
      "She asked a different question: “We relate through entertainment with our tragic human experiences. Why not relate with loving experiences?” In 2018 she launched The Michele Tune and created the trademarked Award Winning Mindset™ leadership program. She also authored a New Hire Sales Assessment for Test Gorilla.",
    ],
    quote: "Trauma doesn't have to be traumatic.",
  },
  {
    era: "THE TURNING POINT",
    title: "The Dream Table That Was Empty",
    body: [
      "One day Michele sat at the table of her dreams — eight matching chairs, beautiful place settings, large enough for a full family. She suddenly laughed out loud. She had told herself that when she could afford a table like this it would include a husband, children, friends, and family who loved her. Instead she sat alone.",
      "She realized her beliefs about love had been tied to things she purchased with money. She turned the table into a desk. That failed too. She had tried multiple marriages, moving, changing her appearance, therapy, churches, self-help, and motivational seminars. All offered tips. None delivered lasting love.",
    ],
    quote: "When we focus on love instead of money, love will bring you money.",
  },
  {
    era: "2020–2023",
    title: "Everything Lost — and a Bible Found",
    body: [
      "During the pandemic Michele lost everything financially, including family and friends. For three years (2020–2023) she slept on people's couches and lived from her car. In that season she found a Bible.",
      "The Bible taught her that real love has no pain points, no character conflict, and excludes money. She discovered love when love was all she had left to rely on.",
    ],
    quote: "Jokes on me… I found love when love was all that I had to rely on.",
  },
  {
    era: "2024–PRESENT",
    title: "Uknighted Kingdom Is Born",
    body: [
      "Michele realized entertainment shapes belief systems, consumer behavior, and family values. She decided to use the same power — comedy, media, and teaching — to influence people toward real love instead of conflict and false desire.",
      "In 2024 she launched Uknighted Kingdom: the first company combining modern application of biblical, loving, and spiritual principles with entertainment. Her Amazon Prime speech “Comedian Confesses: How Comedy Healed My Trauma” marks part of this public journey.",
    ],
    quote: "Do you want love? Do you want a loving family? Join my love mission. Change your story ending.",
  },
];

const sexyLoveCards = [
  {
    n: "1",
    title: "For Couples",
    body: "Rekindle desire and partnership without the conflict, performance, or emptiness that mainstream culture normalizes.",
  },
  {
    n: "2",
    title: "For Families",
    body: "Protect teens and children from media that short-circuits brain development. Build a home culture of real love that outlasts generations.",
  },
  {
    n: "3",
    title: "For You",
    body: "Whether you feel cheated by love or simply want more, learn the formula that works — available free through our entertainment and Sexy Church.",
  },
];

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (!host.includes("youtube.com") && !host.includes("youtu.be")) return null;

    let id: string | null = null;
    if (host.includes("youtu.be")) {
      id = parsed.pathname.slice(1);
    } else if (parsed.searchParams.get("v")) {
      id = parsed.searchParams.get("v");
    } else if (parsed.pathname.startsWith("/embed/")) {
      id = parsed.pathname.replace("/embed/", "");
    } else if (parsed.pathname.startsWith("/shorts/")) {
      id = parsed.pathname.replace("/shorts/", "");
    } else if (parsed.pathname.startsWith("/live/")) {
      id = parsed.pathname.replace("/live/", "");
    }
    // Strip any trailing path segments or slashes left over (e.g. /shorts/ID/ or /shorts/ID/edit)
    if (id) id = id.split("/")[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

const DIRECT_VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];
function isDirectVideoFile(url: string): boolean {
  try {
    const parsed = new URL(url);
    return DIRECT_VIDEO_EXTENSIONS.some((ext) => parsed.pathname.toLowerCase().endsWith(ext));
  } catch {
    return false;
  }
}

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      {/* HERO */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">
              Redefining Family Entertainment
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Discover the secret formula for Sexy Love
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Michele Collins went from a difficult past and 25 years in Fortune 500 sales to founding Uknighted
              Kingdom — teaching real love through biblical principles and entertainment that builds families
              instead of breaking them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#offers"
                className="rounded-full gradient-rose px-7 py-3 text-sm font-semibold text-cream transition hover:opacity-90"
              >
                Keep Love Sexy — $50 Class
              </a>
              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/20 px-7 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                Watch Free on YouTube
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">Free Sexy Church online · Max 10 people per class</p>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-white p-6 card-shadow">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-cream">
              {content.photo ? (
                <Image
                  src={content.photo}
                  alt="Michele Collins"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl" aria-hidden>
                  ❤️
                </span>
              )}
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-ink">Michele Collins</p>
            <p className="text-sm text-deeprose">Owner · Comedian · Love Teacher</p>
            {!content.photo && (
              <p className="mt-3 text-xs italic text-muted">
                Replace with a strong photo or short intro video of Michele speaking to camera.
              </p>
            )}
          </div>
        </div>

        <div className="border-y border-ink/10 bg-white">
          <div className="mx-auto max-w-6xl px-6 pt-10">
            <h2 className="text-center font-display text-xl font-semibold text-ink sm:text-2xl">
              How much time do you spend watching &ldquo;Enjoying&rdquo; entertainment each day?
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-deeprose">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section id="purpose" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">Why This Exists</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
            The Purpose of Uknighted Kingdom
          </h2>
          <p className="mt-6 text-muted">
            Entertainment is one of the most powerful forces shaping what people believe about love, relationships,
            and family. Most of it works through conflict, pain, and consumer desire. Uknighted Kingdom exists to
            reverse that.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {purposeCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink/10 bg-white p-8 card-shadow">
              <h3 className="font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-3 text-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center font-display text-2xl italic text-deeprose">
          &ldquo;We&rsquo;re redefining family entertainment.&rdquo;
        </p>
      </section>

      {/* WATCH */}
      <section id="watch" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Watch Our Entertainment</h2>
              <p className="mt-4 text-muted">
                Become part of a loving community. We produce content specifically for customers and their families
                — entertainment designed to build, not break.
              </p>
            </div>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-semibold text-deeprose hover:underline"
            >
              Visit full YouTube channel →
            </a>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {videoSlots.map((slot) => {
              const entry = content.videos[slot.slug];
              const url = entry?.url || "";
              const title = entry?.title?.trim() || slot.defaultTitle;
              const embedUrl = url ? getYouTubeEmbedUrl(url) : null;
              const isDirect = url ? isDirectVideoFile(url) : false;

              return (
                <article key={slot.slug} className="overflow-hidden rounded-2xl border border-ink/10 card-shadow">
                  <div className="aspect-video bg-ink/90">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : isDirect ? (
                      <video src={url} controls className="h-full w-full" />
                    ) : (
                      <a
                        href={url || site.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full w-full items-center justify-center text-sm font-semibold text-cream/80"
                      >
                        Watch episode →
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full gradient-rose px-7 py-3 text-sm font-semibold text-cream transition hover:opacity-90"
            >
              Watch Us on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Michele&rsquo;s Story</h2>
            <p className="mt-6 text-muted">
              From a difficult past and 25 years at the top of Fortune 500 sales to losing everything — and then
              finding real love in a Bible. This is the journey that created Uknighted Kingdom.
            </p>
          </div>

          <div className="mt-16 space-y-14 border-l-2 border-softgold/50 pl-8">
            {timeline.map((t) => (
              <div key={t.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full gradient-rose"
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">{t.era}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{t.title}</h3>
                <div className="mt-4 space-y-4 text-muted">
                  {t.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <p className="mt-4 font-display text-lg italic text-deeprose">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEXY LOVE */}
      <section id="sexy-love" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">What is Sexy Love?</h2>
          <p className="mt-6 text-muted">
            Sexy Love is not the image of love that companies and entertainment sell. It is real love — the kind
            that eliminates sickness, despair, and pain. Michele teaches it through comedy, media, and practical
            courses so families can live their love story without character conflict.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {sexyLoveCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ink/10 bg-white p-8 card-shadow">
              <span className="grid h-10 w-10 place-items-center rounded-full gradient-rose font-display text-lg font-semibold text-cream">
                {c.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-3 text-sm text-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl gradient-rose px-8 py-14 text-center text-cream">
          <p className="text-xs font-semibold uppercase tracking-widest text-softgold">Core Insight</p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl italic sm:text-3xl">
            &ldquo;Love eliminates sickness, despair, or pain. Are you associating love with pain? Stop doing
            that.&rdquo;
          </p>
          <p className="mt-4 text-sm text-cream/80">— Michele Collins</p>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">{content.offers.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">{content.offers.heading}</h2>
          <p className="mt-6 text-muted">{content.offers.description}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-white p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">
              {content.offers.free.label}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{content.offers.free.title}</h3>
            <p className="mt-3 text-muted">{content.offers.free.description}</p>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5"
            >
              {content.offers.free.buttonText}
            </a>
          </div>

          <div className="rounded-3xl gradient-rose p-8 text-cream card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">
              {content.offers.popular.label}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold">{content.offers.popular.title}</h3>
            <p className="mt-3 text-cream/85">{content.offers.popular.description}</p>
            <ul className="mt-5 space-y-1 text-sm text-cream/85">
              {content.offers.popular.bullets
                .split("\n")
                .map((b) => b.trim())
                .filter(Boolean)
                .map((b) => (
                  <li key={b}>• {b}</li>
                ))}
            </ul>
            <div className="mt-8">
              {content.offers.popular.priceCents > 0 ? (
                <CheckoutButton
                  label={content.offers.popular.buttonText}
                  className="inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-deeprose transition hover:opacity-90"
                />
              ) : (
                <a
                  href="#join"
                  className="inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-deeprose transition hover:opacity-90"
                >
                  {content.offers.popular.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* "Also Available" row removed from public display per request — content still
            lives in content.offers.alsoAvailable / admin dashboard if it's needed again. */}
      </section>

      {/* BOOK */}
      <section id="book" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">{content.booking.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">{content.booking.heading}</h2>
          <p className="mt-6 text-muted">{content.booking.description}</p>
        </div>

        {content.booking.calendlyUrl ? (
          <CalendlyEmbed url={content.booking.calendlyUrl} />
        ) : (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-ink/10 bg-white p-8 text-center card-shadow">
            <p className="text-sm text-muted">Online booking is coming soon. Reach out directly in the meantime.</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block rounded-full gradient-rose px-6 py-3 text-sm font-semibold text-cream transition hover:opacity-90"
            >
              {content.booking.buttonText}
            </a>
          </div>
        )}
      </section>

      {/* JOIN */}
      <section id="join" className="bg-ink py-24 text-cream">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Get Uknighted Today</h2>
          <p className="mt-6 text-cream/80">
            Sign up for news, free Sexy Church invitations, and early access to classes. Join the movement of
            families choosing love that lasts.
          </p>
          <NewsletterForm variant="footer" />
          <p className="mt-4 text-xs text-cream/50">We respect your inbox. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
