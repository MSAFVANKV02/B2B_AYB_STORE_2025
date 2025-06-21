
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { useEditor } from "@craftjs/core";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import CraftBuilderHeader from "../tools/CraftHeader";
// import SettingsPanelCraft from "../tools/settings-Panel-Craft";
// import CraftSidebar from "../tools/craft-sidebar";
// import { CanvasScaleProvider } from "@/providers/context/canvas-scale-context";

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

//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     window.requestAnimationFrame(() => {
//       window.parent.postMessage({ LANDING_PAGE_LOADED: true }, "*");
//       setTimeout(() => {
//         setOptions((options) => {
//           options.enabled = true;
//         });
//       }, 200);
//     });
//   }, [setOptions]);

//   return (
//     <div className="w-screen h-screen overflow-auto relative bg-black">
//       {/* Sidebar */}
//       <div className="fixed left-0 top-0 bottom-0 w-[240px] z-50 bg-white border-r">
//         <CraftSidebar />
//       </div>

//       {/* Settings Panel */}
//       <div className="fixed right-0 top-0 bottom-0 w-[320px] z-50 bg-white border-l">
//         <SettingsPanelCraft />
//       </div>

//       {/* Header */}
//       <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] w-1/2 bg-white border rounded shadow">
//         <CraftBuilderHeader />
//       </div>

//       {/* Zoom & Pan Canvas Area */}
//       <div className="absolute left-[240px] right-[320px] top-0 bottom-0 z-10">
//         <TransformWrapper
//           maxScale={4}
//           minScale={0.2}
//           wheel={{ step: 0.1 }}
//           pinch={{ step: 0.05 }}
//           doubleClick={{ disabled: true }}
//           panning={{ velocityDisabled: true }}
//           onZoomStop={(ref) => {
//             setScale(ref.state.scale); // update scale to use in Resizer
//           }}
//         >
//           {/* <TransformComponent wrapperClass="w-full h-full" contentClass="relative w-full h-full">
//             <div
//               ref={(ref) => {
//                 if (ref) connectors.select(connectors.hover(ref, ""), "");
//               }}
//               className={cn("craftjs-renderer mx-auto transition w-[1080px] min-h-[1200px]", {
//                 "bg-white": enabled,
//               })}
//             >
//               {children}
//             </div>
//           </TransformComponent> */}
//           <TransformComponent
//             wrapperClass="w-full h-full"
//             contentClass="relative w-full h-full"
//           >
//             <div
//               ref={(ref) => {
//                 if (ref) connectors.select(connectors.hover(ref, ""), "");
//               }}
//               className={cn(
//                 "craftjs-renderer mx-auto transition w-[1080px] min-h-[1200px]",
//                 {
//                   "bg-white": enabled,
//                 }
//               )}
//             >
//               {/* ✅ Wrap with scale context */}
//               <CanvasScaleProvider scale={scale}>
//                 {children}
//               </CanvasScaleProvider>
//             </div>
//           </TransformComponent>
//           {/* <div className="w-full h-full relative">
            
//             <TransformComponent
//               wrapperClass="w-full h-full"
//               contentClass="relative w-full h-full"
//             >
            
//               <div className="zoom-wrapper mx-auto w-[1080px] min-h-[1200px] bg-gray-100" />
//             </TransformComponent>

        
//             <div
//               ref={(ref) => {
//                 if (ref) connectors.select(connectors.hover(ref, ""), "");
//               }}
//               className={cn(
//                 "craftjs-renderer absolute top-0 left-1/2 -translate-x-1/2 transition w-[1080px]"
//               )}
//             >
//               {children}
//             </div>
//           </div> */}
//         </TransformWrapper>
        
//       </div>
//     </div>
//   );
// };

import { useEditor } from "@craftjs/core";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CraftBuilderHeader from "../tools/CraftHeader";
import SettingsPanelCraft from "../tools/settings-Panel-Craft";
import CraftSidebar from "../tools/craft-sidebar";

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

  const rendererRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);




  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.parent.postMessage({ LANDING_PAGE_LOADED: true }, "*");
      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoom((prevZoom) => {
          const newZoom = Math.max(0.2, Math.min(prevZoom - e.deltaY * 0.001, 3));
          return parseFloat(newZoom.toFixed(2));
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleZoomChange = (value: number) => {
    setZoom((prev) => {
      const next = Math.max(0.2, Math.min(prev + value, 3));
      return parseFloat(next.toFixed(2));
    });
  };

  return (
    <div className="w-screen h-screen overflow-auto relative bg-black">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-[240px] z-50 bg-white border-r">
        <CraftSidebar />
      </div>

      {/* Settings Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[320px] z-50 bg-white border-l">
        <SettingsPanelCraft />
      </div>

      {/* Header */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] w-1/2 bg-white border rounded shadow">
        <CraftBuilderHeader />
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white border rounded shadow p-2 flex gap-2 items-center text-sm">
        <button onClick={() => handleZoomChange(-0.1)}>➖</button>
        <span className="min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={() => handleZoomChange(0.1)}>➕</button>
        <button onClick={() => setZoom(1)} className="ml-2 text-xs text-blue-500">
          Reset
        </button>
      </div>

      <div className="flex-1  h-full min-h-[200dvh] w-screen overflow-auto ">
        <div className="min-h-full pt-24 flex flex-col items-center bg-neutral-100 py-4">
          {/* <CraftBuilderHeader /> */}

          {/* Renderer area scrollable */}
          <div
            className={cn(
              'craftjs-renderer w-full flex justify-center overflow-visible transition',
              {
                'bg-renderer-gray dark:bg-neutral-300': enabled,
              }
            )}
            // ref={(ref) => {
            //   if (ref) connectors.select(connectors.hover(ref, ''), '');
            // }}
            ref={(ref) => {
              if (ref) {
                connectors.select(connectors.hover(ref, ""), "");
                rendererRef.current = ref;
              }
            }}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center top",
              transition: "transform 0.2s ease",
            }}
          >
            <div className="relative w-auto bg-white ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
