// update the scenario import
// npx tsx app/scenarios/precomputeEmbeddings.ts

import { pipeline } from "@xenova/transformers"
import fs from "fs"
import { scenario4 } from "./scenario4"

const scn = scenario4

const embeddingFile = `/scenarios/scenario${scn.id}-embeddings.json`

const correctAnswers = scn.correctAnswers 

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
