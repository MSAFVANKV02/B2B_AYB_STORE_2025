// import { useEditor } from '@craftjs/core';

// const SettingsPanelCraft = () => {
//   const { selected, query, actions } = useEditor();

//   const id = selected && Array.from(selected)[0];
//   if (!id) return <div className="p-4">Select a block to style</div>;

//   const { displayName,props:CraftProps } = query.node(id).toSerializedNode();   // get data
//   const name = displayName;                              // correct way
//   const props = CraftProps;                            // get props object

//   const update = (prop: string, value: any) => {
//     actions.setProp(id, (p: any) => {
//       p[prop] = value;
//     });
//   };

//   return (
//     <div className="p-4">
//       <h3 className="mb-2 font-bold">{name} Settings</h3>

//       {name === 'CraftHeading' && (
//         <>
//           <label className="block mb-1">Font Size</label>
//           <input
//             type="text"
//             value={props.fontSize || ''}
//             onChange={(e) => update('fontSize', e.target.value)}
//             className="w-full mb-2 border rounded p-1"
//           />

//           <label className="block mb-1">Color</label>
//           <input
//             type="color"
//             value={props.color || '#000000'}
//             onChange={(e) => update('color', e.target.value)}
//             className="w-full mb-2"
//           />
//         </>
//       )}
//       {/* Add panels for other components */}
//     </div>
//   );
// };

// export default SettingsPanelCraft;
// SettingsPanelCraft.tsx
import React, { useEffect } from "react";
import { useEditor } from "@craftjs/core";
import { UIAction, UIState } from "@/providers/reducers/builderReducer";
import HamburgerBtn from "./hamburgerBtn";

type Props = {
  dispatch: React.Dispatch<UIAction>;
  state: UIState;
};

const SettingsPanelCraft = ({ dispatch, state }: Props) => {
  const { selected } = useEditor((state) => ({
    selected: state.events.selected,
  }));

  const editor = useEditor();
  const id = selected && Array.from(selected)[0];

  useEffect(() => {
    console.log(
      "🧪 useEffect running: id =",
      id,
      "settingsOpen =",
      state.settingsOpen
    );
    if (id && !state.settingsOpen) {
      dispatch({ type: "OPEN_SETTINGS" });
    }
  }, [id, state.settingsOpen, dispatch]);

  if (!id) {
    return (
      <div className="w-full h-full p-4 bg-gray-50 ">
        <div className="flex justify-between items-center">
          <p className="text-xs">Select a block</p>

          <HamburgerBtn
            dispatch={dispatch}
            type="TOGGLE_SETTINGS"
            className=""
          />
        </div>
      </div>
    );
  }

  const node = editor.query.node(id).get() as any;

  // ✅ Fix here: displayName is inside `data`, related is root level!
  const displayName = node.data.displayName;
  const related = node.related;

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-neutral-300/50 dark:text-neutral-300 overflow-y-auto">
      <div className="w-full h-10 p-2 flex justify-between text-sm items-center bg-white border-b">
        <h3 className="font-bold ">{displayName} Settings</h3>

        <HamburgerBtn dispatch={dispatch} type="TOGGLE_SETTINGS" className="" />
      </div>

      <div className="">
        {related?.settings ? (
          React.createElement(related.settings as React.ComponentType)
        ) : (
          <p className="text-sm text-gray-500">
            No settings available for this block.
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingsPanelCraft;
