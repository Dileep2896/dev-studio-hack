import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  // 0: initial (logo scales in)
  // 1: dots light up sequentially
  // 2: brand text appears
  // 3: progress bar fills
  // 4: status text
  // 5: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1800),
      setTimeout(() => setPhase(5), 2800),
      setTimeout(() => onComplete(), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Diagonal pattern same as Logo: 0,4,8 are active
  const dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const activeDots = [0, 4, 8];

  // In phase 1, light dots sequentially with stagger
  const getDotLit = (index: number) => {
    if (phase < 1) return false;
    if (!activeDots.includes(index)) return false;
    const order = activeDots.indexOf(index);
    // Each dot lights 200ms apart starting at phase 1
    return phase >= 1 && order >= 0;
  };

  const getDotDelay = (index: number) => {
    const order = activeDots.indexOf(index);
    if (order < 0) return '0ms';
    return `${order * 200}ms`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0a0a14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase >= 5 ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Ambient glow behind logo */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.15), transparent 70%)',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: 'relative',
          width: 80,
          height: 80,
          borderRadius: 20,
          background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
          boxShadow: phase >= 2
            ? '0 12px 48px rgba(108, 99, 255, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 6px 24px rgba(108, 99, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: phase >= 1 ? 'scale(1)' : 'scale(0.7)',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Shine */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* 3x3 grid */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 5,
          }}
        >
          {dots.map((i) => {
            const isActive = activeDots.includes(i);
            const lit = getDotLit(i);
            return (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: lit
                    ? 'rgba(255,255,255,0.9)'
                    : isActive
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.2)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  boxShadow: lit ? '0 0 12px rgba(255,255,255,0.5)' : 'none',
                  opacity: phase < 1 ? 0.3 : isActive ? 1 : 0.4,
                  transform: lit ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.4s ease',
                  transitionDelay: isActive ? getDotDelay(i) : '0ms',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Brand text */}
      <div
        style={{
          marginTop: 32,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.03em',
            textAlign: 'center',
          }}
        >
          Prompt<span style={{ color: '#00D4AA' }}>Deck</span>
        </h1>
        <p
          className="font-mono"
          style={{
            fontSize: 13,
            color: '#5a5a78',
            textAlign: 'center',
            marginTop: 8,
            letterSpacing: '0.05em',
          }}
        >
          AI Command Center for Logitech MX
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 40,
          width: 200,
          height: 3,
          borderRadius: 2,
          background: '#1a1a2e',
          overflow: 'hidden',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 2,
            background: 'linear-gradient(90deg, #6C63FF, #00D4AA)',
            width: phase >= 4 ? '100%' : phase >= 3 ? '60%' : '0%',
            transition: phase >= 4 ? 'width 0.8s ease' : 'width 0.5s ease',
          }}
        />
      </div>

      {/* Status text */}
      <p
        className="font-mono"
        style={{
          marginTop: 16,
          fontSize: 11,
          color: '#3a3a55',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {phase >= 4 ? 'Ready' : 'Connecting to MX Console\u2026'}
      </p>
    </div>
  );
}
