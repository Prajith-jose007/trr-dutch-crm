"use client"

import type React from "react"
import { TrendingUp, TrendingDown, Users, Target, Phone, DollarSign } from "lucide-react"

function AED() {
  return <img className="aed inline-block" alt="AED" />
}

interface StatCard {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: React.ReactNode
  isCurrency?: boolean
}

const crmStats: StatCard[] = [
  {
    title: "Total Leads",
    value: "1,247",
    change: "+12.5%",
    changeType: "increase",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Active Deals",
    value: "89",
    change: "+8.2%",
    changeType: "increase",
    icon: <Target className="h-4 w-4" />,
  },
  {
    title: "Revenue Pipeline",
    value: "284,500",
    change: "+15.3%",
    changeType: "increase",
    icon: <DollarSign className="h-4 w-4" />,
    isCurrency: true,
  },
  {
    title: "Conversion Rate",
    value: "24.8%",
    change: "-2.1%",
    changeType: "decrease",
    icon: <Phone className="h-4 w-4" />,
  },
]

export default function OverviewStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {crmStats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-[#0F0F12] rounded-lg sm:rounded-xl p-3 sm:p-6 border border-gray-200 dark:border-[#1F1F23] hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</h3>
            <div className="text-gray-600 dark:text-gray-400 flex-shrink-0">{stat.icon}</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {stat.isCurrency && <AED />} {stat.value}
            </div>
            <div className="flex items-center text-xs">
              {stat.changeType === "increase" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1 flex-shrink-0" />
              )}
              <span className={`font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1 hidden sm:inline">from last month</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1 sm:hidden">vs last</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
