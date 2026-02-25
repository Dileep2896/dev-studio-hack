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
    <div className="flex flex-col items-center justify-center h-full" style={{ gap: 12 }}>
      <h3 className="text-[11px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
        MX Master4 Actions Ring
      </h3>

      <button
        onClick={handleClick}
        className="relative cursor-pointer shrink-0"
        style={{ width: 120, height: 120, background: 'transparent', border: 'none' }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            border: `3px solid ${isSpinning ? appColor : '#1e1e3a'}`,
            boxShadow: isSpinning ? `0 0 40px ${appColor}40, 0 0 80px ${appColor}15` : 'none',
            transform: isSpinning ? 'rotate(120deg)' : 'rotate(0deg)',
          }}
        />
        {/* Tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{
              width: 2,
              height: 7,
              background: isSpinning ? appColor : '#2a2a4a',
              borderRadius: 1,
              top: '50%',
              left: '50%',
              transformOrigin: '50% 0',
              transform: `translate(-50%, -60px) rotate(${deg}deg)`,
              transition: 'background 0.3s',
            }}
          />
        ))}
        {/* Inner ring */}
        <div
          className="absolute rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            inset: 18,
            background: isSpinning ? `${appColor}10` : '#0e0e1e',
            border: `2px solid ${isSpinning ? appColor : '#1e1e3a'}`,
          }}
        >
          <span className="text-sm font-mono font-bold" style={{ color: isSpinning ? appColor : '#5a5a78' }}>{isSpinning ? '* *' : 'MX'}</span>
        </div>
        {/* Ping stays inside the button bounds */}
        {isSpinning && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-15"
            style={{ background: appColor }}
          />
        )}
      </button>

      <div className="flex flex-col items-center" style={{ gap: 4 }}>
        <span className="text-[12px] font-mono font-semibold" style={{ color: appColor }}>
          MX Master4 Ring
        </span>
        <span className="text-[11px] font-mono leading-snug text-center" style={{ color: '#6a6a88', maxWidth: 220 }}>
          Select any text, twist the ring to trigger AI actions
        </span>
      </div>

      <div className="flex items-center flex-wrap justify-center" style={{ gap: 8 }}>
        {['Summarize', 'Rewrite', 'Translate'].map((action) => (
          <span
            key={action}
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              background: `${appColor}08`,
              border: `1px solid ${appColor}25`,
              color: `${appColor}90`,
            }}
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}
