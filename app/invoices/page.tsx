
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Invoices - Dutch CRM",
  description: "Manage your invoices in Dutch CRM",
};

export default function InvoicesPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
