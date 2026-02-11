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
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl border transition-all duration-300 cursor-pointer w-full"
      style={{
        padding: '16px 12px',
        background: isActive ? `${appColor}15` : '#0c0c1c',
        borderColor: isActive ? appColor : '#2a2a4a',
        boxShadow: isActive ? `0 0 20px ${appColor}20, inset 0 0 20px ${appColor}06` : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
        transitionDelay: `${animDelay}ms`,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = `${appColor}50`;
          e.currentTarget.style.boxShadow = `0 0 14px ${appColor}12`;
          e.currentTarget.style.transform = 'scale(1.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = '#2a2a4a';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      <span className="text-2xl leading-none">{button.icon}</span>
      <span className="text-[12px] font-medium leading-none" style={{ color: '#8888a8' }}>
        {button.label}
      </span>
    </button>
  );
}
