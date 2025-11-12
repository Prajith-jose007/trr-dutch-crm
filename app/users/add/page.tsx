
"use client";

import Layout from "@/components/dutchcrm/layout";
import { AddUserForm } from "@/components/users/add-user-form";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddUserPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== 'superadmin') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user?.role !== 'superadmin') {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <p>Loading or redirecting...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AddUserForm />
    </Layout>
  );
}
