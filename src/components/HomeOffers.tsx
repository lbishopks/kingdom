import CheckoutButton from "@/components/CheckoutButton";
import { site } from "@/lib/site";
import type { SiteContent } from "@/lib/content";

export default function HomeOffers({ content }: { content: SiteContent }) {
  return (
    <>
      <section id="offers" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">{content.offers.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">{content.offers.heading}</h2>
          <p className="mt-6 text-muted">{content.offers.description}</p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-ink/10 bg-white p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">{content.offers.free.label}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{content.offers.free.title}</h3>
            <p className="mt-3 text-muted">{content.offers.free.description}</p>
            <a href={content.offers.free.buttonUrl || site.youtube} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
              {content.offers.free.buttonText}
            </a>
          </div>
          <div className="rounded-3xl gradient-rose p-8 text-cream card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">{content.offers.popular.label}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">{content.offers.popular.title}</h3>
            <p className="mt-3 text-cream/85">{content.offers.popular.description}</p>
            <ul className="mt-5 space-y-1 text-sm text-cream/85">
              {content.offers.popular.bullets.split("\n").map((b) => b.trim()).filter(Boolean).map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-8">
              {content.offers.popular.priceCents > 0 ? (
                <CheckoutButton
                  label={content.offers.popular.buttonText}
                  paymentLink={content.stripe?.paymentLink}
                  className="inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-deeprose transition hover:opacity-90"
                />
              ) : (
                <a href="#join" className="inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-deeprose transition hover:opacity-90">
                  {content.offers.popular.buttonText}
                </a>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">{content.booking.eyebrow}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{content.booking.heading}</h3>
            <p className="mt-3 text-muted">{content.booking.description}</p>
            <a href={content.booking.calendlyUrl || `mailto:${site.contactEmail}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
              {content.booking.buttonText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
