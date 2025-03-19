import { addDays, format } from "date-fns"
import { scenarios } from "@/app/scenarios"

type VisitorData = {
  date: string
  hour: number
  device: "desktop" | "mobile" | "tablet"
  browser: "chrome" | "firefox" | "safari" | "edge"
  channel: "organic" | "paid" | "social" | "email"
  isSignup: boolean
}

const devices = ["desktop", "mobile", "tablet"] as const
const browsers = ["chrome", "firefox", "safari", "edge"] as const
const channels = ["organic", "paid", "social", "email"] as const

function getRandomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateHourlyVisitors(date: Date, baseVisitors: number, scenario: number, dayIndex: number): VisitorData[] {
  const visitors: VisitorData[] = []
  const scenarioRules = scenarios[scenario - 1].dataGenerationRules(dayIndex)

  for (let hour = 0; hour < 24; hour++) {
    const hourlyFactor = Math.sin(((hour - 6) * Math.PI) / 12) * 0.5 + 1 // More visitors during daytime
    const visitorCount = Math.floor(baseVisitors * hourlyFactor * (scenarioRules.visitorMultiplier || 1))

    for (let i = 0; i < visitorCount; i++) {
      const device = getRandomElement(devices)
      const browser = getRandomElement(browsers)
      const channel = getRandomElement(channels)

      // Apply scenario-specific rules
      if (scenarioRules.deviceDistribution && Math.random() > (scenarioRules.deviceDistribution[device] || 1)) {
        continue // Skip this visitor based on device distribution rule
      }
      if (scenarioRules.channelDistribution && Math.random() > (scenarioRules.channelDistribution[channel] || 1)) {
        continue // Skip this visitor based on channel distribution rule
      }

      let signupProbability = 0.1 // Base signup rate
      if (device === "desktop") signupProbability *= 1.2
      if (browser === "chrome") signupProbability *= 1.1
      if (channel === "paid") signupProbability *= 1.3

      signupProbability *= scenarioRules.signupProbabilityMultiplier || 1

      const isSignup = Math.random() < signupProbability

      visitors.push({
        date: format(date, "yyyy-MM-dd"),
        hour,
        device,
        browser,
        channel,
        isSignup,
      })
    }
  }
  return visitors
}

export function generateDataset(startDate: Date, days: number, scenario: number): VisitorData[] {
  let allData: VisitorData[] = []
  for (let i = 0; i < days; i++) {
    const currentDate = addDays(startDate, i)
    const dailyVisitors = generateHourlyVisitors(currentDate, 1000, scenario, i)
    allData = allData.concat(dailyVisitors)
  }
  return allData
}

