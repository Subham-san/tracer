import React from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  subtitle?: string;
  showStatusLabel?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 140,
  strokeWidth = 10,
  subtitle,
  showStatusLabel = true,
}) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  // Determine color based on completion percentage
  let strokeColor = '#ef4444'; // Red < 50%
  let textColor = 'text-rose-400';
  let glowColor = 'rgba(239, 68, 68, 0.2)';

  if (clampedPercentage === 100) {
    strokeColor = '#10b981'; // Emerald 100%
    textColor = 'text-emerald-400';
    glowColor = 'rgba(16, 185, 129, 0.3)';
  } else if (clampedPercentage >= 50) {
    strokeColor = '#f59e0b'; // Amber 50-99%
    textColor = 'text-amber-400';
    glowColor = 'rgba(245, 158, 11, 0.25)';
  } else if (clampedPercentage === 0) {
    strokeColor = '#52525b';
    textColor = 'text-neutral-400';
    glowColor = 'transparent';
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 origin-center"
          style={{ filter: `drop-shadow(0 0 10px ${glowColor})` }}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-neutral-800/80 dark:text-neutral-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${textColor} font-mono`}>
            {clampedPercentage}%
          </span>
          {showStatusLabel && (
            <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-0.5">
              {clampedPercentage === 100 ? 'Completed' : 'Complete'}
            </span>
          )}
        </div>
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-neutral-400 text-center font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
