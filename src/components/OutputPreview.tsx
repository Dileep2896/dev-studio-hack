import { useState, useEffect, useRef, useMemo } from 'react';
import { getCachedOutputs, loadAppOutputs, getOutput, getDialLevel } from '../data/outputs';

interface Props {
  appId: string;
  appColor: string;
  buttonIndex: number;
  dialValue: number;
}

export default function OutputPreview({ appId, appColor, buttonIndex, dialValue }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountRef = useRef(0);

  const level = getDialLevel(dialValue);
  const key = `${appId}-${buttonIndex}-${level}`;

  // Try to get the text synchronously from cache
  const cachedText = useMemo(() => {
    const cached = getCachedOutputs(appId);
    if (cached) return getOutput(cached, buttonIndex, appId, dialValue);
    return null;
  }, [key, appId, buttonIndex, dialValue]);

  useEffect(() => {
    const mountId = ++mountRef.current;
    if (typingRef.current) clearTimeout(typingRef.current);
    setDisplayedText('');
    setIsTyping(false);

    const runTyping = (fullText: string) => {
      if (mountRef.current !== mountId) return;
      setIsTyping(true);
      let i = 0;
      const typeChar = () => {
        if (mountRef.current !== mountId) return;
        if (i < fullText.length) {
          const chunk = Math.min(3, fullText.length - i);
          setDisplayedText(fullText.slice(0, i + chunk));
          i += chunk;
          typingRef.current = setTimeout(typeChar, 8);
        } else {
          setIsTyping(false);
        }
      };
      typeChar();
    };

    if (cachedText !== null) {
      // Sync path: start typing immediately
      runTyping(cachedText);
    } else {
      // Async path: load then type
      loadAppOutputs(appId).then((appOutputs) => {
        if (mountRef.current !== mountId) return;
        const fullText = getOutput(appOutputs, buttonIndex, appId, dialValue);
        runTyping(fullText);
      });
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [key, appId, buttonIndex, dialValue, cachedText]);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full"
      style={{ background: '#12122a', border: '1px solid #2a2a4a' }}
    >
      {/* Accent line */}
      <div className="shrink-0" style={{ height: 3, background: appColor }} />

      {/* Header */}
      <div
        className="flex items-center shrink-0"
        style={{ height: 44, padding: '0 24px', gap: 12, borderBottom: '1px solid #2a2a4a' }}
      >
        <span
          className="shrink-0"
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: appColor,
            boxShadow: `0 0 8px ${appColor}`,
            animation: isTyping ? 'pulse-glow 1s ease-in-out infinite' : 'none',
          }}
        />
        <span className="text-[13px] font-mono" style={{ color: '#5a5a78' }}>
          AI Output -{' '}
          <span style={{ color: appColor }}>{level}</span>
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="flex-1 overflow-y-auto min-h-0"
        style={{ background: '#0a0a1a', padding: 24 }}
      >
        <pre
          className="font-mono whitespace-pre-wrap"
          style={{ fontSize: 13, lineHeight: 1.7, color: '#8888a8' }}
        >
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-[2px] h-4 ml-0.5 align-text-bottom animate-blink"
              style={{ background: appColor }}
            />
          )}
        </pre>
      </div>
    </div>
  );
}
