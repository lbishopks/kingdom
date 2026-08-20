import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl font-semibold text-royal">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-royal">Page not found</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-royal px-7 py-3 text-sm font-semibold text-paper hover:bg-royal-light">
        Back home
      </Link>
    </section>
  );
}
