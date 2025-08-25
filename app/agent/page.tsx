import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { ImportAgents } from "@/components/agent/import-agents";

export const metadata: Metadata = {
  title: "Import Agents - Dutch CRM",
  description: "Import agents from a CSV file.",
};

export default function AgentPage() {
  return (
    <Layout>
      <ImportAgents />
    </Layout>
  );
}
