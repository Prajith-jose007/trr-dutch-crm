"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement)

const contentData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Private",
      data: [45, 52, 48, 61, 55, 67, 73, 69, 76, 82, 78, 85],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Shared",
      data: [12, 15, 13, 18, 16, 22, 25, 23, 28, 32, 29, 35],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
}

const growthData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Private",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 1,
    },
    {
      label: "Shared",
      data: [8, 15, 5, 8, 4, 6],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      borderColor: "rgb(16, 185, 129)",
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
}

const mobileChartOptions = {
  ...chartOptions,
  plugins: {
    ...chartOptions.plugins,
    legend: {
      ...chartOptions.plugins.legend,
      labels: {
        ...chartOptions.plugins.legend.labels,
        padding: 10,
        font: {
          size: 10,
        },
      },
    },
  },
  scales: {
    ...chartOptions.scales,
    y: {
      ...chartOptions.scales.y,
      ticks: {
        font: {
          size: 9,
        },
        maxTicksLimit: 6,
      },
    },
    x: {
      ...chartOptions.scales.x,
      ticks: {
        font: {
          size: 9,
        },
        maxRotation: 45,
        minRotation: 0,
      },
    },
  },
}

export default function ContentChart() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
      {/* Content Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Performance</CardTitle>
            </div>
            <select className="text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-auto">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80 w-full">
            {isClient && <Line data={contentData} options={isMobile ? mobileChartOptions : chartOptions} />}
          </div>
        </CardContent>
      </Card>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Growth</CardTitle>
              <CardDescription>Booking growth over the last months</CardDescription>
            </div>
            <select className="text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-auto">
              <option>This year</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80 w-full">
            {isClient && <Bar data={growthData} options={isMobile ? mobileChartOptions : chartOptions} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
