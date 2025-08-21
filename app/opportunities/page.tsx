import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import OpportunitiesContent from "@/components/opportunities/content"

export const metadata: Metadata = {
  title: "Opportunities - Dutch CRM",
  description: "Manage sales opportunities and forecasting in Dutch CRM",
}

export default function OpportunitiesPage() {
  return (
    <Layout>
      <OpportunitiesContent />
    </Layout>
  )
}
