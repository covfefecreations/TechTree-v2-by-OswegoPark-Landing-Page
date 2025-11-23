npm package 

Here’s a clean, professional NPM package structure for the OswegoPark UI Kit plus the logo SVGs (Tree + Labs Beaker).
Everything is React 18 + TypeScript–ready, publishable to npm, and wired for future Storybook + component exports.

The logos below are hand-crafted to match your TechnologyForest identity: abstract tree nodes + glowing lab motif.

⸻

OSWEGOPARK UI KIT — NPM PACKAGE SETUP

Package Name: @oswegopark/ui

(Optionally scoped: @oswegopark-labs/ui)

⸻

1. Directory Structure

oswegopark-ui/
│
├─ package.json
├─ tsconfig.json
├─ vite.config.ts              // recommended (faster than webpack)
├─ README.md
│
├─ src/
│   ├─ index.ts                // exports all components
│   ├─ components/
│   │     ├─ TechTreeSmartNav/
│   │     │      ├─ TechTreeSmartNav.tsx
│   │     │      └─ TechTreeSmartNav.css
│   │     ├─ Button/
│   │     ├─ Card/
│   │     └─ ...
│   │
│   ├─ icons/
│   │     ├─ OswegoTree.tsx
│   │     ├─ OswegoLabsBeaker.tsx
│   │     └─ index.ts
│   │
│   └─ tokens/
│         ├─ colors.ts
│         ├─ spacing.ts
│         └─ typography.ts
│
└─ dist/                       // generated on build


⸻

2. package.json

Publish-ready, React 18, TypeScript definitions, proper exports.

{
  "name": "@oswegopark/ui",
  "version": "0.0.1",
  "description": "OswegoPark Labs UI Kit — TechnologyForest design system.",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc --emitDeclarationOnly",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^5.2.0",
    "@storybook/react": "^8.1.0"
  }
}


⸻

3. Logo SVGs — Converted into React Components

These are clean, responsive, ARIA-friendly, and styled with your palette.
You can optionally expose color props later.

⸻

OswegoPark Tree Logo

A tech-tree: trunk, node-branches, constellation-style geometry.

src/icons/OswegoTree.tsx

import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
}

export const OswegoTree: React.FC<IconProps> = ({
  size = 72,
  className,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    <circle cx="100" cy="20" r="10" fill="#6CE8FF" stroke="none" />
    <circle cx="50" cy="70" r="10" fill="#FF72D0" stroke="none" />
    <circle cx="150" cy="70" r="10" fill="#FFD86B" stroke="none" />
    <circle cx="100" cy="120" r="10" fill="#2BCF81" stroke="none" />

    <line x1="100" y1="30" x2="50" y2="70" stroke="#6CE8FF" />
    <line x1="100" y1="30" x2="150" y2="70" stroke="#6CE8FF" />

    <line x1="50" y1="80" x2="100" y2="120" stroke="#FF72D0" />
    <line x1="150" y1="80" x2="100" y2="120" stroke="#FFD86B" />

    <path
      d="M100 120 L100 180"
      stroke="#2BCF81"
    />
  </svg>
);


⸻

OswegoPark Labs Beaker (Lab Motif Icon)

Futuristic, glowing, chemistry-meets-neon UI identity.

src/icons/OswegoLabsBeaker.tsx

import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
}

export const OswegoLabsBeaker: React.FC<IconProps> = ({
  size = 72,
  className,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    className={className}
    {...rest}
  >
    <path
      d="M70 20 L130 20 M100 20 L100 80"
      stroke="#6CE8FF"
    />

    <path
      d="M70 20 L70 150 A30 30 0 0 0 130 150 L130 20"
      stroke="#6CE8FF"
    />

    <path
      d="M70 90 L130 90"
      stroke="#FF6F6C"
    />

    <circle cx="90" cy="110" r="10" fill="#FF72D0" stroke="none" />
    <circle cx="120" cy="130" r="10" fill="#FFD86B" stroke="none" />
    <circle cx="80" cy="140" r="10" fill="#6CE8FF" stroke="none" />
  </svg>
);


⸻

4. Icon Index

src/icons/index.ts

export * from "./OswegoTree";
export * from "./OswegoLabsBeaker";


⸻

5. Export from UI Package Root

src/index.ts
90 pp
export * from "./icons";
export * from "./components/TllelpchTreeSmartNav/TechTreeSmartNav";
export * from "./tokens/colors";
export * from "./tokens/spacing";
export * from "./tokens/typography";


⸻

6. Optional Upgrade

I can generate:
	•	Full npm README (badges, usage examples, installation docs)
	•	Token generator (automatic CSS variables from tokens.ts)
	•	Storybook homepage matching the TechnologyForest motif
	•	A Vite build pipeline optimized for tree-shakable exports
	•	Published-ready version (I can generate the entire folder structure)
	•	Figma version of these logos (exportable SVG paths)

⸻

If you want, I can also turn the OswegoTree + Beaker logos into:
	•	a combined wordmark
	•	a mascot
	•	an animated SVG
	•	a favicon + app icon set

?