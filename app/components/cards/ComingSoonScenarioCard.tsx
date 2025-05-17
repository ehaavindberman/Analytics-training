import { Card, CardHeader, CardTitle } from "@/components/ui/card"

type ComingSoonScenarioCardProps = {
  title: string
  description: string
}

export function ComingSoonScenarioCard({ title, description }: ComingSoonScenarioCardProps) {

  return (
    <Card className="handdrawn opacity-60 border-2 border-primary bg-transparent w-80 self-start">
        <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-muted-foreground text-sm">{description}<br />COMING SOON!</p>
        </div>
        </CardHeader>
    </Card>
  )
}
