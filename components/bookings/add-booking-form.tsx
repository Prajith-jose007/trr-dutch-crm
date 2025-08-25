
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ship, Calendar, User, Phone, Wallet, Ticket, Percent } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

function AED() {
    return <img className="aed inline-block" alt="AED" />;
}

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

export function AddBookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [commission, setCommission] = useState(0);

    const calculateCommission = useCallback(() => {
        const net = totalAmount - (totalAmount * (discount / 100));
        setNetAmount(net);
        if (discount === 0) {
            setCommission(0);
        } else {
            setCommission(net * 0.10); // Assuming 10% commission on net amount
        }
    }, [totalAmount, discount]);

    useEffect(() => {
        calculateCommission();
    }, [calculateCommission]);


    const handlePackageChange = (packageId: string) => {
        const pkg = packages.find(p => p.id === packageId);
        setSelectedPackage(pkg);
    };

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Booking</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Create a new booking entry and link it to a yacht package.
                </p>
            </div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Booking Information</CardTitle>
                        <CardDescription>Fill in the details for the new booking.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="booking-date">Booking Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="booking-date" type="date" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yacht-package">Yacht Package</Label>
                                <Select onValueChange={handlePackageChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a package" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packages.filter(p => p.status === 'Active').map(pkg => (
                                            <SelectItem key={pkg.id} value={pkg.id}>
                                                {pkg.yachtName} - {pkg.type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        {selectedPackage && (
                            <Card className="bg-gray-50 dark:bg-gray-800/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">{selectedPackage.yachtName} - {selectedPackage.type}</CardTitle>
                                    <CardDescription>Review the pricing details for the selected package.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    {/* Pricing details can be displayed here */}
                                    <p><strong>Dinner:</strong> Child: <AED/>{selectedPackage.pricing.dinner.child}, Adult: <AED/>{selectedPackage.pricing.dinner.adult}</p>
                                    <p><strong>Top Deck:</strong> Child: <AED/>{selectedPackage.pricing.top_deck.child}, Adult: <AED/>{selectedPackage.pricing.top_deck.adult}</p>
                                    <p><strong>VIP:</strong> Child: <AED/>{selectedPackage.pricing.vip.child}, Adult: <AED/>{selectedPackage.pricing.vip.adult}</p>
                                     <p><strong>Royal:</strong> Child: <AED/>{selectedPackage.pricing.royal.child ?? 'N/A'}, Adult: <AED/>{selectedPackage.pricing.royal.adult ?? 'N/A'}</p>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="client-name">Client Name</Label>
                                 <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="client-name" placeholder="e.g., John Doe" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client-phone">Client Phone</Label>
                                 <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="client-phone" placeholder="e.g., +971 50 123 4567" className="pl-10" />
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="adult-qty">Adult Quantity</Label>
                                <Input id="adult-qty" type="number" placeholder="e.g., 2" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="child-qty">Child Quantity</Label>
                                <Input id="child-qty" type="number" placeholder="e.g., 1" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="ticket-ref">Ticket REF No</Label>
                                <div className="relative">
                                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="ticket-ref" placeholder="e.g., REF-12345" className="pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="payment-mode">Payment Mode</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="credit-card">Credit Card</SelectItem>
                                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="total-amount">Total Amount</Label>
                                <div className="relative">
                                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="total-amount" type="number" placeholder="e.g. 1000" className="pl-10" value={totalAmount} onChange={(e) => setTotalAmount(Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discount">Discount (%)</Label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="discount" type="number" placeholder="e.g., 10" className="pl-10" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="net-amount">Net Amount</Label>
                                <div className="relative">
                                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="net-amount" type="number" placeholder="Calculated automatically" className="pl-10" value={netAmount} readOnly />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="commission">Commission</Label>
                                <div className="relative">
                                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="commission" type="number" placeholder="Calculated automatically" className="pl-10" value={commission} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" placeholder="Any special requests or notes for this booking." />
                        </div>
                    </CardContent>
                    <div className="flex justify-end gap-2 p-6 pt-0">
                         <Button variant="outline" asChild>
                           <Link href="/shared/bookings">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Booking"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

