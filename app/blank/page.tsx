import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import { BlankContent } from "@/components/blank"

export const metadata: Metadata = {
  title: "Dutch CRM Dashboard - OpenSource CRM",
  description: "Dutch CRM dashboard build with Next.js and Tailwind CSS",
}

export default function BlankPage() {
  return (
    <Layout>
      <BlankContent />
    </Layout>
  )
}
