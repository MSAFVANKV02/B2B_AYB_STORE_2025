// pages/admin/editor.tsx
import React, { useState } from 'react';

export const template1 = {
    id: 'template-1',
    name: 'Hero with Text and Image',
    layout: [
      {
        id: 'block-1',
        type: 'container',
        style: {
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          gap: '20px',
        },
        children: [
          {
            id: 'text-1',
            type: 'text',
            content: 'Welcome to Our Site!',
            style: {
              fontSize: '32px',
              color: '#000000',
              flex: 1,
            },
          },
          {
            id: 'image-1',
            type: 'image',
            src: 'https://via.placeholder.com/300',
            style: {
              width: '300px',
              height: 'auto',
            },
          },
        ],
      },
    ],
  };

type Block = any;

function EditableBlock({ block, onChange }: { block: Block; onChange: (updated: Block) => void }) {
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...block, content: e.target.value });
  };

  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...block, src: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...block, style: { ...block.style, color: e.target.value } });
  };

  if (block.type === 'text') {
    return (
      <div>
        <input value={block.content} onChange={handleContentChange} placeholder="Edit text" />
        <input type="color" value={block.style.color} onChange={handleColorChange} />
      </div>
    );
  }

  if (block.type === 'image') {
    return (
      <div>
        <input value={block.src} onChange={handleSrcChange} placeholder="Image URL" />
      </div>
    );
  }

  return null;
}

export default function PageEditor() {
  const [blocks, setBlocks] = useState(template1.layout);
  const [screen, setScreen] = useState<'desktop' | 'mobile'>('desktop');

  const updateBlock = (blockId: string, updatedBlock: Block) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, ...updatedBlock }
          : {
              ...block,
              children: block.children?.map((child: Block) =>
                child.id === blockId ? { ...child, ...updatedBlock } : child
              ),
            }
      )
    );
  };

  const renderBlock = (block: Block) => {
    if (block.type === 'container') {
      return (
        <div key={block.id} style={block.style}>
          {block.children.map(renderBlock)}
        </div>
      );
    }

    if (block.type === 'text') {
      return (
        <div key={block.id} style={block.style}>
          <p>{block.content}</p>
          <EditableBlock block={block} onChange={(u) => updateBlock(block.id, u)} />
        </div>
      );
    }

    if (block.type === 'image') {
      return (
        <div key={block.id} style={block.style}>
          <img src={block.src} style={block.style} />
          <EditableBlock block={block} onChange={(u) => updateBlock(block.id, u)} />
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1>Page Editor ({screen})</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => setScreen('desktop')}>Desktop View</button>
        <button onClick={() => setScreen('mobile')}>Mobile View</button>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          marginTop: 20,
          padding: 20,
          width: screen === 'desktop' ? '100%' : '375px',
          background: '#f9f9f9',
        }}
      >
        {blocks.map(renderBlock)}
      </div>
    </div>
  );
}
