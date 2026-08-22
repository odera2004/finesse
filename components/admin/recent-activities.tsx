"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, MessageSquare, UserPlus, ShoppingCart, CalendarDays } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "new_appointment",
    description: "Priya Sharma booked a Hair Coloring appointment.",
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 2,
    type: "new_staff",
    description: "Raj Kapoor joined the team as a stylist.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 3,
    type: "new_message",
    description: "Neha Patel sent a message regarding Bridal Makeup.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: 4,
    type: "new_sale",
    description: "Vikram Singh purchased a grooming package.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
]

export default function RecentActivities() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium text-white">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="text-gray-500">
                {activity.type === "new_appointment" && <CalendarDays className="h-5 w-5" />}
                {activity.type === "new_staff" && <UserPlus className="h-5 w-5" />}
                {activity.type === "new_message" && <MessageSquare className="h-5 w-5" />}
                {activity.type === "new_sale" && <ShoppingCart className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm text-gray-400">{activity.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>{formatDistanceToNow(activity.time, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

