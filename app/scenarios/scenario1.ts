import type { ScenarioData } from "./types"

export const scenario1: ScenarioData = {
  id: 1,
  title: "The Vanishing Signups",
  description: "Uncover the mystery behind the sudden drop in the signup rate",
  introText: [
    "Your stakeholders have noticed that the signup rate has decreased for the last few days.",
    "Your task is to figure out why, submit your answer below!"
  ],
  successText: [
    "You successfully identified that mobile signups dropped significantly after the 8th day. This kind of insight is crucial for quickly addressing issues that affect user acquisition.",
    "In a real-world scenario, this finding would prompt an investigation into recent changes in the mobile app or signup process, potentially uncovering a bug or UX issue that needs to be fixed.",
  ],
  correctFindingsKeywords: ["mobile", "signup"],
  feedbackText: {
    correct: "Correct! You've identified that mobile signups dropped significantly.",
    incorrect: "Not quite. Try looking at the signup rates for different devices.",
  },
  extraInfoButtons: [
    {
      icon: "Glasses",
      label: "Inspect App",
      timeAdded: 30,
      infoText:
        "Upon inspecting the app, you notice that the mobile signup process seems to have a new step that wasn't there before. This additional step might be causing friction for mobile users.",
    },
  ],
  yAxis: "signup_rate",
}

