import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import DealsContent from "@/components/deals/content"

export const metadata: Metadata = {
  title: "Deals & Opportunities - Dutch CRM",
  description: "Manage your sales deals and opportunities in Dutch CRM",
}

export default function DealsPage() {
  return (
    <Layout>
      <DealsContent />
    </Layout>
  )
}
