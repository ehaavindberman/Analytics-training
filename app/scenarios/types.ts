export type ScenarioData = {
  id: number
  title: string
  description: string
  introText: string[]
  successText: string[]
  correctFindingsKeywords: string[]
  feedbackText: {
    correct: string
    incorrect: string
  }
  extraInfoButtons: {
    icon: string
    label: string
    timeAdded: number
    infoText: string
  }[]
  yAxis: "visitors" | "signups" | "signup_rate"
}

