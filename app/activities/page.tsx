
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Activities - Dutch CRM",
  description: "View activities in Dutch CRM",
};

export default function ActivitiesPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
