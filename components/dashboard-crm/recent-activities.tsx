"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Calendar, FileText, Users, MessageSquare } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    type: "call",
    title: "Called Philips Nederland",
    description: "Discussed Q1 requirements with Erik Hendriksen",
    user: "Jan Smit",
    userAvatar: "JS",
    time: "2 hours ago",
    icon: Phone,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "email",
    title: "Sent proposal to ING Bank",
    description: "Proposal for digital transformation project",
    user: "Maria van der Berg",
    userAvatar: "MB",
    time: "4 hours ago",
    icon: Mail,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "meeting",
    title: "Meeting with KLM",
    description: "Product demo scheduled for next week",
    user: "Pieter Jansen",
    userAvatar: "PJ",
    time: "6 hours ago",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "note",
    title: "Added notes for ASML",
    description: "Technical requirements and budget discussion",
    user: "Lisa de Vries",
    userAvatar: "LV",
    time: "1 day ago",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    id: 5,
    type: "lead",
    title: "New lead from website",
    description: "StartUp Amsterdam interested in CRM solution",
    user: "System",
    userAvatar: "SY",
    time: "1 day ago",
    icon: Users,
    color: "text-indigo-600",
  },
  {
    id: 6,
    type: "chat",
    title: "Chat with Unilever",
    description: "Support request for integration issues",
    user: "Tom Bakker",
    userAvatar: "TB",
    time: "2 days ago",
    icon: MessageSquare,
    color: "text-teal-600",
  },
]

const getActivityBadge = (type: string) => {
  switch (type) {
    case "call":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "email":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "meeting":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "note":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "lead":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
    case "chat":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest team activities and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <Badge className={getActivityBadge(activity.type)}>{activity.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder-svg-icon.png?height=24&width=24`} alt={activity.user} />
                      <AvatarFallback className="text-xs">{activity.userAvatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
