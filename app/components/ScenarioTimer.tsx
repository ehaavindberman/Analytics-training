type Props = {
  time: number
  isRunning: boolean
}

export function ScenarioTimer({ time, isRunning }: Props) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return <div className="text-lg font-semibold">Time: {formatTime(time)}</div>
}

