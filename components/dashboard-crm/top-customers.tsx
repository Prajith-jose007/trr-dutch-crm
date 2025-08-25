"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Star, DollarSign } from "lucide-react"

function AED() {
  return <img className="aed inline-block" alt="AED" />
}

const topCustomers = [
  {
    id: 1,
    company: "Philips Nederland",
    contact: "Erik Hendriksen",
    revenue: 125000,
    deals: 8,
    growth: 15,
    tier: "Enterprise",
    avatar: "EH",
  },
  {
    id: 2,
    company: "ING Bank",
    contact: "Sophie van Dam",
    revenue: 98000,
    deals: 12,
    growth: 22,
    tier: "Enterprise",
    avatar: "SD",
  },
  {
    id: 3,
    company: "KLM Royal Dutch Airlines",
    contact: "Marco Visser",
    revenue: 87000,
    deals: 6,
    growth: 8,
    tier: "Premium",
    avatar: "MV",
  },
  {
    id: 4,
    company: "ASML Holding",
    contact: "Anna de Jong",
    revenue: 156000,
    deals: 4,
    growth: 35,
    tier: "Enterprise",
    avatar: "AJ",
  },
  {
    id: 5,
    company: "Unilever Nederland",
    contact: "Tom Bakker",
    revenue: 73000,
    deals: 9,
    growth: -5,
    tier: "Premium",
    avatar: "TB",
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Enterprise":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Premium":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function TopCustomers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Highest value customers by revenue and growth</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div
              key={customer.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                  {index < 3 && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={customer.contact} />
                  <AvatarFallback>{customer.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <p className="font-medium text-sm">{customer.company}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{customer.contact}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                    <span className="text-xs text-gray-500">{customer.deals} deals</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">
                    <AED /> {customer.revenue.toLocaleString()}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    customer.growth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp className={`h-3 w-3 ${customer.growth < 0 ? "rotate-180" : ""}`} />
                  <span>
                    {customer.growth >= 0 ? "+" : ""}
                    {customer.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
