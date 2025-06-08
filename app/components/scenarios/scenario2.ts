import type { ScenarioProps } from "@/app/components/types"

export const scenario2: ScenarioProps = {
  id: 2,
  title: "Where'd the sales go?",
  category: "sweater",
  introText: [
    "We're back with another issue. This time the product team noticed that sales have been low for the past few days",
    "Your task is to figure out what's going on.",
  ],
  successText: [
    "Great work finding that social visitors radically decreased, we took this to the social team and they found an issue with the links on their most recent posts which they've quickly fixed.",
  ],
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "You don't find any issues with the sales flow from the social entrypoints.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "The release cycle information shows there have been some small changes with the urls for our website",
    }
  ],
  yAxisDefault: "sales",
  yAxisOptions: ["visitors", "sales", "sale_rate"],
  breakdowns: ["device", "browser", "channel"],
  yAxisFormats: {
    "visitors": "number",
    "sales": "number",
    "sale_rate": "pct",
  },
  dataDictionary: {
    "visitors": "Number of visitors to the site per day",
    "sales": "Number of sweaters sold on the site per day",
    "sale_rate": "Sales / Visitors",
  },
  filters: {
    "device": ["desktop", "mobile", "tablet"],
    "browser": ["chrome", "firefox", "safari", "edge"],
    "channel": ["organic", "paid", "social", "email"],
  },
  headers: ["day", "device", "browser", "channel", "visitors", "sales"],
  types: ["date", "string", "string", "string", "number", "number"],
  calculatedFields: [
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
    "Social visitors are down",
    "Visitors from social have dropped",
    "The social channel had a drop in visitors",
    "Social traffic dropped sharply, causing fewer sales.",
    "There was a big decline in social visitors, which impacted sales.",
    "Social referrals are way down, leading to fewer sales.",
    "Sales dropped because fewer people are coming from social.",
    "Social traffic is down significantly, affecting conversions.",
    "Visitor volume from social is much lower recently.",
    "Social link traffic declined, which hurt sales numbers.",
    "The number of users coming from social media sources has decreased a lot, resulting in lower sales overall.",
    "Sales are down because social channels, which normally bring in many users, saw a large drop in traffic.",
    "It looks like social media visitors have decreased significantly over the last few days, which explains the decline in sales.",
    "Traffic from social posts has fallen off recently, and because social visitors usually convert well, the sale rate dropped.",
    "The reduction in social media referrals led to fewer visitors and, as a result, fewer sales.",
    "The dip in sales can be traced back to a decrease in social media-driven traffic.",
    "A major source of our sales — social traffic — has dropped considerably in the last few days. Since social users normally account for a large percentage of sales, the overall sales numbers have fallen as well.",
    "Sales have fallen mainly because we've lost a big chunk of our social traffic. This channel usually drives a lot of conversions, so the lower visitor numbers from social media have had a major impact.",
    "The sales decline correlates with a significant decrease in visitors arriving from social media platforms. Although other channels are steady, the drop in social traffic has heavily influenced overall sale rates.",
    "There was a noticeable decrease in social channel traffic recently. Given that social users historically make up a large share of our sales, this drop explains the recent dip in overall sales.",
    "Most other traffic sources remain stable, but social traffic has fallen substantially. Since social users typically buy sweaters at a high rate, the reduced volume directly caused the decrease in total sales.",
  ],
  embeddingFile: "/scenarios/scenario2-embeddings.json",
  threshold: 0.8,
}

