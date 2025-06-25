import React, { ChangeEvent } from "react";
import { useNode, UserComponent } from "@craftjs/core";
import BlockWrapper from "../tools/BlockWrapper";

interface CraftHeadingProps {
  fontSize: string;
  color: string;
  textAlign: "left" | "center" | "right";
  children: string;
}

export const CraftHeading: UserComponent<CraftHeadingProps> = ({
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
      <h1
        ref={(el) => el && connect(drag(el))}
        style={{ fontSize, color, textAlign }}
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) =>
          setProp((props: CraftHeadingProps) => {
            props.children = e.currentTarget.textContent || "";
          })
        }
        className="select-none"
      >
        {children || "Heading"}
      </h1>
    </BlockWrapper>
  );
};

CraftHeading.craft = {
  displayName: "CraftHeading",
  props: {
    fontSize: "2rem",
    color: "#000000",
    textAlign: "left",
    children: "Heading",
  },
  related: {
    settings: () => <HeadingSettings />,
  },
};

// 🛠️ Settings Panel
const HeadingSettings: React.FC = () => {
  const {
    props: { fontSize, color, textAlign },
    actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props as CraftHeadingProps,
  }));

  // const handleChange = (prop: keyof CraftHeadingProps, value: string) => {
  //   setProp((props: CraftHeadingProps) => {
  //     props[prop] = value;
  //   });
  // };

  const handleChange = (prop: keyof CraftHeadingProps, value: string) => {
    setProp((props: CraftHeadingProps) => {
      if (prop === "textAlign" && ["left", "center", "right"].includes(value)) {
        props.textAlign = value as "left" | "center" | "right";
      } else if (prop === "fontSize") {
        props.fontSize = value;
      } else if (prop === "color") {
        props.color = value;
      } else if (prop === "children") {
        props.children = value;
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
          handleChange("fontSize", e.target.value)
        }
        className="w-full mb-2 border rounded p-1"
      />

      <label className="block mb-1">Color</label>
      <input
        type="color"
        value={color}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("color", e.target.value)
        }
        className="w-full mb-2"
      />

      <label className="block mb-1">Text Align</label>
      <select
        value={textAlign}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleChange("textAlign", e.target.value)
        }
        className="w-full mb-2 border rounded p-1"
      >
        {["left", "center", "right"].map((align) => (
          <option key={align} value={align}>
            {align}
          </option>
        ))}
      </select>
    </div>
  );
};
