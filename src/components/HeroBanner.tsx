export default function HeroBanner() {
  return (
    <div
      className="shrink-0 flex items-center"
      style={{
        padding: '12px 28px',
        background: 'linear-gradient(90deg, #6C63FF08, #00D4AA06, transparent)',
        borderBottom: '1px solid #2a2a4a',
      }}
    >
      <p className="text-[13px] leading-relaxed" style={{ color: '#7a7a98' }}>
        <span className="font-semibold" style={{ color: '#b0b0cc' }}>PromptDeck</span> detects your active app
        and fills your MX Creative Console with AI actions. Press a button, turn the dial, get results instantly.
      </p>
    </div>
  );
}
