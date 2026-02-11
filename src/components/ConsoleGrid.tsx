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
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [app.id]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <h3 className="text-[12px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
          MX Creative Console
        </h3>
        <span
          className="text-[12px] font-mono tracking-wider uppercase font-medium"
          style={{ color: app.color, transition: 'color 0.4s ease' }}
        >
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
            animDelay={i * 50}
            isVisible={visible}
            onClick={() => onButtonClick(i)}
          />
        ))}
      </div>

    </div>
  );
}
