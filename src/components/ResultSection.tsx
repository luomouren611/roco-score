import { ScoreResult } from '../types';
import ScoreGauge from './ScoreGauge';
import DimensionBars from './DimensionBars';
import TagDisplay from './TagDisplay';

interface ResultSectionProps {
  result: ScoreResult | null;
  show: boolean;
}

const ResultSection = ({ result, show }: ResultSectionProps) => {
  if (!result || !show) return null;

  return (
    <section className="flex justify-center px-4 mb-8">
      <div className="w-full max-w-lg">
        {/* 账号展示 */}
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs mb-1">评估账号</p>
          <p className="text-2xl font-bold text-rk-gold tracking-widest">
            {result.account}
          </p>
        </div>

        <ScoreGauge score={result.totalScore} show={show} />
        <DimensionBars dimensions={result.dimensions} show={show} />
        <TagDisplay tags={result.tags} />
      </div>
    </section>
  );
};

export default ResultSection;
