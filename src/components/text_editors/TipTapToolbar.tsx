// ===========
"use client";
import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Link2,
  Palette,
  BaselineIcon,
  ImagePlus,
} from "lucide-react";
import ColorPalette from "./ColorPalette";

type Props = {
  editor: Editor | null;
};

export default function TipTapToolbar({ editor }: Props) {
  const [showTextColorPalette, setShowTextColorPalette] = useState(false);
  const [showBgColorPalette, setShowBgColorPalette] = useState(false);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // =================================================================
  const setImage = () => {
    const url = window.prompt("Enter Image URL");

    if (!url) return;

    const stylesInput = window.prompt(
      "Enter styles (comma separated): width,height,marginTop,marginBottom,marginLeft,marginRight\n\n" +
        "Example: 300px,auto,10px,10px,0,0 OR 100%,100%,10px,20px,5px,5px"
    );
    // let width = "300px",
    let width = "auto",
      height = "auto",
      marginTop = "0px",
      marginBottom = "0px",
      marginLeft = "0px",
      marginRight = "0px";

    if (stylesInput) {
      const [w, h, mt, mb, ml, mr] = stylesInput.split(",");

      width = w?.trim() || width;
      height = h?.trim() || height;
      marginTop = mt?.trim() || marginTop;
      marginBottom = mb?.trim() || marginBottom;
      marginLeft = ml?.trim() || marginLeft;
      marginRight = mr?.trim() || marginRight;
    }

    // Ensure "auto" is left as is, while others add "px" if needed
    const addUnit = (value: string) =>
      value === "auto" || value.includes("%") || value.includes("px")
        ? value
        : `${value}px`;

    const imageAttributes = {
      src: url,
      style: `
        width: ${addUnit(width)};
        height: ${addUnit(height)};
        margin-top: ${addUnit(marginTop)};
        margin-bottom: ${addUnit(marginBottom)};
        margin-left: ${addUnit(marginLeft)};
        margin-right: ${addUnit(marginRight)};
      `,
    };

    editor
      .chain()
      .focus()
      .setImage(imageAttributes as any)
      .run();
  };

  const toggleTextColorPalette = () => {
    setShowTextColorPalette(!showTextColorPalette);
  };

  const toggleBgColorPalette = () => {
    setShowBgColorPalette(!showBgColorPalette);
  };

  const applyTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setShowTextColorPalette(false);
  };

  const applyBgColor = (color: any) => {
    editor.chain().focus().toggleHighlight({ color: color }).run();
    setShowBgColorPalette(false);
  };

  return (
    <div className="border rounded-t-md bg-[#F3F3F3] border-input p-2 flex flex-wrap relative">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className="p-2"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="p-2"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="p-2"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className="p-2"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="p-2"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className="p-2"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={setLink}
        className="p-2"
      >
        <Link2 className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" onPressedChange={setImage} className="p-2">
        <ImagePlus className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={toggleTextColorPalette}
        className="p-2"
      >
        <BaselineIcon className="h-4 w-4" />
      </Toggle>
      {showTextColorPalette && (
        <div className="absolute top-10 left-0 bg-white border p-2 z-10">
          <ColorPalette onSelectColor={applyTextColor} />
        </div>
      )}
      <Toggle size="sm" onPressedChange={toggleBgColorPalette} className="p-2">
        <Palette className="h-4 w-4" style={{ background: "#ffff00" }} />
      </Toggle>
      {showBgColorPalette && (
        <div className="absolute top-10 left-20 bg-white border p-2 z-10">
          <ColorPalette onSelectColor={applyBgColor} />
        </div>
      )}
    </div>
  );
}
