"use client"

import { Button } from "@/components/ui/button"

type Props = {
  onStart: () => void
}

export default function GameIntro({ onStart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-primary mb-4">🔥 FyreDrill 🔥</h1>
        <div className="hand-drawn-font">
          <p className="text-3xl mb-8">
            Welcome recruit to FyreDrill, the ultimate tool to hone your analytical thinking and quickly put out data fires.
          </p>
          <div className="space-y-4">
            <p className="text-lg">Are you ready to dive into the inferno?</p>
          </div>
          <Button
            onClick={onStart}
            size="lg"
            className="mt-8 text-3xl px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
          >
            Start Your Adventure
          </Button>
        </div>
      </div>
    </div>
  )
}

