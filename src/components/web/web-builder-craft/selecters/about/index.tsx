
import BlockWrapper from "../../tools/BlockWrapper";
import { Element, useNode } from "@craftjs/core";
import { Text } from "../Text";
import { ImageBlock } from "../image";


const Craft_About_Block = () => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div ref={(ref) => ref && connect(ref)} className="w-full">
      <BlockWrapper className="flex ">
        <div className="w-1/2">
          <Element
            id="about-image"
            is={ImageBlock}
            canvas
            src="https://res.cloudinary.com/ddzwv1pc9/image/upload/v1750488122/media_uploads/vlbetakhsubyaylf3adl.png"
            width="100%"
            height="250px"
            objectFit="cover"
            margin={["0", "0", "0", "0"]}
            borderRadius={0}
          />
        </div>
        <div className="w-1/2">
          <Element
            id="about-text"
            is={Text}
            canvas
            text="About Company"
            fontSize="16"
            fontWeight="400"
            textAlign="left"
            color={{ r: 0, g: 0, b: 0, a: 1 }}
            margin={["5", "0", "0", "5"]}
            shadow={0}
          />
           <Element
            id="about-description"
            is={Text}
            canvas
            text="Description"
            fontSize="12"
            fontWeight="400"
            textAlign="left"
            color={{ r: 0, g: 0, b: 0, a: 1 }}
            margin={["5", "0", "0", "5"]}
            shadow={0}
          />
        </div>
      </BlockWrapper>
    </div>
  );
};

export default Craft_About_Block;
