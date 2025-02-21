import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Tab = {
  value: string; // The value for the TabsTrigger
  title: string; // The title of the tab
  url: string; // The URL to navigate to on click
  children?: React.ReactNode;
};

type MyTabProps = {
  setTypeUrl?: (value: string) => void;
  tabs: Tab[];
};

export default function MyPageTab({ tabs, setTypeUrl }: MyTabProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const navigate = useNavigate();

  const handleTabClick = useCallback(
    (url: string, value: string) => {
      navigate(url);
      setActiveTab(value); // Ensure active tab updates on click
    },
    [navigate]
  );

  useEffect(() => {
    const matchingTab = tabs.find((tab) => tab.value === type);
    if (matchingTab) {
      setActiveTab(matchingTab.value);
      setTypeUrl?.(matchingTab.value);
    } else if (tabs.length > 0) {
      setActiveTab(tabs[0].value);
      setTypeUrl?.(tabs[0].value);
    }
  }, [type, tabs, setTypeUrl]);

  // Ensure activeTab is set before rendering tabs
  if (!activeTab) return null;

  return (
    <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
      <TabsList className="border bg-transparent md:h-auto h-fit  flex flex-wrap items-start sm:justify-normal md:rounded-full w-fit rounded-md py-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            // data-state={activeTab === tab.value ? "active" : "inactive"}
            className="data-[state=active]:bg-bg text-xs min-w-36 font-bold w-auto py-3 data-[state=active]:text-white data-[state=active]:rounded-full"
            onClick={() => handleTabClick(tab.url, tab.value)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Show only the active tab's content */}
      {tabs.map(
        (tab) =>
          tab.value === activeTab && (
            <TabsContent key={tab.value} value={tab.value} className="w-full">
              {tab.children}
            </TabsContent>
          )
      )}
    </Tabs>
  );
}
