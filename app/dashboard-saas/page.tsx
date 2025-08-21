import type { Metadata } from "next"
import { DashboardSaasLayout } from "@/components/dashboard-saas"

export const metadata: Metadata = {
  title: "Dutch CRM Dashboard - OpenSource CRM",
  description: "Dutch CRM dashboard build with Next.js and Tailwind CSS",
}

export default function DashboardSaasPage() {
  return <DashboardSaasLayout />
}
