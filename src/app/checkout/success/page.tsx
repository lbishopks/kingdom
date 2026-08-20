import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

async function getSessionSummary(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    return {
      email: session.customer_details?.email ?? null,
      amount: session.amount_total,
    };
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const summary = await getSessionSummary(session_id);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">Reservation Confirmed</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">You&apos;re In!</h1>
      <p className="mt-6 text-muted">
        {summary?.email
          ? `A confirmation has been sent to ${summary.email}. `
          : "Your payment went through. "}
        Michele will follow up by email with your Zoom link and class time before the session.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full gradient-rose px-6 py-3 text-sm font-semibold text-cream transition hover:opacity-90"
      >
        Back to Homepage
      </Link>
    </section>
  );
}
