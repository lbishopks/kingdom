import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Dashboard from "./Dashboard";
import AdminStripeBridge from "./AdminStripeBridge";

// Load saved content on every visit so the dashboard always shows the latest values.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return (
    <>
      <AdminStripeBridge initialContent={content} />
      <Dashboard initialContent={content} />
    </>
  );
}
