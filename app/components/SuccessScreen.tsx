"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ScenarioProps } from "@/app/components/types"

type Props = {
  onContinue: () => void
  scenario: ScenarioProps
}

export default function SuccessScreen({ onContinue, scenario }: Props) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Congratulations! You've Solved Scenario {scenario.id}</CardTitle>
      </CardHeader>
      <CardContent>
        {scenario.successText.map((text, index) => (
          <p key={index}>
            {text}
          </p>
        ))}
        <Button className="mt-7" onClick={onContinue}>
            {scenario.id === 3 ? "Finish training" : "Continue to next scenario"}
        </Button>
      </CardContent>
    </Card>
  )
}

