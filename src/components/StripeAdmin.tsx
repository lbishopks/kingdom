"use client";

import type { SiteContent, StripeSettings } from "@/lib/content";

export default function StripeAdmin({
  content,
  setContent,
}: {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}) {
  const stripe: StripeSettings = content.stripe ?? { publishableKey: "", paymentLink: "", priceClass: "" };

  function update(field: keyof StripeSettings, value: string) {
    setContent((prev) => ({
      ...prev,
      stripe: { ...(prev.stripe ?? { publishableKey: "", paymentLink: "", priceClass: "" }), [field]: value },
    }));
  }

  return (
    <div className="mt-12 space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-royal">Stripe / Payments</h2>
        <p className="text-sm text-muted">
          Paste your Stripe Payment Link here. The $50 class button will send buyers to that link.
          Do not paste a secret key (sk_live / sk_test) — that stays in Vercel as STRIPE_SECRET_KEY.
        </p>
      </div>
      <div className="rounded-2xl border border-royal/10 p-5 space-y-3">
        <div>
          <label htmlFor="stripe-pk" className="text-sm font-medium text-ink">
            Publishable Key (pk_live_... or pk_test_...)
          </label>
          <input
            id="stripe-pk"
            type="text"
            value={stripe.publishableKey}
            onChange={(e) => update("publishableKey", e.target.value)}
            placeholder="pk_live_..."
            className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
          />
        </div>
        <div>
          <label htmlFor="stripe-link" className="text-sm font-medium text-ink">
            Payment Link (Buy Now)
          </label>
          <input
            id="stripe-link"
            type="url"
            value={stripe.paymentLink}
            onChange={(e) => update("paymentLink", e.target.value)}
            placeholder="https://buy.stripe.com/..."
            className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
          />
          <p className="mt-1 text-xs text-muted">
            Stripe Dashboard → Payment Links → copy the link. This is the easiest way to take the $50 payment.
          </p>
        </div>
        <div>
          <label htmlFor="stripe-price" className="text-sm font-medium text-ink">
            Price ID (optional)
          </label>
          <input
            id="stripe-price"
            type="text"
            value={stripe.priceClass}
            onChange={(e) => update("priceClass", e.target.value)}
            placeholder="price_..."
            className="mt-1 w-full rounded-lg border border-royal/20 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-royal"
          />
        </div>
      </div>
    </div>
  );
}
