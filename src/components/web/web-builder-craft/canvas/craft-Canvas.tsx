import { Frame, Element } from "@craftjs/core";
// import { CraftContainerBlock } from "../bloks/craft_container_block";
import { Container } from "../selecters/Container";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
import CraftCategorySelection from "../selecters/category";

const CraftCanvas = () => (
  <div className="flex-1 h-screen page-container">
    <Frame>
      <Element
        canvas
        is={Container}
        width="1080px"
        height="100%"
        background={{ r: 250, g: 250, b: 250, a: 1 }}
        padding={["10", "10", "10", "10"]}
        custom={{ displayName: "App" }}
        id="root"
      >
        <Element
          canvas
          is={Container}
          // background={{ r: 39, g: 41, b: 41, a: 1 }}
          flexDirection="column"
          width="100%"
          height="auto"
          // padding={['40', '40', '40', '40']}
          margin={["0", "0", "40", "0"]}
          custom={{ displayName: "CraftSliderBannerBlock" }}
        >
          <CraftSliderBannerBlock />
        </Element>
        <Element
          canvas
          is={Container}
          // background={{ r: 39, g: 41, b: 41, a: 1 }}
          flexDirection="column"
          width="100%"
          height="auto"
          // padding={['40', '40', '40', '40']}
          margin={["0", "0", "40", "0"]}
          custom={{ displayName: "CraftMainProductBlock" }}
        >
          <CraftMainProductBlock />
        </Element>

        <Element
          canvas
          is={Container}
          // background={{ r: 39, g: 41, b: 41, a: 1 }}
          flexDirection="column"
          width="100%"
          height="auto"
          // padding={['40', '40', '40', '40']}
          // margin={["0", "0", "40", "0"]}
          custom={{ displayName: "CraftCategorySelection" }}
        >
          <CraftCategorySelection />
        </Element>


        {/* <CraftSliderBannerBlock /> */}
      </Element>
    </Frame>
  </div>
);

export default CraftCanvas;

// export const CraftContainer = ({ children }: any) => {
//   const { connectors: { connect, drag } } = useNode();
//   return (
//     <div ref={(ref) => ref && connect(drag(ref))} className="border-dashed border p-4 min-h-[400px]">
//       {children}
//     </div>
//   );
// };

// CraftContainer.craft = {
//   displayName: 'Container',
//   rules: {
//     canMoveOut: () => false
//   }
// };
