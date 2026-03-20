import { AccountTag, ScoreDimension } from '../types';

/**
 * 根据评分结果生成账号特征标签
 */
export function generateTags(
  account: string,
  dimensions: ScoreDimension[],
  totalScore: number
): AccountTag[] {
  const tags: AccountTag[] = [];
  const digits = account.split('').map(Number);
  const len = digits.length;

  // 位数标签
  if (len <= 5) {
    tags.push({ label: '5位稀有号', color: '#F59E0B', icon: '👑' });
  } else if (len === 6) {
    tags.push({ label: '6位靓号', color: '#A855F7', icon: '💜' });
  } else if (len === 7) {
    tags.push({ label: '7位号', color: '#6366F1', icon: '🔷' });
  }

  // 豹子号
  if (digits.every(d => d === digits[0])) {
    tags.push({ label: '豹子号', color: '#EF4444', icon: '🐆' });
  }

  // 顺子号
  const isAsc = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  const isDesc = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  if (isAsc || isDesc) {
    tags.push({ label: '顺子号', color: '#10B981', icon: '📈' });
  }

  // 回文号
  const reversed = [...digits].reverse();
  if (digits.every((d, i) => d === reversed[i]) && !digits.every(d => d === digits[0])) {
    tags.push({ label: '回文号', color: '#3B82F6', icon: '🪞' });
  }

  // AABB 模式
  if (len >= 4 && len % 2 === 0) {
    let isAABB = true;
    const pairs: number[] = [];
    for (let i = 0; i < len; i += 2) {
      if (digits[i] !== digits[i + 1]) {
        isAABB = false;
        break;
      }
      pairs.push(digits[i]);
    }
    if (isAABB && new Set(pairs).size > 1) {
      tags.push({ label: '双双对号', color: '#EC4899', icon: '💕' });
    }
  }

  // ABAB 模式
  if (len >= 4) {
    const a = digits[0];
    const b = digits[1];
    if (a !== b) {
      const isABAB = digits.every((d, i) => d === (i % 2 === 0 ? a : b));
      if (isABAB) {
        tags.push({ label: '交替号', color: '#8B5CF6', icon: '🔄' });
      }
    }
  }

  // 吉利号
  const luckyCount = digits.filter(d => d === 8 || d === 6 || d === 9).length;
  if (luckyCount >= Math.ceil(len * 0.6)) {
    tags.push({ label: '吉利号', color: '#F59E0B', icon: '🍀' });
  }

  // 全8号
  if (digits.every(d => d === 8)) {
    tags.push({ label: '至尊发财号', color: '#F59E0B', icon: '💰' });
  }

  // 无4号
  if (!digits.includes(4) && len >= 5) {
    tags.push({ label: '无4号', color: '#22D3EE', icon: '✓' });
  }

  // 含义标签
  if (account.includes('520') || account.includes('521')) {
    tags.push({ label: '爱情号', color: '#F472B6', icon: '❤️' });
  }
  if (account.includes('1314')) {
    tags.push({ label: '一生一世', color: '#F472B6', icon: '💍' });
  }
  if (account.includes('666')) {
    tags.push({ label: '大顺号', color: '#10B981', icon: '6️⃣' });
  }

  // 年份号
  for (let year = 1990; year <= 2026; year++) {
    if (account.includes(String(year))) {
      tags.push({ label: `${year}年份号`, color: '#6366F1', icon: '📅' });
      break;
    }
  }

  // 整数号
  const num = parseInt(account, 10);
  if (num > 0 && num % 10000 === 0) {
    tags.push({ label: '整数号', color: '#14B8A6', icon: '💯' });
  }

  // 首尾88
  if (digits[0] === 8 && digits[len - 1] === 8) {
    tags.push({ label: '首尾发', color: '#F59E0B', icon: '🎯' });
  }

  // 如果没有任何标签
  if (tags.length === 0) {
    tags.push({ label: '普通账号', color: '#6B7280', icon: '📋' });
  }

  return tags;
}
