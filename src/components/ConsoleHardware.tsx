export default function ConsoleHardware() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Console body */}
      <rect x="4" y="6" width="40" height="36" rx="6" fill="#1a1a2e" stroke="#3a3a55" strokeWidth="1.5" />

      {/* Screen area */}
      <rect x="8" y="10" width="20" height="18" rx="3" fill="#0e0e1e" stroke="#2a2a4a" strokeWidth="1" />

      {/* 3x3 button grid on screen */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={10 + col * 6}
            y={12 + row * 5}
            width={4.5}
            height={3.5}
            rx={1}
            fill={row === col ? '#6C63FF' : '#2a2a4a'}
            opacity={row === col ? 0.9 : 0.5}
          />
        )),
      )}

      {/* Dial */}
      <circle cx="36" cy="19" r="7" fill="#0e0e1e" stroke="#3a3a55" strokeWidth="1.5" />
      <circle cx="36" cy="19" r="4.5" fill="none" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20" strokeDashoffset="6" />
      <circle cx="36" cy="15.5" r="1" fill="#6C63FF" />

      {/* Bottom strip */}
      <rect x="8" y="32" width="32" height="6" rx="2" fill="#0e0e1e" stroke="#2a2a4a" strokeWidth="0.5" />
      <text x="24" y="36.5" textAnchor="middle" fill="#5a5a78" fontSize="4" fontFamily="monospace">
        MX CONSOLE
      </text>
    </svg>
  );
}
