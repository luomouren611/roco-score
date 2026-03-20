import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const rules = [
  { name: '位数稀有度', maxScore: 30, icon: '📜', description: '账号位数越少越稀有。5位满分30，6位20，7位10，8位5。' },
  { name: '数字规律', maxScore: 25, icon: '🔢', description: '豹子号25分、顺子22分、递增递减10-18分、回文14分。' },
  { name: '重复模式', maxScore: 20, icon: '🔁', description: '全同20分、循环16-18分、交替14分、双对12分。' },
  { name: '吉利数字', maxScore: 15, icon: '🍀', description: '8/6/9占比加分，全8满分15，含4扣分。' },
  { name: '特殊含义', maxScore: 10, icon: '💎', description: '520、1314等有特殊含义的数字组合加分。' },
];

const RulesSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex justify-center px-4 mb-8">
      <div className="rk-card w-full max-w-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-3.5 flex items-center justify-between
            text-rk-text-3 text-sm font-medium hover:text-rk-text-2
            transition-colors cursor-pointer"
        >
          <span>📖 鉴定规则</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? '600px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-5 pb-5 space-y-3">
            {rules.map((rule) => (
              <div key={rule.name} className="flex items-start gap-3">
                <span className="text-xs mt-0.5 shrink-0 w-10 text-right">
                  <span className="mr-0.5">{rule.icon}</span>
                  <span className="text-rk-purple-light font-semibold">{rule.maxScore}</span>
                </span>
                <div>
                  <span className="text-white/80 text-sm font-medium">
                    {rule.name}
                  </span>
                  <p className="text-rk-text-muted text-xs mt-0.5 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
