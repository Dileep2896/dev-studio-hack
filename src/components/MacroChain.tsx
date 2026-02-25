import { useState } from 'react';

interface Props {
  appColor: string;
  onComplete: () => void;
}

const steps = [
  { icon: '[ ]', label: 'Capture Screen' },
  { icon: 'AI', label: 'AI Analyze' },
  { icon: 'Rp', label: 'Generate Report' },
  { icon: '>>', label: 'Send to Slack' },
];

export default function MacroChain({ appColor, onComplete }: Props) {
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const runMacro = () => {
    if (running) return;
    setRunning(true);
    setActiveStep(0);
    steps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setActiveStep(-1);
            setRunning(false);
            onComplete();
          }, 600);
        }
      }, (i + 1) * 500);
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header — stacked to avoid truncation */}
      <div style={{ marginBottom: 8 }}>
        <h3 className="text-[12px] font-mono tracking-widest uppercase font-medium" style={{ color: '#5a5a78' }}>
          Macro Chain
        </h3>
        <span className="text-[10px] font-mono" style={{ color: '#3a3a55' }}>
          One button. Entire workflow.
        </span>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto" style={{ gap: 6 }}>
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const isDone = activeStep > i;
          return (
            <div
              key={i}
              className="flex items-center rounded-lg border transition-all duration-300 shrink-0"
              style={{
                padding: '8px 12px',
                gap: 10,
                background: isActive ? `${appColor}10` : '#0c0c1c',
                borderColor: isActive ? appColor : '#2a2a4a',
                boxShadow: isActive ? `0 0 16px ${appColor}15` : 'none',
              }}
            >
              <span
                className="rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 transition-all duration-300"
                style={{
                  width: 24,
                  height: 24,
                  background: isDone ? `${appColor}20` : isActive ? appColor : '#0c0c1c',
                  color: isDone || isActive ? '#fff' : '#5a5a78',
                  border: `1.5px solid ${isDone || isActive ? appColor : '#2a2a4a'}`,
                }}
              >
                {isDone ? '\u2713' : i + 1}
              </span>
              <span className="text-[14px] leading-none shrink-0">{step.icon}</span>
              <span className="text-[12px] font-medium" style={{ color: '#8888a8' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={runMacro}
        disabled={running}
        className="shrink-0 w-full rounded-xl text-[12px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          marginTop: 8,
          padding: '10px 0',
          background: `${appColor}12`,
          border: `1.5px solid ${appColor}35`,
          color: appColor,
        }}
        onMouseEnter={(e) => {
          if (!running) e.currentTarget.style.background = `${appColor}22`;
        }}
        onMouseLeave={(e) => {
          if (!running) e.currentTarget.style.background = `${appColor}12`;
        }}
      >
        {running ? 'Running...' : 'Run Macro'}
      </button>
    </div>
  );
}
