import { useNode, useEditor } from "@craftjs/core";

import {Craft_Image_Settings} from "./Craft_Image_Settings";

export type ImageProps = {
  src: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain";
  margin?: [string, string, string, string];
  borderRadius?: number;
};

export const ImageBlock = ({
  src = "/placeholder.png",
  width = "100%",
  height = "300px",
  objectFit = "cover",
  margin = ["0", "0", "0", "0"],
  borderRadius = 0,
}: Partial<ImageProps>) => {
  const {
    connectors: { connect },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={(ref) => ref && connect(ref)}
      style={{
        width,
        height,
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        overflow: "hidden",
        borderRadius: `${borderRadius}px`,
      }}
    >
      <img
        src={src}
        alt="Craft image"
        className="w-full h-full"
        style={{
          objectFit,
          pointerEvents: enabled ? "none" : "auto",
        }}
      />
    </div>
  );
};

ImageBlock.craft = {
  displayName: "ImageBlock",
  props: {
    src: "/placeholder.png",
    width: "100%",
    height: "300px",
    objectFit: "cover",
    margin: ["0", "0", "0", "0"],
    borderRadius: 0,
  },
  related: {
    settings: Craft_Image_Settings
  },
};
