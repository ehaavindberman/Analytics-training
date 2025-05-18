import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let isConnected = false

export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'training-app',
    })
    isConnected = true
    return mongoose
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
