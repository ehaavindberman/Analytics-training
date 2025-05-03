import { Flame, Leaf, FireExtinguisher, Shield, Star, FlameKindling } from "lucide-react"

type RankBadgeProps = {
  count: number
  totalTime: number
}

const rankMap = [
  { name: "Recruit", icon: <Leaf className="w-4 h-4 inline mr-1" /> },
  { name: "Trainee", icon: <FlameKindling className="w-4 h-4 inline mr-1" /> },
  { name: "Firefighter", icon: <FireExtinguisher className="w-4 h-4 inline mr-1" /> },
  { name: "Smokejumper", icon: <Flame className="w-4 h-4 inline mr-1" /> },
  { name: "Captain", icon: <Shield className="w-4 h-4 inline mr-1" /> },
  { name: "Chief", icon: <Star className="w-4 h-4 inline mr-1" /> },
]

export default function RankBadge({ count, totalTime }: RankBadgeProps) {
  const rank = rankMap[Math.min(count, rankMap.length - 1)]
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const shareText = `I've achieved the rank of ${rank.name} at FyreDrill in ${formatTime(totalTime)}! Try it yourself at fyredrill.dev`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FyreDrill Rank Achievement",
          text: shareText,
          url: "https://fyredrill.dev",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      alert("Sharing is not supported on this browser. You can copy the following:\n\n" + shareText)
    }
  }

  return (
    <div className="absolute bg-muted px-3 py-1 rounded text-sm shadow text-center">
        <p className="">
            Rank: {rank.icon}{rank.name}
            <button
                onClick={handleShare}
                className="ml-1 text-xs underline text-primary hover:text-primary/80"
            >
                Share
            </button>
        </p>
    </div>
  )
}
