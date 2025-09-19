
"use client";

import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/dutchcrm/layout";
import { ImportAgents } from "@/components/agent/import-agents";
import { useAuth } from "@/app/context/auth-context";

export default function AgentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const allowedRoles: string[] = ["superadmin", "admin"];
      if (!allowedRoles.includes(user.role)) {
        router.push("/");
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
      <ImportAgents />
    </Layout>
  );
}
