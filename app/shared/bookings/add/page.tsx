
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { AddBookingForm } from "@/components/bookings/add-booking-form";

export const metadata: Metadata = {
  title: "Add Booking - Dutch CRM",
  description: "Create a new shared booking.",
};

export default function AddBookingPage() {
  return (
    <Layout>
      <AddBookingForm />
    </Layout>
  );
}
