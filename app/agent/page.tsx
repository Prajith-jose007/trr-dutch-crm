
"use client";

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/dutchcrm/layout";
import { ImportAgents } from "@/components/agent/import-agents";
import { AgentList } from "@/components/agent/agent-list";
import { useAuth } from "@/app/context/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus } from "lucide-react";

async function getAgents() {
  const res = await fetch("/api/agents/list", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch agents");
  }
  return res.json();
}

export default function AgentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [agents, setAgents] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      const allowedRoles: string[] = ["superadmin", "admin"];
      if (!allowedRoles.includes(user.role)) {
        router.push("/");
      } else {
        getAgents()
          .then(setAgents)
          .catch(console.error)
          .finally(() => setDataLoading(false));
      }
    }
  }, [user, loading, router]);

  if (loading || !user || !["superadmin", "admin"].includes(user.role)) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading or redirecting...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Tabs defaultValue="view">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Agent Management
            </h1>
            <TabsList>
                <TabsTrigger value="view"><Users className="w-4 h-4 mr-2" /> View Agents</TabsTrigger>
                <TabsTrigger value="import"><UserPlus className="w-4 h-4 mr-2" /> Import Agents</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="view">
            <AgentList initialAgents={agents} loading={dataLoading} />
        </TabsContent>
        <TabsContent value="import">
            <ImportAgents />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
