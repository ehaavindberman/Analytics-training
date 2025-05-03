"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Share2 } from "lucide-react"
import { scenarios } from "@/app/scenarios"
import type { ScenarioProps } from "@/app/components/types"


type CompletedScenario = {
  id: number
  time: number
}

type Props = {
  onSelectScenario: (scenario: ScenarioProps) => void
  completedScenarios: CompletedScenario[]
}

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
      alert("Sharing is not supported on this browser. You can copy the following text:\n\n" + shareText)
    }
  }

  return (
    <div className="flex flex-col items-center divide-y divide-muted gap-y-12 min-h-screen p-4">
      {scenarios.map((scenario, index) => {
        const completedScenario = completedScenarios.find((s) => s.id === scenario.id)
        const isLocked = index > 0 && !completedScenarios.find((s) => s.id === scenario.id - 1)
  
        return (
          <Card
            key={scenario.id}
            className={`w-full max-w-sm min-h-[166px] ${
              isLocked ? "opacity-50" : "hover:shadow-lg"
            }`}
          >
            <CardHeader className="pb-0">
              <CardTitle>
                {scenario.title}
              </CardTitle>
            </CardHeader>
  
            <CardContent className="pt-0">
              <div className="flex justify-between items-end mt-2">
                {/* Left side: stats */}
                {completedScenario ? (
                  <div className="text-m text-muted-foreground flex flex-col space-y-2">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Best Time: {formatTime(completedScenario.time)}
                    </div>
                    <Button variant="outline" onClick={() => handleShare(scenario.id, completedScenario.time)}>
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                ) : ( 
                  // keeping this with invisible so all cards keep the same height (I know it is sketchy...)
                  <div className="invisible text-muted-foreground flex flex-col space-y-2">
                    <div className="flex items-center"><Clock className="mr-1 h-4 w-4" />Best Time:</div>
                    <Button variant="outline" className="text-sm"><Share2 className="mr-1 h-4 w-4" />Share</Button>
                  </div>
                )}
  
                {/* Right side: Start or Replay button */}
                <Button
                  onClick={() => onSelectScenario(scenario)}
                  disabled={isLocked}
                  className={`self-end ${completedScenario ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
                >
                  {isLocked ? "Locked" : completedScenario ? "Replay" : "Start"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
