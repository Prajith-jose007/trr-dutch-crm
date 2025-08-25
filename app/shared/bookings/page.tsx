import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { BookMarked } from "lucide-react";

export const metadata: Metadata = {
  title: "Bookings Management - Dutch CRM",
  description: "Manage all your shared bookings.",
};

function BookingsContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full">
        <BookMarked className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings Management</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          This is where you can manage all shared bookings.
        </p>
      </div>
    </div>
  )
}


export default function BookingsPage() {
  return (
    <Layout>
      <BookingsContent />
    </Layout>
  );
}
