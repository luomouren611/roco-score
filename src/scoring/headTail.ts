import { ScoreDimension } from '../types';

/**
 * 首尾印象评分（满分10分）
 * 首位和末位数字对号码整体印象影响很大
 * 基础分较高，所有号都能拿到5分以上
 */
export function scoreHeadTail(account: string): ScoreDimension {
  const digits = account.split('').map(Number);
  const first = digits[0];
  const last = digits[digits.length - 1];
  let score = 4; // 基础4分
  let description = '';
  const details: string[] = [];

  // === 首位评分 ===
  const headScores: Record<number, { pts: number; label: string }> = {
    8: { pts: 3, label: '首位8，发财起步' },
    6: { pts: 2.5, label: '首位6，顺利开局' },
    9: { pts: 2.5, label: '首位9，长久寓意' },
    1: { pts: 2, label: '首位1，一马当先' },
    7: { pts: 2, label: '首位7，幸运起步' },
    5: { pts: 1.5, label: '首位5，居中平稳' },
    3: { pts: 1.5, label: '首位3，生意兴隆' },
    2: { pts: 1.5, label: '首位2，好事成双' },
    0: { pts: 1, label: '首位0，从零起步' },
    4: { pts: 1, label: '首位4，四季平安' },
  };

  const headInfo = headScores[first] || { pts: 1.5, label: `首位${first}` };
  score += headInfo.pts;
  details.push(headInfo.label);

  // === 尾位评分 ===
  const tailScores: Record<number, { pts: number; label: string }> = {
    8: { pts: 3, label: '尾位8，发财收尾' },
    6: { pts: 2.5, label: '尾位6，一路顺' },
    9: { pts: 2.5, label: '尾位9，长长久久' },
    1: { pts: 1.5, label: '尾位1，独一无二' },
    7: { pts: 2, label: '尾位7，吉星高照' },
    5: { pts: 1.5, label: '尾位5，五福临门' },
    3: { pts: 1.5, label: '尾位3，三生有幸' },
    2: { pts: 1.5, label: '尾位2，好事成双' },
    0: { pts: 1, label: '尾位0，圆满结尾' },
    4: { pts: 1, label: '尾位4，四季如意' },
  };

  const tailInfo = tailScores[last] || { pts: 1.5, label: `尾位${last}` };
  score += tailInfo.pts;
  details.push(tailInfo.label);

  // === 首尾组合加分 ===
  if (first === last) {
    score += 1;
    details.push('首尾呼应');
  }
  if (first === 8 && last === 8) {
    score += 0.5;
  }

  // 限制范围
  score = Math.max(6, Math.min(10, Math.round(score)));

  description = details.slice(0, 2).join('，');

  return { name: '首尾印象', score, maxScore: 10, description, icon: '🎯' };
}
