import { deleteStoreTemplatesAction } from "@/actions/store/storeAction";
import Image from "@/components/global/image";
import Loader from "@/components/global/loader";
import Modal from "@/components/modals/main";
import AyButton from "@/components/myUi/AyButton";
import { useMutationData } from "@/hooks/useMutationData";
import { IStoreTemplateTypes } from "@/types/store_templates_types";
import { encodeId } from "@/utils/encorder";
import { Link } from "react-router-dom";

type Props = {
  templates: IStoreTemplateTypes[];
};

const ExistTemplatesSec = ({ templates }: Props) => {
  console.log(templates, "exist templates");

  const queryKey = ["all-templates"];

  const { mutate, isPending } = useMutationData(
    ["templates-update"],
    ({ storeId, templateId }: { storeId: string; templateId: string }) =>
      deleteStoreTemplatesAction({
        storeId: storeId,
        templateId: templateId,
      }),
    queryKey
  );

  if (isPending) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Loader state={isPending} />
      </div>
    );
  }

  return (
    <div className="  w-full lg:w-3/4 mx-auto flex items-center rounded-sm gap-5 ">
      {/* .filter((f)=>f.isActive) */}
      <div className="flex flex-col w-3/4 gap-5">
        {templates
          .filter((f) => f.isActive)
          .map((template, index) => {
            const parsed = JSON.parse(template.template);
            const nodeEntries = Object.entries(parsed) as [string, any][];
            const imageNode = nodeEntries.find(
              ([, node]) =>
                node.type?.resolvedName === "CraftSliderBannerBlock" &&
                node.props?.slides?.[0]?.image
            );

            const imageUrl = imageNode?.[1]?.props?.slides?.[0]?.image;
            return (
              <div className="flex gap-3 w-full">
                <div className=" py-3 px-2 bg-white rounded-md w-full flex gap-3">
                  <Image
                    src={imageUrl}
                    disableLink
                    className="w-16 h-16 rounded-md"
                    classNameImg="w-full h-full  object-cover"
                  />

                  <div className="flex flex-col">
                    <span
                      key={index}
                      className="font-bold text-black capitalize"
                    >
                      {template.name}
                    </span>
                    <Link
                      to={`http://localhost:5173/str/${encodeId(
                        template.storeId
                      )}`}
                      target="_blank"
                      className="text-sm text-gray-600 bg-slate-50 p-2 rounded-sm shadow-sm"
                    >
                      view live Store
                    </Link>
                  </div>
                </div>
                {/* <div
                  className=" py-5 px-2 bg-white rounded-md w-28 flex justify-center items-center text-xs cursor-pointer hover:shadow-main "
                  onClick={() => {
                    mutate({
                      storeId: template.storeId,
                      templateId: template._id,
                    });
                  }}
                >
                  Delete
                </div> */}
                <Modal
                  title="Are you sure?"
                  trigger={
                    <button
                      className=" py-5 px-2 bg-white rounded-md w-28 flex justify-center items-center text-xs cursor-pointer hover:shadow-main "
                      // onClick={() => {
                      //   mutate({
                      //     storeId: template.storeId,
                      //     templateId: template._id,
                      //   });
                      // }}
                    >
                      Delete
                    </button>
                  }
                  footer={
                    <div>
                      <AyButton
                        onClick={() => {
                          mutate({
                            storeId: template.storeId,
                            templateId: template._id,
                          });
                        }}
                      >
                        Delete
                      </AyButton>
                    </div>
                  }
                ></Modal>
                <Link
                  to={`/settings/templates/edit?storeId=${template.storeId}&templateId=${template._id}&name=${template.name}`}
                  className=" bg-white rounded-md w-28 flex justify-center items-center text-xs cursor-pointer hover:shadow-main"
                >
                  edit
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExistTemplatesSec;
