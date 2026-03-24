import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TRACKS = [
  { id: 'cg', name: '风格化CG', src: '/music/stylized-cg.wav' },
  { id: 'wizard', name: '黑巫师之影', src: '/music/dark-wizard-shadow.wav' },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const { isDark } = useTheme();

  const track = TRACKS[currentTrack];

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, updateProgress]);

  const switchTrack = useCallback((idx: number) => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    setCurrentTrack(idx);
    setProgress(0);
    setIsPlaying(false);

    setTimeout(() => {
      if (audioRef.current && wasPlaying) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    }, 100);
  }, [isPlaying, updateProgress]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, ratio * duration));
    setProgress(audioRef.current.currentTime);
  }, [duration]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          const next = (currentTrack + 1) % TRACKS.length;
          switchTrack(next);
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
              setIsPlaying(true);
              animationRef.current = requestAnimationFrame(updateProgress);
            }
          }, 200);
        }}
      />

      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${expanded ? 'translate-y-0' : 'translate-y-[calc(100%-48px)]'}`}>
        {/* 迷你条 */}
        <div
          className={`h-12 backdrop-blur-md flex items-center px-4 gap-3 cursor-pointer ${
            isDark
              ? 'bg-rk-bg-dark/90 border-t border-rk-purple/10'
              : 'bg-white/70 border-t border-purple-200/30'
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex-1 min-w-0">
            <p className={`text-xs truncate ${isDark ? 'text-rk-text-3' : 'text-purple-500/70'}`}>
              🎵 {track.name}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #7C5CFC, #5B8DEF)',
            }}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3.5" height="12" rx="1" />
                <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
            )}
          </button>

          <span className={`text-[10px] transition-transform duration-200 ${expanded ? 'rotate-180' : ''} ${isDark ? 'text-rk-text-muted' : 'text-purple-300/60'}`}>
            ▲
          </span>
        </div>

        {/* 展开面板 */}
        <div className={`backdrop-blur-md px-4 py-3 ${
          isDark
            ? 'bg-rk-bg-dark/95 border-t border-rk-purple/10'
            : 'bg-white/80 border-t border-purple-200/30'
        }`}>
          <div className="mb-3">
            <div
              className={`h-1 rounded-full cursor-pointer overflow-hidden ${isDark ? 'bg-rk-purple/10' : 'bg-purple-200/30'}`}
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  width: duration ? `${(progress / duration) * 100}%` : '0%',
                  background: 'linear-gradient(90deg, #7C5CFC, #5B8DEF)',
                }}
              />
            </div>
            <div className={`flex justify-between text-[10px] mt-1 ${isDark ? 'text-rk-text-muted' : 'text-purple-300/60'}`}>
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="space-y-1">
            {TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => switchTrack(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  currentTrack === idx
                    ? isDark
                      ? 'bg-rk-purple/15 text-rk-purple-light'
                      : 'bg-purple-100/60 text-purple-600'
                    : isDark
                      ? 'text-rk-text-muted hover:bg-white/5'
                      : 'text-purple-400/60 hover:bg-purple-50/50'
                }`}
              >
                {t.name}
                {currentTrack === idx && isPlaying && (
                  <span className={`ml-2 ${isDark ? 'text-rk-text-muted' : 'text-purple-300/60'}`}>播放中</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
