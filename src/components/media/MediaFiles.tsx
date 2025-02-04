// import { cn } from "@/lib/utils";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Media_Files_Modal from "./Media_Files_Modal";
// import { useModal } from "@/providers/context/context";

// type Props = {
//   className?: string;
//   title?: string;
//   fieldName?: string;
//   classnamewrapper?: string; // Additional class for the field
//   img?: string;
//   selectedData?: any;
//   setFieldValues?: (name: string , value:any) => void;
//   multiple?: boolean; 
//   handleFileUpload: (
//     event: string[],
//     fieldName: string
//   ) => void;
//   mediaType?: "pdf" | "image" ;
//   isModalOpen?: boolean;
//   onClick?: () => void;
// };

// export default function MediaFiles({
//   className,
//   img,
//   selectedData,
// fieldName,
// handleFileUpload,
//   title,
//   mediaType,
//   multiple,
 
// }: Props) {
//   const { openMediaDrawer} = useModal();

//     // console.log(setFieldValues,'setFieldValues');
    
//   return (
//     <div className={cn("flex lg:items-center justify-between gap-3 lg:flex-row flex-col ",className)}>
//       {
//         title && (
//           <div className="text-textGray font-bold text-xs mt-2">
//             {title}
//           </div>
//         )
//       }
//         <div
//       className={cn(
//         `w-3/4 border h-12 rounded-md flex items-center cursor-pointer overflow-hidden`
        
//       )}
//       onClick={openMediaDrawer}
//     >
//       <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
//         {img ? <Icon icon={img} fontSize={25} color="#7A7A7A" /> : "Browse"}
//       </div>
//       <div className="flex-1 h-full flex items-center text-xs px-3 overflow-hidden">
//         {/* Ensure the container has restricted width */}
//         <span className="truncate w-full font-bold">
//           {selectedData ? selectedData : "Choose File"}
//         </span>
//       </div>
//     </div>

//     <Media_Files_Modal

//         handleFileUpload={handleFileUpload}
//         fieldName={fieldName}
//         multiple={multiple} 
//         mediaType={mediaType}
//       />
  
//     </div>

//   );
// }
