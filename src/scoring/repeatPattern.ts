import { ScoreDimension } from '../types';

/**
 * 重复模式评分（满分15分）
 * 检测 AAAA、AABB、ABAB、ABCABC、对称等重复模式
 * 即使无重复模式也给基础分
 */
export function scoreRepeatPattern(account: string): ScoreDimension {
  const digits = account.split('');
  const len = digits.length;
  let score = 0;
  let description = '无特殊重复模式';

  // 检测全同 AAAA+
  if (digits.every(d => d === digits[0])) {
    return { name: '重复模式', score: 15, maxScore: 15, description: '全同数字，完美重复！', icon: '✨' };
  }

  // 检测 ABCABC 循环模式
  if (len >= 6) {
    const half = Math.floor(len / 2);
    for (let patLen = 2; patLen <= half; patLen++) {
      const pattern = account.substring(0, patLen);
      const repeated = pattern.repeat(Math.ceil(len / patLen)).substring(0, len);
      if (repeated === account) {
        const uniqueDigits = new Set(pattern.split('')).size;
        if (uniqueDigits > 1) {
          score = Math.max(score, Math.min(14, 10 + uniqueDigits * 2));
          description = `${pattern}循环重复模式`;
        }
      }
    }
  }

  // 检测 ABAB 模式
  if (len >= 4) {
    const a = digits[0];
    const b = digits[1];
    if (a !== b) {
      const isABAB = digits.every((d, i) => d === (i % 2 === 0 ? a : b));
      if (isABAB) {
        score = Math.max(score, 13);
        description = `${a}${b}交替重复模式`;
      }
    }
  }

  // 检测 AABB 模式
  if (len >= 4 && len % 2 === 0) {
    let isAABB = true;
    const pairs: string[] = [];
    for (let i = 0; i < len; i += 2) {
      if (digits[i] !== digits[i + 1]) {
        isAABB = false;
        break;
      }
      pairs.push(digits[i]);
    }
    if (isAABB && new Set(pairs).size > 1) {
      score = Math.max(score, 12);
      description = 'AABB双双对模式';
    }
  }

  // 检测对称结构（回文）
  const isSymmetric = digits.every((d, i) => d === digits[len - 1 - i]);
  if (isSymmetric && score < 11) {
    score = Math.max(score, 11);
    description = '对称结构号';
  }

  // 检测局部重复
  let maxRepeat = 1;
  let currentRepeat = 1;
  let totalPairs = 0;
  for (let i = 1; i < len; i++) {
    if (digits[i] === digits[i - 1]) {
      currentRepeat++;
      maxRepeat = Math.max(maxRepeat, currentRepeat);
      totalPairs++;
    } else {
      currentRepeat = 1;
    }
  }

  if (maxRepeat >= 4 && score < 13) {
    score = Math.max(score, 13);
    description = `含${maxRepeat}连同数字`;
  } else if (maxRepeat >= 3 && score < 11) {
    score = Math.max(score, 11);
    description = `含${maxRepeat}连同数字`;
  } else if (maxRepeat >= 2 && score < 8) {
    score = Math.max(score, 8);
    description = '含双连数字';
  }

  // 检测半重复（前半和后半部分相同）
  if (len >= 4 && len % 2 === 0 && score < 10) {
    const firstHalf = account.substring(0, len / 2);
    const secondHalf = account.substring(len / 2);
    if (firstHalf === secondHalf) {
      score = Math.max(score, 10);
      description = `${firstHalf}重复两次`;
    }
  }

  // 检测部分重复（任意子串出现多次）
  if (score < 7 && len >= 6) {
    for (let subLen = 2; subLen <= 3; subLen++) {
      const seen: Record<string, number> = {};
      for (let i = 0; i <= len - subLen; i++) {
        const sub = account.substring(i, i + subLen);
        seen[sub] = (seen[sub] || 0) + 1;
      }
      const maxOccurrence = Math.max(...Object.values(seen));
      if (maxOccurrence >= 3 && score < 7) {
        score = Math.max(score, 7);
        description = '含有子串多次重复';
      } else if (maxOccurrence >= 2 && score < 6) {
        score = Math.max(score, 6);
        description = '含有子串重复出现';
      }
    }
  }

  // 基础分：哪怕完全无重复也给分
  if (score < 5) {
    // 计算数字频率
    const freq: Record<string, number> = {};
    digits.forEach(d => { freq[d] = (freq[d] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    if (maxFreq >= 3) {
      score = Math.max(score, 6);
      description = '有数字多次重复出现';
    } else if (maxFreq >= 2) {
      score = Math.max(score, 5);
      description = '有数字重复出现';
    } else {
      score = Math.max(score, 4);
      description = '数字均为独立出现';
    }
  }

  return { name: '重复模式', score, maxScore: 15, description, icon: '✨' };
}
