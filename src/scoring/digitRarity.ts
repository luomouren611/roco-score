import { ScoreDimension } from '../types';

/**
 * 位数稀有度评分（满分20分）
 * 位数越少越稀有，5位最高，长位数号也给较好的基础分
 */
export function scoreDigitRarity(account: string): ScoreDimension {
  const len = account.length;
  let score = 0;
  let description = '';

  switch (len) {
    case 5:
      score = 20;
      description = '5位极稀有账号，顶级收藏品！';
      break;
    case 6:
      score = 18;
      description = '6位稀有账号，非常珍贵！';
      break;
    case 7:
      score = 15;
      description = '7位账号，稀有度很不错';
      break;
    case 8:
      score = 12;
      description = '8位账号，较有价值';
      break;
    case 9:
      score = 12;
      description = '9位账号，主流位数';
      break;
    case 10:
      score = 10;
      description = '10位账号，常见位数';
      break;
    case 11:
      score = 9;
      description = '11位账号';
      break;
    default:
      score = len <= 4 ? 20 : 8;
      description = len <= 4 ? '极短位数账号，超稀有！' : '较长位数账号';
  }

  return {
    name: '位数稀有度',
    score,
    maxScore: 20,
    description,
    icon: '💎',
  };
}
