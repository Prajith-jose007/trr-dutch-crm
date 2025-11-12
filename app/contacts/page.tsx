
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Contacts - Dutch CRM",
  description: "Manage your contacts in Dutch CRM",
};

export default function ContactsPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
