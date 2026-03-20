import { useState, useEffect, useMemo } from 'react';
import { ScoreResult } from '../types';
import ScoreGauge from './ScoreGauge';
import DimensionBars from './DimensionBars';
import TagDisplay from './TagDisplay';

// 根据分数段（对应等级）选合适的表情包和文案
interface ScoreReaction {
  stickers: { src: string; name: string }[];
  messages: string[];
}

function getScoreReaction(score: number): ScoreReaction {
  if (score >= 82) {
    // S级
    return {
      stickers: [
        { src: '/stickers/daily/shanliang-dengchang.png', name: '闪亮登场' },
        { src: '/stickers/daily/chaozan.png', name: '超赞' },
        { src: '/stickers/daily/xiaoye.png', name: '小耶' },
        { src: '/stickers/daily/taishaole.png', name: '太烧了' },
        { src: '/stickers/daily/heihei.png', name: '嘿嘿' },
      ],
      messages: [
        '传说级别的存在！这号万中无一！',
        '恭喜！S级传说号，魔法殿堂级收藏品！',
        '这号怕不是能传家吧？！太顶了！',
        '我酸了，S级传说号也太强了吧！',
        '洛克王国传奇冒险者认证！',
      ],
    };
  }
  if (score >= 65) {
    // A级
    return {
      stickers: [
        { src: '/stickers/daily/chaozan.png', name: '超赞' },
        { src: '/stickers/daily/taishaole.png', name: '太烧了' },
        { src: '/stickers/daily/heihei.png', name: '嘿嘿' },
        { src: '/stickers/daily/shanliang-dengchang.png', name: '闪亮登场' },
        { src: '/stickers/daily/xiaoye.png', name: '小耶' },
      ],
      messages: [
        'A级史诗号！妥妥的大佬气场！',
        '这号很顶啊，史诗级冒险者认证！',
        '真香！A级号值得炫耀一下！',
        '拿着这个号去闯荡洛克大陆吧！',
      ],
    };
  }
  if (score >= 50) {
    // B级
    return {
      stickers: [
        { src: '/stickers/daily/heihei.png', name: '嘿嘿' },
        { src: '/stickers/daily/shangan.png', name: '上岸' },
        { src: '/stickers/daily/mojito.png', name: '莫吉托' },
        { src: '/stickers/daily/miaomiao-sikao.png', name: '喵喵思考' },
        { src: '/stickers/daily/fanfan.png', name: '饭饭' },
      ],
      messages: [
        'B级优秀！这号有不少亮点~',
        '不错不错，优秀冒险者认证！',
        '上岸了！这是个靠谱的号码',
        'B级认证，继续冒险吧！',
      ],
    };
  }
  if (score >= 35) {
    // C级
    return {
      stickers: [
        { src: '/stickers/daily/foxi.png', name: '佛系' },
        { src: '/stickers/daily/cuolian.png', name: '搓脸' },
        { src: '/stickers/daily/miaomiao-sikao.png', name: '喵喵思考' },
        { src: '/stickers/daily/touting.png', name: '偷听' },
        { src: '/stickers/daily/bamai.png', name: '把脉' },
      ],
      messages: [
        'C级普通号，佛系冒险也挺好',
        'emm...C级还凑合吧~',
        '虽然是C级，但也是你的独家号码',
        '平凡的冒险者，也有属于自己的故事',
      ],
    };
  }
  // D级
  return {
    stickers: [
      { src: '/stickers/daily/jijiji.png', name: '急急急' },
      { src: '/stickers/daily/zhibuliao.png', name: '治不了' },
      { src: '/stickers/daily/zaiyebuwanchouxiang.png', name: '再也不玩抽象了' },
      { src: '/stickers/daily/yalida.png', name: '压力大' },
      { src: '/stickers/daily/dadan.png', name: '大胆' },
      { src: '/stickers/daily/wo.png', name: '我？' },
    ],
    messages: [
      'D级路人号...但号不行人行啊！',
      '治不了，这号确实有点随意了',
      '别急别急，D级也是独一无二的',
      '虽然D级，但冒险精神不分等级！',
    ],
  };
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface ScorePopupProps {
  result: ScoreResult;
  show: boolean;
  onClose: () => void;
}

const ScorePopup = ({ result, show, onClose }: ScorePopupProps) => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const reaction = useMemo(() => {
    const r = getScoreReaction(result.totalScore);
    return {
      sticker: pickRandom(r.stickers),
      message: pickRandom(r.messages),
    };
  }, [result]);

  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      setShowDetails(false);
    }
  }, [show]);

  if (!show) return null;

  const { grade } = result;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300
        ${visible ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'}`}
      onClick={onClose}
    >
      <div
        className={`relative mx-4 w-full max-w-sm transition-all duration-300 ease-out
          ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 主卡片 */}
        <div className="rk-card overflow-hidden">
          {/* 等级大标 + 表情包 */}
          <div className="relative pt-5 pb-2 flex flex-col items-center">
            {/* 等级徽章 */}
            <div
              className={`mb-2 transition-all duration-500 delay-100
                ${visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
            >
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: grade.bgColor,
                  border: `2px solid ${grade.color}`,
                  boxShadow: `0 0 20px ${grade.color}30`,
                }}
              >
                <span
                  className="text-2xl font-black"
                  style={{ color: grade.color }}
                >
                  {grade.grade}
                </span>
              </div>
            </div>

            {/* 等级名 */}
            <p
              className={`text-xs font-medium transition-all duration-400 delay-200
                ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ color: grade.color }}
            >
              {grade.label}
            </p>

            {/* 表情包 */}
            <div className={`mt-3 transition-all duration-500 delay-250
              ${visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-4'}`}>
              <img
                src={reaction.sticker.src}
                alt={reaction.sticker.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* 趣味文案 */}
            <p className={`mt-3 text-sm text-rk-text-2 text-center px-6 leading-relaxed
              transition-all duration-400 delay-350
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {reaction.message}
            </p>
          </div>

          {/* 分数展示 */}
          <div className={`flex flex-col items-center py-3
            transition-all duration-400 delay-400
            ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-bold tabular-nums"
                style={{ color: grade.color }}
              >
                {result.totalScore}
              </span>
              <span className="text-rk-text-muted text-sm">/ 100</span>
            </div>
            <p className="text-rk-text-3 text-base mt-1 font-medium tracking-wide">
              账号: {result.account}
            </p>
            <p className="text-rk-text-muted text-xs mt-0.5">
              {grade.description}
            </p>
          </div>

          {/* 标签 */}
          <div className={`px-5 pb-3 transition-all duration-400 delay-500
            ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <TagDisplay tags={result.tags} />
          </div>

          {/* 展开详细 */}
          <div className="px-5 pb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-center text-xs text-rk-text-muted hover:text-rk-text-3
                transition-colors py-2 border-t border-rk-purple/10"
            >
              {showDetails ? '收起详情 ▲' : '📊 查看详细评分 (7项维度)'}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-out
              ${showDetails ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
              <ScoreGauge score={result.totalScore} show={showDetails} grade={result.grade} />
              <DimensionBars dimensions={result.dimensions} show={showDetails} />
            </div>
          </div>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className={`mt-4 w-full py-2.5 rounded-full text-sm font-medium
            bg-rk-purple/15 text-rk-text-3 hover:bg-rk-purple/25 hover:text-white
            border border-rk-purple/15 hover:border-rk-purple/25
            transition-all duration-300 delay-500
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default ScorePopup;
