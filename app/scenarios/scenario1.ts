import type { ScenarioData } from "./types"

export const scenario1: ScenarioData = {
  id: 1,
  title: "Warmup Challenge 1",
  description: "Uncover the mystery behind the sudden drop in the signup rate",
  introText: [
    "Your CEO noticed that the signup rate has decreased for the last few days!",
    "Your task is to figure out why. Submit your answer below."
  ],
  successText: [
    "Great work, you noticed that mobile signups dropped to none impacting the overall signup rate.",
    "We'll get the devs on it, sounds like a recent addition to the mobile signup flow is stopping users from actually signing up!",
  ],
  correctFindingsKeywords: ["mobile", "signup"],
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
        "Upon inspecting the app, you notice that the mobile signup process seems to have a new step that wasn't there before. This additional step might be causing friction for mobile users.",
    },
  ],
  yAxis: "signup_rate",
}

