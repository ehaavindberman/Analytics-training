import type { ScenarioProps } from "../components/types"

export const scenario4: ScenarioProps = {
  id: 4,
  title: "Sweater Weather",
  introText: [
    "Welcome to Sweater Weather! We sell sweaters to real people. We've just noticed that our sale rate has decreased.",
    "Can you tell us what's going on there and if it is effecting revenue?",
  ],
  successText: [
    "Great work figuring out that since we released the new fancy sweaters, we've had fewer people purchasing but overall revenue is not impacted.",
    "We'll have to sit as a team and discuss if we care more about volume or revenue in this case."
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
        "You notice a new sweater on the market! It is beautiful and a little fancy for your taste.",
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
        "No big changes in marketing have happened in the past couple of days. Everything is working as expected. But we did launch that new sweater!",
    },
  ],
  yAxisDefault: "sale_rate",
  yAxisOptions: ["sale_rate", "revenue", "visitors", "sales"],
  yAxisFormats: {
    "sale_rate": "pct",
    "revenue": "currency",
    "visitors": "number",
    "sales": "number",
  },
  breakdowns: ["returning_user", "channel", "sweater", "device"],
  filters: {
    "returning_user": ["returning", "new"],
    "sweater": ["fancy", "regular", "none"],
    "channel": ["organic", "paid", "social", "email"],
    "device": ["mobile", "desktop"],
  },
  headers: ["day", "device", "returning_user", "sweater", "channel", "visitors", "sales", "revenue"],
  types: ["date", "string", "string", "string", "string", "number", "number", "number"],
  calculatedFields: [
    {
      name: "sale_rate",
      calculate: ({ sales, visitors }) => sales / visitors,
      dataTypes: ["number"],
      format: "pct",
    },
  ],
  xAxis: "day",
  correctAnswers: [
    "Revenue has increased despite a lower sale rate.",
    "The sale rate has dropped, but total revenue is up.",
    "Even though fewer units are being sold, higher prices are driving more revenue.",
    "Overall revenue is higher because each purchase generates more revenue.",
    "The sale rate is lower, but the higher price of sweaters is compensating for it.",
    "The new sweater launch introduced more expensive products, leading to higher revenue even though the sale rate declined.",
    "The launch of pricier sweaters explains the decrease in purchase volume but the increase in total revenue.",
    "The recent sweater release seems to have caused fewer purchases at a higher price point.",
    "After the new sweater release, shoppers are buying less often, but spending more per item.",
    "The new sweaters are more expensive, resulting in fewer purchases but increased revenue.",
    "Although the purchase rate has fallen, the average order value appears to have risen, boosting total revenue.",
    "Sales are down in terms of volume, but revenue has increased, suggesting higher-priced items are being sold.",
    "There's a decline in sale rate, but an increase in average purchase value.",
    "The drop in conversion rate is offset by a higher average revenue per purchase.",
    "Revenue is up even though the number of purchases is down.",
    "Higher-priced items are compensating for the lower conversion rates, leading to increased revenue.",
    "The data suggests a strategic shift toward higher-margin products.",
    "The revenue increase indicates that customers who do purchase are spending more per transaction.",
    "Lower sales volume combined with higher revenue implies a rise in average selling price.",
    "The decrease in units sold is outweighed by the higher price point of the new products.",
    "The sale rate has decreased because there appears to be a new sweater type, called fancy, that is distracting users from purchasing, but it more than makes up for that fact with the revenue impact which has been positive.",
  ],
  embeddingFile: "/scenarios/scenario4-embeddings.json",
  threshold: 0.8,
}

