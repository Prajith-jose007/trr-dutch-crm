
import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import BookingsContent from "@/components/bookings/content"

export const metadata: Metadata = {
  title: "Bookings Management - Dutch CRM",
  description: "Manage all your shared bookings.",
};

async function getBookings() {
  // This function will run on the server to fetch data.
  // Using a relative URL is more robust for server-side fetching.
  const res = await fetch("/api/bookings/list", {
    cache: 'no-store', // Ensures fresh data on every request
  });

  if (!res.ok) {
    // This will be caught by the Error Boundary
    throw new Error('Failed to fetch bookings');
  }

  return res.json();
}


export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <Layout>
      <BookingsContent bookingsData={bookings} />
    </Layout>
  );
}
