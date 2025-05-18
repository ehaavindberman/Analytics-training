import mongoose, { Schema, Document } from 'mongoose'

export interface Submission extends Document {
  userId: string
  answerText: string
  scenarioId: string
  isCorrect: boolean
  threshold: number
  timeTaken: number
  submittedAt: Date
}

const SubmissionSchema = new Schema<Submission>({
  userId: { type: String, required: true },
  answerText: { type: String, required: true },
  scenarioId: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  threshold: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Submission ||
  mongoose.model<Submission>('Submission', SubmissionSchema)
