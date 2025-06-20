import { Input } from '@/components/ui/input';
import { useNode } from '@craftjs/core';
import React, { useState, useEffect } from 'react';

export const CraftSliderBannerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const [localSlides, setLocalSlides] = useState(props.slides || []);

  useEffect(() => {
    setLocalSlides(props.slides || []);
  }, [props.slides]);

  const updateSlideLocal = (index: number, key: 'image' | 'link', value: string) => {
    const cloned = JSON.parse(JSON.stringify(localSlides)); // ✅ deep clone
  
    cloned[index][key] = value;
  
    setLocalSlides(cloned);
  
    setProp((props: any) => {
      props.slides = cloned;
    });
  };
  
  
  const addSlide = () => {
    const updated = [...localSlides, { image: '', link: '' }];
    setLocalSlides(updated);
    setProp((props: any) => {
      props.slides = updated;
    });
  };

  const removeSlide = (index: number) => {
    const updated = localSlides.filter((_: any, i:number) => i !== index);
    setLocalSlides(updated);
    setProp((props: any) => {
      props.slides = updated;
    });
  };

  const handleChange = (key: string, value: any) => {
    setProp((props: any) => {
      props[key] = value;
    });
  };

  const handleMarginChange = (index: number, value: string) => {
    const updated = [...(props.margin || ['0', '0', '0', '0'])];
    updated[index] = value;
    setProp((props: any) => {
      props.margin = updated;
    });
  };

  return (
    <div className="space-y-4">
      {/* <h4 className="font-bold">Slider Settings</h4> */}

      <div className="flex gap-2">
        <Input
          type="text"
          value={props.width || ''}
          placeholder="Width (e.g. 100% or 800px)"
          onChange={(e) => handleChange('width', e.target.value)}
          className="w-full border px-2 py-1"
        />
        <Input
          type="text"
          value={props.height || ''}
          placeholder="Height (e.g. auto or 300px)"
          onChange={(e) => handleChange('height', e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Margin (Top, Right, Bottom, Left)</label>
        <div className="grid grid-cols-4 gap-2">
          {['Top', 'Right', 'Bottom', 'Left'].map((label, i) => (
            <Input
              key={i}
              type="text"
              value={props.margin?.[i] || ''}
              placeholder={label}
              onChange={(e) => handleMarginChange(i, e.target.value)}
              className="border px-2 py-1"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Image Fit</label>
        <select
          value={props.objectFit || 'cover'}
          onChange={(e) => handleChange('objectFit', e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
      </div>

      <hr className="my-4" />

      <h4 className="font-bold">Slides</h4>
      {localSlides.map((slide: any, index: number) => (
        <div key={index} className="border p-2 rounded space-y-2">
          <Input
            type="text"
            placeholder="Image URL"
            value={slide.image}
            onChange={(e) => updateSlideLocal(index, 'image', e.target.value)}
            className="w-full border px-2 py-1"
          />
          <Input
            type="text"
            placeholder="Link URL"
            value={slide.link}
            onChange={(e) => updateSlideLocal(index, 'link', e.target.value)}
            className="w-full border px-2 py-1"
          />
          <button
            onClick={() => removeSlide(index)}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addSlide}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Slide
      </button>
    </div>
  );
};
