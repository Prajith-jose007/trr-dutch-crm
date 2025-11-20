
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BlankContent } from "@/components/blank";

export const metadata: Metadata = {
  title: "Backup & Export - Dutch CRM",
  description: "Manage backups and exports in Dutch CRM",
};

export default function BackupPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  );
}
