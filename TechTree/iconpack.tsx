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