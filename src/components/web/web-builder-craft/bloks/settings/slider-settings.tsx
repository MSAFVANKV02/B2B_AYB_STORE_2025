import { Input } from "@/components/ui/input";
import { useNode } from "@craftjs/core";
import  { useState, useEffect } from "react";
import {
  ToolbarItem,
  ToolbarSection,
  ToolbarTextInput,
} from "../../elements/Toolbar";
import { ToolbarRadio } from "../../elements/Toolbar/ToolbarRadio";
import MyDeleteIcon from "@/components/icons/My_DeleteIcon";

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

  const updateSlideLocal = (
    index: number,
    key: "image" | "link",
    value: string
  ) => {
    const cloned = JSON.parse(JSON.stringify(localSlides)); // ✅ deep clone

    cloned[index][key] = value;

    setLocalSlides(cloned);

    setProp((props: any) => {
      props.slides = cloned;
    });
  };

  const addSlide = () => {
    const updated = [...localSlides, { image: "", link: "" }];
    setLocalSlides(updated);
    setProp((props: any) => {
      props.slides = updated;
    });
  };

  const removeSlide = (index: number) => {
    const updated = localSlides.filter((_: any, i: number) => i !== index);
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

  // const handleMarginChange = (index: number, value: string) => {
  //   const updated = [...(props.margin || ['0', '0', '0', '0'])];
  //   updated[index] = value;
  //   setProp((props: any) => {
  //     props.margin = updated;
  //   });
  // };

  return (
    <div className="space-y-4 bg-white p-4 ">
      {/* <h4 className="font-bold">Slider Settings</h4> */}

      <div className="flex gap-2">
        <Input
          type="text"
          value={props.width || ""}
          placeholder="Width (e.g. 100% or 800px)"
          onChange={(e) => handleChange("width", e.target.value)}
          className="w-full border px-2 py-1"
        />
        <Input
          type="text"
          value={props.height || ""}
          placeholder="Height (e.g. auto or 300px)"
          onChange={(e) => handleChange("height", e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      {/* <div>
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
      </div> */}

      <ToolbarSection
        title="Space"
        props={["gap"]}
        // summary={({ fontSize, fontWeight, textAlign }: any) => {
        //   return `${fontSize || ''}, ${weightDescription(
        //     parseInt(fontWeight)
        //   )}, ${capitalize(textAlign)}`;
        // }}
      >
        {/* <ToolbarItem
          full={true}
          propKey="gap"
          type="slider"
          label="Slider Gap"
        /> */}
     
        <ToolbarItem propKey="gap" type="radio">
          <ToolbarRadio value="1" label="1" />
          <ToolbarRadio value="2" label="2" />
          <ToolbarItem propKey="gap" type="radio">
          <ToolbarRadio value="0" label="Reset" />
        </ToolbarItem>
        </ToolbarItem>
        <ToolbarItem propKey="gap" type="radio">
          <ToolbarRadio value="3" label="3" />
          <ToolbarRadio value="4" label="4" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection title="Margin" props={["margin"]}>
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
      </ToolbarSection>

      <ToolbarSection title="Object Fit" props={["objectFit"]}>
        <ToolbarItem propKey="objectFit" type="radio">
          <ToolbarRadio value="cover" label="Cover" />
          <ToolbarRadio value="contain" label="Contain" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection title="Columns" props={["slidesToShow"]}>
        <ToolbarItem propKey="slidesToShow" type="radio">
          <ToolbarRadio value="1" label="1" />
          <ToolbarRadio value="2" label="2" />
          <ToolbarRadio value="3" label="3" />
          <ToolbarRadio value="4" label="4" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection
        title="Controls"
        props={["autoplay", "showDots", "infinite"]}
      >
        <ToolbarItem propKey="autoplay" type="radio" label="Autoplay">
          <ToolbarRadio value="true" label="Enable" />
          <ToolbarRadio value="false" label="Disable" />
        </ToolbarItem>

        <ToolbarItem propKey="showDots" type="radio" label="Show Dots">
          <ToolbarRadio value="true" label="Enable" />
          <ToolbarRadio value="false" label="Disable" />
        </ToolbarItem>

        <ToolbarItem propKey="infinite" type="radio" label="Infinite">
          <ToolbarRadio value="true" label="Enable" />
          <ToolbarRadio value="false" label="Disable" />
        </ToolbarItem>
      </ToolbarSection>

      {/* <div>
        <label className="block font-semibold mb-1">Image Fit</label>
        <select
          value={props.objectFit || 'cover'}
          onChange={(e) => handleChange('objectFit', e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
      </div> */}

      <hr className="my-4" />

      <h4 className="font-bold">Slides</h4>
      {/* {localSlides.map((slide: any, index: number) => (
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
      ))} */}
      {localSlides.map((slide: any, index: number) => (
        <div key={index} className=" rounded space-y-2 relative">
          <div className="absolute -top-0 right-0 z-10 cursor-pointer">
            <MyDeleteIcon onClick={() => removeSlide(index)} />
          </div>

          <ToolbarSection title={`Slide ${index + 1}`}>
            <ToolbarTextInput
              type="text"
              label="Image URL"
              value={slide.image}
              onChange={(val: string) => updateSlideLocal(index, "image", val)}
            />
            <ToolbarTextInput
              type="text"
              label="Link URL"
              value={slide.link}
              onChange={(val: string) => updateSlideLocal(index, "link", val)}
            />
          </ToolbarSection>

          {/* <button
            onClick={() => removeSlide(index)}
            className="text-red-600 text-sm"
          >
            Remove
          </button> */}
        </div>
      ))}

      <button
        onClick={addSlide}
        className="bg-blue-500 hover:bg-blue-400 duration-300 text-xs transform text-white px-3 py-2 rounded w-full"
      >
        Add Slide
      </button>
    </div>
  );
};
