import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import AllCustomersContent from "@/components/customers/all-customers"

export const metadata: Metadata = {
  title: "All Customers - Dutch CRM",
  description: "View and manage all customers in your Dutch CRM system",
}

export default function AllCustomersPage() {
  return (
    <Layout>
      <AllCustomersContent />
    </Layout>
  )
}
