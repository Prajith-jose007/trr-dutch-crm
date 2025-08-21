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
import { Search, Filter, MoreHorizontal, Mail, Phone, Edit, Trash2, Eye, UserPlus } from "lucide-react"
import Link from "next/link"

const customers = [
  {
    id: 1,
    company: "Philips Nederland B.V.",
    contact: "Erik Hendriksen",
    email: "e.hendriksen@philips.com",
    phone: "+31 20 123 4567",
    revenue: 125000,
    deals: 8,
    status: "Active",
    tier: "Enterprise",
    joinDate: "2023-03-15",
    lastActivity: "2024-01-20",
    avatar: "EH",
  },
  {
    id: 2,
    company: "ING Bank N.V.",
    contact: "Sophie van Dam",
    email: "s.vandam@ing.nl",
    phone: "+31 20 234 5678",
    revenue: 98000,
    deals: 12,
    status: "Active",
    tier: "Enterprise",
    joinDate: "2023-01-22",
    lastActivity: "2024-01-19",
    avatar: "SD",
  },
  {
    id: 3,
    company: "KLM Royal Dutch Airlines",
    contact: "Marco Visser",
    email: "m.visser@klm.nl",
    phone: "+31 20 345 6789",
    revenue: 87000,
    deals: 6,
    status: "VIP",
    tier: "VIP",
    joinDate: "2022-11-08",
    lastActivity: "2024-01-18",
    avatar: "MV",
  },
  {
    id: 4,
    company: "ASML Holding N.V.",
    contact: "Anna de Jong",
    email: "a.dejong@asml.com",
    phone: "+31 40 456 7890",
    revenue: 156000,
    deals: 4,
    status: "Active",
    tier: "Enterprise",
    joinDate: "2023-07-12",
    lastActivity: "2024-01-17",
    avatar: "AJ",
  },
  {
    id: 5,
    company: "Unilever Nederland B.V.",
    contact: "Tom Bakker",
    email: "t.bakker@unilever.com",
    phone: "+31 10 567 8901",
    revenue: 73000,
    deals: 9,
    status: "Active",
    tier: "Premium",
    joinDate: "2023-05-30",
    lastActivity: "2024-01-16",
    avatar: "TB",
  },
  {
    id: 6,
    company: "Heineken N.V.",
    contact: "Lisa Mulder",
    email: "l.mulder@heineken.com",
    phone: "+31 20 678 9012",
    revenue: 45000,
    deals: 3,
    status: "Inactive",
    tier: "SMB",
    joinDate: "2023-09-14",
    lastActivity: "2023-12-15",
    avatar: "LM",
  },
  {
    id: 7,
    company: "Shell Nederland B.V.",
    contact: "Jeroen van Dijk",
    email: "j.vandijk@shell.com",
    phone: "+31 70 789 0123",
    revenue: 234000,
    deals: 15,
    status: "VIP",
    tier: "VIP",
    joinDate: "2022-08-03",
    lastActivity: "2024-01-21",
    avatar: "JD",
  },
  {
    id: 8,
    company: "Booking.com B.V.",
    contact: "Emma Scholten",
    email: "e.scholten@booking.com",
    phone: "+31 20 890 1234",
    revenue: 67000,
    deals: 7,
    status: "Active",
    tier: "Premium",
    joinDate: "2023-04-18",
    lastActivity: "2024-01-15",
    avatar: "ES",
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case "VIP":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Enterprise":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Premium":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "SMB":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "VIP":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Inactive":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function AllCustomersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTier, setFilterTier] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterTier === "all" || customer.tier.toLowerCase() === filterTier.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view all customers in your CRM system</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/customers/add">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/customers/import">Import</Link>
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, company, or email..."
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
                    Filter by Tier
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterTier("all")}>All Tiers</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTier("vip")}>VIP</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTier("enterprise")}>Enterprise</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTier("premium")}>Premium</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTier("smb")}>SMB</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
          <CardDescription>Complete list of all customers in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={customer.contact} />
                        <AvatarFallback>{customer.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.company}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{customer.contact}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">€{customer.revenue.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.deals} deals</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{customer.lastActivity}</div>
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
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Customer
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
