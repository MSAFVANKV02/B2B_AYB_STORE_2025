// import { useEditor } from '@craftjs/core';
// import cx from 'classnames';
// import React, { useEffect } from 'react';

import { cn } from "@/lib/utils";
import CraftBuilderHeader from "../tools/CraftHeader";
import SettingsPanelCraft from "../tools/settings-Panel-Craft";
import CraftSidebar from "../tools/craft-sidebar";
import { useEditor } from "@craftjs/core";
import { useEffect } from "react";

// import CraftBuilderHeader from '../tools/CraftHeader';
// import SettingsPanelCraft from '../tools/settings-Panel-Craft';
// import { cn } from '@/lib/utils';
// import CraftSidebar from '../tools/craft-sidebar';



// export const CraftViewport: React.FC<{ children?: React.ReactNode }> = ({
//   children,
// }) => {
//   const {
//     enabled,
//     connectors,
//     actions: { setOptions },
//   } = useEditor((state) => ({
//     enabled: state.options.enabled,
//   }));

//   useEffect(() => {
//     if (!window) {
//       return;
//     }

//     window.requestAnimationFrame(() => {
//       // Notify doc site
//       window.parent.postMessage(
//         {
//           LANDING_PAGE_LOADED: true,
//         },
//         '*'
//       );

//       setTimeout(() => {
//         setOptions((options) => {
//           options.enabled = true;
//         });
//       }, 200);
//     });
//   }, [setOptions]);

//   return (
//     <div className=" ">
//       <div
//         className={cx(['flex h-full overflow-auto flex-row w-full '])}
//       >
//         {/* <CraftToolBar /> */}
//         <CraftSidebar />
//         <div className="page-container flex w-full overflow-auto h-full flex-col ">
//         <CraftBuilderHeader />
//           <div
//             className={cn([
//               'craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto',
//               {
//                 'bg-renderer-gray dark:bg-neutral-300': enabled,
//               },
//             ])}
//             ref={(ref) => {
//             // if(ref)  connectors.select(connectors.hover(ref, null), null);
//             if (ref) connectors.select(connectors.hover(ref, ''), '');

//             }}
//           >
//             <div className="relative flex-col w-full flex h-full items-center bg-neutral-200 p-5 overflow-auto">
//               {children}
//             </div>
//           </div>
//         </div>
//         <SettingsPanelCraft />
//       </div>
//     </div>
//   );
// };
export const CraftViewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) return;

    window.requestAnimationFrame(() => {
      window.parent.postMessage({ LANDING_PAGE_LOADED: true }, '*');

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      {/* Sidebar - Fixed Left */}
      <div className="w-[240px] h-full border-r bg-gray-100 dark:bg-neutral-300/50 fixed left-0 z-[100999] bottom-0 top-0 dark:text-neutral-300 p-4">
        <CraftSidebar />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 h-full overflow-auto ml-[240px] mr-[320px]">
        <div className="min-h-full flex flex-col items-center bg-neutral-100 py-4">
          <CraftBuilderHeader />

          {/* Renderer area scrollable */}
          <div
            className={cn(
              'craftjs-renderer w-full flex justify-center overflow-visible transition',
              {
                'bg-renderer-gray dark:bg-neutral-300': enabled,
              }
            )}
            ref={(ref) => {
              if (ref) connectors.select(connectors.hover(ref, ''), '');
            }}
          >
            <div className="relative w-[1080px]">{children}</div>
          </div>
        </div>
      </div>

      {/* Settings Panel - Fixed Right */}
      <div className="w-[320px] h-full border-l fixed right-0 top-0 bg-white z-20">
        <SettingsPanelCraft />
      </div>
    </div>
  );
};
