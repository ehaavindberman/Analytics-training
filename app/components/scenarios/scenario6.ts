// [Trend, location, visitors] 4 - 
// over the past 3 months the share of users from the central has slowly increased and 
// share from others has slowly dropped, the users from central signup at a lower rate 
// so the overall signup rate decreases over time.

import type { ScenarioProps } from "@/app/components/types"

export const scenario6: ScenarioProps = {
  id: 6,
  title: "Trendy declines",
  category: "intro",
  introText: [
    "Our signup rate has been steadily decreasing over the last three months, this is a worrying trend!",
    "Please investigate and let us know what is going on!",
  ],
  successText: [
    "Nice job! Over the past 3 months the share of users from the central has slowly increased and share from others has slowly dropped, the users from central signup at a lower rate.",
    "This means that the overall signup rate decreased over time, we'll have to shift our marketing focus outside of central!"
  ],
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "You inspect the app from head to toe and don't find any issues.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "There haven't been any recent code changes that could have contributed, nor were there any around 3 months ago.",
    },
    {
      icon: "Megaphone",
      label: "Ask Marketing Team",
      timeAdded: 60,
      infoText:
        "The marketing team has a heavy focus on central becasue the CMO is from there and wants their Mom to sign up finally.",
    },
  ],
  yAxisDefault: "signup_rate",
  yAxisOptions: ["visitors", "signups", "signup_rate"],
  yAxisFormats: {
    "signup_rate": "pct",
    "visitors": "number",
    "signups": "number",
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "signups": "Number of signups on the site per day",
    "signup_rate": "Signups / Visitors",
  },
  breakdowns: ["channel", "device", "browser", "location"],
  filters: {
    "channel": ["organic", "paid"],
    "device": ["mobile", "desktop", "tablet"],
    "browser": ["chrome", "firefox", "safari"],
    "location": ["northern", "southern", "eastern", "western", "central"],
  },
  headers: ["date", "device", "browser", "channel", "location", "visitors", "signups"],
  types: ["date", "string", "string", "string", "string", "number", "number"],
  calculatedFields: [
    {
      name: "signup_rate",
      requiredFields: ["signups", "visitors"],
      calculate: ({ signups, visitors }) => signups / visitors,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "date",
  correctAnswers: [
    "the percentage of users visiting from central has increased and they have a lower signup rate, so our overall signup rate has decreased, however overall signups have remained constant.",
    "more people coming from central with a lower signup rate.",
    "There is a higher rate of visitors from central. These users have a lower signup rate than elsewhere. This means that the overall signup rate has decreased. However, the overall signups have stayed steady.",
    "Central region traffic is up, but their signup rate is lower, so total signup rate has dropped.",
    "Signup rate decline due to more users from central who convert less.",
    "User share shifted toward central, where signup rate is lower.",
    "Traffic is rising from central, where signup rate is weaker, so overall rate falls.",
    "More visitors from central = lower conversion = lower overall signup rate.",
    "The central region has been contributing a growing share of users, but they convert less, lowering overall signup rate.",
    "Visitors from central have increased over the last few months, and since they have a lower signup rate, this has caused the overall rate to decline.",
    "We're seeing more users from central, but since they sign up less often, it brings the total signup rate down.",
    "Although signups haven't changed much, the signup rate has dropped due to more low-converting users from central.",
    "A shift in user distribution toward central, where signup rates are lower, is driving down our average signup rate.",
    "Over the last three months, user traffic has increasingly come from the central region. These users have a lower signup rate than users from other regions, resulting in a gradual decline in the overall signup rate. Total signups have remained stable because the total number of users hasn't changed significantly.",
    "The overall signup rate has been falling, not due to fewer users or a drop in interest, but because a growing proportion of our users now come from the central region, which has historically shown lower conversion rates.",
    "There's been a slow regional shift in traffic toward central. Because central users sign up at a lower rate than others, even though total traffic and signups have remained steady, the signup rate appears to drop.",
    "A change in regional composition—more users from central, fewer from other regions—explains the decrease in signup rate. Central users are less likely to sign up, so the mix shift lowers the average.",
    "Central users have increased in share over the past quarter. Their lower propensity to sign up is driving down the site's average signup rate, even though the absolute number of signups isn't declining.",
  ],
  embeddingFile: "/scenarios/scenario6-embeddings.json",
  threshold: 0.8,
}

