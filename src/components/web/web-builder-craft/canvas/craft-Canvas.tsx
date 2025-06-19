import { Frame, Element } from "@craftjs/core";
// import { CraftContainerBlock } from "../bloks/craft_container_block";
import { Container } from "../selecters/Container";
import { CraftSliderBannerBlock } from "../templates/craft-temp-one/craft-slider";

const CraftCanvas = () => (
  <div className="flex-1 h-screen page-container">
    <Frame>
      <Element
        canvas
        is={Container}
        width="1080px"
        height="100%"
        background={{ r: 255, g: 255, b: 255, a: 1 }}
        padding={["40", "40", "40", "40"]}
        custom={{ displayName: "App" }}
        id="root"
      >
        <Element
          canvas
          is={CraftSliderBannerBlock}
          // custom={{ displayName: "Banners" }}
        />

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
