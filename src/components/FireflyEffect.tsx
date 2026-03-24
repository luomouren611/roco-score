import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const FireflyEffect = () => {
  const { isDark } = useTheme();

  const particles = useMemo(() => {
    // 暗色：紫蓝金  |  亮色：柔粉蓝紫
    const darkColors = [
      'rgba(160, 130, 255, 0.7)',
      'rgba(124, 92, 252, 0.6)',
      'rgba(80, 200, 255, 0.6)',
      'rgba(255, 209, 81, 0.5)',
      'rgba(160, 200, 255, 0.5)',
    ];
    const lightColors = [
      'rgba(160, 130, 255, 0.5)',
      'rgba(200, 160, 255, 0.4)',
      'rgba(120, 200, 255, 0.35)',
      'rgba(255, 180, 120, 0.35)',
      'rgba(255, 150, 200, 0.3)',
    ];
    const colors = isDark ? darkColors : lightColors;

    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 12,
      opacity: isDark ? (Math.random() * 0.4 + 0.05) : (Math.random() * 0.3 + 0.05),
      color: colors[Math.floor(Math.random() * colors.length)],
      glowSize: Math.random() * 6 + 3,
    }));
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.glowSize}px ${p.color}`,
            animation: `magic-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
      <style>{`
        @keyframes magic-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
          25% { transform: translate(12px, -20px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(-8px, -10px) scale(0.8); opacity: 0.15; }
          75% { transform: translate(5px, -25px) scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default FireflyEffect;
