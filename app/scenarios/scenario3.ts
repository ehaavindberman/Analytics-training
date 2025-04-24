import type { ScenarioProps } from "./types"

export const scenario3: ScenarioProps = {
  id: 3,
  title: "Warmup challenge 3",
  description: "Analyze the impact of an unexpected influx of organic visitors.",
  introText: [
    "The CMO was poking around in our dashbaords and noticed that the last few days we've had a decrease in signup rates!",
    "Let's get this resolved quickly for them. Submit your answer below.",
  ],
  successText: [
    "",
  ],
  correctFindingsKeywords: ["organic", "spike", "signup rate"],
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
        "You don't note anything particular standing out on the site.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "The release cycle data indicates that a major SEO optimization update was implemented about a week ago, which could be influencing the organic traffic patterns.",
    },
    {
      icon: "Megaphone",
      label: "Ask Marketing Team",
      timeAdded: 60,
      infoText:
        "The marketing team reports that they haven't changed anything, but did hear from the PR team that we've had some recent press",
    },
    {
      icon: "Search",
      label: "Consult SEO Team",
      timeAdded: 60,
      infoText:
        "The SEO team mentions that they've recently optimized several key landing pages and updated meta descriptions. They've also noticed an uptick in backlinks from high-authority domains.",
    },
  ],
  yAxisDefault: "signup_rate",
  yAxisOptions: ["visitors", "signups", "signup_rate"],
  breakdowns: ["device", "browser", "channel"],
  filters: {
    "device": ["all", "desktop", "mobile", "tablet"],
    "browser": ["all", "chrome", "firefox", "safari", "edge"],
    "channel": ["all", "organic", "paid", "social", "email"],
  },
  headers: ["day", "device", "browser", "channel", "visitors", "signups"],
  types: ["date", "string", "string", "string", "number", "number"],
  calculatedFields: [
    {
      name: "signup_rate",
      calculate: ({ signups, visitors }) => signups / visitors,
      dataTypes: ["number"]
    },
  ],
  xAxis: "day",
}

