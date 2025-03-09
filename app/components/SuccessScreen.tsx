import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  onContinue: () => void;
  scenario: number;
};

export default function SuccessScreen({ onContinue, scenario }: Props) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Congratulations! You've Solved Scenario {scenario}</CardTitle>
        <CardDescription>Great job on your analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {scenario === 1 ? (
          <>
            <p className="mb-4">
              You successfully identified that mobile signups dropped significantly after the 8th day. This kind of insight is crucial for quickly addressing issues that affect user acquisition.
            </p>
            <p className="mb-4">
              In a real-world scenario, this finding would prompt an investigation into recent changes in the mobile app or signup process, potentially uncovering a bug or UX issue that needs to be fixed.
            </p>
          </>
        ) : scenario === 2 ? (
          <>
            <p className="mb-4">
              You correctly identified that mobile visitors from the social channel dropped by half starting from the 8th day. This observation is vital for understanding changes in user behavior and the effectiveness of our marketing channels.
            </p>
            <p className="mb-4">
              In practice, this insight would lead to an investigation of recent changes in social media algorithms, our social media campaign strategies, or potential issues with how our content is displayed on mobile devices from social media links.
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              Great job! You've correctly identified the spike in organic traffic and its impact on the overall signup rate. This kind of analysis is crucial for understanding how changes in traffic sources can affect our key performance indicators.
            </p>
            <p className="mb-4">
              In a real-world scenario, this finding would prompt further investigation into the cause of the organic traffic spike, such as changes in search engine algorithms, viral content, or successful SEO efforts. It would also lead to discussions on how to optimize our signup process for this influx of organic visitors.
            </p>
          </>
        )}
        <Button onClick={onContinue}>
          {scenario === 3 ? "Finish Training" : "Continue to Next Scenario"}
        </Button>
      </CardContent>
    </Card>
  );
}

