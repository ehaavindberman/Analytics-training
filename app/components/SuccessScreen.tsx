"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { scenarios } from "@/app/scenarios"

type Props = {
  onContinue: () => void
  scenario: number
}

export default function SuccessScreen({ onContinue, scenario }: Props) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Congratulations! You've Solved Scenario {scenario}</CardTitle>
        <CardDescription>Great job on your analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {scenarios[scenario - 1].successText.map((text, index) => (
          <p key={index} className="mb-4">
            {text}
          </p>
        ))}
        <Button onClick={onContinue}>{scenario === 3 ? "Finish Training" : "Continue to Next Scenario"}</Button>
      </CardContent>
    </Card>
  )
}

