type CalculatedField = {
  name: string
  calculate: (input: { [key: string]: number }) => number
  dataTypes: Array<"string" | "number" | "date">
  format: string
}

type YAxisFormat = "number" | "pct" | "currency"

export type ScenarioProps = {
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
  yAxisDefault: string,
  yAxisOptions: string[],
  yAxisFormats: Record<string, YAxisFormat>
  breakdowns: string[],
  filters: {
    [filterName: string]: string[]
  }
  headers: string[]
  types: Array<"string" | "number" | "date">
  calculatedFields?: CalculatedField[]
  xAxis: string
  correctAnswers: string[]
  embeddingFile: string
}
