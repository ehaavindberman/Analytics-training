import { Flame, Leaf, FireExtinguisher, Shield, Star, FlameKindling, ClipboardCopy, Check } from "lucide-react"
import { useState } from "react"


type RankBadgeProps = {
  count: number
  totalTime: number
}

const rankMap = [
  { name: "Recruit", icon: <Leaf className="w-4 h-4 inline mr-1" /> },
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

  const shareText = `🔥🔥🤓 I've achieved the rank of ${rank.name} at 🔥FyreDrill🔥 in ${formatTime(totalTime)}! Try it yourself at fyredrill.dev 👀🔥🔥`

   
  const [showPopup, setShowPopup] = useState(false)
  const [copied, setCopied] = useState(false)

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
      setShowPopup(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="absolute bg-muted px-3 py-1 rounded text-sm shadow text-center">
        
        <p className="">
            Rank: {rank.icon}{rank.name}
            {count > 0 && (
                <button
                    onClick={handleShare}
                    className="ml-1 text-xs underline text-primary hover:text-primary/80"
                >
                    Share
                </button>
            )}
        </p>
        { showPopup && (
        <div className="mt-2 bg-background border border-border rounded p-3 shadow-lg w-64">
          <p className="text-sm mb-2">{shareText}</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
          >
            {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="block mt-2 text-xs underline text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>
      )}
    </div>

  )
}
