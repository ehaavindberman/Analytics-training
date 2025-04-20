import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type FiltersCardProps = {
  filters: {
    device: string
    browser: string
    channel: string
  }
  setFilters: (filters: { device: string; browser: string; channel: string }) => void
}

export function FiltersCard({ filters, setFilters }: FiltersCardProps) {
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="device" className="mb-2 block">Device</Label>
            <Select value={filters.device} onValueChange={(value) => updateFilter("device", value)}>
              <SelectTrigger id="device" className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="browser" className="mb-2 block">Browser</Label>
            <Select value={filters.browser} onValueChange={(value) => updateFilter("browser", value)}>
              <SelectTrigger id="browser" className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="chrome">Chrome</SelectItem>
                <SelectItem value="safari">Safari</SelectItem>
                <SelectItem value="firefox">Firefox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="channel" className="mb-2 block">Channel</Label>
            <Select value={filters.channel} onValueChange={(value) => updateFilter("channel", value)}>
              <SelectTrigger id="channel" className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
