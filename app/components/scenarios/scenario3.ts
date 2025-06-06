import type { ScenarioProps } from "@/app/components/types"

export const scenario3: ScenarioProps = {
  id: 3,
  title: "Signup rate drop!",
  category: "intro",
  introText: [
    "The CMO was poking around in our dashbaords and noticed that the last few days we've had a decrease in signup rates!",
    "Let's get this resolved quickly for them. Submit your answer below.",
  ],
  successText: [
    "Great work noticing the organic visits have increased, but these new visitors aren't signing up, leading to overall lower signup rates but not impacting signups overall.",
  ],
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
    "Organic traffic increased and signup rates dropped.",
    "More visitors from organic search aren't converting.",
    "Organic traffic spike brought low-intent users.",
    "Signup rates fell because organic visitors aren't signing up.",
    "The new organic traffic isn't leading to signups.",
    "We got more organic visitors, but they aren't converting.",
    "Signup rate decreased due to low-intent organic traffic.",
    "Although organic traffic has gone up, the signup rate dropped because the new visitors are less likely to sign up.",
    "An influx of low-intent visitors from organic sources has reduced the overall signup rate.",
    "Signups have stayed stable, but because many more organic users are visiting without signing up, the signup rate fell.",
    "A surge in organic traffic is bringing visitors who aren't converting, which explains the lower signup rate.",
    "The drop in signup rates is due to higher organic visitor volume without a corresponding increase in signups.",
    "The recent boost in organic visitors came from users less likely to sign up, hurting our conversion rate.",
    "While total traffic increased because of a spike in organic visits, the signup rate decreased since these new visitors are low intent and not signing up.",
    "Organic visitor numbers rose sharply, but the quality of these visitors is lower. Since they aren't signing up at the usual rate, the overall signup rate fell.",
    "The analytics show that organic traffic has increased, but this new traffic consists mostly of low-intent users who aren't converting, which has pulled down the signup rate.",
    "There's been a spike in organic visitors recently, but many of them don't seem interested in signing up. As a result, even though traffic is up, the signup rate is down.",
    "Organic sources drove more visitors to the site, but because those visitors are less engaged or lower intent, the signup rate dropped even though total visits went up.",
    "The signup rate decline isn't from a drop in signups, but from an increase in visitors (mostly from organic traffic) who aren't signing up.",
    "xVisitors in social channel decreased. This channel makes up the majority of visitors and signups. Therefore, the decrease in visitors to social channel decreased sign-ups overall.",
  ],
  embeddingFile: "/scenarios/scenario3-embeddings.json",
  threshold: 0.8,
}

