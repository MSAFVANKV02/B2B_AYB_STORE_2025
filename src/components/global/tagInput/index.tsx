import AyButton from "@/components/myUi/AyButton";
import { cn } from "@/lib/utils";
import { makeToastWarning } from "@/utils/toaster";
import { X } from "lucide-react";
import { useState, useCallback, memo } from "react";


interface TagProps {
  text: string;
  onDelete: (tag: string) => void;
}

const Tag = memo(({ text, onDelete }: TagProps) => (
  <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors">
    <span className="max-w-[150px] truncate">{text}</span>
    <button
      onClick={() => onDelete(text)}
      className="hover:bg-blue-300 rounded-full p-1 transition-colors"
      aria-label={`Remove tag ${text}`}
    >
      <X className="w-3 h-3" />
    </button>
  </div>
));

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  maxTags?: number;
  className?: string;
}

const TagInput = ({ tags, setTags, maxTags = 100, className }: TagInputProps) => {
  const [input, setInput] = useState("");

  const handleAddTag = useCallback(() => {
    const trimmedTag = input.trim();
    if (tags.includes(trimmedTag)) {
        makeToastWarning("Tag already exists!");
        return;
      }
    if (!trimmedTag || tags.includes(trimmedTag) || tags.length >= maxTags) return;
    setTags([...tags, trimmedTag]);
    setInput("");
  }, [input, tags, setTags, maxTags]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
      if (e.key === "Backspace" && !input && tags.length > 0) {
        setTags(tags.slice(0, -1));
      }
    },
    [input, tags, handleAddTag, setTags]
  );

  const handleDeleteTag = useCallback(
    (tagToDelete: string) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    },
    [tags, setTags]
  );

  return (
    <div className={cn('lg:w-3/4',className)}>
      <div className="border  px-2 pt-2 rounded-md focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} onDelete={handleDeleteTag} />
          ))}
        </div>
        <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (Press Enter to add)"
          className="w-full focus:outline-none text-sm  p-3"
          aria-label="Tag input"
        />
        <AyButton 
        title="Add"
         onClick={handleAddTag}
         sx={{
            maxWidth:"90px",
            display: {
                xs: "block",  // Hides button on extra small screens
                lg: "none", // Shows button on small and larger screens
              }
         }}
        />
        </div>
  
      </div>
  
      <div className="mt-2 text-sm text-gray-500">{tags.length}/{maxTags} tags</div>
    </div>
  );
};

export default TagInput;
