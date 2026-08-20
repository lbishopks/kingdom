"use client";

import Script from "next/script";

export default function CalendlyEmbed({ url }: { url: string }) {
  return (
    <>
      <div
        className="calendly-inline-widget mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-ink/10 card-shadow"
        data-url={url}
        style={{ minWidth: "280px", height: "700px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </>
  );
}
