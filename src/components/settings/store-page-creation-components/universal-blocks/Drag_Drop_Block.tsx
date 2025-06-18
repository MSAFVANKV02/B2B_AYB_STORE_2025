import { ComponentConfig, DropZone } from "@measured/puck";

export const PukeDragDropBlock: ComponentConfig = {
  label: "Grid Block",
  fields: {
    columns: {
      type: "select",
      label: "Columns",
      options: Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}`,
        value: (i + 1).toString(),
      })),
    },
  },
  defaultProps: {
    columns: "3",
  },
  render: ({ columns }) => {
    const columnCount = parseInt(columns || "3");

    return (
      <DropZone
        zone="my-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: "1rem",
          padding: "0px 10px", 
        }}
      />
    );
  },
};
