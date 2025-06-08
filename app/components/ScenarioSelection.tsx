import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import RankBadge from "./cards/RankBadge"
import { ScenarioCategoryCard } from "./cards/ScenarioCategoryCard"
import { ComingSoonScenarioCard } from "./cards/ComingSoonScenarioCard"
import { scenarios } from "@/app/components/scenarios"
import type { ScenarioProps, CompletedScenario } from "@/app/components/types"
import { formatTime } from "@/utils/format"


type Props = {
  onSelectScenario: (scenario: ScenarioProps) => void
  completedScenarios: CompletedScenario[]
}

export default function ScenarioSelection({ onSelectScenario, completedScenarios }: Props) {

  const totalTime = completedScenarios.reduce((acc, cur) => acc + cur.time, 0)

  const groupedScenarios = {
    intro: scenarios.filter(s => s.category === "intro"),
    sweater: scenarios.filter(s => s.category === "sweater"),
    notflix: scenarios.filter(s => s.category === "notflix"),
    hairbnb: [],
  }

  const allIntroCompleted = groupedScenarios.intro.every(introScenario =>
    completedScenarios.some(c => c.id === introScenario.id)
  )  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">🔥 FyreDrill 🔥</h1>
      <div className="flex justify-center mb-6">
        <RankBadge count={completedScenarios.length} totalTime={totalTime} />
      </div>
      <div className="space-y-8 max-w-5xl mx-auto p-4">
        <Card className="handdrawn border-2 border-primary bg-transparent">
          <CardHeader>
            <CardTitle>Introduction challenges</CardTitle>
            <p className="text-muted-foreground text-sm">Let's get used to the format and choose a path from there</p>
          </CardHeader>
          <CardContent className="flex flex-row flex-wrap justify-center gap-4">
            {groupedScenarios.intro.map((scenario, index) => {
              const completed = completedScenarios.find(s => s.id === scenario.id)
              const isLocked = index > 0 && !completedScenarios.find(s => s.id === scenario.id - 1)

              return (
                <Card key={scenario.id} className="border p-4 mr-3 w-60">
                  <h4 className="font-semibold pb-4">{scenario.title}</h4>
                  <div className="flex justify-between">
                    <div>
                      {completed && (
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          Time: {formatTime(completed.time)}
                          <br/>
                          Answers: {completed.submissionCount}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => onSelectScenario(scenario)}
                      disabled={isLocked}
                      variant={completed ? "secondary" : "default"}
                    >
                      {isLocked ? "Locked" : completed ? "Replay" : "Start"}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <ScenarioCategoryCard
              title="Weather sweater"
              description="We sell sweaters to real people, we love direct sales!"
              scenarios={groupedScenarios.sweater}
              completedScenarios={completedScenarios}
              onSelectScenario={onSelectScenario}
              isLocked={!allIntroCompleted}
            />
            
            <ScenarioCategoryCard
              title="Notflix"
              description="Subscription service, people subscribe, we enjoy"
              scenarios={groupedScenarios.notflix}
              completedScenarios={completedScenarios}
              onSelectScenario={onSelectScenario}
              isLocked={!allIntroCompleted}
            />

            <ComingSoonScenarioCard
              title="HairBnB"
              description="Finding homes for all the barbers out there"
            />
        </div>
      </div>
    </div>
  )
}
