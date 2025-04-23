import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { scenarios } from "@/app/scenarios"

type Props = {
  scenario: number
}

export default function ScenarioDescriptionCard({ scenario }: Props) {
  return (
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
      </CardContent>
    </Card>
  )
}
