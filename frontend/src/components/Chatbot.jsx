import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hello! I'm your Internship Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Dummy responses (replace with backend API later)
  const getBotReply = (message) => {
    const text = message.toLowerCase();

    if (text.includes("apply")) {
      return "Go to the Internship Form page, fill in your company details, and upload your offer letter.";
    }

    if (text.includes("approval")) {
      return "Your application will be reviewed by the Internship Coordinator.";
    }

    if (text.includes("status")) {
      return "You can track your internship status from the Internship Status page.";
    }

    if (text.includes("evaluation")) {
      return "After a week, your manager will receive an evaluation email automatically.";
    }

    return "I'm still learning. Soon I'll answer using AI from the backend!";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border">

      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-xl">
        <h2 className="text-xl font-bold">Internship Assistant</h2>
        <p className="text-sm">Ask anything about internships</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-3 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2 p-4 border-t">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;