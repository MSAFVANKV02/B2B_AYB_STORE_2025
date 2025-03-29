// import { cn } from "@/lib/utils";
// import { memo } from "react";
// import { Label } from "../ui/label";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useModal } from "@/providers/context/context";
// import Media_Files_Modal from "../media/Media_Files_Modal";
// import { IMediaDataType } from "@/types/types";
// import { IFileDataMedia } from "@/pages/media/retrive/all_uploaded_files";
// import { ErrorMessage } from "formik";

// type Props = {
//   className?: string;
//   className2?: string;
//   onClick?: () => void;
//   title: string;
//   icon?: string;
//   fontSize?: number;
//   IColor?: string; // Icon color for disabled state
//   name: string;
//   mediaType?: IMediaDataType;
//   handleFileChange?: (event: IFileDataMedia[], fieldName: string) => void;
// };

// const OpenMediaDrawer = ({
//   className,
//   title,
//   icon,
//   fontSize,
//   className2,
//   IColor = "#7A7A7A",
//   onClick,
//   name,
//   mediaType,
//   handleFileChange,
// }: Props) => {
//   const { openMediaDrawer, openDrawerFieldName, setDrawerFieldName } =
//     useModal();

//   return (
//     <>
//       {/* {openDrawerFieldName} */}
//       <div className={cn("flex flex-col  justify-between w-full", className)}>
//         {title && (
//           <Label className="text-xs text-textGray font-semibold ">
//             {title}
//           </Label>
//         )}

//         <div
//           className={cn(
//             `w-full border flex h-12 rounded-md cursor-pointer items-center s text-xs`,
//             className2
//           )}
//           onClick={() => {
//             if (onClick) {
//               onClick();
//               openMediaDrawer();
//             } else {
//               setDrawerFieldName(name);
//               openMediaDrawer();
//             }
//           }}
//         >
//           <div className="border-r h-full px-5 flex items-center bg-gray-100">
//             {icon ? (
//               <Icon icon={icon} fontSize={fontSize} color={IColor} />
//             ) : (
//               "Browse"
//             )}
//           </div>
//           <div className="px-5 font-semibold">Upload</div>
//         </div>

//         <ErrorMessage
//           component="span"
//           name={name}
//           className="text-red-500 text-xs"
//         />
//       </div>{" "}
//       {name === openDrawerFieldName && (
//         <Media_Files_Modal
//           fieldName={name}
//           mediaType={mediaType}
//           handleFileUpload={(event, fieldName) => {
//             handleFileChange?.(event, fieldName);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default memo(OpenMediaDrawer);
import { cn } from "@/lib/utils";
import { memo } from "react";
import { Label } from "../ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useModal } from "@/providers/context/context";
import Media_Files_Modal from "../media/Media_Files_Modal";
import { IMediaDataType } from "@/types/types";
import { ErrorMessage } from "formik";
import MyDeleteIcon from "../icons/My_DeleteIcon";
import { IFileDataMedia, IFIlesCategory } from "@/pages/media/retrive/all_uploaded_files";

type Props = {
  className?: string;
  className2?: string;
  onClick?: () => void;
  onDelete?: () => void;
  subTitle?: string
  values?: any;
  title: string;
  icon?: string;
  fontSize?: number;
  IColor?: string; // Icon color for disabled state
  name: string;
  mediaType?: IMediaDataType;
  multiple?: boolean;
  handleFileChange?: (event: IFileDataMedia[], fieldName: string) => void;
  category?: IFIlesCategory;
  showImage?: boolean;
};

const OpenMediaDrawer = ({
  className,
  title,
  icon,
  fontSize,
  className2,
  IColor = "#7A7A7A",
  onClick,
  name,
  mediaType,
  handleFileChange,
  multiple,
  values,
  onDelete,
  subTitle="Upload",
  category,
  showImage
}: Props) => {
  const { openMediaDrawer, openDrawerFieldName, setDrawerFieldName } =
    useModal();

  return (
    <>
      {/* {openDrawerFieldName} */}
      <div className={cn("flex flex-col  justify-between w-full", className)}>
        {title && (
          <Label className="text-xs text-textGray font-semibold ">
            {title}
          </Label>
        )}
        <div className={cn(`w-full flex flex-col gap-2`, className2)}>
          <div
            className={cn(
              `w-full border flex h-12 rounded-md cursor-pointer items-center s text-xs`
            )}
            onClick={() => {
              if (onClick) {
                onClick();
                openMediaDrawer();
              } else {
                setDrawerFieldName(name);
                openMediaDrawer();
              }
            }}
          >
            <div className="border-r h-full px-5 flex items-center bg-gray-100">
              {icon ? (
                <Icon icon={icon} fontSize={fontSize} color={IColor} />
              ) : (
                "Browse"
              )}
            </div>
            <div className="px-5 font-semibold">{subTitle}</div>
          </div>

          <ErrorMessage
            component="span"
            name={name}
            className="text-red-500 text-xs"
          />

          { mediaType === "image" && values && values[name] && (
            <div className="relative w-16 h-16 overflow-hidden">
              <img
                src={values[name]}
                alt="cover image"
                className="rounded-sm object-cover w-full h-full"
              />

              {/* Improved Delete Button */}
              <div
                className="absolute top-0 right-0 "
               
              >
                <MyDeleteIcon 
                 onClick={() => {
                  if (onDelete) {
                    onDelete();
                  }
                }}
                />
                Delete
              </div>
            </div>
          )}
        </div>
      </div>{" "}
      {showImage && name === openDrawerFieldName && (
        <Media_Files_Modal
          multiple={multiple}
          category={category}
          fieldName={name}
          mediaType={mediaType}
          handleFileUpload={(event, fieldName) => {
            handleFileChange?.(event, fieldName);
          }}
        />
      )}
    </>
  );
};

export default memo(OpenMediaDrawer);
