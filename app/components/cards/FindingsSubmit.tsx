import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type FindingsFormProps = {
  findings: string
  onChange: (value: string) => void
  onSubmit: () => void
  feedback: string
  isCompleted: boolean
}

export function FindingsSubmit({ findings, onChange, onSubmit, feedback, isCompleted }: FindingsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Findings</CardTitle>
        <CardDescription>Describe what you think is happening with the data</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your findings here..."
          value={findings}
          onChange={(e) => onChange(e.target.value)}
          className="mb-4"
        />
        <Button onClick={onSubmit} disabled={isCompleted}>
          Submit Findings
        </Button>
        {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
      </CardContent>
    </Card>
  )
}
