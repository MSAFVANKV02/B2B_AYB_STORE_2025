import AyButton from "@/components/myUi/AyButton";
import { Separator } from "@/components/ui/separator";
import PageViewer from "@/components/web/web-builder-craft/canvas/page-viewer";
import Sec_02 from "./Sec_02";
import Sec_03 from "./Sec_03";
import Sec_04 from "./Sec_04";
import useNavigateClicks from "@/hooks/useClicks";

const ViewBuildPage = () => {

    const {handleClick} = useNavigateClicks()

  return (
    <div className="w-full space-y-5">
      <div className="bg-white shadow-main w-full lg:w-3/4 mx-auto flex justify-center items-center rounded-sm ">
        <div className="flex flex-col items-center w-3/4 gap-5 py-5 px-2">
          <span className="font-bold text-black capitalize">
            Set Up Your Digital Store Page
          </span>
          <Separator />
          <AyButton
            sx={{
              borderRadius: "7px",
            }}
            onClick={()=>{
                handleClick("/settings/templates/edit")
            }}
          >
            Create Brand Store
          </AyButton>
        </div>
      </div>

      <Sec_02 />

      <Sec_03 />

      <Sec_04 />

      <div className=" w-full ">
        <PageViewer />
      </div>
    </div>
  );
};

export default ViewBuildPage;
