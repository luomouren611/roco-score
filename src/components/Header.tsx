const Header = () => {
  return (
    <header className="pt-12 pb-8 text-center px-4">
      {/* 装饰星星 */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-rk-purple-light text-xs opacity-60">✦</span>
        <span className="text-rk-cyan text-[10px] opacity-40">✧</span>
        <span className="text-rk-gold text-xs opacity-50">✦</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-1 magic-title"
        style={{
          background: 'linear-gradient(135deg, #C4B8F0 0%, #FFFFFF 40%, #A082FF 70%, #50C8FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        洛克王国
      </h1>
      <h2 className="text-lg md:text-xl font-semibold mb-3"
        style={{
          background: 'linear-gradient(135deg, #FFD151, #FFA940)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        ⚔ 账号鉴定所 ⚔
      </h2>
      <p className="text-rk-text-3 text-sm opacity-80">
        输入你的账号，鉴定它的传说等级
      </p>
    </header>
  );
};

export default Header;
