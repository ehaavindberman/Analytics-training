"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScenarioTimer } from "./ScenarioTimer"
import { ArrowLeft, CheckCircle, Glasses, Code, Megaphone, Search } from "lucide-react"
import { scenarios } from "@/app/scenarios"
import { ChartControls } from "./ChartControls"
import { ChartCard } from "./ChartCard"
import { FindingsSubmit } from "./FindingsSubmit"
import { FiltersCard } from "./FiltersCard"
import { ExtraInfoCard } from "./ExtraInfoCard"

type DeviceType = "desktop" | "mobile" | "tablet"
type BrowserType = "chrome" | "firefox" | "safari" | "edge"
type ChannelType = "organic" | "paid" | "social" | "email"

type VisitorData = {
  day: string
  device: DeviceType
  browser: BrowserType
  channel: ChannelType
  visitors: number
  signups: number
}

type ChartType = "line" | "area"

type ExtraInfoButton = {
  icon: React.ElementType
  label: string
  action: () => void
  timeAdded: number
}

export default function AnalyticsDashboard({
  onSuccess,
  scenario,
  onBackToScenarios,
  initialTime,
  updateScenarioTime,
}: {
  onSuccess: (time: number) => void
  scenario: number
  onBackToScenarios: () => void
  initialTime: number
  updateScenarioTime: (id: number, time: number) => void
}) {
  const [data, setData] = useState<VisitorData[]>([])
  const [filteredData, setFilteredData] = useState<VisitorData[]>([])
  const [yAxis, setYAxis] = useState<"visitors" | "signups" | "signup_rate">("signups")
  const [breakdown, setBreakdown] = useState<"none" | "device" | "browser" | "channel">("none")
  const [chartType, setChartType] = useState<ChartType>("line")
  const [findings, setFindings] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [filters, setFilters] = useState({
    device: "all",
    browser: "all",
    channel: "all",
  })
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [time, setTime] = useState(initialTime)
  const [extraInfo, setExtraInfo] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          updateScenarioTime(scenario, newTime)
          return newTime
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, scenario, updateScenarioTime])

  const handleSubmit = () => {
    setIsTimerRunning(false)
    const currentScenario = scenarios[scenario - 1]
    if (currentScenario.correctFindingsKeywords.every((keyword) => findings.toLowerCase().includes(keyword))) {
      setFeedback(currentScenario.feedbackText.correct)
      setIsCompleted(true)
      onSuccess(time)
    } else {
      setFeedback(currentScenario.feedbackText.incorrect)
    }
  }

  const addExtraTime = (seconds: number) => {
    const newTime = time + seconds
    setTime(newTime)
    updateScenarioTime(scenario, newTime)
  }

  const getExtraInfoButtons = (): ExtraInfoButton[] => {
    const currentScenario = scenarios[scenario - 1]
    const iconMap: { [key: string]: React.ElementType } = {
      Glasses,
      Code,
      Megaphone,
      Search,
    }
    return currentScenario.extraInfoButtons.map((button) => ({
      icon: iconMap[button.icon],
      label: button.label,
      action: () => {
        addExtraTime(button.timeAdded)
        setExtraInfo(button.infoText)
      },
      timeAdded: button.timeAdded,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBackToScenarios} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scenarios
        </Button>
        <ScenarioTimer time={time} isRunning={isTimerRunning} />
        {isCompleted && (
          <div className="flex items-center text-green-500">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Scenario Completed</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <ChartControls
            yAxis={yAxis}
            setYAxis={setYAxis}
            breakdown={breakdown}
            setBreakdown={setBreakdown}
            chartType={chartType}
            setChartType={setChartType}
          />

          <ChartCard
            scenario={scenario}
            yAxis={yAxis}
            breakdown={breakdown}
            chartType={chartType}
            filters={filters}
          />
          <FindingsSubmit
            findings={findings}
            onChange={setFindings}
            onSubmit={handleSubmit}
            feedback={feedback}
            isCompleted={isCompleted}
          />
        </div>
        <div className="space-y-4">
          <FiltersCard filters={filters} setFilters={setFilters} />
          <ExtraInfoCard buttons={getExtraInfoButtons()} isCompleted={isCompleted} extraInfo={extraInfo}/>
        </div>
      </div>
    </div>
  )
}

