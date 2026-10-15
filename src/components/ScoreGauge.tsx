import React from 'react';

interface ScoreGaugeProps {
  score: number;        // 0-100
  size?: number;        // px, default 140
  strokeWidth?: number; // default 10
  label?: string;       // text below score
  trend?: string;       // e.g. "+8 pts"
  trendPositive?: boolean;
  className?: string;
}

function getScoreColor(score: number): { stroke: string; glow: string } {
  if (score >= 80) return { stroke: 'url(#gaugeGradientGreen)', glow: 'rgba(52,211,153,0.3)' };
  if (score >= 65) return { stroke: 'url(#gaugeGradientBlue)', glow: 'rgba(59,130,246,0.3)' };
  if (score >= 50) return { stroke: 'url(#gaugeGradientAmber)', glow: 'rgba(251,191,36,0.3)' };
  return { stroke: 'url(#gaugeGradientRose)', glow: 'rgba(251,113,133,0.3)' };
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Strong';
  if (score >= 50) return 'Average';
  return 'Needs Work';
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label,
  trend,
  trendPositive = true,
  className = ''
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use 270-degree arc (¾ circle) for the gauge
  const arcLength = circumference * 0.75;
  const offset = arcLength - (score / 100) * arcLength;

  const { stroke, glow } = getScoreColor(score);
  const scoreLabel = label || getScoreLabel(score);

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(135deg)' }}>
        <defs>
          <linearGradient id="gaugeGradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="gaugeGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="gaugeGradientAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="gaugeGradientRose" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(30,41,59,0.8)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Center text — rotated back */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: 'rotate(0deg)' }}
      >
        <span
          className="font-extrabold tracking-tight text-white animate-numeric"
          style={{ fontSize: size * 0.265 }}
        >
          {score}
        </span>
        <span
          className="font-semibold text-slate-400 uppercase tracking-wider"
          style={{ fontSize: size * 0.075 }}
        >
          {scoreLabel}
        </span>
        {trend && (
          <span
            className={`font-bold mt-0.5 flex items-center gap-0.5 ${trendPositive ? 'text-emerald-400' : 'text-rose-400'}`}
            style={{ fontSize: size * 0.07 }}
          >
            {trendPositive ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
    </div>
  );
};
