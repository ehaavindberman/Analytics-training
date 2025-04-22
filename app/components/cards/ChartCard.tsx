import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataChart from "../DataChart"

type ChartCardProps = {
  scenario: number
  yAxis: "visitors" | "signups" | "signup_rate"
  breakdown: "none" | "device" | "browser" | "channel"
  chartType: "line" | "area"
  filters: {
    device: string
    browser: string
    channel: string
  }
}

export function ChartCard({ scenario, yAxis, breakdown, chartType, filters }: ChartCardProps) {
  const scenarioDescriptions: Record<number, string> = {
    1: "Analyze the company's signup data to find out why signups have dropped.",
    2: "Investigate the recent changes in visitor patterns across different channels and devices.",
    3: "Examine the impact of a sudden change in organic traffic on overall signup rates.",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization - Scenario {scenario}</CardTitle>
        <CardDescription>{scenarioDescriptions[scenario]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <DataChart scenario={scenario} yAxis={yAxis} breakdown={breakdown} filters={filters} chartType={chartType} />
        </div>
      </CardContent>
    </Card>
  )
}
