"use client"

import { useState, useEffect } from "react"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import SuccessScreen from "./components/SuccessScreen"
import ScenarioSelection from "./components/ScenarioSelection"
import GameIntro from "./components/GameIntro"
import type { ScenarioProps } from "./components/types"

type CompletedScenario = {
  id: number
  time: number
}

type ScenarioTime = {
  id: number
  time: number
}

export default function Home() {
  const [showGameIntro, setShowGameIntro] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showScenarioSelection, setShowScenarioSelection] = useState(false)
  const [scenario, setScenario] = useState<ScenarioProps | null>(null)
  const [completedScenarios, setCompletedScenarios] = useState<CompletedScenario[]>([])
  const [scenarioTimes, setScenarioTimes] = useState<ScenarioTime[]>([])

  useEffect(() => {
    const storedTimes = localStorage.getItem("scenarioTimes")
    if (storedTimes) {
      setScenarioTimes(JSON.parse(storedTimes))
    }
  }, [])

  const handleStartGame = () => {
    setShowGameIntro(false)
    setShowScenarioSelection(true)
  }

  const handleSuccess = (time: number) => {
    if (!scenario) return
    setShowSuccess(true)

    setCompletedScenarios((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === scenario.id)
      if (existingIndex >= 0) {
        const newCompleted = [...prev]
        newCompleted[existingIndex] = { id: scenario.id, time }
        return newCompleted
      }
      return [...prev, { id: scenario.id, time }]
    })

    setScenarioTimes((prev) => {
      const newTimes = prev.filter((s) => s.id !== scenario.id)
      return [...newTimes, { id: scenario.id, time }]
    })
  }

  const handleContinue = () => {
    setShowScenarioSelection(true)
    setShowSuccess(false)
  }

  const handleSelectScenario = (selectedScenario: ScenarioProps) => {
    setScenario(selectedScenario)
    setShowScenarioSelection(false)
    setShowIntro(true)
  }

  const handleBackToScenarios = () => {
    setShowScenarioSelection(true)
    setShowIntro(false)
    setShowSuccess(false)
    setScenario(null)
  }

  const updateScenarioTime = (id: number, time: number) => {
    setScenarioTimes((prev) => {
      const newTimes = prev.filter((s) => s.id !== id)
      const updatedTimes = [...newTimes, { id, time }]
      localStorage.setItem("scenarioTimes", JSON.stringify(updatedTimes))
      return updatedTimes
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent">
      <div className="min-h-screen bg-graph-paper p-4">
        {showGameIntro ? (
          <GameIntro onStart={handleStartGame} />
        ) : showScenarioSelection ? (
          <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-primary">🔥 FyreDrill 🔥</h1>
            <ScenarioSelection onSelectScenario={handleSelectScenario} completedScenarios={completedScenarios} />
          </div>
        ) : showSuccess && scenario ? (
          <SuccessScreen onContinue={handleContinue} scenario={scenario} />
        ) : scenario ? (
          <AnalyticsDashboard
            onSuccess={handleSuccess}
            scenario={scenario}
            onBackToScenarios={handleBackToScenarios}
            initialTime={scenarioTimes.find((s) => s.id === scenario.id)?.time || 0}
            updateScenarioTime={updateScenarioTime}
          />
        ) : null}
      </div>
    </main>
  )
}