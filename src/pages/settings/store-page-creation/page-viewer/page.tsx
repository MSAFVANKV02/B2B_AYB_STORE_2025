import AyButton from "@/components/myUi/AyButton";
import { Separator } from "@/components/ui/separator";
import Sec_02 from "./Sec_02";
import Sec_03 from "./Sec_03";
import Sec_04 from "./Sec_04";
import useNavigateClicks from "@/hooks/useClicks";
import { useQueryData } from "@/hooks/useQueryData";
import { getStoreTemplatesAction } from "@/actions/store/storeAction";
import { useAppSelector } from "@/redux/hook";
import ExistTemplatesSec from "./exist-templates_Sec";
import { IStoreTemplateTypes } from "@/types/store_templates_types";
import Loader from "@/components/global/loader";

const ViewBuildPage = () => {
  const { currentAdmin } = useAppSelector((state) => state.admin);

  const { handleClick } = useNavigateClicks();

  const { data: fetchedTemplates, isFetching } = useQueryData(
    ["all-templates"],
    () => getStoreTemplatesAction(currentAdmin?._id ?? ""),
    { disableRefetch: true }
  );


  const templates = fetchedTemplates?.data ?? [] as IStoreTemplateTypes[];

  if(isFetching){
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Loader state={isFetching}  />
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {
        templates.length > 0 ? (
          <ExistTemplatesSec  templates={templates} /> 
        ):(
          <div className="bg-white  dark:bg-neutral-300/30 shadow-main w-full lg:w-3/4 mx-auto flex justify-center items-center rounded-sm ">
        <div className="flex flex-col items-center w-3/4 gap-5 py-5 px-2">
          <span className="font-bold text-black capitalize">
            Set Up Your Digital Store Page
          </span>
          <Separator />
          <AyButton
            sx={{
              borderRadius: "7px",
            }}
            onClick={() => {
              handleClick("/settings/templates/edit");
            }}
          >
            Create Brand Store
          </AyButton>
        </div>
      </div>
        )
      }
      

      <Sec_02 />

      <Sec_03 />

      <Sec_04 />

      
    </div>
  );
};

export default ViewBuildPage;
