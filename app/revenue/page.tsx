
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Revenue - Dutch CRM",
  description: "Track your revenue in Dutch CRM",
};

export default function RevenuePage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
