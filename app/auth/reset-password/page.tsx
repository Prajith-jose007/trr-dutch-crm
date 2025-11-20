import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Dutch CRM Reset Password - Customer Relationship Management",
  description: "Set a new password for your Dutch CRM account",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
