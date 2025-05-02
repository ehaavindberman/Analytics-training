import { useEffect } from "react"
import { pipeline } from "@xenova/transformers"

type CorrectAnswerEmbedding = {
  answer: string
  embedding: number[]
}

export async function testUserAnswer(
  userAnswer: string,
  threshold: number,
  embeddingFile: string
): Promise<boolean> {
  const response = await fetch(embeddingFile)
  const correctData: CorrectAnswerEmbedding[] = await response.json()

  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")

  const userEmbedding = Array.from(
    (await embedder(userAnswer, { pooling: "mean", normalize: true })).data
  )

  function cosineSimilarity(a: number[], b: number[]) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    return dot / (magA * magB)
  }

  const similarities = correctData.map(({ embedding }) => cosineSimilarity(userEmbedding, embedding))
  const bestScore = Math.max(...similarities)
  const isCorrect = bestScore >= threshold

  return isCorrect
}
