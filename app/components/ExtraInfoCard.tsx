import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

type ExtraInfoButton = {
  icon: React.ElementType
  label: string
  action: () => void
  timeAdded: number
}

type ExtraInfoCardProps = {
  buttons: ExtraInfoButton[]
  isCompleted: boolean
  extraInfo: string | null
}

export function ExtraInfoCard({ buttons, isCompleted, extraInfo }: ExtraInfoCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Extra Information</CardTitle>
          <CardDescription>Get additional insights at a time cost</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.action} className="w-full justify-start" disabled={isCompleted}>
              <button.icon className="mr-2 h-4 w-4" />
              {button.label}
              <span className="ml-auto text-xs">+{button.timeAdded}s</span>
            </Button>
          ))}
          {isCompleted && (
            <div className="flex items-center text-green-500 mt-2">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Scenario Completed</span>
            </div>
          )}
        </CardContent>
      </Card>

      {extraInfo && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Extra Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{extraInfo}</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
