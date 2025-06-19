import React from 'react';
import { useNode } from '@craftjs/core';

type Props = {
  children?: React.ReactNode;
  padding?: string;
  margin?: string;
  gap?: string;
  backgroundColor?: string;
};

// ✅ Move this above `CraftContainer.craft`
const ContainerSettings = () => {
  const {
    actions: { setProp },
    props: { padding, margin, gap, backgroundColor }
  } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Padding</label>
      <input
        type="text"
        value={padding}
        onChange={(e) => setProp((props:any) => (props.padding = e.target.value))}
        placeholder="e.g. 1rem"
        className="w-full p-1 border rounded"
      />

      <label className="block text-sm font-medium">Margin</label>
      <input
        type="text"
        value={margin}
        onChange={(e) => setProp((props:any) => (props.margin = e.target.value))}
        placeholder="e.g. 1rem"
        className="w-full p-1 border rounded"
      />

      <label className="block text-sm font-medium">Gap Between Blocks</label>
      <input
        type="text"
        value={gap}
        onChange={(e) => setProp((props:any) => (props.gap = e.target.value))}
        placeholder="e.g. 1rem"
        className="w-full p-1 border rounded"
      />

      <label className="block text-sm font-medium">Background Color</label>
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setProp((props:any) => (props.backgroundColor = e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export const CraftContainerBlock = ({ children, padding, margin, gap, backgroundColor }: Props) => {
  const {
    connectors: { connect, drag }
  } = useNode();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        padding,
        margin,
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        gap
      }}
      className="rounded border border-dashed h-full"
    >
      {children}
    </div>
  );
};

CraftContainerBlock.craft = {
  displayName: 'Container',
  props: {
    padding: '0',
    margin: '0',
    gap: '0',
    backgroundColor: '#ffffff'
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true
  },
  related: {
    settings: ContainerSettings
  }
};

export default ContainerSettings;
