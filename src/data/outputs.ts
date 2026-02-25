type OutputMap = Record<string, [string, string, string]>;

// Import the default app synchronously so first render is instant
import vscodeOutputs from './outputs/vscode';

const cache: Record<string, OutputMap> = {
  vscode: vscodeOutputs,
};

const loaders: Record<string, () => Promise<{ default: OutputMap }>> = {
  chrome: () => import('./outputs/chrome'),
  figma: () => import('./outputs/figma'),
  slack: () => import('./outputs/slack'),
  excel: () => import('./outputs/excel'),
};

export async function loadAppOutputs(appId: string): Promise<OutputMap> {
  if (cache[appId]) return cache[appId];
  const loader = loaders[appId];
  if (!loader) return {};
  const mod = await loader();
  cache[appId] = mod.default;
  return mod.default;
}

export function getCachedOutputs(appId: string): OutputMap | null {
  return cache[appId] ?? null;
}

export function getDialLevel(value: number): string {
  if (value <= 33) return 'Minimal';
  if (value <= 66) return 'Balanced';
  return 'Maximum';
}

export function getOutput(appOutputs: OutputMap, buttonIndex: number, appId: string, dialValue: number): string {
  const key = `${appId}-${buttonIndex}`;
  const buttonOutputs = appOutputs[key];
  if (!buttonOutputs) return '';
  if (dialValue <= 33) return buttonOutputs[0];
  if (dialValue <= 66) return buttonOutputs[1];
  return buttonOutputs[2];
}
