import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataChart from "../DataChart"
import type { ScenarioProps } from "@/app/components/types"
import { formatLabel } from "@/utils/format"

type ChartCardProps = {
  scenario: ScenarioProps
  yAxis: string
  breakdown: string
  chartType: "line" | "area"
  filters: { [key: string]: string }
}

export function ChartCard({ scenario, yAxis, breakdown, chartType, filters }: ChartCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatLabel(yAxis)} per {formatLabel(scenario.xAxis)} {breakdown !== "none" && ` by ${formatLabel(breakdown)}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <DataChart 
            scenario={scenario} 
            yAxis={yAxis}
            breakdown={breakdown} 
            filters={filters} 
            chartType={chartType} 
          />
        </div>
      </CardContent>
    </Card>
  )
}
