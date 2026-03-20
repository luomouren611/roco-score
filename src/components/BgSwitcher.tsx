import { useState, useCallback } from 'react';

const BACKGROUNDS = [
  { id: 'sance', name: '三测宣传', src: '/backgrounds/beta-test-poster.jpeg' },
  { id: 'dingdang', name: '定档宣传', src: '/backgrounds/release-poster.png' },
];

const BgSwitcher = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [show, setShow] = useState(false);

  const switchBg = useCallback((idx: number) => {
    setCurrentBg(idx);
    document.body.style.backgroundImage = `url('${BACKGROUNDS[idx].src}')`;
    setShow(false);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-30">
      <button
        onClick={() => setShow(!show)}
        className="w-8 h-8 rounded-lg bg-rk-purple/20 backdrop-blur-sm border border-rk-purple/20 flex items-center justify-center text-xs text-rk-purple-light/60 hover:text-rk-purple-light hover:bg-rk-purple/30 transition-all"
        title="切换背景"
      >
        🎨
      </button>

      {show && (
        <div className="absolute top-10 right-0 w-44 rk-card p-2 animate-scale-in">
          {BACKGROUNDS.map((bg, idx) => (
            <button
              key={bg.id}
              onClick={() => switchBg(idx)}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${
                currentBg === idx
                  ? 'bg-rk-purple/20 text-white'
                  : 'text-rk-text-3 hover:bg-white/5'
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
  );
};

export default BgSwitcher;
