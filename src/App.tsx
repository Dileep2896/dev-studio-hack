import { useState, useCallback, useEffect } from 'react';
import { apps, type AppConfig } from './data/apps';
import { useToast } from './hooks/useToast';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import AppSwitcher from './components/AppSwitcher';
import ConsoleGrid from './components/ConsoleGrid';
import Dial from './components/Dial';
import ActionsRing from './components/ActionsRing';
import MacroChain from './components/MacroChain';
import OutputPreview from './components/OutputPreview';
import ToastContainer from './components/Toast';
import Walkthrough from './components/Walkthrough';

export default function App() {
  const [activeApp, setActiveApp] = useState<AppConfig>(apps[0]);
  const [activeButton, setActiveButton] = useState(0);
  const [dialValue, setDialValue] = useState(75);
  const [loading, setLoading] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const [tourDone, setTourDone] = useState(false);
  const { toasts, addToast } = useToast();

  // After splash completes, start tour after a short delay
  const handleSplashComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !tourDone) {
      const t = setTimeout(() => setTourActive(true), 100);
      return () => clearTimeout(t);
    }
  }, [loading, tourDone]);

  const handleTourComplete = useCallback(() => {
    setTourActive(false);
    setTourDone(true);
  }, []);

  const handleReplayTour = useCallback(() => {
    setTourActive(true);
  }, []);

  const handleAppSwitch = useCallback((app: AppConfig) => {
    setActiveApp(app);
    setActiveButton(0);
  }, []);

  const handleDialChange = useCallback((v: number) => {
    setDialValue(v);
  }, []);

  return (
    <div className="h-screen flex flex-col relative" style={{ background: '#0a0a14', color: '#e0e0f0' }}>
      {loading && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Ambient glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeApp.color}, transparent 70%)`,
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <Header onReplayTour={handleReplayTour} />
        <HeroBanner />
        <div data-tour="app-switcher">
          <AppSwitcher activeApp={activeApp} onSwitch={handleAppSwitch} />
        </div>

        {/* MAIN 3-COLUMN GRID */}
        <div className="flex-1 min-h-0 grid grid-cols-[440px_1fr_340px] gap-6 p-6">

          {/* LEFT: Grid (top) + Macro (bottom) */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* Panel label */}
            <span className="text-[11px] font-mono" style={{ color: '#4a4a68', paddingLeft: 4 }}>
              These 9 buttons appear on your physical MX Creative Console
            </span>
            {/* Console Grid — content-sized */}
            <div
              data-tour="button-grid"
              className="rounded-2xl p-6 shrink-0"
              style={{ background: '#12122a', border: '1px solid #2a2a4a' }}
            >
              <ConsoleGrid app={activeApp} activeButton={activeButton} onButtonClick={setActiveButton} />
            </div>

            {/* Macro Chain — fills remaining left space */}
            <div
              data-tour="macro-chain"
              className="rounded-2xl p-6 flex-1 min-h-0 overflow-hidden"
              style={{ background: '#12122a', border: '1px solid #2a2a4a' }}
            >
              <MacroChain
                appColor={activeApp.color}
                onComplete={() => addToast('\u2705 Macro complete \u2014 report sent to #design-feedback')}
              />
            </div>
          </div>

          {/* CENTER: Output Preview (HERO) */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* Panel label */}
            <span className="text-[11px] font-mono" style={{ color: '#4a4a68', paddingLeft: 4 }}>
              Result appears in your active app
            </span>
            <div data-tour="output-panel" className="min-h-0 flex-1">
              <OutputPreview
                appId={activeApp.id}
                appColor={activeApp.color}
                buttonIndex={activeButton}
                dialValue={dialValue}
              />
            </div>
          </div>

          {/* RIGHT: Dial (top) + Ring (bottom) */}
          <div className="flex flex-col gap-4 min-h-0">
            {/* Panel label */}
            <span className="text-[11px] font-mono" style={{ color: '#4a4a68', paddingLeft: 4 }}>
              Physical dial on the console
            </span>
            {/* Dial — content-sized */}
            <div
              data-tour="dial-panel"
              className="rounded-2xl p-6 flex items-center justify-center shrink-0"
              style={{ background: '#12122a', border: '1px solid #2a2a4a' }}
            >
              <Dial
                value={dialValue}
                onChange={handleDialChange}
                label={activeApp.dialLabel}
                appColor={activeApp.color}
              />
            </div>

            {/* Actions Ring — fills remaining right space */}
            <div
              data-tour="actions-ring"
              className="rounded-2xl p-6 flex-1 min-h-0 overflow-hidden"
              style={{ background: '#12122a', border: '1px solid #2a2a4a' }}
            >
              <ActionsRing
                appColor={activeApp.color}
                onActivate={() => addToast('\u2728 AI action triggered on selected content')}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
      <Walkthrough active={tourActive} onComplete={handleTourComplete} />
    </div>
  );
}
