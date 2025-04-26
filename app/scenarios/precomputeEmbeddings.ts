// paste in the correct answers and the scenario and run
// npx tsx app/scenarios/precomputeEmbeddings.ts

import { pipeline } from "@xenova/transformers"
import fs from "fs"

const embeddingFile = "/scenarios/scenario3-embeddings.json"

const correctAnswers = [
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
  ]

async function precompute() {

  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")

  const embeddings = await Promise.all(
    correctAnswers.map(async (text) => {
      const output = await embedder(text, { pooling: "mean", normalize: true })
      return Array.from(output.data)
    })
  )

  const data = correctAnswers.map((answer, idx) => ({
    answer,
    embedding: embeddings[idx]
  }))

  fs.writeFileSync(`./public/${embeddingFile}`, JSON.stringify(data, null, 2))
  console.log("✅ Embeddings saved!")
}

precompute()
