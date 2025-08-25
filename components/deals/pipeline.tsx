"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Calendar, Building2, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

function AED() {
  return <img className="aed inline-block" alt="AED" />
}

const pipelineStages = [
  {
    id: "discovery",
    name: "Discovery",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    count: 12,
    value: 456000,
  },
  {
    id: "qualified",
    name: "Qualified",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    count: 8,
    value: 678000,
  },
  {
    id: "proposal",
    name: "Proposal",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    count: 15,
    value: 892000,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    count: 6,
    value: 345000,
  },
  {
    id: "closed-won",
    name: "Closed Won",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    count: 4,
    value: 234000,
  },
]

const dealsByStage = {
  discovery: [
    {
      id: 1,
      title: "Security Audit & Compliance",
      company: "ASML Holding N.V.",
      contact: "Anna de Jong",
      value: 156000,
      probability: 25,
      closeDate: "2024-03-20",
      owner: "Lisa de Vries",
      avatar: "AJ",
      ownerAvatar: "LV",
    },
    {
      id: 2,
      title: "HR Management System",
      company: "Heineken N.V.",
      contact: "Lisa Mulder",
      value: 89000,
      probability: 20,
      closeDate: "2024-04-15",
      owner: "Tom Bakker",
      avatar: "LM",
      ownerAvatar: "TB",
    },
  ],
  qualified: [
    {
      id: 3,
      title: "Cloud Migration Services",
      company: "KLM Royal Dutch Airlines",
      contact: "Marco Visser",
      value: 87000,
      probability: 40,
      closeDate: "2024-03-10",
      owner: "Pieter Jansen",
      avatar: "MV",
      ownerAvatar: "PJ",
    },
  ],
  proposal: [
    {
      id: 4,
      title: "CRM Implementation",
      company: "ING Bank N.V.",
      contact: "Sophie van Dam",
      value: 98000,
      probability: 60,
      closeDate: "2024-02-28",
      owner: "Maria van der Berg",
      avatar: "SD",
      ownerAvatar: "MB",
    },
    {
      id: 5,
      title: "Data Analytics Solution",
      company: "Shell Nederland B.V.",
      contact: "Jeroen van Dijk",
      value: 234000,
      probability: 65,
      closeDate: "2024-03-15",
      owner: "Maria van der Berg",
      avatar: "JD",
      ownerAvatar: "MB",
    },
  ],
  negotiation: [
    {
      id: 6,
      title: "Digital Transformation Project",
      company: "Philips Nederland B.V.",
      contact: "Erik Hendriksen",
      value: 125000,
      probability: 75,
      closeDate: "2024-02-15",
      owner: "Jan Smit",
      avatar: "EH",
      ownerAvatar: "JS",
    },
    {
      id: 7,
      title: "Marketing Automation Platform",
      company: "Unilever Nederland B.V.",
      contact: "Tom Bakker",
      value: 73000,
      probability: 80,
      closeDate: "2024-02-25",
      owner: "Jan Smit",
      avatar: "TB",
      ownerAvatar: "JS",
    },
  ],
  "closed-won": [
    {
      id: 8,
      title: "E-commerce Platform",
      company: "Booking.com B.V.",
      contact: "Emma Scholten",
      value: 145000,
      probability: 100,
      closeDate: "2024-01-30",
      owner: "Lisa de Vries",
      avatar: "ES",
      ownerAvatar: "LV",
    },
  ],
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 75) return "text-green-600"
  if (probability >= 50) return "text-yellow-600"
  if (probability >= 25) return "text-orange-600"
  return "text-red-600"
}

export default function PipelineContent() {
  const totalValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0)
  const totalDeals = pipelineStages.reduce((sum, stage) => sum + stage.count, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Pipeline</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visual overview of your sales pipeline and deal progression
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/deals/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/deals">List View</Link>
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pipeline Value</h3>
              <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <AED /> {totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Deals</h3>
              <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalDeals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Deal Size</h3>
              <DollarSign className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <AED /> {Math.round(totalValue / totalDeals).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</h3>
              <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">68%</div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        {pipelineStages.map((stage) => (
          <Card key={stage.id} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                <Badge className={stage.color}>{stage.count}</Badge>
              </div>
              <CardDescription className="text-xs">
                <AED /> {stage.value.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {dealsByStage[stage.id as keyof typeof dealsByStage]?.map((deal) => (
                <Card
                  key={deal.id}
                  className="p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500"
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{deal.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-green-600">
                        <AED /> {deal.value.toLocaleString()}
                      </div>
                      <span className={`text-xs font-medium ${getProbabilityColor(deal.probability)}`}>
                        {deal.probability}%
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{deal.closeDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={`/placeholder-20px-height.png?height=20&width=20`} alt={deal.contact} />
                          <AvatarFallback className="text-xs">{deal.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{deal.contact}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={`/placeholder_icon.png?height=16&width=16`} alt={deal.owner} />
                          <AvatarFallback className="text-xs">{deal.ownerAvatar}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Deal Button */}
              <Button
                variant="ghost"
                className="w-full h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                asChild
              >
                <Link href="/deals/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
