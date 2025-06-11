import { useState } from "react";

export default function CopyTextContainer({
  id,
  copyTitle = "ID Copied!",
}: {
  id: string;
  copyTitle?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!copied) {
        await navigator.clipboard.writeText(id);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer text-sm  hover:underline"
    >
      {copied ? copyTitle : id}
    </div>
  );
}
