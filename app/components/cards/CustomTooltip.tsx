import React from "react"
import { formatValue } from "@/utils/format"
import type { ScenarioProps } from "@/app/components/types"
import type { TooltipProps } from "recharts"

type Props = TooltipProps<number, string> & {
  scenario: ScenarioProps
  yAxis: string
}

const CustomTooltip: React.FC<Props> = ({ payload, label, scenario, yAxis }) => {
  if (!payload || payload.length === 0) return null

  const filtered = payload.filter(entry => {
    const key = entry.dataKey?.toString() ?? ""
    return !key.includes("trend")
  })

  return (
    <div className="bg-white p-2 rounded shadow border text-sm">
      <div className="font-semibold mb-2">{label}</div>
      {filtered.map((entry, index) => (
        <div key={index} className="flex justify-between gap-4">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span>
            {entry.value !== undefined
              ? formatValue(entry.value, scenario.yAxisFormats[yAxis])
              : "–"}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomTooltip
