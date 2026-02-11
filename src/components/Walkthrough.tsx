import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

interface StepConfig {
  target: string;          // data-tour attribute value
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const steps: StepConfig[] = [
  {
    target: 'app-switcher',
    title: 'Your Active App',
    description:
      'PromptDeck detects which app you\u2019re using. Click any app here to simulate switching. Watch how everything on the page changes to match.',
    position: 'bottom',
  },
  {
    target: 'button-grid',
    title: '9 Smart Buttons',
    description:
      'These represent the 9 physical LCD buttons on your MX Creative Console. Each one triggers a different AI action. They change automatically based on your active app. Click any button to see what it does.',
    position: 'right',
  },
  {
    target: 'output-panel',
    title: 'Instant AI Results',
    description:
      'When you press a button on the console, the AI result appears here instantly. No prompts to type, no tabs to switch. The output changes based on which button you pressed and where the dial is set.',
    position: 'left',
  },
  {
    target: 'dial-panel',
    title: 'The AI Dial',
    description:
      'This is the physical dial on the console. Drag up and down or scroll to control how detailed the AI response is. Low for a quick answer, high for a deep analysis. This is continuous analog control that no keyboard can replicate.',
    position: 'left',
  },
  {
    target: 'actions-ring',
    title: 'MX Master4 Actions Ring',
    description:
      'Select any text on your screen, twist the ring on your MX Master4 mouse, and get instant AI processing. Summarize, rewrite, or translate with a single gesture.',
    position: 'left',
  },
  {
    target: 'macro-chain',
    title: 'One Button Workflows',
    description:
      'Chain multiple AI steps into a single button press. Hit \u201CRun Macro\u201D to see it in action: capture screen, analyze, generate report, and send to Slack automatically.',
    position: 'right',
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function Walkthrough({ active, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const rafRef = useRef(0);

  const measure = useCallback(() => {
    const step = steps[currentStep];
    if (!step) return;
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, [currentStep]);

  // Fade in on activate
  useEffect(() => {
    if (active) {
      setCurrentStep(0);
      setFadingOut(false);
      // Small delay so DOM is ready
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [active]);

  // Measure target on step change & resize
  useEffect(() => {
    if (!active || !visible) return;
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    // Also re-measure periodically for layout shifts
    const interval = setInterval(measure, 500);
    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, visible, measure]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // Last step — close
      setFadingOut(true);
      setTimeout(() => {
        setVisible(false);
        setFadingOut(false);
        onComplete();
      }, 300);
    }
  }, [currentStep, onComplete]);

  const handleSkip = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      setFadingOut(false);
      onComplete();
    }, 300);
  }, [onComplete]);

  // Mobile: simple banner
  if (active && typeof window !== 'undefined' && window.innerWidth < 768) {
    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          padding: '14px 20px',
          background: '#1A1A2E',
          borderBottom: '1px solid #6C63FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span style={{ color: '#A0A0B8', fontSize: 13, lineHeight: 1.5 }}>
          PromptDeck turns your Logitech MX Console into an AI command center. Explore the demo below.
        </span>
        <button
          onClick={onComplete}
          style={{
            background: 'none',
            border: 'none',
            color: '#6C63FF',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Got it
        </button>
      </div>,
      document.body,
    );
  }

  if (!active || !visible || !targetRect) return null;

  const step = steps[currentStep];
  const pad = 8;
  const isLast = currentStep === steps.length - 1;

  // Cutout coordinates
  const cutLeft = targetRect.left - pad;
  const cutTop = targetRect.top - pad;
  const cutRight = targetRect.left + targetRect.width + pad;
  const cutBottom = targetRect.top + targetRect.height + pad;

  // Tooltip positioning
  const tooltipStyle = getTooltipPosition(step.position, targetRect, pad);

  // Arrow style
  const arrowStyle = getArrowStyle(step.position, targetRect, pad);

  const opacity = fadingOut ? 0 : 1;

  return createPortal(
    <div style={{ transition: 'opacity 0.3s ease', opacity }}>
      {/* Overlay with cutout */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          zIndex: 9998,
          transition: 'clip-path 0.25s ease',
          clipPath: `polygon(
            0% 0%, 0% 100%,
            ${cutLeft}px 100%, ${cutLeft}px ${cutTop}px,
            ${cutRight}px ${cutTop}px, ${cutRight}px ${cutBottom}px,
            ${cutLeft}px ${cutBottom}px, ${cutLeft}px 100%,
            100% 100%, 100% 0%
          )`,
        }}
        onClick={handleSkip}
      />

      {/* Pulse border around target */}
      <div
        className="tour-highlight-pulse"
        style={{
          position: 'fixed',
          top: cutTop,
          left: cutLeft,
          width: cutRight - cutLeft,
          height: cutBottom - cutTop,
          borderRadius: 16,
          border: '2px solid #6C63FF',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'all 0.25s ease',
        }}
      />

      {/* Tooltip card */}
      <div
        style={{
          position: 'fixed',
          zIndex: 10000,
          ...tooltipStyle,
          transition: 'all 0.25s ease',
        }}
      >
        {/* Arrow */}
        <div style={arrowStyle} />

        <div
          style={{
            background: '#1A1A2E',
            border: '1px solid #6C63FF',
            borderRadius: 12,
            padding: '20px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            maxWidth: 320,
            width: 320,
          }}
        >
          {/* Step counter */}
          <span
            className="font-mono"
            style={{ fontSize: 12, color: '#555570', display: 'block', marginBottom: 6 }}
          >
            Step {currentStep + 1} of {steps.length}
          </span>

          {/* Title */}
          <h4 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
            {step.title}
          </h4>

          {/* Description */}
          <p style={{ fontSize: 14, color: '#A0A0B8', lineHeight: 1.5, marginBottom: 20 }}>
            {step.description}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={handleSkip}
              style={{
                background: 'none',
                border: 'none',
                color: '#555570',
                fontSize: 13,
                cursor: 'pointer',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#8888A8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#555570'; }}
            >
              Skip tour
            </button>
            <button
              onClick={handleNext}
              style={{
                background: '#6C63FF',
                color: '#fff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#7B73FF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#6C63FF'; }}
            >
              {isLast ? 'Start Exploring' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function getTooltipPosition(
  position: string,
  rect: Rect,
  pad: number,
): React.CSSProperties {
  const gap = 16;
  switch (position) {
    case 'bottom':
      return {
        top: rect.top + rect.height + pad + gap,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%)',
      };
    case 'top':
      return {
        bottom: window.innerHeight - rect.top + pad + gap,
        left: rect.left + rect.width / 2,
        transform: 'translateX(-50%)',
      };
    case 'right':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width + pad + gap,
        transform: 'translateY(-50%)',
      };
    case 'left':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - pad - gap - 320,
        transform: 'translateY(-50%)',
      };
    default:
      return {};
  }
}

function getArrowStyle(position: string, rect: Rect, _pad: number): React.CSSProperties {
  const size = 8;
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    zIndex: 1,
  };

  switch (position) {
    case 'bottom':
      return {
        ...base,
        top: -size,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${size}px solid transparent`,
        borderRight: `${size}px solid transparent`,
        borderBottom: `${size}px solid #6C63FF`,
      };
    case 'top':
      return {
        ...base,
        bottom: -size,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: `${size}px solid transparent`,
        borderRight: `${size}px solid transparent`,
        borderTop: `${size}px solid #6C63FF`,
      };
    case 'right':
      return {
        ...base,
        left: -size,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: `${size}px solid transparent`,
        borderBottom: `${size}px solid transparent`,
        borderRight: `${size}px solid #6C63FF`,
      };
    case 'left':
      return {
        ...base,
        right: -size,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: `${size}px solid transparent`,
        borderBottom: `${size}px solid transparent`,
        borderLeft: `${size}px solid #6C63FF`,
      };
    default:
      return base;
  }
}
