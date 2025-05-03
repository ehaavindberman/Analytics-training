import { pipeline } from "@xenova/transformers"

type CorrectAnswerEmbedding = {
  answer: string
  embedding: number[]
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dot / (magA * magB)
}

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean)
}

export async function testUserAnswer(
  userAnswer: string,
  threshold: number,
  embeddingFile: string
): Promise<boolean> {
  const response = await fetch(embeddingFile)
  const correctData: CorrectAnswerEmbedding[] = await response.json()

  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")

  const userParts = [userAnswer, ...splitIntoSentences(userAnswer)]

  for (const part of userParts) {
    const embedding = Array.from(
      (await embedder(part, { pooling: "mean", normalize: true })).data
    )

    const similarities = correctData.map(({ embedding: correctEmbedding }) =>
      cosineSimilarity(embedding, correctEmbedding)
    )

    const bestScore = Math.max(...similarities)
    if (bestScore >= threshold) {
      return true
    }
  }

  return false
}
