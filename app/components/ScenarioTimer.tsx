import { useState, useEffect } from 'react';

type Props = {
  isRunning: boolean;
  onComplete: (time: number) => void;
};

export function ScenarioTimer({ isRunning, onComplete }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (time > 0) {
      onComplete(time);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-lg font-semibold">
      Time: {formatTime(time)}
    </div>
  );
}

