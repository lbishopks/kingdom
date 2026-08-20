import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <Dashboard initialContent={content} />;
}
