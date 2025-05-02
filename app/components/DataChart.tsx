"use client"

import { useMemo } from "react"
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import _ from "lodash"
import DataChartLoader from "./DataChartLoader"
import type { ScenarioProps } from "@/app/components/types"
import { formatValue, formatLabel } from "@/utils/format"

type Props = {
  scenario: ScenarioProps
  yAxis: string
  breakdown: string
  chartType: "line" | "area"
  filters: { [filterName: string]: string }
}

export default function DataChart({ scenario, yAxis, breakdown, filters, chartType }: Props) {

  const data = DataChartLoader({scenario})
  const chartData = useMemo(() => {
    
    const filteredData = _.filter(data, (row) =>
      _.every(Object.entries(filters), ([key, value]) => {
        const rowValue = _.get(row, key);
        return value === "all" || rowValue == value;
      })
    )

    const allDates = _.uniq(filteredData.map((row) => row[scenario.xAxis]))
    const allBreakdownValues = breakdown !== "none"
      ? _.uniq(filteredData.map((row) => row[breakdown]))
      : []

    const grouped = _.groupBy(filteredData, (row) =>
      breakdown !== "none" ? `${row[scenario.xAxis]}|${row[breakdown]}` : row[scenario.xAxis]
    )

    const aggregated: Record<string, any>[] = []
    for (const date of allDates) {
      if (breakdown === "none") {
        const rows = grouped[date] || []
        const result: Record<string, any> = {
          [scenario.xAxis]: date,
        }

        for (const field of scenario.yAxisOptions) {
          const isCalculated = scenario.calculatedFields?.some((f) => f.name === field)
          if (!isCalculated) {
            result[field] = _.sumBy(rows, (row) => Number(row[field] ?? 0))
          }
        }

        for (const field of scenario.calculatedFields ?? []) {
          try {
            result[field.name] = field.calculate(result)
          } catch {
            result[field.name] = null
          }
        }

        aggregated.push(result)
      } else {
        const nested: Record<string, any> = {
          [scenario.xAxis]: date,
        }

        for (const value of allBreakdownValues) {
          const key = `${date}|${value}`
          const rows = grouped[key] || []

          const breakdownGroup: Record<string, any> = {
            [breakdown]: value,
          }

          for (const field of scenario.yAxisOptions) {
            const isCalculated = scenario.calculatedFields?.some((f) => f.name === field)
            if (!isCalculated) {
              breakdownGroup[field] = _.sumBy(rows, (row) => Number(row[field] ?? 0))
            }
          }

          for (const field of scenario.calculatedFields ?? []) {
            try {
              breakdownGroup[field.name] = field.calculate(breakdownGroup)
            } catch {
              breakdownGroup[field.name] = null
            }
          }

          nested[value] = breakdownGroup
        }

        aggregated.push(nested)
      }
    }
    
    return aggregated
  }, [data, breakdown, filters, scenario])

  const breakdownValues = useMemo(() => {
    if (breakdown === "none") return []
    return Array.from(new Set(data.map((d) => d[breakdown])))
  }, [data, breakdown])
  
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"]

  const renderChart = () => {
    const ChartComponent = chartType === "line" ? LineChart : AreaChart
    const DataComponent = chartType === "line" ? Line : Area

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(value) => formatValue(value, scenario.yAxisFormats[yAxis])}/>
          <Tooltip formatter={(value: any) => formatValue(value, scenario.yAxisFormats[yAxis])} />
          <Legend />
          {breakdown === "none" ? (
            <DataComponent
              type="monotone"
              dataKey={yAxis}
              stroke={colors[0]}
              fill={chartType === "area" ? colors[0] : undefined}
              name={formatLabel(yAxis)}
            />
          ) : (
            breakdownValues.map((value, index) => (
              <DataComponent
                key={value}
                type="monotone"
                dataKey={`${value}.${yAxis}`}
                stroke={colors[index % colors.length]}
                fill={chartType === "area" ? colors[index % colors.length] : undefined}
                name={formatLabel(`${value} ${yAxis}`)}
                stackId={chartType === "area" ? "1" : undefined}
              />
            ))
          )}
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return renderChart()
}
