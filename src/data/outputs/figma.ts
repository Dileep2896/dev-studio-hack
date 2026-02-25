type OutputMap = Record<string, [string, string, string]>;

const outputs: OutputMap = {
  'figma-0': [ // Alt Text
    `alt="Blue signup button with white text"`,

    `Component: Primary CTA Button
alt="Large blue signup button reading 'Get Started Free'
     positioned center-right of the hero section"

Accessibility Notes:
--> Color contrast ratio: 7.2:1 (passes AAA)
--> Touch target: 48x44px (meets minimum)
--> Consider adding aria-label for screen readers`,

    `Accessibility Audit - Hero Section CTA

COMPONENT: Primary Call-to-Action Button
alt="Large royal blue (#2563EB) button with white text
     reading 'Get Started Free' with right arrow icon,
     positioned in the hero section below the headline"

WCAG 2.1 COMPLIANCE REPORT
|-- Color Contrast: 7.2:1 [OK] (AAA)
|-- Touch Target: 48x44px [OK] (WCAG 2.5.5)
|-- Focus Indicator: Not detected [!]
|-- Keyboard Nav: Needs tabindex verification [!]
|-- Screen Reader: Missing aria-label [X]

RECOMMENDATIONS
1. Add focus-visible outline (3px solid #1D4ED8)
2. Add aria-label="Sign up for free account"
3. Add role="button" if using <div> instead of <button>

SUGGESTED HTML:
<button
  class="cta-primary"
  aria-label="Sign up for free account"
  aria-describedby="pricing-note">
  Get Started Free -->
</button>`,
  ],

  'figma-1': [ // Color Fix
    `[!] Text #888 on #FFF --> Contrast 3.5:1 (fails AA). Fix: use #595959.`,

    `COLOR ACCESSIBILITY FIXES:

1. Body text: #888888 on #FFFFFF
   Contrast: 3.5:1 [X] Fails AA
   --> Fix: #595959 (7.0:1 [OK] AAA)

2. Link text: #5B9FFF on #FFFFFF
   Contrast: 3.1:1 [X] Fails AA
   --> Fix: #2563EB (4.6:1 [OK] AA)

3. Button text: #FFFFFF on #3B82F6
   Contrast: 4.5:1 [OK] Passes AA

2 of 3 elements need fixes.`,

    `FULL COLOR ACCESSIBILITY AUDIT

Scanned: 24 text elements across 8 frames

FAILURES (6 elements):
[X] Subheading: #888 on #FFF --> 3.5:1
  Fix: #595959 (7.0:1 AAA)
[X] Caption: #AAA on #F5F5F5 --> 1.9:1
  Fix: #717171 (4.6:1 AA)
[X] Link hover: #93C5FD on #FFF --> 2.1:1
  Fix: #2563EB (4.6:1 AA)
[X] Placeholder: #CCC on #FFF --> 1.6:1
  Fix: #767676 (4.5:1 AA)
[X] Disabled btn: #999 on #E5E5E5 --> 2.3:1
  Fix: #6B6B6B on #E5E5E5 (4.5:1 AA)
[X] Footer link: #666 on #1A1A2E --> 3.8:1
  Fix: #9CA3AF (5.2:1 AA)

PASSES (18 elements): All good [OK]

SUMMARY: 75% compliance (18/24)
After fixes: 100% WCAG AA compliance
Apply all fixes? [One click to update]`,
  ],

  'figma-2': [ // Layout
    `Suggestion: Increase card spacing from 12px to 16px.`,

    `LAYOUT SUGGESTIONS:

1. Card Grid --> Increase gap from 12px to 16px
2. Hero section --> Add 80px top padding for breathing room
3. Sidebar --> Fix 280px width, currently collapses at 1024px
4. CTA cluster --> Align to 8px grid (currently off by 2px)

Auto-layout confidence: 92%`,

    `AI LAYOUT ANALYSIS

Current layout issues detected: 7

SPACING FIXES:
* Card grid gap: 12px --> 16px (match 8px grid)
* Section padding: 48px --> 64px (better rhythm)
* Hero top padding: 40px --> 80px (breathing room)

ALIGNMENT FIXES:
* CTA button: off 8px grid by 2px
* Feature icons: inconsistent 4px offset
* Footer columns: uneven width distribution

RESPONSIVE SUGGESTIONS:
* Desktop (1440px): 3-column, 16px gaps
* Tablet (768px): 2-column, 12px gaps
* Mobile (375px): 1-column, stacked, 8px gaps

COMPONENT STRUCTURE:
  Page
  +- Header (fixed, h=72)
  +- Hero (min-h=480, flex-center)
  +- Features (grid 3-col, gap=16)
  +- Pricing (grid 3-col, gap=24)
  +-- Footer (grid 4-col, py=64)

Would you like me to apply these changes?`,
  ],

  'figma-3': [ // Copy
    `Button: "Get Started Free"`,

    `UI COPY SUGGESTIONS:

Hero headline: "Ship faster with AI"
Hero subline: "Automate the boring parts of development"
CTA primary: "Start building - it's free"
CTA secondary: "See how it works"
Social proof: "Trusted by 12,000+ developers"

Tone: Confident, casual, developer-friendly`,

    `UI COPY & MICROCOPY AUDIT

HERO SECTION:
  Headline: "Ship faster with AI"
  Subline: "Automate the boring parts of development.
    Focus on what matters."
  CTA: "Start building - it's free"
  Secondary: "Watch 2-min demo"

FEATURE CARDS:
  Card 1: "Lightning Fast" / "Deploy in under 30 seconds"
  Card 2: "Battle Tested" / "99.9% uptime, guaranteed"
  Card 3: "Open Source" / "MIT licensed. Fork it, own it."

FORM MICROCOPY:
  Email placeholder: "work@company.com"
  Submit: "Create account"
  Error: "Hmm, that doesn't look like an email"
  Success: "You're in! Check your inbox."
  Loading: "Setting up your workspace..."

EMPTY STATES:
  No projects: "Your first project is one click away"
  No results: "Nothing matched. Try different keywords?"

TONE GUIDE: Confident but not arrogant. Casual but
professional. Use contractions. Avoid jargon.
Reading level: Grade 7-8 target.`,
  ],

  'figma-4': [ // Variants
    `Generated: Default, Hover, Active, Disabled states.`,

    `COMPONENT VARIANTS GENERATED:

Button / Primary:
  +- State: Default | Hover | Active | Disabled | Loading
  +- Size: Small (32h) | Medium (40h) | Large (48h)
  +-- Icon: None | Left | Right | Only

Total: 5 \u00D7 3 \u00D7 4 = 60 variants
Auto-layout: Applied with 8px internal padding`,

    `FULL VARIANT MATRIX GENERATED

BUTTON COMPONENT
States: Default | Hover | Active | Focus | Disabled | Loading
Sizes: XS (24h) | SM (32h) | MD (40h) | LG (48h) | XL (56h)
Types: Primary | Secondary | Ghost | Danger | Success
Icons: None | Left | Right | Icon-only

Total variants: 6 \u00D7 5 \u00D7 5 \u00D7 4 = 600

INPUT COMPONENT
States: Default | Focus | Filled | Error | Disabled
Sizes: SM (36h) | MD (44h) | LG (52h)
Types: Text | Email | Password | Search | Number
Addons: None | Left icon | Right icon | Both

Total variants: 5 \u00D7 3 \u00D7 5 \u00D7 4 = 300

CARD COMPONENT
States: Default | Hover | Selected
Sizes: Compact | Standard | Featured
Types: Product | Profile | Stat | Media

Total variants: 3 \u00D7 3 \u00D7 4 = 36

GRAND TOTAL: 936 variants generated
All variants use consistent 8px grid
and shared design tokens.`,
  ],

  'figma-5': [ // Inspect
    `[OK] Follows design system. 1 minor spacing deviation.`,

    `DESIGN SYSTEM INSPECTION:

[OK] Typography: Uses system font stack correctly
[OK] Colors: All from approved palette
[OK] Border radius: Consistent 8px
[!] Spacing: Card padding 14px (should be 16px)
[!] Icon size: 18px (system uses 20px)

Score: 87/100 - 2 minor deviations`,

    `DESIGN SYSTEM COMPLIANCE REPORT

Score: 87/100

TYPOGRAPHY (22/25)
[OK] Font family: Inter - correct
[OK] Heading sizes: Match type scale
[OK] Line heights: Correct
[!] Body size: 15px (system: 14px or 16px)

COLORS (25/25)
[OK] Primary: #2563EB [OK]
[OK] Neutral: Correct gray scale
[OK] Semantic: Success/Warning/Error correct
[OK] No hardcoded values found

SPACING (18/25)
[!] Card padding: 14px (should be 16px)
[!] Section gap: 52px (should be 48px or 64px)
[OK] Component gaps: On 8px grid
[OK] Margins: Consistent

COMPONENTS (22/25)
[OK] Using shared button component
[OK] Using shared input component
[!] Custom card (not from library)
[OK] Icons from approved set

RECOMMENDATION: Fix 4 minor deviations.
Auto-fix available for spacing issues.`,
  ],

  'figma-6': [ // Animate
    `Suggestion: Add 200ms ease-out fade-in on card hover.`,

    `ANIMATION SUGGESTIONS:

1. Cards: Scale 1.02 + shadow on hover (200ms ease-out)
2. Page load: Stagger fade-in, 80ms delay per card
3. CTA button: Subtle pulse every 3s to draw attention
4. Scroll: Parallax on hero image (0.5x speed)

All durations follow Material Design guidelines.`,

    `MICRO-INTERACTION DESIGN SPEC

PAGE LOAD SEQUENCE:
  0ms    - Header slides down (300ms, ease-out)
  100ms  - Hero text fades up (400ms, ease-out)
  300ms  - CTA scales in (300ms, spring)
  500ms  - Feature cards stagger (80ms each, fade-up)

HOVER INTERACTIONS:
  Cards: translateY(-4px) + shadow elevation (200ms)
  Buttons: brightness(1.1) + scale(1.02) (150ms)
  Links: underline slides in from left (200ms)
  Icons: rotate(5deg) + color shift (200ms)

SCROLL ANIMATIONS:
  Hero image: parallax at 0.5x scroll speed
  Stats: Count up animation when in viewport
  Sections: fade-up with 20px translate (400ms)
  Progress bars: Width animates on scroll-into-view

CLICK FEEDBACK:
  Buttons: scale(0.98) then scale(1) (100ms)
  Cards: Ripple effect from click point (400ms)

TRANSITIONS:
  Page: Crossfade (300ms ease)
  Modal: Scale from 0.95 + fade (250ms spring)
  Drawer: Slide from right (300ms ease-out)

Easing: cubic-bezier(0.16, 1, 0.3, 1) for spring
GPU-accelerated: transform + opacity only`,
  ],

  'figma-7': [ // Resize
    `Suggestion: Stack cards vertically below 768px.`,

    `RESPONSIVE RESIZE PLAN:

Desktop (1440px):
  Grid: 3 columns | Hero: side-by-side | Nav: horizontal

Tablet (768px):
  Grid: 2 columns | Hero: stacked | Nav: hamburger menu

Mobile (375px):
  Grid: 1 column | Hero: stacked | Nav: bottom sheet
  CTA: Full-width sticky bottom bar

Breakpoints follow Tailwind defaults.`,

    `RESPONSIVE DESIGN SPECIFICATION

BREAKPOINTS:
  sm: 640px | md: 768px | lg: 1024px | xl: 1280px

DESKTOP (1280px+):
  Layout: 12-col grid, 32px gutters
  Hero: 50/50 split (text left, image right)
  Features: 3-col grid, 24px gap
  Sidebar: 280px fixed, content fills

TABLET (768px - 1279px):
  Layout: 8-col grid, 24px gutters
  Hero: Full-width stacked (text --> image)
  Features: 2-col grid, 16px gap
  Sidebar: Collapsible drawer

MOBILE (< 768px):
  Layout: 4-col grid, 16px gutters
  Hero: Full-width stacked, centered text
  Features: Single column, card stack
  Nav: Bottom tab bar (5 items max)
  CTA: Sticky bottom bar (56px height)

SPECIAL HANDLING:
  * Tables: Horizontal scroll with fade edge
  * Images: Art direction via <picture> tag
  * Typography: Fluid scale clamp(16px, 2vw, 20px)
  * Touch targets: Minimum 44x44px on mobile
  * Spacing: Scale down by 0.75x on mobile

Generated 3 responsive frames in Figma.`,
  ],

  'figma-8': [ // Feedback
    `Overall: Clean layout. Consider adding more whitespace in hero section.`,

    `DESIGN CRITIQUE:

[OK] Strengths:
  - Clean typography hierarchy
  - Consistent color usage
  - Good use of whitespace in cards

[!] Improvements:
  - Hero section feels cramped - add 40px more padding
  - CTA competes with navigation - increase size
  - Feature icons lack visual weight
  - Footer feels disconnected from the rest`,

    `COMPREHENSIVE DESIGN REVIEW

OVERALL SCORE: 7.8 / 10

VISUAL HIERARCHY (8/10)
[OK] Clear heading hierarchy (H1 --> H2 --> H3)
[OK] CTA is the most prominent element
[!] Secondary actions compete for attention
[!] Feature section lacks a clear focal point

LAYOUT & SPACING (7/10)
[OK] Consistent grid usage
[OK] Good card component structure
[!] Hero section needs more vertical breathing room
[!] Uneven section spacing (48px, 64px, 52px)
[X] Footer margins are inconsistent

COLOR & CONTRAST (9/10)
[OK] Cohesive palette with clear hierarchy
[OK] Good use of accent color for CTAs
[!] Consider a warmer neutral for less sterile feel

TYPOGRAPHY (8/10)
[OK] Clean, readable body text
[OK] Good use of font weights for hierarchy
[!] Line length exceeds 75ch in some areas

TOP 3 RECOMMENDATIONS:
1. Add 40px padding above hero headline
2. Reduce feature section to 3 key items
3. Unify section spacing to 64px

This design is 80% production-ready.
Estimated fixes: 2-3 hours of polish.`,
  ],


};

export default outputs;
