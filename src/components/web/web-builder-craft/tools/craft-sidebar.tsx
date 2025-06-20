import { useEditor } from "@craftjs/core";
import { CraftHeading } from "../bloks/craft-heading";
import CraftParagraph from "../bloks/Craft_ParaGraph";
import CraftCard from "../bloks/Craft_Card";
import CraftButton from "../bloks/Craft_Button";
import { GridDropzoneBlock } from "../bloks/CraftGridDropzoneBlock";
import { GridItemBlock } from "../bloks/GridItemBlock";
import CraftToolBar from "./Craft_ToolBar";

const CraftSidebar = () => {
  const { connectors } = useEditor();

  const blocks = [
    {
      name: "Heading",
      component: (
        <CraftHeading
          fontSize="2rem"
          color="#000000"
          textAlign="left"
          children="Heading"
        />
      ),
      type: "CraftHeading",
    },
    {
      name: "Paragraph",
      component: (
        <CraftParagraph
          fontSize=""
          color="#000000"
          textAlign="left"
          children="Paragraph"
        />
      ),
      type: "CraftParagraph",
    },
    { name: "Card", component: <CraftCard />, type: "CraftCard" },
    {
      name: "Button",
      component: <CraftButton text="Click Me" />,
      type: "CraftButton",
    },
    {
      name: "Grid Dropzone",
      component: (
        <GridDropzoneBlock
          rows={2}
          columns={2}
          padding="p-4"
          margin="m-2"
          gap="gap-4"
        // padding="p-4" margin="m-2" gap="gap-4" 
        />
      ),
      type: "GridDropzoneBlock",
    },
    {
        name: 'Grid Item',
        component: <GridItemBlock colSpan={6}><p>Drop content here</p></GridItemBlock>,
        type: 'GridItemBlock',
      },
    // Add more blocks as needed
    { name: 'Container', component:  <CraftToolBar />, type: 'CraftContainerBlock' },
    
  ];

  return (
    <div className="w-full  overflow-y-auto">
      <h3 className="mb-4 font-bold text-lg">Blocks</h3>
      {blocks.map((b, i) => (
        <div
          key={i}
          ref={(ref) => ref && connectors.create(ref, b.component)}
          className="cursor-pointer mb-2 p-3 bg-white dark:bg-neutral-300/30 rounded shadow hover:bg-gray-200 transition-all"
        >
          {b.name}
        </div>
      ))}
    </div>
  );
};

export default CraftSidebar;
