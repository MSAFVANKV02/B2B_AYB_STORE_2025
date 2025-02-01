import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import AyButton from "../myUi/AyButton";
import { memo, useState } from "react";
import { useModal } from "@/providers/context/context";
import MyCloseIcon from "../icons/My_CloseIcon";
import AllUploadedFiles, {
  IFileDataMedia,
} from "@/pages/media/retrive/all_uploaded_files";

type Props = {
  setFieldValues?: (name: string, value: any) => void;
  fieldName?: string;
  multiple?: boolean;
  handleFileUpload?: (event: IFileDataMedia[], fieldName: string) => void;
  mediaType?: "pdf" | "image" | "videos" | "xl" | "";
};

function MediaFilesModal({
  fieldName,
  multiple,
  handleFileUpload,
  mediaType,
}: Props) {
  const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);
  const { setMediaOpenDrawer, mediaOpenDrawer } = useModal();

  const handleFileSelection = (src: IFileDataMedia[]) => {
    if (multiple) {
      const newSelectedFiles = src;
      setSelectedFiles(newSelectedFiles);
    } else {
      const [selectedFile] = src;
      setSelectedFiles([selectedFile]);
    }
  };

  const handleSelectFiles = () => {
    if (fieldName && handleFileUpload) {
      handleFileUpload(selectedFiles, fieldName);
      setMediaOpenDrawer(false);
    }
  };

  // console.log(fieldName, "fieldName in nowhere");

  return (
    <Drawer
      open={mediaOpenDrawer}
      onOpenChange={(open) => setMediaOpenDrawer(open)}
    >
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <div className="mx-auto w-full max-w-sm ">
        <DrawerContent className="z-[20001] mx-auto max-w-screen-xl w-full h-[85vh] max-h-[85vh] flex flex-col rounded-lg border bg-background p-4">
          <DrawerHeader className="flex-shrink-0">
            <DrawerTitle className="flex justify-end">
              <MyCloseIcon
                onClick={() => {
                  setMediaOpenDrawer(false);
                }}
              />
            </DrawerTitle>
          </DrawerHeader>

          {/* Content Scrollable */}
          <div className="flex-grow overflow-y-auto">
            <AllUploadedFiles
              onClick={(selectedFiles) => {
                // console.log(selectedFiles,'selectedFiles');
                // console.log(src,'src');

                handleFileSelection(selectedFiles);
              }}
              multiple={multiple}
              mediaType={mediaType}
            />
          </div>

          {/* Footer Stays Visible */}
          <DrawerFooter className="flex-shrink-0">
            <DrawerClose>
              <AyButton
                title="Select"
                type="button"
                onClick={handleSelectFiles}
              />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  );
}

export default memo(MediaFilesModal);
