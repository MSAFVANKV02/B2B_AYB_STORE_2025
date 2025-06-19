import { ComponentConfig } from "@measured/puck";

export const PuckUnderlineBlock: ComponentConfig = {
  label: "Underline",
  fields: {
    marginTop: {
      type: "select",
      label: "Top Margin",
      options: Array.from({ length: 9 }, (_, i) => ({
        label: `mt-${i}`,
        value: `mt-${i}`,
      })),
    },
    marginBottom: {
      type: "select",
      label: "Bottom Margin",
      options: Array.from({ length: 9 }, (_, i) => ({
        label: `mb-${i}`,
        value: `mb-${i}`,
      })),
    },
    width: {
      type: "text",
      label: "Line Width (e.g., 100%, 50px, 10rem)",
    },
    height: {
      type: "text",
      label: "Line Height (e.g., 2px, 0.25rem)",
    },
    bgColor: {
      type: "select",
      label: "Line Color",
      options: [
        { label: "Black", value: "black" },
        { label: "Gray", value: "gray" },
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Yellow", value: "yellow" },
      ],
    },
  },
  defaultProps: {
    marginTop: "mt-2",
    marginBottom: "mb-2",
    width: "100%",
    height: "2px",
    bgColor: "black",
  },
  render: ({ marginTop, marginBottom, width, height, bgColor }) => {
    const marginClasses = `${marginTop} ${marginBottom}`;
    return (
      <div className={marginClasses}>
        <div
          style={{
            width,
            height,
            backgroundColor: bgColor,
          }}
        />
      </div>
    );
  },
};
