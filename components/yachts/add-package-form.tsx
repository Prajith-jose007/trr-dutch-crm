
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship } from "lucide-react";
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
                    Define a new package for shared yacht cruises with detailed pricing.
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
                                <Label htmlFor="yachtName">Yacht Name</Label>
                                <div className="relative">
                                    <Ship className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="yachtName" placeholder="e.g., Lotus Royale" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cruiseType">Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select cruise type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dinner-cruise">Dinner Cruise</SelectItem>
                                        <SelectItem value="brunch-cruise">Brunch Cruise</SelectItem>
                                        <SelectItem value="sightseeing-cruise">Sightseeing Cruise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Dinner Cruise Pricing */}
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">Dinner Cruise Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dinner-child">Child Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="dinner-child" type="number" placeholder="e.g., 249" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dinner-adult">Adult Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="dinner-adult" type="number" placeholder="e.g., 299" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dinner-adult-alc">Adult + Alcohol Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="dinner-adult-alc" type="number" placeholder="e.g., 349" className="pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Deck Pricing */}
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">Top Deck Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="top-deck-child">Child Top Deck Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="top-deck-child" type="number" placeholder="e.g., 299" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="top-deck-adult">Adult Top Deck Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="top-deck-adult" type="number" placeholder="e.g., 349" className="pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VIP Pricing */}
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">VIP Pricing</h3>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vip-child">VIP Child Price</Label>
                                    <div className="relative">
                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="vip-child" type="number" placeholder="e.g., 349" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vip-adult">VIP Adult Price</Label>
                                    <div className="relative">
                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="vip-adult" type="number" placeholder="e.g., 399" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vip-adult-alc">VIP Adult + Alcohol Price</Label>
                                    <div className="relative">
                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="vip-adult-alc" type="number" placeholder="e.g., 499" className="pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Royal Pricing */}
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-medium text-gray-900 dark:text-white">Royal Pricing</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="royal-child">Royal Child Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="royal-child" type="number" placeholder="e.g., 499" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="royal-adult">Royal Adult Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="royal-adult" type="number" placeholder="e.g., 799" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="royal-adult-alc">Royal Adult + Alcohol Price</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                        <Input id="royal-adult-alc" type="number" placeholder="e.g., 999" className="pl-10" />
                                    </div>
                                </div>
                            </div>
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
