"use client"

import type React from "react"

import { useState } from "react"
import { Brain, Dumbbell, Gamepad2, GraduationCap, Coffee, Plus, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/toast-notification"
import { Confetti } from "@/components/confetti-animation"

// Default activities for each section
const defaultActivities = {
  mentalHealth: [
    { id: "m1", title: "Meditate for 10 minutes", completed: false },
    { id: "m2", title: "Journal your thoughts", completed: false },
    { id: "m3", title: "Practice deep breathing", completed: false },
  ],
  physicalActivity: [
    { id: "p1", title: "30 minute walk", completed: false },
    { id: "p2", title: "10 push-ups", completed: false },
    { id: "p3", title: "Stretch for 5 minutes", completed: false },
  ],
  entertainment: [
    { id: "e1", title: "Read a book chapter", completed: false },
    { id: "e2", title: "Watch an episode of your favorite show", completed: false },
    { id: "e3", title: "Listen to music", completed: false },
  ],
  academic: [
    { id: "a1", title: "Study for 25 minutes", completed: false },
    { id: "a2", title: "Review notes", completed: false },
    { id: "a3", title: "Watch an educational video", completed: false },
  ],
  selfCare: [
    { id: "s1", title: "Drink 8 glasses of water", completed: false },
    { id: "s2", title: "Get 8 hours of sleep", completed: false },
    { id: "s3", title: "Take a relaxing bath", completed: false },
  ],
}

type Activity = {
  id: string
  title: string
  completed: boolean
}

type Section = {
  id: string
  title: string
  icon: React.ReactNode
  activities: Activity[]
}

export function ActivitySections() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "mentalHealth",
      title: "Mental Health",
      icon: <Brain className="h-5 w-5" />,
      activities: defaultActivities.mentalHealth,
    },
    {
      id: "physicalActivity",
      title: "Physical Activity",
      icon: <Dumbbell className="h-5 w-5" />,
      activities: defaultActivities.physicalActivity,
    },
    {
      id: "entertainment",
      title: "Entertainment",
      icon: <Gamepad2 className="h-5 w-5" />,
      activities: defaultActivities.entertainment,
    },
    {
      id: "academic",
      title: "Academic",
      icon: <GraduationCap className="h-5 w-5" />,
      activities: defaultActivities.academic,
    },
    {
      id: "selfCare",
      title: "Self Care",
      icon: <Coffee className="h-5 w-5" />,
      activities: defaultActivities.selfCare,
    },
  ])

  const [newActivity, setNewActivity] = useState("")
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { showToast } = useToast()

  const toggleActivity = (sectionId: string, activityId: string) => {
    let allCompleted = false
    let totalActivities = 0
    let completedActivities = 0

    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedActivities = section.activities.map((activity) => {
            if (activity.id === activityId) {
              // Toggle the activity
              return { ...activity, completed: !activity.completed }
            }
            return activity
          })

          return {
            ...section,
            activities: updatedActivities,
          }
        }
        return section
      })

      // Count total and completed activities
      updatedSections.forEach((section) => {
        section.activities.forEach((activity) => {
          totalActivities++
          if (activity.completed) completedActivities++
        })
      })

      // Check if all activities are completed
      allCompleted = totalActivities > 0 && completedActivities === totalActivities

      return updatedSections
    })

    // Find the activity that was toggled
    const section = sections.find((s) => s.id === sectionId)
    const activity = section?.activities.find((a) => a.id === activityId)

    if (activity) {
      // If the activity is being completed (not uncompleted)
      if (!activity.completed) {
        showToast(`Great job! You completed "${activity.title}"`, "success")

        // Check if this completion makes all activities complete
        setTimeout(() => {
          const allActivitiesCompleted = sections.every((section) =>
            section.activities.every((activity) => activity.completed),
          )

          if (allActivitiesCompleted) {
            setShowConfetti(true)
            showToast("Amazing! You've completed all tasks for today!", "success", 5000)
          }
        }, 100)
      }
    }
  }

  const addActivity = (sectionId: string) => {
    if (!newActivity.trim()) return

    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            activities: [
              ...section.activities,
              {
                id: `${sectionId}-${Date.now()}`,
                title: newActivity,
                completed: false,
              },
            ],
          }
        }
        return section
      }),
    )

    setNewActivity("")
    setActiveSection(null)
  }

  const calculateProgress = (activities: Activity[]) => {
    if (activities.length === 0) return 0
    const completed = activities.filter((a) => a.completed).length
    return (completed / activities.length) * 100
  }

  return (
    <>
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="bg-purple-50 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="rounded-full bg-purple-100 p-1.5 text-purple-800">{section.icon}</div>
                {section.title}
              </CardTitle>
              <Progress value={calculateProgress(section.activities)} className="h-2 bg-purple-100" />
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {section.activities.map((activity) => (
                  <li key={activity.id} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActivity(section.id, activity.id)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        activity.completed ? "border-purple-800 bg-purple-800 text-white" : "border-gray-300"
                      }`}
                    >
                      {activity.completed && <Check className="h-3 w-3" />}
                    </button>
                    <span className={`text-sm ${activity.completed ? "text-gray-400 line-through" : ""}`}>
                      {activity.title}
                    </span>
                  </li>
                ))}
              </ul>

              {activeSection === section.id ? (
                <div className="mt-4 flex gap-2">
                  <Input
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Add new activity..."
                    className="h-8 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addActivity(section.id)
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => addActivity(section.id)}
                    className="h-8 bg-purple-800 hover:bg-purple-900"
                  >
                    Add
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full justify-start text-purple-800 hover:bg-purple-50 hover:text-purple-900"
                  onClick={() => setActiveSection(section.id)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add activity
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

