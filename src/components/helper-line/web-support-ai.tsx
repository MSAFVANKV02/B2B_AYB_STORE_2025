// import React, { useState, useRef, useEffect } from "react";
// import { Box, TextField, Button, List, ListItem, Typography, Avatar, Paper, IconButton } from "@mui/material";
// import { styled } from "@mui/system";
// import { Icon } from "@iconify/react/dist/iconify.js";

// const ChatContainer = styled(Paper)(({ theme }) => ({
//   position: "fixed",
//   bottom: 20,
//   right: 20,
//   width: 350,
//   maxHeight: 500,
//   display: "flex",
//   flexDirection: "column",
//   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
//   borderRadius: "12px",
//   overflow: "hidden",
//   "@media (max-width: 600px)": {
//     width: "90%",
//     right: "5%",
//     bottom: 10
//   }
// }));

// const ChatHeader = styled(Box)(({ theme }) => ({
//   padding: "12px 20px",
//   backgroundColor: "#2196f3",
//   color: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between"
// }));

// const MessageArea = styled(List)(({ theme }) => ({
//   padding: "20px",
//   overflowY: "auto",
//   flexGrow: 1,
//   height: 350,
//   backgroundColor: "#f5f5f5"
// }));

// const MessageBubble = styled(Box)(({ isBot }) => ({
//   backgroundColor: isBot ? "#fff" : "#2196f3",
//   color: isBot ? "#000" : "#fff",
//   padding: "10px 15px",
//   borderRadius: isBot ? "15px 15px 15px 0" : "15px 15px 0 15px",
//   maxWidth: "80%",
//   marginLeft: isBot ? 0 : "auto",
//   marginRight: isBot ? "auto" : 0,
//   marginBottom: 10,
//   boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
// }));

// const InputContainer = styled(Box)(({ theme }) => ({
//   padding: "15px",
//   backgroundColor: "#fff",
//   display: "flex",
//   gap: 10
// }));

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I help you today?", isBot: true }
//   ]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages([...messages, { text: input, isBot: false }]);
//       setInput("");

//       // Simulate bot response
//       setTimeout(() => {
//         const botResponses = [
//           "I understand your concern. Let me help you with that.",
//           "Could you please provide more details?",
//           "Thank you for your question. Let me check that for you.",
//           "I'm processing your request. Please wait a moment."
//         ];
//         const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
//         setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
//       }, 1000);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <ChatContainer>
//       {/* <ChatHeader>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Avatar sx={{ bgcolor: "#1976d2" }}>
//             <FaRobot />
//             <Icon icon="iconamoon:send-thin" />
//           </Avatar>
//           <Typography variant="h6">Support Chat Bot</Typography>
//         </Box>
//         <IconButton onClick={() => setIsOpen(false)} sx={{ color: "#fff" }}>
//           <FaTimes /> X
//         </IconButton>
//       </ChatHeader> */}

//       <MessageArea>
//         {messages.map((message, index) => (
//           <ListItem key={index} sx={{ display: "block", padding: "px 0" }}>
//             <MessageBubble isBot={message.isBot}>
//               <Typography variant="body1">{message.text}</Typography>
//             </MessageBubble>
//           </ListItem>
//         ))}
//         <div ref={messagesEndRef} />
//       </MessageArea>

//       <InputContainer>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           size="small"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSend}
//           disabled={!input.trim()}
//           sx={{ minWidth: "auto", padding: "8px" }}
//         >
//           {/* <FaPaperPlane /> */}
//           <Icon icon='iconamoon:send-thin' />
//         </Button>
//       </InputContainer>
//     </ChatContainer>
//   );
// };

// export default ChatBot;