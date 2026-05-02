import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const BALLOON_COLORS = [
  "oklch(0.75 0.2 25)",   // pink-red
  "oklch(0.78 0.18 80)",  // yellow
  "oklch(0.72 0.18 150)", // green
  "oklch(0.72 0.2 240)",  // blue
  "oklch(0.7 0.22 320)",  // purple
  "oklch(0.78 0.18 50)",  // orange
];

const CONFETTI_COLORS = [
  "#FFD166", "#EF476F", "#06D6A0", "#118AB2", "#C77DFF", "#FFADAD",
];

export function BirthdayAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const balloons = Array.from({ length: 9 });
  const confetti = Array.from({ length: 26 });

  return (
    <div className="relative mx-auto mt-10 h-64 sm:h-80 w-full max-w-3xl overflow-hidden rounded-3xl glass">
      {mounted && (<>
      {/* Balloons */}
      {balloons.map((_, i) => {
        const left = (i / balloons.length) * 100 + Math.random() * 6;
        const color = BALLOON_COLORS[i % BALLOON_COLORS.length];
        const delay = -(i * 1.6 + Math.random() * 2);
        const duration = 12 + Math.random() * 6;
        return (
          <span
            key={`b-${i}`}
            className="balloon"
            style={{
              left: `${left}%`,
              bottom: 0,
              background: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}

      {/* Confetti */}
      {confetti.map((_, i) => {
        const left = Math.random() * 100;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const delay = -(Math.random() * 6);
        const duration = 4 + Math.random() * 5;
        return (
          <span
            key={`c-${i}`}
            className="confetti"
            style={{
              left: `${left}%`,
              top: 0,
              background: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
      </>)}

      {/* Center wish */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-primary font-semibold shadow-glow">
          <Sparkles className="w-4 h-4 sparkle" />
          <span>Wishing you a magical year ahead!</span>
          <Sparkles className="w-4 h-4 sparkle" />
        </div>
      </div>
    </div>
  );
}
