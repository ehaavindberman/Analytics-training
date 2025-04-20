import type { ScenarioData } from "./types"

export const scenario3: ScenarioData = {
  id: 3,
  title: "The Organic Traffic Surge",
  description: "Analyze the impact of an unexpected influx of organic visitors.",
  introText: [
    "Congratulations on making it to the final challenge! We've detected an unexpected surge in organic traffic, but its impact on our signup rates is unclear.",
    "Your ultimate mission: Investigate this traffic anomaly, determine its effects on our key metrics, and provide insights that could shape our future strategies.",
    "New features: You now have access to all information gathering tools, including asking the marketing team and consulting the SEO team. Each of these new options will add 1 minute to your time.",
  ],
  successText: [
    "Great job! You've correctly identified the spike in organic traffic and its impact on the overall signup rate. This kind of analysis is crucial for understanding how changes in traffic sources can affect our key performance indicators.",
    "In a real-world scenario, this finding would prompt further investigation into the cause of the organic traffic spike, such as changes in search engine algorithms, viral content, or successful SEO efforts. It would also lead to discussions on how to optimize our signup process for this influx of organic visitors.",
  ],
  correctFindingsKeywords: ["organic", "spike", "signup rate"],
  feedbackText: {
    correct:
      "Great job! You've correctly identified the spike in organic traffic and its impact on the overall signup rate.",
    incorrect: "Not quite. Try looking at the changes in organic traffic and how it affects the overall signup rate.",
  },
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "Inspecting the app shows that a new pop-up for email newsletter signups has been added to the homepage. This might be affecting user behavior, especially for organic traffic.",
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
        "The marketing team reports that they recently adjusted their social media strategy, focusing more on desktop users. They've also increased spending on search engine marketing.",
    },
    {
      icon: "Search",
      label: "Consult SEO Team",
      timeAdded: 60,
      infoText:
        "The SEO team mentions that they've recently optimized several key landing pages and updated meta descriptions. They've also noticed an uptick in backlinks from high-authority domains.",
    },
  ],
}

