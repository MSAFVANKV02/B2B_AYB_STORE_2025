import { Input } from "@/components/ui/input";
import { ComponentConfig } from "@measured/puck"; // Adjust if you're using a specific type

const paddingField = {
  padding: {
    type: "radio",
    label: "Padding",
    options: [
      { label: "None", value: "0" },
      { label: "Small", value: "1rem" },
      { label: "Medium", value: "2rem" },
      { label: "Large", value: "4rem" },
    ],
  } as const,
};

const heightField = {
  height: {
    type: "radio",
    label: "Height",
    options: [
      { label: "Auto", value: "auto" },
      { label: "Small", value: "300px" },
      { label: "Medium", value: "500px" },
      { label: "Large", value: "700px" },
    ],
  } as const,
};

export const Tm_01_MainBlock01 : ComponentConfig  = {
  label: "Hero Split Block",
  fields: {
    ...paddingField,
    ...heightField,

    image: {
      type: "custom",
      label: "Image URL",
      render: ({ value, onChange }) => (
        <Input
          type="text"
          placeholder="Enter image URL"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ),
    },

    imagePosition: {
      type: "radio",
      label: "Image Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },

    contentJustify: {
      type: "select",
      label: "Content Justify",
      options: [
        { label: "Start", value: "flex-start" },
        { label: "Center", value: "center" },
        { label: "End", value: "flex-end" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
      ],
    },

    buttonAlign: {
      type: "select",
      label: "Button Align",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Bottom Left", value: "bottom-left" },
        { label: "Bottom Center", value: "bottom-center" },
        { label: "Bottom Right", value: "bottom-right" },
      ],
    },

    contentAlign: {
      type: "radio",
      label: "Content Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },

    title: { type: "text", label: "Title" },
    titleColor: { type: "text", label: "Title Color (e.g., #000)" },
    titleSize: { type: "text", label: "Title Font Size (e.g., 24px)" },

    description: { type: "textarea", label: "Description" },
    descColor: { type: "text", label: "Description Color" },
    descSize: { type: "text", label: "Description Font Size" },

    buttonText: { type: "text", label: "Button Text" },
    buttonBg: { type: "text", label: "Button Background Color" },
    buttonColor: { type: "text", label: "Button Text Color" },
  },

  defaultProps: {
    image: "",
    imagePosition: "left",
    contentAlign: "left",

    title: "Default Title",
    titleColor: "#000",
    titleSize: "24px",

    description: "Default description.",
    descColor: "#333",
    descSize: "16px",

    buttonText: "Click Here",
    buttonBg: "#5F08B1",
    buttonColor: "#fff",

    height: "400px",
    padding: "1rem",

    contentJustify: "flex-start",
    buttonAlign: "left",
  },

  render: ({
    image,
    title,
    description,
    buttonText,
    padding,
    height,
    imagePosition,
    contentAlign,
    titleColor,
    titleSize,
    descColor,
    descSize,
    buttonBg,
    buttonColor,
    contentJustify,
    buttonAlign,
  }) => {
    const isImageLeft = imagePosition === "left";

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: isImageLeft ? "row" : "row-reverse",
          padding,
          height,
          gap: "1rem",
        }}
      >
        {/* Image */}
        <div style={{ flex: "1 1 300px", minWidth: "250px", height: "100%" }}>
          <img
            src={image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            flex: "1 1 300px",
            minWidth: "250px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: contentJustify,
            textAlign: contentAlign,
          }}
        >
          <h2 style={{ color: titleColor, fontSize: titleSize }}>{title}</h2>
          <p style={{ color: descColor, fontSize: descSize }}>{description}</p>

          <div
            style={{
              marginTop: buttonAlign.startsWith("bottom") ? "auto" : undefined,
              textAlign: (() => {
                if (buttonAlign === "left") return "left";
                if (buttonAlign === "center") return "center";
                if (buttonAlign === "right") return "right";
                if (buttonAlign === "bottom-left") return "left";
                if (buttonAlign === "bottom-center") return "center";
                if (buttonAlign === "bottom-right") return "right";
                return "left";
              })(),
            }}
          >
            <button
              style={{
                border: "1px #cccc solid",
                padding: "6px 12px",
                backgroundColor: buttonBg,
                color: buttonColor,
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  },
};


