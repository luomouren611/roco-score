import { ScoreResult, AccountGrade } from '../types';
import { scoreDigitRarity } from './digitRarity';
import { scoreNumberPattern } from './numberPattern';
import { scoreRepeatPattern } from './repeatPattern';
import { scoreLuckyNumber } from './luckyNumber';
import { scoreSpecialMeaning } from './specialMeaning';
import { scoreDigitDiversity } from './digitDiversity';
import { scoreHeadTail } from './headTail';
import { generateTags } from './tagGenerator';

/**
 * 根据总分判定账号等级
 */
function getAccountGrade(score: number): AccountGrade {
  if (score >= 82) {
    return {
      grade: 'S',
      label: 'S级·传说',
      color: '#FFD151',
      bgColor: 'rgba(255, 209, 81, 0.12)',
      description: '传说级魔法账号，万中无一的存在！',
    };
  }
  if (score >= 65) {
    return {
      grade: 'A',
      label: 'A级·史诗',
      color: '#C084FC',
      bgColor: 'rgba(192, 132, 252, 0.12)',
      description: '史诗级冒险者认证，值得珍藏！',
    };
  }
  if (score >= 50) {
    return {
      grade: 'B',
      label: 'B级·稀有',
      color: '#43D9A2',
      bgColor: 'rgba(67, 217, 162, 0.12)',
      description: '稀有冒险者，有亮点有实力',
    };
  }
  if (score >= 35) {
    return {
      grade: 'C',
      label: 'C级·普通',
      color: '#7CB3FF',
      bgColor: 'rgba(124, 179, 255, 0.12)',
      description: '普通冒险者，中规中矩',
    };
  }
  return {
    grade: 'D',
    label: 'D级·见习',
    color: '#8A7CC0',
    bgColor: 'rgba(138, 124, 192, 0.12)',
    description: '见习冒险者，但也是独一无二的',
  };
}

/**
 * 计算账号总评分
 * 总分 = 位数稀有度(20) + 数字规律(20) + 重复模式(15) + 吉利数字(15) + 特殊含义(10) + 数字多样性(10) + 首尾印象(10) = 100
 * 短号品质加成：6-7位号如果数字品质（规律+吉利+重复+含义）好，额外获得加成
 */
export function calculateScore(account: string): ScoreResult {
  const dimensions = [
    scoreDigitRarity(account),
    scoreNumberPattern(account),
    scoreRepeatPattern(account),
    scoreLuckyNumber(account),
    scoreSpecialMeaning(account),
    scoreDigitDiversity(account),
    scoreHeadTail(account),
  ];

  let totalScore = dimensions.reduce((sum, dim) => sum + dim.score, 0);

  // === 短号品质加成 ===
  // 6-7位号如果数字本身也很顺、有寓意，应该比普通长号分更高
  const len = account.length;
  if (len >= 5 && len <= 7) {
    // 取"数字品质"相关维度的得分
    const patternScore = dimensions.find(d => d.name === '数字规律')?.score ?? 0;
    const repeatScore = dimensions.find(d => d.name === '重复模式')?.score ?? 0;
    const luckyScore = dimensions.find(d => d.name === '吉利数字')?.score ?? 0;
    const meaningScore = dimensions.find(d => d.name === '特殊含义')?.score ?? 0;

    // 数字品质总分（满分60）
    const qualityScore = patternScore + repeatScore + luckyScore + meaningScore;
    // 品质百分比
    const qualityRatio = qualityScore / 60;

    // 加成逻辑：品质越高加成越多，最高加8分
    // 品质>70% → 加6-8分（极品短号）
    // 品质>50% → 加3-5分（优质短号）
    // 品质>35% → 加1-2分（不错的短号）
    let bonus = 0;
    if (qualityRatio >= 0.7) {
      bonus = Math.round(6 + (qualityRatio - 0.7) / 0.3 * 2); // 6~8分
    } else if (qualityRatio >= 0.5) {
      bonus = Math.round(3 + (qualityRatio - 0.5) / 0.2 * 2); // 3~5分
    } else if (qualityRatio >= 0.35) {
      bonus = Math.round(1 + (qualityRatio - 0.35) / 0.15); // 1~2分
    }

    // 5位号加成更大（更稀有）
    if (len === 5) {
      bonus = Math.round(bonus * 1.3);
    }
    // 6位号标准加成
    // 7位号略少一点
    if (len === 7) {
      bonus = Math.round(bonus * 0.85);
    }

    bonus = Math.min(10, bonus); // 最高不超过10分加成
    totalScore += bonus;
  }

  totalScore = Math.min(100, totalScore);
  const grade = getAccountGrade(totalScore);
  const tags = generateTags(account, dimensions, totalScore);

  return {
    account,
    totalScore,
    grade,
    dimensions,
    tags,
  };
}
