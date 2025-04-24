import type { ScenarioProps } from "./types"

export const scenario2: ScenarioProps = {
  id: 2,
  title: "Warmup challenge 2",
  description: "Investigate the peculiar changes in visitor patterns across channels.",
  introText: [
    "We're back with another signup rate isue. This time the product team noticed",
    "that the signup rate has been low for the past two days. Your task is to figure out what's going on."
  ],
  successText: [
    "Great work finding that social visitors radically decreased, we took this to the social team and they found",
    "an issue with the links on their most recent posts which they've quickly fixed."
  ],
  correctFindingsKeywords: ["social", "visitors"],
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
        "You don't find any issues with the signup flow from the social entrypoints.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "The release cycle information shows there have been some small changes with the urls for our website",
    }
  ],
  yAxisDefault: "signup_rate",
  yAxisOptions: ["visitors", "signups", "signup_rate"],
  breakdowns: ["device", "browser", "channel"],
  yAxisFormats: {
    "visitors": "number",
    "signups": "number",
    "signup_rate": "pct",
  },
  filters: {
    "device": ["desktop", "mobile", "tablet"],
    "browser": ["chrome", "firefox", "safari", "edge"],
    "channel": ["organic", "paid", "social", "email"],
  },
  headers: ["day", "device", "browser", "channel", "visitors", "signups"],
  types: ["date", "string", "string", "string", "number", "number"],
  calculatedFields: [
    {
      name: "signup_rate",
      calculate: ({ signups, visitors }) => signups / visitors,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "day",
}

