
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { AddPackageForm } from "@/components/yachts/add-package-form";

export const metadata: Metadata = {
  title: "Add Yacht Package - Dutch CRM",
  description: "Create a new yacht package for shared cruises.",
};

export default function AddYachtPackagePage() {
  return (
    <Layout>
      <AddPackageForm />
    </Layout>
  );
}
