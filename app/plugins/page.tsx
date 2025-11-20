import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import Content from "@/components/plugins/content"

export const metadata: Metadata = {
  title: "Dutch CRM Integrations - Customer Relationship Management",
  description: "Dutch CRM integrations and extensions for enhanced functionality",
}

export default function PluginsPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
