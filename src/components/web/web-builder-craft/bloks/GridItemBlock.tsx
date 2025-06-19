import React from 'react';
import { useNode } from '@craftjs/core';

type GridItemProps = {
  colSpan: number;
};

export const GridItemBlock = ({ colSpan = 12, children }: React.PropsWithChildren<GridItemProps>) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`col-span-${colSpan} min-h-[80px] bg-white border rounded p-2`}
    >
      {children}
    </div>
  );
};

GridItemBlock.craft = {
  displayName: 'Grid Item',
  props: {
    colSpan: 12,
  },
};
