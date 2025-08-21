import type { Metadata } from "next"
import Content from "@/components/dashboard-cms/content"
import Layout from "@/components/cmsfullform/layout"

export const metadata: Metadata = {
  title: "Dutch CRM Dashboard - Customer Relationship Management",
  description: "Dutch CRM dashboard built with Next.js and Tailwind CSS for managing customers, leads, and sales",
}

export default function DashboardCMSPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
