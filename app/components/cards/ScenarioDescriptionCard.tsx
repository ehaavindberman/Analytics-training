import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ScenarioProps } from "@/app/components/types"

type Props = {
  scenario: ScenarioProps
}

export default function ScenarioDescriptionCard({ scenario }: Props) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardContent className="mt-4">
        <h1 className="font-bold mb-4">{scenario.title}</h1>
        {scenario.introText.map((text, index) => (
          <p key={index}>
            {text}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
