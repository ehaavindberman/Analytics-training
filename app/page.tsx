'use client'

import { useState } from 'react';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import IntroductionScreen from './components/IntroductionScreen';
import SuccessScreen from './components/SuccessScreen';
import ScenarioSelection from './components/ScenarioSelection';

type CompletedScenario = {
  id: number;
  time: number;
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScenarioSelection, setShowScenarioSelection] = useState(true);
  const [scenario, setScenario] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState<CompletedScenario[]>([]);

  const handleStart = () => {
    setShowIntro(false);
  };

  const handleSuccess = (time: number) => {
    setShowSuccess(true);
    setCompletedScenarios((prev) => {
      const existingIndex = prev.findIndex(s => s.id === scenario);
      if (existingIndex >= 0) {
        const newCompleted = [...prev];
        newCompleted[existingIndex] = { id: scenario, time };
        return newCompleted;
      }
      return [...prev, { id: scenario, time }];
    });
  };

  const handleContinue = () => {
    setShowScenarioSelection(true);
    setShowSuccess(false);
  };

  const handleSelectScenario = (selectedScenario: number) => {
    setScenario(selectedScenario);
    setShowScenarioSelection(false);
    setShowIntro(true);
  };

  const handleBackToScenarios = () => {
    setShowScenarioSelection(true);
    setShowIntro(false);
    setShowSuccess(false);
    setScenario(0);
  };

  return (
    <main className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Analytics Training Platform</h1>
      {showScenarioSelection ? (
        <ScenarioSelection 
          onSelectScenario={handleSelectScenario} 
          completedScenarios={completedScenarios}
        />
      ) : showIntro ? (
        <IntroductionScreen onStart={handleStart} scenario={scenario} />
      ) : showSuccess ? (
        <SuccessScreen onContinue={handleContinue} scenario={scenario} />
      ) : (
        <AnalyticsDashboard onSuccess={handleSuccess} scenario={scenario} onBackToScenarios={handleBackToScenarios} />
      )}
    </main>
  );
}

