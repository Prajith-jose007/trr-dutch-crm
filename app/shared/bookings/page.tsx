import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import BookingsContent from "@/components/bookings/content"

export const metadata: Metadata = {
  title: "Bookings Management - Dutch CRM",
  description: "Manage all your shared bookings.",
};

export default function BookingsPage() {
  return (
    <Layout>
      <BookingsContent />
    </Layout>
  );
}
