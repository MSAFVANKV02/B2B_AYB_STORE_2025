import { Config } from "@measured/puck";
import { Tm_01_MainBlock01 } from "./blocks/tm_01_block_01";
import { HeadingBlock } from "../../universal-blocks/heading-block";
import { PukeDragDropBlock } from "../../universal-blocks/Drag_Drop_Block";
import { PuckCardBlock } from "../../universal-blocks/card-block";
import { PuckArticleBlock } from "../../universal-blocks/article-block";
import { PuckUnderlineBlock } from "../../universal-blocks/hr-block";
import { PuckSubHeaderBlock } from "../../universal-blocks/subheader-block";
import { ParagraphBlock } from "../../universal-blocks/paragraph";
import { SliderBannerBlock } from "../../universal-blocks/banner-block";
import { FreeformContainerBlock } from "../../universal-blocks/container-block";

//   ==================================================

export const template1: Config = {
  components: {
    Tm_01_MainBlock01,
    PuckUnderlineBlock,
    PukeDragDropBlock,
    HeadingBlock,
    PuckSubHeaderBlock,
    PuckCardBlock,
    PuckArticleBlock,
    ParagraphBlock,
    SliderBannerBlock,
    FreeformContainerBlock
  },
};
