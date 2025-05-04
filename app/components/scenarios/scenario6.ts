//  

 import type { ScenarioProps } from "@/app/components/types"

export const scenario6: ScenarioProps = {
  id: 6,
  title: "TechCorp",
  introText: [
    "",
    "Please investigate and let us know what is going on!",
  ],
  successText: [
    "",
    ""
  ],
  feedbackText: {
    correct: "Correct!",
    incorrect: "Not quite. Try again.",
  },
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "",
    },
    {
      icon: "Megaphone",
      label: "Ask Marketing Team",
      timeAdded: 60,
      infoText:
        "",
    },
  ],
  yAxisDefault: "signup_rate",
  yAxisOptions: ["visitors", "signups",],
  yAxisFormats: {
    "visitors": "number",
    "signups": "number",
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "signups": "Number of signups on the site per day",
    "signup_rate": "Signups / Visitors",
  },
  breakdowns: ["channel", "device"],
  filters: {
    "channel": ["organic", "paid", "social", "email"],
    "device": ["mobile", "desktop"],
  },
  headers: ["day", "device", "channel", "visitors", "signups"],
  types: ["date", "string", "string", "number", "number"],
  calculatedFields: [
  ],
  xAxis: "day",
  correctAnswers: [
  ],
  embeddingFile: "/scenarios/scenario6-embeddings.json",
  threshold: 0.8,
}

