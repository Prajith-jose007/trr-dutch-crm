
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Quotes - Dutch CRM",
  description: "Manage your sales quotes in Dutch CRM",
};

export default function QuotesPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
