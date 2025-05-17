"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScenarioTimer } from "./cards/ScenarioTimer"
import { ArrowLeft, CheckCircle, Glasses, Code, Megaphone, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartControls } from "./cards/ChartControls"
import { ChartCard } from "./cards/ChartCard"
import { FindingsSubmit } from "./cards/FindingsSubmit"
import { FiltersCard } from "./cards/FiltersCard"
import { DataDictionaryCard } from "./cards/DataDictionaryCard"
import { ExtraInfoCard } from "./cards/ExtraInfoCard"
import ScenarioDescriptionCard from "./cards/ScenarioDescriptionCard"
import type { ScenarioProps } from "@/app/components/types"
import { testUserAnswer } from "./TestUserAnswer"
import { ExtraInfoButton } from "./types"

type ChartType = "line" | "area"

export default function AnalyticsDashboard({
  onSuccess,
  scenario,
  onBackToScenarios,
  initialTime,
  updateScenarioTime,
}: {
  onSuccess: (time: number) => void
  scenario: ScenarioProps
  onBackToScenarios: () => void
  initialTime: number
  updateScenarioTime: (id: number, time: number) => void
}) {
  const [yAxis, setYAxis] = useState<string>(scenario.yAxisDefault as any)
  const [breakdown, setBreakdown] = useState<string>("none")
  const [chartType, setChartType] = useState<ChartType>("line")
  const [findings, setFindings] = useState("")
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [time, setTime] = useState(initialTime)
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
  
          requestAnimationFrame(() => {
            updateScenarioTime(scenario.id, newTime)
          })
  
          return newTime
        })
      }
    }, 1000)
  
    return () => clearInterval(interval)
  }, [isTimerRunning, scenario, updateScenarioTime])

  const handleSubmit = async () => {
    setIsTimerRunning(false);
  
    const isCorrect = await testUserAnswer(findings, scenario.threshold, scenario.embeddingFile);

    setSubmissionCount((count) => count + 1);
    
    if (isCorrect) {
      setIsCompleted(true);
      onSuccess(time);
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
      },
      timeAdded: button.timeAdded,
      infoText: button.infoText,
    }))
  }
  

  return (
    <div className="space-y-4 pb-10 mb-5">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Button variant="outline" onClick={onBackToScenarios}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Scenarios
          </Button>
          <ScenarioTimer time={time} isRunning={isTimerRunning} />
        </div>
        <ScenarioDescriptionCard 
          scenario={scenario} 
        />  
        <FindingsSubmit
          findings={findings}
          onChange={setFindings}
          onSubmit={handleSubmit}
          submissionCount={submissionCount}
          isCompleted={isCompleted}
        />
      </Card>  
      <div className="relative rounded-lg shadow-md space-y-10">
        {/* Someday this can be tabs for multiple charts for multiple data sources */}
        {/* <div className="absolute -top-7 bg-[#7D934B] text-white px-4 py-1 rounded-t-md font-medium">
          Charts 
        </div> */}

        <div className="bg-white rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3 space-y-4">
              <ChartCard
                scenario={scenario}
                yAxis={yAxis}
                breakdown={breakdown}
                chartType={chartType}
                filters={filters}
              />
              <ExtraInfoCard 
            buttons={getExtraInfoButtons()} 
            isCompleted={isCompleted}
          />
            </div>
            <div className="w-full lg:w-1/3 space-y-4">
              <ChartControls
                yAxis={yAxis}
                setYAxis={setYAxis}
                yAxisOptions={scenario.yAxisOptions}
                breakdown={breakdown}
                setBreakdown={setBreakdown}
                breakdownOptions={scenario.breakdowns}
                chartType={chartType}
                setChartType={setChartType}
              />
              <FiltersCard 
                filters={filters} 
                setFilters={setFilters} 
                scenario={scenario}
              />
              <DataDictionaryCard
                dataDictionary={scenario.dataDictionary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

