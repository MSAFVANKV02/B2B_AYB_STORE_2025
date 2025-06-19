import { ComponentConfig } from "@measured/puck";

export const PuckCardBlock: ComponentConfig = {
  label: "Card Block",
  fields: {
    title: { type: "text" },

    description: { type: "textarea" },
    justifyContent: {
      type: "select",
      label: "Horizontal Alignment",
      options: [
        { label: "Start", value: "justify-start" },
        { label: "Center", value: "justify-center" },
        { label: "End", value: "justify-end" },
        { label: "Between", value: "justify-between" },
        { label: "Around", value: "justify-around" },
        { label: "Evenly", value: "justify-evenly" },
      ],
    },

    alignItems: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Start", value: "items-start" },
        { label: "Center", value: "items-center" },
        { label: "End", value: "items-end" },
        { label: "Stretch", value: "items-stretch" },
      ],
    },
    // padding: { type: "number" },
    paddingX: { type: "number", label: "Padding X (px)" },
    paddingY: { type: "number", label: "Padding Y (px)" },
    height: { type: "text", label: "Card Height (e.g., 200px or 20rem)" },

    variant: {
      type: "select",
      options: [
        { label: "Outlined", value: "border rounded-md" },
        { label: "Floating", value: "shadow-md" },
      ],
    },
    bgColor: {
      type: "select",
      options: [
        { label: "Inherit", value: "inherit" },
        { label: "Red", value: "red-300" },
        { label: "Blue", value: "blue-300" },

        { label: "Yellow", value: "yellow-100" },
      ],
    },
  },
  defaultProps: {
    title: "Title",
    description: "This is a description ... ",
    // padding: 16,
    paddingX: 4, // Tailwind unit (e.g. 4 = px-4)
    paddingY: 4,
    height: "150px",
    variant: "border rounded-md",
    bgColor: "inherit",
    justifyContent: "justify-normal",
    alignItems: "items-normal",
  },

  render: ({ title, description, variant, paddingX, paddingY, bgColor, height, justifyContent, alignItems  }) => {
    const pxClass = `px-${paddingX || 0}`;
    const pyClass = `py-${paddingY || 0}`;
    const className = `${variant} ${pxClass} ${pyClass} bg-${bgColor} flex flex-col ${justifyContent} ${alignItems} `;
    return (
      <div className={className} style={{ height }}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  },
};
