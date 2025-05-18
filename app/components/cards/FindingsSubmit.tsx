import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

type FindingsFormProps = {
  findings: string
  onChange: (value: string) => void
  onSubmit: () => void
  submissionCount: number
  isCompleted: boolean
  isSubmitting: boolean
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
  isSubmitting,
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
          disabled={isCompleted || isSubmitting}
        />
        <Button 
          onClick={onSubmit} 
          disabled={isCompleted || isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isSubmitting ? "Submitting..." : "Submit Findings"}
        </Button>
        {feedback && !isSubmitting && (
          <p className="mt-4 text-red-600">
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
