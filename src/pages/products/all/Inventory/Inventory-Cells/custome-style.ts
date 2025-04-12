
// export const CustomStylesInventory: TableStyles = {
//     table: {
//         style: {
//             width: "100%",           // Ensure the table does not exceed its container
//             overflow: "hidden",      // Hide any content that overflows
//         },
//     },
//     pagination:{
//         style: {
//             marginTop: "10px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//         },
//     },
//     headCells: {
//         style: {
//             backgroundColor: "g",  // Dark gray background
//             color: "black",           // White text
//             fontSize: "14px",
//             fontWeight: "bold",
//             textTransform: "uppercase",
//             padding: "10px",
//             whiteSpace: "nowrap",       // Prevent text from wrapping and causing overflow
//         },
//     },
//     rows: {
//         style: {
//             fontSize: "14px",
//             backgroundColor: "#f9fafb", // Light gray background
//             color: "#374151",          // Dark gray text
//             // minHeight: "45px",
//             "&:hover": {
//                 backgroundColor: "#e5e7eb", // Hover effect
//             },
//         },
//     },
//     cells: {
//         style: {
//             // padding: "12px",
//             whiteSpace: "nowrap",       // Prevents text wrapping
//             overflow: "hidden",         // Ensures content doesn't overflow
//             textOverflow: "ellipsis",   // Adds "..." if text overflows
//             maxWidth: "200px",          // Adjust column width to prevent stretching
//         },
//     },
// };
import { TableStyles } from "react-data-table-component";

export const CustomStylesInventory: TableStyles = {
    table: {
      style: {
        width: "100%",
        overflowX: "auto", // Enable horizontal scrolling
      },
    },
    cells: {
      style: {
        whiteSpace: "nowrap", // Prevent cell text wrapping
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    headCells: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontWeight: "bold",
      },
    },
  };
  