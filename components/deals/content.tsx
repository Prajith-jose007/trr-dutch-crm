"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Plus, Calendar, Eye, Edit, Trash2, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

const dealStats = [
  {
    title: "Total Pipeline Value",
    value: "AED 2.4M",
    change: "+15.3%",
    changeType: "increase" as const,
    icon: DollarSign,
  },
  {
    title: "Active Deals",
    value: "89",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: TrendingUp,
  },
  {
    title: "Won This Month",
    value: "12",
    change: "+25.0%",
    changeType: "increase" as const,
    icon: TrendingUp,
  },
  {
    title: "Average Deal Size",
    value: "AED 27K",
    change: "+5.1%",
    changeType: "increase" as const,
    icon: DollarSign,
  },
]

const deals = [
  {
    id: 1,
    title: "Digital Transformation Project",
    company: "Philips Nederland B.V.",
    contact: "Erik Hendriksen",
    value: 125000,
    stage: "Negotiation",
    probability: 75,
    closeDate: "2024-02-15",
    owner: "Jan Smit",
    lastActivity: "2024-01-20",
    avatar: "EH",
    ownerAvatar: "JS",
  },
  {
    id: 2,
    title: "CRM Implementation",
    company: "ING Bank N.V.",
    contact: "Sophie van Dam",
    value: 98000,
    stage: "Proposal",
    probability: 60,
    closeDate: "2024-02-28",
    owner: "Maria van der Berg",
    lastActivity: "2024-01-19",
    avatar: "SD",
    ownerAvatar: "MB",
  },
  {
    id: 3,
    title: "Cloud Migration Services",
    company: "KLM Royal Dutch Airlines",
    contact: "Marco Visser",
    value: 87000,
    stage: "Qualified",
    probability: 40,
    closeDate: "2024-03-10",
    owner: "Pieter Jansen",
    lastActivity: "2024-01-18",
    avatar: "MV",
    ownerAvatar: "PJ",
  },
  {
    id: 4,
    title: "Security Audit & Compliance",
    company: "ASML Holding N.V.",
    contact: "Anna de Jong",
    value: 156000,
    stage: "Discovery",
    probability: 25,
    closeDate: "2024-03-20",
    owner: "Lisa de Vries",
    lastActivity: "2024-01-17",
    avatar: "AJ",
    ownerAvatar: "LV",
  },
  {
    id: 5,
    title: "Marketing Automation Platform",
    company: "Unilever Nederland B.V.",
    contact: "Tom Bakker",
    value: 73000,
    stage: "Negotiation",
    probability: 80,
    closeDate: "2024-02-25",
    owner: "Jan Smit",
    lastActivity: "2024-01-16",
    avatar: "TB",
    ownerAvatar: "JS",
  },
  {
    id: 6,
    title: "Data Analytics Solution",
    company: "Shell Nederland B.V.",
    contact: "Jeroen van Dijk",
    value: 234000,
    stage: "Proposal",
    probability: 65,
    closeDate: "2024-03-15",
    owner: "Maria van der Berg",
    lastActivity: "2024-01-21",
    avatar: "JD",
    ownerAvatar: "MB",
  },
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Discovery":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case "Qualified":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Proposal":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Negotiation":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Closed Won":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Closed Lost":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 75) return "text-green-600"
  if (probability >= 50) return "text-yellow-600"
  if (probability >= 25) return "text-orange-600"
  return "text-red-600"
}

export default function DealsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStage, setFilterStage] = useState("all")

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStage === "all" || deal.stage.toLowerCase() === filterStage.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deals & Opportunities</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your sales pipeline and track deal progress</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/deals/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/deals/pipeline">Pipeline View</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {dealStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
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

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deals by title, company, or contact..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Stage
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStage("all")}>All Stages</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStage("discovery")}>Discovery</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStage("qualified")}>Qualified</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStage("proposal")}>Proposal</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStage("negotiation")}>Negotiation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deals ({filteredDeals.length})</CardTitle>
          <CardDescription>All deals currently in your sales pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Company & Contact</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ID: #{deal.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} alt={deal.contact} />
                        <AvatarFallback className="text-xs">{deal.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{deal.company}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{deal.contact}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">AED {deal.value.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getProbabilityColor(deal.probability)}`}>{deal.probability}%</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{deal.closeDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder-svg-icon.png?height=24&width=24`} alt={deal.owner} />
                        <AvatarFallback className="text-xs">{deal.ownerAvatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{deal.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Deal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Deal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
