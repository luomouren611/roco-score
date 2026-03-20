import { ScoreDimension } from '../types';

interface DimensionBarsProps {
  dimensions: ScoreDimension[];
  show: boolean;
}

const dimensionColors = [
  { bar: 'from-purple-400 to-purple-500', text: '#A082FF' },
  { bar: 'from-blue-400 to-cyan-400', text: '#50C8FF' },
  { bar: 'from-pink-400 to-rose-400', text: '#FF7BAC' },
  { bar: 'from-emerald-400 to-green-400', text: '#43D9A2' },
  { bar: 'from-amber-400 to-yellow-400', text: '#FFD151' },
  { bar: 'from-indigo-400 to-blue-400', text: '#7CB3FF' },
  { bar: 'from-orange-400 to-amber-400', text: '#FB923C' },
];

const DimensionBars = ({ dimensions, show }: DimensionBarsProps) => {
  return (
    <div className="rk-card p-4 mb-4">
      <h3 className="text-white font-semibold text-xs mb-3">
        ⚔ 各维度评分 ({dimensions.length}项)
      </h3>

      <div className="space-y-2.5">
        {dimensions.map((dim, index) => {
          const percentage = (dim.score / dim.maxScore) * 100;
          const colors = dimensionColors[index % dimensionColors.length];

          return (
            <div key={dim.name}>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-rk-text-3 text-xs">
                  {dim.name}
                </span>
                <span
                  className="text-xs font-semibold tabular-nums"
                  style={{ color: colors.text }}
                >
                  {dim.score}/{dim.maxScore}
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-rk-purple/10 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${colors.bar} animate-bar-fill`}
                  style={{
                    '--bar-width': show ? `${percentage}%` : '0%',
                    animationDelay: `${index * 80 + 200}ms`,
                  } as React.CSSProperties}
                />
              </div>

              <p className="text-rk-text-muted text-[10px] mt-0.5 truncate">
                {dim.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DimensionBars;
