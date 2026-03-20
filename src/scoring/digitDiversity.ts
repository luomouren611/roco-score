import { ScoreDimension } from '../types';

/**
 * 数字多样性评分（满分10分）
 * 评估数字种类的丰富程度——适度多样比极端单一更有趣
 * 所有号都能拿到较高的基础分
 */
export function scoreDigitDiversity(account: string): ScoreDimension {
  const digits = account.split('').map(Number);
  const len = digits.length;
  const uniqueDigits = new Set(digits).size;
  let score = 0;
  let description = '';

  // 全同（已经在其他维度给了高分，这里也给不错的分）
  if (uniqueDigits === 1) {
    score = 7;
    description = '单一数字，简约之美';
  }
  // 只用2种数字（如ABABAB，1188等）—— 简洁组合
  else if (uniqueDigits === 2) {
    score = 8;
    description = `仅用${uniqueDigits}种数字，简洁有力`;
  }
  // 3种数字
  else if (uniqueDigits === 3) {
    score = 9;
    description = '数字搭配丰富度不错';
  }
  // 4-5种数字（平衡度最好）
  else if (uniqueDigits <= 5) {
    score = 10;
    description = '数字搭配丰富均衡';
  }
  // 6种数字
  else if (uniqueDigits === 6) {
    score = 9;
    description = '数字种类丰富';
  }
  // 7种以上（种类很多）
  else {
    score = Math.max(7, 10 - (uniqueDigits - 6));
    description = '数字种类多样';
  }

  // 额外：数字分布均匀加分
  const freq: Record<number, number> = {};
  digits.forEach(d => { freq[d] = (freq[d] || 0) + 1; });
  const freqValues = Object.values(freq);
  const maxFreq = Math.max(...freqValues);
  const minFreq = Math.min(...freqValues);
  if (maxFreq - minFreq <= 1 && uniqueDigits >= 2) {
    score = Math.min(10, score + 1);
    description += '，分布均匀';
  }

  return { name: '数字多样性', score, maxScore: 10, description, icon: '🎲' };
}
