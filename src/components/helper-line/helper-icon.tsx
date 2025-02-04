import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import MyCloseIcon from "../icons/My_CloseIcon";
import { Separator } from "../ui/separator";
import { ShinyButton } from "../ui/shiny-button";

import { Input } from "../ui/input";
import { Box, List, ListItem, styled, Typography } from "@mui/material";


const MessageArea = styled(List)(() => ({
  padding: "2px",
  overflowY: "auto",
  flexGrow: 1,
  // height: 350,
  // backgroundColor: "#f5f5f5"
}));

// const MessageBubble = styled(Box)<{ isBot: boolean }>(({ isBot }) => ({
//   backgroundColor: isBot ? "#f5f5f5" : "#2B90EC",
//   color: isBot ? "#000" : "#fff",
//   padding: "10px 15px",
//   borderRadius: isBot ? "15px 15px 15px 0" : "15px 15px 0 15px",
//   maxWidth: "80%",
//   marginLeft: isBot ? 0 : "auto",
//   marginRight: isBot ? "auto" : 0,
//   marginBottom: 10,
//   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
// }));
const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isBot",
})<{ isBot: boolean }>(({ isBot }) => ({
  backgroundColor: isBot ? "#f5f5f5" : "#2B90EC",
  color: isBot ? "#000" : "#fff",
  padding: "10px 15px",
  borderRadius: isBot ? "15px 15px 15px 0" : "15px 15px 0 15px",
  maxWidth: "80%",
  marginLeft: isBot ? 0 : "auto",
  marginRight: isBot ? "auto" : 0,
  marginBottom: 10,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
}));


export default function HelperIcon() {
  const [openHelper, setOpenHelper] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "I understand your concern. Let me help you with that.",
          "Could you please provide more details?",
          "Thank you for your question. Let me check that for you.",
          "I'm processing your request. Please wait a moment."
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // if (!openHelper) return null;
  return (
    <div className="relative">
      <Draggable>
        <div
          className={`${
            !openHelper ? "w-16 h-16" : "w-0 h-0"
          }   duration-700 transition-all bg-bg rounded-full shadow-2xl cursor-pointer fixed bottom-10 right-4 flex items-center justify-center`}
          onClick={() => {
            setOpenHelper(!openHelper);
            setMessages([ { text: "Hello! How can I help you today?", isBot: true }]);
          }}
        >
          <Icon icon="mdi:customer-service" color="white" fontSize={40} />
        </div>
      </Draggable>
      <div
        className={`${
          openHelper ? "w-[350px] h-[500px] p-3 shadow-lg" : "w-0 h-0"
        }  duration-700 transition-all bg-[#2B90EC]/40 backdrop-blur-sm  fixed bottom-10 right-7 rounded-md rounded-br-3xl `}
      >
        <div className={`${openHelper ? "" : "hidden"} flex flex-col justify-between h-full`}>
          {/* header ==========*/}
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">
              Ask to Bot
            </span>
           
            <MyCloseIcon
                 onClick={() => {
              setOpenHelper(!openHelper);
            }}
            />
          </div>
          <Separator className="bg-black" />

          {/* body content ====== */}
          <div className="h-[500px] bg-white my-2 rounded-md overflow-scroll" >
              {/* <ChatBot /> */}
              <MessageArea>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ display: "block", padding: "px 0" }}>
            <MessageBubble isBot={message.isBot}>
              <Typography variant="body1" sx={{
                fontSize:"13px"
              }}>{message.text}</Typography>
            </MessageBubble>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </MessageArea>
            </div>

          {/* footer ====== */}
          <div className="flex items-center gap-3 justify-end">
          <Input type="text" placeholder="Type you Text ...."
          className="bg-transparent border-black shadow-lg"
           onChange={(e) => setInput(e.target.value)}
           value={input}
          //  onKeyPress={handleKeyPress}
          onKeyDown={(e) => {
            handleKeyPress(e)
          }}
          />

          <ShinyButton className="rounded-full cursor-pointer"
           onClick={handleSend}
           disabled={!input.trim()}
          >
            <Icon icon="mingcute:ai-fill" className="" color="white" fontSize={20}/>
          </ShinyButton>

          </div>
       
        </div>
      </div>
    </div>
  );
}
