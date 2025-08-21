"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  BarChart2,
  Users2,
  Building2,
  Receipt,
  CreditCard,
  FileText,
  Video,
  Layers,
  Database,
  ChevronDown,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  Clock,
  Check,
  Star,
  Filter,
  UserPlus,
  UserX,
  MessageSquare,
  Globe,
  Mail,
  Calendar,
  Zap,
  Download,
  Upload,
  Phone,
  Award,
  Users,
  UserCheck,
  Handshake,
  ScalingIcon as Growth,
  InfoIcon as Analytics,
} from "lucide-react"

interface MenuSection {
  id: string
  label: string
  items: MenuItem[]
}

interface MenuItem {
  id: string
  label: string
  href: string
  icon: any
  badge?: string
  isNew?: boolean
  children?: MenuItem[]
}

const Sidebar = () => {
  const pathname = usePathname()
  const [showText, setShowText] = useState(true)

  const menuData: MenuSection[] = [
    {
      id: "overview",
      label: "Dashboard",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/dashboard-crm",
          icon: Home,
          badge: "3",
          children: [
            {
              id: "analytics",
              label: "Analytics",
              href: "/dashboard/analytics",
              icon: BarChart2,
            },
            {
              id: "reports",
              label: "Reports",
              href: "/dashboard/reports",
              icon: FileText,
              children: [
                {
                  id: "sales-reports",
                  label: "Sales Reports",
                  href: "/dashboard/reports/sales",
                  icon: TrendingUp,
                },
                {
                  id: "customer-reports",
                  label: "Customer Reports",
                  href: "/dashboard/reports/customers",
                  icon: Users2,
                },
                {
                  id: "revenue-reports",
                  label: "Revenue Reports",
                  href: "/dashboard/reports/revenue",
                  icon: DollarSign,
                },
              ],
            },
            {
              id: "real-time",
              label: "Real-time",
              href: "/dashboard/realtime",
              icon: Activity,
              isNew: true,
            },
          ],
        },
        {
          id: "analytics",
          label: "Analytics",
          href: "/analytics",
          icon: BarChart2,
          children: [
            {
              id: "overview",
              label: "Overview",
              href: "/analytics/overview",
              icon: PieChart,
            },
            {
              id: "performance",
              label: "Performance",
              href: "/analytics/performance",
              icon: TrendingUp,
            },
            {
              id: "forecasting",
              label: "Forecasting",
              href: "/analytics/forecasting",
              icon: Target,
            },
          ],
        },
      ],
    },
    {
      id: "customers",
      label: "Customer Management",
      items: [
        {
          id: "customers",
          label: "Customers",
          href: "/customers",
          icon: Users2,
          children: [
            {
              id: "all-customers",
              label: "All Customers",
              href: "/customers/all",
              icon: Users2,
            },
            {
              id: "segments",
              label: "Segments",
              href: "/customers/segments",
              icon: Filter,
              children: [
                {
                  id: "vip",
                  label: "VIP Customers",
                  href: "/customers/segments/vip",
                  icon: Star,
                },
                {
                  id: "new",
                  label: "New Customers",
                  href: "/customers/segments/new",
                  icon: UserPlus,
                },
                {
                  id: "inactive",
                  label: "Inactive",
                  href: "/customers/segments/inactive",
                  icon: UserX,
                },
              ],
            },
            {
              id: "interactions",
              label: "Interactions",
              href: "/customers/interactions",
              icon: MessageSquare,
            },
          ],
        },
        {
          id: "leads",
          label: "Leads",
          href: "/leads",
          icon: Target,
          badge: "12",
          children: [
            {
              id: "all-leads",
              label: "All Leads",
              href: "/leads/all",
              icon: Target,
            },
            {
              id: "qualified",
              label: "Qualified",
              href: "/leads/qualified",
              icon: UserCheck,
            },
            {
              id: "sources",
              label: "Lead Sources",
              href: "/leads/sources",
              icon: Globe,
            },
          ],
        },
        {
          id: "contacts",
          label: "Contacts",
          href: "/contacts",
          icon: Phone,
          children: [
            {
              id: "all-contacts",
              label: "All Contacts",
              href: "/contacts/all",
              icon: Phone,
            },
            {
              id: "companies",
              label: "Companies",
              href: "/contacts/companies",
              icon: Building2,
            },
            {
              id: "import",
              label: "Import Contacts",
              href: "/contacts/import",
              icon: Upload,
            },
          ],
        },
      ],
    },
    {
      id: "sales",
      label: "Sales Management",
      items: [
        {
          id: "deals",
          label: "Deals",
          href: "/deals",
          icon: Handshake,
          badge: "8",
          children: [
            {
              id: "pipeline",
              label: "Sales Pipeline",
              href: "/deals/pipeline",
              icon: TrendingUp,
            },
            {
              id: "won",
              label: "Won Deals",
              href: "/deals/won",
              icon: Award,
            },
            {
              id: "lost",
              label: "Lost Deals",
              href: "/deals/lost",
              icon: TrendingDown,
            },
          ],
        },
        {
          id: "opportunities",
          label: "Opportunities",
          href: "/opportunities",
          icon: Growth,
          children: [
            {
              id: "active",
              label: "Active",
              href: "/opportunities/active",
              icon: Activity,
            },
            {
              id: "forecasting",
              label: "Forecasting",
              href: "/opportunities/forecasting",
              icon: Analytics,
            },
          ],
        },
        {
          id: "quotes",
          label: "Quotes",
          href: "/quotes",
          icon: Receipt,
          badge: "3",
        },
      ],
    },
    {
      id: "finance",
      label: "Finance",
      items: [
        {
          id: "invoices",
          label: "Invoices",
          href: "/invoices",
          icon: Receipt,
          badge: "2",
          children: [
            {
              id: "all-invoices",
              label: "All Invoices",
              href: "/invoices/all",
              icon: Receipt,
            },
            {
              id: "pending",
              label: "Pending",
              href: "/invoices/pending",
              icon: Clock,
            },
            {
              id: "paid",
              label: "Paid",
              href: "/invoices/paid",
              icon: Check,
            },
          ],
        },
        {
          id: "payments",
          label: "Payments",
          href: "/payments",
          icon: CreditCard,
          children: [
            {
              id: "payment-methods",
              label: "Payment Methods",
              href: "/payments/methods",
              icon: CreditCard,
            },
            {
              id: "payment-history",
              label: "Payment History",
              href: "/payments/history",
              icon: Clock,
            },
          ],
        },
        {
          id: "revenue",
          label: "Revenue",
          href: "/revenue",
          icon: DollarSign,
          children: [
            {
              id: "tracking",
              label: "Revenue Tracking",
              href: "/revenue/tracking",
              icon: TrendingUp,
            },
            {
              id: "forecasting",
              label: "Forecasting",
              href: "/revenue/forecasting",
              icon: Target,
            },
          ],
        },
      ],
    },
    {
      id: "team",
      label: "Team & Communication",
      items: [
        {
          id: "team",
          label: "Team",
          href: "/team",
          icon: Users,
          children: [
            {
              id: "members",
              label: "Team Members",
              href: "/team/members",
              icon: Users,
            },
            {
              id: "performance",
              label: "Performance",
              href: "/team/performance",
              icon: Award,
            },
            {
              id: "targets",
              label: "Sales Targets",
              href: "/team/targets",
              icon: Target,
            },
          ],
        },
        {
          id: "activities",
          label: "Activities",
          href: "/activities",
          icon: Activity,
          children: [
            {
              id: "tasks",
              label: "Tasks",
              href: "/activities/tasks",
              icon: Check,
            },
            {
              id: "meetings",
              label: "Meetings",
              href: "/activities/meetings",
              icon: Video,
            },
            {
              id: "calls",
              label: "Calls",
              href: "/activities/calls",
              icon: Phone,
            },
          ],
        },
      ],
    },
    {
      id: "tools",
      label: "Tools & Settings",
      items: [
        {
          id: "integrations",
          label: "Integrations",
          href: "/integrations",
          icon: Layers,
          children: [
            {
              id: "email",
              label: "Email Integration",
              href: "/integrations/email",
              icon: Mail,
            },
            {
              id: "calendar",
              label: "Calendar",
              href: "/integrations/calendar",
              icon: Calendar,
            },
            {
              id: "third-party",
              label: "Third Party",
              href: "/integrations/third-party",
              icon: Globe,
            },
          ],
        },
        {
          id: "automation",
          label: "Automation",
          href: "/automation",
          icon: Zap,
          isNew: true,
          children: [
            {
              id: "workflows",
              label: "Workflows",
              href: "/automation/workflows",
              icon: Zap,
            },
            {
              id: "triggers",
              label: "Triggers",
              href: "/automation/triggers",
              icon: Activity,
            },
          ],
        },
        {
          id: "backup",
          label: "Backup & Export",
          href: "/backup",
          icon: Database,
          children: [
            {
              id: "backup",
              label: "Create Backup",
              href: "/backup/create",
              icon: Download,
            },
            {
              id: "export",
              label: "Export Data",
              href: "/backup/export",
              icon: Upload,
            },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    // Logic to determine if text should be shown based on pathname or other conditions
    setShowText(pathname !== "/some-collapsed-path")
  }, [pathname])

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1F1F23]">
      {/* Header */}
      <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-3 w-full">
          {/* Updated logo and branding for Dutch CRM */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">DC</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Dutch CRM</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col flex-1">
        {menuData.map((section) => (
          <div key={section.id} className="px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{section.label}</span>
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="mt-2 space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1F1F23]",
                    pathname === item.href && "bg-gray-100 dark:bg-[#1F1F23]",
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.isNew && (
                    <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Collapsed Header */}
      <div className="h-16 px-3 flex items-center justify-center border-t border-gray-200 dark:border-[#1F1F23]">
        {showText ? (
          <div className="flex items-center gap-3 w-full">
            {/* Updated logo and branding for Dutch CRM */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white transition-opacity duration-200">
              Dutch CRM
            </span>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            {/* Updated collapsed logo for Dutch CRM */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
