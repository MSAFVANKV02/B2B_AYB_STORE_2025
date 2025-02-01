// import AyButton from "@/components/myUi/AyButton";
// import MyPdf from "@/components/myUi/MyPdf";
// import { Calendar } from "@/components/ui/calendar";
// import PagesLayout, {
//   PageLayoutHeader,
//   PagesLayoutContent,
// } from "@/layouts/Pages_Layout";
// import { useEffect, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import useNavigateClicks from "@/hooks/useClicks";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchMediaDetails } from "@/redux/actions/mediaSlice";

// export interface IFileDataMedia {
//   id: number;
//   name: string;
//   format: string;
//   imageurl: string;
//   size: number;
//   width: number;
//   height: number;
//   uploadedAt: Date;
// }

// type Props = {
//   onClick?: (selectedFiles: IFileDataMedia[],imageurl:string[]) => void;
//   multiple?: boolean;
//   mediaType?: "pdf" | "image" | "";
// };

// export default function AllUploadedFiles({
//   onClick,
//   multiple,
//   mediaType,
// }: Props) {
//   const { handleClick } = useNavigateClicks();
//   const {media:files} = useAppSelector((state)=>state.media);
//   const dispatch = useAppDispatch();
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

//   console.log(files,'files');

//   // const files: IFileDataMedia[] = [
//   //   {
//   //     id: 1,
//   //     name: "image1.jpg",
//   //     imageurl: "/img/kyc/banner2.webp",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "image2.jpg",
//   //     imageurl: "/img/bg/bg-admin-transparent.png",
//   //     size: 1024,
//   //     height: 600,
//   //     width: 600,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "image3.jpg",
//   //     imageurl: "/img/products/Group 710.jpg",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "image4.jpg",
//   //     imageurl: "/Invoice_INV1482989614215502 (16).pdf",
//   //     size: 1024,
//   //     height: 300,
//   //     width: 300,
//   //     uploadedAt: new Date(),
//   //   },
//   // ];

//   useEffect(()=>{
//         dispatch(fetchMediaDetails())
//   },[])

//   // const filteredFiles = files.filter(
//   //   (file) => !date || file.uploadedAt.toDateString() === date.toDateString()
//   // );
//   const filteredFiles = files.filter(
//     (file) =>
//       !date ||
//       new Date(file.uploadedAt).toDateString() === date.toDateString()
//   );

//   const mediaFilteredFiles = filteredFiles.filter((file) =>
//     mediaType === "pdf"
//       ? file.format.includes("application")
//       : mediaType === "image"
//       ? !file.format.includes("image")
//       : true
//   );

//   // const handleFileClick = (file: IFileDataMedia) => {
//   //   if (multiple) {
//   //     setSelectedFiles((prev) =>
//   //       prev.find((f) => f.id === file.id)
//   //         ? prev.filter((f) => f.id !== file.id)
//   //         : [...prev, file]
//   //     );
//   //   } else {
//   //     setSelectedFiles((prev) => (prev[0]?.id === file.id ? [] : [file]));
//   //   }
//   //   onClick?.(
//   //     multiple ? selectedFiles : selectedFiles[0] ? [selectedFiles[0]] : []
//   //   );
//   // };
//   const handleFileClick = (file: IFileDataMedia) => {
//     let updatedFiles;
//     if (multiple) {
//       if (selectedFiles.some((selected) => selected.imageurl === file.imageurl)) {
//         updatedFiles = selectedFiles.filter((selected) => selected.imageurl !== file.imageurl);
//       } else {
//         updatedFiles = [...selectedFiles, file];
//       }
//     } else {
//       updatedFiles = selectedFiles[0]?.imageurl === file.imageurl ? [] : [file];
//     }
//     setSelectedFiles(updatedFiles);
//     onClick?.(
//       updatedFiles,
//       updatedFiles.map((file) => file.imageurl)
//     );
//   };

//   return (
//     <PagesLayout className="h-fit">
//       <PageLayoutHeader>
//         <h1>All Uploaded Files</h1>
//         <AyButton
//           title="Upload Media"
//           onClick={() => handleClick("/settings/media")}
//         />
//       </PageLayoutHeader>

//       <PagesLayoutContent className="space-y-10">
//         <Popover>
//           <PopoverTrigger>
//             <AyButton
//               icon="fluent-color:calendar-clock-20"
//               iconSize={23}
//               variant="outlined"
//               outLineColor="gray"
//               title="Filter With Date"
//               sx={{ width: "fit-content" }}
//             />
//           </PopoverTrigger>
//           <PopoverContent className="ml-36 z-[10005]">
//             <Calendar mode="single" selected={date} onSelect={setDate} />
//           </PopoverContent>
//         </Popover>

//         {mediaFilteredFiles.length === 0 ? (
//           <p className="text-center text-gray-500 font-semibold">
//             No files found for the selected date.
//           </p>
//         ) : (
//           <>
// {mediaType !== "image" && (
//   <h2 className="tex-lg uppercase font-bold underline text-textGray">
//     All Documents
//   </h2>
// )}
//             <ul className="grid xl:grid-cols-12 gap-3 md:grid-cols-8 sm:grid-cols-6 grid-cols-3">
//               {mediaFilteredFiles
//                 .filter((file) => file.format.includes("application"))
//                 .map((file) => (
//                   <li
//                     key={file.id}
//                     className={`aspect-square border cursor-pointer m-auto p-5 rounded-xl shadow-lg ${
//                       selectedFiles.find((f) => f.id === file.id)
//                         ? "border-blue-500"
//                         : ""
//                     }`}
//                     onClick={() => {
//                       if (onClick) {
//                         handleFileClick(file);
//                       }
//                     }}
//                   >
//                     <MyPdf value={file.imageurl} isPdfShown />
//                   </li>
//                 ))}
//             </ul>

//             {mediaType !== "pdf" && (
//               <h2 className="tex-lg uppercase font-bold underline text-textGray">
//                 All Images
//               </h2>
//             )}
//             <ul className="grid xl:grid-cols-6 gap-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-2">
//               {mediaFilteredFiles
//                 .filter((file) => !file.format.includes("image/"))
//                 .map((file) => (
//                   <li
//                     key={file.id}
//                     className={`aspect-square border cursor-pointer ${
//                       selectedFiles.find((f) => f.id === file.id)
//                         ? "border-blue-500"
//                         : ""
//                     }`}
//                     onClick={() => {
//                       if (onClick) {
//                         handleFileClick(file);
//                       }
//                     }}
//                   >
//                     <img
//                       src={file.imageurl}
//                       alt={file.name}
//                       className="w-full h-full object-cover"
// onClick={() =>
//   !onClick && window.open(file.imageurl, "_blank")
// }
//                     />
//                   </li>
//                 ))}
//             </ul>
//           </>
//         )}
//       </PagesLayoutContent>
//     </PagesLayout>
//   );
// }
import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Calendar } from "@/components/ui/calendar";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNavigateClicks from "@/hooks/useClicks";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchMediaDetails } from "@/redux/actions/mediaSlice";
import File_Size_Formatter from "@/components/myUi/File_Size_Formatter";

export interface IFileDataMedia {
  _id: number;
  name: string;
  format: string;
  imageurl: string;
  size: number;
  width: number;
  height: number;
  uploadedAt: Date;
}

type Props = {
  onClick?: (selectedFiles: IFileDataMedia[], imageurl: string[]) => void;
  multiple?: boolean;
  mediaType?: "pdf" | "image" | "videos" | "xl" | "";
};

export default function AllUploadedFiles({
  onClick,
  multiple,
  mediaType = "",
}: Props) {
  const { handleClick } = useNavigateClicks();
  const { media: files } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | undefined>();
  const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

  useEffect(() => {
    dispatch(fetchMediaDetails());
  }, []);

  // console.log(date);

  const filteredFiles = files.filter(
    (file) =>
      !date || new Date(file.uploadedAt).toDateString() === date.toDateString()
  );

  const categorizedFiles = {
    image: filteredFiles.filter((file) => file.format.startsWith("image/")),
    videos: filteredFiles.filter((file) => file.format.startsWith("video/")),
    pdf: filteredFiles.filter((file) => file.format === "application/pdf"),
    xl: filteredFiles.filter(
      (file) =>
        file.format === "application/vnd.ms-excel" ||
        file.format ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ),
    other: filteredFiles.filter(
      (file) =>
        !file.format.startsWith("image/") &&
        !file.format.startsWith("video/") &&
        file.format !== "application/pdf" &&
        file.format !== "application/vnd.ms-excel" &&
        file.format !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ),
  };

  const handleFileClick = (file: IFileDataMedia) => {
    let updatedFiles;
    if (multiple) {
      if (
        selectedFiles.some((selected) => selected.imageurl === file.imageurl)
      ) {
        updatedFiles = selectedFiles.filter(
          (selected) => selected.imageurl !== file.imageurl
        );
      } else {
        updatedFiles = [...selectedFiles, file];
      }
    } else {
      updatedFiles = selectedFiles[0]?.imageurl === file.imageurl ? [] : [file];
    }
    setSelectedFiles(updatedFiles);
    onClick?.(
      updatedFiles,
      updatedFiles.map((file) => file.imageurl)
    );
  };

  return (
    <PagesLayout className="h-fit">
      <PageLayoutHeader>
        <h1>All Uploaded Files</h1>
        <AyButton
          title="Upload Media"
          onClick={() => handleClick("/settings/media")}
        />
      </PageLayoutHeader>

      <PagesLayoutContent className="space-y-10">
        <Popover>
          <PopoverTrigger>
            <AyButton
              icon="fluent-color:calendar-clock-20"
              iconSize={23}
              variant="outlined"
              outLineColor="gray"
              title="Filter With Date"
              sx={{ width: "fit-content" }}
            />
          </PopoverTrigger>
          <PopoverContent className="ml-36 z-[10006]">
            <Calendar mode="single" selected={date} onSelect={setDate} className="z-[10006]" />
          </PopoverContent>
        </Popover>

        {filteredFiles.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold ">
            No files found for the selected date.
          </p>
        ) : (
          Object.entries(categorizedFiles).map(([type, files], index) =>
            mediaType === "" || mediaType === type
              ? files.length > 0 && (
                  <div key={`${index}-${files}`}>
                    {/* {index} */}
                    <h2 className="tex-lg uppercase font-bold underline text-textGray mb-3">
                      All {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h2>
                    <ul className="grid xl:grid-cols-7 gap-3 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
                      {files.map((file) => (
                        <li
                          key={file._id}
                          className={`aspect-square relative flex-col max-w-[200px] flex justify-center items-center border cursor-pointer ${
                            selectedFiles.find((f) => f._id === file._id)
                              ? "border-blue-500"
                              : ""
                          }`}
                          // className="border cursor-pointer p-5 rounded-xl shadow-lg"
                          onClick={() => {
                            if (onClick) {
                              handleFileClick(file);
                            }
                          }}
                        >
                          {/* {JSON.stringify(file)} */}
                          {/* {file.imageurl} sdas */}
                          {type === "image" ? (
                            <img
                              src={file.imageurl}
                              onClick={() =>
                                !onClick && window.open(file.imageurl, "_blank")
                              }
                              alt={file.name}
                              className="w-full h-full object-contain"
                            />
                          ) : type === "videos" ? (
                            <video
                              src={file.imageurl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          ) : type === "pdf" ? (
                            <MyPdf value={file.imageurl} isPdfShown />
                          ) : (
                            <span className="block text-center font-semibold">
                              {file.name}
                            </span>
                          )}
                          {selectedFiles.length > 0 &&
                            selectedFiles.map(
                              (select) =>
                                select._id === file._id && (
                                  <span
                                    key={select._id}
                                    className=" absolute bg-black/10 flex items-center justify-center 
                                    flex-col backdrop-blur-sm top-0 left-0 w-full h-full text-white text-center text-xs"
                                  >
                                    <File_Size_Formatter
                                      size={select.size}
                                      className="text-xs text-white"
                                    />
                                    <span>
                                      {select.width} x {select.height}
                                    </span>
                                    {/* {select.size} */}
                                  </span>
                                )
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              : null
          )
        )}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
