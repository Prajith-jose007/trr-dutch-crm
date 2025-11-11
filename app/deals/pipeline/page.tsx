import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import PipelineContent from "@/components/deals/pipeline"

export const metadata: Metadata = {
  title: "Sales Pipeline - Dutch CRM",
  description: "Visual sales pipeline board for managing deals through stages",
}

export default function PipelinePage() {
  return (
    <Layout>
      <PipelineContent />
    </Layout>
  )
}
