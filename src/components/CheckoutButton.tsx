"use client";

import { useState } from "react";

export default function CheckoutButton({
  label,
  className,
  paymentLink,
}: {
  label: string;
  className: string;
  paymentLink?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleClick() {
    if (paymentLink) {
      window.location.href = paymentLink;
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed.");
      window.location.href = data.url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={status === "loading"} className={`${className} disabled:opacity-60`}>
        {status === "loading" ? "Redirecting to checkout..." : label}
      </button>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-200">Checkout is not configured yet. Add a Stripe Payment Link in Admin.</p>
      )}
    </div>
  );
}
