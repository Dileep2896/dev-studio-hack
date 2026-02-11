import { useState, useEffect, useRef } from 'react';
import type { AppConfig } from '../data/apps';
import ConsoleButton from './ConsoleButton';

interface Props {
  app: AppConfig;
  activeButton: number;
  onButtonClick: (index: number) => void;
}

export default function ConsoleGrid({ app, activeButton, onButtonClick }: Props) {
  const [visible, setVisible] = useState(true);
  const prevAppRef = useRef(app.id);

  useEffect(() => {
    if (prevAppRef.current !== app.id) {
      setVisible(false);
      const timer = setTimeout(() => {
        setVisible(true);
        prevAppRef.current = app.id;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [app.id]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <h3 className="text-[12px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
          MX Creative Console
        </h3>
        <span className="text-[12px] font-mono tracking-wider uppercase font-medium" style={{ color: app.color }}>
          9 buttons
        </span>
      </div>

      {/* 3x3 grid */}
      <div className="grid grid-cols-3" style={{ gap: 10 }}>
        {app.buttons.map((button, i) => (
          <ConsoleButton
            key={`${app.id}-${i}`}
            button={button}
            isActive={activeButton === i}
            appColor={app.color}
            animDelay={i * 60}
            isVisible={visible}
            onClick={() => onButtonClick(i)}
          />
        ))}
      </div>

      {/* Description */}
      {activeButton >= 0 && (
        <div
          className="rounded-xl text-[13px] leading-relaxed transition-all duration-300"
          style={{
            marginTop: 16,
            padding: '12px 16px',
            background: `${app.color}08`,
            borderLeft: `3px solid ${app.color}40`,
            color: '#8888a8',
          }}
        >
          <span className="font-semibold" style={{ color: '#e0e0f0' }}>
            {app.buttons[activeButton]?.label}
          </span>
          {' \u2014 '}
          {app.buttons[activeButton]?.description}
        </div>
      )}
    </div>
  );
}
