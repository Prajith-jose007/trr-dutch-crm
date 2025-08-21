import type { Metadata } from "next"
import Content from "@/components/settings/content"
import Layout from "@/components/dutchcrm/layout"

export const metadata: Metadata = {
  title: "Dutch CRM Settings - Customer Relationship Management",
  description: "Dutch CRM settings and configuration for managing your CRM system",
}

export default function SettingsPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
