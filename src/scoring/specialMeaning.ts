import { ScoreDimension } from '../types';

/**
 * 特殊含义评分（满分10分）
 * 识别年份号、生日号、整数号、520/1314等含义数字
 * 无特殊含义也给基础分
 */
export function scoreSpecialMeaning(account: string): ScoreDimension {
  let score = 0;
  const descriptions: string[] = [];

  // 含义数字库（可叠加，但总分不超过10）
  const meaningfulPatterns: Array<{ pattern: string; points: number; label: string }> = [
    { pattern: '5201314', points: 8, label: '"5201314"我爱你一生一世' },
    { pattern: '1314', points: 4, label: '"1314"一生一世' },
    { pattern: '520', points: 4, label: '"520"我爱你' },
    { pattern: '521', points: 3, label: '"521"我爱你' },
    { pattern: '1688', points: 3, label: '"1688"一路发发' },
    { pattern: '168', points: 3, label: '"168"一路发' },
    { pattern: '518', points: 3, label: '"518"我要发' },
    { pattern: '888', points: 2, label: '"888"发发发' },
    { pattern: '666', points: 2, label: '"666"大顺' },
    { pattern: '999', points: 2, label: '"999"长久' },
    { pattern: '007', points: 3, label: '"007"特工号' },
    { pattern: '100', points: 2, label: '"100"满分' },
    { pattern: '250', points: 1, label: '"250"谐音梗' },
    { pattern: '114514', points: 2, label: '"114514"梗号' },
    { pattern: '233', points: 1, label: '"233"大笑' },
    { pattern: '6324', points: 2, label: '"6324"直播梗' },
    { pattern: '404', points: 1, label: '"404"未找到' },
    { pattern: '1024', points: 2, label: '"1024"程序员日' },
    { pattern: '996', points: 1, label: '"996"打工人' },
    { pattern: '886', points: 1, label: '"886"拜拜了' },
    { pattern: '1234', points: 2, label: '"1234"顺口' },
    { pattern: '4321', points: 2, label: '"4321"倒数' },
    { pattern: '9527', points: 2, label: '"9527"经典梗' },
    { pattern: '2333', points: 1, label: '"2333"大笑' },
    { pattern: '555', points: 1, label: '"555"呜呜呜' },
    { pattern: '111', points: 1, label: '"111"光棍号' },
    { pattern: '000', points: 1, label: '"000"三零' },
    { pattern: '123', points: 1, label: '"123"顺口数' },
    { pattern: '321', points: 1, label: '"321"倒数' },
    { pattern: '567', points: 1, label: '"567"小顺子' },
    { pattern: '789', points: 1, label: '"789"大顺子' },
  ];

  // 按长度排序，长模式优先匹配
  const matched = new Set<string>();
  for (const mp of meaningfulPatterns) {
    if (account.includes(mp.pattern) && !matched.has(mp.pattern)) {
      score += mp.points;
      descriptions.push(mp.label);
      matched.add(mp.pattern);
    }
  }

  // 检测年份号 (1990-2026)
  for (let year = 1990; year <= 2026; year++) {
    if (account.includes(String(year))) {
      score += 3;
      descriptions.push(`年份"${year}"`);
      break;
    }
  }

  // 检测生日/节日日期
  const specialDates: Array<{ date: string; label: string }> = [
    { date: '0101', label: '元旦' },
    { date: '0214', label: '情人节' },
    { date: '0314', label: '白色情人节' },
    { date: '0401', label: '愚人节' },
    { date: '0501', label: '劳动节' },
    { date: '0520', label: '520' },
    { date: '0601', label: '儿童节' },
    { date: '0701', label: '建党节' },
    { date: '0801', label: '建军节' },
    { date: '0910', label: '教师节' },
    { date: '1001', label: '国庆节' },
    { date: '1111', label: '双十一' },
    { date: '1212', label: '双十二' },
    { date: '1224', label: '平安夜' },
    { date: '1225', label: '圣诞节' },
    { date: '1231', label: '跨年' },
  ];

  for (const sd of specialDates) {
    if (account.includes(sd.date)) {
      score += 2;
      descriptions.push(`含"${sd.date}"${sd.label}`);
      break;
    }
  }

  // 检测整数号
  const num = parseInt(account, 10);
  if (num > 0 && num % 100000 === 0) {
    score += 7;
    descriptions.push('十万位整数号');
  } else if (num > 0 && num % 10000 === 0) {
    score += 5;
    descriptions.push('万位整数号');
  } else if (num > 0 && num % 1000 === 0) {
    score += 3;
    descriptions.push('千位整数号');
  } else if (num > 0 && num % 100 === 0) {
    score += 2;
    descriptions.push('百位整数号');
  }

  // 检测月份（01-12）
  if (descriptions.length === 0) {
    for (let m = 1; m <= 12; m++) {
      const mStr = m < 10 ? `0${m}` : `${m}`;
      if (account.startsWith(mStr) || account.endsWith(mStr)) {
        score += 1;
        descriptions.push(`含月份"${mStr}"`);
        break;
      }
    }
  }

  // 基础分：即使没有特殊含义，号码本身也有独特性
  if (score === 0) {
    score = 4;
    descriptions.push('每个号码都有独特的故事');
  }

  // 限制满分10
  score = Math.min(10, score);

  const description = descriptions.length > 0
    ? descriptions.slice(0, 3).join('，')
    : '每个号码都有独特的故事';

  return { name: '特殊含义', score, maxScore: 10, description, icon: '🌟' };
}
