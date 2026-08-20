import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { getStripe } from "@/lib/stripe";
import { site } from "@/lib/site";

export async function POST() {
  try {
    const content = await getContent();
    const { title, description, priceCents } = content.offers.popular;

    if (!priceCents || priceCents <= 0) {
      return NextResponse.json({ error: "This offer isn't priced yet." }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: priceCents,
            product_data: {
              name: title,
              description,
            },
          },
        },
      ],
      success_url: `${site.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site.url}/#offers`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
