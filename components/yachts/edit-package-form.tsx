
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function AED() {
    return <img className="aed inline-block" alt="AED" />;
}

// This would typically be fetched from an API
const mockPackages = [
    {
        id: "1", // Assuming ID from DB is a number/string
        yachtName: "Lotus Royale",
        type: "Dinner Cruise",
        pricing: {
            dinner: { child: 249, adult: 299, adult_alc: 349 },
            top_deck: { child: 299, adult: 349, adult_alc: null },
            vip: { child: 349, adult: 399, adult_alc: 499 },
            royal: { child: 499, adult: 799, adult_alc: 999 },
        },
        status: "Active"
    },
];

export function EditPackageForm({ packageId }: { packageId: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchPackage() {
            try {
                const res = await fetch(`/api/yachts/${packageId}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        yachtName: data.yacht_name,
                        type: data.type,
                        status: data.status,
                        pricing: {
                            dinner: {
                                child: data.dinner_child_price,
                                adult: data.dinner_adult_price,
                                adult_alc: data.dinner_adult_alc_price,
                            },
                            top_deck: {
                                child: data.top_deck_child_price,
                                adult: data.top_deck_adult_price,
                            },
                            vip: {
                                child: data.vip_child_price,
                                adult: data.vip_adult_price,
                                adult_alc: data.vip_adult_alc_price,
                            },
                            royal: {
                                child: data.royal_child_price,
                                adult: data.royal_adult_price,
                                adult_alc: data.royal_adult_alc_price,
                            },
                        },
                    });
                } else {
                    toast({ title: "Error", description: "Failed to fetch package data.", variant: "destructive" });
                }
            } catch (error) {
                toast({ title: "Error", description: "An error occurred while fetching package data.", variant: "destructive" });
            } finally {
                setLoading(false);
            }
        }
        fetchPackage();
    }, [packageId, toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handlePricingChange = (category: string, type: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                [category]: {
                    ...prev.pricing[category],
                    [type]: value ? parseFloat(value) : null
                }
            }
        }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
         setFormData((prev: any) => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/yachts/edit/${packageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({ title: "Success", description: "Package updated successfully." });
                 setTimeout(() => {
                    window.location.href = '/shared/yachts';
                }, 1000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update package');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({ title: "Error", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>
    }
    
    if (!formData) {
        return <div>Package not found.</div>
    }

    return (
        <>
            <Toaster />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Yacht Package</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Modify the details for the yacht package.
                    </p>
                </div>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Package Details</CardTitle>
                            <CardDescription>Update the information for the package.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="yachtName">Yacht Name</Label>
                                    <div className="relative">
                                        <Ship className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="yachtName" name="yachtName" value={formData.yachtName} onChange={handleInputChange} placeholder="e.g., Lotus Royale" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select cruise type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dinner Cruise">Dinner Cruise</SelectItem>
                                            <SelectItem value="Brunch Cruise">Brunch Cruise</SelectItem>
                                            <SelectItem value="Sightseeing">Sightseeing Cruise</SelectItem>
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
                                            <Input id="dinner-child" type="number" value={formData.pricing.dinner.child ?? ''} onChange={(e) => handlePricingChange('dinner', 'child', e.target.value)} placeholder="e.g., 249" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dinner-adult">Adult Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="dinner-adult" type="number" value={formData.pricing.dinner.adult ?? ''} onChange={(e) => handlePricingChange('dinner', 'adult', e.target.value)} placeholder="e.g., 299" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dinner-adult-alc">Adult + Alcohol Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="dinner-adult-alc" type="number" value={formData.pricing.dinner.adult_alc ?? ''} onChange={(e) => handlePricingChange('dinner', 'adult_alc', e.target.value)} placeholder="e.g., 349" className="pl-10" />
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
                                            <Input id="top-deck-child" type="number" value={formData.pricing.top_deck?.child ?? ''} onChange={(e) => handlePricingChange('top_deck', 'child', e.target.value)} placeholder="e.g., 299" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="top-deck-adult">Adult Top Deck Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="top-deck-adult" type="number" value={formData.pricing.top_deck?.adult ?? ''} onChange={(e) => handlePricingChange('top_deck', 'adult', e.target.value)} placeholder="e.g., 349" className="pl-10" />
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
                                            <Input id="vip-child" type="number" value={formData.pricing.vip.child ?? ''} onChange={(e) => handlePricingChange('vip', 'child', e.target.value)} placeholder="e.g., 349" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vip-adult">VIP Adult Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="vip-adult" type="number" value={formData.pricing.vip.adult ?? ''} onChange={(e) => handlePricingChange('vip', 'adult', e.target.value)} placeholder="e.g., 399" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vip-adult-alc">VIP Adult + Alcohol Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="vip-adult-alc" type="number" value={formData.pricing.vip.adult_alc ?? ''} onChange={(e) => handlePricingChange('vip', 'adult_alc', e.target.value)} placeholder="e.g., 499" className="pl-10" />
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
                                            <Input id="royal-child" type="number" value={formData.pricing.royal.child ?? ''} onChange={(e) => handlePricingChange('royal', 'child', e.target.value)} placeholder="e.g., 499" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="royal-adult">Royal Adult Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="royal-adult" type="number" value={formData.pricing.royal.adult ?? ''} onChange={(e) => handlePricingChange('royal', 'adult', e.target.value)} placeholder="e.g., 799" className="pl-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="royal-adult-alc">Royal Adult + Alcohol Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><AED /></span>
                                            <Input id="royal-adult-alc" type="number" value={formData.pricing.royal.adult_alc ?? ''} onChange={(e) => handlePricingChange('royal', 'adult_alc', e.target.value)} placeholder="e.g., 999" className="pl-10" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <div className="flex justify-end gap-2 p-6 pt-0">
                            <Button variant="outline" asChild>
                            <Link href="/shared/yachts">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Package"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
