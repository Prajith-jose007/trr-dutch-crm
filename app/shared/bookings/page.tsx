import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import BookingsContent from "@/components/bookings/content"

export const metadata: Metadata = {
  title: "Bookings Management - Dutch CRM",
  description: "Manage all your shared bookings.",
};

async function getBookings() {
  // This function will run on the server to fetch data.
  // NOTE: This URL needs to be the absolute URL of your deployed application
  // in a production environment. For local development, this works.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings/list`, {
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
