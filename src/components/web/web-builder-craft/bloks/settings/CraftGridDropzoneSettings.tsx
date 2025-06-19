
import { useNode } from '@craftjs/core';

export const GridDropzoneSettings = () => {
  const {
    props: { rows, columns, padding, margin, gap },
    actions: { setProp }
  } = useNode((node) => ({
    props: node.data.props
  }));

  const handleChange = (prop: string, value: string | number) => {
    setProp((props: any) => {
      props[prop] = typeof value === 'string' ? value : parseInt(value as any);
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Rows</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => handleChange('rows', e.target.value)}
          className="w-full p-1 border rounded"
          min={1}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Columns</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => handleChange('columns', e.target.value)}
          className="w-full p-1 border rounded"
          min={1}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Padding (Tailwind)</label>
        <input
          type="text"
          value={padding}
          onChange={(e) => handleChange('padding', e.target.value)}
          className="w-full p-1 border rounded"
          placeholder="e.g. p-4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Margin (Tailwind)</label>
        <input
          type="text"
          value={margin}
          onChange={(e) => handleChange('margin', e.target.value)}
          className="w-full p-1 border rounded"
          placeholder="e.g. m-4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Gap (Tailwind)</label>
        <input
          type="text"
          value={gap}
          onChange={(e) => handleChange('gap', e.target.value)}
          className="w-full p-1 border rounded"
          placeholder="e.g. gap-4"
        />
      </div>
    </div>
  );
};
