import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

type ExtraInfoButton = {
  icon: React.ElementType
  label: string
  action: () => void
  timeAdded: number
  infoText: string
}

type ExtraInfoCardProps = {
  buttons: ExtraInfoButton[]
  isCompleted: boolean
}

export function ExtraInfoCard({ buttons, isCompleted }: ExtraInfoCardProps) {
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([])

  const handleClick = (index: number, action: () => void) => {
    action()
    setClickedIndexes((prev) => [...prev, index])
  }

  return (
    <Card className="w-full border-none shadow-none bg-inherit min-h-[380px]">
      <CardHeader>
        <CardTitle>Extra Information</CardTitle>
        <CardDescription>Get additional insights at a time cost</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Buttons */}
          <div className="w-full lg:w-1/4 space-y-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleClick(index, button.action)}
                className={`w-full justify-start ${
                  clickedIndexes.includes(index) ? "opacity-50 pointer-events-none" : ""
                }`}
                disabled={isCompleted}
              >
                <button.icon className="mr-2 h-4 w-4" />
                {button.label}
                <span className="ml-auto text-xs">+{button.timeAdded}s</span>
              </Button>
            ))}

            {isCompleted && (
              <div className="flex items-center text-green-500 mt-2">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>Scenario Completed</span>
              </div>
            )}
          </div>

          {/* Extra Info Text */}
          <div className="w-full lg:w-3/4 space-y-4">
            {clickedIndexes.map((index) => (
              <div key={index}>
                <h4 className="font-semibold">{buttons[index].label}</h4>
                <p className="text-sm text-gray-700">{buttons[index].infoText}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
