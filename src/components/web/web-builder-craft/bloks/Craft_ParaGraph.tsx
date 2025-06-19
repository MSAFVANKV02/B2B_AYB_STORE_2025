import React, { ChangeEvent } from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import BlockWrapper from '../tools/BlockWrapper';

export interface ParagraphProps {
  fontSize: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  children: string;
}

// 🧱 Paragraph Component
const CraftParagraph: UserComponent<ParagraphProps> = ({
  fontSize,
  color,
  textAlign,
  children,
}) => {
  const {
    connectors: { connect, drag },
    isSelected,
    actions: { setProp },
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  return (
    <BlockWrapper>
      <p
        ref={(el) => el && connect(drag(el))}
        style={{ fontSize, color, textAlign }}
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) =>
          setProp((props: ParagraphProps) => {
            props.children = e.currentTarget.textContent || '';
          })
        }
        className="select-none"
      >
        {children || 'Paragraph content goes here...'}
      </p>
    </BlockWrapper>
  );
};

// 🛠️ Settings Panel
const ParagraphSettings: React.FC = () => {
  const {
    props: { fontSize, color, textAlign },
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props as ParagraphProps,
  }));

  const handleChange = (prop: keyof ParagraphProps, value: string) => {
    setProp((props: ParagraphProps) => {
      if (prop === 'textAlign' && ['left', 'center', 'right'].includes(value)) {
        props.textAlign = value as 'left' | 'center' | 'right';
      } else if (prop === 'fontSize') {
        props.fontSize = value;
      } else if (prop === 'color') {
        props.color = value;
      }
    });
  };

  return (
    <div>
      <label className="block mb-1">Font Size</label>
      <input
        type="text"
        value={fontSize}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange('fontSize', e.target.value)
        }
        className="w-full mb-2 border rounded p-1"
      />

      <label className="block mb-1">Color</label>
      <input
        type="color"
        value={color}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange('color', e.target.value)
        }
        className="w-full mb-2"
      />

      <label className="block mb-1">Text Align</label>
      <select
        value={textAlign}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleChange('textAlign', e.target.value)
        }
        className="w-full mb-2 border rounded p-1"
      >
        {['left', 'center', 'right'].map((align) => (
          <option key={align} value={align}>
            {align}
          </option>
        ))}
      </select>
    </div>
  );
};

// 🧠 Craft metadata
CraftParagraph.craft = {
  displayName: 'Paragraph',
  props: {
    fontSize: '1rem',
    color: '#000000',
    textAlign: 'left',
    children: 'Paragraph content goes here...',
  },
  related: {
    settings: ParagraphSettings,
  },
};

export default CraftParagraph;
