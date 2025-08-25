
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Ship, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const packages = [
    {
        id: "PKG-001",
        name: "Sunset Cruise Deluxe",
        yacht: "Odyssey",
        price: 750,
        duration: 3,
        capacity: 50,
        status: "Active"
    },
    {
        id: "PKG-002",
        name: "Afternoon Delight",
        yacht: "Majesty",
        price: 500,
        duration: 2,
        capacity: 40,
        status: "Active"
    },
    {
        id: "PKG-003",
        name: "VIP Night Cruise",
        yacht: "Serenity",
        price: 1200,
        duration: 4,
        capacity: 30,
        status: "Inactive"
    }
];

function AED() {
    return <img className="aed inline-block" alt="AED" />;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'inactive':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }

export default function YachtPackagesContent() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Yacht Packages</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage shared cruise packages.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/shared/yachts/add">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Package
                        </Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Packages</CardTitle>
                    <CardDescription>A list of all available yacht packages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Package Name</TableHead>
                                <TableHead>Yacht</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Duration (hrs)</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell className="font-medium">{pkg.id}</TableCell>
                                    <TableCell>{pkg.name}</TableCell>
                                    <TableCell>{pkg.yacht}</TableCell>
                                    <TableCell><AED />{pkg.price}</TableCell>
                                    <TableCell>{pkg.duration}</TableCell>
                                    <TableCell>{pkg.capacity}</TableCell>
                                    <TableCell><Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
