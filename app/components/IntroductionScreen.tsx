"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { scenarios } from "@/app/scenarios"

type Props = {
  onStart: () => void
  scenario: number
}

export default function IntroductionScreen({ onStart, scenario }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="bg-gradient-to-r from-primary to-accent">
          <CardTitle className="text-2xl text-primary-foreground">Level {scenario} Briefing</CardTitle>
          <CardDescription className="text-primary-foreground/80">Prepare for your analytics challenge</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          {scenarios[scenario - 1].introText.map((text, index) => (
            <p key={index} className="mb-4">
              {text}
            </p>
          ))}
          <Button onClick={onStart} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            Begin Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

