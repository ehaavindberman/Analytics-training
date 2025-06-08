import type { ScenarioProps } from "@/app/components/types"

export const scenario7: ScenarioProps = {
  id: 7,
  title: "CA(t)C(h) me if you can",
  category: "sweater",
  introText: [
    "Our CFO has noticed a concerning trend in Customer Acquisition Cost (CAC), it's been going up for the past three months.",
    "Can you tell us what's going on?",
  ],
  successText: [
    "Congratulations on figuring out that our marketing team has been busy optimizing but unfortuantely, we're increasing our increase in spend has brought in more expensive users to convert and has cannibalized some of our previously free traffic.",
    "This has meant that we get more mobile and new users and the CAC for those users has slightly decreased, but their CAC is higher overall, bringing CAC up at the top level."
  ],
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "Nothing stands out to you on the site, everything seems to be working as it should.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "No significant code changes releases have happened recently that stick out.",
    },
    {
      icon: "Megaphone",
      label: "Ask Marketing Team",
      timeAdded: 60,
      infoText:
        "We've been doing a ton of optimization the last quarter and have slightly driven down CAC for the users we spend on and have been increasing spend as a result!",
    },
  ],
  yAxisDefault: "CAC",
  yAxisOptions: ["CAC", "sale_rate", "visitors", "sales", "spend"],
  yAxisFormats: {
    "CAC": "currency",
    "sale_rate": "pct",
    "visitors": "number",
    "sales": "number",
    "spend": "currency"
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "sales": "Number of sweaters sold on the site per day",
    "sale_rate": "Sales / Visitors",
    "spend": "Amount spent on marketing per day",
    "CAC": "Customer acquisition cost (Spend / Sales)"
  },
  breakdowns: ["returning_user", "channel", "location", "device"],
  filters: {
    "returning_user": ["returning", "new"],
    "channel": ["organic", "paid", "social", "email"],
    "device": ["mobile", "desktop"],
    "location": ["northern", "southern", "eastern", "western", "central"],
  },
  headers: ["day", "location", "browser", "device", "channel", "returning_user", "visitors", "sales", "spend"],
  types: ["date", "string", "string", "string", "string", "string", "number", "number", "number"],
  calculatedFields: [
    {
      name: "CAC",
      requiredFields: ["sales", "spend"],
      calculate: ({ sales, spend }) => spend / sales,
      dataTypes: ["number"],
      format: "currency",
    },
    {
      name: "sale_rate",
      requiredFields: ["sales", "visitors"],
      calculate: ({ sales, visitors }) => sales / visitors,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "day",
  correctAnswers: [
    "You're wasting money bringing in people who would otherwise visit (i.e. organic now labeled as paid) and also bringing in new users who generally speaking are more costly, hence driving CAC up",
    "Our spend is focused on new users and mobile users from paid social and paid search channels. These users generally have higher CAC leading to an overall increase.",
    "As spend rises on paid search and paid social, CAC rises because this brings in mobile users who have higher CAC",
    "Our spend is cannibalising some of our previously free traffic and also adding low intent users (i.e. mobile, paid, and new)",
    "Increased spend is bringing in costlier users and cannibalizing free ones, so CAC is going up.",
    "More mobile and paid/social users means higher acquisition costs.",
    "Paid channels are adding users with higher CAC, pushing the average up.",
    "We're paying for users we used to get for free, plus bringing in more expensive ones.",
    "As we shift toward paid and mobile users, overall CAC increases.",
    "Marketing efforts are increasing mobile and paid/social traffic, which tend to have higher CACs. This leads to a rise in average CAC.",
    "We're now acquiring more users through paid channels, including mobile users who cost more to acquire. This raises the overall CAC even though their individual CAC might be slightly down.",
    "By investing in paid and social, we're attracting users with higher base CACs, and also converting traffic we might have gotten organically before.",
    "More spend on mobile and social is increasing volume, but these users have higher acquisition costs, raising our overall CAC.",
    "The change in user mix—more mobile, more paid—explains why CAC is rising, even if CAC per user segment is slightly down.",
    "Our marketing investments are shifting the traffic mix toward paid and social sources, especially on mobile. While CAC for these users has decreased slightly, they still have a higher base CAC compared to organic users, resulting in a higher overall CAC.",
    "The rise in CAC is due to two effects: we're now acquiring more users via paid and social channels, who tend to be more expensive, and we're likely cannibalizing some organic traffic we previously acquired for free.",
    "Although mobile and paid users have seen slightly lower CACs individually, the increased reliance on these channels is replacing cheaper or free acquisition sources. This mix shift is increasing overall CAC.",
    "Our CAC is increasing because we're spending more on acquiring users via paid social and mobile channels. These users, while slightly more efficient, still cost more than organic or direct traffic, and their growing share of total users raises the average.",
    "As we expand into paid and social channels and reach more mobile users, our user base becomes more expensive to acquire. Even if marginal CACs drop slightly, the total CAC rises because we're relying less on free or low-cost sources.",
    "CAC has been increasing because we've increased our spend on mobile and new users which is cannibalizing organic visitors which have a CAC of 0.",
  ],
  embeddingFile: "/scenarios/scenario7-embeddings.json",
  threshold: 0.8,
}

