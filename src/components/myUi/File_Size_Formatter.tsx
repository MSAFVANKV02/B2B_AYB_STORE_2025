import { cn } from "@/lib/utils";
import { memo } from "react";

type Props = {
  size: number;
  className?: string;
};

function FileSizeFormatter({ size , className}: Props) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(2)} MB`;
    return `${(bytes / 1073741824).toFixed(2)} GB`;
  };
  return <span className={cn(`text-sm text-gray-500`,className)}>{formatFileSize(size)}</span>;
}

export default memo(FileSizeFormatter);
