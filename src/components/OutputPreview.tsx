import { useState, useEffect, useRef } from 'react';
import { getOutput, getDialLevel } from '../data/outputs';

interface Props {
  appId: string;
  appColor: string;
  buttonIndex: number;
  dialValue: number;
}

export default function OutputPreview({ appId, appColor, buttonIndex, dialValue }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const prevKeyRef = useRef('');
  const typingRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fullText = getOutput(appId, buttonIndex, dialValue);
  const level = getDialLevel(dialValue);
  const key = `${appId}-${buttonIndex}-${level}`;

  useEffect(() => {
    if (key === prevKeyRef.current) return;
    prevKeyRef.current = key;
    if (typingRef.current) clearTimeout(typingRef.current);

    setFadingOut(true);
    setTimeout(() => {
      setDisplayedText('');
      setFadingOut(false);
      setIsTyping(true);
      let i = 0;
      const typeChar = () => {
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
    }, 200);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [key, fullText]);

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
          AI Output &mdash;{' '}
          <span style={{ color: appColor }}>{level}</span>
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="flex-1 overflow-y-auto min-h-0 transition-opacity duration-200"
        style={{ opacity: fadingOut ? 0 : 1, background: '#0a0a1a', padding: 24 }}
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
