
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const roles = [
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'sales_head_manager', label: 'Sales Head Manager' },
    { value: 'sales', label: 'Sales' },
    { value: 'accounts_manager', label: 'Accounts Manager' },
    { value: 'accounts', label: 'Accounts' },
    { value: 'guest', label: 'Guest' },
];

export function AddUserForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userId: "",
        role: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create user');
            }

            toast({ title: "Success", description: "User created successfully." });
            // Reset form or redirect
            setFormData({ firstName: "", lastName: "", userId: "", role: "", password: "" });
            setTimeout(() => {
                window.location.href = '/users';
            }, 1000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({ title: "Error", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New User</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Add a new user to the system and assign them a role.
                    </p>
                </div>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                            <CardDescription>Fill in the details for the new user.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required />
                                </div>
                            </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="userId">User ID</Label>
                                    <Input id="userId" name="userId" value={formData.userId} onChange={handleInputChange} placeholder="e.g., johndoe" required />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name="role" value={formData.role} onValueChange={(value) => handleSelectChange('role', value)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map(role => (
                                                <SelectItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                            </div>
                        </CardContent>
                        <div className="flex justify-end gap-2 p-6 pt-0">
                            <Button variant="outline" asChild>
                                <Link href="/users">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create User"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
