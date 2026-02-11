export interface AppButton {
  icon: string;
  label: string;
  description: string;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  dialLabel: string;
  buttons: AppButton[];
}

export const apps: AppConfig[] = [
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '\u{1F4BB}',
    color: '#007ACC',
    dialLabel: 'Refactor Intensity',
    buttons: [
      { icon: '\u{1F504}', label: 'Refactor', description: 'AI-powered code refactoring with configurable intensity' },
      { icon: '\u{1F4A1}', label: 'Explain', description: 'Explain selected code in plain language' },
      { icon: '\u2705', label: 'Write Tests', description: 'Generate unit tests for selected function' },
      { icon: '\u{1F41B}', label: 'Debug', description: 'Identify and suggest fixes for bugs' },
      { icon: '\u26A1', label: 'Optimize', description: 'Performance optimization suggestions' },
      { icon: '\u{1F4DD}', label: 'Document', description: 'Auto-generate JSDoc/docstrings' },
      { icon: '\u{1F500}', label: 'Convert', description: 'Convert code to another language' },
      { icon: '\u{1F441}', label: 'Review', description: 'AI code review with suggestions' },
      { icon: '\u2728', label: 'Complete', description: 'Context-aware smart autocomplete' },
    ],
  },
  {
    id: 'chrome',
    name: 'Chrome',
    icon: '\u{1F310}',
    color: '#4285F4',
    dialLabel: 'Summary Detail',
    buttons: [
      { icon: '\u{1F4C4}', label: 'Summarize', description: 'Summarize the current page content' },
      { icon: '\u{1F30D}', label: 'Translate', description: 'Translate page content to any language' },
      { icon: '\u{1F4CA}', label: 'Extract', description: 'Extract structured data from the page' },
      { icon: '\u2709\uFE0F', label: 'Reply', description: 'Draft an email reply to the current message' },
      { icon: '\u{1F4CE}', label: 'Cite', description: 'Generate academic citations from the page' },
      { icon: '\u{1F3AF}', label: 'Simplify', description: 'Simplify complex language to plain English' },
      { icon: '\u2696\uFE0F', label: 'Compare', description: 'Compare this article with other sources' },
      { icon: '\u{1F511}', label: 'Key Points', description: 'Extract and list key takeaways' },
      { icon: '\u{1F50A}', label: 'Read Aloud', description: 'Convert page text to speech' },
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: '\u{1F3A8}',
    color: '#A259FF',
    dialLabel: 'Creative Freedom',
    buttons: [
      { icon: '\u267F', label: 'Alt Text', description: 'Generate accessibility alt text for images' },
      { icon: '\u{1F3A8}', label: 'Color Fix', description: 'Fix contrast issues for WCAG compliance' },
      { icon: '\u{1F4D0}', label: 'Layout', description: 'AI-powered layout suggestions' },
      { icon: '\u270D\uFE0F', label: 'Copy', description: 'Generate UI copy and microcopy' },
      { icon: '\u{1F532}', label: 'Variants', description: 'Auto-generate component variants' },
      { icon: '\u{1F50D}', label: 'Inspect', description: 'Check against design system rules' },
      { icon: '\u{1F3AC}', label: 'Animate', description: 'Suggest micro-interactions and animations' },
      { icon: '\u{1F4F1}', label: 'Resize', description: 'Smart responsive resize suggestions' },
      { icon: '\u{1F4AC}', label: 'Feedback', description: 'AI design critique and suggestions' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '\u{1F4AC}',
    color: '#E01E5A',
    dialLabel: 'Formality Level',
    buttons: [
      { icon: '\u{1F3AD}', label: 'Tone Shift', description: 'Adjust message tone (casual \u2194 formal)' },
      { icon: '\u{1F4CB}', label: 'Standup', description: 'Generate daily standup update' },
      { icon: '\u{1F9F5}', label: 'Thread Sum', description: 'Summarize a long thread' },
      { icon: '\u2611\uFE0F', label: 'Actions', description: 'Extract action items from conversation' },
      { icon: '\u{1F60A}', label: 'React', description: 'Suggest appropriate emoji reactions' },
      { icon: '\u{1F550}', label: 'Schedule', description: 'Smart message scheduling' },
      { icon: '\u{1F310}', label: 'Translate', description: 'Quick translate message' },
      { icon: '\u{1F4DD}', label: 'Template', description: 'Apply message templates' },
      { icon: '\u{1F4E2}', label: 'Announce', description: 'Draft team announcement' },
    ],
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: '\u{1F4CA}',
    color: '#217346',
    dialLabel: 'Analysis Depth',
    buttons: [
      { icon: '\u{1F522}', label: 'Formula', description: 'Generate complex formulas from plain English' },
      { icon: '\u{1F4C8}', label: 'Chart', description: 'Smart chart type selection and creation' },
      { icon: '\u{1F9F9}', label: 'Clean', description: 'Clean, deduplicate, and format messy data' },
      { icon: '\u{1F50D}', label: 'Analyze', description: 'Run statistical analysis on selected range' },
      { icon: '\u{1F504}', label: 'Pivot', description: 'Auto-generate pivot tables' },
      { icon: '\u{1F52E}', label: 'Predict', description: 'Trend prediction and forecasting' },
      { icon: '\u26A0\uFE0F', label: 'Anomaly', description: 'Detect outliers and anomalies in data' },
      { icon: '\u{1F517}', label: 'Merge', description: 'Smart data merge from multiple sources' },
      { icon: '\u{1F4D1}', label: 'Report', description: 'Generate formatted analysis report' },
    ],
  },
];
