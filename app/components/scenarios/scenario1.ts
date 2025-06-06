import type { ScenarioProps } from "@/app/components/types"

export const scenario1: ScenarioProps = {
  id: 1,
  title: "Warmup Challenge",
  category: "intro",
  introText: [
    "Your CEO noticed that the signup rate has decreased for the last few days!",
    "Your task is to figure out why. Submit your answer below."
  ],
  successText: [
    "Great work, you noticed that mobile signups dropped to none impacting the overall signup rate.",
    "We'll get the devs on it, sounds like a recent addition to the mobile signup flow is stopping users from actually signing up!",
  ],
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "Upon inspecting the app, you notice that the mobile signup process seems to have a new step that wasn't there before. This additional step might be causing friction for mobile users.",
    },
  ],
  yAxisDefault: "signup_rate",
  yAxisOptions: ["visitors", "signups", "signup_rate"],
  yAxisFormats: {
    "visitors": "number",
    "signups": "number",
    "signup_rate": "pct",
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "signups": "Number of signups on the site per day",
    "signup_rate": "Signups / Visitors",
  },
  breakdowns: ["device", "browser", "channel"],
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
      requiredFields: ["signups", "visitors"],
      calculate: ({ signups, visitors }) => signups / visitors,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "day",
  correctAnswers: [
    "Mobile signups dropped to zero two days ago and have stayed there. This indicates that there is an issue with the mobile signup flow",
    "The signup rate has decreased becasue there are no signups for mobile users for the last two days",
    "Mobile users cannot signup but they still can visit",
    "There was a sudden and complete drop in mobile signups starting two days ago.",
    "While desktop signups have remained relatively stable, mobile signups have dropped to zero, which is driving the overall decline in signups.",
    "The data shows that mobile users are no longer completing the signup process.",
    "It looks like something broke in the mobile signup process.",
    "Mobile users have not signed up at all for the last couple of days.",
    "There's a strong correlation between the total signup drop and the disappearance of mobile signups.",
    "Mobile conversions have flatlined to zero.",
    "The drop in total signups can be attributed entirely to mobile users.",
    "Signups from mobile have stopped completely.",
    "Signups from desktop remain steady, but mobile traffic is no longer converting.",
    "The issue seems isolated to mobile — signups from mobile users stopped suddenly.",
    "Mobile signups were previously steady but are now nonexistent.",
    "This implies a failure in the mobile signup flow that began two days ago.",
    "There's a sharp decline in mobile user signups, which have hit zero.",
    "Given that mobile users still visit but don't sign up",
    "Desktop signups haven't changed, but mobile signups have dropped to zero.",
    "There was a sharp and sudden stop in mobile signups, starting two days ago.",
    "It appears mobile users are experiencing an issue preventing them from signing up.",
    "There has been no mobile signup activity for the past two days, even though traffic remains.",
    "Mobile signups are zero two days ago",
  ],
  embeddingFile: "/scenarios/scenario1-embeddings.json",
  threshold: 0.8,
}
