
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import YachtPackagesContent from "@/components/yachts/packages-content";

export const metadata: Metadata = {
  title: "Yacht Packages - Dutch CRM",
  description: "Manage all your shared yacht packages.",
};

export default function YachtPage() {
  return (
    <Layout>
      <YachtPackagesContent />
    </Layout>
  );
}
