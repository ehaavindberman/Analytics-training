import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DataChart from "../DataChart"
import type { ScenarioProps, Filters } from "@/app/components/types"
import { formatLabel } from "@/utils/format"

type ChartCardProps = {
  scenario: ScenarioProps
  yAxis: string
  breakdown: string
  chartType: "line" | "area"
  filters: Filters
}


export function ChartCard({ scenario, yAxis, breakdown, chartType, filters }: ChartCardProps) {

  const [showTrend, setShowTrend] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {formatLabel(yAxis)} per {formatLabel(scenario.xAxis)} {breakdown !== "none" && ` by ${formatLabel(breakdown)}`}
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={showTrend}
            onChange={(e) => setShowTrend(e.target.checked)}
            id="toggle-trend"
          />
          <label htmlFor="toggle-trend">Show trend lines</label>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[400px] w-full">
          <DataChart 
            scenario={scenario} 
            yAxis={yAxis}
            breakdown={breakdown} 
            filters={filters} 
            chartType={chartType} 
            showTrend={showTrend}
          />
        </div>
      </CardContent>
    </Card>
  )
}
