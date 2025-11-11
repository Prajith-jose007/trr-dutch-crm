"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart } from "recharts"
import { TrendingUp, Target, Calendar, Plus, Activity, DollarSign } from "lucide-react"
import Link from "next/link"

function AED() {
  return <img className="aed inline-block" alt="AED" />
}

const opportunityStats = [
  {
    title: "Open Opportunities",
    value: "47",
    change: "+12.5%",
    changeType: "increase" as const,
    icon: Target,
  },
  {
    title: "Qualified Opportunities",
    value: "23",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: Activity,
  },
  {
    title: "Expected Revenue",
    value: "1.8M",
    isCurrency: true,
    change: "+15.3%",
    changeType: "increase" as const,
    icon: DollarSign,
  },
  {
    title: "Avg. Close Time",
    value: "45 days",
    change: "-5.1%",
    changeType: "decrease" as const,
    icon: Calendar,
  },
]

const forecastData = [
  { month: "Jan", forecast: 180000, actual: 165000 },
  { month: "Feb", forecast: 220000, actual: 198000 },
  { month: "Mar", forecast: 250000, actual: 0 },
  { month: "Apr", forecast: 280000, actual: 0 },
  { month: "May", forecast: 300000, actual: 0 },
  { month: "Jun", forecast: 320000, actual: 0 },
]

const opportunityBySource = [
  { source: "Website", count: 15, value: 450000 },
  { source: "Referrals", count: 12, value: 380000 },
  { source: "Cold Outreach", count: 8, value: 240000 },
  { source: "Social Media", count: 6, value: 180000 },
  { source: "Events", count: 4, value: 120000 },
]

const recentOpportunities = [
  {
    id: 1,
    title: "Enterprise Software License",
    company: "Rabobank",
    value: 89000,
    stage: "Qualified",
    probability: 45,
    source: "Website",
    owner: "Jan Smit",
    createdDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Cloud Infrastructure Upgrade",
    company: "PostNL",
    value: 156000,
    stage: "Discovery",
    probability: 25,
    source: "Referral",
    owner: "Maria van der Berg",
    createdDate: "2024-01-19",
  },
  {
    id: 3,
    title: "Digital Marketing Platform",
    company: "Albert Heijn",
    value: 67000,
    stage: "Qualified",
    probability: 60,
    source: "Cold Outreach",
    owner: "Pieter Jansen",
    createdDate: "2024-01-18",
  },
]

const chartConfig = {
  forecast: {
    label: "Forecast",
    color: "hsl(var(--chart-1))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-2))",
  },
}

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Discovery":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case "Qualified":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Proposal":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function OpportunitiesContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Opportunities</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage sales opportunities and forecasting</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/opportunities/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Opportunity
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/opportunities/forecast">Forecast Report</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {opportunityStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.isCurrency && <AED />} {stat.value}
                </div>
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

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecast</CardTitle>
            <CardDescription>Forecasted vs actual revenue for the year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="var(--color-forecast)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Opportunities by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Opportunities by Source</CardTitle>
            <CardDescription>Where your opportunities are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={opportunityBySource}>
                  <XAxis dataKey="source" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-forecast)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Opportunities</CardTitle>
          <CardDescription>Latest opportunities added to your pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{opportunity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.company}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {opportunity.source}
                      </Badge>
                      <span className="text-xs text-gray-500">by {opportunity.owner}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold">
                    <AED /> {opportunity.value.toLocaleString()}
                  </div>
                  <Badge className={getStageColor(opportunity.stage)}>{opportunity.stage}</Badge>
                  <div className="text-xs text-gray-500">{opportunity.probability}% probability</div>
                  <div className="text-xs text-gray-500">{opportunity.createdDate}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/opportunities/all">View All Opportunities</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
