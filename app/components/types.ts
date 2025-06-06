type CalculatedField = {
  name: string
  requiredFields: string[]
  calculate: (input: { [key: string]: any }) => number
  dataTypes: Array<"string" | "number" | "date">
  format: string
}

type YAxisFormat = "number" | "pct" | "currency"

export type ScenarioProps = {
  id: number
  title: string
  category: "intro" | "notflix" | "sweater"
  introText: string[]
  successText: string[]
  extraInfoButtons: {
    icon: string
    label: string
    timeAdded: number
    infoText: string
  }[]
  yAxisDefault: string
  yAxisOptions: string[]
  yAxisFormats: Record<string, YAxisFormat>
  dataDictionary: Record<string, string>
  breakdowns: string[]
  filters: {
    [filterName: string]: string[]
  }
  headers: string[]
  types: Array<"string" | "number" | "date">
  calculatedFields?: CalculatedField[]
  xAxis: string
  correctAnswers: string[]
  embeddingFile: string
  threshold: number
}

export type ExtraInfoButton = {
  icon: React.ElementType
  label: string
  action: () => void
  timeAdded: number
  infoText: string
}

export type CompletedScenario = {
  id: number
  time: number
  submissionCount?: number
}
