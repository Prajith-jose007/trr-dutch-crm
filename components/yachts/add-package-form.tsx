
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Package, Ship, Tag, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function AED() {
    return <img className="aed inline-block" alt="AED" />;
}

export function AddPackageForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Redirect or show success message
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Yacht Package</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Define a new package for shared yacht cruises.
                </p>
            </div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Package Details</CardTitle>
                        <CardDescription>Fill in the information for the new package.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="packageName">Package Name</Label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="packageName" placeholder="e.g., Sunset Cruise Deluxe" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yacht">Yacht</Label>
                                 <div className="relative">
                                    <Ship className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Select>
                                        <SelectTrigger className="pl-10">
                                            <SelectValue placeholder="Select a yacht" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="odyssey">Odyssey</SelectItem>
                                            <SelectItem value="majesty">Majesty</SelectItem>
                                            <SelectItem value="serenity">Serenity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2"><AED /></span>
                                    <Input id="price" type="number" placeholder="Enter price" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Capacity</Label>
                                <div className="relative">
                                     <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="capacity" type="number" placeholder="e.g., 50" className="pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="inclusions">Inclusions</Label>
                             <div className="relative">
                                <Textarea id="inclusions" placeholder="e.g., Welcome drink, Buffet dinner, Live music..." />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (in hours)</Label>
                            <Input id="duration" type="number" placeholder="e.g., 3" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue="active">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <div className="flex justify-end gap-2 p-6 pt-0">
                         <Button variant="outline" asChild>
                           <Link href="/shared/yachts">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Package"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

