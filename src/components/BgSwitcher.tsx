import { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DARK_BACKGROUNDS = [
  { id: 'default', name: '默认暗色', src: '/bg.jpeg' },
  { id: 'sance', name: '三测宣传', src: '/backgrounds/beta-test-poster.jpeg' },
  { id: 'dingdang', name: '定档宣传', src: '/backgrounds/release-poster.png' },
];

const LIGHT_BACKGROUNDS = [
  { id: 'default-light', name: '默认亮色', src: '/bg.png' },
  { id: 'sance', name: '三测宣传', src: '/backgrounds/beta-test-poster.jpeg' },
  { id: 'dingdang', name: '定档宣传', src: '/backgrounds/release-poster.png' },
];

const BgSwitcher = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [currentBg, setCurrentBg] = useState(0);
  const [show, setShow] = useState(false);

  const backgrounds = isDark ? DARK_BACKGROUNDS : LIGHT_BACKGROUNDS;

  const switchBg = useCallback((idx: number) => {
    setCurrentBg(idx);
    document.body.style.backgroundImage = `url('${backgrounds[idx].src}')`;
    setShow(false);
  }, [backgrounds]);

  const handleThemeSwitch = useCallback(() => {
    toggleTheme();
    setCurrentBg(0); // 切换主题时重置背景为默认
    setShow(false);
  }, [toggleTheme]);

  return (
    <div className="fixed top-4 right-4 z-30 flex gap-2">
      {/* 主题切换按钮 */}
      <button
        onClick={handleThemeSwitch}
        className={`w-8 h-8 rounded-lg backdrop-blur-sm flex items-center justify-center text-xs transition-all ${
          isDark
            ? 'bg-rk-purple/20 border border-rk-purple/20 text-rk-purple-light/60 hover:text-rk-purple-light hover:bg-rk-purple/30'
            : 'bg-white/40 border border-purple-300/30 text-purple-500/70 hover:text-purple-600 hover:bg-white/60'
        }`}
        title={isDark ? '切换为亮色主题' : '切换为暗色主题'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* 背景切换按钮 */}
      <div className="relative">
        <button
          onClick={() => setShow(!show)}
          className={`w-8 h-8 rounded-lg backdrop-blur-sm flex items-center justify-center text-xs transition-all ${
            isDark
              ? 'bg-rk-purple/20 border border-rk-purple/20 text-rk-purple-light/60 hover:text-rk-purple-light hover:bg-rk-purple/30'
              : 'bg-white/40 border border-purple-300/30 text-purple-500/70 hover:text-purple-600 hover:bg-white/60'
          }`}
          title="切换背景"
        >
          🎨
        </button>

        {show && (
          <div className="absolute top-10 right-0 w-44 rk-card p-2 animate-scale-in">
            <div className={`px-2 py-1.5 text-[10px] font-medium mb-1 ${isDark ? 'text-rk-text-muted' : 'text-purple-400'}`}>
              当前主题: {isDark ? '暗色' : '亮色'}
            </div>
            {backgrounds.map((bg, idx) => (
              <button
                key={bg.id}
                onClick={() => switchBg(idx)}
                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${
                  currentBg === idx
                    ? isDark
                      ? 'bg-rk-purple/20 text-white'
                      : 'bg-purple-100/60 text-purple-700'
                    : isDark
                      ? 'text-rk-text-3 hover:bg-white/5'
                      : 'text-purple-500/70 hover:bg-purple-50/50'
                }`}
              >
                <img
                  src={bg.src}
                  alt={bg.name}
                  className="w-10 h-7 rounded object-cover opacity-80"
                />
                <span className="text-xs">{bg.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BgSwitcher;
