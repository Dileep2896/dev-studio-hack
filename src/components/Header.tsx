import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header() {
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
      <div className="flex items-center" style={{ gap: 28 }}>
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
      </div>
    </header>
  );
}
