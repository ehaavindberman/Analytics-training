"use client"

import { useState, useEffect } from "react"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import IntroductionScreen from "./components/IntroductionScreen"
import SuccessScreen from "./components/SuccessScreen"
import ScenarioSelection from "./components/ScenarioSelection"
import GameIntro from "./components/GameIntro"

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
  const [scenario, setScenario] = useState(0)
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

  const handleStart = () => {
    setShowIntro(false)
  }

  const handleSuccess = (time: number) => {
    setShowSuccess(true)
    setCompletedScenarios((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === scenario)
      if (existingIndex >= 0) {
        const newCompleted = [...prev]
        newCompleted[existingIndex] = { id: scenario, time }
        return newCompleted
      }
      return [...prev, { id: scenario, time }]
    })
    // Update scenarioTimes
    setScenarioTimes((prev) => {
      const newTimes = prev.filter((s) => s.id !== scenario)
      return [...newTimes, { id: scenario, time }]
    })
  }

  const handleContinue = () => {
    setShowScenarioSelection(true)
    setShowSuccess(false)
  }

  const handleSelectScenario = (selectedScenario: number) => {
    setScenario(selectedScenario)
    setShowScenarioSelection(false)
    setShowIntro(true)
  }

  const handleBackToScenarios = () => {
    setShowScenarioSelection(true)
    setShowIntro(false)
    setShowSuccess(false)
    setScenario(0)
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
      {showGameIntro ? (
        <GameIntro onStart={handleStartGame} />
      ) : showScenarioSelection ? (
        <div className="container mx-auto p-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center text-primary">Analytics Adventure</h1>
          <ScenarioSelection onSelectScenario={handleSelectScenario} completedScenarios={completedScenarios} />
        </div>
      ) : showIntro ? (
        <IntroductionScreen onStart={handleStart} scenario={scenario} />
      ) : showSuccess ? (
        <SuccessScreen onContinue={handleContinue} scenario={scenario} />
      ) : (
        <AnalyticsDashboard
          onSuccess={handleSuccess}
          scenario={scenario}
          onBackToScenarios={handleBackToScenarios}
          initialTime={scenarioTimes.find((s) => s.id === scenario)?.time || 0}
          updateScenarioTime={updateScenarioTime}
        />
      )}
    </main>
  )
}

