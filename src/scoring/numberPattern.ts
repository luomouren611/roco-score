import { ScoreDimension } from '../types';

/**
 * 数字规律评分（满分20分）
 * 检测豹子号、顺子、递增/递减、等差、交替、回文等规律
 * 即使无明显规律也给基础分
 */
export function scoreNumberPattern(account: string): ScoreDimension {
  const digits = account.split('').map(Number);
  const len = digits.length;
  let score = 0;
  let description = '无明显数字规律';

  // 检测豹子号（全部相同）
  if (digits.every(d => d === digits[0])) {
    score = 20;
    description = `全${digits[0]}豹子号，极品中的极品！`;
    return { name: '数字规律', score, maxScore: 20, description, icon: '🔮' };
  }

  // 检测完全顺子（递增）
  const isFullAsc = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  if (isFullAsc) {
    score = 18;
    description = '完全递增顺子号！';
    return { name: '数字规律', score, maxScore: 20, description, icon: '🔮' };
  }

  // 检测完全顺子（递减）
  const isFullDesc = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  if (isFullDesc) {
    score = 18;
    description = '完全递减顺子号！';
    return { name: '数字规律', score, maxScore: 20, description, icon: '🔮' };
  }

  // 检测等差数列
  if (len >= 4) {
    const diff = digits[1] - digits[0];
    const isArithmetic = digits.every((d, i) => i === 0 || d - digits[i - 1] === diff);
    if (isArithmetic && diff !== 0) {
      score = Math.max(score, 16);
      description = `等差数列号（公差${diff > 0 ? '+' : ''}${diff}）`;
    }
  }

  // 检测交替模式 ABABAB
  if (len >= 4) {
    const isAlternating = digits.every((d, i) => d === digits[i % 2]);
    if (isAlternating && digits[0] !== digits[1]) {
      score = Math.max(score, 15);
      description = `${digits[0]}${digits[1]}交替号`;
    }
  }

  // 检测部分顺子（连续3位以上递增或递减）
  let maxConsecutiveAsc = 1;
  let currentAsc = 1;
  let maxConsecutiveDesc = 1;
  let currentDesc = 1;

  for (let i = 1; i < len; i++) {
    if (digits[i] === digits[i - 1] + 1) {
      currentAsc++;
      maxConsecutiveAsc = Math.max(maxConsecutiveAsc, currentAsc);
    } else {
      currentAsc = 1;
    }

    if (digits[i] === digits[i - 1] - 1) {
      currentDesc++;
      maxConsecutiveDesc = Math.max(maxConsecutiveDesc, currentDesc);
    } else {
      currentDesc = 1;
    }
  }

  const maxConsecutive = Math.max(maxConsecutiveAsc, maxConsecutiveDesc);
  if (maxConsecutive >= 3) {
    const consecutiveScore = Math.min(16, 10 + (maxConsecutive - 3) * 3);
    if (consecutiveScore > score) {
      score = consecutiveScore;
      description = `含${maxConsecutive}位连续${maxConsecutiveAsc >= maxConsecutiveDesc ? '递增' : '递减'}数字`;
    }
  }

  // 检测回文号
  const reversed = [...digits].reverse();
  const isPalindrome = digits.every((d, i) => d === reversed[i]);
  if (isPalindrome) {
    const palindromeScore = Math.min(15, 10 + len);
    if (palindromeScore > score) {
      score = palindromeScore;
      description = '回文对称号';
    }
  }

  // 检测准规律：尾部连续相同（如 12888）
  let tailRepeat = 1;
  for (let i = len - 2; i >= 0; i--) {
    if (digits[i] === digits[len - 1]) tailRepeat++;
    else break;
  }
  if (tailRepeat >= 2 && score < 12) {
    const tailScore = Math.min(12, 6 + tailRepeat * 2);
    if (tailScore > score) {
      score = tailScore;
      description = `尾部${tailRepeat}连${digits[len - 1]}`;
    }
  }

  // 检测首部连续相同（如 88812）
  let headRepeat = 1;
  for (let i = 1; i < len; i++) {
    if (digits[i] === digits[0]) headRepeat++;
    else break;
  }
  if (headRepeat >= 2 && score < 12) {
    const headScore = Math.min(12, 6 + headRepeat * 2);
    if (headScore > score) {
      score = headScore;
      description = `首部${headRepeat}连${digits[0]}`;
    }
  }

  // 检测任意位置的2连相同
  if (score < 8) {
    let pairCount = 0;
    for (let i = 1; i < len; i++) {
      if (digits[i] === digits[i - 1]) {
        pairCount++;
      }
    }
    if (pairCount >= 3) {
      score = Math.max(score, 9);
      description = '含多处连续相同数字';
    } else if (pairCount >= 2) {
      score = Math.max(score, 8);
      description = '含多处连续相同数字';
    } else if (pairCount === 1) {
      score = Math.max(score, 7);
      description = '含有连续相同数字';
    }
  }

  // 基础分：检测相邻数字差值的规律性
  if (score < 6) {
    // 相邻差值是否有重复（弱规律）
    const diffs = [];
    for (let i = 1; i < len; i++) {
      diffs.push(digits[i] - digits[i - 1]);
    }
    const diffSet = new Set(diffs);
    if (diffSet.size <= 2) {
      score = Math.max(score, 6);
      description = '数字间有明显节奏感';
    } else if (diffSet.size <= 3) {
      score = Math.max(score, 5);
      description = '数字间有一定节奏感';
    } else {
      // 完全无规律也给基础分
      score = Math.max(score, 4);
      description = '数字排列自然随机';
    }
  }

  return { name: '数字规律', score, maxScore: 20, description, icon: '🔮' };
}
