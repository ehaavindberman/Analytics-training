"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScenarioTimer } from "./ScenarioTimer"
import { ArrowLeft, CheckCircle, Glasses, Code, Megaphone, Search } from "lucide-react"
import { ChartControls } from "./cards/ChartControls"
import { ChartCard } from "./cards/ChartCard"
import { FindingsSubmit } from "./cards/FindingsSubmit"
import { FiltersCard } from "./cards/FiltersCard"
import { ExtraInfoCard } from "./cards/ExtraInfoCard"
import ScenarioDescriptionCard from "./cards/ScenarioDescriptionCard"
import type { ScenarioData } from "@/app/scenarios/types"

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
  scenario: ScenarioData
  onBackToScenarios: () => void
  initialTime: number
  updateScenarioTime: (id: number, time: number) => void
}) {
  const [yAxis, setYAxis] = useState<"visitors" | "signups" | "signup_rate">(scenario.yAxis as any)
  const [breakdown, setBreakdown] = useState<"none" | "device" | "browser" | "channel">("none")
  const [chartType, setChartType] = useState<ChartType>("line")
  const [findings, setFindings] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [time, setTime] = useState(initialTime)
  const [extraInfo, setExtraInfo] = useState<string | null>(null)
  const [filters, setFilters] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const initialFilters = Object.keys(scenario.filters).reduce((acc, key) => {
      acc[key] = "all"
      return acc
    }, {} as { [key: string]: string })

    setFilters(initialFilters)
  }, [scenario])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          updateScenarioTime(scenario.id, newTime)
          return newTime
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning, scenario, updateScenarioTime])

  const handleSubmit = () => {
    setIsTimerRunning(false)
    if (scenario.correctFindingsKeywords.every((keyword) => findings.toLowerCase().includes(keyword))) {
      setFeedback(scenario.feedbackText.correct)
      setIsCompleted(true)
      onSuccess(time)
    } else {
      setFeedback(scenario.feedbackText.incorrect)
    }
  }

  const addExtraTime = (seconds: number) => {
    const newTime = time + seconds
    setTime(newTime)
    updateScenarioTime(scenario.id, newTime)
  }

  const getExtraInfoButtons = (): ExtraInfoButton[] => {
    const iconMap: { [key: string]: React.ElementType } = {
      Glasses,
      Code,
      Megaphone,
      Search,
    }
    return scenario.extraInfoButtons.map((button) => ({
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
      <ScenarioDescriptionCard
        scenario={scenario.id}
      />     
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
          <FiltersCard 
            filters={filters} 
            setFilters={setFilters} 
            scenario={scenario}
          />
          <ExtraInfoCard 
            buttons={getExtraInfoButtons()} 
            isCompleted={isCompleted} 
            extraInfo={extraInfo}
          />
        </div>
      </div>
    </div>
  )
}

