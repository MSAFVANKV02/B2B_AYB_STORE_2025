// // import { Button, SxProps, Theme } from "@mui/material";
// // import { Icon } from "@iconify/react/dist/iconify.js";
// // import "@/assets/css/preloader.css";

// // type Props = {
// //   onClick?: () => void; // Function to call when the button is clicked
// //   title: string; // The title of the button
// //   sx?: SxProps<Theme>; // Allow overriding styles
// //   variant?: "contained" | "outlined" | "cancel" |"delete"; // Add variants
// //   outLineColor?: string;
// //   icon?: string; //
// //   iconSize?: number; // Font size for the icon
// //   type?: "submit" | "reset" | "button";
// //   loading?: boolean;
// //   disabled?: boolean; // Whether the button is disabled or not
// //   children?: React.ReactNode; 
// //   // onclickEvent?: (route:string)=>void; // Event handler for onClick event
// // };

// // export default function AyButton({
// //   onClick,
// //   title,
// //   sx,
// //   variant = "contained", // Default variant is "contained"
// //   outLineColor,
// //   icon,
// //   iconSize,
// //   type = "button",
// //   loading,
// //   disabled = false,
// //   children
// // }: Props) {
// //   return (
// //     <Button
// //       onClick={onClick}
// //       type={type}
// //       disabled={disabled}
// //       sx={{
// //         ...(variant === "contained"
// //           ? {
// //               bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)", // Default background color
// //               color: disabled ? "#a0a0a0" : "#fff",// Default text color for contrast
// //               "&:hover": {
// //                 bgcolor: disabled ? "#d3d3d3" : "var(--primaryVariant)", // No hover effect when disabled
// //               },
// //               textTransform: "capitalize",
// //             }
// //           : variant === "outlined"
// //           ? {
// //               border: `1px solid ${outLineColor}`, // Border for "outlined"
// //               color: disabled
// //               ? "#a0a0a0"
// //               : `${outLineColor ? "black" : " var(--mainColor)"}`,  // Text color for "outlined"
// //               bgcolor: "transparent", // Transparent background
// //               "&:hover": {
// //                 bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
// //               },
// //             }
// //           :  variant === "cancel" ?{
// //               border: `1px solid ${outLineColor}`, // Border for "outlined"
// //               color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
// //               bgcolor: disabled ? "#d3d3d3" : "black",  // Transparent background
// //               "&:hover": {
// //                 bgcolor: "rgba(34, 32, 32, 0.9)", // Subtle hover background
// //               },
// //             }:{
// //               border: `1px solid ${outLineColor}`, // Border for "outlined"
// //               color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
// //               bgcolor: disabled ? "#d3d3d3" : "red",  // Transparent background
// //               "&:hover": {
// //                 bgcolor: "rgba(201, 32, 32, 0.9)", // Subtle hover background
// //               },
// //             }
          
// //           ),
// //         textTransform: "capitalize", // Avoid uppercase text
// //         width: "150px",
// //         ...sx, // Allow overriding styles via `sx` prop
// //       }}
// //     >
// //       {!disabled && loading ? (
// //         <div className="flex items-center">
// //           <span className="loader mr-2 text-white font-semibold space-x-1 ">
// //             Processing
// //             <span className="ms-1">.</span>
// //             <span>.</span>
// //             <span>.</span>
// //           </span>
// //           {/* Replace with your spinner */}
// //         </div>
// //       ) : (
// //         <>
// //           <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
// //         </>
// //       )}
// //       {children}
// //       {/* <Icon icon={`${icon}`} fontSize={iconSize} /> {title} */}
// //     </Button>
// //   );
// // }
// // =========
// // after motion ////////=========================================

// import { Button, SxProps, Theme } from "@mui/material";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import "@/assets/css/preloader.css";
// import { motion } from "framer-motion";


// type Props = {
//   onClick?: () => void; // Function to call when the button is clicked
//   title?: string; // The title of the button
//   sx?: SxProps<Theme>; // Allow overriding styles
//   variant?: "contained" | "outlined" | "cancel" |"delete" |"gray"; // Add variants
//   outLineColor?: string;
//   icon?: string; //
//   iconSize?: number; // Font size for the icon
//   type?: "submit" | "reset" | "button";
//   loading?: boolean;
//   disabled?: boolean; 
//   show?: boolean; 
//   children?: React.ReactNode; 
//   className?:string
// };

// export default function AyButton({
//   onClick,
//   title,
//   sx,
//   variant = "contained", // Default variant is "contained"
//   outLineColor,
//   icon,
//   iconSize,
//   type = "button",
//   loading,
//   disabled = false,
//   show = true, 
//   children,
//   className
// }: Props) {
//   return (
//    <>
//    {
//     show && (
//       <motion.div
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       className={className}
//     >
//  <Button
//       onClick={()=>{
//         if(onClick && !disabled){
//           onClick();
//         }
//       }}
//       type={type}
//       disabled={disabled}
//       sx={{
//         ...(variant === "contained"
//           ? {
//               bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)", // Default background color
//               color: disabled ? "#a0a0a0" : "#fff",// Default text color for contrast
//               "&:hover": {
//                 bgcolor: disabled ? "#d3d3d3" : "var(--primaryVariant)", // No hover effect when disabled
//               },
//               textTransform: "capitalize",
//             }
//           : variant === "outlined"
//           ? {
//               border: `1px solid ${outLineColor}`, // Border for "outlined"
//               color: disabled
//               ? "#a0a0a0"
//               : `${outLineColor ? "black" : " var(--mainColor)"}`,  // Text color for "outlined"
//               bgcolor: "transparent", // Transparent background
//               "&:hover": {
//                 bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
//               },
//             }
//           :  variant === "cancel" ?{
//               border: `1px solid ${outLineColor}`, // Border for "outlined"
//               color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//               bgcolor: disabled ? "#d3d3d3" : "black",  // Transparent background
//               "&:hover": {
//                 bgcolor: "rgba(34, 32, 32, 0.9)", // Subtle hover background
//               },
//             } : variant === "gray"  ? {
//               border: `1px solid ${outLineColor}`, // Border for "outlined"
//               color: disabled ? "#a0a0a0" : "#575757",  // Text color for "outlined"
//               bgcolor: disabled ? "#d3d3d3" : "#E5E5E5",  // Transparent background
//               "&:hover": {
//                 bgcolor: "#DCDCDC", // Subtle hover background
//               },
//             } :{
//               border: `1px solid ${outLineColor}`, // Border for "outlined"
//               color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//               bgcolor: disabled ? "#d3d3d3" : "red",  // Transparent background
//               "&:hover": {
//                 bgcolor: "rgba(201, 32, 32, 0.9)", // Subtle hover background
//               },
//             }
          
//           ),
//         textTransform: "capitalize", // Avoid uppercase text
//         width: "150px",
//         ...sx, // Allow overriding styles via `sx` prop
//       }}
//     >
//       {!disabled && loading ? (
//         <div className="flex items-center">
//           <span className="loader mr-2 text-white font-semibold space-x-1 ">
//             Processing
//             <span className="ms-1">.</span>
//             <span>.</span>
//             <span>.</span>
//           </span>
//           {/* Replace with your spinner */}
//         </div>
//       ) : (
//         <>
//           <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
//         </>
//       )}
//       {children}
//       {/* <Icon icon={`${icon}`} fontSize={iconSize} /> {title} */}
//     </Button>
//     </motion.div>
    
//     )
//    }
//    </>
//   );
// }
