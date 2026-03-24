import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="text-center py-8 mt-4 px-4">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className={`h-px w-8 bg-gradient-to-r from-transparent ${isDark ? 'to-rk-purple/20' : 'to-purple-300/30'}`} />
        <span className={`text-xs ${isDark ? 'text-rk-purple-light/30' : 'text-purple-300/50'}`}>✦</span>
        <div className={`h-px w-8 bg-gradient-to-l from-transparent ${isDark ? 'to-rk-purple/20' : 'to-purple-300/30'}`} />
      </div>
      <p className={`text-xs mb-1 ${isDark ? 'text-rk-text-3/50' : 'text-purple-500/50'}`}>
        洛克王国 · 账号鉴定所
      </p>
      <p className={`text-xs mb-4 ${isDark ? 'text-rk-text-muted/50' : 'text-purple-400/40'}`}>
        仅供娱乐参考
      </p>
      <p className={`text-[10px] max-w-sm mx-auto leading-relaxed ${isDark ? 'text-rk-text-muted/30' : 'text-purple-400/30'}`}>
        抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
      </p>
    </footer>
  );
};

export default Footer;
