"use client"

import type { Metadata } from "next"
import Layout from "@/components/dutchcrm/layout"
import { useState } from "react"
import { MoreHorizontal, Search, Filter, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bookings Management - Dutch CRM",
  description: "Manage all your shared bookings.",
};

const bookingsData = [
  {
    id: "BK-001",
    status: "Confirmed",
    date: "2024-05-20",
    yacht: "Serenity",
    agent: "John Doe",
    client: "Alice Johnson",
    paymentStatus: "Paid",
    type: "Private",
    transactionId: "TRN-12345",
    bookingRef: "REF-ABCDE",
    paymentMode: "Credit Card",
    free: "No",
    chQty: 2,
    adQty: 4,
    chdTopQty: 0,
    adtTopQty: 0,
    adAlcQty: 4,
    vipChQty: 0,
    vipAdQty: 0,
    vipAlcQty: 0,
    rylChQty: 0,
    rylAdQty: 0,
    rylAlcQty: 0,
    basicQty: 0,
    stdQty: 0,
    premQty: 0,
    vipQty: 6,
    hrChtrQty: 4,
    totalCount: 6,
    addonPack: "Premium Drinks",
    totalAmt: 5000,
    rate: 1250,
    discount: 0,
    commission: 500,
    netAmt: 4500,
    paid: 4500,
    balance: 0,
    note: "Client requested champagne.",
    createdBy: "admin",
    modifiedBy: "admin",
    dateOfCreation: "2024-05-10",
    dateOfModification: "2024-05-12",
  },
  {
    id: "BK-002",
    status: "Pending",
    date: "2024-06-15",
    yacht: "Odyssey",
    agent: "Jane Smith",
    client: "Bob Williams",
    paymentStatus: "Unpaid",
    type: "Shared",
    transactionId: "TRN-67890",
    bookingRef: "REF-FGHIJ",
    paymentMode: "Bank Transfer",
    free: "No",
    chQty: 1,
    adQty: 2,
    chdTopQty: 0,
    adtTopQty: 0,
    adAlcQty: 0,
    vipChQty: 0,
    vipAdQty: 0,
    vipAlcQty: 0,
    rylChQty: 0,
    rylAdQty: 0,
    rylAlcQty: 0,
    basicQty: 3,
    stdQty: 0,
    premQty: 0,
    vipQty: 0,
    hrChtrQty: 0,
    totalCount: 3,
    addonPack: "None",
    totalAmt: 1500,
    rate: 500,
    discount: 10,
    commission: 135,
    netAmt: 1350,
    paid: 0,
    balance: 1350,
    note: "",
    createdBy: "agent_jane",
    modifiedBy: "agent_jane",
    dateOfCreation: "2024-05-18",
    dateOfModification: "2024-05-18",
  },
  // Add more sample data as needed
];

function BookingsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBookings = bookingsData.filter(booking => 
    Object.values(booking).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case 'cancelled':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }

   const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case 'unpaid':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case 'partial':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view all shared bookings</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/shared/bookings/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Booking
            </Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
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
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>By Status</DropdownMenuItem>
                  <DropdownMenuItem>By Date</DropdownMenuItem>
                  <DropdownMenuItem>By Yacht</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>A complete list of all bookings in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">ID</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">Yacht</TableHead>
                  <TableHead className="whitespace-nowrap">Agent</TableHead>
                  <TableHead className="whitespace-nowrap">Client</TableHead>
                  <TableHead className="whitespace-nowrap">Payment/Conf. Status</TableHead>
                  <TableHead className="whitespace-nowrap">Type</TableHead>
                  <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                  <TableHead className="whitespace-nowrap">Booking REF No</TableHead>
                  <TableHead className="whitespace-nowrap">Payment Mode</TableHead>
                  <TableHead className="whitespace-nowrap">Free</TableHead>
                  <TableHead className="whitespace-nowrap">CH Qty</TableHead>
                  <TableHead className="whitespace-nowrap">AD Qty</TableHead>
                  <TableHead className="whitespace-nowrap">CHD TOP Qty</TableHead>
                  <TableHead className="whitespace-nowrap">ADT TOP Qty</TableHead>
                  <TableHead className="whitespace-nowrap">AD ALC Qty</TableHead>
                  <TableHead className="whitespace-nowrap">VIP CH Qty</TableHead>
                  <TableHead className="whitespace-nowrap">VIP AD Qty</TableHead>
                  <TableHead className="whitespace-nowrap">VIP ALC Qty</TableHead>
                  <TableHead className="whitespace-nowrap">RYL CH Qty</TableHead>
                  <TableHead className="whitespace-nowrap">RYL AD Qty</TableHead>
                  <TableHead className="whitespace-nowrap">RYL ALC Qty</TableHead>
                  <TableHead className="whitespace-nowrap">BASIC Qty</TableHead>
                  <TableHead className="whitespace-nowrap">STD Qty</TableHead>
                  <TableHead className="whitespace-nowrap">PREM Qty</TableHead>
                  <TableHead className="whitespace-nowrap">VIP Qty</TableHead>
                  <TableHead className="whitespace-nowrap">HrChtr Qty</TableHead>
                  <TableHead className="whitespace-nowrap">Total Count</TableHead>
                  <TableHead className="whitespace-nowrap">Addon Pack</TableHead>
                  <TableHead className="whitespace-nowrap">Total Amt</TableHead>
                  <TableHead className="whitespace-nowrap">Rate</TableHead>
                  <TableHead className="whitespace-nowrap">Discount %</TableHead>
                  <TableHead className="whitespace-nowrap">Commission</TableHead>
                  <TableHead className="whitespace-nowrap">Net Amt</TableHead>
                  <TableHead className="whitespace-nowrap">Paid</TableHead>
                  <TableHead className="whitespace-nowrap">Balance</TableHead>
                  <TableHead className="whitespace-nowrap">Note</TableHead>
                  <TableHead className="whitespace-nowrap">Created By</TableHead>
                  <TableHead className="whitespace-nowrap">Modified By</TableHead>
                  <TableHead className="whitespace-nowrap">Date of Creation</TableHead>
                  <TableHead className="whitespace-nowrap">Date of Modification</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium whitespace-nowrap">{booking.id}</TableCell>
                    <TableCell className="whitespace-nowrap"><Badge className={getStatusColor(booking.status)}>{booking.status}</Badge></TableCell>
                    <TableCell className="whitespace-nowrap">{booking.date}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.yacht}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.agent}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.client}</TableCell>
                    <TableCell className="whitespace-nowrap"><Badge className={getPaymentStatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Badge></TableCell>
                    <TableCell className="whitespace-nowrap">{booking.type}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.transactionId}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.bookingRef}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.paymentMode}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.free}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.chQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.adQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.chdTopQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.adtTopQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.adAlcQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.vipChQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.vipAdQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.vipAlcQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.rylChQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.rylAdQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.rylAlcQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.basicQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.stdQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.premQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.vipQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.hrChtrQty}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.totalCount}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.addonPack}</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.totalAmt.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.rate.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.discount}%</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.commission.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.netAmt.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.paid.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap">€{booking.balance.toLocaleString()}</TableCell>
                    <TableCell className="whitespace-nowrap max-w-xs truncate">{booking.note}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.createdBy}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.modifiedBy}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.dateOfCreation}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.dateOfModification}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Booking</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Booking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <Layout>
      <BookingsContent />
    </Layout>
  );
}
