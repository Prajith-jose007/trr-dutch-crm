"use client"

import OverviewStats from "./overview-stats"
import ContentChart from "./content-chart"
import RecentPosts from "./recent-posts"
import PopularArticles from "./popular-articles"
import ContentCategories from "./content-categories"
import RecentComments from "./recent-comments"
import PublishingSchedule from "./publishing-schedule"
import UserActivity from "./user-activity"
import SystemHistory from "./system-history"
import { Button } from "@/components/ui/button"

export default function CMSDashboardContent() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dutch CRM Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Welcome to your main dashboard for managing the CRM.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>New Lead</Button>
          <Button variant="outline">Add New Bookings</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats />

      {/* Content Chart - moved here */}
      <ContentChart />

      {/* User Activity & System History Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <SystemHistory />
        <UserActivity />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full min-w-0">
          <RecentPosts />
          <PopularArticles />
          <PublishingSchedule />
        </div>

        {/* Right Column - 1/3 width on desktop */}
        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <ContentCategories />
          <RecentComments />
        </div>
      </div>
    </div>
  )
}