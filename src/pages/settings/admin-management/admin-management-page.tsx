import AdminCreateForm from "@/components/settings/admin-managments/User_Create_Form";
import UserManagementTable from "@/components/settings/admin-managments/UserManagement_Table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

function UserManagementPage() {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get("type") as
    | "admins"
    | "create"
    | "edit"
    | null;
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (type: "admins" | "create" | "edit") => {
      navigate(`/settings/admin-management?type=${type}`);
    },
    [navigate]
  );

  const renderAdminSetupTabs = () => {
    switch (urlTypes) {
      case "admins":
        return <UserManagementTable />;
      case "create":
      case "edit": // Both "create" and "edit" render the same form
        return (
          <div className="max-w-screen-md mx-auto mt-5">
            <AdminCreateForm />
          </div>
        );
      default:
        return <UserManagementTable />;
    }
  };

  return (
    <div className="">
      <div className=" p-4 flex justify-between">
        <h1 className="font-bold">User Management</h1>
      </div>
      {/* ========= */}
      <div className="page-outer">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="border bg-transparent rounded-full py-6 ">
            <TabsTrigger
              value="offline"
              data-state={
                urlTypes === "admins" || !urlTypes ? "active" : "inactive"
              }
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("admins")}
            >
              Admins | Roles
            </TabsTrigger>
            <TabsTrigger
              value="create"
              data-state={
                urlTypes === "create" || urlTypes === "edit"
                  ? "active"
                  : "inactive"
              }
              className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
              onClick={() => handleTabClick("create")}
            >
              {urlTypes === "edit" ? "Edit Admin" : "Create Sub Admin"}
            </TabsTrigger>
          </TabsList>
          <div className="">{renderAdminSetupTabs()}</div>
        </Tabs>
      </div>
    </div>
  );
}

export default UserManagementPage;
