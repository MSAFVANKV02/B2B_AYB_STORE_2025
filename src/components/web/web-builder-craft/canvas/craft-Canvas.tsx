import { Frame, Element } from "@craftjs/core";
import { Container } from "../selecters/Container";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
import CraftCategorySelection from "../selecters/category";

import Craft_About_Block from "../selecters/about";

const CraftCanvas = () => (
  <div className="page-container">
    <Frame>
      <Element
        canvas
        is={Container}
        width="100%"
        height="auto"
        background={{ r: 250, g: 250, b: 250, a: 1 }}
        padding={["10", "10", "10", "10"]}
        custom={{ displayName: "App" }}
        id="root"
      >
        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "40", "0"]} custom={{ displayName: "CraftSliderBannerBlock" }}>
          <CraftSliderBannerBlock />
        </Element>

        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "40", "0"]} custom={{ displayName: "CraftMainProductBlock" }}>
          <CraftMainProductBlock />
        </Element>

        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "40", "0"]} custom={{ displayName: "CategorySelection" }}>
          <CraftCategorySelection />
        </Element>

        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "40", "0"]} custom={{ displayName: "About Section" }}>
          <Craft_About_Block />
        </Element>

        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "60", "0"]} custom={{ displayName: "Galley Block" }}>
          <CraftSliderBannerBlock 
          slides={[
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },

          ]}
          gap="1"
          slidesToShow={4} 
          enableLabel
          labelText="Company Gallery"
          />
        </Element>

        <Element canvas is={Container} flexDirection="column" width="100%" height="auto" margin={["0", "0", "40", "0"]} custom={{ displayName: "Custom Block" }}>
          <CraftSliderBannerBlock 
          slides={[
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
            { image: "https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png", link: "#" },
           

          ]}
          gap="2"
          slidesToShow={2} 
          enableLabel
          labelText="Custom"
          />
        </Element>
      </Element>
    </Frame>
  </div>
);

export default CraftCanvas;
