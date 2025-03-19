import type { ScenarioData } from "./types"

export const scenario2: ScenarioData = {
  id: 2,
  title: "The Social Media Conundrum",
  description: "Investigate the peculiar changes in visitor patterns across channels.",
  introText: [
    "Excellent work on your previous mission! Now, we face a new enigma. Our visitor patterns have suddenly shifted, and we suspect it's affecting our mobile users from social media channels.",
    "Your task: Analyze the data, pinpoint the changes in visitor behavior, and uncover the truth behind this social media mystery.",
    "New feature: In addition to inspecting the app, you can now check the release cycle. This will add 1 minute to your time.",
  ],
  successText: [
    "You correctly identified that mobile visitors from the social channel dropped by half starting from the 8th day. This observation is vital for understanding changes in user behavior and the effectiveness of our marketing channels.",
    "In practice, this insight would lead to an investigation of recent changes in social media algorithms, our social media campaign strategies, or potential issues with how our content is displayed on mobile devices from social media links.",
  ],
  correctFindingsKeywords: ["mobile", "social", "visitors"],
  feedbackText: {
    correct:
      "Excellent work! You've correctly identified that mobile visitors from the social channel dropped by half.",
    incorrect: "Not quite. Try looking at the visitors for different devices and channels.",
  },
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "Your app inspection reveals that the social media sharing buttons on mobile devices are not functioning correctly. This could explain the drop in mobile visitors from social channels.",
    },
    {
      icon: "Code",
      label: "Check Release Cycle",
      timeAdded: 60,
      infoText:
        "The release cycle information shows that a new update was pushed 8 days ago, which included changes to the mobile UI and social media integration.",
    },
  ],
  dataGenerationRules: (day) => {
    if (day >= 8) {
      return {
        channelDistribution: {
          social: 0.5, // Reduce social traffic
        },
        deviceDistribution: {
          mobile: 0.5, // Reduce mobile traffic from social channels
        },
      }
    }
    return {}
  },
}

