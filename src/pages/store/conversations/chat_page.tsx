
// =============
import { useState, useRef, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Icon } from "@iconify/react";

interface User {
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  user: User;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! How are you?",
      sender: "other",
      timestamp: new Date(),
      status: "read",
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
    },
    {
      id: 2,
      text: "I'm doing great! How about you?",
      sender: "user",
      timestamp: new Date(),
      status: "delivered",
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
    },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (): void => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    e?.preventDefault();
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        status: "sent",
        user: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiObject: EmojiClickData): void => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-100 relative">
      {/* Chat Header */}
      <div className="flex items-center p-2 bg-white border-b">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">John Doe</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 border-2 border-green-400 rounded-full flex justify-center items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>

            <span className="text-sm text-gray-500 ml-1">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      {/* <img src="/public/img/Background Images/AyabooTeam.png" alt="" /> */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto sm:p-4 sm:py-4 py-2 space-y-4 "
        onScroll={handleScroll}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              } items-end max-w-[75%]`}
            >
              <img
                src={message.user.avatar}
                alt={message.user.name}
                className="w-8 h-8 rounded-full object-cover mx-2"
              />
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-gradient-to-l from-orange-300 to-orange-50 text-black"
                    : "bg-white"
                } rounded-lg p-3 shadow md:min-w-[300px] sm:min-w-[300px] min-w-[200px] max-w-[40%]`}
              >
                <p className="text-sm break-words">{message.text}</p>
                <div className="text-xs mt-1 text-gray-400 break-words">
                  {message.timestamp.toLocaleTimeString()}
                  {message.sender === "user" && (
                    <span className="ml-2">{message.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

      
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 z-50 right-1/2 bg-gray-200 text-white p-2 rounded-full shadow-lg hover:bg-gray-300 transition-all"
        >
          <Icon icon="icon-park:down" fontSize={20} />
        </button>
      )}

   

      {/* Chat Input */}
      <div className="p-4 bg-white border-t">
        <div className="relative flex items-center space-x-4">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon icon="circum:face-smile" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Icon icon="heroicons-solid:paper-clip" fontSize={24} />
          </button>

          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 min-h-10 px-4 py-4 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-textMain"
            rows={1}
          />

          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-l from-orange-300 to-orange-50 text-white p-2 rounded-full hover:bg-orange-400 cursor-pointer transition-colors"
            disabled={!newMessage.trim()}
          >
            <Icon icon="bi:send-fill" color="black"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
