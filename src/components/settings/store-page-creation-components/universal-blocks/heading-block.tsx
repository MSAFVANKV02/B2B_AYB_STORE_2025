import { ComponentConfig } from "@measured/puck";
import { Input } from "@/components/ui/input";

export const HeadingBlock: ComponentConfig = {
  label: "Heading H1",
  fields: {
    title: { type: "text", label: "Title" },
    fontSize: {
      type: "text",
      label: "Font Size (e.g., 3rem or 36px)",
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Light", value: "300" },
        { label: "Normal", value: "400" },
        { label: "Medium", value: "500" },
        { label: "Bold", value: "700" },
        { label: "Extra Bold", value: "900" },
      ],
    },
    textAlign: {
        type: "radio",
        label: "text textAlign",
        options: [
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
          { label: "Left", value: "left" },
        ],
      },
    color: {
        type: "custom",
        label: "Text Color",
        render: ({ value, onChange }) => (
          <Input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", height: "2rem", border: "none" }}
          />
        ),
      },
  },
  defaultProps: {
    title: "Heading H1",
    fontSize: "3rem",
    fontWeight: "700",
    color: "#000000",
  },
  render: ({ title, fontSize, fontWeight, color , textAlign}) => (
    <div style={{ padding: "1rem", textAlign:textAlign }}>
      <h1 style={{ fontSize, fontWeight, color }}>{title}</h1>
    </div>
  ),
};
