
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Analytics - Dutch CRM",
  description: "Analytics dashboard for Dutch CRM",
};

export default function AnalyticsPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
