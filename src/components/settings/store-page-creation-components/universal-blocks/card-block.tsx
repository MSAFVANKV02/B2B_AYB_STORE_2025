import { ComponentConfig } from "@measured/puck";

export const PuckCardBlock: ComponentConfig = {
  label: "Card Block",
  fields: {
    title: { type: "text" },

    description: { type: "textarea" },
    // padding: { type: "number" },
    paddingX: { type: "number", label: "Padding X (px)" },
    paddingY: { type: "number", label: "Padding Y (px)" },
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
    variant:"border rounded-md",
    bgColor:"inherit"
  },

  render: ({ title, description,  variant,  paddingX, paddingY, bgColor }) => {

    const pxClass = `px-${paddingX || 0}`;
    const pyClass = `py-${paddingY || 0}`;
    const className = `${variant} ${pxClass} ${pyClass} bg-${bgColor} `;
    return (
      <div className={className}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  },
};
