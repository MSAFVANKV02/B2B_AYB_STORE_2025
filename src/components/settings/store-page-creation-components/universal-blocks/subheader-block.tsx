import { ComponentConfig } from "@measured/puck";

export const PuckSubHeaderBlock: ComponentConfig = {
  label: "Sub Header (H2)",
  fields: {
    text: { type: "text", label: "Text" },
    fontSize: { type: "text", label: "Font Size (e.g., 24px)" },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Bold", value: "bold" },
        { label: "Bolder", value: "bolder" },
        { label: "Light", value: "lighter" },
        { label: "600", value: "600" },
        { label: "700", value: "700" },
      ],
    },
    color: { type: "text", label: "Text Color (e.g., #000 or red)" },
  },
  defaultProps: {
    text: "Subheading Here",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
  },
  render: ({ text, fontSize, fontWeight, color }) => (
    <h2 style={{ fontSize, fontWeight, color }}>{text}</h2>
  ),
};
