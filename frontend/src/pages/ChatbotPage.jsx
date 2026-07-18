// frontend/src/pages/ChatbotPage.jsx
import React, { useState } from "react";
import './ChatbotPage.css'; // Uses the custom css file layout properties

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your Internship Assistant. Ask me anything about internships.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Handles loading visibility states

  const sendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    const userText = input;
    const userMessage = { sender: "user", text: userText };

    // Update messages stack immediately with user text
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error getting response from server." }]);
      }
    } catch (error) {
      console.error("Network problem contacting chatbot service:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "🔌 Unable to reach the chatbot server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl">
        {/* Header */}
        <div className="bg-blue-600 text-white text-xl font-bold p-4 rounded-t-xl">
          Internship AI Chatbot
        </div>

        {/* Chat Window */}
        <div className="h-[500px] overflow-y-auto p-5 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-500 max-w-xs px-4 py-2 rounded-xl italic">
                Bot is Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="flex gap-3 p-4 border-t">
          <input
            type="text"
            placeholder="Ask about internships..."
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg disabled:bg-gray-400"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;