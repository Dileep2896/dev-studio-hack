import { useRef, useCallback, useEffect } from 'react';
import { getDialLevel } from '../data/outputs';

interface Props {
  value: number;
  onChange: (v: number) => void;
  label: string;
  appColor: string;
}

export default function Dial({ value, onChange, label, appColor }: Props) {
  const dragging = useRef(false);
  const lastY = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastY.current = e.clientY;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = lastY.current - e.clientY;
      lastY.current = e.clientY;
      onChange(Math.max(0, Math.min(100, value + delta * 0.5)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [value, onChange]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      onChange(Math.max(0, Math.min(100, value - e.deltaY * 0.3)));
    },
    [value, onChange],
  );

  const size = 120;
  const strokeW = 8;
  const radius = (size - strokeW) / 2;
  const center = size / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const level = getDialLevel(value);

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-[11px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
        AI Dial
      </h3>

      <div
        className="relative"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#0e0e1e" strokeWidth={strokeW} />
          <circle
            cx={center} cy={center} r={radius}
            fill="none" stroke={appColor} strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            className="transition-all duration-150"
            style={{ filter: `drop-shadow(0 0 8px ${appColor}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono tabular-nums leading-none" style={{ color: '#e0e0f0' }}>
            {Math.round(value)}
          </span>
          <span className="text-[10px] font-mono tracking-widest font-semibold mt-1.5" style={{ color: appColor }}>
            {level.toUpperCase()}
          </span>
        </div>
      </div>

      <span className="text-[11px] font-mono font-medium" style={{ color: `${appColor}90` }}>
        {label}
      </span>
      <span className="text-[10px] font-mono" style={{ color: '#3a3a55' }}>
        Drag or scroll to adjust
      </span>
    </div>
  );
}
