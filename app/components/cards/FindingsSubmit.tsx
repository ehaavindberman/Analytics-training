import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

type FindingsFormProps = {
  findings: string
  onChange: (value: string) => void
  onSubmit: () => void
  submissionCount: number
  isCompleted: boolean
}

const negativeFeedback = [
  "Not quite. Try again.",
  "That's not it, but I believe in you.",
  "Give it another try. You can do it!",
]

export function FindingsSubmit({
  findings,
  onChange,
  onSubmit,
  submissionCount,
  isCompleted,
}: FindingsFormProps) {
  const [feedback, setFeedback] = useState("")
  const [feedbackIndex, setFeedbackIndex] = useState(0)

  useEffect(() => {
    if (submissionCount === 0) return

    if (!isCompleted) {
      setFeedback(negativeFeedback[feedbackIndex])
      setFeedbackIndex((prev) => (prev + 1) % negativeFeedback.length)
    }
  }, [submissionCount, isCompleted])

  return (
    <Card className="border-none shadow-none">
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
        {feedback && (
          <p className="mt-4 text-red-600">
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
