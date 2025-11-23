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