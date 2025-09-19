
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
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
            top_deck: { child: 299, adult: 349, adult_alc: null },
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
            top_deck: { child: 249, adult: 299, adult_alc: null },
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
            top_deck: { child: 199, adult: 249, adult_alc: null },
            vip: { child: 249, adult: 299, adult_alc: 399 },
            royal: { child: null, adult: null, adult_alc: null },
        },
        status: "Inactive"
    }
];

interface Agent {
  id: number;
  name: string;
  customer_discount: number;
}

const initialQuantities = {
    dinner_child: 0,
    dinner_adult: 0,
    dinner_adult_alc: 0,
    top_deck_child: 0,
    top_deck_adult: 0,
    vip_child: 0,
    vip_adult: 0,
    vip_adult_alc: 0,
    royal_child: 0,
    royal_adult: 0,
    royal_adult_alc: 0,
};

export function AddBookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [quantities, setQuantities] = useState(initialQuantities);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [commission, setCommission] = useState(0);
    const [agents, setAgents] = useState<Agent[]>([]);
    const { toast } = useToast();

    // Form state
    const [bookingDate, setBookingDate] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [agentName, setAgentName] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [ticketRef, setTicketRef] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        async function fetchAgents() {
            try {
                const res = await fetch('/api/agents/list');
                if (res.ok) {
                    const data = await res.json();
                    setAgents(data);
                } else {
                    console.error("Failed to fetch agents");
                }
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        }
        fetchAgents();
    }, []);

    const handleAgentChange = (agentId: string) => {
        const selectedAgent = agents.find(agent => agent.id.toString() === agentId);
        if (selectedAgent) {
            setAgentName(selectedAgent.name);
            setDiscount(selectedAgent.customer_discount || 0);
        }
    };

    const handleQuantityChange = (name: keyof typeof initialQuantities, value: string) => {
        setQuantities(prev => ({ ...prev, [name]: Number(value) || 0 }));
    };
    
    const calculateTotal = useCallback(() => {
        if (!selectedPackage) return 0;
        
        let total = 0;
        const p = selectedPackage.pricing;

        total += (quantities.dinner_child * (p.dinner.child || 0));
        total += (quantities.dinner_adult * (p.dinner.adult || 0));
        total += (quantities.dinner_adult_alc * (p.dinner.adult_alc || 0));
        
        total += (quantities.top_deck_child * (p.top_deck.child || 0));
        total += (quantities.top_deck_adult * (p.top_deck.adult || 0));

        total += (quantities.vip_child * (p.vip.child || 0));
        total += (quantities.vip_adult * (p.vip.adult || 0));
        total += (quantities.vip_adult_alc * (p.vip.adult_alc || 0));

        total += (quantities.royal_child * (p.royal.child || 0));
        total += (quantities.royal_adult * (p.royal.adult || 0));
        total += (quantities.royal_adult_alc * (p.royal.adult_alc || 0));
        
        return total;
    }, [selectedPackage, quantities]);

    useEffect(() => {
        const newTotal = calculateTotal();
        setTotalAmount(newTotal);
    }, [quantities, selectedPackage, calculateTotal]);


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
    }, [totalAmount, discount, calculateCommission]);


    const handlePackageChange = (packageId: string) => {
        const pkg = packages.find(p => p.id === packageId);
        setSelectedPackage(pkg);
        setQuantities(initialQuantities); // Reset quantities when package changes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const bookingData = {
            bookingDate,
            clientName,
            clientPhone,
            agentName,
            yachtPackage: selectedPackage?.id,
            paymentMode,
            ticketRef,
            totalAmount,
            discount,
            netAmount,
            commission,
            notes,
            quantities,
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            toast({
                title: "Success",
                description: "Booking created successfully.",
            });
            // Optionally reset form here or redirect
            // window.location.href = '/shared/bookings';

        } catch (error) {
            toast({
                title: "Error",
                description: "Could not create booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster />
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
                                        <Input id="booking-date" type="date" className="pl-10" value={bookingDate} onChange={e => setBookingDate(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="yacht-package">Yacht Package</Label>
                                    <Select onValueChange={handlePackageChange} required>
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
                                    <CardContent className="space-y-2 text-sm">
                                        <p><strong>Dinner:</strong> Child: <AED/>{selectedPackage.pricing.dinner.child ?? 'N/A'}, Adult: <AED/>{selectedPackage.pricing.dinner.adult ?? 'N/A'}, Adult+Alc: <AED/>{selectedPackage.pricing.dinner.adult_alc ?? 'N/A'}</p>
                                        <p><strong>Top Deck:</strong> Child: <AED/>{selectedPackage.pricing.top_deck.child ?? 'N/A'}, Adult: <AED/>{selectedPackage.pricing.top_deck.adult ?? 'N/A'}</p>
                                        <p><strong>VIP:</strong> Child: <AED/>{selectedPackage.pricing.vip.child ?? 'N/A'}, Adult: <AED/>{selectedPackage.pricing.vip.adult ?? 'N/A'}, VIP+Alc: <AED/>{selectedPackage.pricing.vip.adult_alc ?? 'N/A'}</p>
                                        <p><strong>Royal:</strong> Child: <AED/>{selectedPackage.pricing.royal.child ?? 'N/A'}, Adult: <AED/>{selectedPackage.pricing.royal.adult ?? 'N/A'}, Royal+Alc: <AED/>{selectedPackage.pricing.royal.adult_alc ?? 'N/A'}</p>
                                    </CardContent>
                                </Card>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="client-name">Client Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="client-name" placeholder="e.g., John Doe" className="pl-10" value={clientName} onChange={e => setClientName(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client-phone">Client Phone</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="client-phone" placeholder="e.g., +971 50 123 4567" className="pl-10" value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="agent-name">Agent Name</Label>
                                    <Select onValueChange={handleAgentChange} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an agent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {agents.map(agent => (
                                                <SelectItem key={agent.id} value={agent.id.toString()}>
                                                    {agent.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Quantities */}
                            <div className="space-y-4 rounded-lg border p-4">
                                <h3 className="font-medium text-gray-900 dark:text-white">Quantities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dinner_child">Dinner Child</Label>
                                        <Input id="dinner_child" type="number" placeholder="0" value={quantities.dinner_child} onChange={(e) => handleQuantityChange('dinner_child', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dinner_adult">Dinner Adult</Label>
                                        <Input id="dinner_adult" type="number" placeholder="0" value={quantities.dinner_adult} onChange={(e) => handleQuantityChange('dinner_adult', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dinner_adult_alc">Dinner Adult (Alc)</Label>
                                        <Input id="dinner_adult_alc" type="number" placeholder="0" value={quantities.dinner_adult_alc} onChange={(e) => handleQuantityChange('dinner_adult_alc', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="top_deck_child">Top Deck Child</Label>
                                        <Input id="top_deck_child" type="number" placeholder="0" value={quantities.top_deck_child} onChange={(e) => handleQuantityChange('top_deck_child', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="top_deck_adult">Top Deck Adult</Label>
                                        <Input id="top_deck_adult" type="number" placeholder="0" value={quantities.top_deck_adult} onChange={(e) => handleQuantityChange('top_deck_adult', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vip_child">VIP Child</Label>
                                        <Input id="vip_child" type="number" placeholder="0" value={quantities.vip_child} onChange={(e) => handleQuantityChange('vip_child', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vip_adult">VIP Adult</Label>
                                        <Input id="vip_adult" type="number" placeholder="0" value={quantities.vip_adult} onChange={(e) => handleQuantityChange('vip_adult', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vip_adult_alc">VIP Adult (Alc)</Label>
                                        <Input id="vip_adult_alc" type="number" placeholder="0" value={quantities.vip_adult_alc} onChange={(e) => handleQuantityChange('vip_adult_alc', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="royal_child">Royal Child</Label>
                                        <Input id="royal_child" type="number" placeholder="0" value={quantities.royal_child} onChange={(e) => handleQuantityChange('royal_child', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="royal_adult">Royal Adult</Label>
                                        <Input id="royal_adult" type="number" placeholder="0" value={quantities.royal_adult} onChange={(e) => handleQuantityChange('royal_adult', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="royal_adult_alc">Royal Adult (Alc)</Label>
                                        <Input id="royal_adult_alc" type="number" placeholder="0" value={quantities.royal_adult_alc} onChange={(e) => handleQuantityChange('royal_adult_alc', e.target.value)} />
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="payment-mode">Payment Mode</Label>
                                    <Select onValueChange={setPaymentMode} required>
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
                                <div className="space-y-2">
                                    <Label htmlFor="ticket-ref">Ticket REF No</Label>
                                    <div className="relative">
                                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="ticket-ref" placeholder="e.g., REF-12345" className="pl-10" value={ticketRef} onChange={e => setTicketRef(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="total-amount">Total Amount</Label>
                                    <div className="relative">
                                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="total-amount" type="number" placeholder="Calculated automatically" className="pl-10 bg-gray-100 dark:bg-gray-800" value={totalAmount} readOnly />
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
                                        <Input id="net-amount" type="number" placeholder="Calculated automatically" className="pl-10 bg-gray-100 dark:bg-gray-800" value={netAmount} readOnly />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="commission">Commission</Label>
                                    <div className="relative">
                                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="commission" type="number" placeholder="Calculated automatically" className="pl-10 bg-gray-100 dark:bg-gray-800" value={commission} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea id="notes" placeholder="Any special requests or notes for this booking." value={notes} onChange={e => setNotes(e.target.value)} />
                            </div>
                        </CardContent>
                        <div className="flex justify-end gap-2 p-6 pt-0">
                            <Button variant="outline" asChild>
                            <Link href="/shared/bookings">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !selectedPackage}>
                                {isSubmitting ? "Creating..." : "Create Booking"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}

    