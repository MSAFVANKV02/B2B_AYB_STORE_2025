import AyButton from "@/components/myUi/AyButton";
import { Separator } from "@/components/ui/separator";
import PageViewer from "@/components/web/web-builder-craft/canvas/page-viewer";
import Sec_02 from "./Sec_02";
import Image from "@/components/global/image";

const ViewBuildPage = () => {
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
          >
            Create Brand Store
          </AyButton>
        </div>
      </div>

      <div className="bg-white w-full py-10 flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold capitalize">Helpful resources</h2>
        <p className="">
          Start building your Brand Store on Ayaboo with these helpful guides
        </p>
        <div className="">
          <Sec_02 />
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECF6FF] w-full lg:px-0 px-3">
        <div className="lg:w-3/4 mx-auto flex lg:flex-row flex-col justify-between">
          <div className="space-y-2 lg:w-3/5  py-4">
            <h3 className=" font-bold ">Why Create Your Brand Store?</h3>
            <Separator />
            <p className="text-xs text-[#4D4D4D] font-semibold ">
              Showcase Your Brand. Connect with Retailers. Grow Faster.
            </p>
            <p className="">
              <p className="text-xs text-[#4D4D4D] ">
                Creating your Brand Store Page helps you stand out on the
                platform. Build trust with retailers, highlight your best
                products, and offer a professional shopping experience
              </p>
            </p>
          </div>
          {/* svg */}
        
          <Image 
          src="/public/icons/store/Frame.svg" alt="Why Create Your Brand Store?"
          className="w-28 h-28"
          classNameImg="w-full h-full object-contain"
          disableLink
          />

        </div>
      </div>
      <div className=" w-full ">
        <PageViewer />
      </div>
    </div>
  );
};

export default ViewBuildPage;
