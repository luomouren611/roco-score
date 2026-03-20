import { useState, useEffect, useMemo } from 'react';

// 从两个系列中选取一些表情包散落在页面两侧
const STICKER_POOL = [
  // 日常系列
  { src: '/stickers/daily/xiaoye.png', name: '小耶' },
  { src: '/stickers/daily/heihei.png', name: '嘿嘿' },
  { src: '/stickers/daily/chaozan.png', name: '超赞' },
  { src: '/stickers/daily/foxi.png', name: '佛系' },
  { src: '/stickers/daily/miaomiao-sikao.png', name: '喵喵思考' },
  { src: '/stickers/daily/mojito.png', name: '莫吉托' },
  { src: '/stickers/daily/cuolian.png', name: '搓脸' },
  { src: '/stickers/daily/fanfan.png', name: '饭饭' },
  { src: '/stickers/daily/touting.png', name: '偷听' },
  { src: '/stickers/daily/shangan.png', name: '上岸' },
  { src: '/stickers/daily/shanliang-dengchang.png', name: '闪亮登场' },
  { src: '/stickers/daily/20sui.png', name: '20岁' },
  // 更多日常系列
  { src: '/stickers/daily/jijiji.png', name: '急急急' },
  { src: '/stickers/daily/taishaole.png', name: '太烧了' },
  { src: '/stickers/daily/yalida.png', name: '压力大' },
  { src: '/stickers/daily/zaima.png', name: '在吗' },
  { src: '/stickers/daily/baishen.png', name: '拜神' },
  { src: '/stickers/daily/bamai.png', name: '把脉' },
];

interface FloatingItem {
  id: number;
  src: string;
  name: string;
  // 位置 & 样式
  side: 'left' | 'right';
  top: number;      // vh
  offset: number;   // px from edge
  size: number;     // px
  rotation: number;
  opacity: number;
  delay: number;    // animation delay
}

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const FloatingStickers = () => {
  const [loaded, setLoaded] = useState(false);

  // 随机选取并分布表情包
  const items: FloatingItem[] = useMemo(() => {
    const picked = shuffleAndPick(STICKER_POOL, 10);
    return picked.map((sticker, idx) => ({
      id: idx,
      src: sticker.src,
      name: sticker.name,
      side: idx % 2 === 0 ? 'left' as const : 'right' as const,
      top: 8 + (idx * 9) + (Math.random() * 5),
      offset: 8 + Math.random() * 30,
      size: 44 + Math.random() * 24,
      rotation: -15 + Math.random() * 30,
      opacity: 0.12 + Math.random() * 0.15,
      delay: idx * 0.12,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute transition-all duration-700 ease-out"
          style={{
            top: `${item.top}vh`,
            [item.side]: `${item.offset}px`,
            width: item.size,
            height: item.size,
            transform: `rotate(${item.rotation}deg) ${loaded ? 'scale(1)' : 'scale(0)'}`,
            opacity: loaded ? item.opacity : 0,
            transitionDelay: `${item.delay}s`,
          }}
        >
          <img
            src={item.src}
            alt={item.name}
            className="w-full h-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingStickers;
