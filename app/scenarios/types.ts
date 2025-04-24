type CalculatedField = {
  name: string
  calculate: (input: { [key: string]: number }) => number
  dataTypes: Array<"string" | "number" | "date">
}

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
  breakdowns: string[],
  filters: {
    [filterName: string]: string[]
  }
  headers: string[]
  types: Array<"string" | "number" | "date">
  calculatedFields?: CalculatedField[]
  xAxis: string
}
