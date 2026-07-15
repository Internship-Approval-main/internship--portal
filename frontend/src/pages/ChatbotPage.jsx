import React, { useState } from "react";
import './ChatbotPage.css'

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your Internship Assistant. Ask me anything about internships.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    // Dummy AI response
    const botMessage = {
      sender: "bot",
      text:
        "Thanks for your question! This will be connected to the AI backend later.",
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
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
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

        </div>

        {/* Input */}
        <div className="flex gap-3 p-4 border-t">

          <input
            type="text"
            placeholder="Ask about internships..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatbotPage;