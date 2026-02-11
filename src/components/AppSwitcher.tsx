import { apps, type AppConfig } from '../data/apps';

interface Props {
  activeApp: AppConfig;
  onSwitch: (app: AppConfig) => void;
}

export default function AppSwitcher({ activeApp, onSwitch }: Props) {
  return (
    <div
      className="flex items-center shrink-0"
      style={{ height: 60, padding: '0 28px', gap: 20, borderBottom: '1px solid #2a2a4a', background: '#0a0a14' }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        {apps.map((app) => {
          const isActive = app.id === activeApp.id;
          return (
            <button
              key={app.id}
              onClick={() => onSwitch(app)}
              className="rounded-lg text-[13px] font-medium cursor-pointer flex items-center"
              style={{
                padding: '6px 14px',
                gap: 8,
                background: isActive ? `${app.color}18` : 'transparent',
                border: `1px solid ${isActive ? `${app.color}50` : '#2a2a4a'}`,
                color: isActive ? app.color : '#5a5a78',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-[15px] leading-none">{app.icon}</span>
              {app.name}
            </button>
          );
        })}
      </div>
      <div className="flex items-center text-[12px] font-mono" style={{ gap: 8, color: '#3a3a55' }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeApp.color }} />
        Active application detected — buttons updated
      </div>
    </div>
  );
}
