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
    icon: '</>',
    color: '#007ACC',
    dialLabel: 'Refactor Intensity',
    buttons: [
      { icon: '{}', label: 'Refactor', description: 'AI-powered code refactoring with configurable intensity' },
      { icon: '?', label: 'Explain', description: 'Explain selected code in plain language' },
      { icon: 'T', label: 'Write Tests', description: 'Generate unit tests for selected function' },
      { icon: '!', label: 'Debug', description: 'Identify and suggest fixes for bugs' },
      { icon: '>>', label: 'Optimize', description: 'Performance optimization suggestions' },
      { icon: '#', label: 'Document', description: 'Auto-generate JSDoc/docstrings' },
      { icon: '~>', label: 'Convert', description: 'Convert code to another language' },
      { icon: '@', label: 'Review', description: 'AI code review with suggestions' },
      { icon: '**', label: 'Complete', description: 'Context-aware smart autocomplete' },
    ],
  },
  {
    id: 'chrome',
    name: 'Chrome',
    icon: 'W',
    color: '#4285F4',
    dialLabel: 'Summary Detail',
    buttons: [
      { icon: 'S', label: 'Summarize', description: 'Summarize the current page content' },
      { icon: 'Tr', label: 'Translate', description: 'Translate page content to any language' },
      { icon: '[]', label: 'Extract', description: 'Extract structured data from the page' },
      { icon: 'Re', label: 'Reply', description: 'Draft an email reply to the current message' },
      { icon: '" "', label: 'Cite', description: 'Generate academic citations from the page' },
      { icon: 'Aa', label: 'Simplify', description: 'Simplify complex language to plain English' },
      { icon: '<>', label: 'Compare', description: 'Compare this article with other sources' },
      { icon: 'K', label: 'Key Points', description: 'Extract and list key takeaways' },
      { icon: ')|', label: 'Read Aloud', description: 'Convert page text to speech' },
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: 'F',
    color: '#A259FF',
    dialLabel: 'Creative Freedom',
    buttons: [
      { icon: 'Alt', label: 'Alt Text', description: 'Generate accessibility alt text for images' },
      { icon: 'C', label: 'Color Fix', description: 'Fix contrast issues for WCAG compliance' },
      { icon: '|-|', label: 'Layout', description: 'AI-powered layout suggestions' },
      { icon: 'Tx', label: 'Copy', description: 'Generate UI copy and microcopy' },
      { icon: '++', label: 'Variants', description: 'Auto-generate component variants' },
      { icon: 'Q', label: 'Inspect', description: 'Check against design system rules' },
      { icon: '//', label: 'Animate', description: 'Suggest micro-interactions and animations' },
      { icon: '[ ]', label: 'Resize', description: 'Smart responsive resize suggestions' },
      { icon: '..', label: 'Feedback', description: 'AI design critique and suggestions' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '#',
    color: '#E01E5A',
    dialLabel: 'Formality Level',
    buttons: [
      { icon: 'Tn', label: 'Tone Shift', description: 'Adjust message tone (casual <-> formal)' },
      { icon: 'SU', label: 'Standup', description: 'Generate daily standup update' },
      { icon: '=', label: 'Thread Sum', description: 'Summarize a long thread' },
      { icon: 'v', label: 'Actions', description: 'Extract action items from conversation' },
      { icon: ':)', label: 'React', description: 'Suggest appropriate emoji reactions' },
      { icon: '@t', label: 'Schedule', description: 'Smart message scheduling' },
      { icon: 'Tr', label: 'Translate', description: 'Quick translate message' },
      { icon: '[ ]', label: 'Template', description: 'Apply message templates' },
      { icon: '>>>', label: 'Announce', description: 'Draft team announcement' },
    ],
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: 'X',
    color: '#217346',
    dialLabel: 'Analysis Depth',
    buttons: [
      { icon: 'fx', label: 'Formula', description: 'Generate complex formulas from plain English' },
      { icon: '/\\', label: 'Chart', description: 'Smart chart type selection and creation' },
      { icon: '~', label: 'Clean', description: 'Clean, deduplicate, and format messy data' },
      { icon: '%', label: 'Analyze', description: 'Run statistical analysis on selected range' },
      { icon: '+|', label: 'Pivot', description: 'Auto-generate pivot tables' },
      { icon: '^', label: 'Predict', description: 'Trend prediction and forecasting' },
      { icon: '!!', label: 'Anomaly', description: 'Detect outliers and anomalies in data' },
      { icon: '&', label: 'Merge', description: 'Smart data merge from multiple sources' },
      { icon: 'Rp', label: 'Report', description: 'Generate formatted analysis report' },
    ],
  },
];
