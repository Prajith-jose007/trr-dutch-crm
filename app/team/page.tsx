
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Team - Dutch CRM",
  description: "Manage your team in Dutch CRM",
};

export default function TeamPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
