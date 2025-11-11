"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useAuth } from "@/app/context/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: formData.userId, password: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // On successful login, save user data to context and redirect
      login(data.user);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user.name}!`,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full max-w-md">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center mb-8">
          <Image src="/logo.svg" alt="Dutch CRM Logo" width={48} height={48} className="mr-3" />
          <span className="text-2xl font-bold text-slate-900">Dutch CRM</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="userId">User ID</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                id="userId"
                type="text"
                required
                className="pl-10"
                placeholder="Enter your user ID"
                value={formData.userId}
                onChange={(e) => setFormData((prev) => ({ ...prev, userId: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 pr-10"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
              />
              <Label htmlFor="remember" className="text-sm text-slate-600">
                Remember me
              </Label>
            </div>
            <Link href="/auth/forgot" className="text-sm text-slate-900 hover:text-slate-700 font-medium">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

        </form>
      </div>
    </>
  )
}
