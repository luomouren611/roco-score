import { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDark } = useTheme();

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
          <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-purple-800'}`}>
            表情包
          </h3>
          <span className={`text-xs ${isDark ? 'text-white/25' : 'text-purple-400/40'}`}>
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
                  : isDark
                    ? 'bg-white/5 text-white/50 hover:bg-white/10'
                    : 'bg-purple-100/40 text-purple-500/60 hover:bg-purple-100/60'
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
                className={`rounded-lg p-1.5 transition-colors ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10'
                    : 'bg-purple-100/20 hover:bg-purple-100/40'
                }`}
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
          className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
            isDark ? 'bg-black/60' : 'bg-black/30'
          }`}
          onClick={closePreview}
        >
          <div
            className="relative rk-card p-6 max-w-xs mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full transition-colors text-sm ${
                isDark
                  ? 'bg-white/10 text-white/50 hover:text-white hover:bg-white/20'
                  : 'bg-purple-100/40 text-purple-400/60 hover:text-purple-600 hover:bg-purple-100/60'
              }`}
            >
              ✕
            </button>
            <img
              src={previewSticker.src}
              alt={previewSticker.name}
              className="w-48 h-48 object-contain mx-auto mb-3"
            />
            <p className={`text-center text-sm ${isDark ? 'text-white/70' : 'text-purple-600/70'}`}>
              {previewSticker.name}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default StickerGallery;
