import type { Metadata } from "next";
import { audiences, site } from "@/lib/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "UKnighted Kingdom's mission is to create family-first, faith-rooted entertainment backed by brain science — helping parents, communities, and industry leaders raise the next generation with intention.",
  alternates: { canonical: "/mission" },
};

const pillars = [
  {
    title: "Media Literacy",
    body: "We translate brain science and child development research into practical guidance families can actually use before, during, and after screen time.",
  },
  {
    title: "Healthy Love, Modeled Well",
    body: "Every series shows what grounded, respectful relationships look like — without pretending temptation, pressure, or hard choices don't exist.",
  },
  {
    title: "Faith Without the Filter",
    body: "We make room for real faith conversations in entertainment spaces that usually leave them out — or flatten them into cliché.",
  },
  {
    title: "Community Over Consumption",
    body: "We build resources meant to be watched and discussed together — in living rooms, youth groups, and boardrooms alike.",
  },
];

export default async function MissionPage() {
  const content = await getContent();

  return (
    <>
      <section className="gradient-royal py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">Our Mission</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Raising the next generation with intention
          </h1>
          <p className="mt-6 text-lg text-paper/80">
            The National Institute of Health has found it takes the brain just 80–100 milliseconds to form a
            perspective on what it sees. The American Academy of Child and Adolescent Psychiatry has shown that
            adolescent brains are still developing the judgment to fully process what they watch. We build media that
            takes both facts seriously.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        {content.images.mission && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.images.mission}
            alt={`${site.name} mission`}
            className="mb-12 aspect-[21/9] w-full rounded-2xl object-cover card-shadow"
          />
        )}
        <div className="grid gap-8 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-royal/10 p-8 card-shadow">
              <h2 className="font-display text-xl font-semibold text-royal">{p.title}</h2>
              <p className="mt-3 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-semibold text-royal sm:text-4xl">Who we work with</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Our mission reaches beyond the screen — into homes, congregations, studios, and boardrooms that shape
            what culture kids grow up in.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl bg-royal/5 p-6">
                <h3 className="font-semibold text-royal">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
