"use client"

import { Button } from "@/components/ui/button"

type Props = {
  onStart: () => void
}

export default function GameIntro({ onStart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-primary mb-4 animate-pulse">Analytics Adventure</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Embark on a journey through data, uncover insights, and become the ultimate analytics hero!
        </p>
        <div className="space-y-4">
          <p className="text-lg">
            In this adventure, you'll face challenging scenarios that will test your analytical skills.
          </p>
          <p className="text-lg">Are you ready to dive into the world of data and make game-changing discoveries?</p>
        </div>
        <Button
          onClick={onStart}
          size="lg"
          className="mt-8 text-xl px-8 py-6 animate-bounce bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Start Your Adventure
        </Button>
      </div>
    </div>
  )
}

