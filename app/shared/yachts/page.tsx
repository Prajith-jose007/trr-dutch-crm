import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { Ship } from "lucide-react";

export const metadata: Metadata = {
  title: "Yacht Management - Dutch CRM",
  description: "Manage all your shared yachts.",
};

function YachtContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Ship className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yacht Management</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          This is where you can manage all shared yachts.
        </p>
      </div>
    </div>
  )
}

export default function YachtPage() {
  return (
    <Layout>
      <YachtContent />
    </Layout>
  );
}
