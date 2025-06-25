import { Editor, Element, Frame } from "@craftjs/core";
import CraftCanvas from "./craft-Canvas";

import { CraftViewport } from "./craft-view-port";
import { RenderNode } from "./RenderNode";

import CraftBuilderHeader from "../tools/CraftHeader";
import { Container, Text } from "../selecters";
import { CraftSliderBannerBlock } from "../bloks/craft-slider";
import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
import CraftCategorySelection from "../selecters/category";
import { ImageBlock } from "../selecters/image";
import Craft_About_Block from "../selecters/about";

import { useSearchParams } from "react-router-dom";
import { getStoreTemplatesByIdAction } from "@/actions/store/storeAction";
import { useQueryData } from "@/hooks/useQueryData";
import { IStoreTemplateTypes } from "@/types/store_templates_types";
import Loader from "@/components/global/loader";
import { BuilderDeviceProvider } from "@/providers/context/useBuilderDevice";

const PageBuilderCraft = () => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("storeId");

  const { data: fetchedTemplates, isFetching } = useQueryData(
    ["single-template", storeId],
    () => getStoreTemplatesByIdAction(storeId ?? ""),
    { disableRefetch: true }
  );

  const templates = (fetchedTemplates?.data ?? {}) as IStoreTemplateTypes;

  // Safely parse template
  let parsedTemplate = null;
  try {
    parsedTemplate =
      typeof templates?.template === "string"
        ? JSON.parse(templates.template)
        : templates?.template;
  } catch {
    console.error("Error parsing template JSON");
  }

  if(isFetching){
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Loader state={isFetching}  />
      </div>
    );
  }

  return (
    <BuilderDeviceProvider>
        <Editor
      resolver={{
        Container,
        Text,
        CraftBuilderHeader,
        CraftSliderBannerBlock,
        CraftMainProductBlock,
        CraftCategorySelection,
        Craft_About_Block,
        ImageBlock,
      }}
      onRender={RenderNode}
      enabled={true}
    >
      <CraftViewport>
        {storeId && parsedTemplate ? (
          <Frame data={parsedTemplate}>
            <Element id="ROOT" is="div" />
          </Frame>
        ) : (
          <div className="h-full w-full">
            <CraftCanvas />
          </div>
        )}
      </CraftViewport>
    </Editor>
    </BuilderDeviceProvider>
  
  );
};

export default PageBuilderCraft;
