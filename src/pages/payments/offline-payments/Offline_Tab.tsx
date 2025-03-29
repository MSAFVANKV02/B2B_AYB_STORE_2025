import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type OfflineTabProps = {
    activeTab: "offline" | "offline-setup";
  };

export default function OfflineTab({ activeTab }: OfflineTabProps) {

  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (type: "offline" | "offline-setup" ) => {
      navigate(`/offline-payment?type=${type}`);
    },
    [navigate]
  );
  return (
    <Tabs defaultValue="offline" className="w-[400px]">
      <TabsList className="border bg-transparent rounded-full py-6 ">
        <TabsTrigger
          value="offline"
          data-state={activeTab === "offline" ? "active" : "inactive"}
          className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => handleTabClick("offline")}
        >
          Offline payment
        </TabsTrigger>
        <TabsTrigger
          value="offline-setup"
          data-state={activeTab === "offline-setup" ? "active" : "inactive"}
          className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
          onClick={() => handleTabClick("offline-setup")}
        >
          Payment section setup
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
