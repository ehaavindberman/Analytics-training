import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { scenarios } from "@/app/scenarios"

type Props = {
  scenario: number
}

export default function ScenarioDescriptionCard({ scenario }: Props) {
  return (
    <Card className="max-w-2xl w-full">
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
