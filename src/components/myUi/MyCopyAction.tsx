import { makeToast } from "@/utils/toaster";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type Props = {
  isCopy: string;
  message: string;
  title: string;
  enabled: boolean;
};

export default function MyCopyAction({
  isCopy,
  message,
  title,
  enabled,
}: Props) {
    const [copied,setCopied] = useState(false);
  const handleCopyPassword = () => {
    if (isCopy) {
      navigator.clipboard.writeText(isCopy);
      setCopied(true);
      makeToast(`${message}`);
    }
  };
  return (
    <>
      {enabled && (
        <div className="min-h-8 p-1 w-full bg-green-200 text-green-700 shadow-sm rounded-md text-sm border border-green-700 flex items-center justify-center">
          {title} {isCopy}
         <div className="p-1 shadow-md cursor-pointer border flex items-center justify-center ms-5 rounded-sm bg-gray-200">
         <Icon icon={`${copied ?"charm:tick-double":"solar:copy-bold"}`} onClick={handleCopyPassword}
          className={`cursor-pointer ${copied ?"text-blue-700":"text-black"} `}
          />
         </div>
        </div>
      )}
    </>
  );
}
