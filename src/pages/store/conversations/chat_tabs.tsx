import ConversationSettings from "@/components/conversation/Conversation_Settings";
import ConversationSidebarItems from "@/components/conversation/Conversation_Sidebar_Items";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";



export default function ChatTabs() {
    const [settings ,setSettings] = useState(false);
  return (
    <div className="h-[80vh] bg-gray-50">
      {/* chat header ====== */}
      <div className="flex items-center p-2 bg-white border-b border-r">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer"
        onClick={()=>{
            setSettings(!settings);
  
        }}
        >
          <Icon icon={settings?"mdi:settings-off":"material-symbols:settings-rounded"} fontSize={20} />
        </div>

        <div className="ml-3">
          <h2 className="text-lg font-semibold">Ayaboo Seller</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 ml-1">Conversations</span>
          </div>
        </div>
      </div>
      {/* chat header Ends ====== */}

      <div className="">
        {
            settings ? (
                <ConversationSettings />
            ):(
                <ConversationSidebarItems />
            )
        }
      </div>

    </div>
  );
}
