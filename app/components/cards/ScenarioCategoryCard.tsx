import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ChevronDown, ChevronRight } from "lucide-react"
import type { ScenarioProps } from "@/app/components/types"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { formatTime } from "@/utils/format"

type CompletedScenario = {
  id: number
  time: number
}

type ScenarioCategoryCardProps = {
  title: string
  description: string
  scenarios: ScenarioProps[]
  completedScenarios: CompletedScenario[]
  onSelectScenario: (scenario: ScenarioProps) => void
  isLocked: boolean
}

export function ScenarioCategoryCard({ title, description, scenarios, completedScenarios, onSelectScenario, isLocked }: ScenarioCategoryCardProps) {
  const [open, setOpen] = useState(false)
  const completedCount = scenarios.filter(s => completedScenarios.find(cs => cs.id === s.id)).length

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="bg-transparent border-2 border-primary w-80 handdrawn">
        <CardHeader className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground w-48">{description}</p>
            <p className="text-sm mt-1 text-primary">Completed: {Math.round((completedCount / scenarios.length) * 100)}%</p>
          </div>
          {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4 flex flex-row flex-wrap justify-center">
            {scenarios.map((scenario) => {
              const completed = completedScenarios.find(s => s.id === scenario.id)
              return (
                <Card key={scenario.id} className="border p-4 mr-3 w-60">
                  <h4 className="font-semibold pb-4">{scenario.title}</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      {completed && (
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          Time: {formatTime(completed.time)}
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
