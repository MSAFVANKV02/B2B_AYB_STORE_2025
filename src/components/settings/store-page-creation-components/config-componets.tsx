
import { Config } from "@measured/puck"
import { template1 } from "./templates/template_1/templates_1";
import { template2 } from "./templates/template_2/template_2";
import { template3 } from "./templates/template_3/template_3";




export const templateConfigs: Record<string, Config> = {
  template1,
  template2,
  template3,
};

// export const config: Config = {
//     components: {
//       HeroSplit: {
//         label: "Hero Split Template",
//         fields: {
//           image: {
//             type: "custom",
//             label: "Image URL",
//             render: ({ value, onChange }) => (
//               <input
//                 type="text"
//                 placeholder="Enter image URL"
//                 value={value || ""}
//                 onChange={(e) => onChange(e.target.value)}
//               />
//             ),
//           },
//           title: { type: "text", label: "Title" },
//           description: { type: "textarea", label: "Description" },
//           buttonText: { type: "text", label: "Button Text" },
//         },
//         defaultProps: {
//           image: "",
//           title: "Default Title",
//           description: "Default description.",
//           buttonText: "Click Here",
//         },
//         render: ({ image, title, description, buttonText }) => (
//           <div style={{ display: "flex", gap: "1rem" }}>
//             <img src={image} alt="" style={{ width: "50%" }} />
//             <div>
//               <h2>{title}</h2>
//               <p>{description}</p>
//               <button>{buttonText}</button>
//             </div>
//           </div>
//         ),
//       },
  
//       FullWidthBanner: {
//         label: "Full Width Banner",
//         fields: {
//           image: {
//             type: "custom",
//             label: "Banner Image URL",
//             render: ({ value, onChange }) => (
//               <input
//                 type="text"
//                 placeholder="Banner image URL"
//                 value={value || ""}
//                 onChange={(e) => onChange(e.target.value)}
//               />
//             ),
//           },
//           heading: { type: "text", label: "Heading" },
//         },
//         defaultProps: {
//           image: "",
//           heading: "Banner Heading",
//         },
//         render: ({ image, heading }) => (
//           <div style={{ backgroundImage: `url(${image})`, padding: "4rem", backgroundSize: "cover" }}>
//             <h2 style={{ color: "white" }}>{heading}</h2>
//           </div>
//         ),
//       },
  
//       DoubleImage: {
//         label: "Double Image Section",
//         fields: {
//           leftImage: {
//             type: "custom",
//             label: "Left Image URL",
//             render: ({ value, onChange }) => (
//               <input
//                 type="text"
//                 placeholder="Left image URL"
//                 value={value || ""}
//                 onChange={(e) => onChange(e.target.value)}
//               />
//             ),
//           },
//           rightImage: {
//             type: "custom",
//             label: "Right Image URL",
//             render: ({ value, onChange }) => (
//               <input
//                 type="text"
//                 placeholder="Right image URL"
//                 value={value || ""}
//                 onChange={(e) => onChange(e.target.value)}
//               />
//             ),
//           },
//         },
//         defaultProps: {
//           leftImage: "",
//           rightImage: "",
//         },
//         render: ({ leftImage, rightImage }) => (
//           <div style={{ display: "flex", gap: "1rem" }}>
//             <img src={leftImage} alt="" style={{ width: "50%" }} />
//             <img src={rightImage} alt="" style={{ width: "50%" }} />
//           </div>
//         ),
//       },
//     },
//   };
  