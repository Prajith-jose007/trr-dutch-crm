import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Agent - Dutch CRM",
  description: "Manage agents in Dutch CRM.",
};

function AgentContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full">
                <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Page</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    This is the agent page. You can manage your agents here.
                </p>
            </div>
        </div>
    )
}

export default function AgentPage() {
  return (
    <Layout>
      <AgentContent />
    </Layout>
  );
}
