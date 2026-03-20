import { useState, useCallback } from 'react';
import { ScoreResult } from './types';
import { calculateScore } from './scoring';
import Header from './components/Header';
import InputSection from './components/InputSection';
import RulesSection from './components/RulesSection';
import FireflyEffect from './components/FireflyEffect';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import BgSwitcher from './components/BgSwitcher';
import ScorePopup from './components/ScorePopup';
import FloatingStickers from './components/FloatingStickers';

function App() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleScore = useCallback((account: string) => {
    setIsLoading(true);
    setShowPopup(false);

    setTimeout(() => {
      const scoreResult = calculateScore(account);
      setResult(scoreResult);
      setIsLoading(false);

      setTimeout(() => {
        setShowPopup(true);
      }, 100);
    }, 600);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  return (
    <div className="min-h-screen relative font-nunito pb-16">
      {/* 萤火虫漂浮背景 */}
      <FireflyEffect />

      {/* 表情包散落在页面两侧 */}
      <FloatingStickers />

      {/* 背景切换按钮 */}
      <BgSwitcher />

      {/* 页面内容 */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <Header />
        <InputSection onScore={handleScore} isLoading={isLoading} />
        <RulesSection />
        <Footer />
      </div>

      {/* 评分结果弹窗 */}
      {result && (
        <ScorePopup
          result={result}
          show={showPopup}
          onClose={handleClosePopup}
        />
      )}

      {/* 底部音乐播放器 */}
      <MusicPlayer />
    </div>
  );
}

export default App;
