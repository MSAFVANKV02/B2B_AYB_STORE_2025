import React from "react";
import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

type Props = {
children: React.ReactNode
className?:string
style?: React.CSSProperties
}

const BlockWrapper:React.FC<Props> = ({
  children,
  className, style
}) => {
  const {
    connectors: { connect, drag },
    // id,
    isSelected,
  } = useNode((node) => ({
    isSelected: node.events.selected,
  }));

  // const { actions } = useEditor();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={cn(`relative group   ${
        isSelected ? "border border-blue-500 overflow-visible h-auto rounded" : ""
      }`,className)}
      style={style}
    >
      {/* {isSelected && (
        <button
          onClick={() => actions.delete(id)}
          className="absolute top-0 right-0 text-xs z-10 dark:bg-neutral-400/20 bg-neutral-400 text-white h-4 w-4 flex items-center justify-center rounded-full hover:bg-red-700"
        >
          &times;
        </button>
      )} */}
      {children}
    </div>
  );
};

export default BlockWrapper;
