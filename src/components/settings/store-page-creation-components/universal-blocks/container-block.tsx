import { ComponentConfig } from "@measured/puck";

export const FreeformContainerBlock: ComponentConfig = {
  label: "Freeform Container",
  fields: {
    bgColor: {
      type: "text",
      label: "Background Color"
    },
    height: {
      type: "text",
      label: "Height (e.g. 500px or 100vh)"
    },
    width: {
      type: "text",
      label: "Width (e.g. 100% or 1200px)"
    },
    children: {
      type: "array",
      label: "Elements",
      arrayFields: {
        component: {
          type: "select",
          label: "Component",
          options: [
            { label: "Heading", value: "heading" },
            { label: "Subtitle", value: "subtitle" },
            { label: "Image", value: "image" },
          ]
          
        },
        positionType: {
          type: "select",
          label: "Position Type",
          options: [
            { label: "Default (Flow)", value: "static" },
            { label: "Absolute (Move freely)", value: "absolute" }
          ]
        },
        top: { type: "text", label: "Top (e.g. 50px)" },
        left: { type: "text", label: "Left (e.g. 100px)" },
        content: { type: "text", label: "Content or Image URL" },
        fontSize: { type: "text", label: "Font Size (e.g. 16px)" },
      }
    }
  },
  defaultProps: {
    bgColor: "#f9f9f9",
    height: "600px",
    width: "100%",
    children: []
  },
  render: ({ bgColor, height, width, children }) => {
    return (
      <div
        style={{
          position: "relative",
          backgroundColor: bgColor,
          height,
          width,
          padding: "20px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
        {children.map((child: any, i: number) => {
          const style: React.CSSProperties = {
            position: child.positionType === "absolute" ? "absolute" : "static",
            top: child.positionType === "absolute" ? child.top : undefined,
            left: child.positionType === "absolute" ? child.left : undefined,
            fontSize: child.fontSize || "16px",
            marginBottom: "12px",
          };
  
          const fallbackText = `Item #${i}`;
  
          switch (child.component) {
            case "heading":
              return (
                <h2 key={i} style={style}>
                  {child.content || fallbackText}
                </h2>
              );
            case "subtitle":
              return (
                <h4 key={i} style={style}>
                  {child.content || fallbackText}
                </h4>
              );
            case "image":
              return (
                <img
                  key={i}
                  src={child.content || "https://via.placeholder.com/150"}
                  alt=""
                  style={{ ...style, maxWidth: "100%", height: "auto" }}
                />
              );
            default:
              return (
                <div key={i} style={{ ...style, backgroundColor: "#eee", padding: "8px" }}>
                  Unknown or missing component in Item #{i}
                </div>
              );
          }
        })}
      </div>
    );
  }  
//   render: ({ bgColor, height, width, children }) => {
//     return (
//       <div
//         style={{
//           position: "relative",
//           backgroundColor: bgColor,
//           height,
//           width,
//           padding: "20px",
//           border: "1px solid #ccc",
//           boxSizing: "border-box",
//         }}
//       >
//         {children.map((child: any, i: number) => {
//           const style: React.CSSProperties = {
//             position: child.positionType === "absolute" ? "absolute" : "static",
//             top: child.positionType === "absolute" ? child.top : undefined,
//             left: child.positionType === "absolute" ? child.left : undefined,
//             fontSize: child.fontSize || "16px",
//             marginBottom: "12px",
//           };

//           switch (child.component) {
//             case "heading":
//               return (
//                 <h2 key={i} style={style}>
//                   {child.content}
//                 </h2>
//               );
//             case "subtitle":
//               return (
//                 <h4 key={i} style={style}>
//                   {child.content}
//                 </h4>
//               );
//             case "image":
//               return (
//                 <img
//                   key={i}
//                   src={child.content}
//                   alt=""
//                   style={{ ...style, maxWidth: "100%", height: "auto" }}
//                 />
//               );
//             default:
//               return null;
//           }
//         })}
//       </div>
//     );
//   },
};
