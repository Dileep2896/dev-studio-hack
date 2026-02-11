import { useState, useEffect } from 'react';
import Logo from './Logo';
import ConsoleHardware from './ConsoleHardware';

interface Props {
  onReplayTour: () => void;
  onOpenGallery: () => void;
}

export default function Header({ onReplayTour, onOpenGallery }: Props) {
  const [actionsCount, setActionsCount] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => setActionsCount((c) => c + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="flex items-center justify-between shrink-0"
      style={{ height: 72, padding: '0 28px', borderBottom: '1px solid #2a2a4a', background: '#0a0a14' }}
    >
      <div className="flex items-center" style={{ gap: 14 }}>
        <Logo />
        <div>
          <h1 className="font-bold tracking-tight leading-tight" style={{ fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>
            Prompt<span style={{ color: '#00D4AA' }}>Deck</span>
          </h1>
          <p className="text-[12px] leading-tight" style={{ color: '#5a5a78' }}>
            AI Command Center for Logitech MX
          </p>
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 20 }}>
        <div className="flex items-center" style={{ gap: 10, padding: '4px 12px', borderRadius: 8, background: '#12122a', border: '1px solid #2a2a4a' }}>
          <ConsoleHardware />
          <span className="text-[11px] font-mono" style={{ color: '#5a5a78' }}>MX Creative Console</span>
        </div>
        <span className="text-[13px]" style={{ color: '#5a5a78' }}>
          AI Actions Today:{' '}
          <span className="font-mono font-semibold" style={{ color: '#00D4AA' }}>
            {actionsCount}
          </span>
        </span>
        <span className="text-[13px]" style={{ color: '#5a5a78' }}>
          Time Saved:{' '}
          <span className="font-mono font-semibold" style={{ color: '#00D4AA' }}>
            2h 14m
          </span>
        </span>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#00D4AA' }} />
          <span className="text-[12px] font-mono tracking-wider font-medium" style={{ color: '#00D4AA' }}>
            CONNECTED
          </span>
        </div>
        <button
          onClick={onOpenGallery}
          title="View screenshots"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#222240',
            border: '1px solid #333350',
            color: '#8888A8',
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C63FF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333350'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </button>
        <button
          onClick={onReplayTour}
          title="Replay guided tour"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#222240',
            border: '1px solid #333350',
            color: '#8888A8',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C63FF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333350'; }}
        >
          ?
        </button>
      </div>
    </header>
  );
}
