import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from "react-contenteditable";

import { TextSettings } from "./TextSettings";

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<"r" | "g" | "b" | "a", number>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
};

export const Text = ({
  fontSize = "15",
  textAlign = "left",
  fontWeight = "500",
  color = { r: 92, g: 90, b: 90, a: 1 },
  shadow = 0,
  text = "Text",
  margin = ["0", "0", "0", "0"],
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
      html={text}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      tagName="h2"
      style={{
        width: "100%",
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${shadow / 100})`,
        fontWeight,
        textAlign,
      }}
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    fontSize: "15",
    textAlign: "left",
    fontWeight: "500",
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: ["0", "0", "0", "0"],
    shadow: 0,
    text: "Text",
  },
  related: {
    settings: TextSettings,
  },
};
