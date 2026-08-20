import type { Metadata } from "next";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with UKnighted Kingdom — partnerships, community, press, and general inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose">Contact</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-royal sm:text-5xl">Let&apos;s talk</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Whether you&apos;re a family, a faith community, or a potential partner — we&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-royal/10 p-6">
            <h2 className="font-semibold text-royal">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-1 block text-muted hover:text-rose">
              {site.email}
            </a>
          </div>
          <div className="rounded-2xl border border-royal/10 p-6">
            <h2 className="font-semibold text-royal">YouTube</h2>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="mt-1 block text-muted hover:text-rose">
              Watch our channel
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
