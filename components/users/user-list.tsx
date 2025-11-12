
"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    user_id: string;
    role: string;
    status: string;
    date_of_creation: string;
}

export function UserList({ initialUsers, loading }: { initialUsers: User[], loading: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'inactive':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
        case 'superadmin':
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        case 'admin':
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
        case 'sales_head_manager':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case 'sales':
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case 'accounts_manager':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case 'accounts':
            return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        <CardDescription>A complete list of all users in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.user_id}</TableCell>
                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                    <TableCell><Badge className={getRoleColor(user.role)}>{user.role.replace(/_/g, ' ')}</Badge></TableCell>
                    <TableCell><Badge className={getStatusColor(user.status)}>{user.status}</Badge></TableCell>
                    <TableCell>{new Date(user.date_of_creation).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
