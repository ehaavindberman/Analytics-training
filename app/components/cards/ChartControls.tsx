import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type ChartControlsProps = {
  yAxis: "visitors" | "signups" | "signup_rate"
  setYAxis: (value: "visitors" | "signups" | "signup_rate") => void
  breakdown: "none" | "device" | "browser" | "channel"
  setBreakdown: (value: "none" | "device" | "browser" | "channel") => void
  chartType: "line" | "area"
  setChartType: (value: "line" | "area") => void
}

export function ChartControls({ yAxis, setYAxis, breakdown, setBreakdown, chartType, setChartType }: ChartControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="y-axis" className="mb-2 block">Y-Axis</Label>
            <Select value={yAxis} onValueChange={(value) => setYAxis(value as any)}>
              <SelectTrigger id="y-axis" className="w-full">
                <SelectValue placeholder="Signups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visitors">Visitors</SelectItem>
                <SelectItem value="signups">Signups</SelectItem>
                <SelectItem value="signup_rate">Signup Rate</SelectItem>
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
                <SelectItem value="device">Device</SelectItem>
                <SelectItem value="browser">Browser</SelectItem>
                <SelectItem value="channel">Channel</SelectItem>
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
