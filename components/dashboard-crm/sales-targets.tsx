"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown, Calendar, Euro } from "lucide-react"

const salesTargets = [
  {
    id: 1,
    period: "Q1 2024",
    target: 500000,
    achieved: 387000,
    percentage: 77,
    trend: "up",
    trendValue: 12,
    daysLeft: 15,
    status: "on-track",
  },
  {
    id: 2,
    period: "Monthly",
    target: 150000,
    achieved: 142000,
    percentage: 95,
    trend: "up",
    trendValue: 8,
    daysLeft: 5,
    status: "excellent",
  },
  {
    id: 3,
    period: "Annual 2024",
    target: 2000000,
    achieved: 387000,
    percentage: 19,
    trend: "up",
    trendValue: 5,
    daysLeft: 280,
    status: "early",
  },
]

const teamTargets = [
  {
    name: "Jan Smit",
    target: 50000,
    achieved: 42000,
    percentage: 84,
    deals: 8,
  },
  {
    name: "Maria van der Berg",
    target: 45000,
    achieved: 48000,
    percentage: 107,
    deals: 12,
  },
  {
    name: "Pieter Jansen",
    target: 40000,
    achieved: 35000,
    percentage: 88,
    deals: 6,
  },
  {
    name: "Lisa de Vries",
    target: 55000,
    achieved: 51000,
    percentage: 93,
    deals: 9,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "on-track":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "early":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case "behind":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getProgressColor = (percentage: number) => {
  if (percentage >= 100) return "bg-green-500"
  if (percentage >= 80) return "bg-blue-500"
  if (percentage >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function SalesTargets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Sales Targets</span>
        </CardTitle>
        <CardDescription>Track progress towards sales goals and targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Company Targets */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company Targets</h4>
            <div className="space-y-4">
              {salesTargets.map((target) => (
                <div key={target.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{target.period}</span>
                      <Badge className={getStatusColor(target.status)}>{target.status.replace("-", " ")}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      {target.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={target.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {target.trendValue}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        €{target.achieved.toLocaleString()} / €{target.target.toLocaleString()}
                      </span>
                      <span className="font-medium">{target.percentage}%</span>
                    </div>
                    <Progress value={target.percentage} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{target.daysLeft} days left</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Euro className="h-3 w-3" />
                        <span>€{(target.target - target.achieved).toLocaleString()} remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Team Performance (Monthly)</h4>
            <div className="space-y-3">
              {teamTargets.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{member.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{member.percentage}%</span>
                        <Badge variant="outline" className="text-xs">
                          {member.deals} deals
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={member.percentage} className="h-1.5" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>€{member.achieved.toLocaleString()}</span>
                        <span>€{member.target.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
