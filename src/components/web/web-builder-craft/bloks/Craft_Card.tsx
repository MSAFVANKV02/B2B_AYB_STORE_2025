import {  useNode } from '@craftjs/core';
import BlockWrapper from '../tools/BlockWrapper';

const CraftCard = ({ children }: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <BlockWrapper>
        <div
    ref={(ref) => ref && connect(drag(ref))}

      className="p-4 border rounded shadow bg-white"
    >
      {children}
    </div>
    </BlockWrapper>
    
  );
};

CraftCard.craft = {
  displayName: 'Card',
  props: {},
  rules: {
    canMoveIn: () => true,
  },
};

export default CraftCard;
