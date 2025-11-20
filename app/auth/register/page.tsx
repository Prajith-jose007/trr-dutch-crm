import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Dutch CRM Register - Customer Relationship Management",
  description: "Create your Dutch CRM account to start managing customers and sales",
}

export default function RegisterPage() {
  return <RegisterForm />
}
