"use client"

import { useState, useEffect } from "react"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import SuccessScreen from "./components/SuccessScreen"
import ScenarioSelection from "./components/ScenarioSelection"
import GameIntro from "./components/GameIntro"
import AboutPage from "./components/AboutPage"
import type { ScenarioProps, CompletedScenario } from "@/app/components/types"


type ScenarioTime = {
  id: number
  time: number
}

export default function Home() {
  const [showGameIntro, setShowGameIntro] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showScenarioSelection, setShowScenarioSelection] = useState(false)
  const [showAboutPage, setShowAboutPage] = useState(false)
  const [scenario, setScenario] = useState<ScenarioProps | null>(null)
  const [completedScenarios, setCompletedScenarios] = useState<CompletedScenario[]>([])
  const [scenarioTimes, setScenarioTimes] = useState<ScenarioTime[]>([])
  const [scenarioSubmissions, setScenarioSubmissions] = useState<Record<number, number>>({})

  useEffect(() => {
    const storedTimes = localStorage.getItem("scenarioTimes")
    if (storedTimes) {
      setScenarioTimes(JSON.parse(storedTimes))
    }

    const storedSubmissions = localStorage.getItem("scenarioSubmissions")
    if (storedSubmissions) {
      setScenarioSubmissions(JSON.parse(storedSubmissions))
    }
  }, [])

  useEffect(() => {
    if (scenario && !showSuccess && !showScenarioSelection && !showIntro) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scenario, showSuccess, showScenarioSelection, showIntro])

  const handleStartGame = () => {
    setShowGameIntro(false)
    setShowScenarioSelection(true)
  }

  const handleSuccess = (time: number, submissionCount: number) => {
    if (!scenario) return
    setShowSuccess(true)

    setCompletedScenarios((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === scenario.id)
      if (existingIndex >= 0) {
        const newCompleted = [...prev]
        newCompleted[existingIndex] = { id: scenario.id, time, submissionCount }
        return newCompleted
      }
      return [...prev, { id: scenario.id, time, submissionCount }]
    })

    setScenarioTimes((prev) => {
      const newTimes = prev.filter((s) => s.id !== scenario.id)
      const updatedTimes = [...newTimes, { id: scenario.id, time }]
      localStorage.setItem("scenarioTimes", JSON.stringify(updatedTimes))
      return updatedTimes
    })
  }

  const setSubmissionCount = (scenarioId: number, count: number) => {
    setScenarioSubmissions((prev) => {
      const updated = { ...prev, [scenarioId]: count }
      localStorage.setItem("scenarioSubmissions", JSON.stringify(updated))
      return updated
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
      <div className="min-h-screen bg-graph-paper p-4 relative">
        {showGameIntro ? (
          <GameIntro onStart={handleStartGame} />
        ) : showAboutPage ? (
          <>
            <div className="container mx-auto p-4 max-w-3xl">
              <AboutPage />
            </div>
            <button
              onClick={() => setShowAboutPage(false)}
              className="fixed bottom-6 right-6 bg-muted text-muted-foreground px-4 py-2 rounded shadow hover:bg-muted/80"
            >
              ← Back
            </button>
          </>
        ) : showScenarioSelection ? (
          <div className="container mx-auto p-4 max-w-6xl">
            <ScenarioSelection
              onSelectScenario={handleSelectScenario}
              completedScenarios={completedScenarios}
            />
            <button
              onClick={() => setShowAboutPage(true)}
              className="fixed bottom-6 right-6 bg-primary text-white text-bold px-4 py-2 rounded shadow hover:bg-primary/80"
            >
              About
            </button>
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
            submissionCount={scenarioSubmissions[scenario.id] || 0}
            setSubmissionCount={(count) => setSubmissionCount(scenario.id, count)}
          />
        ) : null}
      </div>
    </main>
  )
}
