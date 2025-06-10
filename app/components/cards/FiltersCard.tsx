import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { ScenarioProps } from "@/app/components/types"
import { formatLabel } from "@/utils/format"

type Filters = { [key: string]: string[] | "all" }

type FiltersCardProps = {
  filters: Filters
  setFilters: (filters: Filters) => void
  scenario: ScenarioProps
}

export function FiltersCard({ filters, setFilters, scenario }: FiltersCardProps) {
  const updateFilter = (key: string, selected: string[]) => {
    if (selected.length === 0 || selected.length === scenario.filters[key].length) {
      setFilters({ ...filters, [key]: "all" }) // Treat all selected as 'all'
    } else {
      setFilters({ ...filters, [key]: selected })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(scenario.filters).map(([key, options]) => {
            const selected = filters[key] === "all" ? options : (filters[key] as string[] ?? [])

            return (
              <div key={key}>
                <Label htmlFor={key} className="block mb-2">
                  {formatLabel(key)}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selected.length === options.length
                        ? "All"
                        : selected.length > 1
                        ? "Multiple"
                        : selected.length === 1
                        ? formatLabel(selected[0])
                        : "None"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                      {options.map((option) => {
                        const isChecked = selected.includes(option)
                        return (
                          <div key={option} className="flex items-center gap-2">
                            <Checkbox
                              id={`${key}-${option}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const updated = checked
                                  ? [...selected, option]
                                  : selected.filter((v) => v !== option)
                                updateFilter(key, updated)
                              }}
                            />
                            <Label htmlFor={`${key}-${option}`}>{formatLabel(option)}</Label>
                          </div>
                        )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
