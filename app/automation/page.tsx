
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Automation - Dutch CRM",
  description: "Manage automation rules in Dutch CRM",
};

export default function AutomationPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
