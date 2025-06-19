
import { Element, useNode } from '@craftjs/core';
import { GridDropzoneSettings } from './settings/CraftGridDropzoneSettings';
import BlockWrapper from '../tools/BlockWrapper';


type GridDropzoneProps = {
  rows: number;
  columns: number;
  padding: string;
  margin: string;
  gap: string;
};

export const GridDropzoneBlock = ({
  rows = 2,
  columns = 2,
  padding = 'p-4',
  margin = 'm-2',
  gap = 'gap-2'
}: GridDropzoneProps) => {
  const {
    connectors: { connect, drag },
    id
  } = useNode();

  const totalCells = rows * columns;

  return (
   <BlockWrapper>
     <div
      ref={(ref) => ref && connect(drag(ref))}
      className={`grid ${padding} ${margin} ${gap} grid-cols-${columns} grid-rows-${rows} border border-dashed min-h-[200px]`}
    >
      {Array.from({ length: totalCells }).map((_, idx) => (
        <Element
          key={idx}
          id={`cell-${id}-${idx}`}
          is="div"
          canvas
          className="bg-white border rounded p-2 min-h-[80px]"
        />
      ))}
    </div>
   </BlockWrapper>
  );
};

GridDropzoneBlock.craft = {
  displayName: 'GridDropzone',
  props: {
    rows: 2,
    columns: 2,
    padding: 'p-4',
    margin: 'm-2',
    gap: 'gap-2'
  },
  related: {
    settings: GridDropzoneSettings
  }
};
