import { useEffect, useState } from "react";

export function useCountdown(target: string) {
  const calculate = () => Math.max(0, new Date(target).getTime() - Date.now());
  const [remaining, setRemaining] = useState(calculate);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    live: remaining === 0,
  };
}