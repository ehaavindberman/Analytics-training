//  subscription business and we are seeing a long term trend (over the last 3 months) of lower and lower retention rates. 
// (retention rate defined as whether a user is retained 2 months after signing up and can be a new boolean in the table,
//  needs to be graphable on the y-axis). This will be because we have been increasing spend on paid marketing, 
// so the signups we get are slowly moving towards paid above the others. The paid users have a lower retention rate 
// overall and because they are a higher share, this means the overall retention rate is lower.

 import type { ScenarioProps } from "../components/types"

export const scenario5: ScenarioProps = {
  id: 5,
  title: "Notflix",
  introText: [
    "Welcome to Notflix, we sell subscriptions and have noticed that recently our retention rates have been on a downward trend.",
    "Please investigate and let us know what is going on!",
  ],
  successText: [
    "Great work figuring out that the share of paid users as been steadily increasing and those users have very low retention rates leading to lower retention overall.",
    "We will talk with our marketing team about this, as it appears we're cannibalising our other channels and reallocate some funds for organic growth."
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
        "Nothing looks out of place, still worth a check.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "No large code releases have been done, but since it's a steady decline this was an unlikely one anyway.",
    },
    {
      icon: "Megaphone",
      label: "Ask Marketing Team",
      timeAdded: 60,
      infoText:
        "The marketing team said they have been ramping up paid acquisition over the last few months and it's been increasing their numbers.",
    },
  ],
  yAxisDefault: "two_month_retention_rate",
  yAxisOptions: ["visitors", "signups", "one_week_retention_rate", "one_month_retention_rate", "two_month_retention_rate", "retained_1_week", "retained_1_month", "retained_2_months"],
  yAxisFormats: {
    "visitors": "number",
    "signups": "number",
    "one_week_retention_rate": "pct",
    "one_month_retention_rate": "pct",
    "two_month_retention_rate": "pct",
    "retained_1_week": "number",
    "retained_1_month": "number",
    "retained_2_months": "number",
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "signups": "Number of signups on the site per day",
    "signup_rate": "Signups / Visitors",
    "one_week_retention_rate": "Signups from that day which who were still signed up one week later",
    "one_month_retention_rate": "Signups from that day which who were still signed up one month later",
    "two_month_retention_rate": "Signups from that day which who were still signed up two months later",
  },
  breakdowns: ["channel", "device"],
  filters: {
    "channel": ["organic", "paid", "social", "email"],
    "device": ["mobile", "desktop"],
  },
  headers: ["day", "device", "channel", "visitors", "signups", "retained_1_week", "retained_1_month", "retained_2_months"],
  types: ["date", "string", "string", "number", "number", "number", "number", "number"],
  calculatedFields: [
    {
      name: "one_week_retention_rate",
      calculate: ({ signups, retained_1_week }) => retained_1_week / signups,
      dataTypes: ["number"],
      format: "pct",
    },
    {
      name: "one_month_retention_rate",
      calculate: ({ signups, retained_1_month }) => retained_1_month / signups,
      dataTypes: ["number"],
      format: "pct",
    },
    {
      name: "two_month_retention_rate",
      calculate: ({ signups, retained_2_months }) => retained_2_months / signups,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "day",
  correctAnswers: [
    "The share of paid users as been steadily increasing and those users have very low retention rates leading to lower retention overall.",
    "Retention rates have been decreasing gradually over the past four months due to an increasing share of paid users.",
    "Paid users retain less, and because they're a larger share now, overall retention is dropping.",
    "Overall retention is going down as the mix shifts toward paid signups, who have lower retention.",
    "The growing share of paid users, who are less likely to stay subscribed, is pulling down our retention metrics.",
    "One-week, one-month, and two-month retention rates have been steadily declining as paid users become a larger part of the user base.",
    "The long-term retention trend shows lower retention at 1-week, 1-month, and 2-month checkpoints, driven by paid acquisition growth.",
    "Retention at 1-week, 1-month, and 2-month marks is worsening because the newer, paid-acquired users are less loyal.",
    "Our increased spend on paid marketing has led to more paid users with lower retention, pulling down our overall retention rates over time.",
    "Higher paid acquisition has shifted the signup mix towards users with worse retention.",
    "Because we are spending more on paid marketing, the quality of signups has fallen, impacting long-term retention.",
    "Retention rates are trending down due to a change in user acquisition mix — more paid users, who have lower retention than organic users.",
    "As the proportion of paid-acquired users increases, and these users retain worse, our blended retention rates are dropping.",
    "The decrease in retention is explained by a changing composition of signups toward lower-retention paid users.",
    "It looks like the user quality has declined as we've scaled marketing spend, impacting retention.",
    "More aggressive paid acquisition might be leading to users who are less engaged long-term.",
    "There appears to be a retention issue tied to acquisition sources — possibly due to more paid traffic.",
    "Newer cohorts have lower retention, likely because acquisition efforts shifted toward paid channels.",
    "Retention is falling across cohorts, suggesting a systematic change in signup quality.",
    "The decline across retention measures indicates a user mix shift toward lower-retaining users.",
    "Over the last four months, we're seeing weaker retention rates at all stages, which tracks with our heavier investment into paid marketing. Paid users just don't stick around as well.",
    "Looks like our push on paid acquisition is helping short-term signup numbers but hurting long-term retention.",
  ],
  embeddingFile: "/scenarios/scenario5-embeddings.json",
  threshold: 0.8,
}

