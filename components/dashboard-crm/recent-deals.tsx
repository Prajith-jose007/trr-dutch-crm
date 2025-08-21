"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Euro, Calendar } from "lucide-react"

const recentDeals = [
  {
    id: 1,
    company: "TechCorp B.V.",
    contact: "Jan van der Berg",
    value: 45000,
    stage: "Negotiation",
    probability: 75,
    closeDate: "2024-02-15",
    avatar: "JB",
  },
  {
    id: 2,
    company: "InnovatieHub Amsterdam",
    contact: "Maria Jansen",
    value: 32000,
    stage: "Proposal",
    probability: 60,
    closeDate: "2024-02-28",
    avatar: "MJ",
  },
  {
    id: 3,
    company: "Digital Solutions NL",
    contact: "Pieter de Vries",
    value: 78000,
    stage: "Qualified",
    probability: 40,
    closeDate: "2024-03-10",
    avatar: "PV",
  },
  {
    id: 4,
    company: "StartUp Rotterdam",
    contact: "Lisa Bakker",
    value: 25000,
    stage: "Discovery",
    probability: 25,
    closeDate: "2024-03-20",
    avatar: "LB",
  },
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Negotiation":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Proposal":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Qualified":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Discovery":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function RecentDeals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deals</CardTitle>
        <CardDescription>Latest opportunities in your sales pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDeals.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={deal.contact} />
                  <AvatarFallback>{deal.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <p className="font-medium text-sm">{deal.company}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{deal.contact}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{deal.closeDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">€{deal.value.toLocaleString()}</span>
                </div>
                <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                <div className="text-xs text-gray-500">{deal.probability}% probability</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
