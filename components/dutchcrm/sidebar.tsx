<<<<<<< HEAD
"use client"

import type React from "react"
import {
  BarChart2,
  Receipt,
  CreditCard,
  Users2,
  Settings,
  HelpCircle,
  ChevronDown,
  Home,
  TrendingUp,
  Database,
  Zap,
  Puzzle,
  Target,
  UserPlus,
  Phone,
  FileText,
  Handshake,
  Activity,
  Users,
  DollarSign,
  User,
  BookMarked,
  Ship,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type MenuState = "full" | "collapsed" | "hidden"

interface SubMenuItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

interface MenuItem {
  id: string
  label: string
  href?: string
  icon: React.ComponentType<any>
  badge?: string
  isNew?: boolean
  children?: SubMenuItem[]
}

interface MenuSection {
  id: string
  label: string
  items: MenuItem[]
}

const menuData: MenuSection[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: Home,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        badge: "3",
      },
    ],
  },
  {
    id: "customer_management",
    label: "Customer Management",
    items: [
      {
        id: "contacts",
        label: "Contacts",
        href: "/contacts",
        icon: Phone,
      },
    ],
  },
  {
    id: "sales_management",
    label: "Sales Management",
    items: [
      {
        id: "private",
        label: "Private",
        icon: User,
        children: [
          {
            id: "leads",
            label: "Leads",
            href: "/leads",
            icon: UserPlus,
            badge: "12",
          },
          {
            id: "customers",
            label: "Customers",
            href: "/customers",
            icon: Users2,
          },
          {
            id: "deals",
            label: "Deals",
            href: "/deals",
            icon: Handshake,
            badge: "8",
          },
          {
            id: "opportunities",
            label: "Opportunities",
            href: "/opportunities",
            icon: Target,
          },
          {
            id: "quotes",
            label: "Quotes",
            href: "/quotes",
            icon: FileText,
            badge: "3",
          },
        ],
      },
      {
        id: "shared",
        label: "Shared",
        icon: Users,
        children: [
          {
            id: "bookings-management",
            label: "Bookings Management",
            href: "/shared/bookings",
            icon: BookMarked,
          },
          {
            id: "yacht-management",
            label: "Yacht Management",
            href: "/shared/yachts",
            icon: Ship,
          },
        ],
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
      },
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
      },
      {
        id: "revenue",
        label: "Revenue",
        href: "/revenue",
        icon: DollarSign,
      },
    ],
  },
  {
    id: "team_communication",
    label: "Team & Communication",
    items: [
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: Users,
      },
      {
        id: "agent",
        label: "Agent",
        href: "/agent",
        icon: User,
      },
      {
        id: "activities",
        label: "Activities",
        href: "/activities",
        icon: Activity,
      },
    ],
  },
  {
    id: "tools_settings",
    label: "Tools & Settings",
    items: [
      {
        id: "integrations",
        label: "Integrations",
        href: "/plugins",
        icon: Puzzle,
      },
      {
        id: "automation",
        label: "Automation",
        href: "/automation",
        icon: Zap,
        isNew: true,
      },
      {
        id: "backup",
        label: "Backup & Export",
        href: "/backup",
        icon: Database,
      },
    ],
  },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>("full")
  const [isHovered, setIsHovered] = useState(false)
  const [previousDesktopState, setPreviousDesktopState] = useState<MenuState>("full")
  const [isMobile, setIsMobile] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Cycle through menu states: full -> collapsed -> hidden -> full
  const toggleMenuState = () => {
    setMenuState((prev) => {
      switch (prev) {
        case "full":
          return "collapsed"
        case "collapsed":
          return "hidden"
        case "hidden":
          return "full"
        default:
          return "full"
      }
    })
  }

  // Function to set menu state from theme customizer
  const setMenuStateFromCustomizer = (state: MenuState) => {
    if (!isMobile) {
      setMenuState(state)
    }
  }

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024 // lg breakpoint
      setIsMobile(!isDesktop)

      if (!isDesktop) {
        // On mobile/tablet, save current desktop state and set to hidden
        if (menuState !== "hidden") {
          setPreviousDesktopState(menuState)
          setMenuState("hidden")
        }
      } else {
        // On desktop, restore previous state if coming from mobile
        if (menuState === "hidden" && previousDesktopState !== "hidden") {
          setMenuState(previousDesktopState)
        }
      }
    }

    // Check on mount
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [menuState, previousDesktopState])

  // Export functions to window for TopNav and ThemeCustomizer to access
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).toggleMenuState = toggleMenuState
      ;(window as any).menuState = menuState
      ;(window as any).isHovered = isHovered
      ;(window as any).isMobile = isMobile
      ;(window as any).setIsMobileMenuOpen = setIsMobileMenuOpen
      ;(window as any).isMobileMenuOpen = isMobileMenuOpen
      ;(window as any).setMenuStateFromCustomizer = setMenuStateFromCustomizer
    }
  }, [menuState, isHovered, isMobile, isMobileMenuOpen])

  function handleNavigation() {
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  function NavItem({
    item,
    level = 0,
    parentId = "",
  }: {
    item: MenuItem | SubMenuItem
    level?: number
    parentId?: string
  }) {
    const itemId = `${parentId}-${item.id}`
    const isExpanded = expandedItems.has(itemId)
    const hasChildren = item.children && item.children.length > 0
    const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)
    const showExpandIcon = hasChildren && showText

    const paddingLeft = level === 0 ? "px-3" : level === 1 ? "pl-8 pr-3" : "pl-12 pr-3"

    const content = (
      <div
        className={cn(
          "flex items-center py-2 text-sm rounded-md transition-colors sidebar-menu-item hover:bg-gray-50 dark:hover:bg-[#1F1F23] relative group cursor-pointer",
          paddingLeft,
        )}
        onClick={(e) => {
          e.stopPropagation()
          if (hasChildren) {
            toggleExpanded(itemId)
          } else if (item.href) {
            window.location.href = item.href
            handleNavigation()
          }
        }}
        title={menuState === "collapsed" && !isHovered && !isMobile ? item.label : undefined}
      >
        <item.icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon" />

        {showText && (
          <>
            <span className="ml-3 flex-1 transition-opacity duration-200 sidebar-menu-text">{item.label}</span>

            {/* Badges and indicators */}
            <div className="flex items-center space-x-1">
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  New
                </span>
              )}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.badge}
                </span>
              )}
              {showExpandIcon && (
                <ChevronDown
                  className={cn("h-3 w-3 transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")}
                />
              )}
            </div>
          </>
        )}

        {/* Tooltip for collapsed state when not hovered and not mobile */}
        {menuState === "collapsed" && !isHovered && !isMobile && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
          </div>
        )}
      </div>
    )

    return (
      <div>
        {item.href && !hasChildren ? (
          <Link href={item.href} onClick={(e) => e.stopPropagation()}>
            {content}
          </Link>
        ) : (
          content
        )}
        {hasChildren && isExpanded && showText && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} parentId={itemId} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Calculate sidebar width - expand when collapsed and hovered, or full width on mobile
  const getSidebarWidth = () => {
    if (isMobile) {
      return "w-64" // Always full width on mobile
    }
    if (menuState === "collapsed" && isHovered) {
      return "w-64" // Expand to full width when hovered
    }
    return menuState === "collapsed" ? "w-16" : "w-64"
  }

  // Show text if menu is full OR if collapsed and hovered OR on mobile
  const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)

  // On mobile, show sidebar as overlay when isMobileMenuOpen is true
  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar overlay */}
        <nav
          className={`
            fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] 
            border-r border-gray-200 dark:border-[#1F1F23] 
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
              <Link href="/" className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">DC</span>
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Dutch CRM</span>
              </Link>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              <div className="space-y-6">
                {menuData.map((section) => (
                  <div key={section.id}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label">
                      {section.label}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <NavItem key={item.id} item={item} parentId={section.id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
              <div className="space-y-1">
                <NavItem item={{ id: "settings", label: "Settings", href: "/settings", icon: Settings }} />
                <NavItem item={{ id: "help", label: "Help", href: "/help", icon: HelpCircle }} />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile overlay backdrop */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[65]" onClick={() => setIsMobileMenuOpen(false)} />
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <nav
      className={`
        fixed inset-y-0 left-0 z-[60] bg-white dark:bg-[#0F0F12] 
        border-r border-gray-200 dark:border-[#1F1F23] transition-all duration-300 ease-in-out
        ${menuState === "hidden" ? "w-0 border-r-0" : getSidebarWidth()}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        overflow: menuState === "hidden" ? "hidden" : "visible",
      }}
    >
      {menuState !== "hidden" && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            {showText ? (
              <Link href="/" className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">DC</span>
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white transition-opacity duration-200">
                  Dutch CRM
                </span>
              </Link>
            ) : (
              <div className="flex justify-center w-full">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">DC</span>
                </div>
              </div>
            )}
          </div>

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <div className="space-y-6">
              {menuData.map((section) => (
                <div key={section.id}>
                  {showText && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label transition-opacity duration-200">
                      {section.label}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem key={item.id} item={item} parentId={section.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem item={{ id: "settings", label: "Settings", href: "/settings", icon: Settings }} />
              <NavItem item={{ id: "help", label: "Help", href: "/help", icon: HelpCircle }} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
=======

"use client"

import type React from "react"
import {
  BarChart2,
  Receipt,
  CreditCard,
  Users2,
  Settings,
  HelpCircle,
  ChevronDown,
  Home,
  TrendingUp,
  Database,
  Zap,
  Puzzle,
  Target,
  UserPlus,
  Phone,
  FileText,
  Handshake,
  Activity,
  Users,
  DollarSign,
  User,
  BookMarked,
  Ship,
  Palette
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAuth, UserRole } from "@/app/context/auth-context"
import Image from "next/image"
import { PERMISSIONS, rolePermissions } from "@/app/config/roles";

type MenuState = "full" | "collapsed" | "hidden"

interface SubMenuItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string
  isNew?: boolean;
  children?: SubMenuItem[];
  permission?: typeof PERMISSIONS[keyof typeof PERMISSIONS];
}

interface MenuItem {
  id: string
  label: string
  href?: string
  icon: React.ComponentType<any>
  badge?: string
  isNew?: boolean;
  children?: SubMenuItem[];
  permission?: typeof PERMISSIONS[keyof typeof PERMISSIONS];
}

interface MenuSection {
  id: string
  label: string;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: Home,
        permission: PERMISSIONS.VIEW_DASHBOARD,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        badge: "3",
        permission: PERMISSIONS.VIEW_ANALYTICS,
      },
    ],
  },
  {
    id: "customer_management",
    label: "Customer Management",
    items: [
      {
        id: "contacts",
        label: "Contacts",
        href: "/contacts",
        icon: Phone,
        permission: PERMISSIONS.VIEW_CONTACTS,
      },
    ],
  },
  {
    id: "sales_management",
    label: "Sales Management",
    items: [
      {
        id: "private",
        label: "Private",
        icon: User,
        children: [
          {
            id: "leads",
            label: "Leads",
            href: "/leads",
            icon: UserPlus,
            badge: "12",
            permission: PERMISSIONS.VIEW_LEADS,
          },
          {
            id: "customers",
            label: "Customers",
            href: "/customers",
            icon: Users2,
            permission: PERMISSIONS.VIEW_CUSTOMERS,
          },
          {
            id: "deals",
            label: "Deals",
            href: "/deals",
            icon: Handshake,
            badge: "8",
            permission: PERMISSIONS.VIEW_DEALS,
          },
          {
            id: "opportunities",
            label: "Opportunities",
            href: "/opportunities",
            icon: Target,
            permission: PERMISSIONS.VIEW_OPPORTUNITIES,
          },
          {
            id: "quotes",
            label: "Quotes",
            href: "/quotes",
            icon: FileText,
            badge: "3",
            permission: PERMISSIONS.VIEW_QUOTES,
          },
        ],
      },
      {
        id: "shared",
        label: "Shared",
        icon: Users,
        children: [
          {
            id: "bookings-management",
            label: "Bookings Management",
            href: "/shared/bookings",
            icon: BookMarked,
            permission: PERMISSIONS.MANAGE_SHARED_BOOKINGS,
          },
          {
            id: "yacht-management",
            label: "Yacht Management",
            href: "/shared/yachts",
            icon: Ship,
            permission: PERMISSIONS.MANAGE_SHARED_YACHTS,
          },
        ],
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
        permission: PERMISSIONS.MANAGE_INVOICES,
      },
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
        permission: PERMISSIONS.MANAGE_PAYMENTS,
      },
      {
        id: "revenue",
        label: "Revenue",
        href: "/revenue",
        icon: DollarSign,
        permission: PERMISSIONS.VIEW_REVENUE,
      },
    ],
  },
  {
    id: "team_communication",
    label: "Team & Communication",
    items: [
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: Users,
        permission: PERMISSIONS.MANAGE_TEAM,
      },
      {
        id: "agent",
        label: "Agent",
        href: "/agent",
        icon: User,
        permission: PERMISSIONS.MANAGE_AGENTS,
      },
      {
        id: "user_management",
        label: "User Management",
        href: "/users",
        icon: Users,
        permission: PERMISSIONS.MANAGE_USERS,
      },
      {
        id: "activities",
        label: "Activities",
        href: "/activities",
        icon: Activity,
        permission: PERMISSIONS.VIEW_ACTIVITIES,
      },
    ],
  },
  {
    id: "tools_settings",
    label: "Tools & Settings",
    items: [
      {
        id: "integrations",
        label: "Integrations",
        href: "/plugins",
        icon: Puzzle,
        permission: PERMISSIONS.MANAGE_PLUGINS,
      },
      {
        id: "automation",
        label: "Automation",
        href: "/automation",
        icon: Zap,
        isNew: true,
        permission: PERMISSIONS.MANAGE_AUTOMATION,
      },
      {
        id: "backup",
        label: "Backup & Export",
        href: "/backup",
        icon: Database,
        permission: PERMISSIONS.MANAGE_BACKUP,
      },
    ],
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>("full")
  const [isHovered, setIsHovered] = useState(false)
  const [previousDesktopState, setPreviousDesktopState] = useState<MenuState>("full")
  const [isMobile, setIsMobile] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [userPermissions, setUserPermissions] = useState<ReadonlyArray<string>>([]);

  useEffect(() => {
    if (user?.role) {
      setUserPermissions(rolePermissions[user.role] || []);
    }
  }, [user]);

  // Cycle through menu states: full -> collapsed -> hidden -> full
  const toggleMenuState = () => {
    setMenuState((prev) => {
      switch (prev) {
        case "full":
          return "collapsed"
        case "collapsed":
          return "hidden"
        case "hidden":
          return "full"
        default:
          return "full"
      }
    })
  }

  // Function to set menu state from theme customizer
  const setMenuStateFromCustomizer = (state: MenuState) => {
    if (!isMobile) {
      setMenuState(state)
    }
  }

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024 // lg breakpoint
      setIsMobile(!isDesktop)

      if (!isDesktop) {
        // On mobile/tablet, save current desktop state and set to hidden
        if (menuState !== "hidden") {
          setPreviousDesktopState(menuState)
          setMenuState("hidden")
        }
      } else {
        // On desktop, restore previous state if coming from mobile
        if (menuState === "hidden" && previousDesktopState !== "hidden") {
          setMenuState(previousDesktopState)
        }
      }
    }

    // Check on mount
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [menuState, previousDesktopState])

  // Export functions to window for TopNav and ThemeCustomizer to access
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).toggleMenuState = toggleMenuState
      ;(window as any).menuState = menuState
      ;(window as any).isHovered = isHovered
      ;(window as any).isMobile = isMobile
      ;(window as any).setIsMobileMenuOpen = setIsMobileMenuOpen
      ;(window as any).isMobileMenuOpen = isMobileMenuOpen
      ;(window as any).setMenuStateFromCustomizer = setMenuStateFromCustomizer
    }
  }, [menuState, isHovered, isMobile, isMobileMenuOpen])

  function handleNavigation() {
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const hasAccess = (permission?: string) => {
      if (!permission) return true; // Items without a permission are public
      if (!user) return false;
      return userPermissions.includes(permission);
  }


  function NavItem({
    item,
    level = 0,
    parentId = "",
  }: {
    item: MenuItem | SubMenuItem
    level?: number
    parentId?: string
  }) {
    if (!hasAccess(item.permission)) return null;

    const itemId = `${parentId}-${item.id}`
    const isExpanded = expandedItems.has(itemId)

    const filteredChildren = item.children?.filter(child => hasAccess(child.permission));
    const hasChildren = filteredChildren && filteredChildren.length > 0;
    
    const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)
    const showExpandIcon = hasChildren && showText

    const paddingLeft = level === 0 ? "px-3" : level === 1 ? "pl-8 pr-3" : "pl-12 pr-3"

    const content = (
      <div
        className={cn(
          "flex items-center py-2 text-sm rounded-md transition-colors sidebar-menu-item hover:bg-gray-50 dark:hover:bg-[#1F1F23] relative group cursor-pointer",
          paddingLeft,
        )}
        onClick={(e) => {
          e.stopPropagation()
          if (hasChildren) {
            toggleExpanded(itemId)
          } else if (item.href) {
            handleNavigation()
          }
        }}
        title={menuState === "collapsed" && !isHovered && !isMobile ? item.label : undefined}
      >
        <item.icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon" />

        {showText && (
          <>
            <span className="ml-3 flex-1 transition-opacity duration-200 sidebar-menu-text">{item.label}</span>

            {/* Badges and indicators */}
            <div className="flex items-center space-x-1">
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  New
                </span>
              )}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.badge}
                </span>
              )}
              {showExpandIcon && (
                <ChevronDown
                  className={cn("h-3 w-3 transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")}
                />
              )}
            </div>
          </>
        )}

        {/* Tooltip for collapsed state when not hovered and not mobile */}
        {menuState === "collapsed" && !isHovered && !isMobile && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {item.badge && <span className="ml-1 text-blue-300">({item.badge})</span>}
          </div>
        )}
      </div>
    )

    return (
      <div>
        {item.href && !hasChildren ? (
          <Link href={item.href} onClick={(e) => e.stopPropagation()}>
            {content}
          </Link>
        ) : (
          content
        )}
        {hasChildren && isExpanded && showText && (
          <div className="mt-1 space-y-1">
            {filteredChildren!.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} parentId={itemId} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Calculate sidebar width - expand when collapsed and hovered, or full width on mobile
  const getSidebarWidth = () => {
    if (isMobile) {
      return "w-64" // Always full width on mobile
    }
    if (menuState === "collapsed" && isHovered) {
      return "w-64" // Expand to full width when hovered
    }
    return menuState === "collapsed" ? "w-16" : "w-64"
  }

  // Show text if menu is full OR if collapsed and hovered OR on mobile
  const showText = menuState === "full" || (menuState === "collapsed" && isHovered) || (isMobile && isMobileMenuOpen)

  const filteredMenuData = menuData.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (item.children) {
        return item.children.some(child => hasAccess(child.permission));
      }
      return hasAccess(item.permission);
    })
  })).filter(section => section.items.length > 0);

  // On mobile, show sidebar as overlay when isMobileMenuOpen is true
  if (isMobile) {
    return (
      <>
        {/* Mobile sidebar overlay */}
        <nav
          className={`
            fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] 
            border-r border-gray-200 dark:border-[#1F1F23] 
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
              <Link href="/" className="flex items-center gap-3 w-full">
                <Image src="/logo.svg" alt="Dutch CRM Logo" width={32} height={32} />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Dutch CRM</span>
              </Link>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              <div className="space-y-6">
                {filteredMenuData.map((section) => (
                  <div key={section.id}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label">
                      {section.label}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <NavItem key={item.id} item={item} parentId={section.id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
              <div className="space-y-1">
                {hasAccess(PERMISSIONS.CUSTOMIZE_THEME) && <NavItem item={{ id: "theme-customizer", label: "Theme Customizer", href: "#", icon: Palette, permission: PERMISSIONS.CUSTOMIZE_THEME }} />}
                <NavItem item={{ id: "settings", label: "Settings", href: "/settings", icon: Settings, permission: PERMISSIONS.MANAGE_SETTINGS }} />
                <NavItem item={{ id: "help", label: "Help", href: "/help", icon: HelpCircle, permission: PERMISSIONS.VIEW_HELP }} />
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile overlay backdrop */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[65]" onClick={() => setIsMobileMenuOpen(false)} />
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <nav
      className={`
        fixed inset-y-0 left-0 z-[60] bg-white dark:bg-[#0F0F12] 
        border-r border-gray-200 dark:border-[#1F1F23] transition-all duration-300 ease-in-out
        ${menuState === "hidden" ? "w-0 border-r-0" : getSidebarWidth()}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        overflow: menuState === "hidden" ? "hidden" : "visible",
      }}
    >
      {menuState !== "hidden" && (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            {showText ? (
              <Link href="/" className="flex items-center gap-3 w-full">
                <Image src="/logo.svg" alt="Dutch CRM Logo" width={32} height={32} />
                <span className="text-lg font-semibold text-gray-900 dark:text-white transition-opacity duration-200">
                  Dutch CRM
                </span>
              </Link>
            ) : (
              <div className="flex justify-center w-full">
                <Image src="/logo.svg" alt="Dutch CRM Logo" width={32} height={32} />
              </div>
            )}
          </div>

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <div className="space-y-6">
              {filteredMenuData.map((section) => (
                <div key={section.id}>
                  {showText && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label transition-opacity duration-200">
                      {section.label}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem key={item.id} item={item} parentId={section.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              {hasAccess(PERMISSIONS.CUSTOMIZE_THEME) && <NavItem item={{ id: "theme-customizer", label: "Theme Customizer", href: "#", icon: Palette, permission: PERMISSIONS.CUSTOMIZE_THEME }} />}
              <NavItem item={{ id: "settings", label: "Settings", href: "/settings", icon: Settings, permission: PERMISSIONS.MANAGE_SETTINGS }} />
              <NavItem item={{ id: "help", label: "Help", href: "/help", icon: HelpCircle, permission: PERMISSIONS.VIEW_HELP }} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
>>>>>>> refs/remotes/origin/main
