import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = (value) => {
    console.log(value);
    setUserInput(value);
  };
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;

    try {
      const prompt = messageText;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: messageText },
        { type: "bot", message: text },
      ]);
      setUserInput("");
      console.log(text);
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };

  return (
    <div className="flex flex-col justify-center  h-screen bg-[#13131a] p-4"
     style={{
            backgroundImage:"url('/rob1.jpg')",
              // "url('https://img.freepik.com/premium-photo/digital-illustration-friendly-chatbot-avatar-with-speech-bubble-smartphone-screen-symbolizing-ai-customer-support_1019851-3964.jpg?w=1380')", // You can change this URL
          }}
    >
     
      <div className="text-white text-2xl font-bold mb-4 ">Chat with rob</div>
     
    <div style={{ position: "relative", height: "600px",width: "50%" }}>
    <div className="absolute top-4 left-4 bg-white bg-opacity-70 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300">
    Hello! I'm your assistant 👋
  </div>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatHistory.map((elt, i) => (
              <Message
                key={i}
                model={{
                  message: elt.message,
                  sender: elt.type,
                  sentTime: "just now",

                  direction: elt.type === "user" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={userInput}
            onChange={(value) => handleUserInput(value)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
    </div>
  );
};