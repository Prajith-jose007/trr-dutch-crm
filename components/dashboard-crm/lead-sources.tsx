"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Globe, Mail, Phone, Users, Search, MessageSquare } from "lucide-react"

const leadSourcesData = [
  { name: "Website", value: 35, count: 142, icon: Globe, color: "#3b82f6" },
  { name: "Email Marketing", value: 25, count: 98, icon: Mail, color: "#10b981" },
  { name: "Cold Calling", value: 20, count: 76, icon: Phone, color: "#f59e0b" },
  { name: "Referrals", value: 12, count: 45, icon: Users, color: "#8b5cf6" },
  { name: "Social Media", value: 5, count: 23, icon: MessageSquare, color: "#ef4444" },
  { name: "SEO/Organic", value: 3, count: 12, icon: Search, color: "#6b7280" },
]

const chartConfig = {
  value: {
    label: "Percentage",
  },
}

export default function LeadSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
        <CardDescription>Where your leads are coming from this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={leadSourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {leadSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="space-y-3">
            {leadSourcesData.map((source) => {
              const IconComponent = source.icon
              return (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <IconComponent className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{source.value}%</div>
                    <div className="text-xs text-gray-500">{source.count} leads</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
