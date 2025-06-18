// import { useState } from "react";
// import { Puck } from "@measured/puck";
// import "@measured/puck/puck.css";
// import { templateConfigs } from "./config-componets";

// // Define individual template configs

// const CreatePageBlock = () => {
//   const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(
//     null
//   );
//   const [content, setContent] = useState({});

//   const handleSelect = (templateKey: string) => {
//     setSelectedTemplateKey(templateKey);
//     setContent({}); // reset content on template change
//   };

//   const save = (data: any) => {
//     console.log("Published:", data);
//     setContent(data);
//   };

//   if (!selectedTemplateKey) {
//     return (
//       <div className=" bg-white dark:bg-inherit h-[90dvh] p-5 rounded-md">
//         <div className="mb-5">
//           <span className="text-sm ">Choose Your Templates</span>
//         </div>
//         <div className="flex gap-3 flex-wrap">
//           {Object.entries(templateConfigs).map(([key, config], i) => {
//             //   const name = key === "template1" ? "Hero Template" : "Gallery Template";
//             return (
//               <>
//                 {i}
//                 <div
//                   key={key}
//                   className="border px-2 text-center text-xs min-h-20 w-28 cursor-pointer whitespace-normal break-words rounded-md flex justify-center items-center text-textGray shadow-md"
//                   onClick={() => handleSelect(key)}
//                 >
//                   {/* <h3>{name}</h3> */}
//                   <p>
//                     {config.components[Object.keys(config.components)[0]].label}
//                   </p>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   const selectedConfig = templateConfigs[selectedTemplateKey];

//   return (
//     <div>
//       <button
//         onClick={() => setSelectedTemplateKey(null)}
//         className="text-xs mb-3"
//       >
//         ← Back
//       </button>
//       <Puck config={selectedConfig} data={content} onPublish={save} />
//     </div>
//   );
// };

// export default CreatePageBlock;
import  { useEffect, useState } from "react";
import {  Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { templateConfigs } from "./config-componets";

const LOCAL_STORAGE_KEY = "puck-content";
const TEMPLATE_KEY = "selected-template";

const CreatePageBlock = () => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
  const [content, setContent] = useState({});

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedTemplate = localStorage.getItem(TEMPLATE_KEY);

    if (storedContent && storedTemplate) {
      setContent(JSON.parse(storedContent));
      setSelectedTemplateKey(storedTemplate);
    }
  }, []);

  // ✅ Save on publish
  const save = (data: any) => {
    console.log("Published:", data);
    setContent(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  // ✅ Handle template selection
  const handleSelect = (templateKey: string) => {
    setSelectedTemplateKey(templateKey);
    setContent({});
    localStorage.setItem(TEMPLATE_KEY, templateKey);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // clear old content
  };

  // ✅ Back button clears storage
  const handleBack = () => {
    setSelectedTemplateKey(null);
    setContent({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(TEMPLATE_KEY);
  };

  if (!selectedTemplateKey) {
    return (
      <div className="bg-white dark:bg-inherit h-[90dvh] p-5 rounded-md">
        <div className="mb-5">
          <span className="text-sm">Choose Your Templates</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(templateConfigs).map(([key, config]) => (
            <div
              key={key}
              className="border px-2 text-center text-xs min-h-20 w-28 cursor-pointer whitespace-normal break-words rounded-md flex justify-center items-center text-textGray shadow-md"
              onClick={() => handleSelect(key)}
            >
              <p>{config.components[Object.keys(config.components)[0]].label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const selectedConfig = templateConfigs[selectedTemplateKey];

  return (
    <div>
      <button onClick={handleBack} className="text-xs mb-3">
        ← Back
      </button>
      <Puck config={selectedConfig} data={content} onPublish={save} />
    </div>
  );
};

export default CreatePageBlock;
