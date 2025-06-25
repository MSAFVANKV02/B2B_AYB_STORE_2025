import { useState } from "react";
import { useEditor } from "@craftjs/core";


import { UIAction } from "@/providers/reducers/builderReducer";
import HamburgerBtn from "./hamburgerBtn";
import { useMutationData } from "@/hooks/useMutationData";
import { createStoreTemplatesAction } from "@/actions/store/storeAction";
import { useAppSelector } from "@/redux/hook";
import Loader from "@/components/global/loader";
import { useSearchParams } from "react-router-dom";
// import { renderCraftJsonToJsx } from "./json-convertor-craft";
// import { Container } from "../selecters";
// import { CraftSliderBannerBlock } from "../bloks/craft-slider";
// import CraftMainProductBlock from "../selecters/CraftMainProductBlock";
// import CraftCategorySelection from "../selecters/category";
// import Craft_About_Block from "../selecters/about";
// import ReactDOMServer from "react-dom/server";

type Props = {
  dispatch: React.Dispatch<UIAction>;
};

const CraftBuilderHeader = ({ dispatch }: Props) => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("storeId");
  const templateId = searchParams.get("templateId");
  const name = searchParams.get("name");
  const [title, setTitle] = useState(name??"Untitled Page");
  const { currentAdmin } = useAppSelector((state) => state.admin);




  const { actions, query } = useEditor(); // ✅ no selector function here

  const queryKey = ["all-templates"];

  const { mutate, isPending } = useMutationData(
    ["templates-update"],
    ({ template, name }: { template: any; name?: string }) =>
      createStoreTemplatesAction({
        storeId: currentAdmin?._id ?? "",
        template: template,
        name: name || title,
        isEdit:!!storeId,
        templateId:templateId ?? "",
      }),
    queryKey
  );

  const canUndo = query.history.canUndo();
  const canRedo = query.history.canRedo();

  const handlePublish = () => {
    const json = query.serialize();
    console.log("📝 Page Title:", title);
    // console.log("📦 Serialized JSON:", json);

    mutate(
      {
        template: json,
        name: title,
      },
      {
        onSuccess: async () => {
          // makeToast("Page saved successfully!");
          // console.log(data, "Page saved data");
          // You can add more actions here, like redirecting or updating state
        },
        onError: (error) => {
          console.error("Failed to update order status", error);
        },
      }
    );
  };

  return (
    <div className="  px-4 py-2 flex justify-between items-center">
      <HamburgerBtn dispatch={dispatch} type="TOGGLE_HEADER" />

      <div className="flex items-center space-x-3 h-8 border w-[250px] rounded-sm overflow-hidden ">
        <input
          type="text"
          placeholder="Untitled Page"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-1 text-xs focus:border-black  ring-0 focus:outline-black h-full w-full"
        />

        <button
          onClick={handlePublish}
          className="bg-[#2B90EC] text-white px-4 h-full  text-sm hover:bg-[#2885dc]"
        >
          <Loader state={isPending}>
            {storeId ?"Edit":"Save"}
          </Loader>
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => actions.history.undo()}
          disabled={!canUndo}
          className="bg-white border px-3 py-1 text-sm rounded disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={() => actions.history.redo()}
          disabled={!canRedo}
          className="bg-white border px-3 py-1 text-sm rounded disabled:opacity-50"
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default CraftBuilderHeader;
