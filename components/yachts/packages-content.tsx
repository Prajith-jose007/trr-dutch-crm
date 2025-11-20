
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const packages = [
    {
        id: "PKG-001",
        yachtName: "Lotus Royale",
        type: "Dinner Cruise",
        pricing: {
            dinner: { child: 249, adult: 299, adult_alc: 349 },
            top_deck: { child: 299, adult: 349 },
            vip: { child: 349, adult: 399, adult_alc: 499 },
            royal: { child: 499, adult: 799, adult_alc: 999 },
        },
        status: "Active"
    },
    {
        id: "PKG-002",
        yachtName: "Majesty Yacht",
        type: "Brunch Cruise",
        pricing: {
            dinner: { child: 199, adult: 249, adult_alc: 299 },
            top_deck: { child: 249, adult: 299 },
            vip: { child: 299, adult: 349, adult_alc: 449 },
            royal: { child: 399, adult: 599, adult_alc: 799 },
        },
        status: "Active"
    },
    {
        id: "PKG-003",
        yachtName: "Serenity Cruiser",
        type: "Sightseeing",
        pricing: {
            dinner: { child: 149, adult: 199, adult_alc: null },
            top_deck: { child: 199, adult: 249 },
            vip: { child: 249, adult: 299, adult_alc: 399 },
            royal: { child: null, adult: null, adult_alc: null },
        },
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
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Yacht Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Child</TableHead>
                                    <TableHead>Adult</TableHead>
                                    <TableHead>Adult (Alc)</TableHead>
                                    <TableHead>Child Top Deck</TableHead>
                                    <TableHead>Adult Top Deck</TableHead>
                                    <TableHead>VIP Child</TableHead>
                                    <TableHead>VIP Adult</TableHead>
                                    <TableHead>VIP Adult (Alc)</TableHead>
                                    <TableHead>Royal Child</TableHead>
                                    <TableHead>Royal Adult</TableHead>
                                    <TableHead>Royal Adult (Alc)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {packages.map((pkg) => (
                                    <TableRow key={pkg.id}>
                                        <TableCell className="font-medium">{pkg.id}</TableCell>
                                        <TableCell>{pkg.yachtName}</TableCell>
                                        <TableCell>{pkg.type}</TableCell>
                                        <TableCell>{pkg.pricing.dinner.child ? <><AED />{pkg.pricing.dinner.child}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.dinner.adult ? <><AED />{pkg.pricing.dinner.adult}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.dinner.adult_alc ? <><AED />{pkg.pricing.dinner.adult_alc}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.top_deck.child ? <><AED />{pkg.pricing.top_deck.child}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.top_deck.adult ? <><AED />{pkg.pricing.top_deck.adult}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.vip.child ? <><AED />{pkg.pricing.vip.child}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.vip.adult ? <><AED />{pkg.pricing.vip.adult}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.vip.adult_alc ? <><AED />{pkg.pricing.vip.adult_alc}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.royal.child ? <><AED />{pkg.pricing.royal.child}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.royal.adult ? <><AED />{pkg.pricing.royal.adult}</> : "N/A"}</TableCell>
                                        <TableCell>{pkg.pricing.royal.adult_alc ? <><AED />{pkg.pricing.royal.adult_alc}</> : "N/A"}</TableCell>
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
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/shared/yachts/edit/${pkg.id}`}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
