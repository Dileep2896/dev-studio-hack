export default function Logo() {
  // Diagonal pattern: top-left, center, bottom-right are active
  const dots = [
    true, false, false,
    false, true, false,
    false, false, true,
  ];

  return (
    <div
      className="shrink-0 relative flex items-center justify-center"
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #6C63FF, #4F46E5)',
        boxShadow: '0 6px 24px rgba(108, 99, 255, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
    >
      {/* Glassmorphism shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12), transparent 50%)',
        }}
      />

      {/* 3x3 grid */}
      <div className="relative grid grid-cols-3" style={{ gap: 3 }}>
        {dots.map((active, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 2.5,
              background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              boxShadow: active ? '0 0 6px rgba(255,255,255,0.4)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
