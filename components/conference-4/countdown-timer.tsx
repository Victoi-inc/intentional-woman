"use client";

import { useEffect, useMemo, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function computeTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) return ZERO_TIME;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

interface CountdownProps {
  /** ISO 8601 string for the target moment. */
  targetIso: string;
  variant?: "compact" | "large";
  className?: string;
  /** Surface the timer sits on — controls neutral text/border colors. */
  tone?: "dark" | "light";
}

export function CountdownTimer({
  targetIso,
  variant = "large",
  className = "",
  tone = "dark",
}: CountdownProps) {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>(ZERO_TIME);

  useEffect(() => {
    setMounted(true);
    setTime(computeTimeLeft(targetMs));
    const id = window.setInterval(() => {
      setTime(computeTimeLeft(targetMs));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const reachedZero =
    mounted &&
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  const labelText = tone === "dark" ? "text-iw-white/70" : "text-iw-purple/55";
  const numberText = tone === "dark" ? "text-iw-white" : "text-iw-purple";

  if (variant === "compact") {
    const items: Array<{ value: number; label: string }> = [
      { value: time.days, label: "Days" },
      { value: time.hours, label: "Hrs" },
      { value: time.minutes, label: "Min" },
      { value: time.seconds, label: "Sec" },
    ];
    return (
      <div
        className={`flex items-center gap-2 sm:gap-3 ${className}`}
        aria-live="off"
        suppressHydrationWarning
      >
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`font-display text-base font-semibold leading-none tabular-nums sm:text-lg ${numberText}`}
              >
                {mounted ? pad(item.value) : "--"}
              </span>
              <span
                className={`font-accent mt-1 text-[8px] font-bold uppercase tracking-[0.18em] sm:text-[9px] ${labelText}`}
              >
                {item.label}
              </span>
            </div>
            {i < items.length - 1 ? (
              <span
                className={`font-display text-base font-semibold leading-none ${numberText} opacity-50`}
                aria-hidden
              >
                :
              </span>
            ) : null}
          </div>
        ))}
        {reachedZero ? (
          <span className="sr-only">The event has started.</span>
        ) : null}
      </div>
    );
  }

  const blockBorder =
    tone === "dark" ? "border-iw-gold/30" : "border-iw-purple/15";
  const blockBg = tone === "dark" ? "bg-iw-purple/40" : "bg-iw-white";

  const items: Array<{
    value: number;
    shortLabel: string;
    longLabel: string;
  }> = [
    { value: time.days, shortLabel: "Days", longLabel: "Days" },
    { value: time.hours, shortLabel: "Hrs", longLabel: "Hours" },
    { value: time.minutes, shortLabel: "Min", longLabel: "Minutes" },
    { value: time.seconds, shortLabel: "Sec", longLabel: "Seconds" },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-2 sm:gap-3 ${className}`}
      aria-live="off"
      suppressHydrationWarning
    >
      {items.map((item) => (
        <div
          key={item.longLabel}
          className={`flex flex-col items-center rounded-xl border ${blockBorder} ${blockBg} px-2 py-4 backdrop-blur-sm sm:px-3 sm:py-5`}
        >
          <span
            className={`font-display text-3xl font-semibold leading-none tabular-nums sm:text-4xl md:text-5xl ${numberText}`}
          >
            {mounted ? pad(item.value) : "--"}
          </span>
          <span
            className={`font-accent mt-2 text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] ${labelText}`}
          >
            <span className="sm:hidden">{item.shortLabel}</span>
            <span className="hidden sm:inline">{item.longLabel}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
