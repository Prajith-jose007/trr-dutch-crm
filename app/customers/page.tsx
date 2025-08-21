import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import CustomersContent from "@/components/customers/content"

export const metadata: Metadata = {
  title: "Customer Management - Dutch CRM",
  description: "Manage your customers, segments, and relationships in Dutch CRM",
}

export default function CustomersPage() {
  return (
    <Layout>
      <CustomersContent />
    </Layout>
  )
}
