import { useEditor } from "@craftjs/core";
import { CraftHeading } from "../bloks/craft-heading";
import CraftParagraph from "../bloks/Craft_ParaGraph";
// import CraftCard from "../bloks/Craft_Card";
// import CraftButton from "../bloks/Craft_Button";
// import { GridDropzoneBlock } from "../bloks/CraftGridDropzoneBlock";
// import { GridItemBlock } from "../bloks/GridItemBlock";
// import CraftToolBar from "./Craft_ToolBar";
import MyBackBtn from "@/components/myUi/myBackBtn";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import { UIAction } from "@/providers/reducers/builderReducer";

import HamburgerBtn from "./hamburgerBtn";
import useNavigateClicks from "@/hooks/useClicks";

type Props = {
  dispatch: React.Dispatch<UIAction>;
};

const CraftSidebar = ({ dispatch }: Props) => {
  const { connectors } = useEditor();
  const { handleClick } = useNavigateClicks();

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
    {
      name: "Slider",
      component: <CraftSliderBannerBlock />,
      type: "CraftSliderBannerBlock",
    },
    // { name: "Card", component: <CraftCard />, type: "CraftCard" },
    // {
    //   name: "Button",
    //   component: <CraftButton text="Click Me" />,
    //   type: "CraftButton",
    // },
    // {
    //   name: "Grid Dropzone",
    //   component: (
    //     <GridDropzoneBlock
    //       rows={2}
    //       columns={2}
    //       padding="p-4"
    //       margin="m-2"
    //       gap="gap-4"
    //     // padding="p-4" margin="m-2" gap="gap-4"
    //     />
    //   ),
    //   type: "GridDropzoneBlock",
    // },
    // {
    //     name: 'Grid Item',
    //     component: <GridItemBlock colSpan={6}><p>Drop content here</p></GridItemBlock>,
    //     type: 'GridItemBlock',
    //   },
    // // Add more blocks as needed
    // { name: 'Container', component:  <CraftToolBar />, type: 'CraftContainerBlock' },
  ];

  return (
    <div className="w-full  overflow-y-auto">
      <div className="flex items-center justify-between p-2">
        <MyBackBtn
          className=""
          clickEvent={() => {
            handleClick("/settings/templates");
          }}
        />

        <HamburgerBtn dispatch={dispatch} type="TOGGLE_SIDEBAR" />
      </div>
      <div className="w-full h-10 p-2 text-sm text-center bg-white border-b">
        <h3 className="mb-4 font-bold text-lg">Blocks</h3>
      </div>

      <div className="p-2">
        {blocks.map((b, i) => (
          <div
            key={i}
            ref={(ref) => ref && connectors.create(ref, b.component)}
            className="cursor-pointer mb-2 p-3 text-sm bg-white dark:bg-neutral-300/30 rounded shadow hover:bg-gray-200 transition-all"
          >
            {b.name}
          </div>
        ))}
      </div>

      <ul className="text-xs list-disc p-4 bg-yellow-50 border-yellow-600">
        <li className="">
          Don’t include pricing or personal contact details in the Images
        </li>
        <li className="">No blurry or pixelated images</li>
        <li className="">Avoid using too much text — keep it visual</li>
        <li className=""></li>
      </ul>
    </div>
  );
};

export default CraftSidebar;
