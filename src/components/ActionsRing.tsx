import { useState } from 'react';

interface Props {
  appColor: string;
  onActivate: () => void;
}

export default function ActionsRing({ appColor, onActivate }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    onActivate();
    setTimeout(() => setIsSpinning(false), 800);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <h3 className="text-[11px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
        Actions Ring
      </h3>

      <button
        onClick={handleClick}
        className="relative cursor-pointer"
        style={{ width: 100, height: 100, background: 'transparent', border: 'none' }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            border: `3px solid ${isSpinning ? appColor : '#1e1e3a'}`,
            boxShadow: isSpinning ? `0 0 30px ${appColor}40, 0 0 60px ${appColor}15` : 'none',
            transform: isSpinning ? 'rotate(120deg)' : 'rotate(0deg)',
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            inset: 16,
            background: isSpinning ? `${appColor}10` : '#0e0e1e',
            border: `2px solid ${isSpinning ? appColor : '#1e1e3a'}`,
          }}
        >
          <span className="text-xl">{isSpinning ? '\u2728' : '\uD83D\uDDB1\uFE0F'}</span>
        </div>
        {/* Ping stays inside the button bounds */}
        {isSpinning && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-15"
            style={{ background: appColor }}
          />
        )}
      </button>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-mono font-medium" style={{ color: `${appColor}90` }}>
          MX Master4
        </span>
        <span className="text-[10px] font-mono" style={{ color: '#3a3a55' }}>
          Select &rarr; Twist &rarr; AI
        </span>
      </div>
    </div>
  );
}
