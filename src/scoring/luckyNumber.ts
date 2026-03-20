import { ScoreDimension } from '../types';

/**
 * 吉利数字评分（满分15分）
 * 统计8/6/9占比加分，4减分（温和），特殊组合额外加分
 * 无吉利数字也给基础分
 */
export function scoreLuckyNumber(account: string): ScoreDimension {
  const digits = account.split('').map(Number);
  const len = digits.length;
  let score = 0;
  let description = '';

  // 全8满分
  if (digits.every(d => d === 8)) {
    return { name: '吉利数字', score: 15, maxScore: 15, description: '全8至尊吉利号！', icon: '🍀' };
  }

  // 全6也很好
  if (digits.every(d => d === 6)) {
    return { name: '吉利数字', score: 14, maxScore: 15, description: '全6大顺号！', icon: '🍀' };
  }

  // 全9
  if (digits.every(d => d === 9)) {
    return { name: '吉利数字', score: 14, maxScore: 15, description: '全9长久号！', icon: '🍀' };
  }

  // 计算吉利数字统计
  const eightCount = digits.filter(d => d === 8).length;
  const sixCount = digits.filter(d => d === 6).length;
  const nineCount = digits.filter(d => d === 9).length;
  const sevenCount = digits.filter(d => d === 7).length; // 7也是吉利数
  const luckyCount = eightCount + sixCount + nineCount + sevenCount;
  const unluckyCount = digits.filter(d => d === 4).length;
  const luckyRatio = luckyCount / len;

  // 基础分：6分起步（所有号都有一定吉利潜质）
  score = 6;

  // 吉利比例加分（最高+6分）
  score += Math.round(luckyRatio * 6);

  // 8的额外加分（每个8 +0.8分，最高+3）
  score += Math.min(3, Math.round(eightCount * 0.8));

  // 特殊连续组合加分
  if (account.includes('8888')) score += 2;
  else if (account.includes('888')) score += 1.5;
  else if (account.includes('88')) score += 0.5;

  if (account.includes('666')) score += 1.5;
  else if (account.includes('66')) score += 0.5;

  if (account.includes('999')) score += 1;
  else if (account.includes('99')) score += 0.5;

  if (account.includes('77')) score += 0.5;

  // 4的减分（更温和，每个4只扣0.5分）
  score -= unluckyCount * 0.5;

  // 没有4也是加分项
  if (unluckyCount === 0 && len >= 5) {
    score += 1;
  }

  // 限制范围
  score = Math.max(3, Math.min(15, Math.round(score)));

  // 生成描述
  if (score >= 12) {
    description = '吉利数字众多，福气满满！';
  } else if (score >= 9) {
    description = '吉利数字较多，运气不错';
  } else if (score >= 7) {
    description = '含有一些吉利数字';
  } else if (score >= 5) {
    description = '吉利数字平平，但有潜力';
  } else {
    description = '吉利数字较少';
  }

  return { name: '吉利数字', score, maxScore: 15, description, icon: '🍀' };
}
