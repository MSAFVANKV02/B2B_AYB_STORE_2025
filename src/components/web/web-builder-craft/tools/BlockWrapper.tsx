import React from "react";
import { useNode } from "@craftjs/core";

const BlockWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
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
      className={`relative group   ${
        isSelected ? "border p-1 border-blue-500 rounded" : ""
      }`}
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
