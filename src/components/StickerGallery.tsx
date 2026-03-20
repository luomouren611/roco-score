import { useState, useCallback } from 'react';

const STICKER_SERIES = [
  {
    id: 'daily',
    name: '洛克王国的日常',
    folder: '/stickers/daily',
    stickers: [
      'xiaoye', 'heihei', 'chaozan', 'shanliang-dengchang', 'cuolian', 'foxi',
      'miaomiao-sikao', 'jijiji', 'yalida', 'zaima', 'mojito', 'fanfan',
      'duanshanglai', 'zhichiyikou', 'shounimenlailiao', 'dadan', 'wo',
      'zhibuliao', 'bamai', 'baishen', 'touting', 'taishaole', 'shangan',
      'aoyechonglang', '20sui', 'gaodaozhongyang', 'zaiyebuwanchouxiang', 'bugeitangjiu-daolan',
    ],
  },
];

const StickerGallery = () => {
  const [activeSeries, setActiveSeries] = useState(0);
  const [previewSticker, setPreviewSticker] = useState<{ src: string; name: string } | null>(null);

  const handlePreview = useCallback((src: string, name: string) => {
    setPreviewSticker({ src, name });
  }, []);

  const closePreview = useCallback(() => {
    setPreviewSticker(null);
  }, []);

  const series = STICKER_SERIES[activeSeries];

  return (
    <section className="px-4 pb-8">
      <div className="rk-card p-5">
        {/* 标题 + 数量 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">
            表情包
          </h3>
          <span className="text-white/25 text-xs">
            {STICKER_SERIES.reduce((sum, s) => sum + s.stickers.length, 0)} 枚
          </span>
        </div>

        {/* 系列切换 */}
        <div className="flex gap-2 mb-4">
          {STICKER_SERIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSeries(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSeries === idx
                  ? 'bg-rk-gold text-rk-dark'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* 网格 */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {series.stickers.map((name) => {
            const src = `${series.folder}/${name}.png`;
            return (
              <button
                key={name}
                onClick={() => handlePreview(src, name)}
                className="bg-white/5 hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                title={name}
              >
                <img
                  src={src}
                  alt={name}
                  className="w-full aspect-square object-contain"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 预览弹窗 */}
      {previewSticker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative rk-card p-6 max-w-xs mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-colors text-sm"
            >
              ✕
            </button>
            <img
              src={previewSticker.src}
              alt={previewSticker.name}
              className="w-48 h-48 object-contain mx-auto mb-3"
            />
            <p className="text-center text-white/70 text-sm">
              {previewSticker.name}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default StickerGallery;
