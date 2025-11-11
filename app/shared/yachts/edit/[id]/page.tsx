
import type { Metadata } from "next";
import Layout from "@/components/dutchcrm/layout";
import { EditPackageForm } from "@/components/yachts/edit-package-form";

export const metadata: Metadata = {
  title: "Edit Yacht Package - Dutch CRM",
  description: "Modify an existing yacht package for shared cruises.",
};

export default function EditYachtPackagePage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <EditPackageForm packageId={params.id} />
    </Layout>
  );
}
