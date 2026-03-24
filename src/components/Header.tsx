import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark } = useTheme();

  return (
    <header className="pt-12 pb-8 text-center px-4">
      {/* 装饰星星 */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`text-xs opacity-60 ${isDark ? 'text-rk-purple-light' : 'text-purple-400'}`}>✦</span>
        <span className={`text-[10px] opacity-40 ${isDark ? 'text-rk-cyan' : 'text-blue-400'}`}>✧</span>
        <span className={`text-xs opacity-50 ${isDark ? 'text-rk-gold' : 'text-amber-400'}`}>✦</span>
      </div>

      <h1 className={`text-4xl md:text-5xl font-black mb-1 ${isDark ? 'magic-title' : ''}`}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #C4B8F0 0%, #FFFFFF 40%, #A082FF 70%, #50C8FF 100%)'
            : 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 30%, #5B21B6 60%, #4F46E5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
        }}
      >
        洛克王国
      </h1>
      <h2 className="text-lg md:text-xl font-semibold mb-3"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #FFD151, #FFA940)'
            : 'linear-gradient(135deg, #F59E0B, #D97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
        }}
      >
        ⚔ 账号鉴定所 ⚔
      </h2>
      <p className={`text-sm inline-block ${
        isDark
          ? 'text-rk-text-3 opacity-80'
          : 'text-purple-700 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1 shadow-sm'
      }`}>
        输入你的账号，鉴定它的传说等级
      </p>
    </header>
  );
};

export default Header;
