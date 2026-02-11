import { useState } from 'react';
import type { AppButton } from '../data/apps';

interface Props {
  button: AppButton;
  isActive: boolean;
  appColor: string;
  animDelay: number;
  isVisible: boolean;
  onClick: () => void;
}

export default function ConsoleButton({ button, isActive, appColor, animDelay, isVisible, onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={(e) => {
          setHovered(true);
          if (!isActive) {
            e.currentTarget.style.borderColor = `${appColor}50`;
            e.currentTarget.style.boxShadow = `0 0 14px ${appColor}12`;
            e.currentTarget.style.transform = 'scale(1.03)';
          }
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          if (!isActive) {
            e.currentTarget.style.borderColor = '#2a2a4a';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        className="flex flex-col items-center justify-center gap-2.5 rounded-xl border cursor-pointer w-full"
        style={{
          padding: '16px 12px',
          background: isActive ? `${appColor}15` : '#0c0c1c',
          borderColor: isActive ? appColor : '#2a2a4a',
          boxShadow: isActive ? `0 0 20px ${appColor}20, inset 0 0 20px ${appColor}06` : 'none',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${animDelay}ms`,
        }}
      >
        <span className="text-2xl leading-none">{button.icon}</span>
        <span className="text-[12px] font-medium leading-none" style={{ color: '#8888a8' }}>
          {button.label}
        </span>
      </button>

      {/* Tooltip */}
      {hovered && button.description && (
        <div
          className="absolute left-1/2 z-50 pointer-events-none"
          style={{
            bottom: '100%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
          }}
        >
          <div
            className="text-[11px] font-mono leading-snug text-center"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: '#1a1a34',
              border: `1px solid ${appColor}40`,
              color: '#c0c0d8',
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 8px ${appColor}15`,
              maxWidth: 200,
              width: 'max-content',
            }}
          >
            {button.description}
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2"
            style={{
              top: '100%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `5px solid ${appColor}40`,
            }}
          />
        </div>
      )}
    </div>
  );
}
