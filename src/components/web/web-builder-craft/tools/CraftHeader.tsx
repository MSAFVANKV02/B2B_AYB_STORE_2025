import  { useState } from "react";
import { useEditor } from "@craftjs/core";
import { makeToast } from "@/utils/toaster";

const CraftBuilderHeader = () => {
  const [title, setTitle] = useState("Untitled Page");

  const { actions, query } = useEditor(); // ✅ no selector function here

  const canUndo = query.history.canUndo();
  const canRedo = query.history.canRedo();

  const handlePublish = () => {
    const json = query.serialize();
    console.log("📝 Page Title:", title);
    console.log("📦 Serialized JSON:", json);
    makeToast("✅ Page saved! Check the console.");
  };

  return (
    <div className="  px-4 py-2 border-b flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Untitled Page"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg px-3 py-1 border rounded w-64"
        />

        <button
          onClick={handlePublish}
          className="bg-blue-600 text-white px-4 py-1 text-sm rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => actions.history.undo()}
          disabled={!canUndo}
          className="bg-white border px-3 py-1 text-sm rounded disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={() => actions.history.redo()}
          disabled={!canRedo}
          className="bg-white border px-3 py-1 text-sm rounded disabled:opacity-50"
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default CraftBuilderHeader;
