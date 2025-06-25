
import {
  Editor,
  Frame,
  Element,
} from "@craftjs/core";
import { CraftHeading } from "../bloks/craft-heading";
import CraftParagraph from "../bloks/Craft_ParaGraph";
import CraftCard from "../bloks/Craft_Card";
import CraftButton from "../bloks/Craft_Button";
import { CraftContainerBlock } from "../bloks/craft_container_block";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import { GridDropzoneBlock } from "../bloks/CraftGridDropzoneBlock";
import { Container, Text } from "../selecters";
import CraftBuilderHeader from "../tools/CraftHeader";
import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
import CraftCategorySelection from "../selecters/category";
import Craft_About_Block from "../selecters/about";
import { ImageBlock } from "../selecters/image";

type Props ={
  data: any; // This should be the type of your saved JSON data
}


const PageViewer = ({data}:Props) => {
  return (
    <Editor
      enabled={false} // 👈 disable drag/edit on view
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
        CraftCategorySelection,
        Craft_About_Block,
        ImageBlock
      }}
    >
      <div className="w-full flex justify-center px-4">
    <div className="w-full max-w-screen-xl">
      <Frame data={data}>
        <Element is={Container} canvas id="root" />
      </Frame>
    </div>
  </div>
    </Editor>
  );
};

export default PageViewer;
