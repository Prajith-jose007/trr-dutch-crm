import type { Metadata } from "next"
import { AllSiteSEOSettings } from "@/components/plugins/allsite-seo/settings"

export const metadata: Metadata = {
  title: "Dutch CRM Dashboard - OpenSource CRM",
  description: "Dutch CRM dashboard build with Next.js and Tailwind CSS",
}

export default function AllSiteSEOSettingsPage() {
  return <AllSiteSEOSettings />
}
