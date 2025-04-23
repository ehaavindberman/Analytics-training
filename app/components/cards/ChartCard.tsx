import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataChart from "../DataChart"
import type { ScenarioData } from "@/app/scenarios/types"

type ChartCardProps = {
  scenario: ScenarioData
  yAxis: "visitors" | "signups" | "signup_rate"
  breakdown: "none" | "device" | "browser" | "channel"
  chartType: "line" | "area"
  filters: { [key: string]: string }
}

export function ChartCard({ scenario, yAxis, breakdown, chartType, filters }: ChartCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization - Scenario {scenario.id}</CardTitle>
        <CardDescription>{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <DataChart scenario={scenario.id} yAxis={yAxis} breakdown={breakdown} filters={filters} chartType={chartType} />
        </div>
      </CardContent>
    </Card>
  )
}
