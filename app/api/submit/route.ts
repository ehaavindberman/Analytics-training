import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'
import SubmissionModel from '@/models/SubmissionModel'

export async function POST(req: Request) {
    try {
      await connectDB()
  
      const body = await req.json()
  
      const submission = new SubmissionModel({
        userId: body.userId,
        answerText: body.answerText,
        scenarioId: body.scenarioId,
        isCorrect: body.isCorrect,
        threshold: body.threshold,
        timeTaken: body.timeTaken,
        submittedAt: new Date(),
      })
  
      await submission.save()
  
      return NextResponse.json({ ok: true })
    } catch (error) {
      return NextResponse.json({ success: false, error: "Failed to save submission" }, { status: 500 })
    }
  }
