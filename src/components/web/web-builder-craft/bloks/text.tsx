import { useNode, useEditor } from '@craftjs/core';

import ContentEditable from 'react-contenteditable';
import { TextSettings } from './settings/Text_Settings';



export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<'r' | 'g' | 'b' | 'a', string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
};

export const Text = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin,
}: Partial<TextProps>) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ContentEditable
      innerRef={connect}
      html={text || ""}
      // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      style={{
        width: '100%',
        margin: `${margin?.[0] || 0}px ${margin?.[1] || 0}px ${margin?.[2] || 0}px ${margin?.[3] || 0}px`,
        color: color ? `rgba(${Object.values(color).join(',')})` : "rgba(0,0,0,1)",
        fontSize: `${fontSize || 14}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight: fontWeight || 'normal',
        textAlign: textAlign || 'left',
      }}
    />
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    fontSize: '15',
    textAlign: 'left',
    fontWeight: '500',
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: 'Text',
  },
  related: {
    toolbar: TextSettings,
  },
};
