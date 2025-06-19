import React from "react";
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
import { CraftSliderBannerBlock } from "../templates/craft-temp-one/craft-slider";
import { GridDropzoneBlock } from "../bloks/CraftGridDropzoneBlock";
import { Container, Text } from "../selecters";
import CraftBuilderHeader from "../tools/CraftHeader";

// 👇 Example JSON from your saved data (normally from DB)
// const savedJson = `{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["40","40","40","40"],"margin":["0","0","0","0"],"background":{"r":255,"g":255,"b":255,"a":1},"color":{"r":0,"g":0,"b":0,"a":1},"shadow":0,"radius":0,"width":"1080px","height":"100%","marginTop":0,"marginLeft":0,"marginBottom":0,"marginRight":0,"id":"root"},"displayName":"Container","custom":{"displayName":"App"},"hidden":false,"nodes":["-5gqHWJe0Z"],"linkedNodes":{}},"-5gqHWJe0Z":{"type":{"resolvedName":"CraftSliderBannerBlock"},"isCanvas":true,"props":{"slides":[{"image":"https://via.placeholder.com/800x200?text=Slide+1","link":"#"},{"image":"https://via.placeholder.com/800x200?text=Slide+2","link":"#"}],"autoplay":true,"showDots":true,"infinite":true,"speed":500,"width":"100%","height":"200px","margin":["0px","0px","0px","0px"],"objectFit":"cover"},"displayName":"Slider Banner","custom":{"displayName":"Banners"},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}`;
const savedJson = `{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["40","40","40","40"],"margin":["0","0","0","0"],"background":{"r":255,"g":255,"b":255,"a":1},"color":{"r":0,"g":0,"b":0,"a":1},"shadow":0,"radius":0,"width":"1080px","height":"100%","marginTop":0,"marginLeft":0,"marginBottom":0,"marginRight":0,"id":"root"},"displayName":"Container","custom":{"displayName":"App"},"hidden":false,"nodes":["NxPqVlWFvI"],"linkedNodes":{}},"NxPqVlWFvI":{"type":{"resolvedName":"CraftSliderBannerBlock"},"isCanvas":true,"props":{"slides":[{"image":"https://via.placeholder.com/800x200?text=Slide+1","link":"#"},{"image":"https://via.placeholder.com/800x200?text=Slide+2","link":"#"}],"autoplay":true,"showDots":true,"infinite":true,"speed":500,"width":"100%","height":"200px","margin":["0px","0px","0px","0px"],"objectFit":"cover"},"displayName":"CraftSliderBannerBlock","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}`;
const PageViewer = () => {
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
        CraftSliderBannerBlock
      }}
    >
      <div className="min-h-screen bg-white p-8">
        <Frame data={savedJson}>
          <Element is={Container} canvas id="root" />
        </Frame>
      </div>
    </Editor>
  );
};

export default PageViewer;
