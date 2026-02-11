type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  vscode: [
    `// Minimal refactoring applied
const userData = fetchUser(id);
const formattedName = \`\${userData.first} \${userData.last}\`;
return { name: formattedName, email: userData.email };

// Changes: Renamed 2 variables for clarity`,

    `// Moderate refactoring applied
function getFormattedName(user) {
  return \`\${user.first} \${user.last}\`;
}

function getUserProfile(id) {
  const user = fetchUser(id);
  return {
    name: getFormattedName(user),
    email: user.email,
    displayId: \`USR-\${id}\`
  };
}

// Changes: Extracted helper function, improved structure`,

    `// Comprehensive refactoring applied
interface UserProfile {
  name: string;
  email: string;
  displayId: string;
}

class UserService {
  constructor(private api: UserAPI) {}

  async getProfile(id: string): Promise<UserProfile> {
    const user = await this.api.fetch(id);
    return {
      name: this.formatName(user),
      email: user.email,
      displayId: \`USR-\${id}\`
    };
  }

  private formatName(user: RawUser): string {
    return \`\${user.first} \${user.last}\`;
  }
}

// Changes: Full OOP restructure with TypeScript interfaces,
// async/await, dependency injection, and separation of concerns`,
  ],

  chrome: [
    `TL;DR: EU AI Act requires AI companies to disclose training
data sources and complete risk assessments by 2027.`,

    `Summary: The EU AI Act introduces mandatory transparency
requirements for AI developers. Key provisions include:

\u2192 Training data disclosure for all foundation models
\u2192 Risk assessments for high-impact AI systems
\u2192 Penalties up to 7% of global revenue
\u2192 18-month compliance window starting Q1 2026

The regulation affects all companies serving EU users,
regardless of where they're headquartered.`,

    `Comprehensive Analysis: EU AI Act \u2014 Impact Assessment

OVERVIEW
The European Union's AI Act, finalized in March 2024,
establishes the world's first comprehensive AI regulatory
framework. It classifies AI systems into four risk tiers.

KEY PROVISIONS
1. Transparency Requirements
   All foundation model providers must disclose copyrighted
   materials used in training datasets and publish model
   capability assessments.

2. Risk Classification
   - Unacceptable: Social scoring, real-time biometric
     surveillance (banned)
   - High-Risk: Healthcare, education, employment,
     law enforcement (requires third-party audits)
   - Limited: Chatbots, deepfakes (disclosure required)
   - Minimal: Spam filters, games (no requirements)

3. Enforcement
   National authorities may levy fines of \u20AC35M or 7% of
   global annual turnover, whichever is higher.

TIMELINE
   \u2192 Mar 2024: Act finalized
   \u2192 Aug 2025: Unacceptable AI practices banned
   \u2192 Feb 2027: Full compliance deadline

IMPACT: Affects estimated 6,800+ companies globally.`,
  ],

  figma: [
    `alt="Blue signup button with white text"`,

    `Component: Primary CTA Button
alt="Large blue signup button reading 'Get Started Free'
     positioned center-right of the hero section"

Accessibility Notes:
\u2192 Color contrast ratio: 7.2:1 (passes AAA)
\u2192 Touch target: 48x44px (meets minimum)
\u2192 Consider adding aria-label for screen readers`,

    `Accessibility Audit \u2014 Hero Section CTA

COMPONENT: Primary Call-to-Action Button
alt="Large royal blue (#2563EB) button with white text
     reading 'Get Started Free' with right arrow icon,
     positioned in the hero section below the headline"

WCAG 2.1 COMPLIANCE REPORT
\u251C\u2500\u2500 Color Contrast: 7.2:1 \u2705 (AAA)
\u251C\u2500\u2500 Touch Target: 48x44px \u2705 (WCAG 2.5.5)
\u251C\u2500\u2500 Focus Indicator: Not detected \u26A0\uFE0F
\u251C\u2500\u2500 Keyboard Nav: Needs tabindex verification \u26A0\uFE0F
\u2514\u2500\u2500 Screen Reader: Missing aria-label \u274C

RECOMMENDATIONS
1. Add focus-visible outline (3px solid #1D4ED8)
2. Add aria-label="Sign up for free account"
3. Add role="button" if using <div> instead of <button>
4. Consider adding aria-describedby linking to
   pricing details below the fold

SUGGESTED HTML:
<button
  class="cta-primary"
  aria-label="Sign up for free account"
  aria-describedby="pricing-note">
  Get Started Free \u2192
</button>`,
  ],

  slack: [
    `yo team \u2014 shipped the auth fix, lmk if anything looks weird \u{1F680}`,

    `Hey team, just pushed the authentication fix to staging.
Please review when you get a chance and flag any issues.
The main changes are in the token refresh logic.`,

    `Team \u2014 I've deployed the authentication service patch
(v2.4.1) to the staging environment.

Summary of Changes:
\u2022 Resolved token refresh vulnerability (SEC-2024-089)
\u2022 Updated JWT expiration handling to prevent race conditions
\u2022 Added retry logic for failed refresh attempts (max 3)

Action Required:
Please complete your review by EOD Thursday, Feb 12.
QA sign-off needed from @sarah and @mike before
production deployment scheduled for Friday AM.

Rollback plan documented in Confluence: AUTH-ROLLBACK-v2`,
  ],

  excel: [
    `=AVERAGE(B2:B100)

Result: $42,350`,

    `Revenue Analysis \u2014 Column B (B2:B100)

=AVERAGE(B2:B100)     \u2192 $42,350 (mean)
=MEDIAN(B2:B100)      \u2192 $38,200 (median)
=STDEV(B2:B100)       \u2192 $12,450 (std dev)
=MAX(B2:B100)         \u2192 $89,400 (peak: Row 34)
=MIN(B2:B100)         \u2192 $8,200  (low: Row 71)

\u26A0\uFE0F High variance detected \u2014 consider segmented analysis`,

    `Comprehensive Revenue Analysis \u2014 Q4 Dataset

DESCRIPTIVE STATISTICS
\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Mean:     $42,350  \u2502 Median:  $38,200 \u2502
\u2502 Std Dev:  $12,450  \u2502 CV:      29.4%   \u2502
\u2502 Skewness: 0.82     \u2502 Kurtosis: 2.1    \u2502
\u2502 Range:    $81,200  \u2502 IQR:     $15,800 \u2502
\u2502 Count:    99       \u2502 Missing: 1       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

DISTRIBUTION: Right-skewed (positively skewed)
Bimodal pattern detected \u2014 two performance clusters

REGRESSION MODEL
Revenue = 1.2\u00D7AdSpend + 0.8\u00D7HeadCount - 15,200
R\u00B2 = 0.84 | Adj R\u00B2 = 0.83 | p < 0.001

TOP PERFORMERS
1. Region NE: $67,200 avg (+58% above mean)
2. Region SW: $52,100 avg (+23% above mean)

ANOMALIES DETECTED (3 entries)
\u2192 Row 23: $89,400 (3.8\u03C3 above mean) \u2014 verify
\u2192 Row 71: $8,200 (2.7\u03C3 below mean) \u2014 investigate
\u2192 Row 45: $0 (likely data entry error)

FORMULAS GENERATED:
=AVERAGE(B2:B100)
=MEDIAN(B2:B100)
=STDEV(B2:B100)
=PERCENTILE(B2:B100, 0.25)
=PERCENTILE(B2:B100, 0.75)
=SKEW(B2:B100)
=KURT(B2:B100)`,
  ],
};

export function getDialLevel(value: number): string {
  if (value <= 33) return 'Minimal';
  if (value <= 66) return 'Balanced';
  return 'Maximum';
}

export function getOutput(appId: string, _buttonIndex: number, dialValue: number): string {
  const appOutputs = outputs[appId];
  if (!appOutputs) return '';
  if (dialValue <= 33) return appOutputs[0];
  if (dialValue <= 66) return appOutputs[1];
  return appOutputs[2];
}
