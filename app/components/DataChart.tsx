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
import CustomTooltip from "@/app/components/cards/CustomTooltip"
import _ from "lodash"
import DataChartLoader from "./DataChartLoader"
import type { ScenarioProps, Filters } from "@/app/components/types"
import { formatValue, formatLabel } from "@/utils/format"

type Props = {
  scenario: ScenarioProps
  yAxis: string
  breakdown: string
  chartType: "line" | "area"
  filters: Filters
  showTrend: boolean
}


function getAllRequiredFields(scenario: ScenarioProps): string[] {
  const fields = new Set<string>()

  for (const y of scenario.yAxisOptions) {
    fields.add(y)
  }

  for (const field of scenario.calculatedFields ?? []) {
    for (const required of field.requiredFields ?? []) {
      fields.add(required)
    }
  }

  return Array.from(fields)
}


export default function DataChart({ scenario, yAxis, breakdown, filters, chartType, showTrend }: Props) {
  const data = DataChartLoader({ scenario })

  const chartData = useMemo(() => {
    const filteredData = _.filter(data, (row) =>
      _.every(Object.entries(filters), ([key, value]) => {
        const rowValue = _.get(row, key)
        if (value === "all") return true
        if (Array.isArray(value)) return value.includes(rowValue)
        return rowValue === value
      })
    )

    const allDates = _.uniq(filteredData.map((row) => row[scenario.xAxis]))
    const allBreakdownValues = breakdown !== "none"
      ? _.uniq(filteredData.map((row) => row[breakdown]))
      : []

    const grouped = _.groupBy(filteredData, (row) =>
      breakdown !== "none" ? `${row[scenario.xAxis]}|${row[breakdown]}` : row[scenario.xAxis]
    )

    const requiredFields = new Set([
      ...getAllRequiredFields(scenario),
    ])

    const aggregated: Record<string, any>[] = []
    for (const date of allDates) {
      if (breakdown === "none") {
        const rows = grouped[date] || []
        const result: Record<string, any> = {
          [scenario.xAxis]: date,
        }

        for (const field of requiredFields) {
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

    if (breakdown === "none") {
      const values = aggregated.map((row, i) => ({ x: i, y: row[yAxis] })).filter(p => typeof p.y === 'number')
      const n = values.length
      const sumX = _.sumBy(values, "x")
      const sumY = _.sumBy(values, "y")
      const sumXY = _.sumBy(values, ({ x, y }) => x * y)
      const sumX2 = _.sumBy(values, ({ x }) => x * x)
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      values.forEach(({ x }, i) => { aggregated[i][`trend_${yAxis}`] = slope * x + intercept })
    } else {
      for (const breakdownValue of allBreakdownValues) {
        const values = aggregated.map((row, i) => {
          const point = row[breakdownValue]?.[yAxis]
          return typeof point === 'number' ? { x: i, y: point } : null
        }).filter((v): v is { x: number, y: number } => v !== null)

        const n = values.length
        const sumX = _.sumBy(values, "x")
        const sumY = _.sumBy(values, "y")
        const sumXY = _.sumBy(values, ({ x, y }) => x * y)
        const sumX2 = _.sumBy(values, ({ x }) => x * x)
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
        const intercept = (sumY - slope * sumX) / n

        values.forEach(({ x }, i) => {
          if (!aggregated[i][breakdownValue]) return
          aggregated[i][breakdownValue][`trend_${yAxis}`] = slope * x + intercept
        })
      }
    }

    if (chartType === "area" && breakdown !== "none") {
      for (const row of aggregated) {
        let total = 0
        for (const value of allBreakdownValues) {
          const val = row[value]?.[yAxis]
          if (typeof val === "number") {
            total += val
          }
        }
        for (const value of allBreakdownValues) {
          if (total > 0 && row[value]?.[yAxis] != null) {
            row[value][yAxis] = (row[value][yAxis] / total) * 100
            if (row[value][`trend_${yAxis}`] != null) {
              row[value][`trend_${yAxis}`] = (row[value][`trend_${yAxis}`] / total) * 100
            }
          } else {
            row[value][yAxis] = 0;
            if (row[value][`trend_${yAxis}`] != null) {
              row[value][`trend_${yAxis}`] = 0
            }
          }
        }
      }
    }

    return aggregated
  }, [data, breakdown, filters, scenario, yAxis, , chartType])

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
          <XAxis dataKey={scenario.xAxis} />
          {/* <YAxis tickFormatter={(value) => formatValue(value, scenario.yAxisFormats[yAxis])} /> */}
          <YAxis
            domain={
              chartType === "area" && breakdown !== "none"
                ? [0, 100]
                : undefined
            }
            tickFormatter={(value) =>
              chartType === "area" && breakdown !== "none"
                ? `${value.toFixed(0)}%`
                : formatValue(value, scenario.yAxisFormats[yAxis])
            }
          />
          <Tooltip content={<CustomTooltip scenario={scenario} yAxis={yAxis} />} />
          <Legend />
          {breakdown === "none"
            ? [
                <DataComponent
                  key="main-line"
                  type="monotone"
                  dataKey={yAxis}
                  stroke={colors[0]}
                  fill={chartType === "area" ? colors[0] : undefined}
                  name={formatLabel(yAxis)}
                />,
                showTrend && <Line
                  key="trend-line"
                  type="linear"
                  dot={false}
                  strokeDasharray="5 5"
                  stroke={colors[0]}
                  dataKey={`trend_${yAxis}`}
                  name={`Trend (${formatLabel(yAxis)})`}
                  legendType="none"
                />,
              ]
            : breakdownValues.flatMap((value, index) => [
                <DataComponent
                  key={value}
                  type="monotone"
                  dataKey={`${value}.${yAxis}`}
                  stroke={colors[index % colors.length]}
                  fill={chartType === "area" ? colors[index % colors.length] : undefined}
                  name={formatLabel(`${value} ${yAxis}`)}
                  stackId={chartType === "area" ? "1" : undefined}
                />,
                showTrend && <Line
                  key={`${value}-trend`}
                  type="linear"
                  dot={false}
                  strokeDasharray="5 5"
                  stroke={colors[index % colors.length]}
                  dataKey={`${value}.trend_${yAxis}`}
                  name={`Trend (${formatLabel(value + " " + yAxis)})`}
                  legendType="none"
                />,
              ])}
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return renderChart()
}
