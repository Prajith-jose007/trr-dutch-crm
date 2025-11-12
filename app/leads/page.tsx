
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Leads - Dutch CRM",
  description: "Manage your sales leads in Dutch CRM",
};

export default function LeadsPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
