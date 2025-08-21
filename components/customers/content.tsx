"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Search, Filter, TrendingUp, Building2, Star, UserX } from "lucide-react"
import Link from "next/link"

const customerStats = [
  {
    title: "Total Customers",
    value: "2,847",
    change: "+12.5%",
    changeType: "increase" as const,
    icon: Users,
  },
  {
    title: "VIP Customers",
    value: "156",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: Star,
  },
  {
    title: "New This Month",
    value: "89",
    change: "+15.3%",
    changeType: "increase" as const,
    icon: UserPlus,
  },
  {
    title: "Inactive",
    value: "234",
    change: "-3.1%",
    changeType: "decrease" as const,
    icon: UserX,
  },
]

const customerSegments = [
  {
    name: "VIP Customers",
    count: 156,
    revenue: "€1.2M",
    description: "High-value customers with premium support",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    href: "/customers/segments/vip",
  },
  {
    name: "Enterprise",
    count: 89,
    revenue: "€890K",
    description: "Large business customers",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    href: "/customers/segments/enterprise",
  },
  {
    name: "SMB",
    count: 1247,
    revenue: "€456K",
    description: "Small and medium business customers",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    href: "/customers/segments/smb",
  },
  {
    name: "New Customers",
    count: 89,
    revenue: "€67K",
    description: "Recently acquired customers",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    href: "/customers/segments/new",
  },
]

const recentCustomers = [
  {
    id: 1,
    company: "TechCorp B.V.",
    contact: "Jan van der Berg",
    email: "j.vandenberg@techcorp.nl",
    revenue: 45000,
    status: "Active",
    joinDate: "2024-01-15",
    tier: "Enterprise",
  },
  {
    id: 2,
    company: "InnovatieHub Amsterdam",
    contact: "Maria Jansen",
    email: "m.jansen@innovatiehub.nl",
    revenue: 32000,
    status: "Active",
    joinDate: "2024-01-12",
    tier: "SMB",
  },
  {
    id: 3,
    company: "Digital Solutions NL",
    contact: "Pieter de Vries",
    email: "p.devries@digitalsolutions.nl",
    revenue: 78000,
    status: "VIP",
    joinDate: "2024-01-10",
    tier: "VIP",
  },
]

export default function CustomersContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your customer relationships and segments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/customers/add">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/customers/import">Import Customers</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {customerStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="flex items-center text-xs">
                  <TrendingUp
                    className={`h-3 w-3 mr-1 ${stat.changeType === "increase" ? "text-green-500" : "text-red-500 rotate-180"}`}
                  />
                  <span className={`font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search customers by name, company, or email..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" asChild>
                <Link href="/customers/all">View All</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Customer Segments</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {customerSegments.map((segment) => (
            <Card key={segment.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <Link href={segment.href}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={segment.color}>{segment.name}</Badge>
                      <Building2 className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{segment.count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">customers</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">{segment.revenue}</div>
                      <div className="text-xs text-gray-500">total revenue</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{segment.description}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
          <CardDescription>Latest customers added to your CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{customer.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{customer.contact}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold">€{customer.revenue.toLocaleString()}</div>
                  <Badge
                    className={
                      customer.tier === "VIP"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        : customer.tier === "Enterprise"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }
                  >
                    {customer.tier}
                  </Badge>
                  <div className="text-xs text-gray-500">{customer.joinDate}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/customers/all">View All Customers</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
