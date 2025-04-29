import React, { useState } from "react";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    setLoading(true);
    setResponse("");
  
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse("No response from AI.");
      }
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setResponse(`Failed to get a response: ${error.message}`);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Chat with AI</h2>
      <textarea
        className="w-full p-2 border rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
      {response && <p className="mt-4 p-2 bg-gray-100 rounded">{response}</p>}
    </div>
  );
};

export default ChatBot;
