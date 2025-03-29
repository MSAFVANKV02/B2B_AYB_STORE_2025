import { PagesLayoutContent } from "@/layouts/Pages_Layout";
import ChatPage from "./chat_page";
import ChatTabs from "./chat_tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ConversationPage(): JSX.Element {
  return (
    <div className="h-full flex flex-col">
      <PagesLayoutContent className="h-full flex overflow-y-auto">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full flex overflow-y-auto"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={20}
            maxSize={60}
            className="flex flex-col h-full"
          >
            <div className="w-full">
              <ChatTabs />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
        
            className="flex flex-col h-full"
          >
            <div className="flex-grow">
              <ChatPage />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </PagesLayoutContent>
    </div>
  );
}
