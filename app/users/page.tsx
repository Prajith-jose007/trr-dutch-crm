
"use client";

import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/dutchcrm/layout";
import { UserList } from "@/components/users/user-list";
import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getUsers() {
  const res = await fetch("/api/users/list", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export default function UserManagementPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      if (user.role !== 'superadmin') {
        router.push("/");
      } else {
        getUsers()
          .then(setUsers)
          .catch(console.error)
          .finally(() => setDataLoading(false));
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'superadmin') {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <Button asChild>
            <Link href="/users/add">
                <Plus className="w-4 h-4 mr-2" /> Add User
            </Link>
        </Button>
      </div>
      <UserList initialUsers={users} loading={dataLoading} />
    </Layout>
  );
}
