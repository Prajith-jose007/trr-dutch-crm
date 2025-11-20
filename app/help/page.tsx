
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Help - Dutch CRM",
  description: "Get help with Dutch CRM",
};

export default function HelpPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
