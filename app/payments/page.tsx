
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Payments - Dutch CRM",
  description: "Manage your payments in Dutch CRM",
};

export default function PaymentsPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
