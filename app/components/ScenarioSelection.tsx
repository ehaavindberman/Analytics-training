"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import RankBadge from "./cards/RankBadge"
import { scenarios } from "@/app/components/scenarios"
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

  const totalTime = completedScenarios.reduce((acc, cur) => acc + cur.time, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">🔥 FyreDrill 🔥</h1>
      <div className="flex flex-col items-center mb-6">
        <RankBadge count={completedScenarios.length} totalTime={totalTime} />
      </div>
      <div className="flex flex-col items-center divide-y divide-muted gap-y-12 min-h-screen p-4">
        {scenarios.map((scenario, index) => {
          const completedScenario = completedScenarios.find((s) => s.id === scenario.id)
          const isLocked = index > 0 && !completedScenarios.find((s) => s.id === scenario.id - 1)

          return (
            <Card
              key={scenario.id}
              className={`w-full max-w-sm ${
                isLocked ? "opacity-50" : "hover:shadow-lg"
              }`}
            >
              <CardHeader className="pb-0 mb-4">
                <CardTitle>
                  {scenario.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex justify-between items-end mt-2">
                  {completedScenario ? (
                    <div className="text-m text-muted-foreground flex flex-col">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Best Time: {formatTime(completedScenario.time)}
                      </div>
                    </div>
                  ) : ( <div></div>
                  )}

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
    </div>
  )
}
