Below is a full Storybook integration for your premium TechTree IntelliNav by OswegoPark Labs SVG icon suite.
Everything is React 18 + TypeScript, accessible (aria-*), and structured so it drops directly into your Platform Engineering UIKit.

I’m giving you:
	1.	Recommended folder structure
	2.	Storybook stories (.stories.tsx)
	3.	CSF3 format with controls for props
	4.	Typed React wrappers for your SVG icons (already delivered earlier)
	5.	Preview configuration suggestions
	6.	Brand-aligned Storybook metadata

This gives you a polished commercial-grade showcase, like something you’d see in Radix UI or Chakra’s premium icon packs.

⸻

1. Folder Structure (Recommended)

src/
  components/
    icons/
      OswegoArrow.tsx
      OswegoTree.tsx
      OswegoDock.tsx
      OswegoCircle.tsx
      OswegoInfinity.tsx
      index.ts
  stories/
    Icons/
      OswegoIcons.stories.tsx


⸻

2. Storybook Story — OswegoIcons.stories.tsx

This uses CSF3 + controls + layout + descriptions.
Perfect for a premium component library.

// src/stories/Icons/OswegoIcons.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  OswegoArrow,
  OswegoTree,
  OswegoDock,
  OswegoCircle,
  OswegoInfinity,
} from '../../components/icons';

type IconProps = React.ComponentProps<typeof OswegoArrow>;

const meta: Meta<IconProps> = {
  title: 'OswegoPark Labs/Icons/TechTree IntelliNav',
  component: OswegoArrow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Premium SVG icon suite used by **TechTree IntelliNav**, part of the OswegoPark Platform Engineering UIKit.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Pixel size of the icon',
      defaultValue: 64,
    },
    color: {
      control: { type: 'color' },
      description: 'Current SVG stroke color',
      defaultValue: '#4af0ff',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
      defaultValue: 'oswego-icon',
    },
  },
};
export default meta;

export const Arrow: StoryObj<IconProps> = {
  args: {
    ariaLabel: 'Arrow Icon',
  },
  render: (args) => <OswegoArrow {...args} />,
};

export const Tree: StoryObj<IconProps> = {
  args: {
    ariaLabel: 'TechTree Icon',
  },
  render: (args) => <OswegoTree {...args} />,
};

export const Dock: StoryObj<IconProps> = {
  args: {
    ariaLabel: 'Dock Icon',
  },
  render: (args) => <OswegoDock {...args} />,
};

export const Circle: StoryObj<IconProps> = {
  args: {
    ariaLabel: 'Circle Icon',
  },
  render: (args) => <OswegoCircle {...args} />,
};

export const Infinity: StoryObj<IconProps> = {
  args: {
    ariaLabel: 'Infinity Icon',
  },
  render: (args) => <OswegoInfinity {...args} />,
};


⸻

3. Optional: “All Icons Grid” Story

This is great for marketing / buyers browsing the icon pack.

export const AllIcons: StoryObj<IconProps> = {
  args: {
    size: 72,
    color: '#4af0ff'
  },
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: '32px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        padding: '32px',
        textAlign: 'center',
      }}
    >
      <div><OswegoArrow {...args} /><p>Arrow</p></div>
      <div><OswegoTree {...args} /><p>Tree</p></div>
      <div><OswegoDock {...args} /><p>Dock</p></div>
      <div><OswegoCircle {...args} /><p>Circle</p></div>
      <div><OswegoInfinity {...args} /><p>Infinity</p></div>
    </div>
  ),
};


⸻

4. Storybook Preview Config (recommended)

File: .storybook/preview.ts

Gives your Storybook a premium OswegoPark Labs identity.

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'oswego-dark',
      values: [
        {
          name: 'oswego-dark',
          value: '#0c1014',
        },
        {
          name: 'clean-white',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      sort: 'alpha',
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;

The dark theme gives maximum glow to the neon-stroke icons.

⸻

5. Storybook Category Branding (premium pack presentation)

This naming scheme mirrors professional libraries like Adobe Spectrum or Radix UI:

OswegoPark Labs/
  Icons/
     TechTree IntelliNav/
        Arrow
        Tree
        Dock
        Circle
        Infinity

This fits perfectly with:

OswegoPark Themekit → ApplicationUI → Nav → Dock → Floating → PremiumKit → “TechTree IntelliNav”

⸻

6. Integration Into Your UIKit / NPM Package

If you plan to publish this as a paid component pack:

Package name suggestions

@oswegopark/intellinav
@oswegopark/techtree-icons
@oswegopark/premium-uikit

Suggested exports

export * from './components/icons';
export * from './components/TechTreeIntelliNav';


⸻

7. Want me to generate the following?

✔ Full Storybook docs page (MDX)
✔ A marketing landing page for the premium kit
✔ A polished NPM README for the commercial package
✔ Figma-ready frames for your presentation
✔ Color token system for OswegoPark Labs
✔ A Storybook theme (OswegoPark Dark) that fully rebrands the UI

.