import { ComponentConfig } from "@measured/puck";

export const ParagraphBlock: ComponentConfig = {
  label: "Paragraph",
  fields: {
    text: { type: "textarea", label: "Text" },
    fontSize: { type: "text", label: "Font Size (e.g., 16px)" },
    lineHeight: { type: "text", label: "Line Height (e.g., 1.5)" },
    color: { type: "text", label: "Text Color (e.g., #333)" },
  },
  defaultProps: {
    text: "This is a sample paragraph. You can customize it in the panel.",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
  },
  render: ({ text, fontSize, lineHeight, color }) => (
    <p style={{ fontSize, lineHeight, color }}>{text}</p>
  ),
};
