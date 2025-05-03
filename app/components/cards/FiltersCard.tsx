import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import type { ScenarioProps } from "@/app/components/types"
import { formatLabel } from "@/utils/format"

type Filters = { [key: string]: string }

type FiltersCardProps = {
  filters: Filters
  setFilters: (filters: Filters) => void
  scenario: ScenarioProps
}

export function FiltersCard({ filters, setFilters, scenario }: FiltersCardProps) {
  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(scenario.filters).map(([key, options]) => (
            <div key={key}>
              <Label htmlFor={key} className="block mb-2">
                {formatLabel(key)}
              </Label>
              <Select value={filters[key] || "all"} onValueChange={(value) => updateFilter(key, value)}>
                <SelectTrigger id={key} className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {formatLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
