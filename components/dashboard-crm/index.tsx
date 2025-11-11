"use client"

import OverviewStats from "./overview-stats"
import SalesChart from "./sales-chart"
import RecentDeals from "./recent-deals"
import TopCustomers from "./top-customers"
import LeadSources from "./lead-sources"
import RecentActivities from "./recent-activities"
import SalesTargets from "./sales-targets"
import TeamPerformance from "./team-performance"
import SystemActivity from "./system-activity"

export default function CRMDashboardContent() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dutch CRM Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your customer relationships, sales pipeline, and business growth
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Add Lead
          </button>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium">
            Import Contacts
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats />

      {/* Sales Chart */}
      <SalesChart />

      {/* Team Performance & System Activity Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <SystemActivity />
        <TeamPerformance />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full min-w-0">
          <RecentDeals />
          <TopCustomers />
          <SalesTargets />
        </div>

        {/* Right Column - 1/3 width on desktop */}
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <LeadSources />
          <RecentActivities />
        </div>
      </div>
    </div>
  )
}
