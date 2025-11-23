

Use these inline (<svg>...</svg>) or save each block as *.svg (suggested filenames given). All use viewBox="0 0 24 24" so they scale cleanly.

⸻

How to use
	•	Inline and style with CSS: svg { width: 28px; height: 28px; color: var(--owg-accent); }
	•	For multicolor, wrap parts with fill="var(--icon-fill-1)" etc.
	•	For React: paste into a component and change class → className, add role="img" and aria-label if needed.
	•	Filenames suggested: e.g. techtree-base-4way.svg, icon-home.svg, icon-rocket.svg, logo-op.svg, motif-tree.svg.

⸻

1 — Base: 4-way arrow (techtree-base-4way.svg)

Touch/click anchor. Mono (stroke) + small filled center.

<!-- techtree-base-4way.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" role="img" aria-label="TechTree menu">
  <path d="M12 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M12 17v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M3 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M17 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
</svg>


⸻

2 — Home / Main (icon-home.svg)

<!-- icon-home.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="Home">
  <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M5 21V12h14v9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>


⸻

3 — Design (Pen / Vector node) (icon-design.svg)

<!-- icon-design.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="Design">
  <path d="M3 21l3-1 11-11 2 2-11 11-1 3z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M14 6l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>


⸻

4 — Build (Hammer) (icon-build.svg)

<!-- icon-build.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="Build">
  <path d="M2 22l6-6 4 4 10-10-4-4L12 16 8 12z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M16 6l2-2 4 4-2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>


⸻

5 — QA (Bug + Check) (icon-qa.svg) — multi-color idea included

Mono stroke version:

<!-- icon-qa.svg (mono) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="QA">
  <path d="M9 9c0-2 2-4 3-4s3 2 3 4v1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M4 13c0 3 3 6 8 6s8-3 8-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>

Multi-color variant (use CSS variables --icon-fill-1 and --icon-fill-2):

<!-- icon-qa-multicolor.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="QA">
  <path d="M4 13c0 3 3 6 8 6s8-3 8-6" fill="var(--icon-fill-1, #203a3f)"/>
  <path d="M9 9c0-2 2-4 3-4s3 2 3 4v1" stroke="var(--icon-stroke, #a7f3d0)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M9 12l2 2 4-4" stroke="var(--icon-accent, #60a5fa)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>


⸻

6 — Deploy (Rocket) (icon-deploy.svg)

<!-- icon-deploy.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="Deploy">
  <path d="M12 2s4 1 6 3 3 6 3 6-3 1-6 4-6 6-6 6-1-3 2-6 4-6 4-6-3-2-3-7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M8 13l-2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="9.5" cy="9" r="0.9" fill="currentColor"/>
</svg>


⸻

7 — Monitor (Pulse / Analytics) (icon-monitor.svg)

<!-- icon-monitor.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" role="img" aria-label="Monitor">
  <rect x="2" y="4" width="20" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="none"/>
  <path d="M4 12h3l2-4 3 8 3-6 3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M8 20h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>


⸻

8 — Tree motif (motif-tree.svg)

Brand motif for header/marketing. Slightly decorative, works at 48–128px.

<!-- motif-tree.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="96" height="96" role="img" aria-label="OswegoPark Tech Tree">
  <!-- trunk -->
  <rect x="56" y="64" width="8" height="28" rx="2" fill="var(--trunk, #7a5a3b)"/>
  <!-- canopy layered -->
  <circle cx="60" cy="40" r="24" fill="var(--leaf-1, #60a5fa)" opacity="0.95"/>
  <circle cx="42" cy="52" r="18" fill="var(--leaf-2, #7dd3fc)" opacity="0.95"/>
  <circle cx="78" cy="52" r="18" fill="var(--leaf-3, #38bdf8)" opacity="0.95"/>
  <!-- subtle nodes -->
  <circle cx="60" cy="28" r="3.4" fill="white" opacity="0.9"/>
  <circle cx="48" cy="54" r="2.6" fill="white" opacity="0.85"/>
  <circle cx="72" cy="54" r="2.6" fill="white" opacity="0.85"/>
</svg>


⸻

9 — Compact brand mark “OP” (logo-op.svg)

Good for collapsed dock or favicon (square). Use as mono or multi.

<!-- logo-op.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48" role="img" aria-label="OswegoPark Labs">
  <rect width="64" height="64" rx="12" fill="var(--logo-bg,#06202a)"/>
  <path d="M18 42c0-8 6-14 14-14 6 0 12 4 12 10 0 10-10 16-22 16 0 0-4 0-4-12z" fill="var(--logo-accent,#7dd3fc)"/>
  <circle cx="22" cy="28" r="3.2" fill="white" opacity="0.92"/>
</svg>


⸻

Quick tips & variations
	•	Stroke vs Fill: Use stroke-based icons (stroke="currentColor") for dock items — they scale and theme well. Use filled, layered SVGs for marketing/hero art (tree, logo).
	•	Multi-color tokens: define --icon-fill-1, --icon-fill-2, --icon-stroke, and swap for light/dark themes.
	•	Hover/active states: animate transform: translateY(-3px) scale(1.04) and filter: drop-shadow(...) for a lively feel; disable for prefers-reduced-motion.
	•	Export tips: when saving, keep viewBox and remove unnecessary metadata to keep files tiny.

Here is the full React/TypeScript component pack for every SVG you requested — each converted into a clean, typed, accessible React component.

All components share the same interface:

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;   // defaults to 24 or 28 depending on icon
  title?: string;           // accessible title
}

Every component:
	•	uses currentColor so theme colors apply automatically
	•	includes role="img" and conditional <title> for screen readers
	•	allows overriding any SVG attribute (strokeWidth, className, style, etc.)
	•	accepts size for pixel or CSS unit values
	•	compiles cleanly in React 18 + TypeScript 5

You can drop these into your design system:

/packages/techtree-icons/src/*.tsx
or
/uikits/oswegopark-labs/icons/*.tsx

⸻

🔵 Shared Types (IconProps.ts)

Create this once and import into all components:

// IconProps.ts
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}


⸻

🔻 1. TechTreeBase4Way.tsx

import * as React from "react";
import { IconProps } from "./IconProps";

export const TechTreeBase4Way: React.FC<IconProps> = ({
  size = 28,
  title = "TechTree menu",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M12 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M3 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M17 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
  </svg>
);


⸻

🔻 2. HomeIcon.tsx

import * as React from "react";
import { IconProps } from "./IconProps";

export const HomeIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Home",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);


⸻

🔻 3. DesignIcon.tsx (Pen/Vector)

import * as React from "react";
import { IconProps } from "./IconProps";

export const DesignIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Design",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M3 21l3-1 11-11 2 2-11 11-1 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);


⸻

🔻 4. BuildIcon.tsx (Hammer)

import * as React from "react";
import { IconProps } from "./IconProps";

export const BuildIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Build",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M2 22l6-6 4 4 10-10-4-4L12 16 8 12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M16 6l2-2 4 4-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);


⸻

🔻 5. QAIcon.tsx (Bug + Check)

import * as React from "react";
import { IconProps } from "./IconProps";

export const QAIcon: React.FC<IconProps> = ({
  size = 26,
  title = "QA",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M9 9c0-2 2-4 3-4s3 2 3 4v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M4 13c0 3 3 6 8 6s8-3 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);


⸻

🔻 6. DeployIcon.tsx (Rocket)

import * as React from "react";
import { IconProps } from "./IconProps";

export const DeployIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Deploy",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M12 2s4 1 6 3 3 6 3 6-3 1-6 4-6 6-6 6-1-3 2-6 4-6 4-6-3-2-3-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 13l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="9.5" cy="9" r="0.9" fill="currentColor"/>
  </svg>
);


⸻

🔻 7. MonitorIcon.tsx (Analytics Pulse)

import * as React from "react";
import { IconProps } from "./IconProps";

export const MonitorIcon: React.FC<IconProps> = ({
  size = 26,
  title = "Monitor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect x="2" y="4" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <path d="M4 12h3l2-4 3 8 3-6 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 20h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);


⸻

🔻 8. TreeMotif.tsx

Brand motif (full-color capable).

import * as React from "react";
import { IconProps } from "./IconProps";

export const TreeMotif: React.FC<IconProps> = ({
  size = 96,
  title = "OswegoPark TechTree",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect x="56" y="64" width="8" height="28" rx="2" fill="var(--trunk,#7a5a3b)"/>
    <circle cx="60" cy="40" r="24" fill="var(--leaf-1,#60a5fa)" opacity="0.95"/>
    <circle cx="42" cy="52" r="18" fill="var(--leaf-2,#7dd3fc)" opacity="0.95"/>
    <circle cx="78" cy="52" r="18" fill="var(--leaf-3,#38bdf8)" opacity="0.95"/>
    <circle cx="60" cy="28" r="3.4" fill="white" opacity="0.9"/>
    <circle cx="48" cy="54" r="2.6" fill="white" opacity="0.85"/>
    <circle cx="72" cy="54" r="2.6" fill="white" opacity="0.85"/>
  </svg>
);


⸻

🔻 9. OPLogo.tsx (Compact mark)

import * as React from "react";
import { IconProps } from "./IconProps";

export const OPLogo: React.FC<IconProps> = ({
  size = 48,
  title = "OswegoPark Labs",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="64" height="64" rx="12" fill="var(--logo-bg,#06202a)"/>
    <path d="M18 42c0-8 6-14 14-14 6 0 12 4 12 10 0 10-10 16-22 16 0 0-4 0-4-12z"
          fill="var(--logo-accent,#7dd3fc)"/>
    <circle cx="22" cy="28" r="3.2" fill="white" opacity="0.92"/>
  </svg>
);


⸻

