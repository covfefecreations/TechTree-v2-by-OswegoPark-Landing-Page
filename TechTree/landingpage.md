Below is a landing page concept + React/TSX scaffolding for the OswegoPark UI Kit, shaped by the “TechnologyForest at night” motif you defined. This gives you a portfolio-ready UI Kit homepage that feels like a product, showcases components (including TechTree SmartNav), and sets the tone for your entire design language.

⸻

OSWEGOPARK UI KIT — LANDING PAGE

“TechnologyForest” Mood: Futuristic night woods, glowing candy-color accents, moody gradients, warm neon nodes.

⸻

1. HIGH-LEVEL CONCEPT

Think of this landing page as the storybook prologue to your entire design system.
A glowy forest silhouette. Abstract node-branches drifting like constellations.
And in the center: OswegoPark UI Kit, the official design language of your apps.

The page is structured as:
	1.	Hero Section — Logo, tagline, mood scene
	2.	Core Principles — Your design philosophy manifested as glowing icons
	3.	Component Library Preview — Cards linking to Storybook pages
	4.	Signature Components — Highlight TechTree SmartNav
	5.	Brand Motifs — The “forest nodes” + lab beaker
	6.	Footer — Clean, minimal, glowy underline

⸻

2. COLOR PALETTE (NIGHT TECHNOLOGY FOREST)

A quick palette reference to align code tokens:

Token	Color
--op-night	#0B0E1A (deep blue-black)
--op-midnight	#151B2F
--op-purple	#2D2357
--op-star-yellow	#FFD86B
--op-melon-red	#FF6F6C
--op-apricot	#FFB38A
--op-candy-blue	#6CE8FF
--op-candy-pink	#FF72D0
--op-forest-green	#2BCF81
--op-vcr-red	#D32020
--op-periwinkle	#A6A9FF
--op-bark	#7A5530


⸻

3. LANDING PAGE — REACT + TYPESCRIPT

Fully typed, aria-friendly, mobile-first, and componentized.

File: LandingPage.tsx

import React from "react";
import { OswegoLogo } from "./icons/OswegoLogo";
import { NodeBeaker } from "./icons/NodeBeaker";
import "./landing.css";

export const LandingPage: React.FC = () => {
  return (
    <main className="op-landing" aria-label="OswegoPark UI Kit Landing Page">
      <section className="op-hero">
        <OswegoLogo aria-label="OswegoPark Logo" className="op-hero-logo" />

        <h1 className="op-hero-title">OswegoPark UI Kit</h1>
        <h2 className="op-hero-sub">
          a design system for the <span>TechnologyForest</span>
        </h2>

        <div className="op-hero-stars" aria-hidden="true" />
      </section>

      <section className="op-principles">
        <h3>Design Principles</h3>
        <ul>
          <li>
            <NodeBeaker aria-hidden="true" />  
            <p>Neon clarity over noise</p>
          </li>
          <li>
            <NodeBeaker aria-hidden="true" />
            <p>Modular components like forest nodes</p>
          </li>
          <li>
            <NodeBeaker aria-hidden="true" />
            <p>Dark-mode first. Developer-centric.</p>
          </li>
        </ul>
      </section>

      <section className="op-browser">
        <h3>Components Library</h3>

        <div className="op-cards">
          <a className="op-card" href="/storybook" aria-label="Open Storybook">
            <span className="op-card-title">Storybook</span>
            <span className="op-card-sub">Full Component Docs</span>
          </a>

          <a className="op-card" href="/components/TechTree" aria-label="TechTree SmartNav Component">
            <span className="op-card-title">TechTree SmartNav</span>
            <span className="op-card-sub">Signature Navigation System</span>
          </a>

          <a className="op-card" href="/tokens" aria-label="Design Tokens">
            <span className="op-card-title">Design Tokens</span>
            <span className="op-card-sub">Color · Typography · Spacing</span>
          </a>
        </div>
      </section>

      <footer className="op-foot">
        <p>© {new Date().getFullYear()} OswegoPark Labs</p>
      </footer>
    </main>
  );
};


⸻

4. LANDING PAGE CSS

Mobile-first, candy-glow, night-forest gradient.

File: landing.css

:root {
  --op-night: #0b0e1a;
  --op-mid: #151b2f;
  --op-purple: #2d2357;
  --op-candy-blue: #6ce8ff;
  --op-candy-pink: #ff72d0;
  --op-star: #ffd86b;
  --op-apricot: #ffb38a;
  --op-melon: #ff6f6c;
}

.op-landing {
  min-height: 100vh;
  background: radial-gradient(circle at 50% 10%, var(--op-purple), var(--op-night));
  color: white;
  padding-bottom: 6rem;
  font-family: Inter, system-ui, sans-serif;
}

/* HERO */
.op-hero {
  padding: 4rem 1.5rem 3rem;
  text-align: center;
  position: relative;
}

.op-hero-logo {
  width: 88px;
  height: 88px;
  margin-bottom: 1rem;
}

.op-hero-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0;
}

.op-hero-sub {
  margin-top: .5rem;
  font-size: 1.2rem;
  font-weight: 300;
}
.op-hero-sub span {
  color: var(--op-candy-blue);
}

/* star effect */
.op-hero-stars {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle 2px, var(--op-star) 0, transparent 80%) 20% 30%,
    radial-gradient(circle 2px, var(--op-candy-pink) 0, transparent 80%) 70% 60%,
    radial-gradient(circle 2px, var(--op-candy-blue) 0, transparent 80%) 50% 20%;
  background-size: 4px 4px;
  pointer-events: none;
  opacity: 0.7;
}

/* PRINCIPLES */
.op-principles {
  padding: 2.5rem 1.5rem;
}
.op-principles h3 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
.op-principles ul {
  list-style: none;
  padding: 0;
}
.op-principles li {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: .9rem;
  font-size: 1.1rem;
}

/* CARDS */
.op-browser {
  padding: 2.5rem 1.5rem;
}

.op-cards {
  display: grid;
  gap: 1rem;
}

.op-card {
  display: block;
  background: rgba(255,255,255,0.05);
  padding: 1.5rem;
  border-radius: .75rem;
  backdrop-filter: blur(10px);
  transition: 200ms ease;
  text-decoration: none;
  color: white;
  border: 1px solid rgba(255,255,255,0.1);
}
.op-card:hover {
  border-color: var(--op-candy-blue);
  transform: translateY(-3px);
}

.op-card-title {
  font-size: 1.4rem;
  font-weight: 600;
}
.op-card-sub {
  font-size: .95rem;
  opacity: .8;
}

/* FOOTER */
.op-foot {
  margin-top: 4rem;
  text-align: center;
  opacity: .6;
  font-size: .9rem;
}


⸻

5. OPTIONAL: ADD THE “FOREST NODES” SVG AS BACKGROUND

I’ll supply it as a React component if you want, but here’s the motif idea:

A constellation of abstract “branch nodes” forming a soft graph across the page top corners.

Symbolic layer:
	•	Represents tech architecture
	•	Represents tree branches
	•	Represents neural pathways

Great for branding.

⸻

6. NEXT STEPS

I can generate next:
	•	Logo SVGs (OswegoPark Tree + OswegoPark Labs Beaker/Atom)
	•	Component card icons
	•	Storybook theme / Storybook branding
	•	A full tokens.ts file
	•	Dark/light switcher
	•	TechTree SmartNav integrated into the landing page

Just tell me what direction you want next: deeper branding assets, more components, or a full OSWEGOPARK.design site.