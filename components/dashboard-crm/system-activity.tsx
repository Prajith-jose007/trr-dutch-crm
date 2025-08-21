"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Users, Mail, Phone, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

const systemActivities = [
  {
    id: 1,
    type: "sync",
    title: "Email sync completed",
    description: "Synchronized 247 emails from Outlook",
    status: "success",
    time: "5 minutes ago",
    icon: Mail,
  },
  {
    id: 2,
    type: "backup",
    title: "Database backup",
    description: "Daily backup completed successfully",
    status: "success",
    time: "1 hour ago",
    icon: Database,
  },
  {
    id: 3,
    type: "import",
    title: "Contact import",
    description: "Imported 45 new contacts from CSV",
    status: "success",
    time: "2 hours ago",
    icon: Users,
  },
  {
    id: 4,
    type: "call",
    title: "Call recording processed",
    description: "3 call recordings transcribed and analyzed",
    status: "processing",
    time: "3 hours ago",
    icon: Phone,
  },
  {
    id: 5,
    type: "report",
    title: "Monthly report generated",
    description: "Sales performance report for January 2024",
    status: "success",
    time: "4 hours ago",
    icon: FileText,
  },
  {
    id: 6,
    type: "error",
    title: "Integration warning",
    description: "LinkedIn integration rate limit reached",
    status: "warning",
    time: "6 hours ago",
    icon: AlertCircle,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "processing":
      return <Clock className="h-4 w-4 text-blue-600" />
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Activity className="h-4 w-4 text-gray-600" />
  }
}

export default function SystemActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>System Activity</span>
        </CardTitle>
        <CardDescription>Recent system events and background processes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemActivities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(activity.status)}
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">System Health</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">All systems operational</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
