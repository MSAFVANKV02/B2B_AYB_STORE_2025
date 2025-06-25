import { getStoreTemplatesAction } from "@/actions/store/storeAction";
import PageViewer from "@/components/web/web-builder-craft/canvas/page-viewer";
import { useQueryData } from "@/hooks/useQueryData";
import { useAppSelector } from "@/redux/hook";
import { IStoreTemplateTypes } from "@/types/store_templates_types";

function ClientPageBuilderAccess() {
  const { currentAdmin } = useAppSelector((state) => state.admin);

  const { data: fetchedTemplates } = useQueryData(
    ["all-templates"],
    () => getStoreTemplatesAction(currentAdmin?._id ?? ""),
    { disableRefetch: true }
  );

  const templates = fetchedTemplates?.data ?? ([] as IStoreTemplateTypes[]);
  return (
    <div className="scrollbar-none">
      {templates && templates.length > 0 ? (
        <div className="w-full flex justify-center ">
          <PageViewer data={JSON.parse(templates[0].template)} />
        </div>
      ) : (
        <div>No templates found</div>
      )}
    </div>
  );
}

export default ClientPageBuilderAccess;
