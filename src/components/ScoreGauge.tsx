import { useCountUp } from '../utils/animation';
import { AccountGrade } from '../types';

interface ScoreGaugeProps {
  score: number;
  show: boolean;
  grade?: AccountGrade;
}

const ScoreGauge = ({ score, show, grade }: ScoreGaugeProps) => {
  const displayScore = useCountUp(score, 1500, show);

  const color = grade?.color || getScoreColor(score);

  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = show ? (displayScore / 100) : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(160, 130, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out',
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold tabular-nums"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="text-rk-text-muted text-xs mt-1">
            / 100
          </span>
          {grade && (
            <span
              className="text-xs mt-1.5 px-2.5 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: grade.bgColor,
                color: grade.color,
                border: `1px solid ${grade.color}30`,
                boxShadow: `0 0 8px ${grade.color}15`,
              }}
            >
              {grade.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

function getScoreColor(s: number): string {
  if (s >= 82) return '#FFD151';
  if (s >= 65) return '#E879F9';
  if (s >= 50) return '#43D9A2';
  if (s >= 35) return '#7CB3FF';
  return '#8A7CC0';
}

export default ScoreGauge;
