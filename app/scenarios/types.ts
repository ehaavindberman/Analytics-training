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
  dataGenerationRules: (day: number) => Partial<{
    visitorMultiplier: number
    signupProbabilityMultiplier: number
    deviceDistribution: Partial<Record<"desktop" | "mobile" | "tablet", number>>
    channelDistribution: Partial<Record<"organic" | "paid" | "social" | "email", number>>
  }>
}

