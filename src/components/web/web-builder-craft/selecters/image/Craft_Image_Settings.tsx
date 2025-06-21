
import { ToolbarItem, ToolbarSection } from "../../elements/Toolbar";
import { ToolbarRadio } from "../../elements/Toolbar/ToolbarRadio";

export const Craft_Image_Settings = () => {
  return (
    <>
      <ToolbarSection title="Source" props={["src"]}>
        <ToolbarItem full propKey="src" type="text" label="Image URL" />
      </ToolbarSection>

      <ToolbarSection title="Dimensions" props={["width", "height"]}>
        <ToolbarItem propKey="width" type="text" label="Width" />
        <ToolbarItem propKey="height" type="text" label="Height" />
      </ToolbarSection>

      <ToolbarSection title="Object Fit" props={["objectFit"]}>
        <ToolbarItem propKey="objectFit" type="radio" label="Fit">
          <ToolbarRadio value="cover" label="Cover" />
          <ToolbarRadio value="contain" label="Contain" />
        </ToolbarItem>
      </ToolbarSection>

      <ToolbarSection title="Margin" props={["margin"]}>
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
      </ToolbarSection>

      <ToolbarSection title="Style" props={["borderRadius"]}>
        <ToolbarItem
          full
          propKey="borderRadius"
          type="slider"
          label="Border Radius"
        />
      </ToolbarSection>
    </>
  );
};
