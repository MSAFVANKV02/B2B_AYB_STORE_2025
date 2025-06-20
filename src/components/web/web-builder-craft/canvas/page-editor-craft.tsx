import { Editor } from "@craftjs/core";
import CraftCanvas from "./craft-Canvas";

import CraftParagraph from "../bloks/Craft_ParaGraph";
import CraftCard from "../bloks/Craft_Card";
import CraftButton from "../bloks/Craft_Button";
import { CraftHeading } from "../bloks/craft-heading";
import { CraftContainerBlock } from "../bloks/craft_container_block";
import { GridDropzoneBlock } from "../bloks/CraftGridDropzoneBlock";

import { CraftViewport } from "./craft-view-port";
// import { Text } from "../bloks/text";
import { RenderNode } from "./RenderNode";

import CraftBuilderHeader from "../tools/CraftHeader";
import { Container, Text } from "../selecters";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
import CraftCategorySelection from "../selecters/category";

const PageBuilderCraft = () => {
  return (
    <Editor
      resolver={{
        CraftHeading,
        CraftParagraph,
        CraftCard,
        CraftButton,
        // CraftContainer,
        CraftContainerBlock,
        GridDropzoneBlock,
        Container,
        Text,
        CraftBuilderHeader,
        CraftSliderBannerBlock,
        CraftMainProductBlock,
        CraftCategorySelection
      }}
      onRender={RenderNode}
      enabled={true}
    >
      {/* <CraftBuilderHeader /> */}
      {/* <div className="flex h-screen">
        <CraftToolBar />
        <CraftSidebar />
        <CraftCanvas />
        <SettingsPanelCraft />
      </div> */}

      <CraftViewport>
        {/* <CraftCanvas /> */}

        <div className="flex h-full w-full">
          {/* <CraftToolBar /> */}
          <CraftCanvas />
          {/* <CraftSidebar /> */}
        </div>
      </CraftViewport>
    </Editor>
  );
};

export default PageBuilderCraft;
