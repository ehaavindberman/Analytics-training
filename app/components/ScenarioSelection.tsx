import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Share2 } from 'lucide-react'

type CompletedScenario = {
  id: number;
  time: number;
};

type Props = {
  onSelectScenario: (scenario: number) => void;
  completedScenarios: CompletedScenario[];
};

const scenarios = [
  {
    id: 1,
    title: "Declining Signups",
    description: "Investigate why signups have dropped significantly over the past few days."
  },
  {
    id: 2,
    title: "Changing Visitor Patterns",
    description: "Analyze recent changes in visitor patterns across different channels and devices."
  },
  {
    id: 3,
    title: "Organic Traffic Spike",
    description: "Examine the impact of a sudden change in organic traffic on overall signup rates."
  }
];

export default function ScenarioSelection({ onSelectScenario, completedScenarios }: Props) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleShare = async (scenarioId: number, time: number) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    const shareText = `I completed the "${scenario?.title}" scenario in the Analytics Training Platform in ${formatTime(time)}! Can you beat my time?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Analytics Training Achievement',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported on this browser. You can copy the following text:\n\n' + shareText);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((scenario) => {
        const completedScenario = completedScenarios.find(s => s.id === scenario.id);
        return (
          <Card key={scenario.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Scenario {scenario.id}: {scenario.title}</span>
                {completedScenario && (
                  <CheckCircle className="text-green-500" />
                )}
              </CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <Button onClick={() => onSelectScenario(scenario.id)}>
                    {completedScenario ? "Revisit Scenario" : "Start Scenario"}
                  </Button>
                  {completedScenario && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatTime(completedScenario.time)}
                    </div>
                  )}
                </div>
                {completedScenario && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleShare(scenario.id, completedScenario.time)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Result
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}

