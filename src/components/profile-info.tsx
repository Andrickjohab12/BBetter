"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularProgressIndicator } from "@/components/circular-progress"

type UserData = {
  name: string
  email: string
  password: string
}

export function ProfileInfo() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Stats for the user (would be dynamic in a real app)
  const stats = {
    mentalHealth: 65,
    physicalActivity: 40,
    entertainment: 80,
    academic: 55,
    selfCare: 70,
  }

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    } else {
      // Redirect to register if no user is found
      router.push("/register")
    }
  }, [router])

  const handleLogout = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.removeItem("user")
      setIsLoading(false)
      router.push("/")
    }, 500)
  }

  if (!userData) {
    return <div className="flex justify-center p-8">Loading profile...</div>
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="bg-purple-50 pb-4">
          <CardTitle className="text-xl text-purple-800">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid gap-1">
              <Label className="text-xs text-gray-500">Name</Label>
              <div className="text-lg font-medium">{userData.name}</div>
            </div>

            <div className="grid gap-1">
              <Label className="text-xs text-gray-500">Email</Label>
              <div className="text-lg font-medium">{userData.email}</div>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoading}
              className="mt-2 border-purple-200 text-purple-800 hover:bg-purple-50 hover:text-purple-900"
            >
              {isLoading ? "Logging out..." : "Log out"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="progress">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div className="flex flex-col items-center">
                  <CircularProgressIndicator value={stats.mentalHealth} color="purple" />
                  <span className="mt-2 text-sm font-medium">Mental Health</span>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressIndicator value={stats.physicalActivity} color="blue" />
                  <span className="mt-2 text-sm font-medium">Physical</span>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressIndicator value={stats.entertainment} color="green" />
                  <span className="mt-2 text-sm font-medium">Entertainment</span>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressIndicator value={stats.academic} color="amber" />
                  <span className="mt-2 text-sm font-medium">Academic</span>
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressIndicator value={stats.selfCare} color="pink" />
                  <span className="mt-2 text-sm font-medium">Self Care</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Early Bird", description: "Complete 5 tasks before 10 AM", completed: true },
                  { title: "Mind Master", description: "Complete all mental health tasks for a week", completed: true },
                  { title: "Fitness Fanatic", description: "Complete 20 physical activities", completed: false },
                  { title: "Academic Ace", description: "Complete 15 academic tasks", completed: false },
                  { title: "Self-Care Star", description: "Maintain a self-care routine for 10 days", completed: true },
                  {
                    title: "Balance Guru",
                    description: "Complete tasks in all categories in one day",
                    completed: false,
                  },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 ${
                      achievement.completed ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <h3 className={`font-medium ${achievement.completed ? "text-purple-800" : "text-gray-500"}`}>
                      {achievement.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{achievement.description}</p>
                    <div className="mt-2 text-xs font-medium">
                      {achievement.completed ? (
                        <span className="text-green-600">Completed</span>
                      ) : (
                        <span className="text-gray-500">In progress</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

