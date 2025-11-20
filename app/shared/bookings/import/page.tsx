
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { ImportBookings } from "@/components/bookings/import-bookings";

export const metadata: Metadata = {
  title: "Import Bookings - Dutch CRM",
  description: "Import bookings from a CSV file.",
};

export default function ImportBookingsPage() {
  return (
    <Layout>
      <ImportBookings />
    </Layout>
  );
}
