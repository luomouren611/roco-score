import { useState, useEffect, useMemo } from 'react';

// 从两个系列中选取一些表情包散落在页面两侧
const STICKER_POOL = [
  // 日常系列
  { src: '/stickers/daily/小耶.png', name: '小耶' },
  { src: '/stickers/daily/嘿嘿.png', name: '嘿嘿' },
  { src: '/stickers/daily/超赞.png', name: '超赞' },
  { src: '/stickers/daily/佛系.png', name: '佛系' },
  { src: '/stickers/daily/喵喵思考.png', name: '喵喵思考' },
  { src: '/stickers/daily/莫吉托.png', name: '莫吉托' },
  { src: '/stickers/daily/搓脸.png', name: '搓脸' },
  { src: '/stickers/daily/饭饭.png', name: '饭饭' },
  { src: '/stickers/daily/偷听.png', name: '偷听' },
  { src: '/stickers/daily/上岸.png', name: '上岸' },
  { src: '/stickers/daily/闪亮登场.png', name: '闪亮登场' },
  { src: '/stickers/daily/20岁.png', name: '20岁' },
  // 迪莫系列
  { src: '/stickers/dimo/比心.png', name: '比心' },
  { src: '/stickers/dimo/真香.png', name: '真香' },
  { src: '/stickers/dimo/emm.png', name: 'emm' },
  { src: '/stickers/dimo/让我看看.png', name: '让我看看' },
  { src: '/stickers/dimo/我在思考.png', name: '我在思考' },
  { src: '/stickers/dimo/酸了.png', name: '酸了' },
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
