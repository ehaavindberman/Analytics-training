"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Share2, Lock } from "lucide-react"

type CompletedScenario = {
  id: number
  time: number
}

type Props = {
  onSelectScenario: (scenario: number) => void
  completedScenarios: CompletedScenario[]
}

const scenarios = [
  {
    id: 1,
    title: "The Vanishing Signups",
    description: "Uncover the mystery behind the sudden drop in user registrations.",
  },
  {
    id: 2,
    title: "The Social Media Conundrum",
    description: "Investigate the peculiar changes in visitor patterns across channels.",
  },
  {
    id: 3,
    title: "The Organic Traffic Surge",
    description: "Analyze the impact of an unexpected influx of organic visitors.",
  },
]

export default function ScenarioSelection({ onSelectScenario, completedScenarios }: Props) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const handleShare = async (scenarioId: number, time: number) => {
    const scenario = scenarios.find((s) => s.id === scenarioId)
    const shareText = `I completed the "${scenario?.title}" challenge in Analytics Adventure in ${formatTime(time)}! Can you beat my time?`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Analytics Adventure Achievement",
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Sharing is not supported on this browser. You can copy the following text:\n\n" + shareText)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((scenario, index) => {
        const completedScenario = completedScenarios.find((s) => s.id === scenario.id)
        const isLocked = index > 0 && !completedScenarios.find((s) => s.id === scenario.id - 1)

        return (
          <Card
            key={scenario.id}
            className={`overflow-hidden transition-all duration-300 ${isLocked ? "opacity-50" : "hover:shadow-lg"}`}
          >
            <CardHeader className="bg-gradient-to-r from-primary to-accent pb-8">
              <CardTitle className="flex justify-between items-center text-primary-foreground">
                <span>
                  Level {scenario.id}: {scenario.title}
                </span>
                {completedScenario ? (
                  <CheckCircle className="text-accent" />
                ) : isLocked ? (
                  <Lock className="text-muted" />
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <CardDescription className="mb-4">{scenario.description}</CardDescription>
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={() => onSelectScenario(scenario.id)}
                  disabled={isLocked}
                  className={completedScenario ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
                >
                  {isLocked ? "Locked" : completedScenario ? "Replay Challenge" : "Start Challenge"}
                </Button>
                {completedScenario && (
                  <>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      Best Time: {formatTime(completedScenario.time)}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleShare(scenario.id, completedScenario.time)}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Achievement
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

