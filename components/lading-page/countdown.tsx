"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({
  targetDate = new Date(Date.now() + 1000000000),
}: CountdownProps) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-6xl font-semibold">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-sm sm:text-lg font-medium tracking-wider uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center space-x-6 sm:space-x-12 p-4">
      <TimeUnit value={timeLeft.days} label="days" />
      <TimeUnit value={timeLeft.hours} label="hours" />
      <TimeUnit value={timeLeft.minutes} label="minutes" />
      <TimeUnit value={timeLeft.seconds} label="seconds" />
    </div>
  );
}
