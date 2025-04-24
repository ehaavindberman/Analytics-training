import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { formatLabel } from "@/utils/format"

type ChartControlsProps = {
  yAxis: string
  setYAxis: (value: string) => void
  breakdown: string
  setBreakdown: (value: string) => void
  chartType: "line" | "area"
  setChartType: (value: "line" | "area") => void
  yAxisOptions: string[]
  breakdownOptions: string[]
}

export function ChartControls({ yAxis, setYAxis, yAxisOptions, breakdown, setBreakdown, breakdownOptions, chartType, setChartType }: ChartControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="y-axis" className="mb-2 block">Y-Axis</Label>
            <Select value={yAxis} onValueChange={(value) => setYAxis(value)}>
              <SelectTrigger id="y-axis" className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {yAxisOptions.map((option) => (
                  <SelectItem key={option} value={option}>{formatLabel(option)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="breakdown" className="mb-2 block">Breakdown</Label>
            <Select value={breakdown} onValueChange={(value) => setBreakdown(value as any)}>
              <SelectTrigger id="breakdown" className="w-full">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {breakdownOptions.map((option) => (
                  <SelectItem key={option} value={option}>{formatLabel(option)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="chart-type" className="mb-2 block">Chart Type</Label>
            <Select value={chartType} onValueChange={(value) => setChartType(value as any)}>
              <SelectTrigger id="chart-type" className="w-full">
                <SelectValue placeholder="Line Chart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Stacked Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
