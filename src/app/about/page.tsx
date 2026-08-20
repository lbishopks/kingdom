import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The UKnighted Kingdom story: why we build faith-rooted, family-first media and how we're growing a community around healthy love and relationships.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="gradient-royal py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Our Story</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">The UKnighted Story</h1>
          <p className="mt-6 text-lg text-paper/80">
            {site.name} began with a simple conviction: what we watch shapes who we become — and our families deserve
            entertainment that builds them up instead of quietly wearing them down.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          <p>
            We started asking a hard question: if it only takes the brain 80–100 milliseconds to form a perspective,
            what perspective are we handing our kids every time we hand them a screen? The research was clear —
            adolescent brains are still developing the judgment to process what they see, and the average household
            spends over three hours a day absorbing content that was never built with their family in mind.
          </p>
          <p>
            {site.shortName} is our answer. We create original series and community resources rooted in faith,
            healthy love, and honest conversation — content parents can watch alongside their kids, and communities
            can build discussions around instead of around.
          </p>
          <p>
            We&apos;re not interested in shielding families from culture — we&apos;re interested in equipping them to
            engage it with grace, discernment, and confidence. That&apos;s the kingdom we&apos;re building, one
            episode at a time.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-royal/10 bg-royal/5 p-8">
          <h2 className="font-display text-2xl font-semibold text-royal">Where we&apos;re headed</h2>
          <p className="mt-3 text-muted">
            We&apos;re growing a library of original content, partnering with faith communities and industry leaders,
            and building tools that help families talk about media instead of just consuming it.
          </p>
          <Link href="/mission" className="mt-6 inline-block text-sm font-semibold text-rose hover:underline">
            Read our full mission →
          </Link>
        </div>
      </section>
    </>
  );
}
