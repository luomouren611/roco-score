import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface InputSectionProps {
  onScore: (account: string) => void;
  isLoading: boolean;
}

const InputSection = ({ onScore, isLoading }: InputSectionProps) => {
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const { isDark } = useTheme();

  const validateAndScore = () => {
    const trimmed = account.trim();

    if (!trimmed) {
      setError('请输入账号');
      return;
    }

    if (!/^\d+$/.test(trimmed)) {
      setError('账号只能包含数字');
      return;
    }

    if (trimmed.length < 5 || trimmed.length > 8) {
      setError('请输入5-8位数字账号');
      return;
    }

    setError('');
    onScore(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      validateAndScore();
    }
  };

  return (
    <section className="flex justify-center px-4 mb-8">
      <div className="rk-card rk-card-glow p-6 w-full max-w-lg">
        <div className="mb-5">
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-rk-text-2' : 'text-purple-600/80'}`}>
            <span className="mr-1.5 opacity-60">🔮</span>
            输入你的洛克王国账号
          </label>
          <input
            type="text"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="5-8位数字账号"
            maxLength={8}
            className={`w-full px-4 py-3 rounded-xl text-lg transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border border-rk-purple/20 text-white placeholder-white/20 focus:border-rk-purple/50 focus:bg-white/[0.07]'
                : 'bg-white/60 border border-purple-200/50 text-purple-900 placeholder-purple-300/40 focus:border-purple-400/60 focus:bg-white/80'
            }`}
            style={{ outline: 'none' }}
          />
          {error && (
            <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>
              {error}
            </p>
          )}
        </div>

        <button
          onClick={validateAndScore}
          disabled={isLoading}
          className="rk-btn-primary w-full py-3 text-base 
            flex items-center justify-center gap-2
            cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>鉴定中...</span>
            </>
          ) : (
            <span>✨ 开始鉴定</span>
          )}
        </button>

        <p className={`mt-3 text-center text-xs ${isDark ? 'text-rk-text-muted' : 'text-purple-400/60'}`}>
          支持 5~8 位数字账号
        </p>
      </div>
    </section>
  );
};

export default InputSection;
