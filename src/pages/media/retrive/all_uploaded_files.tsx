import AyButton from "@/components/myUi/AyButton";
import MyPdf from "@/components/myUi/MyPdf";
import { Calendar } from "@/components/ui/calendar";
import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useNavigateClicks from "@/hooks/useClicks";

export interface IFileDataMedia {
  id: number;
  name: string;
  src: string;
  size: number;
  width: number;
  height: number;
  createdAt: Date;
}

type Props = {
  onClick?: (selectedFiles: IFileDataMedia[],src:string[]) => void;
  multiple?: boolean;
  mediaType?: "pdf" | "image" | "";
};

export default function AllUploadedFiles({
  onClick,
  multiple,
  mediaType,
}: Props) {
  const { handleClick } = useNavigateClicks();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);

  const files: IFileDataMedia[] = [
    {
      id: 1,
      name: "image1.jpg",
      src: "/img/kyc/banner2.webp",
      size: 1024,
      height: 300,
      width: 300,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "image2.jpg",
      src: "/img/bg/bg-admin-transparent.png",
      size: 1024,
      height: 600,
      width: 600,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "image3.jpg",
      src: "/img/products/Group 710.jpg",
      size: 1024,
      height: 300,
      width: 300,
      createdAt: new Date(),
    },
    {
      id: 4,
      name: "image4.jpg",
      src: "/Invoice_INV1482989614215502 (16).pdf",
      size: 1024,
      height: 300,
      width: 300,
      createdAt: new Date(),
    },
  ];

  const filteredFiles = files.filter(
    (file) => !date || file.createdAt.toDateString() === date.toDateString()
  );
  const mediaFilteredFiles = filteredFiles.filter((file) =>
    mediaType === "pdf"
      ? file.src.endsWith(".pdf")
      : mediaType === "image"
      ? !file.src.endsWith(".pdf")
      : true
  );

  // const handleFileClick = (file: IFileDataMedia) => {
  //   if (multiple) {
  //     setSelectedFiles((prev) =>
  //       prev.find((f) => f.id === file.id)
  //         ? prev.filter((f) => f.id !== file.id)
  //         : [...prev, file]
  //     );
  //   } else {
  //     setSelectedFiles((prev) => (prev[0]?.id === file.id ? [] : [file]));
  //   }
  //   onClick?.(
  //     multiple ? selectedFiles : selectedFiles[0] ? [selectedFiles[0]] : []
  //   );
  // };
  const handleFileClick = (file: IFileDataMedia) => {
    let updatedFiles;
    if (multiple) {
      if (selectedFiles.some((selected) => selected.src === file.src)) {
        updatedFiles = selectedFiles.filter((selected) => selected.src !== file.src);
      } else {
        updatedFiles = [...selectedFiles, file];
      }
    } else {
      updatedFiles = selectedFiles[0]?.src === file.src ? [] : [file];
    }
    setSelectedFiles(updatedFiles);
    onClick?.(
      updatedFiles,
      updatedFiles.map((file) => file.src)
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
          <PopoverContent className="ml-36 z-[10005]">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>

        {mediaFilteredFiles.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">
            No files found for the selected date.
          </p>
        ) : (
          <>
            {mediaType !== "image" && (
              <h2 className="tex-lg uppercase font-bold underline text-textGray">
                All Documents
              </h2>
            )}
            <ul className="grid xl:grid-cols-12 gap-3 md:grid-cols-8 sm:grid-cols-6 grid-cols-3">
              {mediaFilteredFiles
                .filter((file) => file.src.endsWith(".pdf"))
                .map((file) => (
                  <li
                    key={file.id}
                    className={`aspect-square border cursor-pointer m-auto p-5 rounded-xl shadow-lg ${
                      selectedFiles.find((f) => f.id === file.id)
                        ? "border-blue-500"
                        : ""
                    }`}
                    onClick={() => {
                      if (onClick) {
                        handleFileClick(file);
                      }
                    }}
                  >
                    <MyPdf value={file.src} isPdfShown />
                  </li>
                ))}
            </ul>

            {mediaType !== "pdf" && (
              <h2 className="tex-lg uppercase font-bold underline text-textGray">
                All Images
              </h2>
            )}
            <ul className="grid xl:grid-cols-6 gap-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-2">
              {mediaFilteredFiles
                .filter((file) => !file.src.endsWith(".pdf"))
                .map((file) => (
                  <li
                    key={file.id}
                    className={`aspect-square border cursor-pointer ${
                      selectedFiles.find((f) => f.id === file.id)
                        ? "border-blue-500"
                        : ""
                    }`}
                    onClick={() => {
                      if (onClick) {
                        handleFileClick(file);
                      }
                    }}
                  >
                    <img
                      src={file.src}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onClick={() =>
                        !onClick && window.open(file.src, "_blank")
                      }
                    />
                  </li>
                ))}
            </ul>
          </>
        )}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
