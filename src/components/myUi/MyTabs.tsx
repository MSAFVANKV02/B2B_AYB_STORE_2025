import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Tab = {
  value: string; // The value for the TabsTrigger
  title: string; // The title of the tab
  url: string; // The URL to navigate to on click
};

type MyTabProps = {
  setTypeUrl?: (value: string) => void; 
  tabs: Tab[]; 
};

export default function MyTab({  tabs, setTypeUrl }: MyTabProps) {
  const [activeTab, setActiveTab] = useState<string>("");
  const [searchParams] = useSearchParams();

 const type = searchParams.get("type");
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    // Set the active tab based on the type query parameter
    const matchingTab = tabs.find((tab) => tab.value === type);
    if (matchingTab) {
      setActiveTab(matchingTab.value);
      setTypeUrl?.(matchingTab.value);
    } else if (tabs.length > 0) {
      // Default to the first tab if no matching tab is found
      setActiveTab(tabs[0].value);
      setTypeUrl?.(tabs[0].value);
    }
  }, [type, tabs]);

  return (
    <Tabs defaultValue={activeTab} className="w-[400px]">
      <TabsList className="border bg-transparent rounded-full py-6">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            data-state={activeTab === tab.value ? "active" : "inactive"}
            className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
            onClick={() => handleTabClick(tab.url)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
