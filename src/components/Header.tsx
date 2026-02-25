import Logo from './Logo';
import ConsoleHardware from './ConsoleHardware';

interface Props {
  onReplayTour: () => void;
  actionsCount: number;
}

function formatTimeSaved(actions: number): string {
  // ~45 seconds saved per AI action vs manual copy-paste workflow
  const totalSeconds = actions * 45;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export default function Header({ onReplayTour, actionsCount }: Props) {

  return (
    <>
    {/* Prototype banner — sticky */}
    <div
      className="flex items-center justify-center"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '6px 16px',
        background: 'linear-gradient(90deg, #6C63FF22, #00D4AA18, #6C63FF22)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #6C63FF33',
        gap: 8,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: 4,
          background: '#6C63FF',
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: '16px',
        }}
      >
        Prototype
      </span>
      <span className="text-[12px]" style={{ color: '#9a9ab8' }}>
        This is an interactive demo - the full product is currently being built.
      </span>
    </div>
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
            {formatTimeSaved(actionsCount)}
          </span>
        </span>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#00D4AA' }} />
          <span className="text-[12px] font-mono tracking-wider font-medium" style={{ color: '#00D4AA' }}>
            CONNECTED
          </span>
        </div>
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
    </>
  );
}
