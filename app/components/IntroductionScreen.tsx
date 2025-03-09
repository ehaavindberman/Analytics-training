import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  onStart: () => void;
  scenario: number;
};

export default function IntroductionScreen({ onStart, scenario }: Props) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>TechCorp Analytics Training - Scenario {scenario}</CardTitle>
        <CardDescription>Sharpen your data analysis skills with real-world scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        {scenario === 1 ? (
          <>
            <p className="mb-4">
              As an analyst at TechCorp, a growing tech company, you'll face various challenges that require your analytical expertise. In this training, you'll encounter different scenarios where you need to investigate data anomalies and provide insights to help the company make informed decisions.
            </p>
            <p className="mb-4">
              Your first task: The CEO has just informed you that signups have significantly dropped over the past few days. Your mission is to analyze the data and figure out why this is happening so the team can fix the issue.
            </p>
          </>
        ) : scenario === 2 ? (
          <>
            <p className="mb-4">
              Great job on solving the first scenario! Now, let's move on to a new challenge.
            </p>
            <p className="mb-4">
              The marketing team has reported a sudden change in visitor patterns across different channels and devices. They suspect something might be affecting our mobile traffic from social media. Your task is to analyze the data and identify any significant changes in visitor behavior.
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              Excellent work on the previous scenarios! You're ready for a more complex challenge.
            </p>
            <p className="mb-4">
              The SEO team has noticed an unusual spike in organic traffic, but they're concerned about its impact on our overall signup rate. Your task is to analyze this sudden change in organic traffic and determine how it's affecting our key metrics.
            </p>
          </>
        )}
        <p className="mb-4">
          Use the dashboard to investigate the data and report your findings. Good luck!
        </p>
        <Button onClick={onStart}>Start Analysis</Button>
      </CardContent>
    </Card>
  );
}

