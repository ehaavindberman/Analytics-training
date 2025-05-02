import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ScenarioProps } from "@/app/components/types"

type Props = {
  scenario: ScenarioProps
}

export default function ScenarioDescriptionCard({ scenario }: Props) {
  return (
    <Card className="max-w-2xl w-full border-none shadow-none">
      <CardContent className="mt-4">
        <h1 className="text-3xl font-bold mb-4">{scenario.title}</h1>
        {scenario.introText.map((text, index) => (
          <p key={index} className="mb-4">
            {text}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
