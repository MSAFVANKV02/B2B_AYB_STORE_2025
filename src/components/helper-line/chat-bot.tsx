// import { useState, useRef, useEffect } from "react";
// import { Box, Container, TextField,  Paper, Typography,  } from "@mui/material";
// import Grid from '@mui/material/Grid2';
// import { styled } from "@mui/system";
// import AyButton from "../myUi/AyButton";


// const ChatWindow = styled(Paper)(({ theme }) => ({
//   height: "500px",
//   padding: theme.spacing(2),
//   overflow: "auto",
//   backgroundColor: "#f5f5f5",
//   marginBottom: theme.spacing(2)
// }));

// const MessageBubble = styled(Box)(({ isUser }) => ({
//   maxWidth: "70%",
//   padding: "10px 15px",
//   borderRadius: "15px",
//   marginBottom: "10px",
//   backgroundColor: isUser ? "#1976d2" : "#ffffff",
//   color: isUser ? "#ffffff" : "#000000",
//   alignSelf: isUser ? "flex-end" : "flex-start",
//   boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
// }));

// const ChatContainer = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   height: "100%"
// });

// const MessageList = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   gap: "8px"
// });

// const TypingIndicator = styled(Box)({
//   padding: "8px",
//   fontStyle: "italic",
//   color: "#666"
// });

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I help you today?", isUser: false },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const chatWindowRef = useRef(null);

//   const handleSendMessage = (e:any) => {
//     e.preventDefault();
//     if (newMessage.trim() === "") return;

//     setMessages([...messages, { text: newMessage, isUser: true }]);
//     setNewMessage("");
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       setIsTyping(false);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: "Thank you for your message. Our support team will get back to you shortly.", isUser: false }
//       ]);
//     }, 1500);
//   };

//   useEffect(() => {
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <Container maxWidth="md" sx={{ }}>
//       <ChatContainer>
//         {/* <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
//           Customer Support Chat
//         </Typography> */}
//         <ChatWindow ref={chatWindowRef} elevation={3}>
//           <MessageList>
//             {messages.map((message, index) => (
//               <MessageBubble key={index} isUser={message.isUser}>
//                 <Typography variant="body1">{message.text}</Typography>
//               </MessageBubble>
//             ))}
//             {isTyping && (
//               <TypingIndicator>
//                 <Typography variant="body2">Support is typing...</Typography>
//               </TypingIndicator>
//             )}
//           </MessageList>
//         </ChatWindow>

//         <Grid container spacing={2} component="form" onSubmit={handleSendMessage}>
//           <Grid >
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Type your message here..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               autoFocus
//               size="small"
//               sx={{ backgroundColor: "#ffffff" }}
//             />
//           </Grid>
//           <Grid >
          
//             <AyButton 
//              disabled={!newMessage.trim()}
//             title="Send"
//             icon="iconamoon:send-thin"
//             variant="outlined"
//             outLineColor="black"
//             />
//           </Grid>
//         </Grid>
//       </ChatContainer>
//     </Container>
//   );
// };

// export default ChatBot;