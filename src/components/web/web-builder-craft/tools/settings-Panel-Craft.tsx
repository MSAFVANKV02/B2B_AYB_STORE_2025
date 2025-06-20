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
import React from 'react';
import { useEditor } from '@craftjs/core';

const SettingsPanelCraft = () => {
  const { selected } = useEditor((state) => ({
    selected: state.events.selected,
  }));

  const editor = useEditor();
  const id = selected && Array.from(selected)[0];

  if (!id) {
    return <div className="w-[20%] p-4 bg-gray-50">Select a block</div>;
  }

  const node = editor.query.node(id).get() as any;

  // ✅ Fix here: displayName is inside `data`, related is root level!
  const displayName = node.data.displayName;
  const related = node.related;

  return (
    <div className="w-[20%] p-4 bg-gray-50 dark:bg-neutral-300/50 dark:text-neutral-300 fixed right-0 z-[10001] bottom-0 top-0 overflow-auto">
      <h3 className="font-bold mb-2">{displayName} Settings</h3>

      {related?.settings ? (
        React.createElement(related.settings as React.ComponentType)
      ) : (
        <p className="text-sm text-gray-500">No settings available for this block.</p>
      )}
    </div>
  );
};

export default SettingsPanelCraft;


