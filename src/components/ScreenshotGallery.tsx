import { useState } from 'react';

const screenshots = [
  { src: '/dashboard-vscode.png', label: 'VS Code Dashboard', caption: 'AI-powered coding actions with refactor output' },
  { src: '/dashboard-figma.png', label: 'Figma Dashboard', caption: 'Design-focused AI actions with accessibility audit' },
  { src: '/tour-active-app.png', label: 'Tour: Active App', caption: 'Walkthrough step 1 — auto-detect your active application' },
  { src: '/tour-smart-buttons.png', label: 'Tour: Smart Buttons', caption: 'Walkthrough step 2 — 9 context-aware LCD buttons' },
  { src: '/tour-ai-results.png', label: 'Tour: AI Results', caption: 'Walkthrough step 3 — instant AI output preview' },
  { src: '/tour-ai-dial.png', label: 'Tour: AI Dial', caption: 'Walkthrough step 4 — analog control for AI depth' },
  { src: '/tour-actions-ring.png', label: 'Tour: Actions Ring', caption: 'Walkthrough step 5 — MX Master4 ring gestures' },
  { src: '/tour-macro-chain.png', label: 'Tour: Macro Chain', caption: 'Walkthrough step 6 — one-button multi-step workflows' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ScreenshotGallery({ open, onClose }: Props) {
  const [selected, setSelected] = useState(0);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90vw',
          maxWidth: 1100,
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Screenshots
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: 24,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Main image */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #2a2a4a',
            background: '#0a0a14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={screenshots[selected].src}
            alt={screenshots[selected].label}
            style={{
              maxWidth: '100%',
              maxHeight: '60vh',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Caption */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#e0e0f0' }}>
            {screenshots[selected].label}
          </span>
          <span style={{ fontSize: 13, color: '#6a6a88', marginLeft: 12 }}>
            {screenshots[selected].caption}
          </span>
        </div>

        {/* Thumbnails */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {screenshots.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setSelected(i)}
              style={{
                width: 100,
                height: 60,
                borderRadius: 8,
                overflow: 'hidden',
                border: selected === i ? '2px solid #6C63FF' : '2px solid #2a2a4a',
                background: '#0a0a14',
                cursor: 'pointer',
                opacity: selected === i ? 1 : 0.5,
                transition: 'all 0.2s',
                padding: 0,
              }}
            >
              <img
                src={s.src}
                alt={s.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
