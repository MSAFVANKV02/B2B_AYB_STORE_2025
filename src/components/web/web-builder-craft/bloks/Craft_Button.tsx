import { useNode } from "@craftjs/core";
import BlockWrapper from "../tools/BlockWrapper";

const CraftButton = ({ text }: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <BlockWrapper>
      <button
        ref={(ref) => ref && connect(drag(ref))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {text || "Click Me"}
      </button>
    </BlockWrapper>
  );
};

CraftButton.craft = {
  displayName: "Button",
  props: {
    text: "Click Me",
  },
};

export default CraftButton;
