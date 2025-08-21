import type { Metadata } from "next"
import { ForgotForm } from "@/components/auth/forgot-form"

export const metadata: Metadata = {
  title: "Dutch CRM Password Reset - Customer Relationship Management",
  description: "Reset your Dutch CRM password to regain access to your account",
}

export default function ForgotPage() {
  return <ForgotForm />
}
