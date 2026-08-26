export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-deeprose">What Others Say</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">Testimonials</h2>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-cream p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">Entertainment</p>
            <p className="mt-4 font-display text-lg italic text-ink">&ldquo;Beautiful and Funny lady&rdquo;</p>
            <p className="mt-6 font-semibold text-ink">Tina Graham</p>
            <p className="text-sm text-muted">Def Comedy Jam Producer &amp; Actor</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-cream p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">Business</p>
            <p className="mt-4 text-sm text-ink">
              &ldquo;We worked with Michele Collins to create a B2B sales test. Michele&apos;s deep knowledge of her subject matter and extremely professional business acumen was quite impressive. She always delivered the material before her deadlines and we hope to continue collaborating with her, and highly recommend working with Michele. She is a pure joy!&rdquo;
            </p>
            <p className="mt-6 font-semibold text-ink">Julie Melymbrose</p>
            <p className="text-sm text-muted">Head of Content, Test Gorilla</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-cream p-8 card-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-softgold">Community</p>
            <p className="mt-4 text-sm text-ink">
              &ldquo;Michele relates with our youth because she&apos;s been there. So, they feel comfortable opening up and being themselves around her.&rdquo;
            </p>
            <p className="mt-6 font-semibold text-ink">Susan Bearden</p>
            <p className="text-sm text-muted">Special Projects Director, Ft. Bend Juvenile Detention Center</p>
          </div>
        </div>
      </div>
    </section>
  );
}
