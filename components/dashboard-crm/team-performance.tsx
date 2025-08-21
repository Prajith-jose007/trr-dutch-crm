"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, Target, TrendingUp } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Maria van der Berg",
    role: "Senior Sales Rep",
    avatar: "MB",
    dealsWon: 12,
    revenue: 156000,
    target: 150000,
    conversion: 24,
    activities: 89,
    rank: 1,
    trend: "up",
  },
  {
    id: 2,
    name: "Jan Smit",
    role: "Sales Representative",
    avatar: "JS",
    dealsWon: 8,
    revenue: 98000,
    target: 100000,
    conversion: 18,
    activities: 76,
    rank: 2,
    trend: "up",
  },
  {
    id: 3,
    name: "Pieter Jansen",
    role: "Account Manager",
    avatar: "PJ",
    dealsWon: 6,
    revenue: 87000,
    target: 90000,
    conversion: 22,
    activities: 54,
    rank: 3,
    trend: "down",
  },
  {
    id: 4,
    name: "Lisa de Vries",
    role: "Sales Representative",
    avatar: "LV",
    dealsWon: 9,
    revenue: 73000,
    target: 80000,
    conversion: 16,
    activities: 67,
    rank: 4,
    trend: "up",
  },
]

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case 2:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case 3:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }
}

const getRankIcon = (rank: number) => {
  if (rank <= 3) {
    return <Trophy className="h-4 w-4" />
  }
  return <Target className="h-4 w-4" />
}

export default function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Team Performance</span>
        </CardTitle>
        <CardDescription>Sales team rankings and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className={getRankBadge(member.rank)}>
                    <div className="flex items-center space-x-1">
                      {getRankIcon(member.rank)}
                      <span>#{member.rank}</span>
                    </div>
                  </Badge>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={member.name} />
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 ${member.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  <TrendingUp className={`h-4 w-4 ${member.trend === "down" ? "rotate-180" : ""}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Revenue Target</span>
                    <span className="font-medium">{Math.round((member.revenue / member.target) * 100)}%</span>
                  </div>
                  <Progress value={(member.revenue / member.target) * 100} className="h-2" />
                  <div className="text-xs text-gray-500">
                    €{member.revenue.toLocaleString()} / €{member.target.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Deals Won</span>
                    <span className="font-medium">{member.dealsWon}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
                    <span className="font-medium">{member.conversion}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Activities</span>
                    <span className="font-medium">{member.activities}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
