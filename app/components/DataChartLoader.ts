"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import type { ScenarioProps } from "@/app/scenarios/types"

type Props = {
  scenario: ScenarioProps
}

function parseCSV(csvText: string, headers: string[], types: string[]): any[] {
  const lines = csvText.trim().split("\n")
  const headerRow = lines[0].split(",")
  
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    
    const row: { [key: string]: any } = {}
    headers.forEach((header, index) => {
      const value = values[headerRow.indexOf(header)]
      const type = types[index]

      switch (type) {
        case "number":
          row[header] = parseFloat(value)
          break
        case "date":
          row[header] = dayjs(value).format("YYYY-MM-DD")
          break
        case "string":
        default:
          row[header] = value
      }
    })

    return row
  })
}

export default function DataChartLoader({ scenario }: Props) {
  const [data, setData] = useState<any[]>([])
  const csvUrl = `/scenarios/scenario${scenario.id}.csv`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl)
        const text = await response.text()

        const parsedData = parseCSV(text, scenario.headers, scenario.types)
        setData(parsedData)

      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
  
    fetchData()
  }, [csvUrl, scenario])

  return data
}
